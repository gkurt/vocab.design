---
name: Emergency exit button
slug: emergency-exit-button
category: component
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: A control that leaves the current page immediately for an unrelated
  site and tries to clear it from history, for readers who may be watched.
aliases:
  - name: exit this page
    source: govuk
  - name: quick exit
    source: community
  - name: safety exit
    source: community
  - name: escape button
    source: community
tags: []
relations:
  contrastWith:
    - close-button
  variantOf: []
  partOf: []
  seeAlso:
    - light-dismiss
implementations: []
sources:
  - title: GOV.UK Design System components
    url: https://design-system.service.gov.uk/components/
demo: inline
exhibit: false
useWhen: leaving a page fast and without a trace
---

An emergency exit button leaves the page at once and tries to leave no trace of it. Pressing
it sends the browser to an unrelated destination, usually something bland with no connection
to the site, and replaces the current history entry rather than adding to it, so pressing Back
does not return to what was on screen. The best-known implementation is the Exit this page
component in the [GOV.UK Design System](https://design-system.service.gov.uk/components/),
which pins the control to the top of the page and also fires on three presses of the Shift
key, so it can be reached without a pointer and without looking for it.

The threat model is specific and worth stating plainly. Some people read a page about domestic
abuse, sexual violence, or leaving a controlling relationship on a device the abuser can see:
a shared laptop, a phone with a monitoring app on it, a browser that syncs history to another
signed-in device. For that reader the risk is not embarrassment, it is being found out, and the
cost of the page still being on screen when someone walks in is not a usability problem. The
control exists for the moment when a room changes, and everything about its design follows from
having to work in about one second, from memory, without reading.

Be equally plain about the limits, because overclaiming here is dangerous. Replacing a history
entry does not clear the browser's synced history, a cached page, an autocomplete entry, a DNS
or router log, a corporate proxy, or anything an installed monitoring tool has already
recorded. It does not help if someone is watching the screen. It is one mitigation among
several, not safety, and the page owes the reader the rest: a plain note on how to clear
browser history, a warning that the site may be visible to whoever controls the device, and a
phone number that leaves no page open at all.

The craft is mostly about being findable without being in the way. Pin it so it is reachable
without scrolling and never let it move, because a control that shifts is a control someone
misses under pressure. Give it a keyboard trigger and say what the trigger is, next to the
button, where it will be read before it is needed. Choose a destination that is plausible,
public, and boring, and never one that is itself a tell. It shares a shape with the
[skip link](/skip-link): a pinned control most readers never use, put there for the ones who
must. It belongs to the same family of promises as [consistent help](/consistent-help), which
is why it goes in the same place on every page of a site rather than only on the sensitive
ones, since the page a reader needs to leave is not always the one you expected.
