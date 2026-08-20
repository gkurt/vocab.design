import { DemoClock } from '#src/stage/clock.ts';
import type { AuditResult } from '#src/stage/player.ts';
import { AttractPlayer } from '#src/stage/player.ts';
import { loadChoreography } from '#src/stage/registry.ts';
import type { Isolation } from '#src/stage/surface.ts';
import { createSurface } from '#src/stage/surface.ts';
import { TouchMirror } from '#src/stage/touch-mirror.ts';
import { isRevealed } from '#src/stage/visible.ts';

const HOVER_DWELL_MS = 150;

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
 */
function satisfiesPose(el: HTMLElement): boolean {
  const condition = el.dataset.pose;
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

  connectedCallback(): void {
    this.#ready ??= this.#setup();
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

    const isolation: Isolation = this.dataset.isolation === 'iframe' ? 'iframe' : 'inline';
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
    new MutationObserver(syncTheme).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    matchMedia('(prefers-color-scheme: dark)').addEventListener('change', syncTheme);

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
    const remount = () => {
      clock?.stop();
      this.#mountRoot?.remove();
      const root = surface.doc.createElement('div');
      root.className = 'sp-root';
      surface.host.appendChild(root);
      clock = new DemoClock();
      surface.mount(root, clock);
      this.#mountRoot = root;
      setPosed(false);
    };
    remount();

    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

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
      remount,
      clockUsed: () => clock?.used ?? false,
      reducedMotion,
      offset: surface.offset,
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

    // The reader's pointer inside a `data-touch` scope is drawn as a fingertip
    // disc (SPEC §7); the kit hides the native cursor there. Real events never
    // leave an iframe, so a framed specimen cannot be mirrored — acceptable while
    // no touch term is document-scoped, and a reason to revisit if one becomes so.
    new TouchMirror(surface.events, surface.edge, overlay, surface.offset);

    // --- Subject annotation (SPEC §6) ---
    const subject = () => this.#mountRoot?.querySelector<HTMLElement>('[data-subject]') ?? null;
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
    if (pointable) overlay.append(spotlight, pin);

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
      const from = surface.offset();
      const box = {
        left: rect.left + from.x - overlayRect.left - 6,
        top: rect.top + from.y - overlayRect.top - 6,
        width: rect.width + 12,
        height: rect.height + 12,
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
    // Takeover is intentional (SPEC §7): a click anywhere, keyboard focus, a dwell on
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
    surface.edge.addEventListener('pointerleave', () => {
      clearTimeout(dwell);
      if (!identifyActive) player.userGone();
    });
    listen<PointerEvent>('pointerdown', (event) => {
      if (event.isTrusted) takeover(event.composedPath()[0]);
    });
    listen<FocusEvent>('focusin', (event) => {
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

    if (reducedMotion) void enterPose();
  }
}

if (!customElements.get('vd-stage')) customElements.define('vd-stage', VdStage);
