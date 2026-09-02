---
name: Avatar
slug: avatar
category: component
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-26T00:00:00.000Z
definition: A small image standing in for a person or entity, falling back to
  initials or a generic glyph when there is no picture.
aliases:
  - name: persona
    source: fluent
  - name: profile picture
    source: community
  - name: user pic
    source: community
  - name: gravatar
    source: community
tags:
  - messaging
relations:
  contrastWith:
    - thumbnail
    - identicon
  variantOf: []
  partOf: []
  seeAlso:
    - avatar-group
    - image-well
    - presence-indicator
    - media-object
    - sender-name
implementations:
  - system: fluent
    name: Avatar
    url: https://fluent2.microsoft.design/components/web/react/core/avatar/usage
  - system: polaris
    name: Avatar
    url: https://shopify.dev/docs/api/app-home/web-components/media-and-visuals/avatar
  - system: radix
    name: Avatar
    url: https://www.radix-ui.com/primitives/docs/components/avatar
  - system: base-ui
    name: Avatar
    url: https://base-ui.com/react/components/avatar
  - system: shadcn
    name: Avatar
    url: https://ui.shadcn.com/docs/components/avatar
sources:
  - title: "Gravatar: one avatar, tied to an email address"
    url: https://gravatar.com/
demo: inline
exhibit: false
useWhen: a person represented by a small image
---

An avatar answers *who* at a glance, in the space of a line of text. What makes it a
component rather than an image is that it is defined for the case where the picture
does not exist: every mature implementation is really a small resolution chain, photo
first, then initials taken from the name, then a generic glyph. The shape and size
belong to the design system, not to the file, so a directory of a thousand people
still reads as one column of circles no matter what anyone uploaded.

The word does not mean *the picture*. A thumbnail is a shrunk preview of content and
is worthless without the content; an avatar stands in for an identity and works fine
with nothing behind it. Fluent's "persona" is a step wider again: an avatar plus a
name, a role, and presence, so a persona contains an avatar rather than renaming one.
An avatar can also stand for a company, a bot, or a repository, which is why systems
that only ever say "user" tend to end up with square variants bolted on later, since
an organization drawn in a circle reads as a person.

Three common names for it are borrowed from somewhere else. "Profile picture" and
"user pic" name the asset, and so quietly imply the empty case is a bug rather than
the main event. "Gravatar" is a product: Automattic's service resolving an email
address to a hosted image, adopted so widely in blog and forum software that people
now use the brand for any avatar at all. Reach for the vendor word only when the
vendor is actually involved.

For assistive technology, decide first whether the avatar is saying anything new. Next
to the person's name it is decoration, so hide it (`aria-hidden`) and let the text do
the work; standing alone in a stack of collaborators it needs a real accessible name,
and that name is the person, not the letters. "AM" is a drawing of a fallback, not an
identity. Give the image an `alt` of the person's name, keep that name on the element
whichever layer of the chain is currently showing, and never lean on colour alone to
tell two people apart.
