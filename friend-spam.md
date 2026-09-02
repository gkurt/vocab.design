---
name: Friend spam
slug: friend-spam
category: pattern
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: Asking for access to a contact list under one pretext and using it
  to send invitations that appear to come from the reader.
aliases:
  - name: contact list harvesting
    source: community
  - name: invite spam
    source: community
  - name: invite friends
    source: ui-patterns
  - name: address book import
    source: community
tags:
  - consent
  - email
relations:
  contrastWith:
    - nagging
  variantOf:
    - dark-pattern
  partOf: []
  seeAlso: []
implementations: []
sources:
  - title: "UI Patterns: invite friends"
    url: https://ui-patterns.com/patterns
  - title: "Deceptive Design: types of deceptive pattern"
    url: https://www.deceptive.design/types
demo: inline
exhibit: false
useWhen: the app mails your contacts as if you had
---

Friend spam is one of the twelve patterns Harry Brignull originally catalogued, and it is
defined by a gap between two things: what the permission asked for and what was done with
it. The ask is usually about *seeing*, phrased as finding the people you already know. The
use is *sending*, and the messages go out in your name, to everybody in the address book,
signed as if you had written them. The person receiving one has no way to tell it was not
you, which is exactly why the pattern works and exactly why it costs the reader something
real.

The uncomfortable part, and the reason the word matters more than the screenshot, is that
the honest version of this flow looks almost identical. An invite-friends feature is a
perfectly reasonable thing to build: read the address book, show the reader who is already
here, let them pick a few names, send what they chose. Same button, same list, same
integration. The difference is entirely in what the consent covered. Did the ask name the
action (sending), the recipients (which ones), and the content (this message, in these
words)? If it did, the reader authorised a specific thing. If it said "find your friends"
and mail left the building, the consent was for one act and spent on another, which is what
makes it a [dark pattern](/dark-pattern) rather than a feature.

That gap is the general mechanism of [misdirection](/misdirection): attention is pointed at
the benefit while the cost is somewhere the reader is not looking. It also fails the
discipline that [permission priming](/permission-priming) is supposed to bring, which is
explaining the request before the request, in terms the reader can hold the product to
afterwards. The downstream effect is the reason the pattern is now largely dead in public
products: the invitations are [fake social proof](/fake-social-proof), because the friend
whose name is on them never chose to vouch for anything, and once recipients learn that,
every invitation from the service reads as spam whether it was authorised or not.

Two practical tests, if you are building the honest version. First, the ask must be
falsifiable: state the number of messages, the recipients, and show the exact text, so a
reader who is later surprised was actually misled rather than inattentive. Second, no
pre-ticked all: selection starts empty, and the send button counts what the reader chose.
Regulators now treat contact-list use as personal data of *third parties*, people who never
visited your product at all, so the case for restraint is legal as well as ethical. If the
feature cannot survive being described plainly, that is the finding, not an argument for
describing it less plainly.
