# Security Policy

UQUVLI is an education project, and privacy is part of the product surface.

## Do Not Commit

- SSH credentials, server IPs, API tokens or deployment secrets.
- Real student, parent, teacher or researcher profiles.
- Questionnaire answers from real people.
- Event logs or progress records from a real pilot.
- Password hashes from any non-demo environment.

The runtime database `data/uquvli-db.json` is ignored by Git. Treat it as sensitive if the app has been used by real people.

## Production Requirements

Set a strong `UQUVLI_SESSION_SECRET` in production. The app refuses to use the development fallback secret when `NODE_ENV=production`.

## Reporting Issues

Please report security or privacy issues privately to the maintainer before opening a public issue. Include:

- A short description of the issue.
- Steps to reproduce.
- Whether real user data could be exposed.
- Suggested mitigation if you have one.

If a public issue already contains sensitive information, ask maintainers to remove or redact it before discussion continues.
