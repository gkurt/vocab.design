---
name: Input group
slug: input-group
category: component
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: A field welded to text, a button or a select at one or both ends, so
  the addon reads as part of the same control rather than as a neighbour.
aliases:
  - name: input addon
  - name: field addon
  - name: prefix and suffix
  - name: input group text
    source: bootstrap
tags:
  - forms
relations:
  contrastWith:
    - text-field
    - fieldset
  variantOf: []
  partOf: []
  seeAlso: []
implementations: []
sources:
  - title: "Bootstrap 5.3: Input group"
    url: https://getbootstrap.com/docs/5.3/forms/input-group/
demo: inline
exhibit: false
useWhen: a unit, prefix or action belongs inside the field
---

An input group is a field plus whatever has to travel with it: a currency symbol
before the amount, a unit after it, a protocol in front of a domain, a Search button
on the end, a select of countries welded to a phone number. The whole point is the
weld. One shared outline, collapsed borders where the parts meet, square corners in
the middle and round ones at the two ends, and the focus ring drawn around the group
rather than around the field inside it. Get that last detail wrong and the group falls
apart into a box with things stuck beside it.

An addon is not the same thing as an icon sitting inside the field. An icon inside the
padding is decoration on one control; an addon is a piece of the control's own
anatomy, and it changes what the reader has to type. "£" as a prefix means the amount
is in pounds and the currency should not be typed again, and "per night" as a suffix
means the number is a rate. That is also why an addon has to reach assistive
technology: a static addon belongs in the field's label or in `aria-describedby`,
because a screen reader user given "Nightly rate, edit text" and nothing else has no
idea what unit the box wants.

The other half of the craft is what the click does. A static addon should behave as
part of the field, so pressing the unit puts the caret in the box rather than doing
nothing, while an interactive addon (a button, a select, a copy control) is its own
target and needs its own accessible name. Mixing the two on one end is where groups
get confusing: a suffix that sometimes acts and sometimes does not teaches nobody
anything. Keep the group to one field, since two fields sharing one outline are a
[button group](/button-group) of inputs and read as a single value that they are not,
and remember that the group is presentation only: it does not label the field. A real
label, properly associated ([label association](/label-association)), or a
[helper text](/helper-text) line still has to say what the box is for.
