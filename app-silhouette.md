---
name: App silhouette
slug: app-silhouette
category: layout
status: published
created: 2026-08-21T00:00:00.000Z
modified: 2026-08-21T00:00:00.000Z
definition: The recognisable outline of an app's chrome, which bars and panes it
  has and where they sit, used to classify one app's layout against another's.
aliases:
  - name: silhouette
    source: fluent
  - name: app silhouettes
    source: fluent
  - name: top navigation silhouette
    source: fluent
  - name: left navigation silhouette
    source: fluent
tags:
  - windowing
relations:
  contrastWith:
    - canonical-layout
  variantOf: []
  partOf: []
  seeAlso:
    - scaffold
implementations:
  - system: fluent
    name: App silhouettes
    url: https://learn.microsoft.com/en-us/windows/apps/design/basics/app-silhouette
sources:
  - title: Windows app silhouettes, Microsoft Learn
    url: https://learn.microsoft.com/en-us/windows/apps/design/basics/app-silhouette
demo: inline
exhibit: false
useWhen: classifying an app by the shape of its chrome
---

A silhouette is what is left of an app when you take away everything inside it: which bars and
panes exist, and where they sit. It is the thing designers are actually pointing at when they say
an app looks like Outlook, or like VS Code, or like Settings. Those comparisons sound vague and
are not: each one names a specific arrangement of navigation, commanding and content, and once the
arrangement has a name the resemblance turns into a decision you can argue about. Fluent
documents four for Windows apps, and they are the whole vocabulary: top navigation, menu bar,
left navigation, and tab view.

The four differ in where navigation lives and what that costs. Top navigation runs one horizontal
band under the title bar and buys the widest possible content area, at the price of holding fewer
destinations. Menu bar is the classic productivity shape, a short strip of menus plus a command
bar, which keeps the focus on a document being edited. Left navigation stands a full height pane
beside the content, which scales to many destinations and takes horizontal room to do it. Tab view
attaches tabs to the top edge of the content itself, which is the shape for apps whose whole
premise is several documents open at once. Fluent even names an example of each shipping in
Windows: Photos, Notepad, Settings and Terminal.

This is the level above [chrome](/chrome). Chrome is the furniture, the individual
[title bar](/title-bar), [toolbar](/toolbar), [navigation rail](/navigation-rail) or
set of [tabs](/tabs); a silhouette is the arrangement of that furniture, and the arrangement is
what a reader recognises before they read a single label. It is also more specific than a
[scaffold](/scaffold), which is the framework a platform gives you for assembling chrome, and
narrower than a page level composition like the [holy grail layout](/holy-grail-layout), which is
about content regions rather than about an application's own bars.

The practical value of the word is in the decision it forces early. Picking a silhouette commits
you to how many top level destinations you can carry, how much of the window the content gets,
and what a second document does, so it is much cheaper to argue about at the sketch stage than
after two screens are built. It also travels: the four shapes are recognisable on macOS, on the
web and in Linux desktop apps, whatever those platforms call the parts. A silhouette that nobody
chose is still a silhouette, just one that was decided by whichever control got added first.
