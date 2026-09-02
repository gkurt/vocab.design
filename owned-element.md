---
name: Owned element
slug: owned-element
category: accessibility
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: A child the accessibility tree is told to adopt from elsewhere in
  the DOM, used when the nesting a role requires is impossible in the markup.
aliases:
  - name: aria-owns
    source: aria
  - name: reparenting
    source: community
  - name: adopted children
    source: community
tags:
  - assistive-tech
relations:
  contrastWith:
    - active-descendant
    - accessibility-grouping
  variantOf: []
  partOf: []
  seeAlso: []
implementations: []
sources:
  - title: "WAI-ARIA 1.2: aria-owns"
    url: https://www.w3.org/TR/wai-aria-1.2/#aria-owns
demo: inline
exhibit: false
useWhen: a listbox and its options cannot be nested in markup
---

The accessibility tree is normally a shadow of the DOM: parents are parents, children are children,
document order is reading order. `aria-owns` is the one attribute that breaks that correspondence.
It names element ids, in the order they should appear, and the browser moves those elements in the
tree so they become children of the element that named them. Nothing moves on screen. The picture
is unchanged and the structure a screen reader walks is different.

The usual reason to want it is a popup that has to escape its container. A listbox rendered inside a
toolbar gets clipped by the toolbar's overflow or trapped under its stacking context, so the options
are rendered at the end of the body instead, and now the role hierarchy is a lie: a listbox with no
options, and three options with no listbox. Owning them puts the relationship back without moving
the boxes.

It comes with rules and they are strict. An element can have exactly one owner, so two components
cannot both claim the same node. Every id has to resolve, and an id that does not is not an error
anyone will see, it is a child that quietly never arrives. The order you write is the order
announced. You cannot own an ancestor, and owning something that is already your DOM child does
nothing except add a way to get the order wrong later. Support is the real cost: this is one of the
patchiest parts of ARIA in practice, especially across shadow boundaries, with many nodes, or when
the ownership changes while the user is inside the widget.

So treat it as a last resort, after the alternatives. Restructuring the markup so the DOM says what
you mean is the first answer, and it is available more often than it looks: `popover` and anchor
positioning let a real DOM child escape a clipping ancestor, and `aria-activedescendant` lets focus
stay on the input while the active option is pointed at rather than reparented. Remember the
[first rule of ARIA](/first-rule-of-aria) applies to relationships as much as to roles. And notice
the direction this attribute pulls, the opposite of
[presentational children](/presentational-children): one adds nodes to the tree that are not there
in the markup, the other removes nodes that are. Both are ways to end up with a tree nobody can
navigate, so anything you own should be checked with a real screen reader, tabbing through it as
well as reading it, because a keyboard user follows DOM order while the announcement follows the
order you invented.
