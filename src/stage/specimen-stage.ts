import kitCss from '#src/kit/kit.css?inline';
import { AttractPlayer } from '#src/stage/player.ts';
import { loadChoreography, loadDemo } from '#src/stage/registry.ts';

const HOVER_DWELL_MS = 150;
const PIN_SETTLE_MS = 320;
const PIN_SHOW_MS = 1800;
const IDENTIFY_REFRESH_MS = 250;

function isVisible(el: HTMLElement): boolean {
  if (!isRevealed(el)) return false;
  return Number(getComputedStyle(el).opacity) >= 0.1;
}

/** Visibility without the opacity test — true the instant a CSS transition begins revealing the element. */
function isRevealed(el: HTMLElement): boolean {
  const style = getComputedStyle(el);
  if (style.visibility === 'hidden' || style.display === 'none') return false;
  const rect = el.getBoundingClientRect();
  return rect.width > 0 && rect.height > 0;
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

    const shadow = canvas.attachShadow({ mode: 'open' });
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(kitCss);
    shadow.adoptedStyleSheets = [sheet];

    let pinnedThisLoop = false;
    const remount = () => {
      this.#mountRoot?.remove();
      const root = document.createElement('div');
      root.className = 'sp-root';
      shadow.appendChild(root);
      demo.mount(root);
      this.#mountRoot = root;
      pinnedThisLoop = false;
    };
    remount();

    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const player = new AttractPlayer(choreography?.default ?? [], {
      root: () => this.#mountRoot as HTMLElement,
      overlay,
      remount,
      reducedMotion,
      onStateChange: (state) => {
        this.dataset.state = state;
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

    let pinHide: ReturnType<typeof setTimeout> | undefined;
    let pinSettle: ReturnType<typeof setTimeout> | undefined;
    const tryPin = () => {
      if (this.dataset.state !== 'attract' || pinnedThisLoop) return;
      const el = subject();
      if (!el || isWholeScene(el) || !isVisible(el)) return;
      pinnedThisLoop = true;
      placePin(el);
      clearTimeout(pinHide);
      pinHide = setTimeout(() => pin.removeAttribute('data-visible'), PIN_SHOW_MS);
    };

    let identifyActive = false;
    let identifySticky = false;
    let identifyRefresh: ReturnType<typeof setTimeout> | undefined;
    const setIdentify = (on: boolean) => {
      identifyActive = on;
      if (!on) {
        spotlight.removeAttribute('data-visible');
        pin.removeAttribute('data-visible');
        player.resume();
        return;
      }
      const found = subject();
      if (!found) return;
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
        clearTimeout(pinHide);
        placePin(el);
      };
      // Transient subjects (a toast that hasn't fired) are summoned into view (SPEC §6).
      if (!isWholeScene(found) && !isRevealed(found)) {
        void player.summon(() => (subject() ? isRevealed(subject() as HTMLElement) : false)).then(place);
      } else {
        place();
      }
    };

    const subjectObserver = new MutationObserver(() => {
      if (identifyActive) {
        // The subject may dismiss itself (toast auto-hide) — re-summon while identify is held.
        clearTimeout(identifyRefresh);
        identifyRefresh = setTimeout(() => {
          if (identifyActive) setIdentify(true);
        }, IDENTIFY_REFRESH_MS);
        return;
      }
      clearTimeout(pinSettle);
      pinSettle = setTimeout(tryPin, PIN_SETTLE_MS);
    });
    subjectObserver.observe(shadow, { subtree: true, attributes: true, childList: true });

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
    let dwell: ReturnType<typeof setTimeout> | undefined;
    canvas.addEventListener('pointerenter', () => {
      dwell = setTimeout(() => player.userIntent(), HOVER_DWELL_MS);
    });
    canvas.addEventListener('pointerleave', () => {
      clearTimeout(dwell);
      if (!identifyActive) player.userGone();
    });
    canvas.addEventListener('pointerdown', () => player.userIntent());
    canvas.addEventListener('focusin', () => player.userIntent());

    this.querySelector('[data-stage-replay]')?.addEventListener('click', () => {
      identifySticky = false;
      if (identifyActive) setIdentify(false);
      player.replay();
    });

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) entry.isIntersecting ? player.viewportEnter() : player.viewportLeave();
      },
      { threshold: 0.4 },
    );
    observer.observe(this);
  }
}

if (!customElements.get('vd-stage')) customElements.define('vd-stage', VdStage);
