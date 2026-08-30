# Domain Docs

This is a single-context repository.

## Consumer rules

- Read root `CONTEXT.md` before exploring a domain area when it exists.
- Read relevant decisions under `docs/adr/` when they exist.
- Use the glossary vocabulary from `CONTEXT.md` in issue titles, proposals, tests, and refactors.
- Surface conflicts with an ADR instead of silently overriding it.

## Layout

```text
/
|-- CONTEXT.md
|-- docs/adr/
`-- src/
```

Missing context or ADR files are not blockers. Create them lazily when a domain term or decision needs to be recorded.
