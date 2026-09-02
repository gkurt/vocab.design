---
name: Progressive profiling
slug: progressive-profiling
category: pattern
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: Collecting profile details a few at a time across separate visits,
  instead of demanding the whole record in one long form at registration.
aliases:
  - name: incremental profiling
    source: community
  - name: drip profiling
    source: community
  - name: profile completeness
    source: community
tags:
  - auth
  - forms
  - onboarding
relations:
  contrastWith:
    - gradual-engagement
  variantOf: []
  partOf: []
  seeAlso:
    - microsurvey
implementations: []
sources:
  - title: "UI Patterns: Completeness meter"
    url: https://ui-patterns.com/patterns
demo: inline
exhibit: false
useWhen: the product asks for one more detail each time you return
---

Progressive profiling answers a specific problem: every field added to a registration
form costs sign-ups, and every field left out costs the product something it wanted to
know. Rather than choose, the questions are spread out. Registration asks for the minimum
that makes the product work, and each later visit asks for one more small thing, at a
moment when the reason for asking is visible. The record fills up over weeks instead of
in one sitting, and nobody was ever facing twelve empty fields.

Three things have to be true for each ask, or the pattern becomes a tax on returning. It
has to be one question, not a section. It has to be skippable, and the skip has to be
remembered, so the same question is not waiting again tomorrow. And it should buy
something the reader can see: asking for a postcode next to the delivery estimate it
improves reads as useful, while asking for it beside nothing reads as data collection,
which it is. A reading of how complete the profile is helps, for the same reason
[steps left](/steps-left) helps anywhere else: it turns an open-ended series of asks into
a thing with an end.

The neighbouring word is [first run experience](/first-run-experience), and the
difference is where each one lives in time: a first run experience is bounded to the very
first open and is then gone for good, while progressive profiling is the long tail of
every later visit. They are often designed together, since what the first open decides
not to ask is exactly what the later visits inherit.

The failure mode is easy to name and common to see. An ask that arrives on every visit,
ignores the last refusal, or blocks the thing the reader came to do has stopped being
progressive profiling and become [nagging](/nagging) with a progress bar attached. The
same applies at the other end: pairing this with
[lazy registration](/lazy-registration) is the honest version, because the account is
built out of things the reader actually did, but only while each question stays optional
and each answer stays useful to the person giving it.
