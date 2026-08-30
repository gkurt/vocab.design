import { DemoClock } from '#src/stage/clock.ts';
import { fadeCanvas, fadeToSubject } from '#src/stage/highlight.ts';
import type { AuditResult } from '#src/stage/player.ts';
import { AttractPlayer } from '#src/stage/player.ts';
import { loadChoreography } from '#src/stage/registry.ts';
import type { Isolation } from '#src/stage/surface.ts';
import { createSurface } from '#src/stage/surface.ts';
import { TouchHover } from '#src/stage/touch-hover.ts';
import { TouchMirror } from '#src/stage/touch-mirror.ts';
import { isRevealed, isSeen } from '#src/stage/visible.ts';

/** How long the speaker pulses after the specimen says something new. */
const SPEAK_MS = 900;
const HOVER_DWELL_MS = 150;

/** The box every specimen is authored against (SPEC §5), which is also the reading column. */
const AUTHORED_WIDTH = 720;

/**
 * Keep the whole specimen inside a column narrower than the box it was authored for
 * (SPEC §5). The reading column is exactly 720px, so this is the phone's problem and
 * nobody else's: below that width the demo would be cut off at both edges, and a
 * specimen with its sides missing is the one thing a stage may never show.
 *
 * The box is SCALED rather than reflowed, exactly as a listing card scales it: a demo
 * composes against 720x320 and may grow into any of it as its state changes, so the box
 * is the only measurement that holds for the whole demonstration. `--sp-scale` goes with
 * it, which is how a demo that measures reads its own pixels back (`#src/kit/measure.ts`),
 * and the annotation overlay stays outside the transform, in the page's own pixels.
 *
 * Applied before the specimen mounts, so a demo measuring itself at mount measures the
 * scale it will be shown at rather than one applied underneath it a frame later.
 */
function fitToColumn(stage: HTMLElement, body: HTMLElement): () => void {
  let scale = 0;
  const fit = () => {
    const width = body.clientWidth;
    if (width === 0) return;
    const next = Math.min(1, width / AUTHORED_WIDTH);
    if (next === scale) return;
    scale = next;
    stage.style.setProperty('--vd-stage-k', `${scale}`);
    if (scale < 1) stage.dataset.fit = '';
    else delete stage.dataset.fit;
  };
  // The body's own height answers to the scale, so only its width is read: a resize
  // that changed nothing settles on the first callback rather than feeding itself.
  const observer = new ResizeObserver(fit);
  observer.observe(body);
  fit();
  return () => observer.disconnect();
}

/** What one run of a specimen's choreography proves, as the CI harness reads it. */
export interface StageAudit extends AuditResult {
  /** `data-subject` elements present on the fresh mount; must be exactly one (SPEC §5). */
  subjects: number;
}

/**
 * Is the subject currently being the term it names? A demo whose states include
 * a counter-example (dark-pattern's fair checkout, keyboard-trap's escapable
 * widget) declares the honest condition as a selector in `data-pose` on the
 * subject; a pose taken while it fails would ring something that is visibly on
 * stage but no longer the term. Visibility says "can it be seen"; this says
 * "is what's seen the claim". No declaration means every visible state is
 * honest, which is most demos, and the ones with states should be DESIGNED
 * that way first (dark-mode's segmented picks the derivation, not the scheme,
 * precisely so its subject never stops being dark): `data-pose` is for terms
 * where the dishonest state is pedagogically required.
 *
 * `data-identify` is the same mechanism for a different claim, and a demo declares one or the
 * other, never both. `data-pose` says "these are the states in which the subject is still the
 * term", which only a counter-example has. `data-identify` says "this is the state in which the
 * term is legible", which a PARAMETER has: every one of verbosity's three levels really is
 * verbosity, but a ring around “Star” at the low setting is a ring around a name, and a name is
 * what every control announces. They are kept apart because `bun validate` reads a pose naming
 * one segment as a claim about which side is the headword, and for a parameter that is a lie.
 */
function satisfiesPose(el: HTMLElement): boolean {
  const condition = el.dataset.pose ?? el.dataset.identify;
  return !condition || el.matches(condition);
}

/**
 * Would this gesture scroll the specimen itself, or is the page merely moving
 * under the pointer? Only the first is user intent (SPEC §7). `dx`/`dy` are
 * omitted for touch, where the axis is not known from a single move.
 */
function scrollsSpecimen(path: readonly (EventTarget | undefined)[], stop: Node, dx?: number, dy?: number): boolean {
  const scrolls = (overflow: string) => overflow === 'auto' || overflow === 'scroll';
  for (const node of path) {
    if (node === stop) return false;
    if (!(node instanceof HTMLElement)) continue;
    const style = getComputedStyle(node);
    const y = scrolls(style.overflowY) && node.scrollHeight > node.clientHeight;
    const x = scrolls(style.overflowX) && node.scrollWidth > node.clientWidth;
    if (dx === undefined || dy === undefined) {
      if (x || y) return true;
      continue;
    }
    if (y && dy !== 0 && (dy < 0 ? node.scrollTop > 0 : node.scrollTop + node.clientHeight < node.scrollHeight - 1)) return true;
    if (x && dx !== 0 && (dx < 0 ? node.scrollLeft > 0 : node.scrollLeft + node.clientWidth < node.scrollWidth - 1)) return true;
  }
  return false;
}

/**
 * <vd-stage> — the specimen stage (SPEC §6). Owns demo isolation (shadow root +
 * adopted kit stylesheet), page-theme sync, the attract player, takeover wiring,
 * controls, and subject annotation (specimen pin + identify spotlight) — curator's
 * ink drawn over the specimen, never styling inside it.
 */
class VdStage extends HTMLElement {
  #player: AttractPlayer | undefined;
  #mountRoot: HTMLElement | undefined;
  #ready: Promise<void> | undefined;
  /** Everything #setup wired to something outside this element, in the order to undo it. */
  #teardown: (() => void)[] = [];

  /** Set while a listing's badge is asking for identify, so the closure can answer late. */
  #identify: ((on: boolean) => void) | undefined;

  static observedAttributes = ['data-hold', 'data-identify'];

  connectedCallback(): void {
    this.#ready ??= this.#setup();
  }

  /**
   * A stage taken out of the document is discarded, not parked: a list page mounts
   * previews as they approach the viewport and evicts them as they leave (SPEC §7).
   * The scheduler claim is the part that must not leak, since one held by a player
   * nobody can reach again means no stage on the page ever plays.
   */
  disconnectedCallback(): void {
    for (const undo of this.#teardown.splice(0)) undo();
    this.#identify = undefined;
    this.#player = undefined;
    this.#mountRoot = undefined;
    // A reconnected stage sets itself up again; the shadow root it already has is reused.
    this.#ready = undefined;
  }

  /**
   * `data-hold` means "stand still even though you are on screen" (SPEC §7): the
   * declarative half of the player's hold, so a list page can nominate which of its
   * previews plays by moving one attribute, before or after the stage has set itself up.
   */
  attributeChangedCallback(name: string): void {
    if (name === 'data-hold') this.#player?.hold(this.dataset.hold !== undefined);
    // Identify from outside the stage: a listing card has no control bar, so the badge
    // that says the specimen is playing is also what points the term out (SPEC §3).
    else if (name === 'data-identify') this.#identify?.(this.dataset.identify !== undefined);
  }

  /**
   * The specimen's mount root, wherever isolation put it: inside this stage's
   * shadow root, or inside the document of its frame (SPEC §6). Undefined until
   * the demo is mounted, which makes it the honest "is the specimen up yet" test.
   */
  get specimenRoot(): HTMLElement | undefined {
    return this.#mountRoot;
  }

  /**
   * Smoke-test seam (SPEC §8). Plays the choreography once through the real
   * player and reports what it proved: every failed `assert`, and how many
   * `data-subject` elements the fresh mount carries. It lives on the stage
   * rather than in the test so the harness drives the same code attract does.
   */
  async audit(): Promise<StageAudit> {
    await this.#ready;
    const player = this.#player;
    if (!player) throw new Error(`stage "${this.dataset.slug}" has no demo to audit`);
    let subjects = 0;
    const result = await player.audit(() => {
      subjects = this.#mountRoot?.querySelectorAll('[data-subject]').length ?? 0;
    });
    return { ...result, subjects };
  }

  async #setup(): Promise<void> {
    const slug = this.dataset.slug;
    const canvas = this.querySelector<HTMLElement>('[data-stage-canvas]');
    const overlay = this.querySelector<HTMLElement>('[data-stage-overlay]');
    if (!slug || !canvas || !overlay) return;

    // A card scales its own preview, from the one width only the listing knows
    // (`.vd-preview`, SPEC §3); everywhere else the stage measures the column it landed in.
    const body = canvas.parentElement;
    if (body && this.dataset.capture === undefined && !this.closest('.vd-preview')) this.#teardown.push(fitToColumn(this, body));

    const isolation: Isolation = this.dataset.isolation === 'iframe' ? 'iframe' : 'inline';
    // A capture stage exists to be photographed once (SPEC §10): the demo, posed as
    // identify poses it, with no controls, no attract loop and nobody to hand it to.
    const capture = this.dataset.capture !== undefined;
    const [surface, choreography] = await Promise.all([
      createSurface(canvas, slug, this.dataset.name ?? slug, isolation),
      loadChoreography(slug),
    ]);
    if (!surface) return;

    // Specimens follow the page theme (SPEC §6) — no per-stage theme control.
    const syncTheme = () => {
      const explicit = document.documentElement.dataset.theme;
      const dark = explicit ? explicit === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
      surface.flag('data-theme', dark ? 'dark' : 'light');
    };
    syncTheme();
    const themeObserver = new MutationObserver(syncTheme);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    const scheme = matchMedia('(prefers-color-scheme: dark)');
    scheme.addEventListener('change', syncTheme);
    this.#teardown.push(
      () => themeObserver.disconnect(),
      () => scheme.removeEventListener('change', syncTheme),
    );

    surface.flag('data-state', 'idle');

    let posed = false;
    let clock: DemoClock | undefined;
    // Announced on the host: the pose is the only stage state that is settled
    // asynchronously, behind a summon, so "posed" is not derivable from the player.
    const setPosed = (on: boolean) => {
      posed = on;
      if (on) this.dataset.posed = '';
      else delete this.dataset.posed;
    };
    // Hover as a touch device leaves it: a tap strands one, and only a tap elsewhere
    // takes it off (SPEC §7). Constructed before the first mount so no tree is ever
    // built without it, and released on remount so a fresh tree cannot inherit the
    // last one's stranded hover.
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const touchHover = new TouchHover(surface.events);
    const remount = () => {
      clock?.stop();
      touchHover.release();
      this.#mountRoot?.remove();
      const root = surface.doc.createElement('div');
      root.className = 'sp-root';
      surface.host.appendChild(root);
      clock = new DemoClock();
      surface.mount(root, clock);
      this.#mountRoot = root;
      setPosed(false);
      syncStrip();
    };

    /**
     * The specimen's mode switch, rendered as stage chrome (SPEC §5.1).
     *
     * A control that compares two versions of the scene is the exhibit's, not the mock
     * product's, and for one release it was drawn inside the demo: 154 of them ended up in
     * a fake application's own title bar, reading as product UI beside an invented brand.
     * Placement is what says "this is not part of the thing you are looking at", so the
     * control is drawn in the strip below the specimen, labelled with the headword the stage
     * already knows. The strip sits inside the overlay rather than in the control bar, so
     * the ghost cursor can travel down onto it and a choreography can press it like any
     * other part (`PlayerHost.strip`). A demo opts in with `data-stage-mode` on its
     * `<sp-segmented>`; the element stays mounted and keeps every listener, so the demo's
     * own logic is untouched and a click here is forwarded to it.
     */
    const strip = this.querySelector<HTMLElement>('[data-stage-strip]');
    let announceWatch: MutationObserver | undefined;
    let speakerTimer: ReturnType<typeof setTimeout> | undefined;

    /**
     * Carry the source's own state onto its mirror in the strip.
     *
     * A choreography aims at the part it always aimed at, and it may qualify that part with a
     * state attribute (`[data-part=verdict][data-state=offset]`). The stage moved where the
     * text is drawn, not what it is called or what it knows about itself, so the mirror has to
     * answer the same selector: without this the player finds nothing in the strip, falls back
     * to the hidden original, and the assert fails on a claim that is true.
     */
    const mirrorData = (source: HTMLElement, target: HTMLElement) => {
      for (const name of Object.keys(target.dataset)) {
        if (!(name in source.dataset)) delete target.dataset[name];
      }
      for (const [name, value] of Object.entries(source.dataset)) {
        if (name === 'stageAnnounce' || name === 'stageVerdict' || value === undefined) continue;
        target.dataset[name] = value;
      }
    };

    /**
     * A lane goes out of sight when its source does. The stage hides the source with
     * `display: none` to lift it out of the fiction, so the demo's OWN dismissal has to be
     * read from the spellings a demo can still reach: `hidden`, `visibility` and opacity,
     * none of which `display: none` disturbs. Without this a verdict the demo took away
     * goes on being drawn out here, and a choreography that says it has gone finds it
     * (`drag-to-create`, `signature-pad`).
     *
     * Read off the ELEMENT'S OWN inline style, never the computed one. `visibility` inherits,
     * so a computed read reports an ancestor's state: `emergency-exit-button` keeps its
     * verdict inside a panel that starts hidden, and the lane went dark and stayed dark,
     * because the observer watches the source and its subtree and can never see an ancestor
     * change. What this mirrors is a demo dismissing its own verdict, which is the case that
     * was broken and the only one a source-watching observer can honestly follow.
     *
     * `visibility` rather than `display`, so the strip keeps the height it reserved: a lane
     * that collapsed would move the control bar and the page under it every time a demo
     * stopped speaking, which is the layout shift the reserved height exists to prevent.
     */
    const mirrorHidden = (source: HTMLElement, lane: HTMLElement) => {
      const gone = source.hidden || source.style.visibility === 'hidden' || Number.parseFloat(source.style.opacity || '1') <= 0.05;
      lane.style.visibility = gone ? 'hidden' : '';
    };

    /**
     * What the specimen SAYS, drawn in the strip (SPEC §5.1).
     *
     * A screen reader's speech is the load-bearing half of an accessibility specimen: the
     * whole claim of `has-popup` or `set-size-and-position` is the sentence a reader hears,
     * and a demo that prints it into a panel of its own makes it look like a feature of the
     * mock product rather than the thing being demonstrated. So it moves out here, with a
     * speaker beside it that pulses when the words change, which is the only cue a reader
     * looking at the specimen has that something was just spoken.
     *
     * The mirror is the real live region, and it can be, precisely because the demo's own
     * element is hidden and so out of the accessibility tree: without this, a specimen about
     * announcements would announce nothing to the reader who most needs it.
     */
    const buildAnnouncement = (source: HTMLElement): HTMLElement => {
      const lane = document.createElement('div');
      lane.className = 'vd-stage-say';
      lane.setAttribute('role', 'status');
      lane.setAttribute('aria-live', 'polite');
      lane.setAttribute('aria-atomic', 'true');

      const speaker = document.createElement('span');
      speaker.className = 'vd-stage-say__speaker';
      speaker.setAttribute('aria-hidden', 'true');
      speaker.innerHTML =
        '<svg viewBox="0 0 16 16" width="13" height="13"><path d="M7 2.6 3.9 5.2H2a.7.7 0 0 0-.7.7v4.2c0 .4.3.7.7.7h1.9L7 13.4a.6.6 0 0 0 1-.5V3.1a.6.6 0 0 0-1-.5Z"/>' +
        '<path class="vd-stage-say__wave" d="M10.4 5.6a3.4 3.4 0 0 1 0 4.8" fill="none" stroke="currentcolor" stroke-width="1.3" stroke-linecap="round"/>' +
        '<path class="vd-stage-say__wave vd-stage-say__wave--far" d="M12.4 3.6a6.2 6.2 0 0 1 0 8.8" fill="none" stroke="currentcolor" stroke-width="1.3" stroke-linecap="round"/></svg>';

      const said = document.createElement('p');
      said.className = 'vd-stage-say__text';
      mirrorData(source, said);
      // The utterance is cloned rather than copied as text, because for ten specimens the
      // subject is a WORD inside the sentence (`pronunciation`'s respelled token,
      // `role-description`'s role, `set-size-and-position`'s "247 of 900"), marked on a span
      // of its own. A text copy would flatten that span away and leave identify with nothing
      // in the strip to ring. Announcement children carry inline styles and no kit classes,
      // which is what lets them cross into chrome and still look like themselves.
      let painted = '';
      const paint = () => {
        if (source.innerHTML === painted) return false;
        painted = source.innerHTML;
        said.replaceChildren(...[...source.childNodes].map((node) => node.cloneNode(true)));
        return true;
      };
      paint();
      lane.append(speaker, said);
      mirrorHidden(source, lane);

      const speak = () => {
        mirrorData(source, said);
        mirrorHidden(source, lane);
        if (!paint()) return;
        if (reducedMotion) return;
        lane.setAttribute('data-speaking', '');
        clearTimeout(speakerTimer);
        speakerTimer = setTimeout(() => lane.removeAttribute('data-speaking'), SPEAK_MS);
      };
      announceWatch = new MutationObserver(speak);
      announceWatch.observe(source, { attributes: true, childList: true, characterData: true, subtree: true });
      return lane;
    };

    let verdictWatch: MutationObserver | undefined;

    /**
     * What the specimen's current state AMOUNTS TO, drawn in the strip (SPEC §5.1).
     *
     * A verdict is the author's voice, not the product's: no checkout says "the advertised
     * 42.00 won the click" about itself, and printed inside the mock in the mock's own type
     * it is one more thing the reader has to work out is not part of the fiction. It is also
     * an artifact of the mode, so it belongs beside the switch that produced it rather than
     * in a column of the specimen reserved to hold it.
     *
     * Unlike an announcement this is not speech, so it carries no speaker and no live
     * region: a screen reader reaches it as ordinary prose, in the order it is drawn.
     */
    const buildVerdict = (source: HTMLElement): HTMLElement => {
      const lane = document.createElement('p');
      lane.className = 'vd-stage-verdict';
      mirrorData(source, lane);
      mirrorHidden(source, lane);
      lane.textContent = source.textContent?.trim() ?? '';
      verdictWatch = new MutationObserver(() => {
        mirrorData(source, lane);
        mirrorHidden(source, lane);
        lane.textContent = source.textContent?.trim() ?? '';
      });
      verdictWatch.observe(source, { attributes: true, childList: true, characterData: true, subtree: true });
      return lane;
    };

    let modeWatch: MutationObserver | undefined;
    const syncStrip = () => {
      modeWatch?.disconnect();
      announceWatch?.disconnect();
      verdictWatch?.disconnect();
      clearTimeout(speakerTimer);
      modeWatch = new MutationObserver(() => {
        for (const repaint of repaints) repaint();
      });
      const repaints: Array<() => void> = [];
      const sources = [...(this.#mountRoot?.querySelectorAll<HTMLElement>('sp-segmented[data-stage-mode]') ?? [])];
      const announcer = this.#mountRoot?.querySelector<HTMLElement>('[data-stage-announce]') ?? null;
      const verdicter = this.#mountRoot?.querySelector<HTMLElement>('[data-stage-verdict]') ?? null;

      // Hide every source BEFORE anything else, INCLUDING before asking whether this stage
      // even draws a strip. What the strip replaced must never be left sitting in the
      // fiction, and there are two stages that draw no strip at all: a capture with a switch
      // and nothing to say (hiding after that decision photographed the old layout), and a
      // listing card, which has no control bar and no room for prose. A card that returned
      // here early kept showing the caption and the switch INSIDE the specimen, which is the
      // one place they must never be, on the busiest page of the site (SPEC §5.1).
      if (announcer) announcer.style.display = 'none';
      if (verdicter) verdicter.style.display = 'none';
      for (const source of sources) source.style.display = 'none';

      if (!strip) return;
      strip.replaceChildren();
      // A share image is a photograph of the SPECIMEN, and the strip is the exhibit's
      // furniture around it (SPEC §10): a switch nobody can press, and two lanes of the
      // site's own voice under a picture whose caption band already speaks in that voice.
      // So a capture draws no strip at all, and what the strip would have lifted out stays
      // hidden, exactly as it is on a listing card.
      strip.hidden = capture || (!sources.length && !announcer && !verdicter);
      if (strip.hidden) return;

      // What the specimen says goes directly under it, because it is the specimen speaking;
      // the controls sit below, next to the bar they belong with.
      if (announcer) strip.append(buildAnnouncement(announcer));
      // The verdict sits directly above the controls, because it is what the switch just did.
      if (verdicter) strip.append(buildVerdict(verdicter));
      if (!sources.length) return;
      const controls = document.createElement('div');
      controls.className = 'vd-stage-strip__controls';

      for (const source of sources) {
        // A counter-example switch IS the headword, so the headword names it: "Drip pricing:
        // With | Without" cannot be spelled, ordered or left ambiguous by an author, because
        // no author writes it. A variant or a parameter is not the word, so it keeps its own
        // axis ("Theme", "Width"), which is also what lets a demo put two switches out here
        // without them both claiming to be the term.
        const named = source.hasAttribute('data-term') ? (this.dataset.name ?? slug) : (source.dataset.axis ?? '');
        const group = document.createElement('span');
        group.className = 'vd-stage-mode';
        group.setAttribute('role', 'group');
        group.setAttribute('aria-label', source.getAttribute('aria-label') ?? named);
        // The control mirrors the source's `data-*` exactly as a lane mirrors its own
        // (SPEC §5.1): the source is hidden, so a choreography asking "which mode is this
        // in" (`[data-part=picker][data-value=open]`) has to find the answer on the copy
        // the reader can see. `data-value` is repainted below, since it is the state.
        for (const attr of source.getAttributeNames())
          if (attr.startsWith('data-')) group.setAttribute(attr, source.getAttribute(attr) ?? '');
        if (named) {
          const label = document.createElement('span');
          label.className = 'vd-stage-mode__label';
          label.textContent = `${named}:`;
          label.setAttribute('aria-hidden', 'true');
          group.append(label);
        }

        const paint = () => {
          group.dataset.value = source.dataset.value ?? '';
          for (const button of group.querySelectorAll<HTMLElement>('button')) {
            const on = button.dataset.value === source.dataset.value;
            button.setAttribute('aria-pressed', String(on));
            // `aria-selected` is invalid on a button, so the segment's portable spelling
            // crosses instead and a choreography can qualify the part it always aimed at.
            button.toggleAttribute('data-selected', on);
          }
        };
        for (const segment of source.querySelectorAll<HTMLButtonElement>('.sp-segment')) {
          const button = document.createElement('button');
          button.type = 'button';
          // The choreography aims at the part it always aimed at; the stage moved where that
          // part is drawn, not what it is called. The hidden source keeps its own copy, so the
          // demo's `part()` lookups are untouched.
          for (const attr of segment.getAttributeNames())
            if (attr.startsWith('data-')) button.setAttribute(attr, segment.getAttribute(attr) ?? '');
          button.dataset.value = segment.value;
          button.textContent = segment.textContent;
          button.addEventListener('click', () => segment.click());
          group.append(button);
        }
        controls.append(group);
        repaints.push(paint);
        paint();

        // The demo owns the mode: a reader's click here, the attract script's click, and the
        // demo's own code all reach it the same way, so the outer control follows the source
        // rather than remembering what it last pressed. Without this it goes stale the moment
        // anything other than this control changes the mode, which is most of the time.
        modeWatch.observe(source, { attributes: true, attributeFilter: ['data-value'] });
      }
      strip.append(controls);
    };
    this.#teardown.push(() => {
      modeWatch?.disconnect();
      announceWatch?.disconnect();
      verdictWatch?.disconnect();
      clearTimeout(speakerTimer);
    });
    remount();
    this.#teardown.push(() => clock?.stop());

    // The play control reads the *mode*, not the instantaneous player state: identify
    // suspends attract without ending it, and the label must not flicker for that.
    const replayButton = this.querySelector<HTMLElement>('[data-stage-replay]');
    let autoplay = false;
    let identifyHold = false;
    const setAutoplay = (on: boolean) => {
      autoplay = on;
      if (on) this.dataset.autoplay = '';
      else delete this.dataset.autoplay;
      if (replayButton) replayButton.title = on ? 'Stop the demonstration' : 'Play the demonstration';
    };

    const player = new AttractPlayer(choreography?.default ?? [], {
      root: () => this.#mountRoot as HTMLElement,
      overlay,
      strip: () => strip,
      remount,
      clockUsed: () => clock?.used ?? false,
      reducedMotion,
      offset: surface.offset,
      // A pass of the choreography is over. Announced on the host element because the
      // only listener is outside the stage: a listing rotates its one playing specimen
      // on this boundary (SPEC §3), and nothing inside a stage cares.
      onPass: () => this.dispatchEvent(new CustomEvent('vd-pass')),
      onStateChange: (state) => {
        this.dataset.state = state;
        // Mirrored inside the specimen so kit animations pause with the player.
        surface.flag('data-state', state);
        if (!identifyHold) setAutoplay(state === 'attract');
        // Reduced motion rests on the posed specimen (SPEC §7).
        if (reducedMotion && state === 'idle') {
          setTimeout(() => {
            if (player.state === 'idle') void enterPose();
          }, 0);
        }
      },
    });
    this.#player = player;
    this.#teardown.push(() => player.destroy());
    // The attribute may have arrived before this element had a player to tell.
    if (this.dataset.hold !== undefined) player.hold(true);

    // The reader's pointer inside a `data-touch` scope is drawn as a fingertip
    // disc (SPEC §7); the kit hides the native cursor there. Real events never
    // leave an iframe, so a framed specimen cannot be mirrored — acceptable while
    // no touch term is document-scoped, and a reason to revisit if one becomes so.
    new TouchMirror(surface.events, surface.edge, overlay, surface.offset);

    // --- Subject annotation (SPEC §6) ---
    // The strip wins, because its copy is the one on screen: when the subject is what the
    // specimen SAYS, the sentence lives out here and the demo's own element is hidden, so
    // identify would otherwise ring a node no reader can see (SPEC §6).
    const subject = () =>
      strip?.querySelector<HTMLElement>('[data-subject]') ?? this.#mountRoot?.querySelector<HTMLElement>('[data-subject]') ?? null;
    // data-subject on the demo's top-level wrapper means "the whole scene is the subject".
    const isWholeScene = (el: HTMLElement) => el === this.#mountRoot?.firstElementChild;

    // Identify answers "which part of this is the term". A whole-scene subject has no
    // part: the ring would trace the frame it already sits inside and the pin would
    // repeat the headword printed above the stage. No affordance beats one that
    // resolves to "all of it", so the control is withdrawn rather than made to shrug.
    const mounted = subject();
    const pointable = !!mounted && !isWholeScene(mounted);

    const pin = document.createElement('div');
    pin.className = 'vd-subject-pin';
    pin.textContent = this.dataset.name ?? slug;
    const spotlight = document.createElement('div');
    spotlight.className = 'vd-spotlight';
    // A capture stage draws neither: the still says which part is the term with light
    // instead of with ink (src/stage/highlight.ts), and the caption prints the headword.
    if (pointable && !capture) overlay.append(spotlight, pin);

    /**
     * Pose the specimen (SPEC §6): summon the subject if needed, then hold the
     * demo's clock so its own timers cannot dismiss the subject mid-inspection.
     * The specimen stays the live one, listeners and all, which is what lets the
     * gesture that wakes it land on the element the reader aimed at.
     */
    let posing: Promise<void> | undefined;
    const enterPose = async () => {
      if (posed) return;
      posing ??= (async () => {
        const own = await player.summon(() => {
          const el = subject();
          return el ? isRevealed(el) && satisfiesPose(el) : false;
        });
        // A superseded summon means attract already has the stage back; freezing now
        // would leave the run playing a specimen whose clock has stopped.
        if (!own) return;
        clock?.freeze();
        setPosed(true);
      })();
      await posing;
      posing = undefined;
    };

    // --- OG capture (SPEC §10) ---
    // The share image is this specimen photographed in identify's pose: the subject
    // summoned, the clock frozen, the rest of the canvas faded back. Nothing below
    // this point is wired, because none of it has anyone to answer: attract never
    // starts (no observer), there is no pointer to take the stage over with, and the
    // controls are not rendered. `data-capture-ready` is what the shutter waits for.
    if (capture) {
      // Type settles before anything is measured: the subject's box is text-shaped,
      // and a mask cut around the fallback font is cut around the wrong element.
      await surface.doc.fonts?.ready;
      await enterPose();
      const el = subject();
      // With no strip in the picture, a subject that lives in one of its lanes is not on the
      // canvas to be pointed at. Fading the whole thing is the honest answer: the picture
      // says "look at this specimen" rather than aiming light at a box that is not there.
      // A whole-scene subject still fades nothing, because "all of it" is an answer light
      // cannot give and dimming the entire picture to say it is worse than saying nothing.
      if (el && pointable) {
        if (isSeen(el)) fadeToSubject(canvas, el, surface.offset);
        else fadeCanvas(canvas);
      }
      this.dataset.captureReady = '';
      return;
    }

    /** `rect` is the ring's box, in overlay coordinates. */
    const placePin = (rect: { left: number; top: number; width: number; height: number }) => {
      pin.style.left = `${rect.left + rect.width / 2}px`;
      const above = rect.top - 10;
      if (above > 34) {
        pin.style.top = `${above}px`;
        pin.dataset.side = 'above';
      } else {
        pin.style.top = `${rect.top + rect.height + 10}px`;
        pin.dataset.side = 'below';
      }
      pin.setAttribute('data-visible', '');
    };

    let identifyActive = false;
    let identifySticky = false;
    const hideAnnotation = () => {
      spotlight.removeAttribute('data-visible');
      pin.removeAttribute('data-visible');
    };
    const place = () => {
      if (!identifyActive) return;
      const el = subject();
      if (!el) return;
      const overlayRect = overlay.getBoundingClientRect();
      const rect = el.getBoundingClientRect();
      // The overlay is chrome and the subject may be in a document of its own, so
      // the ring is placed in page coordinates, not the specimen's (SPEC §6).
      // A strip element is chrome already, in page pixels; only a specimen's box needs
      // converting out of the surface it lives in.
      const { x, y, scale } = strip?.contains(el) ? { x: 0, y: 0, scale: 1 } : surface.offset();
      const box = {
        left: rect.left * scale + x - overlayRect.left - 6,
        top: rect.top * scale + y - overlayRect.top - 6,
        width: rect.width * scale + 12,
        height: rect.height * scale + 12,
      };
      spotlight.style.left = `${box.left}px`;
      spotlight.style.top = `${box.top}px`;
      spotlight.style.width = `${box.width}px`;
      spotlight.style.height = `${box.height}px`;
      spotlight.setAttribute('data-visible', '');
      placePin(box);
    };
    const setIdentify = (on: boolean) => {
      identifyActive = on;
      if (!on) {
        identifyHold = false;
        hideAnnotation();
        // Reduced motion rests on the pose; otherwise the live demo resumes.
        if (!reducedMotion) player.resume();
        return;
      }
      // Identify borrows the stage from attract rather than taking it (SPEC §6).
      identifyHold = autoplay;
      void enterPose().then(place);
    };

    // A whole-scene subject has no part to point at, so the request is refused rather
    // than answered with a ring around the frame the specimen already sits in (SPEC §5).
    this.#identify = (on) => {
      if (pointable) setIdentify(on);
    };
    if (this.dataset.identify !== undefined) this.#identify(true);

    const identifyButton = this.querySelector<HTMLElement>('[data-stage-identify]');
    if (!pointable) identifyButton?.remove();
    else {
      identifyButton?.addEventListener('pointerenter', () => setIdentify(true));
      identifyButton?.addEventListener('pointerleave', () => {
        if (!identifySticky) setIdentify(false);
      });
      identifyButton?.addEventListener('click', () => {
        identifySticky = !identifySticky;
        setIdentify(identifySticky);
      });
    }

    // --- Takeover wiring (SPEC §7) ---
    const dismissIdentify = () => {
      identifySticky = false;
      identifyActive = false;
      identifyHold = false;
      hideAnnotation();
    };
    const takeover = (at?: EventTarget | null) => {
      setAutoplay(false);
      dismissIdentify();
      // Waking a posed specimen hands it over as it stands (SPEC §7). Remounting here
      // would take the pressed node out of the document between pointerdown and click,
      // and a click has no target left to fire on: the gesture that woke the demo would
      // be the one gesture it never received. Touch has no hover to wake it first, so
      // under reduced motion, where the stage rests on a pose, that was every tap.
      if (posed) {
        setPosed(false);
        clock?.thaw();
      }
      player.userIntent(at);
    };
    // Takeover is intentional (SPEC §7): a click anywhere, keyboard focus or a key press, a dwell on
    // an interactive element, or a gesture that actually scrolls the specimen. Merely
    // passing the pointer over the stage, or scrolling the page past it, never takes over.
    // A surface marked data-hover-driven declares hovering itself IS the interaction
    // (a dock that bulges, a glow that follows), so a dwell there is intent too — and a
    // gaze scope is hover-driven by definition, since looking is hovering (SPEC §7).
    const INTERACTIVE = 'a[href], button, input, select, textarea, [tabindex], [data-hover-driven], [data-gaze]';
    let dwell: ReturnType<typeof setTimeout> | undefined;
    // Listened for inside the specimen, never on the canvas around it, because
    // neither isolation boundary lets these out. Shadow DOM prunes pointerover and
    // pointerout whenever both ends of a move are inside it, so a stage listening
    // from outside would hear the pointer arrive in the specimen and never see it
    // land on a control; an iframe does not let events out at all. Inside, the
    // player's own synthesized input is in scope too, so every takeover signal is
    // gated on isTrusted: the ghost cursor must never be mistaken for the user and
    // hand the stage to itself.
    const listen = <T extends Event>(type: string, handler: (event: T) => void, options?: AddEventListenerOptions) =>
      surface.events.addEventListener(type, (event) => handler(event as T), options);

    listen<PointerEvent>('pointerover', (event) => {
      if (!event.isTrusted) return;
      clearTimeout(dwell);
      const el = event.composedPath()[0];
      if (!(el instanceof Element) || !el.closest(INTERACTIVE)) return;
      dwell = setTimeout(() => takeover(el), HOVER_DWELL_MS);
    });
    // The pointer leaving the specimen's outermost box, which is the canvas for a
    // shadow root and the document element for a frame.
    /**
     * Whether a reader still holds the specimen by the keyboard. A shadow root reports null
     * when nothing inside it has focus; a document reports its own body, so both spellings of
     * "nobody is here" have to be answered.
     *
     * Focus alone does not answer it, because a click focuses what it presses: a reader who
     * poked a button once and moved on would hold the stage for the rest of the page's life,
     * and the specimen would never auto-play again. `:focus-visible` is the platform's own
     * answer to "is this reader driving with the keyboard", and it is the exact one needed
     * here: a mouse-focused control does not match, and the moment the reader presses a key
     * on it, it does. That includes the modifiers, which is what a held Shift needs, since
     * it never auto-repeats and so has no second keydown to re-claim the stage with.
     */
    const focusWithin = (): boolean => {
      const scope = surface.events as EventTarget & { activeElement?: Element | null; body?: Element | null };
      const active = scope.activeElement ?? null;
      if (active === null || active === (scope.body ?? null)) return false;
      return active.matches(':focus-visible');
    };
    surface.edge.addEventListener('pointerleave', (event) => {
      // Trusted only, like every other takeover signal above. The ghost dispatches leave up
      // the ancestor chain a real pointer would leave, so its own travel reaches this box;
      // ungated, an attract run handed the stage back to itself and the resume that followed
      // cancelled the run mid-script (`hover`, `spotlight-hover`).
      if (!event.isTrusted) return;
      clearTimeout(dwell);
      // The pointer wandering off is not the reader leaving when their focus is still in here:
      // handing the stage back to attract under a keyboard reader is how the script gets to
      // fight them for the demo.
      if (!identifyActive && !focusWithin()) player.userGone();
    });
    listen<PointerEvent>('pointerdown', (event) => {
      if (event.isTrusted) takeover(event.composedPath()[0]);
    });
    listen<FocusEvent>('focusin', (event) => {
      if (event.isTrusted) takeover(event.composedPath()[0]);
    });
    // The strip is the exhibit's row, not the specimen's, so `listen` cannot hear it: those
    // listeners are on the surface, and the surface is the shadow root. A reader pressing
    // the mode switch is as plain an intent as pressing anything inside the demo, and
    // without this the script keeps playing over the top of them and undoes the mode they
    // just chose. Synthesized clicks and the ghost cursor both skip this path, which is why
    // nothing caught it: only a trusted event proves it.
    if (strip) {
      const stripIntent = (event: Event) => {
        if (event.isTrusted) takeover(event.target);
      };
      // And the pointer leaving the strip is the reader leaving, exactly as it is for the
      // specimen's own edge. Without the pair, one press on the mode switch kept the stage
      // in user mode for the rest of the visit and the demonstration never played again.
      const stripGone = (event: Event) => {
        // Trusted only, for the reason the specimen's own edge is (above): the ghost visits
        // the strip whenever a script aims at a lifted caption, and its leave on the way out
        // is not a reader going.
        if (!event.isTrusted || identifyActive || focusWithin()) return;
        player.userGone();
      };
      strip.addEventListener('pointerdown', stripIntent);
      strip.addEventListener('focusin', stripIntent);
      strip.addEventListener('pointerleave', stripGone);
      this.#teardown.push(() => {
        strip.removeEventListener('pointerdown', stripIntent);
        strip.removeEventListener('focusin', stripIntent);
        strip.removeEventListener('pointerleave', stripGone);
      });
    }
    // A key is intent too, and it has to be claimed on EVERY keydown rather than only the
    // first. A reader holding a key down is mid-gesture for as long as they hold it, and if
    // attract resumes underneath them the script's own keyup lands in the demo and ends the
    // reader's hold: a quasimode flickers on and off, once per pass. Auto-repeat re-asserts
    // the claim, and the keys that do not repeat at all (Shift, Control) are why the pointer
    // leaving must not hand the stage back either. Focus is already inside the specimen here,
    // since these events are the surface's own.
    listen<KeyboardEvent>('keydown', (event) => {
      if (event.isTrusted) takeover(event.composedPath()[0]);
    });
    listen<WheelEvent>(
      'wheel',
      (event) => {
        if (event.isTrusted && scrollsSpecimen(event.composedPath(), surface.outside, event.deltaX, event.deltaY))
          takeover(event.composedPath()[0]);
      },
      { passive: true },
    );
    listen<TouchEvent>(
      'touchmove',
      (event) => {
        if (event.isTrusted && scrollsSpecimen(event.composedPath(), surface.outside)) takeover(event.composedPath()[0]);
      },
      { passive: true },
    );

    replayButton?.addEventListener('click', () => {
      // While attract owns the stage the control reads "Auto-playing"; clicking it stops.
      if (autoplay) {
        takeover();
        return;
      }
      dismissIdentify();
      player.replay();
    });

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) entry.isIntersecting ? player.viewportEnter() : player.viewportLeave();
      },
      { threshold: 0.4 },
    );
    observer.observe(this);
    this.#teardown.push(() => observer.disconnect());

    if (reducedMotion) void enterPose();
  }
}

if (!customElements.get('vd-stage')) customElements.define('vd-stage', VdStage);
