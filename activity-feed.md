---
name: Activity feed
slug: activity-feed
category: pattern
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-26T00:00:00.000Z
definition: A reverse chronological list of things that happened, each entry
  naming an actor, a verb, and an object, grouped when many are alike.
aliases:
  - name: activity stream
    source: ui-patterns
  - name: news feed
    source: community
  - name: audit log
    source: community
  - name: what's happening
    source: community
tags:
  - messaging
  - time
relations:
  contrastWith:
    - timeline
    - notification-digest
    - agenda-view
  variantOf: []
  partOf: []
  seeAlso:
    - notification-center
implementations: []
sources:
  - title: "UI Patterns: Activity Stream"
    url: https://ui-patterns.com/patterns/ActivityStream
demo: inline
exhibit: false
useWhen: the running list of who did what, most recent first
---

Every entry in an activity feed is one sentence with three slots: someone did
something to something. "Rosa opened Rebuild the west quay." "Ivo pushed two commits
to main." The grammar is what makes a feed of mixed event types readable as one
list, and it is also what makes a feed easy to get wrong, because an entry missing
its object ("Rosa made a change") is a notification that has forgotten to say what
happened. Write the sentence first and lay the row out around it, rather than
designing a row and hoping the words fit.

Activity feed, news feed, timeline, and audit log are not the same thing. An
activity feed is
chronological: it is a record, and its order is time. A news feed is ranked, which
means an algorithm decides what you see and time is only one signal, and calling a
ranked surface a timeline is where a lot of user confusion about missing posts comes
from. An audit log is chronological too, but it is exhaustive, immutable, and built
to be searched and exported, because someone will eventually have to answer a
question about a specific hour six months ago. A feed designed for glancing and a
log designed for evidence want opposite things from filtering, retention, and
detail.

Volume is the design problem. A busy object generates dozens of near-identical
events, so feeds group: forty stars become "Jo and 39 others starred harbour-kit",
and eight commits in a minute become one push. Grouping is by actor, by verb, by
object, or by time window, and the choice changes what the feed is for. Relative
times ("4m", "2h") are right for the recent end where "how long ago" is the
question, and wrong for the old end where "which day" is; most feeds switch to a
date once past yesterday and keep the exact timestamp in a title attribute for
anyone who needs it.

New entries arrive at the top, which is the one place they can arrive without
pushing the row the reader is currently reading. Even so, an insert that happens
while someone is halfway down the list should not move their scroll position, and a
feed that inserts continuously is usually better off holding new items behind a
"3 new updates" button so arrival is the reader's decision. If arrivals are
announced, a live region set to polite is enough; a feed that interrupts on every
event is a feed nobody keeps open. And the empty state matters more here than in
most lists, because a new account's feed is empty by definition and "Nothing here"
tells them nothing about what would ever put something there.
