import type { Step } from '#src/stage/choreography.ts';
import { claim, release } from '#src/stage/scheduler.ts';

export type PlayerState = 'idle' | 'attract' | 'user' | 'paused';

export interface PlayerHost {
  /** Current demo root — looked up per step because remount replaces it. */
  root: () => HTMLElement;
  /** Stage overlay (light DOM) where the ghost cursor and key HUD live. */
  overlay: HTMLElement;
  /** Destroy-and-remount the demo from its initial state. */
  remount: () => void;
  reducedMotion: boolean;
  onStateChange?: (state: PlayerState) => void;
}

const CURSOR_TRAVEL_MS = 550;
const STEP_GAP_MS = 350;
const LOOP_PAUSE_MS = 1400;
const RESUME_IDLE_MS = 1200;
const SUMMON_GAP_MS = 60;
const SUMMON_WAIT_MS = 900;
const SUMMON_TICK_MS = 80;
const SCROLL_MS = 420;
const SCROLL_SLICES = 7;
const FX_TTL_MS = 700;
const DRAG_MOVES = 3;

const FOCUSABLE = 'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])';

// Tall, narrow arrow with a vertical left edge and a tail, like a real pointer.
// The tip sits at (4.5, 1.5); stage.css offsets the svg so the tip is the hotspot.
const CURSOR_SVG =
  '<svg viewBox="0 0 20 24" width="20" height="24"><path d="M4.5 1.5v16.3l3.7-3.6 2.4 5.6 2.6-1.1-2.4-5.5h5.2z" fill="var(--vd-ink, #1c1a17)" stroke="var(--vd-paper, #fff)" stroke-width="1.2" stroke-linejoin="round"/></svg>';

function centerOf(el: Element): { x: number; y: number } {
  const rect = el.getBoundingClientRect();
  return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
}

/**
 * Attract-mode player (SPEC §7–8). Drives a demo through its choreography with
 * synthesized events and a visible ghost cursor, looping for as long as the
 * stage is on screen. Input kinds are disambiguated at the cursor (left/right
 * arcs, held-drag arc, caret pulses). Never moves real focus — keyboard steps
 * use simulated focus (`data-sim-focus`) plus the key HUD.
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

  constructor(steps: Step[], host: PlayerHost) {
    this.#steps = steps;
    this.#host = host;
    this.#cursor = document.createElement('div');
    this.#cursor.className = 'vd-ghost-cursor';
    this.#cursor.innerHTML = CURSOR_SVG;
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
    for (const step of this.#steps) {
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
      // Waits are polled rather than dropped: a choreography's own beat is what knows
      // how long the subject takes to arrive, and some subjects (a tooltip, behind its
      // hover delay) exist only because of that beat. Capped, and left the moment the
      // subject shows, so a summon still costs a beat rather than the whole script.
      else if ('wait' in step) {
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

  #reset(): void {
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
      await this.#play(generation);
      if (generation !== this.#generation) return;
      // Reduced motion never auto-loops: an explicit play runs a single pass.
      if (this.#host.reducedMotion) break;
      if (!(await this.#sleep(LOOP_PAUSE_MS, generation))) return;
    }
    this.#cursor.removeAttribute('data-visible');
    this.#setState(this.#visible ? 'idle' : 'paused');
    release(this);
  }

  async #play(generation: number): Promise<void> {
    for (const step of this.#steps) {
      if (generation !== this.#generation) return;
      if ('moveTo' in step) {
        if (!(await this.#moveTo(step.moveTo, generation))) return;
      } else if ('click' in step || 'dblclick' in step) {
        this.#fx('vd-fx-arc vd-fx-arc--left');
        if ('dblclick' in step) setTimeout(() => this.#fx('vd-fx-arc vd-fx-arc--left'), 140);
        this.#dispatchButton(0, 'dblclick' in step);
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
        this.#showKey(step.type);
        this.#dispatchType(step.type);
        if (!(await this.#sleep(STEP_GAP_MS, generation))) return;
      } else if ('scroll' in step) {
        const y = step.scroll.y ?? 0;
        if (y !== 0) this.#fxWheel(y > 0 ? 'down' : 'up');
        if (!(await this.#scroll(step.scroll.x ?? 0, y, generation))) return;
        if (!(await this.#sleep(STEP_GAP_MS, generation))) return;
      } else if ('wait' in step) {
        if (!(await this.#sleep(step.wait, generation))) return;
      }
      // `assert` steps are invisible to viewers and executed only by the CI runner.
    }
  }

  async #moveTo(selector: string, generation: number): Promise<boolean> {
    const el = this.#host.root().querySelector(selector);
    if (!el) return this.#sleep(STEP_GAP_MS, generation);
    this.#target = el;
    const travel = this.#host.reducedMotion ? 0 : CURSOR_TRAVEL_MS;
    this.#placeCursor(centerOf(el), travel);
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
    if (el) this.#dispatchHover(el, ['pointerover', 'mouseover', 'pointermove'], ['pointerenter', 'mouseenter']);
  }

  #dispatchHover(el: Element, bubbling: string[], direct: string[]): void {
    const at = centerOf(el);
    const base = { cancelable: false, clientX: at.x, clientY: at.y };
    for (const type of bubbling) el.dispatchEvent(new PointerEvent(type, { ...base, bubbles: true }));
    for (const type of direct) el.dispatchEvent(new PointerEvent(type, { ...base, bubbles: false }));
  }

  /** Held drag: pointer down at the current target, travel, release at `to` (SPEC §8). */
  async #drag(toSelector: string, generation: number): Promise<boolean> {
    const source = this.#target;
    const dest = this.#host.root().querySelector(toSelector);
    if (!source || !dest) return this.#sleep(STEP_GAP_MS, generation);
    const from = centerOf(source);
    const to = centerOf(dest);
    const held = this.#fx('vd-fx-arc vd-fx-arc--left vd-fx-arc--held', true);
    this.#dispatchPointer(source, 'pointerdown', from);
    const travel = this.#host.reducedMotion ? 0 : CURSOR_TRAVEL_MS;
    this.#placeCursor(to, travel);
    for (let i = 1; i <= DRAG_MOVES; i++) {
      if (!(await this.#sleep(Math.max(travel / (DRAG_MOVES + 1), 10), generation))) {
        held.remove();
        return false;
      }
      const t = i / DRAG_MOVES;
      this.#dispatchPointer(source, 'pointermove', { x: from.x + (to.x - from.x) * t, y: from.y + (to.y - from.y) * t });
    }
    if (!(await this.#sleep(120, generation))) {
      held.remove();
      return false;
    }
    this.#dispatchPointer(source, 'pointerup', to);
    held.classList.add('vd-fx-arc--release');
    setTimeout(() => held.remove(), FX_TTL_MS);
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
    const to = centerOf(dest);
    this.#dispatchPointer(source, 'pointerdown', centerOf(source));
    this.#dispatchPointer(source, 'pointermove', to);
    this.#dispatchPointer(source, 'pointerup', to);
    this.#target = dest;
  }

  #placeCursor(at: { x: number; y: number }, travelMs: number): void {
    const overlayRect = this.#host.overlay.getBoundingClientRect();
    this.#cursor.style.transitionDuration = `${travelMs}ms`;
    this.#cursor.style.transform = `translate(${at.x - overlayRect.left}px, ${at.y - overlayRect.top}px)`;
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

  #dispatchButton(button: 0 | 1 | 2, double = false): void {
    const el = this.#target;
    if (!el) return;
    const opts = { bubbles: true, cancelable: true, button };
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

  /** Simulated focus ring — real focus stays with the user (SPEC §7). */
  #advanceSimFocus(): void {
    const focusables = [...this.#host.root().querySelectorAll(FOCUSABLE)];
    if (focusables.length === 0) return;
    const index = this.#simFocus ? focusables.indexOf(this.#simFocus) : -1;
    this.#simFocus?.removeAttribute('data-sim-focus');
    this.#simFocus = focusables[(index + 1) % focusables.length] ?? null;
    this.#simFocus?.setAttribute('data-sim-focus', '');
  }

  #showKey(label: string): void {
    const chip = document.createElement('kbd');
    chip.className = 'vd-key-chip';
    chip.textContent = label;
    this.#hud.appendChild(chip);
    setTimeout(() => chip.remove(), 1100);
  }

  /** Abortable sleep — resolves false if this run was cancelled meanwhile. */
  #sleep(ms: number, generation: number): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(generation === this.#generation), ms);
    });
  }
}
