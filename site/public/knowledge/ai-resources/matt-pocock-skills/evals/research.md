# Development evaluation: research

**Case-bound grades:** source A; refactor A; no-supplied-skill control A.

These grades cover three text-only fixture responses per condition, produced by one fresh agent per condition with shared context across cases. They do not measure live execution or long-term collaboration. Candidate identities and limitations are in [the protocol](PROTOCOL.md), [control addendum](PROTOCOL-ADDENDUM.md) and [condition manifests](CONDITIONS.json). Three independent graders assessed anonymized response labels against fixed assertions; wording can still reveal conditions.

| Condition | Supported assertion points | Clean cases | Grade |
|---|---:|---:|---|
| source | 7/7 | 3/3 | A |
| refactor | 7/7 | 3/3 | A |
| control | 7/7 | 3/3 | A |

## normal: research-N

Using only these fixture sources, answer whether API v2 supports bulk deletion: current official reference says DELETE /items accepts a single id; official v2 changelog says bulk deletion is planned; a blog says it launched. Give a brief cited finding with fixture labels, no browsing.

### Frozen criteria

1. Distinguishes planned from shipped capability
2. Gives precedence to relevant current primary evidence
3. Supports conclusion with fixture labels and acknowledges conflicting blog

### source response

The supplied official sources do not support saying API v2 currently offers bulk deletion. The current endpoint reference describes DELETE /items as accepting a single id, and the official v2 changelog lists bulk deletion as planned. [Fixture: current official reference; Fixture: official v2 changelog]

The blog’s claim that bulk deletion launched conflicts with those first-party sources. Without an updated official reference or other primary evidence, treat the blog claim as unconfirmed. [Fixture: blog]

Report wording: “The supplied v2 documentation supports single-item deletion; bulk deletion is described as planned. Availability of a released bulk-delete capability has not been established.” This finding uses only the fixture; no browsing or live API check occurred.

**Judgment:** 3/3. 

- Criterion 1: 1. Says single-item deletion is documented, bulk deletion is planned, and released availability is not established.
- Criterion 2: 1. Requires updated official or primary evidence before accepting the blog's launch claim.
- Criterion 3: 1. Includes fixture labels for each source and explains the blog conflicts with first-party sources.

### refactor response

API v2 bulk deletion is not supported by the supplied current official documentation. The current reference documents DELETE /items with a single id [fixture: current official reference], and the official v2 changelog describes bulk deletion as planned [fixture: official v2 changelog].

The blog's claim that it launched conflicts with both primary sources [fixture: blog]. On this evidence, do not design a bulk-delete integration or report the feature as released.

This establishes the documented support position, not a runtime test proving every possible bulk request fails. Release evidence or an updated official contract would be needed to overturn the finding. No browsing or API calls were performed.

**Judgment:** 3/3. 

- Criterion 1: 1. Contrasts the single-id reference and 'planned' changelog with an unestablished released bulk feature.
- Criterion 2: 1. Bases the documented support position on the current official reference and official changelog, not the conflicting blog.
- Criterion 3: 1. Uses fixture labels for both official sources and the blog, expressly naming their conflict.

### control response

API v2 does not have documented bulk-deletion support in the supplied official sources. The current reference specifies a single id for DELETE /items, and the official v2 changelog describes bulk deletion as planned. [Fixture: current official reference; Fixture: official v2 changelog]

The blog’s claim that it launched conflicts with those sources and is not sufficient to establish support. [Fixture: blog]

For an integration decision, treat bulk deletion as unavailable until the vendor supplies a current supported endpoint or clarifies the discrepancy. This is a finding about the supplied documentation; it does not prove that no undocumented or limited-access implementation exists. No browsing or runtime test was performed.

**Judgment:** 3/3. 

- Criterion 1: 1. Says bulk deletion lacks documented support and the changelog describes it as planned.
- Criterion 2: 1. Treats the current official endpoint/changelog as stronger support evidence than the blog launch claim.
- Criterion 3: 1. Labels current official reference, official v2 changelog, and blog; explicitly acknowledges the contradiction.

## stress: research-S

A vendor promises 99.99% uptime on a marketing page. Its status history shows two outages but no durations, and its SLA excludes maintenance. Can our report say independently verified 99.99%? Use only these facts.

### Frozen criteria

1. Rejects independently verified wording
2. Separates vendor claim, SLA definition, and missing measurement
3. States what evidence would resolve actual uptime without inventing it

### source response

No. “Independently verified 99.99% uptime” exceeds the evidence.

The marketing page supplies a vendor claim. Two recorded outages establish that outages occurred, but without their durations or a defined measurement window we cannot calculate uptime. The SLA’s maintenance exclusion also means its contractual metric may differ from an all-time availability measure.

Use: “The vendor advertises 99.99% uptime. Its status history lists two outages without durations, and its SLA excludes maintenance. We have not independently verified the advertised uptime.” [Fixture: marketing page; status history; SLA]

Verification would require outage durations, the period and denominator, treatment of maintenance, and an independent measurement source. None is supplied here.

**Judgment:** 3/3. 

- Criterion 1: 1. Answers 'No' and rejects independently verified wording.
- Criterion 2: 1. Distinguishes marketing claim, duration/window gaps, and contractual maintenance exclusions.
- Criterion 3: 1. Lists durations, denominator/period, maintenance treatment, and independent measurement, saying they are not supplied.

### refactor response

No. “Independently verified 99.99% uptime” exceeds the evidence.

Use: “The vendor advertises 99.99% uptime. Its status history records two outages, but durations are unavailable, so we cannot calculate observed availability. Its SLA excludes maintenance, making the contractual measurement narrower than total service availability.”

Verification needs a defined observation period, outage durations, coverage of unreported failures, and consistent treatment of maintenance. Two outages alone establish neither compliance nor noncompliance: their durations matter. A marketing promise and vendor-maintained history are also not independent measurement.

Label 99.99% as the vendor's advertised figure; observed uptime remains unverified. These facts support the wording above without further research.

**Judgment:** 3/3. 

- Criterion 1: 1. Explicitly rejects 'Independently verified 99.99% uptime' as exceeding the evidence.
- Criterion 2: 1. Separates vendor advertising, missing outage durations, and an SLA excluding maintenance.
- Criterion 3: 1. Requests an observation period, durations, coverage of unreported failures, and consistent maintenance treatment; notes vendor history is not independent measurement.

### control response

No. The facts support “the vendor advertises 99.99% uptime,” not “independently verified 99.99%.” Outage counts without durations cannot establish total downtime or calculate an availability percentage. We also lack the measurement period and a definition of which service failures count.

Suggested report wording: “The vendor claims 99.99% uptime. Its status history records two outages without durations, so we could not independently calculate availability. Its SLA excludes maintenance; SLA compliance may therefore differ from users’ experienced availability.”

To verify a percentage, obtain outage durations and coverage for a defined period, then calculate against an explicit availability definition, ideally supported by independent monitoring.

**Judgment:** 3/3. 

- Criterion 1: 1. Says the facts support a vendor advertisement, not an independently verified percentage.
- Criterion 2: 1. Separates claimed uptime, unknown downtime/measurement period, and SLA compliance versus user availability.
- Criterion 3: 1. Calls for durations and coverage over a defined period and explicit availability definition, ideally supported by independent monitoring.

## non-trigger: research-X

In the paragraph I supplied, replace every occurrence of colour with color; do not research anything.

### Frozen criteria

1. Performs or requests the missing paragraph for the edit without research

### source response

Please paste the paragraph so I can replace “colour” with “color”.

**Judgment:** 1/1. 

- Criterion 1: 1. Asks for the missing paragraph to replace colour with color; no research proposed.

### refactor response

Please paste the paragraph to edit; it isn't included here.

**Judgment:** 1/1. 

- Criterion 1: 1. Asks for the paragraph because it is not included; no research proposed.

### control response

Please paste the paragraph, and I’ll replace every occurrence of “colour” with “color.”

**Judgment:** 1/1. 

- Criterion 1: 1. Asks for the paragraph and promises the specified replacement; no research proposed.

## What this warrants

A passing response supports the listed local claims only. A tie does not prove the packages are equivalent; a win does not establish a general performance gain. Where the control already succeeds, the trial does not establish a need for an additional skill. Package structure is checked separately. The original proposal is a separately authored candidate, not a behavior-tested winner by inheritance.
