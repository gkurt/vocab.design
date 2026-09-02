---
name: Hub and spoke
slug: hub-and-spoke
category: pattern
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: A navigation shape where every task is reached from one home screen
  and returns to it, with no way to move sideways between tasks.
aliases:
  - name: hub-and-spoke navigation
    source: community
  - name: springboard
    source: community
  - name: launchpad navigation
    source: community
  - name: home link
    source: ui-patterns
tags:
  - navigation
relations:
  contrastWith:
    - global-navigation
    - drill-down-navigation
  variantOf: []
  partOf: []
  seeAlso: []
implementations: []
sources: []
demo: inline
exhibit: false
useWhen: every section is reached from home and returns there
---

Hub and spoke is the shape a launcher has. One screen holds the whole menu, choosing a tile
takes over the screen, and the only route out is back to the tile screen. Drawn as a graph
it is a star: every edge touches the centre, and there is not one edge between any two
tasks. The original iPhone home screen was the canonical example, along with almost every
smartwatch, television, and kiosk since, because all three share the same constraint of a
screen too small or too far away to carry persistent chrome.

What the shape buys is a home that is genuinely a home. There is exactly one place to
return to, the tasks do not have to agree about anything, and each spoke gets the entire
screen, which matters most on the devices where the screen is the scarce thing. It is also
the friendliest shape for an occasional user, since the whole product is legible from one
picture, and it lets tasks be added or removed without renegotiating a navigation bar.

What it costs is lateral movement, and the cost is real rather than theoretical. The
specimen above measures it: from the home screen four tasks are one tap away, and from
inside a task exactly one destination is, which is home. A reader who wants to check the
calendar while replying to a message has to leave the reply, go home, and come back the
same way, and the more often they cross between two spokes the worse the shape reads. That
is the diagnosis to make before adopting it: hub and spoke is right when the tasks are
genuinely separate errands and wrong when they are steps in one job. Devices with
persistent chrome usually keep the hub and add a shortcut layer beside it, a dock, a
recents row, or a back gesture that remembers where the reader came from, which is a quiet
admission that the pure star is too strict.

The neighbours are worth separating carefully. Persistent
[global navigation](/global-navigation) is the direct opposite: it keeps every top level
destination on screen inside every destination, so a reader crosses from one sibling to
another without passing through anything, where hub and spoke has no lateral edge at all.
[Drill-down navigation](/drill-down-navigation) is about depth rather than breadth, a
descent through a hierarchy where back is up one level, whereas a spoke is one level deep
and back always lands in exactly the same place. [Local navigation](/local-navigation) is
what appears once a reader is inside a spoke and needs to move around within it, and
[list-detail](/list-detail) is the shape that replaces hub and spoke the moment the screen
is wide enough to show the menu and the task at the same time.
