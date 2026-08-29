import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type Palette = { page: string; card: string; dialog: string; line: string; ink: string; muted: string };

/** The two dark palettes, differing only in where the floor is. */
const NEAR: Palette = {
  page: '#121417',
  card: '#1E2126',
  dialog: '#2A2E35',
  line: 'rgb(255 255 255 / 0.10)',
  ink: '#E8EAEF',
  muted: '#9AA3B2',
};

const TRUE: Palette = {
  page: '#000000',
  card: '#0D0D0D',
  dialog: '#1A1A1A',
  line: 'rgb(255 255 255 / 0.14)',
  ink: '#FFFFFF',
  muted: '#8A8A8A',
};

/** Declared identically on both stacks, which is the point: on pure black it does nothing. */
const SHADOW = '0 6px 14px rgb(0 0 0 / 0.55)';

const VIEWS = [
  { key: 'surfaces', label: 'Surfaces' },
  { key: 'text', label: 'Text' },
] as const;

const START = 'surfaces';

const NOTES: Record<string, string> = {
  surfaces: 'Both stacks raise a card the same way. On pure black the shadow has nothing to darken, so only the white film separates them.',
  text: 'Pure white on pure black is the most contrast a screen can make, and the likeliest to bloom. Near black keeps text off white.',
};

/**
 * True black specimen: one small scene painted twice, once on a near black surface and once
 * on `#000000`, with the same markup, the same geometry and the same declared shadow in both.
 * Switching view moves both panels together, so the comparison is never between two different
 * scenes: surfaces shows what happens to the elevation ladder when the floor is removed, and
 * text shows the glare the pairing invites.
 *
 * The subject is the true black panel, not the pair. The term names that one palette; the near
 * black panel is what it is being read against and stays in the context register, along with
 * the view control and the note (SPEC §5). The panel is true black in every state, so there is
 * nothing identify has to refuse.
 *
 * Both views are stacked layers in one fixed box in each panel, so switching repaints and
 * moves nothing (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const panel = (side: string, p: Palette, caption: string, subject: boolean) => `
    <div class="sp-stack" style="flex: 1 1 0; min-width: 0; gap: 5px">
      <div data-part="${side}" ${subject ? `data-subject data-view="${START}"` : `data-view="${START}"`}
           style="position: relative; height: 136px; border-radius: var(--sp-radius);
                  border: 1px solid ${p.line}; background: ${p.page}; overflow: hidden">

        <div data-part="${side}-surfaces" style="position: absolute; inset: 0; padding: 9px">
          <span style="font-size: 10px; color: ${p.muted}">Page</span>
          <div style="margin-top: 7px; padding: 8px; border-radius: 6px; background: ${p.card};
                      border: 1px solid ${p.line}; box-shadow: ${SHADOW}">
            <span style="font-size: 10px; color: ${p.muted}">Card</span>
            <div style="margin-top: 7px; padding: 8px 9px; border-radius: 6px; background: ${p.dialog};
                        border: 1px solid ${p.line}; box-shadow: ${SHADOW}">
              <span style="font-size: 11px; font-weight: 500; color: ${p.ink}">Dialog</span>
            </div>
          </div>
        </div>

        <div data-part="${side}-text" hidden style="position: absolute; inset: 0; padding: 11px 12px">
          <span style="display: block; font-size: 13px; font-weight: 600; color: ${p.ink}">Overnight sync</span>
          <p style="margin: 7px 0 0; font-size: 11.5px; line-height: 1.5; color: ${p.ink}">Nine files were
            copied and one was skipped because it changed while the transfer was running.</p>
          <p style="margin: 6px 0 0; font-size: 11px; color: ${p.muted}">Finished 04:12</p>
        </div>
      </div>
      <span class="sp-label" style="font-size: 10px">${caption}</span>
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 448px; padding: 13px 20px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-axis="View" data-value="${START}">
            ${VIEWS.map((v) => `<button class="sp-segment" data-part="seg-${v.key}" value="${v.key}">${v.label}</button>`).join('')}
          </sp-segmented>
        </div>

        <div class="sp-row" style="gap: 12px; margin-top: 12px; align-items: flex-start">
          <div class="sp-context" style="display: flex; flex: 1 1 0; min-width: 0">
            ${panel('near', NEAR, 'Dark, #121417', false)}
          </div>
          ${panel('black', TRUE, 'True black, #000000', true)}
        </div>

        <p class="sp-text sp-context" data-part="note"
           style="margin: 10px 0 0; height: 32px; font-size: 11px; line-height: 1.4">${NOTES[START]}</p>
      </div>
    </div>
  `;

  const near = part(root, 'near');
  const black = part(root, 'black');
  const note = part(root, 'note');

  const show = (key: string) => {
    if (!VIEWS.some((v) => v.key === key)) return;
    near.dataset.view = key;
    black.dataset.view = key;
    for (const side of ['near', 'black']) {
      for (const view of VIEWS) part(root, `${side}-${view.key}`).hidden = view.key !== key;
    }
    note.textContent = NOTES[key] ?? '';
  };
  show(START);

  part(root, 'segmented').addEventListener('change', (event) => show((event as CustomEvent<string>).detail));
}
