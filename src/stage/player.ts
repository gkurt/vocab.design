import { FORCE_RAMP_MS } from '#src/kit/touch.ts';
import type { Step } from '#src/stage/choreography.ts';
import { claim, release } from '#src/stage/scheduler.ts';
import { isSeen } from '#src/stage/visible.ts';

export type PlayerState = 'idle' | 'attract' | 'user' | 'paused';

/** An `assert` the specimen did not satisfy when the script reached it (SPEC §8). */
export interface AssertFailure {
  /** Index of the failing step in the choreography, so the report points at a line. */
  step: number;
  selector: string;
  expected: 'visible' | 'hidden';
  /** Set on audit's second lap: a loop-persistent demo whose pass left it dirty. */
  lap?: number;
}

export interface AuditResult {
  failures: AssertFailure[];
  /** True if something cancelled the run part-way, leaving later asserts unjudged. */
  interrupted: boolean;
}

export interface PlayerHost {
  /** Current demo root — looked up per step because remount replaces it. */
  root: () => HTMLElement;
  /** Stage overlay (light DOM) where the ghost cursor and key HUD live. */
  overlay: HTMLElement;
  /** Destroy-and-remount the demo from its initial state. */
  remount: () => void;
  /** Has the current mount armed any DemoClock timer? Self-animating demos are
   * phase-locked to their mount, so they never persist across loop iterations
   * without declaring it. */
  clockUsed: () => boolean;
  /**
   * Specimen coordinates to page coordinates (SPEC §6). Zero for shadow DOM; an
   * iframe has a viewport of its own, and the ghost cursor lives in neither.
   */
  offset: () => { x: number; y: number };
  reducedMotion: boolean;
  onStateChange?: (state: PlayerState) => void;
}

const CURSOR_TRAVEL_MS = 550;
const STEP_GAP_MS = 350;
const TYPE_CHAR_MS = 70;
const LOOP_PAUSE_MS = 1400;
const RESUME_IDLE_MS = 1200;
const SUMMON_GAP_MS = 60;
const SUMMON_WAIT_MS = 900;
const SUMMON_TICK_MS = 80;
const SCROLL_MS = 420;
const SCROLL_SLICES = 7;
/** A wheel step's burst: the total delta split across this many WheelEvents. */
const WHEEL_TICKS = 5;
const WHEEL_MS = 350;
const FX_TTL_MS = 700;
const DRAG_MOVES = 3;
/** Extra travel each via waypoint buys a path drag, so a long stroke is not rushed. */
const DRAG_VIA_MS = 300;
const PRESS_FLASH_MS = 200;
const HOLD_RAMP_TICKS = 6;
/** Where a touch contact's pressure ramp starts; a resting finger is not weightless. */
const TOUCH_BASE_FORCE = 0.3;
/** A held key's typematic shape: the initial delay, then one repeat per interval. */
const KEY_REPEAT_DELAY_MS = 500;
const KEY_REPEAT_INTERVAL_MS = 90;
/**
 * A pinch's separation never exceeds this: an opening pinch starts narrow and
 * ends here, a closing one starts here — so the gesture always fits the stage,
 * and the end/start ratio is exactly the step's scale either way.
 */
const PINCH_SPAN = 110;
const PINCH_TICKS = 8;
const PINCH_MS = 650;
/** The diagonal the contacts rest on, in degrees — the same axis the reader's Ctrl+drag mirror uses. */
const PINCH_BASE_DEG = 45;
const PINCH_ID_A = 21;
const PINCH_ID_B = 22;

/**
 * The pressure a touch hold reports after `elapsed` ms. The ramp is rate-based,
 * reaching full force at FORCE_RAMP_MS like the kit's mouse simulation, so the
 * length of a `hold` step CHOOSES the depth it reaches: a brief hold is a light
 * press, a long one bottoms out. A duration-normalized ramp would make every
 * hold end at 1 and no script could ever perform a partial press.
 */
function holdForce(elapsed: number): number {
  return Math.min(1, TOUCH_BASE_FORCE + ((1 - TOUCH_BASE_FORCE) * elapsed) / FORCE_RAMP_MS);
}

const FOCUSABLE = 'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])';

/** The keys a withKey scope stamps as event flags; any other key is held without one. */
const MOD_FLAGS: Partial<Record<string, 'shiftKey' | 'ctrlKey' | 'altKey' | 'metaKey'>> = {
  Shift: 'shiftKey',
  Control: 'ctrlKey',
  Alt: 'altKey',
  Meta: 'metaKey',
};

// Tall, narrow arrow with a vertical left edge and a tail, like a real pointer.
// The tip sits at (4.5, 1.5); stage.css offsets the svg so the tip is the hotspot.
const CURSOR_SVG =
  '<svg class="vd-cursor-arrow" viewBox="0 0 20 24" width="20" height="24"><path d="M4.5 1.5v16.3l3.7-3.6 2.4 5.6 2.6-1.1-2.4-5.5h5.2z" fill="var(--vd-ink, #1c1a17)" stroke="var(--vd-paper, #fff)" stroke-width="1.2" stroke-linejoin="round"/></svg>';

// Closed hand the cursor becomes while a drag is held: four knuckle bumps over a
// rounded palm, the fingers parted by paper-coloured seams so the fist reads as one
// at cursor size. The grip sits at its centre; stage.css offsets it onto the hotspot.
const GRAB_SVG =
  '<svg class="vd-cursor-hand" viewBox="0 0 20 20" width="20" height="20">' +
  '<path d="M4.6 10.8 V8.4 a1.45 1.45 0 0 1 2.9 0 V7.2 a1.45 1.45 0 0 1 2.9 0 v.5 a1.45 1.45 0 0 1 2.9 0 v1 a1.45 1.45 0 0 1 2.9 0 v3.9 a4.7 4.7 0 0 1 -4.7 4.7 h-2.2 a4.7 4.7 0 0 1 -4.7 -4.7 z" fill="var(--vd-ink, #1c1a17)" stroke="var(--vd-paper, #fff)" stroke-width="1.2" stroke-linejoin="round"/>' +
  '<path d="M7.5 9 v2 M10.4 8.3 v2.7 M13.3 9.3 v1.7" fill="none" stroke="var(--vd-paper, #fff)" stroke-width="0.9" stroke-linecap="round"/></svg>';

// The gaze persona's eye, centred on the hotspot: an almond outline, an iris with
// a catchlight. It rests where the reader is looking; stage.css offsets it so the
// iris sits exactly on the point.
const EYE_SVG =
  '<svg class="vd-cursor-eye" viewBox="0 0 24 16" width="24" height="16">' +
  '<path d="M12 1.5 C6 1.5 2.4 5.8 1.2 8 C2.4 10.2 6 14.5 12 14.5 C18 14.5 21.6 10.2 22.8 8 C21.6 5.8 18 1.5 12 1.5 Z" fill="var(--vd-paper, #fff)" stroke="var(--vd-ink, #1c1a17)" stroke-width="1.5" stroke-linejoin="round"/>' +
  '<circle cx="12" cy="8" r="3.6" fill="var(--vd-ink, #1c1a17)"/>' +
  '<circle cx="13.2" cy="6.8" r="1.1" fill="var(--vd-paper, #fff)"/></svg>';

/**
 * Where the pointer rests on an element: its centre, unless the element carries
 * `data-aim`, which parks the pointer just inside its bottom-right corner. On a
 * small control the cursor is the biggest thing on it, and a morphing glyph
 * would perform entirely underneath the arrow. The corner is not configurable:
 * the arrow's body extends down-right of its tip, so bottom-right is the one
 * corner that leaves the artwork visible. The drawn cursor and the dispatched
 * coordinates move together, so the stage never claims a click it did not make.
 */
function aimAt(el: Element): { x: number; y: number } {
  const rect = el.getBoundingClientRect();
  if (el instanceof HTMLElement && el.dataset.aim !== undefined && rect.width > 8 && rect.height > 8)
    return { x: rect.right - 3, y: rect.bottom - 3 };
  return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
}

/**
 * Attract-mode player (SPEC §7–8). Drives a demo through its choreography with
 * synthesized events and a visible ghost cursor, looping for as long as the
 * stage is on screen. Input kinds are disambiguated at the cursor (left/right
 * arcs, a grab hand while a drag is held, caret pulses) and typing lands a
 * character at a time. Never moves real focus — keyboard steps use simulated
 * focus (`data-sim-focus`) plus the key HUD.
 */
export class AttractPlayer {
  #steps: Step[];
  #host: PlayerHost;
  #state: PlayerState = 'idle';
  #generation = 0;
  #visible = false;
  #cursor: HTMLElement;
  #hud: HTMLElement;
  #target: Element | null = null;
  #hovered: Element | null = null;
  /** Where the drawn ghost last landed, in specimen coordinates: a travel's start. */
  #cursorAt: { x: number; y: number } | null = null;
  #simFocus: Element | null = null;
  #resumeTimer: ReturnType<typeof setTimeout> | undefined;
  /** Modifier flags the withKey scopes currently hold, stamped on every event the ghost dispatches. */
  #mods = { shiftKey: false, ctrlKey: false, altKey: false, metaKey: false };
  /** Attribute spellings the ghost set itself, so it never removes a demo's own. */
  #hoverOwned: Element | null = null;
  #pressOwned: Element | null = null;
  #pressTimer: ReturnType<typeof setTimeout> | undefined;

  constructor(steps: Step[], host: PlayerHost) {
    this.#steps = steps;
    this.#host = host;
    this.#cursor = document.createElement('div');
    this.#cursor.className = 'vd-ghost-cursor';
    this.#cursor.innerHTML =
      `${CURSOR_SVG}${GRAB_SVG}${EYE_SVG}<span class="vd-cursor-touch"><span class="vd-cursor-force"></span></span>` +
      '<span class="vd-cursor-pinch"></span><span class="vd-cursor-pinch vd-cursor-pinch--b"></span>';
    this.#hud = document.createElement('div');
    this.#hud.className = 'vd-key-hud';
    host.overlay.append(this.#cursor, this.#hud);
  }

  get state(): PlayerState {
    return this.#state;
  }

  viewportEnter(): void {
    this.#visible = true;
    if (this.#state === 'idle' || this.#state === 'paused') this.#tryAttract();
  }

  viewportLeave(): void {
    this.#visible = false;
    if (this.#state === 'attract') {
      this.#cancelRun();
      this.#setState('paused');
    }
    release(this);
  }

  /**
   * Real user input detected — halt the script and hand the demo over as-is.
   * `at` is what the real pointer touched, when there is one: the ghost lets go of
   * whatever it was hovering, unless the real pointer is already inside it, where a
   * synthetic leave would contradict the enter the browser has just sent.
   */
  userIntent(at?: EventTarget | null): void {
    clearTimeout(this.#resumeTimer);
    if (!(at instanceof Node) || !this.#hovered?.contains(at)) this.#hover(null);
    if (this.#state === 'attract') this.#cancelRun();
    if (this.#state !== 'user') this.#setState('user');
  }

  /** Pointer left after user mode — reset and let attract resume after an idle beat. */
  userGone(): void {
    if (this.#state !== 'user') return;
    clearTimeout(this.#resumeTimer);
    this.#resumeTimer = setTimeout(() => {
      if (this.#state === 'user') this.resume();
    }, RESUME_IDLE_MS);
  }

  /**
   * Play the script once and report every `assert` the specimen failed (SPEC §8).
   * The smoke test drives the real player rather than a replica of it, so a demo
   * that only answers a browser's own click and not the player's synthesized one
   * fails here instead of quietly going still in attract mode. `onMount` runs on
   * the fresh mount, before the first step, which is the only moment "after
   * mount" means anything.
   *
   * Leaves the player in user mode: the audit owns the demo until the caller
   * hands it back with resume().
   */
  async audit(onMount?: () => void): Promise<AuditResult> {
    clearTimeout(this.#resumeTimer);
    this.#cancelRun();
    const generation = ++this.#generation;
    this.#setState('user');
    this.#reset();
    onMount?.();
    const failures: AssertFailure[] = [];
    await this.#play(generation, failures);
    // A loop-persistent demo must prove its second lap starts clean: play again
    // without the remount, exactly as the attract loop will.
    if (this.#loopKeep() && generation === this.#generation) {
      this.#hover(null);
      this.#reset(false);
      const second: AssertFailure[] = [];
      await this.#play(generation, second);
      for (const failure of second) failures.push({ ...failure, lap: 2 });
    }
    return { failures, interrupted: generation !== this.#generation };
  }

  /** Explicit replay — the one path that plays even under reduced motion. */
  replay(): void {
    clearTimeout(this.#resumeTimer);
    this.#cancelRun();
    this.#reset();
    this.#setState('idle');
    if (claim(this, () => void this.#run())) void this.#run();
  }

  /** Halt any script, restore a clean mount, and let attract resume if allowed. */
  resume(): void {
    clearTimeout(this.#resumeTimer);
    this.#cancelRun();
    this.#reset();
    this.#setState(this.#visible ? 'idle' : 'paused');
    this.#tryAttract();
  }

  /**
   * Fast-forward the choreography — no cursor, waits collapsed to a settle beat —
   * until `revealed` reports the subject on stage (SPEC §6, identify). The beat is
   * required: CSS transitions haven't begun at the synchronous moment after a
   * dispatch, so visibility can't be observed in the same tick. Leaves the player
   * in user mode; callers restore attract with resume().
   *
   * Resolves false only when a later run superseded this summon — the caller no
   * longer owns the demo and must not touch it.
   */
  async summon(revealed: () => boolean): Promise<boolean> {
    clearTimeout(this.#resumeTimer);
    this.#cancelRun();
    const generation = ++this.#generation;
    this.#setState('user');
    if (revealed()) return true;
    this.#reset();
    if (revealed()) return true;
    for (const [index, step] of this.#steps.entries()) {
      if (generation !== this.#generation) return false;
      if ('moveTo' in step) {
        this.#summonStep(step);
        continue;
      }
      // Waits are dropped, except the ones the script itself says are load-bearing:
      // a beat followed by a `visible` assert is often the only reason the subject
      // exists at all (a tooltip, behind its hover delay). Those are polled, capped,
      // and left the instant the subject shows. Every other beat is time the viewer
      // would spend watching nothing arrive.
      if ('wait' in step) {
        if (!this.#expectsVisible(index)) continue;
        for (let left = Math.min(step.wait, SUMMON_WAIT_MS); left > 0; left -= SUMMON_TICK_MS) {
          if (!(await this.#sleep(Math.min(SUMMON_TICK_MS, left), generation))) return false;
          if (revealed()) return true;
        }
        continue;
      }
      if ('assert' in step) continue;
      this.#summonStep(step);
      if (!(await this.#sleep(SUMMON_GAP_MS, generation))) return false;
      if (revealed()) return true;
    }
    return true;
  }

  /** One step, fast-forwarded; summon's loop and a summoned withKey scope both feed it. */
  #summonStep(step: Step): void {
    if ('moveTo' in step) {
      this.#target = this.#host.root().querySelector(step.moveTo);
      // Persona rules hold in fast-forward too: a finger that is not pressing is not there.
      this.#hover(this.#personaFor(this.#target) === 'touch' ? null : this.#target);
    } else if ('click' in step || 'dblclick' in step) this.#dispatchButton(0, 'dblclick' in step);
    else if ('hold' in step) this.#summonHold(step.hold);
    else if ('pinch' in step) this.#summonPinch(step.pinch);
    else if ('rightClick' in step) this.#dispatchButton(2);
    else if ('middleClick' in step) this.#dispatchButton(1);
    else if ('drag' in step) this.#summonDrag(step.drag);
    else if ('withKey' in step) this.#summonWithKey(step.withKey.key, step.withKey.steps);
    else if ('press' in step) this.#dispatchKey(step.press);
    else if ('holdKey' in step) this.#summonHoldKey(step.holdKey.key, step.holdKey.ms);
    else if ('type' in step) this.#dispatchType(step.type);
    else if ('scroll' in step) (this.#target ?? this.#host.root()).scrollBy({ left: step.scroll.x ?? 0, top: step.scroll.y ?? 0 });
    else if ('wheel' in step) this.#summonWheel(step.wheel);
  }

  /** A withKey scope, fast-forwarded: the bracketing keydown and keyup around the children in one burst. */
  #summonWithKey(key: string, steps: Step[]): void {
    const flag = MOD_FLAGS[key];
    if (flag) this.#mods[flag] = true;
    this.#keyEl().dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true, ...this.#mods }));
    for (const step of steps) this.#summonStep(step);
    if (flag) this.#mods[flag] = false;
    this.#keyEl().dispatchEvent(new KeyboardEvent('keyup', { key, bubbles: true, cancelable: true, ...this.#mods }));
  }

  /** Does the script claim something should be on screen once the step at `from` is over? */
  #expectsVisible(from: number): boolean {
    for (const step of this.#steps.slice(from + 1)) {
      if (!('assert' in step)) return false;
      if (step.assert.state === 'visible') return true;
    }
    return false;
  }

  // Persona is deliberately not reset here: the cursor stays visible across loop
  // iterations, and snapping back to the arrow for the beat before the first
  // moveTo re-decides it would flash a mouse pointer at a touch surface.
  #reset(remount = true): void {
    this.#releaseHover();
    this.#releasePress();
    if (remount) this.#host.remount();
    this.#simFocus = null;
    this.#target = null;
    this.#hovered = null;
    this.#mods = { shiftKey: false, ctrlKey: false, altKey: false, metaKey: false };
  }

  /**
   * May the demo's tree persist across attract iterations? True when the script
   * cannot dirty anything (waits and asserts only), or when the demo declares that
   * its pass ends at its mount state (`data-loop="keep"`), a claim audit() verifies
   * by playing the script a second lap without the remount between. Persistence is
   * what lets a reader inspect a specimen in devtools without the node they picked
   * being rebuilt under them, and lets ambient animations run unbroken. Resuming
   * after user mode always remounts: a reader's input is unconstrained.
   */
  #loopKeep(): boolean {
    if (this.#host.root().querySelector('[data-loop=keep]')) return true;
    // A pure script can't dirty state, but a demo running on its own clock is
    // phase-locked to its mount, so it only persists by declaring it.
    return this.#steps.every((step) => 'wait' in step || 'assert' in step) && !this.#host.clockUsed();
  }

  #tryAttract(): void {
    if (this.#host.reducedMotion || !this.#visible || this.#steps.length === 0) return;
    if (claim(this, () => this.#tryAttract())) void this.#run();
  }

  #cancelRun(): void {
    this.#generation++;
    this.#cursor.removeAttribute('data-visible');
    this.#cursor.removeAttribute('data-grab');
    this.#cursor.removeAttribute('data-contact');
    this.#cursor.removeAttribute('data-gesture');
    this.#cursor.style.removeProperty('--vd-force');
    this.#cursor.style.removeProperty('--vd-pinch');
    this.#cursor.style.removeProperty('--vd-pinch-turn');
    // A run abandoned mid-drag must not hand over a button still painted pressed.
    // Hover is not released here: userIntent keeps it when the real pointer is
    // already inside the hovered element, and a reset remounts everything anyway.
    this.#releasePress();
  }

  /**
   * A step performs as touch when its target sits inside a `data-touch` scope
   * (SPEC §7): the ghost becomes a fingertip contact disc, dispatched pointer
   * events carry `pointerType: 'touch'`, and no hover exists — a finger that is
   * not pressing is not there at all. A `data-gaze` scope is the opposite
   * temperament: events stay exactly a mouse's (hover included — looking IS
   * hovering), and only the dress changes: the ghost is an eye resting where the
   * reader looks, and an activation is drawn as the hand's pinch.
   */
  #personaFor(el: Element | null): 'mouse' | 'touch' | 'gaze' {
    if (el?.closest('[data-touch]')) return 'touch';
    return el?.closest('[data-gaze]') ? 'gaze' : 'mouse';
  }

  #setPersona(persona: 'mouse' | 'touch' | 'gaze'): void {
    if (persona === 'mouse') this.#cursor.removeAttribute('data-persona');
    else this.#cursor.setAttribute('data-persona', persona);
  }

  #setState(state: PlayerState): void {
    this.#state = state;
    this.#host.onStateChange?.(state);
  }

  async #run(): Promise<void> {
    const generation = ++this.#generation;
    this.#setState('attract');
    // A loop-persistent demo keeps its tree across iterations; the ghost departs at
    // each pass boundary instead (the leave a real pointer would send), so symmetric
    // hover state settles before the next lap.
    const keep = this.#loopKeep();
    for (;;) {
      this.#reset(!keep);
      await this.#play(generation, undefined);
      if (generation !== this.#generation) return;
      if (keep) this.#hover(null);
      // Reduced motion never auto-loops: an explicit play runs a single pass.
      if (this.#host.reducedMotion) break;
      if (!(await this.#sleep(LOOP_PAUSE_MS, generation))) return;
    }
    this.#cursor.removeAttribute('data-visible');
    this.#setState(this.#visible ? 'idle' : 'paused');
    release(this);
  }

  /** `failures` is passed only by audit(): viewers never see an assert evaluated. */
  async #play(generation: number, failures: AssertFailure[] | undefined): Promise<void> {
    for (const [index, step] of this.#steps.entries()) {
      if (generation !== this.#generation) return;
      if (!(await this.#perform(step, index, generation, failures))) return;
    }
  }

  /**
   * One step of the script; #play and #withKey both feed it. Returns false when
   * this run was cancelled. `index` points a failing assert at a script line; a
   * step inside a withKey scope reports the scope's own line.
   */
  async #perform(step: Step, index: number, generation: number, failures: AssertFailure[] | undefined): Promise<boolean> {
    if ('moveTo' in step) return this.#moveTo(step.moveTo, generation);
    if ('click' in step || 'dblclick' in step) {
      const persona = this.#personaFor(this.#target);
      // A tap ripples the full ring, a gaze activation closes the hand's pinch,
      // and a mouse click arcs — three dressings for one dispatched activation.
      const fx = persona === 'touch' ? 'vd-fx-tap' : persona === 'gaze' ? 'vd-fx-pinch' : 'vd-fx-arc vd-fx-arc--left';
      this.#fx(fx);
      if (persona === 'touch') this.#contactFlash();
      if ('dblclick' in step) setTimeout(() => this.#fx(fx), 140);
      this.#dispatchButton(0, 'dblclick' in step, true);
      return this.#sleep(STEP_GAP_MS, generation);
    }
    if ('hold' in step) {
      if (!(await this.#hold(step.hold, generation))) return false;
      return this.#sleep(STEP_GAP_MS, generation);
    }
    if ('pinch' in step) {
      if (!(await this.#pinch(step.pinch, generation))) return false;
      return this.#sleep(STEP_GAP_MS, generation);
    }
    if ('rightClick' in step) {
      this.#fx('vd-fx-arc vd-fx-arc--right');
      this.#dispatchButton(2);
      return this.#sleep(STEP_GAP_MS, generation);
    }
    if ('middleClick' in step) {
      this.#fx('vd-fx-caret vd-fx-caret--up vd-fx-caret--pulse');
      this.#fx('vd-fx-caret vd-fx-caret--down vd-fx-caret--pulse');
      this.#dispatchButton(1);
      return this.#sleep(STEP_GAP_MS, generation);
    }
    if ('drag' in step) return this.#drag(step.drag, generation);
    if ('withKey' in step) return this.#withKey(step.withKey.key, step.withKey.steps, index, generation, failures);
    if ('press' in step) {
      this.#showKey(step.press);
      this.#dispatchKey(step.press);
      return this.#sleep(STEP_GAP_MS, generation);
    }
    if ('holdKey' in step) {
      if (!(await this.#holdKey(step.holdKey.key, step.holdKey.ms, generation))) return false;
      return this.#sleep(STEP_GAP_MS, generation);
    }
    if ('type' in step) {
      if (!(await this.#typewrite(step.type, generation))) return false;
      return this.#sleep(STEP_GAP_MS, generation);
    }
    if ('scroll' in step) {
      const y = step.scroll.y ?? 0;
      if (y !== 0) this.#fxWheel(y > 0 ? 'down' : 'up');
      if (!(await this.#scroll(step.scroll.x ?? 0, y, generation))) return false;
      return this.#sleep(STEP_GAP_MS, generation);
    }
    if ('wheel' in step) {
      if (!(await this.#wheel(step.wheel, generation))) return false;
      return this.#sleep(STEP_GAP_MS, generation);
    }
    if ('wait' in step) return this.#sleep(step.wait, generation);
    if ('assert' in step && failures) {
      // `assert` steps are invisible to viewers and load-bearing in CI (SPEC §8).
      const el = this.#host.root().querySelector<HTMLElement>(step.assert.selector);
      // `hidden` is satisfied by an absent element as well as an invisible one.
      const shown = el ? isSeen(el) : false;
      if (shown !== (step.assert.state === 'visible'))
        failures.push({ step: index, selector: step.assert.selector, expected: step.assert.state });
    }
    return true;
  }

  /**
   * Hold a key across the enclosed steps (SPEC §8): keydown as the scope opens,
   * keyup as it closes, the chip held for the duration. Shift, Control, Alt, and
   * Meta stamp their flag on every event dispatched inside, which is how a click
   * becomes a Ctrl+click and a drag a Shift+drag; other keys are held without a
   * flag. The flag clears and the keyup fires even when a child step cancels the
   * run, so a held key can never leak into takeover.
   */
  async #withKey(key: string, steps: Step[], index: number, generation: number, failures: AssertFailure[] | undefined): Promise<boolean> {
    const flag = MOD_FLAGS[key];
    const chip = this.#showKey(key, true);
    if (flag) this.#mods[flag] = true;
    // The browser sets a modifier's own flag on its keydown and clears it before
    // the keyup, so the scope's bracketing events carry the same shape.
    this.#keyEl().dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true, ...this.#mods }));
    let ok = true;
    for (const step of steps) {
      if (generation !== this.#generation || !(await this.#perform(step, index, generation, failures))) {
        ok = false;
        break;
      }
    }
    if (flag) this.#mods[flag] = false;
    this.#keyEl().dispatchEvent(new KeyboardEvent('keyup', { key, bubbles: true, cancelable: true, ...this.#mods }));
    chip.removeAttribute('data-live');
    chip.setAttribute('data-done', '');
    setTimeout(() => chip.remove(), FX_TTL_MS);
    return ok;
  }

  async #moveTo(selector: string, generation: number): Promise<boolean> {
    const el = this.#host.root().querySelector(selector);
    if (!el) return this.#sleep(STEP_GAP_MS, generation);
    this.#target = el;
    this.#setPersona(this.#personaFor(el));
    const travel = this.#host.reducedMotion ? 0 : CURSOR_TRAVEL_MS;
    const from = this.#cursorAt;
    const to = aimAt(el);
    this.#placeCursor(to, travel);
    this.#cursor.setAttribute('data-visible', '');
    // The coordinates BETWEEN two hovers are input too: a dock bulges as the pointer
    // crosses it, not at the tiles where it happens to pause. Travel streams
    // pointermoves (buttons: 0, so a sweep can never read as a drag) onto the deepest
    // element containing both endpoints, one per animation frame — the coalesced rate
    // a real mouse arrives at — interpolated by elapsed time so a slow frame takes a
    // bigger step, exactly like a laggy real pointer, and eased to track the drawn
    // ghost. Hover itself stays discrete at its endpoints, and a finger that is not
    // pressing still is not there.
    if (travel > 0 && from && this.#personaFor(el) !== 'touch') {
      const on = this.#sweepTarget(el);
      const start = performance.now();
      for (;;) {
        await new Promise(requestAnimationFrame);
        if (generation !== this.#generation) return false;
        const f = (performance.now() - start) / travel;
        if (f >= 1) break;
        const t = 1 - (1 - f) ** 2.5;
        this.#dispatchSweep(on, { x: from.x + (to.x - from.x) * t, y: from.y + (to.y - from.y) * t });
      }
    } else if (!(await this.#sleep(travel, generation))) return false;
    // Hover lands when the cursor arrives, not when it sets off — and never lands
    // at all under the touch persona: a finger that is not pressing is not there.
    this.#hover(this.#personaFor(el) === 'touch' ? null : el);
    return this.#sleep(80, generation);
  }

  /** Where a travel's interim moves land: the deepest element containing both endpoints. */
  #sweepTarget(dest: Element): Element {
    let el: Element | null = this.#hovered?.isConnected ? this.#hovered : dest;
    while (el && !el.contains(dest)) el = el.parentElement;
    return el ?? dest;
  }

  /** One interim travel move: hover vocabulary, so no button held and nothing cancelable. */
  #dispatchSweep(el: Element, at: { x: number; y: number }): void {
    if (!el.isConnected) return;
    el.dispatchEvent(
      new PointerEvent('pointermove', {
        bubbles: true,
        cancelable: false,
        button: -1,
        buttons: 0,
        clientX: at.x,
        clientY: at.y,
        pointerType: 'mouse',
        ...this.#mods,
      }),
    );
  }

  /**
   * Move the synthetic pointer onto an element. Hover is real input vocabulary
   * (tooltips, menus, hover cards), so the ghost cursor carries it. Enter/leave
   * are dispatched on the element itself and do not bubble, matching the browser:
   * demos listen on the element they want hover for.
   */
  #hover(el: Element | null): void {
    if (this.#hovered === el) return;
    const previous = this.#hovered;
    this.#hovered = el;
    if (previous?.isConnected) this.#dispatchHover(previous, ['pointerout', 'mouseout'], ['pointerleave', 'mouseleave']);
    // The demo hears the leave before the paint goes, so a remove here can never
    // clobber a state the leave handler has just decided to keep.
    this.#releaseHover();
    if (el) {
      this.#dispatchHover(el, ['pointerover', 'mouseover', 'pointermove'], ['pointerenter', 'mouseenter']);
      // Mirror the ghost pointer into the kit's attribute spelling: a synthesized
      // enter never lights :hover (SPEC §7), and the paint should not depend on it.
      // Claimed only when the demo's own enter handler did not set it, so a demo
      // that manages the attribute itself (the hover specimen) is never fought.
      if (el instanceof HTMLElement && !el.hasAttribute('data-hovered')) {
        el.setAttribute('data-hovered', '');
        this.#hoverOwned = el;
      }
    }
  }

  #releaseHover(): void {
    this.#hoverOwned?.removeAttribute('data-hovered');
    this.#hoverOwned = null;
  }

  /**
   * The pressed paint for a synthesized press. The events themselves are
   * instantaneous, so the paint carries the press's duration instead: a beat for
   * a click, the whole hold for a drag (no `holdMs`). Claimed and released under
   * the same rule as hover: never touch an attribute the demo set itself.
   */
  #press(el: Element, holdMs?: number): void {
    this.#releasePress();
    if (!(el instanceof HTMLElement) || el.hasAttribute('data-pressed')) return;
    el.setAttribute('data-pressed', '');
    this.#pressOwned = el;
    if (holdMs !== undefined) this.#pressTimer = setTimeout(() => this.#releasePress(), holdMs);
  }

  #releasePress(): void {
    clearTimeout(this.#pressTimer);
    this.#pressOwned?.removeAttribute('data-pressed');
    this.#pressOwned = null;
  }

  #dispatchHover(el: Element, bubbling: string[], direct: string[], pointerType = 'mouse'): void {
    const at = aimAt(el);
    const base = { cancelable: false, clientX: at.x, clientY: at.y, pointerType, ...this.#mods };
    for (const type of bubbling) el.dispatchEvent(new PointerEvent(type, { ...base, bubbles: true }));
    for (const type of direct) el.dispatchEvent(new PointerEvent(type, { ...base, bubbles: false }));
  }

  /**
   * Held drag: pointer down at the current target, travel, release at `to` (SPEC §8),
   * through the `via` waypoints when the stroke has a shape — one continuous press
   * either way, since a gesture, a lasso, or a signature is one stroke, not several.
   * The cursor closes into a grab hand for as long as the button is held, tracing
   * the same polyline the dispatched moves take, and the release ripples the same
   * arc a click does. Cancellation mid-drag goes through #cancelRun, which is what
   * lets go of the hand on every abandoned run.
   */
  async #drag(drag: { to: string; via?: string[] }, generation: number): Promise<boolean> {
    const source = this.#target;
    const root = this.#host.root();
    const dest = root.querySelector(drag.to);
    if (!source || !dest) return this.#sleep(STEP_GAP_MS, generation);
    const via = (drag.via ?? []).map((sel) => root.querySelector(sel)).filter((el): el is Element => el !== null);
    const stops = [...via, dest].map((el) => aimAt(el));
    const touch = this.#personaFor(source) === 'touch';
    const kind = touch ? { pointerType: 'touch', pressure: 0.5 } : undefined;
    // A finger swipes as a pressed contact; a mouse drag closes into the grab hand.
    this.#cursor.setAttribute(touch ? 'data-contact' : 'data-grab', '');
    let from = aimAt(source);
    this.#dispatchPointer(source, 'pointerdown', from, kind);
    // Held for the whole drag: the source shows its pressed paint as long as the
    // hand is closed on it. Released with the pointer, or by #cancelRun.
    this.#press(source);
    const travel = this.#host.reducedMotion ? 0 : CURSOR_TRAVEL_MS + DRAG_VIA_MS * via.length;
    const leg = travel / stops.length;
    for (const to of stops) {
      this.#placeCursor(to, leg);
      // One move per animation frame while the hand travels the leg, linear in time
      // (the stroke's velocity profile is input too: a fling reads its release speed
      // from these deltas, so no easing here), landing exactly on the stop so the
      // polyline's vertices survive any frame rate. Reduced motion keeps the old
      // three-beat leg: the vertices still arrive, with room between them for the
      // demo's clock to breathe.
      if (leg > 0) {
        const start = performance.now();
        for (;;) {
          await new Promise(requestAnimationFrame);
          if (generation !== this.#generation) return false;
          const f = (performance.now() - start) / leg;
          if (f >= 1) break;
          this.#dispatchPointer(source, 'pointermove', { x: from.x + (to.x - from.x) * f, y: from.y + (to.y - from.y) * f }, kind);
        }
        this.#dispatchPointer(source, 'pointermove', to, kind);
      } else {
        for (let i = 1; i <= DRAG_MOVES; i++) {
          if (!(await this.#sleep(10, generation))) return false;
          const t = i / DRAG_MOVES;
          this.#dispatchPointer(source, 'pointermove', { x: from.x + (to.x - from.x) * t, y: from.y + (to.y - from.y) * t }, kind);
        }
      }
      from = to;
    }
    if (!(await this.#sleep(120, generation))) return false;
    this.#dispatchPointer(source, 'pointerup', from, touch ? { pointerType: 'touch', pressure: 0 } : undefined);
    this.#releasePress();
    this.#cursor.removeAttribute(touch ? 'data-contact' : 'data-grab');
    this.#fx(touch ? 'vd-fx-tap' : 'vd-fx-arc vd-fx-arc--left');
    this.#target = dest;
    return this.#sleep(STEP_GAP_MS, generation);
  }

  /**
   * Press and hold the current target (SPEC §8). Under the touch persona the
   * contact's reported pressure climbs at a finger's rate (holdForce), dispatched
   * as pointermove events at the same spot — the signal a force-driven demo
   * reads — while the disc's inner fill swells with it. Under the mouse persona
   * the button is simply held at the hardware default (0.5). Ends with pointerup
   * and never a click: a long press is not a tap, and a demo that wants the tap
   * scripts one. Reduced motion keeps the hold's full duration, unlike `type`:
   * reduced motion flattens animation, never time, and a duration-guarded demo
   * (hold-to-confirm) is demonstrated by the time the press takes.
   */
  async #hold(ms: number, generation: number): Promise<boolean> {
    const el = this.#target;
    if (!el) return this.#sleep(STEP_GAP_MS, generation);
    const at = aimAt(el);
    const touch = this.#personaFor(el) === 'touch';
    const type = touch ? 'touch' : 'mouse';
    let heldArc: HTMLElement | null = null;
    if (touch) this.#cursor.setAttribute('data-contact', '');
    else heldArc = this.#fx('vd-fx-arc vd-fx-arc--left vd-fx-arc--held', true);
    const retire = () => {
      this.#cursor.removeAttribute('data-contact');
      this.#cursor.style.removeProperty('--vd-force');
      if (heldArc) {
        heldArc.classList.add('vd-fx-arc--release');
        setTimeout(() => heldArc?.remove(), FX_TTL_MS);
      }
    };
    this.#dispatchPointer(el, 'pointerdown', at, { pointerType: type, pressure: touch ? TOUCH_BASE_FORCE : 0.5 });
    this.#press(el);
    const ticks = HOLD_RAMP_TICKS;
    for (let i = 1; i <= ticks; i++) {
      if (!(await this.#sleep(ms / ticks, generation))) {
        retire();
        return false;
      }
      const force = touch ? holdForce((ms * i) / ticks) : 0.5;
      if (touch) this.#cursor.style.setProperty('--vd-force', force.toFixed(3));
      this.#dispatchPointer(el, 'pointermove', at, { pointerType: type, pressure: force });
    }
    this.#dispatchPointer(el, 'pointerup', at, { pointerType: type, pressure: 0 });
    this.#releasePress();
    retire();
    if (touch) this.#fx('vd-fx-tap');
    return true;
  }

  /**
   * Spread, close, or turn two touch contacts about the current target (SPEC §8).
   * Both contacts dispatch as `pointerType: 'touch'` with their own pointerId —
   * the two-pointerdown shape a real pinch has on the web, which is what lets
   * `pinchSpread` read the script and a real pinch through one wiring. The
   * cursor's twin discs carry the gesture (--vd-pinch is the live half
   * separation, --vd-pinch-turn the pair's angle). Duration here is animation,
   * not semantics: the amounts are stated, so reduced motion collapses the
   * move — unlike `hold`, whose length IS the depth.
   */
  async #pinch(pinch: { scale?: number; turn?: number; ms?: number }, generation: number): Promise<boolean> {
    const el = this.#target;
    if (!el) return this.#sleep(STEP_GAP_MS, generation);
    const at = aimAt(el);
    const scale = pinch.scale ?? 1;
    const turn = pinch.turn ?? 0;
    const from = (scale >= 1 ? PINCH_SPAN / scale : PINCH_SPAN) / 2;
    const to = from * scale;
    // A pinch is touch by nature, whatever scope its target sits in.
    this.#setPersona('touch');
    this.#cursor.setAttribute('data-gesture', 'pinch');
    const paint = (half: number, deg: number) => {
      this.#cursor.style.setProperty('--vd-pinch', `${half}px`);
      this.#cursor.style.setProperty('--vd-pinch-turn', `${PINCH_BASE_DEG + deg}deg`);
    };
    const retire = () => {
      this.#cursor.removeAttribute('data-gesture');
      this.#cursor.style.removeProperty('--vd-pinch');
      this.#cursor.style.removeProperty('--vd-pinch-turn');
    };
    paint(from, 0);
    this.#dispatchPinch(el, 'pointerdown', at, from, 0);
    const dur = this.#host.reducedMotion ? 0 : (pinch.ms ?? PINCH_MS);
    // One move per animation frame while the fingers travel, linear in time and landing
    // exactly on the stated spread and angle (the amounts are the semantics). Reduced
    // motion keeps the old eight-beat gesture: the same moves, with room between them
    // for the demo's clock to breathe.
    if (dur > 0) {
      const start = performance.now();
      for (;;) {
        await new Promise(requestAnimationFrame);
        if (generation !== this.#generation) {
          retire();
          return false;
        }
        const f = (performance.now() - start) / dur;
        if (f >= 1) break;
        const half = from + (to - from) * f;
        const deg = turn * f;
        paint(half, deg);
        this.#dispatchPinch(el, 'pointermove', at, half, deg);
      }
      paint(to, turn);
      this.#dispatchPinch(el, 'pointermove', at, to, turn);
    } else {
      for (let i = 1; i <= PINCH_TICKS; i++) {
        if (!(await this.#sleep(10, generation))) {
          retire();
          return false;
        }
        const half = from + ((to - from) * i) / PINCH_TICKS;
        const deg = (turn * i) / PINCH_TICKS;
        paint(half, deg);
        this.#dispatchPinch(el, 'pointermove', at, half, deg);
      }
    }
    this.#dispatchPinch(el, 'pointerup', at, to, turn);
    retire();
    return true;
  }

  /** One tick of the pinch: both contacts symmetric about `at`, `deg` clockwise off the base diagonal. */
  #dispatchPinch(
    el: Element,
    type: 'pointerdown' | 'pointermove' | 'pointerup',
    at: { x: number; y: number },
    half: number,
    deg: number,
  ): void {
    const pressure = type === 'pointerup' ? 0 : 0.5;
    const angle = ((PINCH_BASE_DEG + deg) * Math.PI) / 180;
    const contact = (sign: 1 | -1) => ({ x: at.x + sign * half * Math.cos(angle), y: at.y + sign * half * Math.sin(angle) });
    this.#dispatchPointer(el, type, contact(1), { pointerType: 'touch', pressure, pointerId: PINCH_ID_A, isPrimary: true });
    this.#dispatchPointer(el, type, contact(-1), { pointerType: 'touch', pressure, pointerId: PINCH_ID_B });
  }

  /** A pinch, fast-forwarded: both contacts down, one move to the final spread and angle, up. */
  #summonPinch(pinch: { scale?: number; turn?: number; ms?: number }): void {
    const el = this.#target;
    if (!el) return;
    const at = aimAt(el);
    const scale = pinch.scale ?? 1;
    const turn = pinch.turn ?? 0;
    const from = (scale >= 1 ? PINCH_SPAN / scale : PINCH_SPAN) / 2;
    this.#dispatchPinch(el, 'pointerdown', at, from, 0);
    this.#dispatchPinch(el, 'pointermove', at, from * scale, turn);
    this.#dispatchPinch(el, 'pointerup', at, from * scale, turn);
  }

  /** A hold, fast-forwarded: down, one move at the depth the hold would reach, up. */
  #summonHold(ms: number): void {
    const el = this.#target;
    if (!el) return;
    const at = aimAt(el);
    const touch = this.#personaFor(el) === 'touch';
    const type = touch ? 'touch' : 'mouse';
    this.#dispatchPointer(el, 'pointerdown', at, { pointerType: type, pressure: touch ? TOUCH_BASE_FORCE : 0.5 });
    this.#dispatchPointer(el, 'pointermove', at, { pointerType: type, pressure: touch ? holdForce(ms) : 0.5 });
    this.#dispatchPointer(el, 'pointerup', at, { pointerType: type, pressure: 0 });
  }

  /** The disc presses into contact for a beat — the touch persona's press paint. */
  #contactFlash(): void {
    this.#cursor.setAttribute('data-contact', '');
    setTimeout(() => this.#cursor.removeAttribute('data-contact'), PRESS_FLASH_MS);
  }

  /**
   * Real wheel input: the total delta split across a burst of WheelEvents at the
   * current target — the shape a notch or a trackpad flick arrives in, so a demo
   * compounding per event hears the same total either way. The input counterpart
   * of #scroll, which moves a scroller's position directly and fires no events.
   * The event count is kept under reduced motion (a demo may count events); only
   * the pacing between them collapses. Modifier flags ride along like on every
   * other event, which is how a withKey Control scope makes this a trackpad pinch.
   */
  async #wheel(wheel: { x?: number; y?: number; ms?: number }, generation: number): Promise<boolean> {
    const el = this.#target;
    if (!el) return this.#sleep(STEP_GAP_MS, generation);
    const y = wheel.y ?? 0;
    if (y !== 0) this.#fxWheel(y > 0 ? 'down' : 'up');
    const at = aimAt(el);
    const dur = this.#host.reducedMotion ? 0 : (wheel.ms ?? WHEEL_MS);
    for (let i = 1; i <= WHEEL_TICKS; i++) {
      this.#dispatchWheel(el, at, (wheel.x ?? 0) / WHEEL_TICKS, y / WHEEL_TICKS);
      if (!(await this.#sleep(dur / WHEEL_TICKS, generation))) return false;
    }
    return true;
  }

  /** A wheel, fast-forwarded: the same burst of events with no pacing between them. */
  #summonWheel(wheel: { x?: number; y?: number; ms?: number }): void {
    const el = this.#target;
    if (!el) return;
    const at = aimAt(el);
    for (let i = 1; i <= WHEEL_TICKS; i++) this.#dispatchWheel(el, at, (wheel.x ?? 0) / WHEEL_TICKS, (wheel.y ?? 0) / WHEEL_TICKS);
  }

  #dispatchWheel(el: Element, at: { x: number; y: number }, deltaX: number, deltaY: number): void {
    el.dispatchEvent(
      new WheelEvent('wheel', {
        bubbles: true,
        cancelable: true,
        clientX: at.x,
        clientY: at.y,
        deltaX,
        deltaY,
        deltaMode: 0,
        ...this.#mods,
      }),
    );
  }

  /**
   * Scroll the current target by hand, a slice at a time. `scroll-behavior:
   * smooth` is not dependable (it is a no-op in some embedded and headless
   * browsers, and off entirely under reduced motion), and a scroll that silently
   * does nothing would make a choreography lie about what the demo did.
   */
  async #scroll(dx: number, dy: number, generation: number): Promise<boolean> {
    const el = this.#target ?? this.#host.root();
    const fromX = el.scrollLeft;
    const fromY = el.scrollTop;
    const slices = this.#host.reducedMotion ? 1 : SCROLL_SLICES;
    for (let i = 1; i <= slices; i++) {
      if (!(await this.#sleep(SCROLL_MS / slices, generation))) return false;
      const t = i / slices;
      el.scrollLeft = fromX + dx * t;
      el.scrollTop = fromY + dy * t;
    }
    return true;
  }

  #summonDrag(drag: { to: string; via?: string[] }): void {
    const source = this.#target;
    const root = this.#host.root();
    const dest = root.querySelector(drag.to);
    if (!source || !dest) return;
    const touch = this.#personaFor(source) === 'touch';
    const kind = touch ? { pointerType: 'touch', pressure: 0.5 } : undefined;
    this.#dispatchPointer(source, 'pointerdown', aimAt(source), kind);
    for (const sel of drag.via ?? []) {
      const el = root.querySelector(sel);
      if (el) this.#dispatchPointer(source, 'pointermove', aimAt(el), kind);
    }
    const to = aimAt(dest);
    this.#dispatchPointer(source, 'pointermove', to, kind);
    this.#dispatchPointer(source, 'pointerup', to, touch ? { pointerType: 'touch', pressure: 0 } : undefined);
    this.#target = dest;
  }

  /**
   * `at` is in the specimen's coordinates, which is what every dispatched event
   * carries; the cursor is chrome, drawn on the overlay outside the specimen, so
   * this is the one place the two spaces have to be reconciled.
   */
  #placeCursor(at: { x: number; y: number }, travelMs: number): void {
    this.#cursorAt = at;
    const overlayRect = this.#host.overlay.getBoundingClientRect();
    const from = this.#host.offset();
    this.#cursor.style.transitionDuration = `${travelMs}ms`;
    this.#cursor.style.transform = `translate(${at.x + from.x - overlayRect.left}px, ${at.y + from.y - overlayRect.top}px)`;
  }

  /** Spawn a cursor effect (arc/caret). Non-persistent effects clean themselves up. */
  #fx(className: string, persistent = false): HTMLElement {
    const el = document.createElement('span');
    el.className = className;
    this.#cursor.appendChild(el);
    if (!persistent) setTimeout(() => el.remove(), FX_TTL_MS);
    return el;
  }

  #fxWheel(direction: 'up' | 'down'): void {
    this.#fx(`vd-fx-caret vd-fx-caret--${direction}`);
    setTimeout(() => this.#fx(`vd-fx-caret vd-fx-caret--${direction}`), 140);
  }

  /** `flash` shows the press as pressed paint — attract's paths pass it; summon stays bare. */
  #dispatchButton(button: 0 | 1 | 2, double = false, flash = false): void {
    const el = this.#target;
    if (!el) return;
    // Coordinates matter: a context menu opens at the pointer, and without them every
    // scripted right-click would report (0, 0) and put the menu in the corner. The
    // ghost is over the target's centre, so that is where the click happened.
    const at = aimAt(el);
    // Right and middle stay mouse gestures even inside a touch scope: a finger has
    // no buttons, and a choreography on a touch surface has no business with them.
    const touch = button === 0 && this.#personaFor(el) === 'touch';
    const opts = { bubbles: true, cancelable: true, button, clientX: at.x, clientY: at.y, ...this.#mods };
    const down = touch ? { ...opts, pointerType: 'touch', pressure: 0.5 } : opts;
    const up = touch ? { ...opts, pointerType: 'touch', pressure: 0 } : opts;
    // A real tap wraps its press in the compatibility hover pair; the mirror is
    // never engaged for it (see #moveTo), so nothing rests hovered afterwards.
    if (touch) this.#dispatchHover(el, ['pointerover', 'mouseover'], ['pointerenter', 'mouseenter'], 'touch');
    el.dispatchEvent(new PointerEvent('pointerdown', down));
    el.dispatchEvent(new PointerEvent('pointerup', up));
    if (button === 0) {
      el.dispatchEvent(new MouseEvent('click', opts));
      if (double) el.dispatchEvent(new MouseEvent('dblclick', opts));
    } else if (button === 1) {
      el.dispatchEvent(new MouseEvent('auxclick', opts));
    } else {
      el.dispatchEvent(new MouseEvent('contextmenu', opts));
    }
    if (touch) this.#dispatchHover(el, ['pointerout', 'mouseout'], ['pointerleave', 'mouseleave'], 'touch');
    // After the whole sequence, so a demo handler anywhere in it (down, up, or
    // click — claymorphism presses on click) wins the attribute first and the
    // flash's removal can never strip a state the demo is holding on its clock.
    if (flash && button === 0) this.#press(el, PRESS_FLASH_MS);
  }

  #dispatchPointer(
    el: Element,
    type: 'pointerdown' | 'pointermove' | 'pointerup',
    at: { x: number; y: number },
    kind?: { pointerType: string; pressure: number; pointerId?: number; isPrimary?: boolean },
  ): void {
    el.dispatchEvent(
      new PointerEvent(type, {
        bubbles: true,
        cancelable: true,
        button: type === 'pointermove' ? -1 : 0,
        buttons: type === 'pointerup' ? 0 : 1,
        clientX: at.x,
        clientY: at.y,
        ...this.#mods,
        ...(kind ?? {}),
      }),
    );
  }

  /** Where a key lands: the simulated focus if any, else the pointer's target. */
  #keyEl(): Element {
    return this.#simFocus ?? this.#target ?? this.#host.root();
  }

  #dispatchKey(key: string): void {
    if (key === 'Tab') this.#advanceSimFocus();
    const el = this.#keyEl();
    const opts = { key, bubbles: true, cancelable: true, ...this.#mods };
    el.dispatchEvent(new KeyboardEvent('keydown', opts));
    el.dispatchEvent(new KeyboardEvent('keyup', opts));
  }

  /**
   * Hold a key with the OS's own repeat shape (SPEC §8): one keydown, the
   * typematic delay, then `repeat: true` keydowns at a steady rate until the
   * keyup — the flag an expensive handler checks before acting is real here.
   * The chip counts the repeats. Duration is semantic, like `hold`'s: reduced
   * motion keeps it, and the hold's length chooses how many repeats fire.
   */
  async #holdKey(key: string, ms: number, generation: number): Promise<boolean> {
    const el = this.#keyEl();
    const opts = { key, bubbles: true, cancelable: true, ...this.#mods };
    const chip = this.#showKey(key, true);
    const retire = (ok: boolean) => {
      chip.removeAttribute('data-live');
      chip.setAttribute('data-done', '');
      setTimeout(() => chip.remove(), FX_TTL_MS);
      return ok;
    };
    el.dispatchEvent(new KeyboardEvent('keydown', opts));
    let elapsed = Math.min(ms, KEY_REPEAT_DELAY_MS);
    if (!(await this.#sleep(elapsed, generation))) return retire(false);
    let repeats = 0;
    while (elapsed + KEY_REPEAT_INTERVAL_MS <= ms) {
      if (!(await this.#sleep(KEY_REPEAT_INTERVAL_MS, generation))) return retire(false);
      elapsed += KEY_REPEAT_INTERVAL_MS;
      repeats += 1;
      chip.textContent = `${key} ×${repeats}`;
      el.dispatchEvent(new KeyboardEvent('keydown', { ...opts, repeat: true }));
    }
    el.dispatchEvent(new KeyboardEvent('keyup', opts));
    return retire(true);
  }

  /** A key hold, fast-forwarded: the repeats its duration buys, in one burst. */
  #summonHoldKey(key: string, ms: number): void {
    const el = this.#keyEl();
    const opts = { key, bubbles: true, cancelable: true, ...this.#mods };
    el.dispatchEvent(new KeyboardEvent('keydown', opts));
    const repeats = Math.max(0, Math.floor((ms - KEY_REPEAT_DELAY_MS) / KEY_REPEAT_INTERVAL_MS));
    for (let i = 0; i < repeats; i++) el.dispatchEvent(new KeyboardEvent('keydown', { ...opts, repeat: true }));
    el.dispatchEvent(new KeyboardEvent('keyup', opts));
  }

  #dispatchType(text: string): void {
    const el = this.#simFocus ?? this.#target;
    if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) {
      el.value += text;
      el.dispatchEvent(new Event('input', { bubbles: true }));
    }
  }

  /**
   * Characters land one at a time, at a typist's cadence, into a chip that grows
   * with them: a whole string in one `input` event is a paste, and a demo that
   * answers each keystroke (a typeahead filter, a debounce) would be demonstrated
   * against a gesture nobody makes. Summon keeps the paste (it fast-forwards), and
   * reduced motion lands the string at once, like every other flattened move.
   */
  async #typewrite(text: string, generation: number): Promise<boolean> {
    if (this.#host.reducedMotion) {
      this.#showKey(text);
      this.#dispatchType(text);
      return true;
    }
    const chip = this.#showKey('', true);
    for (const char of text) {
      chip.textContent += char;
      this.#dispatchType(char);
      if (!(await this.#sleep(TYPE_CHAR_MS, generation))) {
        chip.remove();
        return false;
      }
    }
    chip.removeAttribute('data-live');
    chip.setAttribute('data-done', '');
    setTimeout(() => chip.remove(), FX_TTL_MS);
    return true;
  }

  /** Simulated focus ring — real focus stays with the user (SPEC §7). */
  #advanceSimFocus(): void {
    const focusables = [...this.#host.root().querySelectorAll(FOCUSABLE)];
    if (focusables.length === 0) return;
    const index = this.#simFocus ? focusables.indexOf(this.#simFocus) : -1;
    this.#simFocus?.removeAttribute('data-sim-focus');
    this.#simFocus = focusables[(index + 1) % focusables.length] ?? null;
    this.#simFocus?.setAttribute('data-sim-focus', '');
  }

  /** A held chip stays until its caller retires it; the default fades on its own. */
  #showKey(label: string, hold = false): HTMLElement {
    const chip = document.createElement('kbd');
    chip.className = 'vd-key-chip';
    chip.textContent = label;
    if (hold) chip.setAttribute('data-live', '');
    this.#hud.appendChild(chip);
    if (!hold) setTimeout(() => chip.remove(), 1100);
    return chip;
  }

  /** Abortable sleep — resolves false if this run was cancelled meanwhile. */
  #sleep(ms: number, generation: number): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(generation === this.#generation), ms);
    });
  }
}
