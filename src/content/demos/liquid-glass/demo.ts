import { flag, part } from '#src/kit/parts.ts';

const TABS = ['library', 'albums', 'search'];

/**
 * Liquid Glass specimen: a floating control bar as a lens rather than a frosted
 * panel. On top of the kit's glass it carries a brighter, concave edge, a specular
 * streak across the face, and a saturating backdrop filter, and the selection is a
 * capsule that flows to the chosen tab instead of cutting there. The capsule is
 * placed by a fraction of the bar rather than by measurement, so it is in the right
 * place in the first painted frame, and it moves by `left` alone, so nothing around
 * it can be pushed (SPEC §5). Selection is absolute: clicking a tab chooses it.
 */
export function mount(root: HTMLElement): void {
  const tabs = TABS.map(
    (name, index) => `
      <button data-part="tab-${name}" type="button" ${index === 0 ? 'data-current' : ''}
              style="position: relative; z-index: 1; flex: 1; padding: 8px 0; border: 0; background: transparent; color: inherit; font: inherit; font-size: 13px; font-weight: 600; text-transform: capitalize; cursor: pointer; opacity: ${index === 0 ? '1' : '0.72'}">
        ${name}
      </button>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app" style="padding: 0">
      <div class="sp-aurora sp-context" data-part="backdrop" aria-hidden="true"
           style="--sp-aurora-wash: linear-gradient(140deg, #2f4fd8, #a13fd0 48%, #f0733b)">
        <span class="sp-aurora-blob sp-drift" style="--sp-blob: #ffd166; --sp-i: 0; left: 4%; top: 8%"></span>
        <span class="sp-aurora-blob sp-drift" style="--sp-blob: #23d3ee; --sp-i: 1; --sp-blob-size: 140px; right: 6%; top: 34%"></span>
      </div>
      <div data-part="content" aria-hidden="true"
           style="position: absolute; left: 8%; top: 20%; right: 8%; color: #fff; text-shadow: 0 1px 6px rgb(0 0 0 / 0.25)">
        <div style="font-size: 26px; font-weight: 700; letter-spacing: -0.02em">Coast Roads</div>
        <div style="font-size: 14px; opacity: 0.85; margin-top: 2px">48 photos, taken last August</div>
      </div>

      <div class="sp-glass" data-part="bar" data-subject
           style="position: absolute; left: 50%; bottom: 22px; translate: -50% 0; display: flex; width: 268px; padding: 4px; border-radius: 999px; --tab: 0; backdrop-filter: blur(18px) saturate(1.9) brightness(1.05); box-shadow: 0 10px 28px rgb(16 24 40 / 0.34), inset 0 1px 1px rgb(255 255 255 / 0.7), inset 0 -2px 3px rgb(255 255 255 / 0.28)">
        <span data-part="capsule" aria-hidden="true"
              style="position: absolute; top: 4px; bottom: 4px; left: calc(4px + var(--tab) * (100% - 8px) / 3); width: calc((100% - 8px) / 3); border-radius: 999px; background: rgb(255 255 255 / 0.3); box-shadow: inset 0 1px 1px rgb(255 255 255 / 0.75), 0 2px 8px rgb(16 24 40 / 0.22); transition: left 0.45s var(--sp-ease)"></span>
        <span data-part="specular" aria-hidden="true"
              style="position: absolute; inset: 0; border-radius: inherit; pointer-events: none; background: linear-gradient(104deg, transparent 34%, rgb(255 255 255 / 0.42) 47%, transparent 58%)"></span>
        ${tabs}
      </div>
    </div>
  `;

  const bar = part(root, 'bar');
  for (const [index, name] of TABS.entries()) {
    const tab = part(root, `tab-${name}`);
    tab.addEventListener('click', () => {
      bar.style.setProperty('--tab', String(index));
      for (const other of TABS) {
        const el = part(root, `tab-${other}`);
        flag(el, 'data-current', other === name);
        el.style.opacity = other === name ? '1' : '0.72';
      }
    });
  }
}
