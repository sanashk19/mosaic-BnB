# Security Policy

Mosaic is an accessible education platform, and privacy is part of the core product surface.

## Sensitive Information & Guidelines

- Do not commit production credentials, server IPs, AWS secret keys or deployment tokens.
- Do not commit real student, parent, teacher or researcher personal profiles.
- Any runtime database in `data/` is ignored by Git and should be kept private.

## Production Requirements

Set a strong `SESSION_SECRET` in production. The application will refuse to use fallback secrets in production environments.

## Reporting Issues

Please report any security or accessibility concerns responsibly to the repository maintainers.
