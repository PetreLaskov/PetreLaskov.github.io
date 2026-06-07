---
description: Start the local Quartz preview server with live-reload
allowed-tools: Bash(npx quartz build:*), Bash(lsof:*), Bash(kill:*)
---

Start the Quartz dev server so the user can preview the site locally before publishing.

## Steps

1. **Check for stale server.** Run `lsof -i :8080 -t 2>/dev/null` (or `ss -ltnp 'sport = :8080'`). If something is already listening on 8080, ask the user before killing it — it might be another project's preview.

2. **Start the server in the background** with `run_in_background: true`:
   ```
   npx quartz build --serve
   ```
   Quartz watches `content/` and rebuilds on save.

3. **Wait for "Started a Quartz server" in the output**, then print:
   ```
   📖 Preview: http://localhost:8080
   (live-reload — edits in content/ rebuild automatically)
   ```

4. **Stay out of the way.** Don't tail the output unless the user asks or a build fails. The server keeps running until the user stops the session or asks to kill it.
