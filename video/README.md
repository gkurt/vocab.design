# The announcement video

This is the one-off tooling behind the launch video. It is documented here rather than
in AGENTS.md because nothing else in the codebase depends on it; the site builds, tests
and deploys without this directory being touched.

The launch video is cut from the site's own footage, and two tools make it. `bun run reel`
(`scripts/reel-clips.ts`) records a clip per cast member from `/reel/{slug}`, a set page
like `/capture/{slug}` except that it PLAYS: the term page's stage at its authored 720,
attract running, control bar hidden. The Remotion project in `video/` is the editor: it cuts
those clips to a beat grid, sets the type in the site's faces, and renders three cuts
(`Full` 1920x1080, `Teaser` 1080x1080, `Loop` 1200x630 for a GIF).

```bash
bun run reel --build            # rebuild, then record the cast in video/reel.json
bun run reel toast detent       # re-record just these
cd video && bun run studio      # Remotion Studio, to watch the edit
cd video && bun run render:all  # the three cuts into video/out/
cd video && bun run beats public/music/track.mp3   # measure a track's BPM and first beat
```

`video/reel.json` is the plan: the cast (in wall order), which of them are `long` (a
demonstration that needs time, and so takes the wall's held slots under a `[1, 1, 2]`
rhythm), which specimen opens, which term the linked beat lists names for, which page the
agent beat fetches, and the music with its `bpm` and `downbeat` (seconds to the first beat,
so frame zero is beat zero). Every duration in the compositions is written in BEATS and
converted in `video/src/reel.ts`, so swapping the track changes the tempo and nothing else.
The wall shows every cast member once, so size the cast to the rhythm: a `[1, 1, 2]` wall
stays on the bar when the cast minus the opener is a multiple of three. `video/clips.json`
is what the recorder found: per clip its stage height in the frame, its length, when each
pass of the choreography ended and when each click landed, which is how a one-second wall
slot lands mid-demonstration instead of mid-cursor-approach (`slotStart`). Override per slug
with `at` in reel.json, as clip seconds or as `{ "click": 1, "offset": -0.25 }`, a moment
relative to a logged click, which survives a re-record. Clips, music and renders are
gitignored; `clips.json` is committed so the project typechecks on a clone.

**Gotcha**: the recorder shoots frame by frame under Chrome's virtual time
(`Emulation.setVirtualTimePolicy`), not with Playwright's `recordVideo`. A screencast is
capped at CSS pixels (a device scale of 2 records the page into the top-left quarter of the
frame), and it drops and repeats frames as the machine pleases. Pausing virtual time and
advancing it by exactly a thirtieth of a second per capture gives sharp 2x frames, every
demo timer and CSS transition exactly where its author put it, and a recording that is
identical to the frame every time. The shutter is CDP's `Page.captureScreenshot` with a
`clip` at `scale: 2`, because a bare capture comes back at CSS size whatever the context's
device scale says (the first recordings were 720x400 and nobody noticed until a fall looked
soft), not Playwright's `page.screenshot`: the latter wraps the capture in waits (fonts, stability, a
caret pass) that hung forever on `command-palette` under the paused clock. The specimen is
let mount in real time before the clock is taken, because a framed specimen is a second
document whose load a paused clock would hold up. Passes and clicks arrive through exposed
functions and are recorded as frame numbers. The click listener sits on the stage's shadow
root, not the demo's mount root: the player's click bubbles but is not composed, so the
document never hears it, and attract replaces the mount root when it starts, so a listener
put there hears nothing at all.

**Gotcha**: the frames are JPEG (quality 95) because a PNG capture deadlocks the camera. On
`neon-glow`, every hover and click of its picker left a PNG `Page.captureScreenshot` waiting
for a frame the compositor never produced, and once that had happened virtual time itself
stopped advancing: no nudge recovered it (a display frame of time, a re-pause, a forced
layout, a metrics override, Playwright's own screenshot, device scale 1, a half-frame phase
shift), while the same page captured fine in real time. Asking for a 2x `clip` spread the
stall to `glitch-aesthetic`, `breadcrumbs`, `pagination` and `complementary-colors`; the same
capture as JPEG has never stalled on any of them (WebP stalls like PNG). The recorder still
gives up on a frame after a few seconds and reports the clip, and a specimen that stalls
under JPEG is a specimen to leave out of the cast, not a reason to loosen the timeouts.

**Gotcha**: the recorder launches Chrome with `--disable-threaded-animation`, and the flag is
load-bearing. A CSS transition that starts while a composited animation is in flight (the
ghost cursor travelling, which is exactly when a click lands) is pending until the compositor
hands it a start time, and under virtual time that start time comes back stale, so the
transition is over before its first frame: `sliding-indicator` snapped instead of sliding,
while the same click fired by hand under the same clock slid fine. `element.animate` is
bitten the same way with a different face: squash-and-stretch's drop resolved its start a
second stale, so the clip opened on the SECOND bounce and looked plausible. With every
animation on the main thread, start times come from the one virtual clock the frames do. A
demo whose motion looks skipped, or oddly early, in a clip is this, not the demo.

**Gotcha**: never scale the reel page with CSS `zoom` (or a transform on an ancestor) to
get resolution. The stage measures with client rects and writes CSS lengths, and inside a
zoomed subtree those are two different pixels: the ghost cursor landed off-screen and the
click fired before it had travelled. The camera's device scale is the only sharpening
that leaves the specimen's geometry alone.

**Gotcha**: `downbeat` in reel.json is not the first beat's timestamp, it is that minus about
50 ms. The rendered file's audio lands that much later than the trim asks for (the trim is
rounded to a frame, and the AAC encode adds its priming delay), so the cuts sat 50 to 70 ms
behind the beat when the value was the measured 0.116. Setting 0.167 put every scene boundary
within 20 ms of a detected beat. Measure it the same way after changing the track: render, pull
the audio out with ffmpeg, run the beat tracker over it, and compare against the beat grid;
`bun run beats` on the track alone tells you the tempo and the phase, not the render's latency.

**Gotcha**: Remotion cannot drive the specimens directly. Its renderer freezes each frame
and expects everything to derive from `useCurrentFrame`; the demos run on `DemoClock` and
kit CSS transitions, which is the whole reason the footage is recorded first and Remotion
only edits. `<OffthreadVideo trimBefore>` is the seek into a clip, in frames.
