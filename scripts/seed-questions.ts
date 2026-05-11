/**
 * seed-questions.ts
 *
 * Reads all docs/questions_batch_*.sql files and inserts questions into
 * the Baycast Supabase `questions` table. Skips questions whose titles
 * already exist (idempotent).
 *
 * Usage:
 *   SUPABASE_URL=https://... SUPABASE_ANON_KEY=... npx tsx scripts/seed-questions.ts
 *
 * Alternatively, create a .env.local in the project root with those vars.
 */

import { createClient } from "@supabase/supabase-js";
import * as fs from "fs";
import * as path from "path";

// ── Config ────────────────────────────────────────────────────────

const DOCS_DIR = path.resolve(__dirname, "..", "docs");
const BATCH_GLOB = /questions_batch_may\d+\.sql$/;

// ── Helpers ───────────────────────────────────────────────────────

function loadEnv() {
  // Try .env.local first, then fall back to process.env
  const envLocal = path.resolve(__dirname, "..", ".env.local");
  if (fs.existsSync(envLocal)) {
    const raw = fs.readFileSync(envLocal, "utf-8");
    for (const line of raw.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      const val = trimmed.slice(eq + 1).trim().replace(/^['"]|['"]$/g, "");
      if (!(key in process.env)) process.env[key] = val;
    }
  }
}

/**
 * Parse a single SQL file into an array of row objects.
 *
 * Handles two schema formats:
 *   A) INSERT INTO public.questions (id, title, ..., created_by) VALUES (...)
 *      — id is gen_random_uuid(), columns: id, title, description, category,
 *        question_type, options, resolution_source, opens_at, closes_at,
 *        blind_until, status, created_by
 *   B) INSERT INTO questions (title, description, ..., created_by) VALUES (...)
 *      — columns: title, description, category, options, resolution_date,
 *        resolution_source, status, created_by
 */
function parseSqlFile(sql: string): { rows: Record<string, unknown>[]; titles: string[] } {
  const titles: string[] = [];
  const rows: Record<string, unknown>[] = [];

  // Detect schema by column list
  const schemaAMatch = sql.match(
    /INSERT\s+INTO\s+(?:public\.)?questions\s*\(([^)]+)\)\s*VALUES/i
  );
  if (!schemaAMatch) {
    console.error("  ⚠ Could not detect INSERT INTO questions — skipping");
    return { rows: [], titles: [] };
  }

  const colList = schemaAMatch[1]
    .split(",")
    .map((c) => c.trim().toLowerCase());

  const isSchemaA = colList.includes("id"); // has gen_random_uuid() id
  const isSchemaB = colList.includes("resolution_date"); // alternate format

  // Extract the VALUES block (everything after VALUES keyword)
  const valuesStart = sql.indexOf("VALUES");
  if (valuesStart === -1) return { rows: [], titles: [] };

  const valuesBlock = sql.slice(valuesStart + 6);

  // Split into individual row tuples. We'll do a simple paren-balanced parser.
  const tupleRegex = /\(([\s\S]*?)\)\s*(?:,|;)/g;
  let match: RegExpExecArray | null;

  while ((match = tupleRegex.exec(valuesBlock)) !== null) {
    const tupleContent = match[1].trim();
    if (!tupleContent) continue;

    // Skip comment-only tuples
    if (tupleContent.startsWith("--") && tupleContent.endsWith("--")) continue;

    // Parse the values. They may span multiple lines with comments.
    // Remove SQL comments (line comments)
    const cleaned = tupleContent
      .split("\n")
      .filter((line) => !line.trim().startsWith("--"))
      .join("\n")
      .trim();

    if (!cleaned) continue;

    const values = parseValues(cleaned);
    if (values.length !== colList.length) {
      console.error(`  ⚠ Column/value count mismatch: ${colList.length} cols vs ${values.length} vals — skipping row`);
      continue;
    }

    const row: Record<string, unknown> = {};
    for (let i = 0; i < colList.length; i++) {
      row[colList[i]] = values[i];
    }

    // Normalize for both schemas → insert into the questions table
    const normalized = normalizeRow(row, isSchemaA);
    if (normalized && normalized.title) {
      rows.push(normalized);
      titles.push(normalized.title as string);
    }
  }

  return { rows, titles };
}

/**
 * Parse a comma-separated list of SQL values handling quoted strings
 * (which may contain escaped quotes and commas).
 */
function parseValues(raw: string): unknown[] {
  const values: unknown[] = [];
  let i = 0;

  while (i < raw.length) {
    // Skip whitespace
    while (i < raw.length && /\s/.test(raw[i])) i++;
    if (i >= raw.length) break;

    // Skip trailing comma or semicolon
    if (raw[i] === "," || raw[i] === ";") {
      i++;
      continue;
    }

    if (raw[i] === "'") {
      // Quoted string value
      let str = "";
      i++; // skip opening quote
      while (i < raw.length) {
        if (raw[i] === "'" && i + 1 < raw.length && raw[i + 1] === "'") {
          // Escaped quote ''
          str += "'";
          i += 2;
        } else if (raw[i] === "'") {
          i++; // skip closing quote
          break;
        } else {
          str += raw[i];
          i++;
        }
      }
      values.push(str);
    } else if (raw[i] === "{") {
      // JSON object or PostgreSQL array
      const start = i;
      let depth = 0;
      while (i < raw.length) {
        if (raw[i] === "{") depth++;
        else if (raw[i] === "}") {
          depth--;
          if (depth === 0) {
            i++;
            break;
          }
        }
        i++;
      }
      const val = raw.slice(start, i).trim();
      values.push(val);
    } else if (raw[i] === "[") {
      // JSON array
      const start = i;
      let depth = 0;
      while (i < raw.length) {
        if (raw[i] === "[") depth++;
        else if (raw[i] === "]") {
          depth--;
          if (depth === 0) {
            i++;
            break;
          }
        }
        i++;
      }
      values.push(raw.slice(start, i).trim());
    } else if (raw.slice(i, i + 16).toLowerCase() === "gen_random_uuid()") {
      // Will be replaced with crypto.randomUUID()
      values.push("gen_random_uuid()");
      i += 16;
    } else if (raw.slice(i, i + 17).toLowerCase() === "null") {
      values.push(null);
      i += 4;
    } else {
      // Bare value (number, uuid string without quotes, etc.)
      let val = "";
      while (i < raw.length && !/[\s,;)]/.test(raw[i])) {
        val += raw[i];
        i++;
      }
      values.push(val.trim() || null);
    }
  }

  return values;
}

/**
 * Normalize a parsed row into the format expected by the questions table.
 *
 * Schema A columns: id, title, description, category, question_type, options,
 *   resolution_source, opens_at, closes_at, blind_until, status, created_by
 *
 * Schema B columns: title, description, category, options, resolution_date,
 *   resolution_source, status, created_by
 */
function normalizeRow(
  raw: Record<string, unknown>,
  isSchemaA: boolean
): Record<string, unknown> | null {
  const title = (raw.title as string) || "";
  if (!title) return null;

  if (isSchemaA) {
    // Schema A: full format with id, dates, etc.
    const row: Record<string, unknown> = {
      title: title,
      description: raw.description || "",
      category: raw.category || "Other",
      question_type: raw.question_type || "binary",
      options: raw.options || '{"yes_label":"Yes","no_label":"No"}',
      resolution_source: raw.resolution_source || "",
      opens_at: raw.opens_at || null,
      closes_at: raw.closes_at || null,
      blind_until: raw.blind_until || null,
      status: raw.status || "open",
      created_by: raw.created_by || "00000000-0000-0000-0000-000000000001",
    };
    // Don't include id — let Postgres auto-generate
    return row;
  } else {
    // Schema B: simplified format with resolution_date
    const row: Record<string, unknown> = {
      title: title,
      description: raw.description || "",
      category: raw.category || "Other",
      question_type: "binary",
      options: raw.options || '["Yes","No"]',
      resolution_source: raw.resolution_source || "",
      resolution_date: raw.resolution_date || null,
      status: raw.status || "active",
      created_by: raw.created_by || "baycast-system",
    };
    return row;
  }
}

// ── Main ──────────────────────────────────────────────────────────

async function main() {
  loadEnv();

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error("❌ Missing SUPABASE_URL or SUPABASE_ANON_KEY environment variables.");
    console.error("   Set them in .env.local or export them in your shell.");
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  // Discover SQL files
  const sqlFiles = fs
    .readdirSync(DOCS_DIR)
    .filter((f) => BATCH_GLOB.test(f))
    .sort();

  if (sqlFiles.length === 0) {
    console.error(`❌ No files matching ${BATCH_GLOB} found in ${DOCS_DIR}`);
    process.exit(1);
  }

  console.log(`\n📦 Found ${sqlFiles.length} question batch files in ${DOCS_DIR}\n`);

  // Fetch all existing question titles for dedup
  console.log("🔍 Fetching existing question titles from Supabase...");
  const { data: existingQuestions, error: fetchError } = await supabase
    .from("questions")
    .select("title");

  if (fetchError) {
    console.error("❌ Error fetching existing questions:", fetchError.message);
    process.exit(1);
  }

  const existingTitles = new Set(
    (existingQuestions || []).map((q: { title: string }) => q.title.trim())
  );
  console.log(`   Found ${existingTitles.size} existing questions in database.\n`);

  let totalInserted = 0;
  let totalSkipped = 0;
  let totalErrors = 0;

  for (const file of sqlFiles) {
    const filePath = path.join(DOCS_DIR, file);
    console.log(`📄 Processing: ${file}`);

    const sql = fs.readFileSync(filePath, "utf-8");
    const { rows, titles } = parseSqlFile(sql);

    if (rows.length === 0) {
      console.log(`   ⚠ No rows parsed — skipping\n`);
      continue;
    }

    console.log(`   Parsed ${rows.length} questions (${titles.length} titles)`);

    // Filter out already-existing titles
    const newRows = rows.filter((row) => {
      const title = (row.title as string).trim();
      if (existingTitles.has(title)) return false;
      return true;
    });

    const skipped = rows.length - newRows.length;
    if (skipped > 0) {
      console.log(`   ⏭ Skipping ${skipped} already-existing questions`);
      totalSkipped += skipped;
    }

    if (newRows.length === 0) {
      console.log(`   ✅ All questions already exist — nothing to insert\n`);
      continue;
    }

    // Insert in batches of 50 to avoid payload limits
    const BATCH_SIZE = 50;
    let inserted = 0;
    let errors = 0;

    for (let i = 0; i < newRows.length; i += BATCH_SIZE) {
      const batch = newRows.slice(i, i + BATCH_SIZE);

      const { error } = await supabase.from("questions").insert(batch);

      if (error) {
        console.error(`   ❌ Insert error (batch ${Math.floor(i / BATCH_SIZE) + 1}):`, error.message);
        errors += batch.length;

        // Try one-by-one for better error reporting
        for (const row of batch) {
          const { error: singleError } = await supabase
            .from("questions")
            .insert(row);
          if (singleError) {
            const title = (row.title as string).substring(0, 60);
            // Check if it's a duplicate (already exists from a previous batch insert)
            if (singleError.message?.includes("duplicate") || singleError.code === "23505") {
              console.log(`   ⏭ Duplicate: "${title}..." — skipped`);
              totalSkipped++;
            } else {
              console.error(`   ❌ Failed: "${title}..." — ${singleError.message}`);
              totalErrors++;
            }
          } else {
            inserted++;
            existingTitles.add((row.title as string).trim());
          }
        }
      } else {
        inserted += batch.length;
        // Add to existing set to avoid duplicates across files
        for (const row of batch) {
          existingTitles.add((row.title as string).trim());
        }
      }
    }

    totalInserted += inserted;
    totalErrors += errors;
    console.log(`   ✅ Inserted ${inserted} new questions\n`);
  }

  // ── Summary ────────────────────────────────────────────────────
  console.log("═".repeat(50));
  console.log("  SEED COMPLETE");
  console.log("═".repeat(50));
  console.log(`  ✅ Inserted: ${totalInserted}`);
  console.log(`  ⏭ Skipped:  ${totalSkipped} (already exist)`);
  console.log(`  ❌ Errors:   ${totalErrors}`);
  console.log("═".repeat(50));

  if (totalErrors > 0) {
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
