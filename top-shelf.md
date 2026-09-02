---
name: Top shelf
slug: top-shelf
category: layout
status: published
created: 2026-08-26T00:00:00.000Z
modified: 2026-08-26T00:00:00.000Z
definition: The band across the top of a television home screen that the focused
  app fills with its own content, so an app advertises itself before anyone
  opens it.
aliases:
  - name: top shelf extension
    source: community
  - name: featured content area
    source: community
tags:
  - platform-registers
relations:
  contrastWith:
    - content-shelf
  variantOf: []
  partOf: []
  seeAlso:
    - ten-foot-ui
    - overscan-safe-area
implementations:
  - system: hig
    name: Top Shelf
    url: https://developer.apple.com/design/human-interface-guidelines/top-shelf
sources:
  - title: "Apple HIG: Top Shelf"
    url: https://developer.apple.com/design/human-interface-guidelines/top-shelf
demo: inline
exhibit: false
useWhen: the focused app fills a band on the TV home screen
---

On a television home screen the row of app icons sits low and a wide band runs across the top. That
band belongs to whichever app currently holds focus, and it is filled by the app itself rather than
by the system: move the remote one icon to the right and the whole band changes to the next app's
artwork. It is the only surface on the platform where an app gets to speak while it is closed, which
makes it a shop window and a piece of navigation at the same time.

Two styles are on offer and they behave differently. An inset banner is a single wide image, often
rotating through several, that says what the app is about and can be nothing else: it is a poster.
Sectioned content is rows of individual items with their own titles, and a viewer can move the
highlight up into them and open one directly, so a specific episode or album becomes reachable
without ever entering the app. The choice is therefore between advertising and shortcutting, and it
is a real editorial decision rather than a layout preference. Either way the content arrives from a
separate extension the app ships and refreshes on its own schedule, which is why the band can be
current for something nobody has launched in a month.

What makes it a design problem rather than a spec detail is the lack of control around it. The band
is the top of somebody else's screen: it sits above a row of competing icons, it is the first thing
seen when the television wakes, and it is cropped by the same overscan rules as everything else, so
it is held inside the [overscan safe area](/overscan-safe-area) with nothing important near an edge.
Everything in it is also read from across a room, which is the whole discipline of
[ten-foot UI](/ten-foot-ui): one short line, type several steps larger than it looks like it needs,
and artwork that survives being glanced at rather than examined.

It is worth saying plainly that this is not a [content shelf](/content-shelf), even though the names
collide and one of the two styles genuinely contains shelves. A content shelf is a layout, a
horizontally scrolling row of cards repeated once per category down a page, and any platform can have
dozens of them. The top shelf is one named placement on one platform's home screen, of which each app
gets exactly one, and it happens to be able to hold a couple of rows.
