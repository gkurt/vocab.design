import type { Step } from '#src/stage/choreography.ts';
import { claim, release } from '#src/stage/scheduler.ts';

export type PlayerState = 'idle' | 'attract' | 'user' | 'resting' | 'paused';

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
const RESUME_IDLE_MS = 4000;
const LOOP_CAP = 2;

const FOCUSABLE = 'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])';

const CURSOR_SVG =
  '<svg viewBox="0 0 20 20" width="20" height="20"><path d="M3 1l14 8.5-6.2 1.3L14 17l-2.6 1.2-3.2-6.2L3 16.5z" fill="var(--vd-ink, #1c1a17)" stroke="var(--vd-paper, #fff)" stroke-width="1.2"/></svg>';

/**
 * Attract-mode player (SPEC §7–8). Drives a demo through its choreography with
 * synthesized events and a visible ghost cursor. Never moves real focus —
 * keyboard steps use simulated focus (`data-sim-focus`) plus the key HUD.
 */
export class AttractPlayer {
  #steps: Step[];
  #host: PlayerHost;
  #state: PlayerState = 'idle';
  #generation = 0;
  #loops = 0;
  #visible = false;
  #cursor: HTMLElement;
  #hud: HTMLElement;
  #target: Element | null = null;
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
    if (this.#state === 'idle' || this.#state === 'paused' || this.#state === 'resting') {
      this.#loops = 0;
      this.#tryAttract();
    }
  }

  viewportLeave(): void {
    this.#visible = false;
    if (this.#state === 'attract') {
      this.#cancelRun();
      this.#setState('paused');
    }
    release(this);
  }

  /** Real user input detected — halt the script and hand the demo over as-is. */
  userIntent(): void {
    clearTimeout(this.#resumeTimer);
    if (this.#state !== 'attract' && this.#state !== 'user') return;
    if (this.#state === 'attract') this.#cancelRun();
    this.#setState('user');
  }

  /** Pointer left after user mode — reset to clean state after an idle beat. */
  userGone(): void {
    if (this.#state !== 'user') return;
    clearTimeout(this.#resumeTimer);
    this.#resumeTimer = setTimeout(() => {
      if (this.#state !== 'user') return;
      this.#host.remount();
      this.#simFocus = null;
      this.#setState('resting');
    }, RESUME_IDLE_MS);
  }

  /** Explicit replay — the one path that plays even under reduced motion. */
  replay(): void {
    clearTimeout(this.#resumeTimer);
    this.#cancelRun();
    this.#host.remount();
    this.#simFocus = null;
    this.#loops = 0;
    if (claim(this, () => this.#run())) void this.#run();
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
    while (this.#loops < LOOP_CAP) {
      this.#host.remount();
      this.#simFocus = null;
      await this.#play(generation);
      if (generation !== this.#generation) return;
      this.#loops++;
      if (!(await this.#sleep(LOOP_PAUSE_MS, generation))) return;
    }
    this.#cursor.removeAttribute('data-visible');
    this.#setState('resting');
    release(this);
  }

  async #play(generation: number): Promise<void> {
    for (const step of this.#steps) {
      if (generation !== this.#generation) return;
      if ('moveTo' in step) {
        if (!(await this.#moveTo(step.moveTo, generation))) return;
      } else if ('click' in step || 'dblclick' in step) {
        this.#press();
        this.#dispatchClick('dblclick' in step);
        if (!(await this.#sleep(STEP_GAP_MS, generation))) return;
      } else if ('press' in step) {
        this.#showKey(step.press);
        this.#dispatchKey(step.press);
        if (!(await this.#sleep(STEP_GAP_MS, generation))) return;
      } else if ('type' in step) {
        this.#showKey(step.type);
        this.#dispatchType(step.type);
        if (!(await this.#sleep(STEP_GAP_MS, generation))) return;
      } else if ('scroll' in step) {
        (this.#target ?? this.#host.root()).scrollBy({ left: step.scroll.x ?? 0, top: step.scroll.y ?? 0, behavior: 'smooth' });
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
    const overlayRect = this.#host.overlay.getBoundingClientRect();
    const rect = el.getBoundingClientRect();
    const x = rect.left + rect.width / 2 - overlayRect.left;
    const y = rect.top + rect.height / 2 - overlayRect.top;
    const travel = this.#host.reducedMotion ? 0 : CURSOR_TRAVEL_MS;
    this.#cursor.style.transitionDuration = `${travel}ms`;
    this.#cursor.style.transform = `translate(${x}px, ${y}px)`;
    this.#cursor.setAttribute('data-visible', '');
    return this.#sleep(travel + 80, generation);
  }

  #press(): void {
    this.#cursor.removeAttribute('data-press');
    void this.#cursor.offsetWidth;
    this.#cursor.setAttribute('data-press', '');
  }

  #dispatchClick(double: boolean): void {
    const el = this.#target;
    if (!el) return;
    const opts = { bubbles: true, cancelable: true };
    el.dispatchEvent(new PointerEvent('pointerdown', opts));
    el.dispatchEvent(new PointerEvent('pointerup', opts));
    el.dispatchEvent(new MouseEvent('click', opts));
    if (double) el.dispatchEvent(new MouseEvent('dblclick', opts));
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
