import { FORCE_RAMP_MS, mirrorPinch, readerContacts } from '#src/kit/touch.ts';

const TICK_MS = 60;

/**
 * The reader's half of the touch persona (SPEC §7). Inside a `data-touch` scope
 * the kit hides the native cursor, so the stage draws the real pointer as the
 * same fingertip disc the ghost uses: following the pointer with no travel
 * easing (it IS the pointer, not a ghost), pressing into contact on pointerdown,
 * its fill swelling at the same rate `pressureHold` simulates force, or faster
 * when the hardware reports real pressure. A press with any MODIFIER held is the
 * pinch mapping instead: a second disc mirrors the pointer across `mirrorPinch`'s
 * centre — the same geometry `pinchSpread` hands the demo, so the picture and
 * the computed scale can never disagree — and the force fill stays out of it,
 * since a pinch is a spread, not a press. Ctrl and Shift together stand for three
 * contacts instead of two: a third disc rides the mirror centre, the same place the
 * ghost puts its odd contact, so the reader's hand and the script draw the same
 * gesture. Which modifiers they are does not matter, only how many: one is a pair,
 * two is three contacts, and `readerContacts` is the single definition both the
 * drawing here and the kit's handlers read. Trusted events only: the player's
 * synthesized input must never draw a second reader. A real finger is never
 * mirrored; the reader's own hand is already on the surface.
 */
export class TouchMirror {
  #el: HTMLElement;
  #twin: HTMLElement;
  /** The odd third contact, riding the mirror centre while Ctrl and Shift are held. */
  #third: HTMLElement;
  #overlay: HTMLElement;
  #offset: () => { x: number; y: number; scale: number };
  #contact = false;
  #pressedAt = 0;
  #timer: ReturnType<typeof setTimeout> | undefined;
  /** The pointer's last client point, kept so a held contact can be re-placed if the page shifts under it. */
  #at = { x: 0, y: 0 };
  /** Where a Ctrl+drag pinch began; null while the contact is a plain press. */
  #pinchFrom: { x: number; y: number } | null = null;
  /** Whether Shift joined Ctrl at pointerdown, making the gesture three contacts rather than two. */
  #trio = false;

  constructor(events: EventTarget, edge: Element, overlay: HTMLElement, offset: () => { x: number; y: number; scale: number }) {
    this.#overlay = overlay;
    this.#offset = offset;
    const disc = () => {
      const el = document.createElement('div');
      el.className = 'vd-user-touch';
      el.innerHTML = '<span class="vd-user-touch-disc"><span class="vd-cursor-force"></span></span>';
      overlay.appendChild(el);
      return el;
    };
    this.#el = disc();
    this.#twin = disc();
    this.#third = disc();

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
      if (this.#contact && !this.#pinchFrom && event.pressure > 0.5) this.#force(event.pressure);
    });
    events.addEventListener('pointerdown', (event) => {
      if (!mirrored(event) || !inScope(event)) return;
      // Any modifier makes the pointer a pair, and each extra one adds a finger, so the
      // discs drawn always match the count the kit helpers read from the same event.
      const asked = readerContacts(event);
      this.#pinchFrom = asked >= 2 ? { x: event.clientX, y: event.clientY } : null;
      this.#trio = asked >= 3;
      this.#follow(event);
      this.#contact = true;
      this.#pressedAt = performance.now();
      this.#el.setAttribute('data-contact', '');
      if (this.#pinchFrom) {
        this.#twin.setAttribute('data-visible', '');
        this.#twin.setAttribute('data-contact', '');
      }
      if (this.#trio) {
        this.#third.setAttribute('data-visible', '');
        this.#third.setAttribute('data-contact', '');
      }
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
    const { x, y, scale } = this.#offset();
    const at = (p: { x: number; y: number }) =>
      `translate(${p.x * scale + x - overlayRect.left}px, ${p.y * scale + y - overlayRect.top}px)`;
    this.#el.style.transform = at(this.#at);
    if (!this.#pinchFrom) return;
    const pair = mirrorPinch(this.#pinchFrom, this.#at);
    this.#twin.style.transform = at(pair.other);
    if (this.#trio) this.#third.style.transform = at(pair.center);
  }

  /**
   * The duration ramp, matching the kit's simulation so the fill and the demo
   * agree — skipped for a pinch, which has no force to report. Each tick also
   * re-places the discs: a page still settling (a late font) can shift the
   * overlay under a motionless pointer, and only an event would otherwise
   * correct it.
   */
  #tick(): void {
    if (!this.#contact) return;
    this.#place();
    if (!this.#pinchFrom) this.#force(Math.min(1, (performance.now() - this.#pressedAt) / FORCE_RAMP_MS));
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
    this.#pinchFrom = null;
    this.#el.removeAttribute('data-contact');
    this.#el.style.removeProperty('--vd-force');
    this.#twin.removeAttribute('data-visible');
    this.#twin.removeAttribute('data-contact');
    this.#trio = false;
    this.#third.removeAttribute('data-visible');
    this.#third.removeAttribute('data-contact');
  }

  #hide(): void {
    this.#el.removeAttribute('data-visible');
  }
}
