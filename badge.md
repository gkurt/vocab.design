---
name: Badge
slug: badge
category: component
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: A small marker attached to another element that carries a count or a
  status and is not interactive on its own.
aliases:
  - name: dock badge
    source: merged-candidate
  - name: app icon badge
    source: merged-candidate
  - name: notification badge
    source: merged-candidate
  - name: count badge
    source: community
  - name: unread count
    source: merged-candidate
  - name: red dot
    source: merged-candidate
tags:
  - messaging
relations:
  contrastWith:
    - chip
    - tag
    - presence-indicator
    - achievement-badge
  variantOf: []
  partOf: []
  seeAlso:
    - push-notification
implementations:
  - system: material
    name: Badges
    url: https://m3.material.io/components/badges/overview
  - system: fluent
    name: Badge
    url: https://fluent2.microsoft.design/components/web/react/core/badge/usage
sources:
  - title: "Material Design 3: Badges"
    url: https://m3.material.io/components/badges/overview
demo: inline
exhibit: false
useWhen: a count or status stuck to something else
---

Two halves of the definition do all the discriminating, and both are easy to check.
A badge is *attached*: it has no meaning apart from the thing it sits on, and moving
it somewhere else makes it nonsense, which is why it is drawn on a corner rather than
in the flow. And a badge is *not interactive*: it is a reading of its host, so pressing
it does nothing, and if it has its own hit target it has stopped being one. That second
half is the line against a [chip](/chip), which is a value you can select or remove, and
against a [tag](/tag), which is authored metadata you can usually filter by. Roughly: a
tag classifies, a chip operates, a badge reports.

What belongs in one is a small count or a state, and nothing else. A number, a "new", a
build result, a dot standing for "something changed here". A sentence does not fit and
should not be made to, and a badge that has to be truncated was carrying the wrong
content. Counts want a cap ("99+" is the convention) so the marker cannot outgrow the
thing it is stuck to, and the host has to be sized for the widest state at rest, or the
whole toolbar reflows the first time the number reaches two digits. The countless
variant, a plain dot, is the right choice whenever the exact number is not actionable:
nobody decides anything differently at 38 unread than at 41.

Accessibility is where badges quietly fail, because a bare numeral announces as a bare
numeral. "9" next to an icon button tells a screen reader nothing, so the count needs a
name that says what it counts, either folded into the host's accessible name ("Inbox, 9
unread") or carried by the badge itself. Colour alone is worse: a red dot with no text
equivalent is [use of colour](/use-of-color) as the only carrier. And if the count
changes while the reader is on the page, decide deliberately whether that change is
announced, because a badge wired as a live region will interrupt whatever they were
reading every time a message lands.

Two neighbours borrow the shape. A [presence indicator](/presence-indicator) is a badge
whose payload is one of a small set of states about a person, parked on an avatar, and
it gets its own entry because the states are the design. An
[achievement badge](/achievement-badge) is a different word that happens to look the
same: it is a collectible award displayed on a profile, and it is the thing itself
rather than a marker on something else. The one everybody has met is the count on an app
icon, which is the platform side of a [push notification](/push-notification) and the
reason "red dot" reads as a verdict on your morning.
