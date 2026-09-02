---
name: Banner
slug: banner
category: component
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: A prominent message strip, usually spanning the top of a page or
  section, that stays visible until the user dismisses or resolves it.
aliases:
  - name: notification banner
    source: govuk
  - name: scoped notification
    source: lightning
  - name: global banner
    source: community
tags:
  - content-design
  - messaging
relations:
  contrastWith:
    - toast
    - callout
    - status-message
    - hero
    - cookie-consent-banner
    - smart-app-banner
  variantOf: []
  partOf: []
  seeAlso:
    - notification-center
implementations:
  - system: carbon
    name: Notification
    url: https://carbondesignsystem.com/components/notification/usage/
sources:
  - title: "GOV.UK Design System: Notification banner"
    url: https://design-system.service.gov.uk/components/notification-banner/
demo: inline
exhibit: false
useWhen: a message strip that stays until it is dealt with
---

A banner is a message the page owns, about the page. It spans the top of a surface,
sits in that surface's own flow rather than floating over it, and it is still there
after a scroll, a re-render, and a coffee. The persistence is the term: a message strip
that fades out on a timer is a [toast](/toast) that got the geometry wrong, and one that
needs the reader to keep reading past it is asking for the wrong shape entirely. What
makes it worth the width is that it describes a condition rather than an event: a card
about to expire, a service running in degraded mode, an account waiting on
verification. The condition ends when the reader deals with it, which is why a banner
carries an action, a dismiss, or both.

Five words sit close to it, and one clause separates each. A [toast](/toast) leaves on
its own and is about something that just happened. A [callout](/callout) is written into
the content at the point where it is relevant, so it belongs to a paragraph rather than
to the page, and a dismiss button on one is usually a sign it wanted to be a banner. A
[hero](/hero) occupies the same slot and is marketing rather than a message: it sells,
it does not report. A [status message](/status-message) is defined by being announced
rather than by being shown, so a banner can be one and a status message can be a line of
text nobody sees move. And a [cookie consent banner](/cookie-consent-banner) is one
specific banner everyone has met, which is why the general word so often gets used for
the specific thing.

Placement has a cost that is easy to miss. A banner at the top of the page pushes
everything below it, so a banner that arrives after load moves the content under the
reader's eye, and a banner that reappears on every page view is
[nagging](/nagging) rather than informing. Reserve its room, or bring it in on a
transition the reader can follow, and remember that the dismissal has to persist: a
notice the reader has already answered should not come back on the next route change. If
the message is genuinely about one section rather than the whole page, put it at the top
of that section, which is what Salesforce means by a scoped notification.

Semantics depend on urgency, and the temptation is to over-declare. A banner that is
part of the page when it loads needs no live region at all: it is content, and a reader
will meet it in the reading order. A banner injected in response to something needs
`role="status"` so it is announced politely, and only a genuine emergency (data about to
be lost, a session about to end) earns `role="alert"`, which interrupts whatever the
reader was hearing. Note also that `role="banner"` in ARIA is an entirely different
thing, the page's masthead landmark, and putting it on a message strip is one of the
more common mix-ups the word causes.
