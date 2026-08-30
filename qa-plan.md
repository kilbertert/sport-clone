# sport-clone AFK QA plan

## Scope

Validate the generated AFK workflow, the Node build contract, trusted runner
configuration, and one disposable live canary. This plan does not assert sport
domain correctness or business acceptance.

## Cases

| ID | Environment | Preconditions | Test data | Actions | Expected observable result | Cleanup |
| --- | --- | --- | --- | --- | --- | --- |
| SPORT-AFK-01 | Linux checkout | Node 24 and npm available | Current sport-clone worktree | Run `npm ci`, `npm run check`, `npm run afk:policy`, and `git diff --check` | Build, policy check, and diff check exit 0 | Remove only disposable dependencies/artifacts |
| SPORT-AFK-02 | Generated repository | Clean task branch from `origin/main` | Scaffold payload and metadata | Inspect `.sandcastle/`, workflows, `AGENTS.md`, `CLAUDE.md`, `CONTEXT.md`, and `docs/adr/` | AFK files exist; template metadata is `1.1.5`; `CONTEXT.md` is glossary-only; phase gate requires explicit next invocation | None |
| SPORT-AFK-03 | Docker host | Merged scaffold and current Node dependencies | `sandcastle:sport-clone` | Build with host UID/GID and run `codex --version`, `claude --version`, and the generated policy check in the container | Image builds; both CLIs are present; no host skill directory is required; project worktree is mounted at runtime | Retain image for the runner |
| SPORT-AFK-04 | GitHub repository | Actions permissions, `AGENT_PAT`, read-only token, labels, and scoped runner configured | One owner-authored disposable issue | Apply `agent:implement`, retain run URL, inspect branch and draft PR | Implementation uses current controller and opens a PR; no default-branch push; failure labels are accurate | Close issue/PR and delete disposable branch |
| SPORT-AFK-05 | GitHub repository | Merged workflow and online runner | One owner-authored disposable canary PR | Apply `agent:review`, retain run URL, inspect review and labels | Standards and Spec complete; candidate has read token only; trusted delivery succeeds; no `agent:blocked` | Close canary PR and delete branch |

## Traceability

| Requirement | Feature scenario | QA cases |
| --- | --- | --- |
| Node verification is executable | A Node implementation agent can verify the project | SPORT-AFK-01 |
| Planning does not auto-advance | Planning remains an explicit human-confirmed phase | SPORT-AFK-02 |
| Scaffold is portable and governed | A Node implementation agent can verify the project | SPORT-AFK-02, SPORT-AFK-03 |
| Trusted implementation delivery | An owner-authored issue can enter implementation | SPORT-AFK-04 |
| Untrusted mutation is blocked | An untrusted pull request cannot mutate the repository | SPORT-AFK-04 |
| Two-axis review and token boundary | A review canary completes on the live runner | SPORT-AFK-05 |

## Execution results

Status: local scaffold and runner setup passed on `2026-08-31T03:31:00+08:00`;
live canary is blocked only by the missing least-privilege read token.

- Base: `sport-clone` `origin/main`
  `870103a2cb82b0f2a6eb42da948c70cbbd16b986`.
- Template: `afk-bootstrap` `b36e4a36d72e5ff565e29a6bd9c16c675508da8b`
  (template `1.1.5`).
- SPORT-AFK-01: passed on Linux with Node 24.20.0 and npm 11.19.0:
  `npm ci`, `npm run check`, `npm run afk:policy`, review-controller syntax,
  metadata/prompt assertions, and `git diff --check` all passed.
- SPORT-AFK-03: passed on `2026-08-31T03:15:21+08:00`. Built
  `sandcastle:sport-clone` as
  `sha256:45b6b691c0883141b285882fb936958a63c8e3471c5f6f4b877f79a4f1e6dca8`;
  Node 24.20.0, npm 11.19.0, Codex 0.146.1, and Claude Code 2.1.251 are
  present. The mounted project policy check passed, and no container skill
  directory was installed.
- Supplemental browser QA: failed outside the AFK configuration surface.
  `BASE_URL=http://127.0.0.1:5173 node scripts/qa.mjs` reached the `capture`
  route and reported React `Maximum update depth exceeded` from
  `CaptureCenter` in `src/ExtendedPages.jsx`. The run did not pass; this is a
  pre-existing application defect tracked as issue #14 to triage separately,
  not evidence of a successful desktop/mobile product acceptance.
- SPORT-AFK-04 and SPORT-AFK-05: pending the read-only token and disposable
  owner-authored canaries.
- GitHub setup: `AFK_PROFILE=aliyun-deepseek`, all triage/execution labels,
  `AGENT_PAT`, and workflow permissions (`write` + PR review approval) are
  configured. `server-dev-runner-sport-clone` is online with labels
  `self-hosted, Linux, X64, sport-clone`; its user service is enabled under
  `/home/claude/.config/systemd/user/`.
- Remaining blocker: `AFK_AGENT_READ_TOKEN` is not configured. The available
  host GitHub credential has write scope and is intentionally not reused for
  Docker candidate execution. Supply a repository-scoped read-only token before
  running SPORT-AFK-04/05; do not substitute `AGENT_PAT`.
