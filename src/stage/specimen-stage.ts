import { kitCss } from '#src/kit/kit.ts';
import { AttractPlayer } from '#src/stage/player.ts';
import { loadChoreography, loadDemo } from '#src/stage/registry.ts';

const HOVER_DWELL_MS = 150;

/**
 * Visibility without an opacity test — true the instant a CSS transition begins
 * revealing the element. A box clipped down to a pixel (visually hidden text) does not
 * count: there is nothing there for identify to ring.
 */
function isRevealed(el: HTMLElement): boolean {
  const style = getComputedStyle(el);
  if (style.visibility === 'hidden' || style.display === 'none') return false;
  const rect = el.getBoundingClientRect();
  return rect.width > 1 && rect.height > 1;
}

/**
 * Would this gesture scroll the specimen itself, or is the page merely moving
 * under the pointer? Only the first is user intent (SPEC §7). `dx`/`dy` are
 * omitted for touch, where the axis is not known from a single move.
 */
function scrollsSpecimen(path: readonly (EventTarget | undefined)[], stop: Element, dx?: number, dy?: number): boolean {
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

  async connectedCallback(): Promise<void> {
    if (this.#player) return;
    const slug = this.dataset.slug;
    const canvas = this.querySelector<HTMLElement>('[data-stage-canvas]');
    const overlay = this.querySelector<HTMLElement>('[data-stage-overlay]');
    if (!slug || !canvas || !overlay) return;

    const [demo, choreography] = await Promise.all([loadDemo(slug), loadChoreography(slug)]);
    if (!demo) return;

    // Specimens follow the page theme (SPEC §6) — no per-stage theme control.
    const syncTheme = () => {
      const explicit = document.documentElement.dataset.theme;
      const dark = explicit ? explicit === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
      canvas.dataset.theme = dark ? 'dark' : 'light';
    };
    syncTheme();
    new MutationObserver(syncTheme).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    matchMedia('(prefers-color-scheme: dark)').addEventListener('change', syncTheme);

    canvas.dataset.state = 'idle';
    const shadow = canvas.attachShadow({ mode: 'open' });
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(kitCss);
    shadow.adoptedStyleSheets = [sheet];

    let posed = false;
    const remount = () => {
      this.#mountRoot?.remove();
      const root = document.createElement('div');
      root.className = 'sp-root';
      shadow.appendChild(root);
      demo.mount(root);
      this.#mountRoot = root;
      posed = false;
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
      reducedMotion,
      onStateChange: (state) => {
        this.dataset.state = state;
        // Mirrored inside the shadow root so kit animations pause with the player.
        canvas.dataset.state = state;
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

    // --- Subject annotation (SPEC §6) ---
    const pin = document.createElement('div');
    pin.className = 'vd-subject-pin';
    pin.textContent = this.dataset.name ?? slug;
    const spotlight = document.createElement('div');
    spotlight.className = 'vd-spotlight';
    overlay.append(spotlight, pin);

    const subject = () => this.#mountRoot?.querySelector<HTMLElement>('[data-subject]') ?? null;
    // data-subject on the demo's top-level wrapper means "the whole scene is the subject".
    const isWholeScene = (el: HTMLElement) => el === this.#mountRoot?.firstElementChild;

    /**
     * Freeze a posed clone of the specimen (SPEC §6): summon the subject if
     * needed, then swap the live demo for an inert snapshot so the demo's own
     * timers cannot dismiss the subject mid-inspection. Any remount restores live.
     */
    let posing: Promise<void> | undefined;
    const enterPose = async () => {
      if (posed) return;
      posing ??= (async () => {
        const own = await player.summon(() => {
          const el = subject();
          return el ? isRevealed(el) : false;
        });
        // A superseded summon means attract already has the stage back; posing now
        // would leave the run playing a listener-less clone.
        if (!own) return;
        const live = this.#mountRoot;
        if (!live) return;
        const poseRoot = live.cloneNode(true) as HTMLElement;
        live.remove();
        shadow.appendChild(poseRoot);
        this.#mountRoot = poseRoot;
        posed = true;
      })();
      await posing;
      posing = undefined;
    };

    const placePin = (el: HTMLElement) => {
      const overlayRect = overlay.getBoundingClientRect();
      const rect = el.getBoundingClientRect();
      const x = rect.left + rect.width / 2 - overlayRect.left;
      const above = rect.top - overlayRect.top - 10;
      pin.style.left = `${x}px`;
      if (above > 34) {
        pin.style.top = `${above}px`;
        pin.dataset.side = 'above';
      } else {
        pin.style.top = `${rect.bottom - overlayRect.top + 10}px`;
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
      const rect = isWholeScene(el) ? overlayRect : el.getBoundingClientRect();
      spotlight.style.left = `${rect.left - overlayRect.left - 6}px`;
      spotlight.style.top = `${rect.top - overlayRect.top - 6}px`;
      spotlight.style.width = `${rect.width + 12}px`;
      spotlight.style.height = `${rect.height + 12}px`;
      spotlight.setAttribute('data-visible', '');
      placePin(el);
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
    identifyButton?.addEventListener('pointerenter', () => setIdentify(true));
    identifyButton?.addEventListener('pointerleave', () => {
      if (!identifySticky) setIdentify(false);
    });
    identifyButton?.addEventListener('click', () => {
      identifySticky = !identifySticky;
      setIdentify(identifySticky);
    });

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
      if (posed) remount();
      player.userIntent(at);
    };
    // Takeover is intentional (SPEC §7): a click anywhere, keyboard focus, a dwell on
    // an interactive element, or a gesture that actually scrolls the specimen. Merely
    // passing the pointer over the stage, or scrolling the page past it, never takes over.
    const INTERACTIVE = 'a[href], button, input, select, textarea, [tabindex]';
    let dwell: ReturnType<typeof setTimeout> | undefined;
    // Listened for on the shadow root, not the host: pointerover/pointerout are pruned
    // at the shadow boundary whenever both ends of the move are inside it, so the host
    // only ever hears the pointer arrive in the specimen, never land on a control.
    // Inside the shadow root the player's own synthesized input is in scope too, so
    // every takeover signal is gated on isTrusted: the ghost cursor must never be
    // mistaken for the user and hand the stage to itself.
    shadow.addEventListener('pointerover', (event) => {
      if (!event.isTrusted) return;
      clearTimeout(dwell);
      const el = event.composedPath()[0];
      if (!(el instanceof Element) || !el.closest(INTERACTIVE)) return;
      dwell = setTimeout(() => takeover(el), HOVER_DWELL_MS);
    });
    canvas.addEventListener('pointerleave', () => {
      clearTimeout(dwell);
      if (!identifyActive) player.userGone();
    });
    canvas.addEventListener('pointerdown', (event) => {
      if (event.isTrusted) takeover(event.composedPath()[0]);
    });
    canvas.addEventListener('focusin', (event) => {
      if (event.isTrusted) takeover(event.composedPath()[0]);
    });
    canvas.addEventListener(
      'wheel',
      (event) => {
        if (event.isTrusted && scrollsSpecimen(event.composedPath(), canvas, event.deltaX, event.deltaY)) takeover(event.composedPath()[0]);
      },
      { passive: true },
    );
    canvas.addEventListener(
      'touchmove',
      (event) => {
        if (event.isTrusted && scrollsSpecimen(event.composedPath(), canvas)) takeover(event.composedPath()[0]);
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
