# UI prototype

Prefer variants inside an existing page, retaining its fetching, auth, parameters, and surrounding application. Use a marked throwaway route following project conventions only when no plausible host exists.

Default to three variants, at most five. They must differ in structure, hierarchy, or primary affordance rather than colors. Use the project's components and representative data; share small common elements without forcing one layout.

Select variants with a reload-stable, shareable variant query parameter. Add a distinct floating bottom-center bar with current name, previous and next controls, and wraparound. Support arrow keys except while an input, textarea, or editable region has focus.

Keep all prototype selection and rendering out of production; the normal host page remains the production behavior. Use read-only data or stub mutations. Smoke-check switching, reload, focused-input keys, and production gating.

Show the user the variants and their tradeoffs. Preserve their choice or combination; do not select on their behalf and call it validated. Capture all variants as evidence, then implement the chosen direction under normal production standards when authorized. Remove experimental routes, losing variants, and switcher from the production path.
