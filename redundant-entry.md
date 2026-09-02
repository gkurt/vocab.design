---
name: Redundant entry
slug: redundant-entry
category: accessibility
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-25T00:00:00.000Z
definition: The rule against asking for the same information twice in one
  process, unless it is re-entered for a real reason such as confirmation.
aliases:
  - name: re-entering information
    source: wcag
  - name: repeat entry
    source: community
tags:
  - forms
  - wcag
relations:
  contrastWith:
    - smart-defaults
    - input-purpose
  variantOf: []
  partOf: []
  seeAlso:
    - autofill
implementations: []
sources:
  - title: "WCAG 2.2: Redundant Entry"
    url: https://www.w3.org/TR/WCAG22/#redundant-entry
demo: inline
exhibit: false
useWhen: a wizard asks for the address a second time
---

Success criterion 3.3.7, Redundant Entry, is Level A and one of the additions in WCAG 2.2. It
says that information the reader already entered, or that was already given to them, must not be
required again in the same process unless it is auto-populated or available to select. The
canonical failure is a checkout that takes a billing address on step one and presents three
empty delivery fields on step two. The canonical fix is small: prefill them, or put a single
control there that says the delivery address is the billing one.

Two words carry most of the weight. **Process** is one uninterrupted activity with a shared goal,
so it covers a [wizard](/wizard), a checkout, or a booking, and it does not reach across
sessions or between two unrelated tasks. **Available to select** is the softer half of the
remedy: the information does not have to appear in the field by itself, it only has to be
reachable without being recalled and retyped, which is why a "same as billing" control, a
picker of saved addresses, or a repeated summary all satisfy it.

The exceptions matter as much as the rule, because they are what make it enforceable rather than
absurd. Re-entry is allowed when it is essential, which is exactly the case of confirming a new
password or a memory exercise where recall is the point; when security requires it; and when the
previously entered information is no longer valid. That first exception is worth reading beside
[accessible authentication](/accessible-authentication), which pushes in the opposite direction
on the same screen: confirm a password twice if you must, but do not make remembering one the
only way in.

This is filed under accessibility rather than convenience because the cost of repetition is not
evenly shared. Retyping a postcode is a small annoyance with a keyboard and a good memory, and it
is a real barrier for someone typing with a switch, someone whose short-term memory makes them
go and find the information again, and anyone whose [cognitive load](/cognitive-load) is already
at its limit halfway through a [form](/form). It also pairs badly with a long flow, so a
[steps left](/steps-left) indicator that promises two more screens is a promise worth keeping
honest. Keep it apart from two neighbours: [address autocomplete](/address-autocomplete) fetches
information the site never had, while this criterion is about information it already holds, and
[guest checkout](/guest-checkout) removes an account step rather than a repeated one. Where the
whole point is to show what was collected, a [check answers](/check-answers) page repeats the
information back without asking for it again, which is not redundant entry at all.
