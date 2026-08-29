import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/**
 * Two themes, and the only thing that differs between them is which primitive the
 * semantic token points at. The component tier is not touched by either.
 */
const THEMES: Record<string, { primitive: string; ref: string; label: string }> = {
  aurora: { primitive: 'var(--tk-blue-600)', ref: 'blue-600', label: 'blue.600' },
  ember: { primitive: 'var(--tk-orange-500)', ref: 'orange-500', label: 'orange.500' },
};

/**
 * Color token specimen: the three-tier chain drawn as it actually resolves.
 * `button.bg` reads `color.accent`, `color.accent` reads one primitive, and
 * switching theme moves that one reference while every name stays where it is.
 * The tokens are declared on the scene, so the preview button below the chain
 * resolves them the way any component would: by name, from wherever it sits.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" data-part="scene"
           style="width: 356px; --tk-blue-600: #2f5cf0; --tk-orange-500: #e2622b; --tk-accent: var(--tk-blue-600); --tk-button-bg: var(--tk-accent)">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">Theme</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Palette" data-part="segmented" data-value="aurora">
            <button class="sp-segment" data-part="seg-aurora" value="aurora">Aurora</button>
            <button class="sp-segment" data-part="seg-ember" value="ember">Ember</button>
          </sp-segmented>
        </div>

        <div class="sp-stack" data-part="chain" data-subject data-theme="aurora" style="gap: 10px; margin-top: 14px">
          <div class="sp-row" data-part="primitive">
            <span class="sp-label" style="width: 78px">primitive</span>
            <span class="sp-chip" data-part="prim-blue" data-selected>
              <span class="sp-swatch" style="width: 12px; height: 12px; --sp-swatch: var(--tk-blue-600)"></span>blue.600
            </span>
            <span class="sp-chip" data-part="prim-orange">
              <span class="sp-swatch" style="width: 12px; height: 12px; --sp-swatch: var(--tk-orange-500)"></span>orange.500
            </span>
          </div>
          <div class="sp-row" data-part="semantic" data-ref="blue-600">
            <span class="sp-label" style="width: 78px">semantic</span>
            <span class="sp-swatch" style="width: 16px; height: 16px; --sp-swatch: var(--tk-accent)"></span>
            <span class="sp-text sp-text--ink">color.accent</span>
            <span class="sp-text" data-part="semantic-ref">= blue.600</span>
          </div>
          <div class="sp-row" data-part="component">
            <span class="sp-label" style="width: 78px">component</span>
            <span class="sp-swatch" style="width: 16px; height: 16px; --sp-swatch: var(--tk-button-bg)"></span>
            <span class="sp-text sp-text--ink">button.bg</span>
            <span class="sp-text">= color.accent</span>
          </div>
        </div>

        <div class="sp-row sp-context" style="margin-top: 14px">
          <button class="sp-button" data-part="preview" style="background: var(--tk-button-bg); color: #ffffff">Publish</button>
          <span class="sp-text">reads button.bg</span>
        </div>
      </div>
    </div>
  `;

  const scene = part(root, 'scene');
  const chain = part(root, 'chain');
  const semantic = part(root, 'semantic');
  const semanticRef = part(root, 'semantic-ref');
  const blue = part(root, 'prim-blue');
  const orange = part(root, 'prim-orange');

  const retheme = (name: string) => {
    const theme = THEMES[name];
    if (!theme) return;
    chain.dataset.theme = name;
    scene.style.setProperty('--tk-accent', theme.primitive);
    semantic.dataset.ref = theme.ref;
    semanticRef.textContent = `= ${theme.label}`;
    flag(blue, 'data-selected', name === 'aurora');
    flag(orange, 'data-selected', name === 'ember');
  };
  retheme('aurora');

  part(root, 'segmented').addEventListener('change', (event) => retheme((event as CustomEvent<string>).detail));
}
