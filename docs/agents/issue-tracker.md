# Issue tracker: Local Markdown

Issues and specs for this repo live as Markdown files in `.scratch/`.

## Conventions

- One feature per directory: `.scratch/<feature-slug>/`
- The spec is `.scratch/<feature-slug>/spec.md`
- Implementation issues are one file per ticket at `.scratch/<feature-slug>/issues/<NN>-<slug>.md`, numbered from `01`, never a single combined tickets file
- Triage state is recorded as a `Status:` line near the top of each issue file. See `triage-labels.md` for the role strings.
- Comments and conversation history append to the bottom of the file under a `## Comments` heading.

## Publishing

When a skill says to publish to the issue tracker, create a new file under `.scratch/<feature-slug>/`, creating the directory if needed.

## Wayfinding

- Map: `.scratch/<effort>/map.md`
- Child tickets: `.scratch/<effort>/issues/NN-<slug>.md`
- Child tickets record `Type:`, `Status:`, and, when applicable, `Blocked by:` lines.
- The frontier is the first open, unblocked, unclaimed child ticket by number.
