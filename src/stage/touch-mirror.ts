import { FORCE_RAMP_MS } from '#src/kit/touch.ts';

const TICK_MS = 60;

/**
 * The reader's half of the touch persona (SPEC §7). Inside a `data-touch` scope
 * the kit hides the native cursor, so the stage draws the real pointer as the
 * same fingertip disc the ghost uses: following the pointer with no travel
 * easing (it IS the pointer, not a ghost), pressing into contact on pointerdown,
 * its fill swelling at the same rate `pressureHold` simulates force, or faster
 * when the hardware reports real pressure. Trusted events only: the player's
 * synthesized input must never draw a second reader. A real finger is never
 * mirrored; the reader's own hand is already on the surface.
 */
export class TouchMirror {
  #el: HTMLElement;
  #overlay: HTMLElement;
  #offset: () => { x: number; y: number };
  #contact = false;
  #pressedAt = 0;
  #timer: ReturnType<typeof setTimeout> | undefined;
  /** The pointer's last client point, kept so a held contact can be re-placed if the page shifts under it. */
  #at = { x: 0, y: 0 };

  constructor(events: EventTarget, edge: Element, overlay: HTMLElement, offset: () => { x: number; y: number }) {
    this.#overlay = overlay;
    this.#offset = offset;
    this.#el = document.createElement('div');
    this.#el.className = 'vd-user-touch';
    this.#el.innerHTML = '<span class="vd-user-touch-disc"><span class="vd-cursor-force"></span></span>';
    overlay.appendChild(this.#el);

    const mirrored = (event: Event): event is PointerEvent =>
      event.isTrusted && event instanceof PointerEvent && event.pointerType !== 'touch';
    const inScope = (event: PointerEvent): boolean => {
      const el = event.composedPath()[0];
      return el instanceof Element && !!el.closest('[data-touch]');
    };

    events.addEventListener('pointermove', (event) => {
      if (!mirrored(event)) return;
      // A held contact follows the pointer even when it slides off the scope,
      // like a finger does; an unpressed pointer outside the scope is an arrow again.
      if (!this.#contact && !inScope(event)) return this.#hide();
      this.#follow(event);
      if (this.#contact && event.pressure > 0.5) this.#force(event.pressure);
    });
    events.addEventListener('pointerdown', (event) => {
      if (!mirrored(event) || !inScope(event)) return;
      this.#follow(event);
      this.#contact = true;
      this.#pressedAt = performance.now();
      this.#el.setAttribute('data-contact', '');
      this.#tick();
    });
    for (const type of ['pointerup', 'pointercancel']) {
      events.addEventListener(type, (event) => {
        if (!mirrored(event)) return;
        this.#release();
        if (!inScope(event)) this.#hide();
      });
    }
    edge.addEventListener('pointerleave', () => {
      this.#release();
      this.#hide();
    });
  }

  #follow(event: PointerEvent): void {
    this.#at = { x: event.clientX, y: event.clientY };
    this.#place();
    this.#el.setAttribute('data-visible', '');
  }

  #place(): void {
    const overlayRect = this.#overlay.getBoundingClientRect();
    const from = this.#offset();
    this.#el.style.transform = `translate(${this.#at.x + from.x - overlayRect.left}px, ${this.#at.y + from.y - overlayRect.top}px)`;
  }

  /**
   * The duration ramp, matching the kit's simulation so the fill and the demo
   * agree. Each tick also re-places the disc: a page still settling (a late font)
   * can shift the overlay under a motionless pointer, and only an event would
   * otherwise correct it.
   */
  #tick(): void {
    if (!this.#contact) return;
    this.#place();
    this.#force(Math.min(1, (performance.now() - this.#pressedAt) / FORCE_RAMP_MS));
    this.#timer = setTimeout(() => this.#tick(), TICK_MS);
  }

  /** Force only rises within one contact, like the signal it mirrors. */
  #force(value: number): void {
    const current = Number.parseFloat(this.#el.style.getPropertyValue('--vd-force')) || 0;
    if (value > current) this.#el.style.setProperty('--vd-force', value.toFixed(3));
  }

  #release(): void {
    clearTimeout(this.#timer);
    this.#contact = false;
    this.#el.removeAttribute('data-contact');
    this.#el.style.removeProperty('--vd-force');
  }

  #hide(): void {
    this.#el.removeAttribute('data-visible');
  }
}
