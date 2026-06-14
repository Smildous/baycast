# AQ-381 warm target source audit

Public settlement URL checked for context: https://baycast-p.vercel.app/settlements/apple-mac-pro-wwdc-2026

J'ai audité uniquement les sources locales demandées et les docs existantes. Aucun message n'a été envoyé.

Sources vérifiées:

- `/root/baycast-private`: le seul fichier trouvé est `/root/baycast-private/outreach/warm_targets.example.csv`. Il contient seulement le header AQ-380, aucun contact réel.
- `/root/obsidian-vault/Smil/Baycast`: recherche sur les fichiers Baycast locaux avec les termes warm, target, outreach, contact, email, investor, founder, journalist, creator, settlement. Les résultats sont des logs, briefs, métriques ou docs de gate. Pas de warm target list exploitable.
- `/root/obsidian-vault/Smil/Baycast/Metrics.csv`: fichier de métriques produit, pas une liste de personnes.
- `/root/baycast-marketing/docs/AQ380_FIRST_SETTLEMENT_OUTBOUND_BOOTSTRAP_JUN14_13H.md`: donne les archétypes, le schéma CSV et le gate d'envoi. Il ne nomme aucun contact et dit explicitement de ne pas inventer de cibles.
- Docs marketing précédentes dans `/root/baycast-marketing/docs`: elles répètent que la warm target list privée manque. Aucun doc audité ne fournit de contacts réels approuvés hors git.

Résultat: aucune source locale ne contient une liste chaude réelle, approuvée, avec personnes, canal, relation et raison de contact. Je n'ai pas inventé de noms et je n'ai pas scrapé de données privées.

CSV privé: créé hors git à `/root/baycast-private/outreach/warm_targets_jun14_19h.csv`. Il sert de gate file avec le header AQ-380 et deux lignes TODO marquées comme non-contacts. Il ne contient aucun vrai destinataire.

Verdict d'envoi: NO-SEND. Le lien public de settlement existe, mais la condition warm target list réelle hors git n'est pas remplie. Aucun email, DM, post, commentaire ou autre message n'est parti.

Condition exacte de déblocage: Smil ou un teammate approuvé doit déposer hors git, par exemple dans `/root/baycast-private/outreach/warm_targets_jun14_19h.csv`, 1 à 10 vrais contacts warm avec au minimum archetype, name ou handle_or_email, platform, relationship, why_relevant, last_context, opt_in_status, personal_note, owner et next_action. Chaque ligne doit venir d'un contexte réel connu, pas d'un scrape, pas d'une supposition. Ensuite seulement le gate peut être rechecké avec le public settlement URL clean.
