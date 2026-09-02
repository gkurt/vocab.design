---
name: Verbosity
slug: verbosity
category: accessibility
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: How much a screen reader says about each thing it reaches, a user
  setting that decides whether your carefully written description is heard at
  all.
aliases:
  - name: speech verbosity
    source: community
  - name: punctuation level
    source: community
  - name: verbosity setting
    source: community
tags:
  - assistive-tech
relations:
  contrastWith:
    - politeness-level
  variantOf: []
  partOf: []
  seeAlso:
    - screen-reader
    - role-description
    - braille-display
implementations: []
sources:
  - title: NVDA User Guide
    url: https://download.nvaccess.org/documentation/userGuide.html
demo: inline
exhibit: false
useWhen: arguing about how much detail a label should carry
---

A [screen reader](/screen-reader) does not read out everything it knows. It reads out what its
user has told it to read out. Verbosity is the collection of settings that makes that decision:
whether roles are spoken, whether states are spoken, whether descriptions are spoken, whether
punctuation is announced by name, whether the row and column of a table cell come with the cell.
NVDA groups these under document formatting and speech settings, JAWS ships three named verbosity
schemes, and VoiceOver hides them under a rotor of its own. The details differ. The consequence
does not: two people can reach the same button and hear two different sentences.

This is the fact that should end most arguments about label length. An
[accessible name](/accessible-name) is spoken at every verbosity level, because a thing with no
name cannot be referred to at all. An [accessible description](/accessible-description) is not.
Descriptions are commonly delayed, truncated, or switched off entirely, and experienced users
switch them off precisely because most of them are noise. So a hint that only exists in a
description is a hint most of your readers will never hear, and moving the load-bearing half of
it into the name is usually the whole fix.

The other half of the lesson is about restraint. Verbosity exists because assistive technology
users are reading at speed, often at 400 words a minute or more, and every extra word you add to
a control is a word they pay for on every pass through the page. Turning it down is how a
practised user makes an interface usable. That is why "we will just add it to the description"
is not a plan, and why padding a name with instructions ("Submit, click here to submit your
completed application") makes the interface slower for exactly the people the padding was aimed
at.

Never test with verbosity turned up. Turn it down to its lowest useful setting, walk the
interface, and see what survives. What you hear there is what most of your readers hear too.
