import kitCss from '#src/kit/kit.css?inline';
import { AttractPlayer } from '#src/stage/player.ts';
import { loadChoreography, loadDemo } from '#src/stage/registry.ts';

const HOVER_DWELL_MS = 150;

/**
 * <vd-stage> — the specimen stage (SPEC §6). Owns demo isolation (shadow root +
 * adopted kit stylesheet), the attract player, takeover wiring, and controls.
 * Demos never reimplement any of this.
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

    const shadow = canvas.attachShadow({ mode: 'open' });
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(kitCss);
    shadow.adoptedStyleSheets = [sheet];

    const remount = () => {
      this.#mountRoot?.remove();
      const root = document.createElement('div');
      root.className = 'sp-root';
      shadow.appendChild(root);
      demo.mount(root);
      this.#mountRoot = root;
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

    let dwell: ReturnType<typeof setTimeout> | undefined;
    canvas.addEventListener('pointerenter', () => {
      dwell = setTimeout(() => player.userIntent(), HOVER_DWELL_MS);
    });
    canvas.addEventListener('pointerleave', () => {
      clearTimeout(dwell);
      player.userGone();
    });
    canvas.addEventListener('pointerdown', () => player.userIntent());
    canvas.addEventListener('focusin', () => player.userIntent());

    this.querySelector('[data-stage-replay]')?.addEventListener('click', () => player.replay());
    this.querySelector('[data-stage-theme]')?.addEventListener('click', () => {
      canvas.dataset.theme = canvas.dataset.theme === 'dark' ? 'light' : 'dark';
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
