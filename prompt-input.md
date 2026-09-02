---
name: Prompt input
slug: prompt-input
category: component
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-26T00:00:00.000Z
definition: "The composer at the bottom of an assistant interface: a growing
  text area with attachment, model and send controls attached to it."
aliases:
  - name: composer
    source: community
  - name: message composer
    source: community
  - name: chat input
    source: community
  - name: prompt box
    source: community
tags:
  - ai
  - messaging
  - text-editing
relations:
  contrastWith:
    - textarea
    - search-field
  variantOf: []
  partOf: []
  seeAlso:
    - natural-language-interface
    - model-selector
    - generative-ui
    - conversational-interface
implementations: []
sources:
  - title: Cloudscape components
    url: https://cloudscape.design/components/
demo: inline
exhibit: false
useWhen: the box you type an assistant request into
---

A prompt input is a [text area](/textarea) that has been promoted to the most
important control on the page. It is multiline by default, because the thing people
type into it is a paragraph rather than a phrase. It grows as they type and stops
growing at a ceiling, so a long request stays visible without pushing the
conversation off the top. And it carries a strip of its own controls inside its
border: attach, model, tools, send. That strip is what makes it a component rather
than a field, and it is the reason the whole assembly gets a name.

The nearest neighbour is a [search field](/search-field), and the differences run
deeper than the number of lines. A search field expects a few words, submits on
Enter without ceremony, and offers a clear control because a stale query is noise. A
prompt input expects a considered request, treats what you typed as a draft worth
protecting, and offers no clear control at all, since wiping a paragraph by accident
is a real loss. A comment composer sits between them: multiline like the prompt, but
addressed to people, and posting is final in a way that asking a model is not.

Enter sends and Shift plus Enter inserts a newline. That convention arrived from chat
clients and it is now near universal, which does not make it free: it is the reason
people send half-written prompts, and it is why the draft has to survive a send that
fails and why a paragraph break has to be discoverable by someone who has never been
told the shortcut. The send control does two jobs and should look like one button
doing both: disabled while the field is empty, active once there is content, and
swapped for a stop control while a response is streaming, in the same place, because
stopping is the most time-critical action in the entire interface.

The growth deserves a ceiling and a reservation. Let the box expand to a few lines and
then scroll inside itself, and reserve that room in the layout from the start so the
transcript above does not lurch upward on the second line. The field is a real
`textarea` with a real label, not a content-editable div, unless something in the
design genuinely needs rich text; attachments render as a
[file attachment](/file-attachment) row inside the composer's border rather than
floating beside it; and the model picker belongs in the footer strip because the
answer changes with it, which makes it part of the request rather than a setting
buried in a menu.
