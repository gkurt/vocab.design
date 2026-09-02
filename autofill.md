---
name: Autofill
slug: autofill
category: pattern
status: published
created: 2026-08-25T00:00:00.000Z
modified: 2026-08-25T00:00:00.000Z
definition: The browser filling a form from values it has already saved, on its
  own or from a dropdown of the reader's own profile, so a field arrives
  answered.
aliases:
  - name: browser autofill
    source: community
  - name: form autofill
    source: community
  - name: autofill suggestions
    source: community
tags:
  - auth
  - forms
relations:
  contrastWith:
    - address-autocomplete
    - inline-autocomplete
  variantOf: []
  partOf: []
  seeAlso:
    - input-purpose
    - redundant-entry
implementations: []
sources:
  - title: "MDN: :autofill"
    url: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:autofill
  - title: "MDN: HTML autocomplete attribute"
    url: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/autocomplete
demo: inline
exhibit: false
useWhen: the browser answers the field before the reader does
---

Every browser keeps a profile: a name, one or two addresses, a phone number, some cards. Autofill is
what it does with them. The reader puts the caret in a field and the user agent offers the values it
holds, usually as a dropdown drawn above the page in the browser's own chrome, and one pick writes
every field the profile can answer at once. The page is not consulted, the page is not asked, and
the page frequently does not know it has happened until it reads the values back.

What decides whether the fill is any good is the markup underneath it. A field that declares its
[input purpose](/input-purpose) gets the right value; a field that declares nothing gets a guess
from its label, its name attribute and its neighbours, which is right often enough to be trusted and
wrong often enough to be a problem. Two nearby patterns are not this one:
[address autocomplete](/address-autocomplete) is a lookup service the page itself calls, suggesting
addresses the reader has never entered, and [inline autocomplete](/inline-autocomplete) completes
what is being typed inside the field. Autofill answers from the reader's own store, and its value
arrives whole.

Three consequences the design has to absorb. The user agent paints the filled field itself, a pale
tint plus its own dropdown, and it refuses nearly all of your styling: `:autofill` matches the state
but the properties it will honour are a short list that has never included plain `background-color`,
so a filled field will not match your theme and there is no supported way to make it. A filled value
can be far longer than anything you designed the field for, since it comes from a real person's real
address rather than from your placeholder copy, so a field that clips or a row that reflows at
thirty characters is a bug that only the reader with a long name ever sees. And the fill can land
without the keystrokes a page listens for, so validation wired to `keyup` and a floating label
wired to typing both miss it: watch `change`, and check the field's value on submit rather than
trusting your own event log.

Two habits worth keeping. `autocomplete="off"` has not stopped a password manager for years and no
longer reliably stops the browser either, because refusing to fill a login form was read as hostile
to the people who need filling most: state the purpose honestly and let the fill happen. And never
lean on [placeholder as label](/placeholder-as-label) in a form the browser will fill, because the
moment a value arrives the placeholder goes and the field is left unnamed. Getting this right is
the cheapest defence a checkout has against [redundant entry](/redundant-entry): typing is expensive
for anyone using a switch, voice input, or an on-screen keyboard, and autofill is the browser
offering to skip it.
