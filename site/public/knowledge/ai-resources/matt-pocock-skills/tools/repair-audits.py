from pathlib import Path
import hashlib, json, shutil
R=Path(r'.').resolve()
log=[]
def change(rel, before, after, issue):
 p=R/rel
 text=p.read_text(encoding='utf-8')
 if before not in text: raise RuntimeError('Missing exact anchor '+rel)
 old=hashlib.sha256(p.read_bytes()).hexdigest()
 text=text.replace(before,after,1)
 p.write_text(text,encoding='utf-8',newline='\n')
 log.append(dict(path=rel,issue=issue,before_sha256=old,after_sha256=hashlib.sha256(p.read_bytes()).hexdigest()))
for slug in ['wizard','triage']:
 dest=R/'evals/candidate-v1'/slug
 if dest.exists():raise RuntimeError('Already archived '+slug)
 shutil.copytree(R/'refactored'/slug,dest)
for slug in ['instruction-ablation','thesis-stress-test']:
 dest=R/'reviews/original-v1'/slug
 if dest.exists():raise RuntimeError('Already archived '+slug)
 shutil.copytree(R/'original-skills'/slug,dest)
change('refactored/triage/SKILL.md',
 'Apply only authorized changes, remove conflicting state roles, and read back the result.',
 'For every wontfix reason, post the appropriate explanation and close the item when the requested triage scope authorizes those actions. A label-only request authorizes labels only: report closure as unapplied, and do not post or close it.\n\nApply only authorized changes, remove conflicting state roles, and read back both labels and open/closed status.',
 'Restore the source terminal disposition without overriding label-only scope.')
change('refactored/wizard/template.sh',
 '  read -r _ || true',
 '  if ! read -r _; then\n    SKIPPED+=("manual confirmation: input ended")\n    warn "input ended; setup is incomplete" >&2\n    return 1\n  fi', 'Stop on EOF in manual confirmation.')
change('refactored/wizard/template.sh',
 '  read -r input || true\n  [[ -z "$input" && -n "$current" ]] && input="$current"\n  printf -v "$key" \'%s\' "$input"',
 '''  if ! read -r input; then
    SKIPPED+=("required input $key: input ended")
    warn "input ended before $key; setup is incomplete" >&2
    return 1
  fi
  [[ -z "$input" && -n "$current" ]] && input="$current"
  if [[ -z "$input" ]]; then
    SKIPPED+=("required input $key: empty")
    warn "$key is required" >&2
    return 1
  fi
  printf -v "$key" '%s' "$input"''', 'EOF cannot reuse a saved value; require nonempty input.')
change('refactored/wizard/template.sh',
 '  read -rs input || true\n  printf \'\\n\'\n  [[ -z "$input" && -n "$current" ]] && input="$current"\n  printf -v "$key" \'%s\' "$input"',
 '''  if ! read -rs input; then
    printf '\\n'
    SKIPPED+=("required secret $key: input ended")
    warn "input ended before $key; setup is incomplete" >&2
    return 1
  fi
  printf '\\n'
  [[ -z "$input" && -n "$current" ]] && input="$current"
  if [[ -z "$input" ]]; then
    SKIPPED+=("required secret $key: empty")
    warn "$key is required" >&2
    return 1
  fi
  printf -v "$key" '%s' "$input"''', 'Secret input has the same required-input contract without printing values.')
change('refactored/wizard/template.sh',
 '  warn "skipped GitHub secret $name: gh not ready; set it later"',
 '  warn "skipped GitHub secret $name: gh unavailable, unauthenticated, or write failed" >&2\n  return 1',
 'Failed required remote secret writes return failure.')
change('refactored/wizard/template.sh',
 '  warn "skipped GitHub variable $name, gh not ready; set it later"',
 '  warn "skipped GitHub variable $name: gh unavailable, unauthenticated, or write failed" >&2\n  return 1',
 'Failed required remote variable writes return failure.')
change('refactored/wizard/template.sh',
 '  printf \'\\n%s%s  ✓ Setup complete%s\\n\' "$BOLD" "$GREEN" "$RESET"',
 '''  if (( ${#SKIPPED[@]} )); then
    printf '\\n%s%s  Setup incomplete%s\\n' "$BOLD" "$YELLOW" "$RESET"
  else
    printf '\\n%s%s  ✓ Setup complete%s\\n' "$BOLD" "$GREEN" "$RESET"
  fi''', 'Completion headline must agree with recorded failures.')
change('refactored/wizard/template.sh',
 '    for s in "${SKIPPED[@]}"; do note "  - $s"; done\n  fi\n  printf \'\\n\'\n}',
 '    for s in "${SKIPPED[@]}"; do note "  - $s"; done\n    printf \'\\n\'\n    return 1\n  fi\n  printf \'\\n\'\n}', 'Incomplete setup exits unsuccessfully.')
change('refactored/wizard/template.sh',
 '# to a warning (and records it) if gh is unavailable or unauthenticated.',
 '# to a recorded warning and failure status if gh is unavailable, unauthenticated,\n# or the write fails. Do not suppress this status in generated stages.',
 'Document the repaired helper return contract.')
change('refactored/wizard/SKILL.md',
 '## Author with the unchanged template',
 '## Author with the supplied template', 'Distinguish repaired port template from the upstream original.')
change('refactored/wizard/SKILL.md',
 'Read and copy [template.sh](template.sh). Keep the library above STAGES unchanged;',
 'Read and copy [template.sh](template.sh). This port repairs input and completion handling in the upstream helper. Its ask helpers require nonempty values; an explicit Enter can reuse a saved value, but EOF fails. Required remote writes return failure and recorded skips make finish report incomplete. Keep this supplied library above STAGES unchanged;',
 'Expose the executable contract to wizard authors.')
change('original-skills/instruction-ablation/SKILL.md',
 'Run conditions in separate fresh contexts when available, with equal task information and side-effect permissions.',
 'Before running, inspect and record each effective treatment context. Verify that the chosen instruction and equivalent rules are absent from the absent condition, including inherited instructions, other skills, and the task itself. Do not remove higher-priority requirements. If true absence cannot be achieved or verified, call the comparison an incremental wording experiment and restrict its conclusion accordingly.\n\nRun conditions in separate fresh contexts when available, with equal task information and side-effect permissions.',
 'ORIG-001: prevent treatment contamination from masquerading as a valid ablation.')
change('original-skills/thesis-stress-test/SKILL.md',
 'Provide the revised thesis, one revised supporting paragraph, and the smallest additional evidence that would justify the stronger original formulation. Apply edits when requested; otherwise leave the artifact intact. End with a specific observation that would make the revised thesis fail.',
 'Provide the revised thesis, one revised supporting paragraph, and the smallest additional support that could justify the stronger original formulation. Apply edits when requested; otherwise leave the artifact intact. End with a challenge appropriate to the claim: counterevidence for an empirical assertion, a competing value or unacceptable implication for a normative position, fidelity and scope for a personal report, or explanatory usefulness and limits for a metaphor. A report of experience or statement of value need not become an empirical hypothesis to deserve serious scrutiny.',
 'ORIG-002: preserve the kind of claim during the final challenge.')
(R/'reviews/audit-repairs.json').write_text(json.dumps(log,indent=2),encoding='utf-8')
print(json.dumps({'changed_files':len(set(x['path'] for x in log)), 'recorded_changes':len(log)}))
