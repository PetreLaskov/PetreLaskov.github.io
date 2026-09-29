# Offline architecture report

Write one HTML file in the OS temporary directory with inline CSS and SVG or simple semantic HTML diagrams. No network dependency is needed. Use the host viewer; inspect rendering when available and disclose if only static validation was possible.

Header: repository, date, inspected scope, and a compact visual legend. Mark before as observed and after as proposed.

Each candidate is an article: short domain-centered title, strength badge, dependency category, files/evidence, before/after diagram, one-sentence problem and ownership change, concrete benefits, migration cost, uncertainty, and relevant ADR callout.

Use a relationship graph for call dependencies, a cross-section for redundant forwarding, or a collapse diagram for knowledge moved behind one interface. Size diagrams to remain legible. Do not imply measured complexity by arbitrary box area.

End with a top recommendation and why, or a clear no-candidate conclusion. Use plain language; architectural terms should clarify rather than prevent accurate technology names.

Escape repository-derived text before inserting it into HTML. Keep scripts absent; diagrams are illustrative, not executable repository content. A fallback text description must carry the same relationship if graphics cannot be viewed.
