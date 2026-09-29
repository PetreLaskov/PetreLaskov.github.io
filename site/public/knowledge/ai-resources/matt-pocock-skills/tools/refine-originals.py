from pathlib import Path
import json, shutil, hashlib
R=Path(r'.').resolve()
if not (R/'reviews/original-portfolio.json').exists():raise SystemExit('Preserve independent initial audit before revisions.')
proposals={
'grill-me':{
'old':'counterexample-search','new':'preference-probes',
'skill':'''---
name: preference-probes
description: Discover tacit preferences through concrete contrasting examples when a user can recognize what fits but cannot yet describe the criteria.
---
# Preference Probes

Use when requests such as "less corporate," "more alive," or "this is not quite it" leave an important preference unclear. Help the user recognize a useful distinction rather than demanding an abstract style specification. Skip when the user already gave a precise edit or wants one final version without exploration.

Read the actual artifact, supplied references, approved facts and explicit constraints. Treat any inferred taste as a working hypothesis for this task, not a personality trait. Separate dissatisfaction with the content from dissatisfaction with its presentation.

Choose a contrast likely to change the work: direct versus reflective voice, explicit versus suggested meaning, dense versus spacious explanation, or another concrete dimension supported by the request. Produce a small set of usable examples. Hold factual content and unrelated dimensions steady enough that a preference between them is interpretable. Label the meaningful difference in plain words; avoid a flattering good option beside an obviously bad one.

Ask which example is closer and which specific feature to keep or reject. Offer a hybrid when the user's reaction identifies a combination. If no reaction is available, recommend a provisional direction and explain its tradeoff; do not record it as the user's preference.

Turn the response into a narrow working rule and try it on a fresh passage or adjacent example. Invite correction where the rule fails. A choice between two sentences is weak evidence for a global voice rule.

Deliver the improved artifact when the direction is clear enough. Preserve the selected examples only where the ongoing task needs them; do not create a permanent user profile or save cross-session preferences unless requested. Stop probing when another comparison is unlikely to change the next revision.
''',
'section':'''## Original proposal: preference-probes

Some preferences become clear only when we can react to something. "Less corporate" may mean shorter sentences, more particular observations, less self-promotion, fewer abstractions, or an entirely different claim. Asking the user to define the phrase can turn recognition into an unnecessary verbal exam. Preference-probes instead creates controlled contrasts that make the difference visible. The original aim is to help a person articulate their judgment through examples without pretending the assistant already knows their taste.

Suppose an introduction says, "I create innovative solutions and share transformative insights." The approved facts are simply that the person builds small tools and writes essays. One probe might say, "I build small tools and write about what I notice." Another might say, "This is where I keep the tools I make and the questions I am still working through." Both respect the facts. The useful distinction is whether the reader meets a concise description of activity or an invitation into ongoing work. A third version that suddenly adds dramatic biography would muddy the comparison by changing evidence and tone together.

The assistant asks which is closer and what feature matters. If the user likes the first version's directness but the second version's openness, the next draft combines those properties. The resulting rule is narrow: keep the activities concrete and allow the work to remain unfinished. It is not "this person always prefers modest language." Apply it to another passage before assuming it transfers.

This differs from grilling because a preference may be easier to recognize than to answer as a proposition. It differs from a prototype gallery because the contrasts are chosen to reveal a particular uncertainty, not merely display a variety of attractive results. The examples can be prose, interface wording, explanations, visual briefs or planning alternatives. The output remains the requested artifact; preference discovery should not become a new administrative project.

The cost is a small comparison round and the risk of anchoring the user on the options supplied. The skill therefore keeps a reasonable alternative alive, avoids presenting a caricature as the rejected option, and treats a hybrid or rejection as useful evidence. My bet is a pilot where repeated revisions show unresolved taste. The falsifier is that the probes change several things at once, yield unstable interpretations, or make the user do more work than a direct revision would require.

This proposal replaced the initial counterexample-search candidate after independent review found its mechanism already covered by construct-a-counterexample. That earlier candidate is preserved under reviews/superseded-originals. The change expands the collection's ability to discover positive preferences rather than adding another critique technique.
''',
'reason':'Independent portfolio review identified near-duplication with construct-a-counterexample. Replace the duplicate with concrete elicitation of tacit preferences.'},
'writing-fragments':{
'old':'counterimage','new':'anchored-variation',
'skill':'''---
name: anchored-variation
description: Develop meaningful creative variations while preserving the concrete features that give an idea or artifact its identity; use when revision is becoming generic or alternatives must retain a distinctive core.
---
# Anchored Variation

Read the supplied draft, design, image brief or other artifact and the user's requested change. Identify the few features that must survive: an explicit constraint, an unusual relationship, a tonal tension, a composition, a recurring image, or a pattern of reader experience. Describe anchors concretely. "Keep it authentic" is not an operational anchor. Distinguish user requirements from your interpretation of the artifact's signature.

If two plausible signatures would lead to substantially different work, expose that choice. Otherwise state a provisional reading briefly and proceed. Do not make the user approve an analysis before receiving useful variations when the brief is already sufficient.

Choose dimensions along which changing the artifact would reveal something: viewpoint, scale, rhythm, material, sequence, degree of explanation, or another meaningful dimension for the medium. Create a few usable alternatives that vary in mechanism, not just adjectives. Keep the anchors intact unless the user has authorized breaking them. Include a conservative revision when it provides a useful reference point.

For each alternative, name what changed, what survived, and the cost of that choice. Let the actual artifact carry most of the explanation. Do not append a moral, polished resolution or familiar genre flourish merely to make an unusual piece feel finished.

Compare each result to the supplied artifact as well as to the other variants. Check whether the distinctive relationship still does work. Reject variations that satisfy literal constraints while flattening the effect they were meant to protect.

Use the user's selection to refine this artifact. Do not infer a permanent taste profile from one choice. Deliver the selected or recombined version when requested, retaining any unresolved preference as a local working question. Stop when the variations illuminate a useful choice; volume is not creative range.
''',
'section':'''## An original proposal: anchored-variation

Creative collaboration often fails through competent normalization. A strange opening becomes a familiar hook, an unresolved ending gains an explanatory moral, or a visual idea acquires the conventions of its nearest genre. Each revision may be fluent while removing the reason the original was interesting. Anchored-variation protects that reason while still permitting substantial invention. It asks which concrete features carry the artifact's identity, then varies other dimensions deliberately.

Consider the fragment: "The kettle clicks off. Nobody moves. Outside, a delivery drone mistakes the church bell for an instruction." Its possible anchors are a quiet domestic opening, a deadpan crossing of ordinary and absurd systems, and an ending that leaves the consequence unstated. Those are an interpretation, not a fact about what the author must value. If the user explicitly chose them, the assistant can vary viewpoint, temporal distance or sentence rhythm while preserving that relation. It should not turn the fragment into a cheerful story about technology bringing people together.

One variant might hold the camera inside the silent kitchen and let the drone appear only through a sound. Another might view the same sequence from a neighbor's window. A conservative version might alter only the last sentence's cadence. The variants are useful because their mechanisms differ, not because one is called poetic and another cinematic. Each carries a short account of what changed and what effect may have been lost. The author can select an actual possibility instead of agreeing to adjectives.

The scope is broader than prose. A diagram can preserve a surprising relation while changing its representation; a visual brief can retain composition while changing material; an explanation can keep its central analogy while changing its path through the evidence. Source accuracy, explicit constraints and medium-specific tool limits still apply. The skill does not authorize inventing a person's experience, replacing their objective or silently ignoring a requested invariant.

Within this collection, the contribution is deliberate preservation of creative identity during variation. Writing-fragments gathers material; writing-shape builds an argument; anchored-variation examines how far a particular piece can move while remaining itself. The cost is an editorial interpretation that may be wrong. A useful falsifier is that users repeatedly have to restore the same distinctive feature after receiving the variants. Another is that literal compliance preserves the words but loses the effect. A pilot should compare the actual alternatives and the user's corrections, not count how many versions were generated.

This proposal replaces the initial counterimage candidate, whose central operation substantially overlapped thesis-stress-test. The earlier instructions are preserved under reviews/superseded-originals. The revision gives the collection a stronger generative capability while keeping the critical technique available in the thesis skill.
''',
'reason':'Independent portfolio review identified substantial overlap with thesis-stress-test. Replace the duplicate with identity-preserving creative variation.'}
}
log=[]
for slug,p in proposals.items():
 src=(R/'original-skills'/p['old']).resolve();dst=(R/'reviews/superseded-originals'/p['old']).resolve()
 if not src.is_relative_to(R) or not dst.is_relative_to(R):raise RuntimeError('Unsafe archive path')
 if dst.exists():raise RuntimeError('Prior original revision already exists')
 dst.parent.mkdir(parents=True,exist_ok=True)
 oldhash=hashlib.sha256((src/'SKILL.md').read_bytes()).hexdigest()
 shutil.move(str(src),str(dst))
 target=R/'original-skills'/p['new'];target.mkdir();(target/'SKILL.md').write_text(p['skill'],encoding='utf-8')
 chapter=R/'chapters'/(slug+'.md');text=chapter.read_text(encoding='utf-8')
 (dst/'chapter-before-revision.md').write_text(text,encoding='utf-8')
 start=text.index('## '+('An original proposal:' if slug=='writing-fragments' else 'Original proposal:'))
 end=text.index('## Study exercises and connections',start)
 text=text[:start]+p['section']+'\n'+text[end:]
 text=text.replace(p['old'],p['new'])
 # Restore the historical name in the explicit revision account after link updates.
 text=text.replace('initial '+p['new']+' candidate','initial '+p['old']+' candidate')
 chapter.write_text(text,encoding='utf-8')
 mp=R/'reviews'/('author-'+slug+'.json');m=json.loads(mp.read_text(encoding='utf-8'))
 (dst/'author-metadata-before-revision.json').write_text(json.dumps(m,indent=2),encoding='utf-8')
 m['initial_original_slug']=p['old'];m['original_slug']=p['new'];m['original_path']='original-skills/'+p['new']+'/SKILL.md';m['original_revision_reason']=p['reason'];mp.write_text(json.dumps(m,indent=2),encoding='utf-8')
 log.append({'source_slug':slug,'old_original':p['old'],'old_sha256':oldhash,'archived_at':dst.relative_to(R).as_posix(),'new_original':p['new'],'new_sha256':hashlib.sha256((target/'SKILL.md').read_bytes()).hexdigest(),'reason':p['reason'],'evidence':'reviews/original-portfolio.json; replacement behavior not yet tested at this revision'})
(R/'reviews/original-revisions.json').write_text(json.dumps(log,indent=2),encoding='utf-8')
print(json.dumps({'replaced':len(log),'current_originals':len(list((R/'original-skills').glob('*/SKILL.md')))}))
