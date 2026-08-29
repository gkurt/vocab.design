import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/** The beat before the browser fills the first field, and the gap between the ones after it. */
const FILL_MS = 200;
const FILL_STEP_MS = 150;

type Mode = 'declared' | 'absent';

/**
 * The glyphs a personalisation tool would put beside these fields. Two are drawn here because
 * the kit's set has no person and no place marker, and they are stated in the kit's own stroke
 * shape so a hand-drawn glyph cannot read as a different icon family.
 */
const GLYPH = {
  person:
    '<svg class="sp-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3.4"/><path d="M5.5 20a6.5 6.5 0 0 1 13 0"/></svg>',
  place:
    '<svg class="sp-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s6-5.7 6-10a6 6 0 1 0-12 0c0 4.3 6 10 6 10z"/><circle cx="12" cy="11" r="2.2"/></svg>',
} as const;

const FIELDS = [
  { key: 'name', label: 'Full name', token: 'name', value: 'Dana Whitlock', glyph: GLYPH.person },
  { key: 'email', label: 'Email', token: 'email', value: 'dana@kellerman.co', glyph: icon('inbox') },
  { key: 'post', label: 'Postcode', token: 'postal-code', value: 'EC1A 4NP', glyph: GLYPH.place },
] as const;

const CAPTION = {
  declared:
    'Each field names its purpose, so the browser fills it from the saved profile and a personalisation tool can put a familiar glyph beside it.',
  absent:
    'The same fields, the same labels, no tokens. The profile is still there, and nothing can be matched to anything, so the reader types all three by hand.',
} as const;

/**
 * Input purpose specimen: a short checkout form beside the autocomplete tokens it declares, with
 * a pick between the tokens declared and the same form without them. In the declared state the
 * saved profile lands in the fields and each one gains its glyph; without the tokens the profile
 * is unreachable and the fields stay empty.
 *
 * The subject is the token column: the term names the machine readable declaration, not the
 * fields it happens to sit on and not the fill that follows from it. The form, the saved profile
 * strip, the glyphs and the caption are scenery (SPEC §5). A column reading "not set" is the
 * absence of the term rather than the term, so the honest condition is declared in `data-pose`
 * and the mount state satisfies it (SPEC §6).
 *
 * The fill runs on the DemoClock, so a pose can hold it still. Every value, glyph and token sits
 * in a box that is the same size empty as full, so switching moves nothing (SPEC §5).
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  const field = (key: string, label: string, glyph: string) => `
    <div class="sp-row" style="gap: 8px; height: 30px">
      <span class="sp-label" style="flex: 0 0 auto; width: 68px">${label}</span>
      <div class="sp-input" data-part="field-${key}" style="display: flex; align-items: center; gap: 7px;
                                                            flex: 1 1 auto; width: auto; min-width: 0;
                                                            height: 30px; padding: 0 9px">
        <span data-part="glyph-${key}" style="flex: 0 0 auto; display: flex; color: var(--sp-accent);
                                              opacity: 0; transition: opacity 0.2s ease">${glyph}</span>
        <span class="sp-text sp-text--ink" data-part="value-${key}"
              style="font-size: 12.5px; white-space: nowrap"></span>
      </div>
    </div>`;

  const tokenRow = (key: string, token: string) => `
    <div class="sp-row" style="height: 30px; justify-content: flex-end">
      <span data-part="token-${key}" style="font-size: 11px; font-weight: 500">${token}</span>
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 12px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px">
          <span class="sp-label" style="flex: 0 0 auto">Checkout, one page</span>
          <sp-segmented class="sp-segmented" data-part="mode" data-value="declared" data-axis="Autocomplete" data-term="declared" style="flex: 0 0 auto">
            <button class="sp-segment" type="button" data-part="seg-declared" value="declared"
                    style="padding: 3px 11px; font-size: 11px; white-space: nowrap">Tokens declared</button>
            <button class="sp-segment" type="button" data-part="seg-absent" value="absent"
                    style="padding: 3px 11px; font-size: 11px; white-space: nowrap">No tokens</button>
          </sp-segmented>
        </div>

        <div class="sp-row sp-context" data-part="profile" style="gap: 8px; margin-top: 9px; height: 24px">
          <span class="sp-label" style="flex: 0 0 auto">Saved in the browser</span>
          <span class="sp-chip" style="cursor: default; padding: 2px 9px; font-size: 11px">Dana Whitlock</span>
          <span class="sp-chip" style="cursor: default; padding: 2px 9px; font-size: 11px">dana@kellerman.co</span>
          <span class="sp-chip" style="cursor: default; padding: 2px 9px; font-size: 11px">EC1A 4NP</span>
        </div>

        <div class="sp-row sp-context" style="gap: 12px; margin-top: 8px; height: 14px">
          <span class="sp-grow"></span>
          <span class="sp-label" style="flex: 0 0 auto; width: 118px; text-align: right; font-size: 10px">autocomplete</span>
        </div>

        <div class="sp-row" style="align-items: flex-start; gap: 12px; margin-top: 4px">
          <div class="sp-stack sp-context" data-part="form" data-state="filled" style="gap: 9px; flex: 1 1 auto">
            ${FIELDS.map((f) => field(f.key, f.label, f.glyph)).join('')}
          </div>
          <div class="sp-stack" data-part="purpose" data-subject data-mode="declared" data-pose="[data-mode=declared]"
               style="flex: 0 0 auto; width: 118px; gap: 9px; padding: 0 9px;
                      border: 1px solid var(--sp-line); border-radius: 6px; background: var(--sp-surface)">
            ${FIELDS.map((f) => tokenRow(f.key, f.token)).join('')}
          </div>
        </div>

        <p class="sp-text sp-context" data-part="caption" data-mode="declared"
           style="margin: 9px 0 0; height: 30px; font-size: 11px; line-height: 1.35">${CAPTION.declared}</p>
      </div>
    </div>
  `;

  const purpose = part(root, 'purpose');
  const form = part(root, 'form');
  const caption = part(root, 'caption');
  const rows = FIELDS.map((f) => ({
    value: part(root, `value-${f.key}`),
    glyph: part(root, `glyph-${f.key}`),
    token: part(root, `token-${f.key}`),
    filled: f.value,
  }));
  let timers: number[] = [];

  const apply = (mode: Mode) => {
    for (const timer of timers) clock.clearTimeout(timer);
    timers = [];
    purpose.dataset.mode = mode;
    caption.dataset.mode = mode;
    caption.textContent = CAPTION[mode];

    if (mode === 'absent') {
      form.dataset.state = 'empty';
      rows.forEach((row) => {
        row.token.textContent = 'not set';
        row.token.style.color = 'var(--sp-muted)';
        row.token.style.fontWeight = '400';
        row.value.textContent = '';
        row.glyph.style.opacity = '0';
      });
      return;
    }

    FIELDS.forEach((f, index) => {
      const row = rows[index];
      if (!row) return;
      row.token.textContent = f.token;
      row.token.style.removeProperty('color');
      row.token.style.fontWeight = '500';
      timers.push(
        clock.setTimeout(
          () => {
            row.value.textContent = row.filled;
            row.glyph.style.opacity = '1';
            // The form is filled once the last field lands, so the flag is the tally of a
            // finished fill rather than of the pick that started it (SPEC §8).
            if (index === FIELDS.length - 1) form.dataset.state = 'filled';
          },
          FILL_MS + index * FILL_STEP_MS,
        ),
      );
    });
    form.dataset.state = 'filling';
  };

  part(root, 'mode').addEventListener('change', (event) => {
    apply((event as CustomEvent<string>).detail as Mode);
  });

  // Mount in the state the pose requires: tokens declared, profile already in the fields.
  for (const row of rows) {
    row.value.textContent = row.filled;
    row.glyph.style.opacity = '1';
  }
}
