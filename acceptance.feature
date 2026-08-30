Feature: AFK workflow for sport-clone

  Rule: The repository has a self-contained AFK execution contract

    Scenario: A Node implementation agent can verify the project
      Given the sport-clone repository is checked out in an AFK task worktree
      When the agent runs the documented project check
      Then `npm run check` completes the Vite production build successfully
      And the agent can run the commit policy check on a task branch

    Scenario: Planning remains an explicit human-confirmed phase
      Given an owner is exploring a sport-clone product change
      When grilling reaches an empty frontier
      Then the agent reports `GRILLING_COMPLETE` and stops
      And `/to-spec` and `/to-tickets` remain the only interactive planning entry points

  Rule: Trusted AFK automation protects the project

    Scenario: An owner-authored issue can enter implementation
      Given the repository has an eligible native issue and an online scoped runner
      When the owner applies `agent:implement`
      Then the implementation workflow runs from the trusted default-branch controller
      And the result is delivered through a pull request rather than the default branch

    Scenario: An untrusted pull request cannot mutate the repository
      Given a pull request is from a fork or a non-owner author
      When an AFK mutation label is added
      Then the mutation job does not run

    Scenario: A review canary completes on the live runner
      Given a disposable owner-authored canary pull request exists
      When the owner applies `agent:review`
      Then Standards and Spec review passes complete in parallel
      And candidate code never receives the host write token
      And the review result is posted without an `agent:blocked` label
