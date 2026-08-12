import { flag, part } from '#src/kit/parts.ts';

/**
 * Toggle button specimen: Bold in a toolbar, down while the selection is bold. The
 * subject is the button alone, since the sample it acts on and the two settings
 * beside it are there for the contrast the term needs (a button that acts, against a
 * switch and a checkbox that set).
 *
 * The latch is what this term is, so the button toggles and the script drives both
 * directions itself (SPEC §8). State is spelled twice: `aria-pressed` for the reader
 * who hears the control, and the kit's own selected attribute for the reader who sees
 * it, since a synthesized press never lights up `:active` (SPEC §7). The sample block
 * is a fixed height, so re-weighting the text moves nothing below it (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" style="height: 296px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Release notes</span><span class="sp-label">Draft</span></div>
        <div class="sp-body">
          <div class="sp-row sp-row--between">
            <span class="sp-label sp-context" id="vd-tb-label">Emphasis</span>
            <button
              class="sp-button sp-button--ghost sp-button--sm"
              type="button"
              data-part="bold"
              data-subject
              aria-pressed="false"
              aria-label="Bold"
              style="width: 36px; padding: 5px 0; font-weight: 700; text-align: center"
            >B</button>
          </div>
          <p class="sp-prose sp-context" data-part="sample" style="height: 76px; margin: 12px 0 0">
            Version 4.2 ships the new export pipeline and a faster first paint.
          </p>
          <div class="sp-divider sp-context" style="margin: 10px 0 12px"></div>
          <div class="sp-stack sp-context" style="gap: 10px">
            <div class="sp-row sp-row--between">
              <span class="sp-label" id="vd-tb-wrap">Wrap lines</span>
              <button class="sp-switch" type="button" data-part="wrap" role="switch" aria-checked="true" aria-labelledby="vd-tb-wrap"></button>
            </div>
            <div class="sp-row sp-row--between">
              <span class="sp-label" id="vd-tb-spell">Spell check</span>
              <button
                class="sp-checkbox"
                type="button"
                data-part="spell"
                role="checkbox"
                aria-checked="true"
                aria-labelledby="vd-tb-spell"
              ></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  const bold = part(root, 'bold');
  const sample = part(root, 'sample');

  bold.addEventListener('click', () => {
    const on = bold.getAttribute('aria-pressed') !== 'true';
    bold.setAttribute('aria-pressed', String(on));
    // The kit's latched look. `data-pressed` is the pointer holding a control down,
    // which is a different claim from a button that has stayed down.
    flag(bold, 'data-selected', on);
    sample.style.fontWeight = on ? '700' : '';
  });

  // Scenery that still answers a reader who takes the specimen over: a control the
  // demo shows for contrast must not be a dead one.
  for (const name of ['wrap', 'spell'] as const) {
    const control = part(root, name);
    control.addEventListener('click', () => {
      control.setAttribute('aria-checked', String(control.getAttribute('aria-checked') !== 'true'));
    });
  }
}
