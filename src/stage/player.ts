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
const FX_TTL_MS = 700;
const DRAG_MOVES = 3;
const PRESS_FLASH_MS = 200;

const FOCUSABLE = 'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])';

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
  #simFocus: Element | null = null;
  #resumeTimer: ReturnType<typeof setTimeout> | undefined;
  /** Attribute spellings the ghost set itself, so it never removes a demo's own. */
  #hoverOwned: Element | null = null;
  #pressOwned: Element | null = null;
  #pressTimer: ReturnType<typeof setTimeout> | undefined;

  constructor(steps: Step[], host: PlayerHost) {
    this.#steps = steps;
    this.#host = host;
    this.#cursor = document.createElement('div');
    this.#cursor.className = 'vd-ghost-cursor';
    this.#cursor.innerHTML = CURSOR_SVG + GRAB_SVG;
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
        this.#target = this.#host.root().querySelector(step.moveTo);
        this.#hover(this.#target);
        continue;
      }
      if ('click' in step || 'dblclick' in step) this.#dispatchButton(0, 'dblclick' in step);
      else if ('rightClick' in step) this.#dispatchButton(2);
      else if ('middleClick' in step) this.#dispatchButton(1);
      else if ('drag' in step) this.#summonDrag(step.drag.to);
      else if ('press' in step) this.#dispatchKey(step.press);
      else if ('type' in step) this.#dispatchType(step.type);
      else if ('scroll' in step) (this.#target ?? this.#host.root()).scrollBy({ left: step.scroll.x ?? 0, top: step.scroll.y ?? 0 });
      // Waits are dropped, except the ones the script itself says are load-bearing:
      // a beat followed by a `visible` assert is often the only reason the subject
      // exists at all (a tooltip, behind its hover delay). Those are polled, capped,
      // and left the instant the subject shows. Every other beat is time the viewer
      // would spend watching nothing arrive.
      else if ('wait' in step) {
        if (!this.#expectsVisible(index)) continue;
        for (let left = Math.min(step.wait, SUMMON_WAIT_MS); left > 0; left -= SUMMON_TICK_MS) {
          if (!(await this.#sleep(Math.min(SUMMON_TICK_MS, left), generation))) return false;
          if (revealed()) return true;
        }
        continue;
      } else continue;
      if (!(await this.#sleep(SUMMON_GAP_MS, generation))) return false;
      if (revealed()) return true;
    }
    return true;
  }

  /** Does the script claim something should be on screen once the step at `from` is over? */
  #expectsVisible(from: number): boolean {
    for (const step of this.#steps.slice(from + 1)) {
      if (!('assert' in step)) return false;
      if (step.assert.state === 'visible') return true;
    }
    return false;
  }

  #reset(): void {
    this.#releaseHover();
    this.#releasePress();
    this.#host.remount();
    this.#simFocus = null;
    this.#target = null;
    this.#hovered = null;
  }

  #tryAttract(): void {
    if (this.#host.reducedMotion || !this.#visible || this.#steps.length === 0) return;
    if (claim(this, () => this.#tryAttract())) void this.#run();
  }

  #cancelRun(): void {
    this.#generation++;
    this.#cursor.removeAttribute('data-visible');
    this.#cursor.removeAttribute('data-grab');
    // A run abandoned mid-drag must not hand over a button still painted pressed.
    // Hover is not released here: userIntent keeps it when the real pointer is
    // already inside the hovered element, and a reset remounts everything anyway.
    this.#releasePress();
  }

  #setState(state: PlayerState): void {
    this.#state = state;
    this.#host.onStateChange?.(state);
  }

  async #run(): Promise<void> {
    const generation = ++this.#generation;
    this.#setState('attract');
    for (;;) {
      this.#reset();
      await this.#play(generation, undefined);
      if (generation !== this.#generation) return;
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
      if ('moveTo' in step) {
        if (!(await this.#moveTo(step.moveTo, generation))) return;
      } else if ('click' in step || 'dblclick' in step) {
        this.#fx('vd-fx-arc vd-fx-arc--left');
        if ('dblclick' in step) setTimeout(() => this.#fx('vd-fx-arc vd-fx-arc--left'), 140);
        this.#dispatchButton(0, 'dblclick' in step, true);
        if (!(await this.#sleep(STEP_GAP_MS, generation))) return;
      } else if ('rightClick' in step) {
        this.#fx('vd-fx-arc vd-fx-arc--right');
        this.#dispatchButton(2);
        if (!(await this.#sleep(STEP_GAP_MS, generation))) return;
      } else if ('middleClick' in step) {
        this.#fx('vd-fx-caret vd-fx-caret--up vd-fx-caret--pulse');
        this.#fx('vd-fx-caret vd-fx-caret--down vd-fx-caret--pulse');
        this.#dispatchButton(1);
        if (!(await this.#sleep(STEP_GAP_MS, generation))) return;
      } else if ('drag' in step) {
        if (!(await this.#drag(step.drag.to, generation))) return;
      } else if ('press' in step) {
        this.#showKey(step.press);
        this.#dispatchKey(step.press);
        if (!(await this.#sleep(STEP_GAP_MS, generation))) return;
      } else if ('type' in step) {
        if (!(await this.#typewrite(step.type, generation))) return;
        if (!(await this.#sleep(STEP_GAP_MS, generation))) return;
      } else if ('scroll' in step) {
        const y = step.scroll.y ?? 0;
        if (y !== 0) this.#fxWheel(y > 0 ? 'down' : 'up');
        if (!(await this.#scroll(step.scroll.x ?? 0, y, generation))) return;
        if (!(await this.#sleep(STEP_GAP_MS, generation))) return;
      } else if ('wait' in step) {
        if (!(await this.#sleep(step.wait, generation))) return;
      } else if ('assert' in step && failures) {
        // `assert` steps are invisible to viewers and load-bearing in CI (SPEC §8).
        const el = this.#host.root().querySelector<HTMLElement>(step.assert.selector);
        // `hidden` is satisfied by an absent element as well as an invisible one.
        const shown = el ? isSeen(el) : false;
        if (shown !== (step.assert.state === 'visible'))
          failures.push({ step: index, selector: step.assert.selector, expected: step.assert.state });
      }
    }
  }

  async #moveTo(selector: string, generation: number): Promise<boolean> {
    const el = this.#host.root().querySelector(selector);
    if (!el) return this.#sleep(STEP_GAP_MS, generation);
    this.#target = el;
    const travel = this.#host.reducedMotion ? 0 : CURSOR_TRAVEL_MS;
    this.#placeCursor(aimAt(el), travel);
    this.#cursor.setAttribute('data-visible', '');
    if (!(await this.#sleep(travel, generation))) return false;
    // Hover lands when the cursor arrives, not when it sets off.
    this.#hover(el);
    return this.#sleep(80, generation);
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

  #dispatchHover(el: Element, bubbling: string[], direct: string[]): void {
    const at = aimAt(el);
    const base = { cancelable: false, clientX: at.x, clientY: at.y };
    for (const type of bubbling) el.dispatchEvent(new PointerEvent(type, { ...base, bubbles: true }));
    for (const type of direct) el.dispatchEvent(new PointerEvent(type, { ...base, bubbles: false }));
  }

  /**
   * Held drag: pointer down at the current target, travel, release at `to` (SPEC §8).
   * The cursor closes into a grab hand for as long as the button is held, and the
   * release ripples the same arc a click does. Cancellation mid-drag goes through
   * #cancelRun, which is what lets go of the hand on every abandoned run.
   */
  async #drag(toSelector: string, generation: number): Promise<boolean> {
    const source = this.#target;
    const dest = this.#host.root().querySelector(toSelector);
    if (!source || !dest) return this.#sleep(STEP_GAP_MS, generation);
    const from = aimAt(source);
    const to = aimAt(dest);
    this.#cursor.setAttribute('data-grab', '');
    this.#dispatchPointer(source, 'pointerdown', from);
    // Held for the whole drag: the source shows its pressed paint as long as the
    // hand is closed on it. Released with the pointer, or by #cancelRun.
    this.#press(source);
    const travel = this.#host.reducedMotion ? 0 : CURSOR_TRAVEL_MS;
    this.#placeCursor(to, travel);
    for (let i = 1; i <= DRAG_MOVES; i++) {
      if (!(await this.#sleep(Math.max(travel / (DRAG_MOVES + 1), 10), generation))) return false;
      const t = i / DRAG_MOVES;
      this.#dispatchPointer(source, 'pointermove', { x: from.x + (to.x - from.x) * t, y: from.y + (to.y - from.y) * t });
    }
    if (!(await this.#sleep(120, generation))) return false;
    this.#dispatchPointer(source, 'pointerup', to);
    this.#releasePress();
    this.#cursor.removeAttribute('data-grab');
    this.#fx('vd-fx-arc vd-fx-arc--left');
    this.#target = dest;
    return this.#sleep(STEP_GAP_MS, generation);
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

  #summonDrag(toSelector: string): void {
    const source = this.#target;
    const dest = this.#host.root().querySelector(toSelector);
    if (!source || !dest) return;
    const to = aimAt(dest);
    this.#dispatchPointer(source, 'pointerdown', aimAt(source));
    this.#dispatchPointer(source, 'pointermove', to);
    this.#dispatchPointer(source, 'pointerup', to);
    this.#target = dest;
  }

  /**
   * `at` is in the specimen's coordinates, which is what every dispatched event
   * carries; the cursor is chrome, drawn on the overlay outside the specimen, so
   * this is the one place the two spaces have to be reconciled.
   */
  #placeCursor(at: { x: number; y: number }, travelMs: number): void {
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
    const opts = { bubbles: true, cancelable: true, button, clientX: at.x, clientY: at.y };
    el.dispatchEvent(new PointerEvent('pointerdown', opts));
    el.dispatchEvent(new PointerEvent('pointerup', opts));
    if (button === 0) {
      el.dispatchEvent(new MouseEvent('click', opts));
      if (double) el.dispatchEvent(new MouseEvent('dblclick', opts));
    } else if (button === 1) {
      el.dispatchEvent(new MouseEvent('auxclick', opts));
    } else {
      el.dispatchEvent(new MouseEvent('contextmenu', opts));
    }
    // After the whole sequence, so a demo handler anywhere in it (down, up, or
    // click — claymorphism presses on click) wins the attribute first and the
    // flash's removal can never strip a state the demo is holding on its clock.
    if (flash && button === 0) this.#press(el, PRESS_FLASH_MS);
  }

  #dispatchPointer(el: Element, type: 'pointerdown' | 'pointermove' | 'pointerup', at: { x: number; y: number }): void {
    el.dispatchEvent(
      new PointerEvent(type, {
        bubbles: true,
        cancelable: true,
        button: type === 'pointermove' ? -1 : 0,
        buttons: type === 'pointerup' ? 0 : 1,
        clientX: at.x,
        clientY: at.y,
      }),
    );
  }

  #dispatchKey(key: string): void {
    if (key === 'Tab') this.#advanceSimFocus();
    const el = this.#simFocus ?? this.#target ?? this.#host.root();
    const opts = { key, bubbles: true, cancelable: true };
    el.dispatchEvent(new KeyboardEvent('keydown', opts));
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
