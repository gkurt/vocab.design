---
name: Smart app banner
slug: smart-app-banner
category: pattern
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: A strip pinned to the top of a mobile web page urging the reader to
  open or install the native app instead, with an install or open action.
aliases:
  - name: app install banner
    source: community
  - name: open in app prompt
    source: community
  - name: app interstitial
    source: community
  - name: install prompt
    source: community
tags:
  - onboarding
  - platform-registers
relations:
  contrastWith:
    - interstitial
    - banner
  variantOf: []
  partOf: []
  seeAlso:
    - qr-code
implementations: []
sources:
  - title: "Apple Developer: Promoting apps with Smart App Banners"
    url: https://developer.apple.com/documentation/webkit/promoting-apps-with-smart-app-banners
  - title: "Google Search Central: Avoid intrusive interstitials and dialogs"
    url: https://developers.google.com/search/docs/appearance/avoid-intrusive-interstitials
demo: inline
exhibit: false
useWhen: the strip on a mobile site pushing you into the app
---

The name comes from Safari's version, which is the well-behaved end of the spectrum: a
site adds one `<meta name="apple-itunes-app">` tag and the browser draws the strip itself,
above the page rather than inside it. The site cannot restyle it, cannot make it bigger,
and cannot make it come back once the reader has closed it, because the browser owns it.
Chrome has an equivalent for installable web apps. Everything else that goes by this name
is the site drawing its own version, and the interesting design question is what it does
with the freedom the browser was denying it.

The escalation is predictable. First the strip stops being a strip and becomes two lines
with an app screenshot. Then dismissal moves from a close button to a small "continue in
browser" link under the primary action. Then it covers the page entirely, so the reader
who arrived from a search result has to close something before they can read the thing
they clicked. At that point it is an [interstitial](/interstitial), not a banner, and it
carries a cost most teams do not price in: Google's guidance on
[avoiding intrusive interstitials](https://developers.google.com/search/docs/appearance/avoid-intrusive-interstitials)
names app install interstitials that hide content as the failure case, and points at
browser-drawn banners as the replacement, because they take a small fraction of the screen
and let the reader and the crawler reach the content immediately. The aggressive variant
buys installs with search ranking.

The strip also has to answer for the space it takes, since that space is the top of the
page on the smallest screen the product has. Reasonable versions reserve room rather than
push content down after paint, remember dismissal for longer than the session, and say
"Open" rather than "Install" when the app is already on the device, which is the one
version of this that genuinely helps. What turns it into [nagging](/nagging) is the
reappearance: a banner that comes back on the next page view, or every visit, is asking a
question that was already answered, and every repeat trains the reader to hunt for the
close button before reading anything.

Distinguish it from a [banner](/banner) in the general sense, which is an in-page message
region owned by the page and about the page's own state. A smart app banner is
promotional, it is about a different product surface, and it competes with the content it
sits above. The honest test is whether the reader who dismisses it is better served than
the reader who taps it. If mobile web is deliberately worse so the app looks better, the
banner is not the problem, it is the symptom.
