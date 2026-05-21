#!/usr/bin/env node
/**
 * Read-only first-resolution readiness gate.
 *
 * Runs the live checks needed before first resolution work:
 *   1. all open questions have usable resolution URLs
 *   2. June closers pass resolution hygiene
 *
 * This wrapper only calls read-only verifier commands. It does not read forecasts
 * and does not request Supabase write access.
 */

import { spawn } from 'node:child_process'

const checks = [
  {
    name: 'resolution URLs',
    command: 'node',
    args: ['scripts/supabase-admin.mjs', 'verify-resolution-urls'],
    failure: 'First-resolution readiness failed: resolution URLs are not ready.',
  },
  {
    name: 'June resolution hygiene',
    command: 'node',
    args: [
      'scripts/supabase-admin.mjs',
      'verify-resolution-readiness',
      '--from',
      '2026-06-01T00:00:00.000Z',
      '--until',
      '2026-06-30T23:59:59.999Z',
    ],
    failure: 'First-resolution readiness failed: June resolution hygiene is not ready.',
  },
]

function runCheck(check) {
  return new Promise(resolve => {
    console.log(`\n== ${check.name} ==`)
    const child = spawn(check.command, check.args, {
      cwd: process.cwd(),
      env: process.env,
      stdio: 'inherit',
    })

    child.on('error', error => {
      console.error(check.failure)
      console.error(error.message)
      resolve(false)
    })

    child.on('close', code => {
      if (code === 0) {
        resolve(true)
        return
      }

      console.error(check.failure)
      console.error(`${check.command} ${check.args.join(' ')} exited with code ${code}`)
      resolve(false)
    })
  })
}

let ok = true
for (const check of checks) {
  ok = (await runCheck(check)) && ok
}

if (!ok) process.exit(1)
console.log('\nFirst-resolution readiness passed.')
