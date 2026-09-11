# UQUVLI

UQUVLI is an open-source accessible learning platform for children with special educational needs and intellectual disabilities. It teaches practical digital life skills through short lessons, role-based dashboards, interactive trainers, downloadable lesson materials and research-friendly progress exports.

Live demo: [uquvli.uz](https://uquvli.uz)

This repository is the clean open-source edition prepared for public development. It intentionally excludes server credentials, production deployment files and local participant data.

## Why It Exists

Many children with special educational needs need digital skills taught as calm, concrete, repeatable actions: one step on the screen, clear feedback, large controls and practical situations from everyday life. UQUVLI focuses on those needs instead of treating accessibility as an afterthought.

The project is currently aimed at learners who benefit from adapted instruction, including children with F70/intellectual disability profiles. The platform can be used by families, teachers, researchers and inclusive education teams.

## What Is Included

- 30 adapted digital life-skills lessons across 7 modules.
- 39 interactive trainers for real-world digital scenarios.
- Role-based dashboards for student, parent, teacher and researcher workflows.
- Teacher tools for opening lessons to a class and downloading lesson plans.
- Researcher tools for participant overview, event logs, questionnaires and XLSX export.
- Russian and Uzbek interface/content support.
- Public DOCX lesson materials in `public/lesson-docx`.
- Local JSON storage for demos and pilots, ignored by Git.

## Demo Accounts

The app creates demo users on first login. These are fictional local demo profiles, not real participants.

| Role | Login code | Password |
| --- | --- | --- |
| Parent | `1` | `1` |
| Student | `2` | `2` |
| Teacher | `3` | `3` |
| Researcher | `4` | `4` |

You can also use the demo emails from `src/data/demo-user.ts`.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

For a production-like local check:

```bash
npm run lint
npm run build
```

## Environment

For local development, the app uses a development-only session secret. For production deployments, set:

```bash
UQUVLI_SESSION_SECRET="replace-with-a-long-random-secret"
```

Runtime demo data is written to `data/uquvli-db.json`. That file is intentionally ignored and must not be committed if it contains real users, questionnaire answers or event logs.

## Project Structure

```text
src/app                 Next.js app routes and API routes
src/components          UI, dashboards, lesson player and trainers
src/components/trainers Interactive digital skills trainers
src/data                Lesson, homepage, questionnaire and demo content
src/lib                 Shared types, i18n, DOCX generation and server storage
public/lesson-docx      Downloadable lesson materials
docs                    Roadmap, OSS application notes and contributor docs
```

## Open Source Scope

The public repository contains the reusable educational platform, adapted lesson flows, trainer interfaces and local demo infrastructure. It does not contain:

- SSH credentials or deployment secrets.
- Production server configuration.
- Real student, parent, teacher or researcher data.
- Private research working files that are not needed to run the platform.

## Built With Codex

UQUVLI has been developed and maintained with substantial help from OpenAI Codex. Codex is used for frontend implementation, accessibility iteration, bug fixing, documentation, refactoring and future development planning.

## Roadmap

See [docs/ROADMAP.md](docs/ROADMAP.md).

## Contributing

Inclusive education tools need careful changes. Please read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request.

## Security And Privacy

Do not commit real learner data. See [SECURITY.md](SECURITY.md) for reporting guidance and data-handling expectations.

## License

MIT. See [LICENSE](LICENSE).
