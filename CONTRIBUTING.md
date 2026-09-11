# Contributing

Thanks for helping improve UQUVLI. The project serves children with special educational needs, so contributions should keep the interface calm, predictable and accessible.

## Good First Contributions

- Improve accessibility: keyboard flow, contrast, focus states, labels and reduced cognitive load.
- Add tests for lesson flow, login, progress saving and researcher export.
- Improve documentation for schools, families and contributors.
- Add small trainer improvements that keep one clear task per screen.
- Improve Russian/Uzbek translations without changing educational meaning.

## Development

```bash
npm install
npm run dev
npm run lint
npm run build
```

The local runtime database is `data/uquvli-db.json`. It is ignored by Git. Do not commit real user data, event logs, questionnaire answers or password hashes.

## Pull Request Checklist

- The change is scoped and understandable.
- `npm run lint` passes.
- `npm run build` passes for app-level changes.
- UI changes remain usable with keyboard navigation and large touch targets.
- No real personal data, secrets, server addresses or credentials are included.
- New educational content is written in clear, concrete steps.

## Content Guidelines

- Prefer short sentences and one action at a time.
- Avoid shame, pressure, timers that create stress or punitive feedback.
- Use realistic situations: health, hygiene, communication, transport, finance, public services and safety.
- Keep all examples fictional unless explicit permission and anonymization are documented.
