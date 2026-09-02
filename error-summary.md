---
name: Error summary
slug: error-summary
category: pattern
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-28T00:00:00.000Z
definition: A block at the top of a failed form listing every problem as links
  that move focus to the field that caused it.
aliases:
  - name: error list
    source: community
  - name: validation summary
    source: community
  - name: there is a problem
    source: govuk
  - name: form error summary
    source: uswds
tags:
  - errors
  - forms
relations:
  contrastWith:
    - error-identification
    - inline-validation
    - error-page
  variantOf: []
  partOf: []
  seeAlso: []
implementations: []
sources:
  - title: "GOV.UK Design System: error summary"
    url: https://design-system.service.gov.uk/components/error-summary/
  - title: "GOV.UK Design System: recover from validation errors"
    url: https://design-system.service.gov.uk/patterns/validation/
demo: inline
exhibit: false
useWhen: one list at the top links to each broken field
---

An error summary answers a question an inline message cannot: how much is wrong, and
where. After a failed submit the reader is at the top of the page and the problems are
somewhere below, possibly off screen, possibly several screens down. The summary puts
the whole tally in the one place they are already looking, and every line in it is a
link to the field it is about, so reading the list and fixing the form are the same
motion. GOV.UK made the pattern well known with the heading "There is a problem", and
its version is worth copying almost verbatim, because the details are what make it work.

Those details are mostly about focus. On a failed submit, focus moves to the summary
itself, which is given `tabindex="-1"` so it can receive focus without joining the tab
order. That single move is what makes the pattern accessible: a screen reader reads the
heading and the list, and a keyboard user is now above the first error rather than
wherever the submit button left them. Each entry links to the input's id, so activating
it moves focus into the offending field. Order the entries to match the order of the
fields, because a list in a different order sends the reader up and down the page, and
word each one as the problem rather than as a code: "Enter your date of birth" beats
"dob is invalid".

The summary is half of a pair and never the whole answer. Each field also carries its
own message, next to its label, in the same words the summary used, because the reader
who arrives at the field needs to be told what to do there. The summary says how many
and takes you there; the inline message says what to do about this one. Keeping the two
texts identical matters more than it sounds: a reader who followed "Enter a valid email
address" and finds "Bad format" at the other end has to work out whether these are the
same problem.

Two things to get right around it. The page title should change too, commonly prefixed
with "Error:", so a reader who came back to the tab knows the submit failed. And the
summary belongs to submit, not to typing: showing it while someone is still filling the
form scolds them for fields they have not reached yet. Where a field can be checked as
it is left, that inline check is the friendlier route, and the summary is what catches
whatever survived to submit. A live region can announce the count as it changes, but a
block that rewrites itself on every keystroke is noise; render the summary once, when
the form is answered.
