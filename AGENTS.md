# Agent Notes

UQUVLI is a Next.js app for accessible digital life-skills education.

Before changing code:

- Keep learner screens calm, predictable and one-step-at-a-time.
- Do not commit real participant data, server credentials or local `data/uquvli-db.json`.
- Run `npm run lint` and `npm run build` before claiming app changes are ready.
- For production, require `UQUVLI_SESSION_SECRET`.

Important areas:

- `src/components/trainers` contains interactive trainer components.
- `src/data/program.ts` contains lesson/module content.
- `src/lib/server/uquvli-store.ts` contains local JSON storage for demo/pilot use.
- `public/lesson-docx` contains downloadable lesson materials.
