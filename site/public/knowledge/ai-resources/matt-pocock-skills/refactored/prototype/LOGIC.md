# Logic prototype

Build one self-contained HTML/CSS/JS file that opens without a server or installation.

State the question visibly. Keep the model in a pure module separated from DOM code: reducer, state machine, functions, or a small state-owning interface as appropriate. The page calls the model, never the reverse.

Use domain-language labels. Show the full relevant state as readable fields after each action. Provide free-play actions, including observable handling of illegal attempts, and guided scenario tabs. Each scenario explains what to watch and resets to a known initial state.

Cover the ordinary path, an awkward edge, and an illegal action relevant to the question. Smoke-check these paths and the reset. Keep typography clear and decoration restrained.

The pure model may inform implementation; the demo shell is experimental. Capture the verdict and artifact using SKILL.md.
