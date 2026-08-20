import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type View = 'v1' | 'v4' | 'v9' | 'form';

interface Visit {
  caption: string;
  ask: string;
  why: string;
  field: string;
  pct: number;
  known: string[];
  note: string;
}

const VISITS: Record<'v1' | 'v4' | 'v9', Visit> = {
  v1: {
    caption: 'First visit, after the first loaf is logged',
    ask: 'What should we call you?',
    why: 'So the loaf log has a name on it.',
    field: 'First name',
    pct: 20,
    known: ['Email'],
    note: 'Registration asked for an email and a password. Everything else waits for a visit where there is a reason to ask.',
  },
  v4: {
    caption: 'Fourth visit, on the way to a delivery estimate',
    ask: 'Which postcode do you bake in?',
    why: 'So flour delivery dates are the real ones.',
    field: 'Postcode',
    pct: 55,
    known: ['Email', 'First name', 'Bakes weekly'],
    note: 'One question, next to the thing it improves. The reason for asking is on screen, and skipping costs nothing.',
  },
  v9: {
    caption: 'Ninth visit, opening the oven settings',
    ask: 'How hot does your oven really run?',
    why: 'So the timings stop being ten minutes out.',
    field: 'Max temperature',
    pct: 85,
    known: ['Email', 'First name', 'Postcode', 'Bakes weekly', 'Sourdough only'],
    note: 'Nine visits in, the record is nearly complete and no single visit was ever asked for more than one thing.',
  },
};

const FORM_FIELDS = ['Full name', 'Email', 'Password', 'Postcode', 'Date of birth', 'Oven type'];
const FORM_CAPTION = 'The form this replaces, asked before the first loaf';
const FORM_NOTE =
  'The same record, demanded up front: twelve fields between a person and the thing they came to do. This is the counter-example, not the pattern.';

/**
 * Progressive profiling specimen: one product asking one small thing per visit, with the
 * long registration form it replaces shown once as the counter-example.
 *
 * The subject is the question being asked on this visit, the narrowest element the term
 * names: not the app, not the completeness reading, and not the list of what is already
 * known, which are the scenery that makes the ask legible (SPEC §5). In the counter-example
 * the ask is gone rather than repaired, so identify summons the mount state (a real visit,
 * with a real single question) instead of ringing a form (SPEC §6).
 *
 * All four views are stacked in one box of fixed height, and the ask keeps its own box
 * across the three visits, so switching visits resizes and moves nothing (SPEC §5). Each
 * segment reaches its own named view rather than flipping the one it finds (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  const chips = (known: string[]) =>
    known
      .map(
        (name) =>
          `<span class="sp-chip" style="flex: 0 0 auto; padding: 2px 8px; font-size: 10px; white-space: nowrap; cursor: default">${name}</span>`,
      )
      .join('');

  const formRows = [0, 2, 4]
    .map(
      (start) => `
      <div class="sp-row" style="gap: 10px; align-items: flex-end">
        ${FORM_FIELDS.slice(start, start + 2)
          .map(
            (label) => `
              <div style="flex: 1 1 0; min-width: 0">
                <span class="sp-label" style="display: block; font-size: 10px">${label}</span>
                <input class="sp-input" type="text" aria-label="${label}" style="width: 100%; height: 24px; margin-top: 2px; padding: 0 8px; font-size: 11px" />
              </div>`,
          )
          .join('')}
      </div>`,
    )
    .join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 276px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Proof</span>
          <sp-segmented class="sp-segmented" data-part="view" data-value="v1" style="flex: 0 0 auto">
            <button class="sp-segment" data-part="view-v1" type="button" value="v1" style="padding: 4px 8px; font-size: 11px">Visit 1</button>
            <button class="sp-segment" data-part="view-v4" type="button" value="v4" style="padding: 4px 8px; font-size: 11px">Visit 4</button>
            <button class="sp-segment" data-part="view-v9" type="button" value="v9" style="padding: 4px 8px; font-size: 11px">Visit 9</button>
            <button class="sp-segment" data-part="view-form" type="button" value="form" style="padding: 4px 8px; font-size: 11px">All at once</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 8px">
          <span class="sp-label sp-context" data-part="caption" style="height: 14px; font-size: 10px">${VISITS.v1.caption}</span>
          <div data-part="box" style="position: relative; flex: 1 1 auto">

            <div data-part="visit" style="position: absolute; inset: 0; display: flex; flex-direction: column; gap: 8px">
              <div class="sp-surface" data-part="ask" data-subject data-visit="1" style="height: 88px; padding: 11px 12px; background: var(--sp-surface)">
                <span class="sp-heading" data-part="ask-question" style="font-size: 13px">${VISITS.v1.ask}</span>
                <span class="sp-text" data-part="ask-why" style="display: block; margin-top: 1px; font-size: 11px">${VISITS.v1.why}</span>
                <div class="sp-row" style="gap: 8px; margin-top: 8px">
                  <input class="sp-input sp-grow" data-part="ask-field" type="text" placeholder="${VISITS.v1.field}" aria-label="Answer" style="height: 26px; padding: 0 9px; font-size: 11px" />
                  <button class="sp-button sp-button--sm" data-part="ask-save" type="button" style="flex: 0 0 auto">Save</button>
                  <button class="sp-button sp-button--quiet sp-button--sm" data-part="ask-skip" type="button" style="flex: 0 0 auto; color: var(--sp-muted); font-size: 12px">Not now</button>
                </div>
              </div>
              <div class="sp-row sp-context" style="gap: 8px; height: 20px">
                <span class="sp-label" style="flex: 0 0 auto; font-size: 10px">Profile</span>
                <div class="sp-progress sp-progress--meter sp-grow" style="height: 6px"><div class="sp-progress-fill" data-part="meter-fill" style="--sp-value: ${VISITS.v1.pct}%"></div></div>
                <span class="sp-label" data-part="readout" data-pct="${VISITS.v1.pct}" style="flex: 0 0 auto; width: 30px; text-align: right; font-size: 10px; font-variant-numeric: tabular-nums">${VISITS.v1.pct}%</span>
              </div>
              <div class="sp-row sp-row--wrap sp-context" style="gap: 6px; align-content: flex-start; height: 44px">
                <span class="sp-label" style="flex: 0 0 auto; font-size: 10px">Already known</span>
                <div class="sp-row sp-row--wrap" data-part="known" style="gap: 6px">${chips(VISITS.v1.known)}</div>
              </div>
            </div>

            <div class="sp-stack sp-context" data-part="form" hidden style="position: absolute; inset: 0; gap: 6px">
              ${formRows}
              <div class="sp-row" style="gap: 10px; margin-top: 2px">
                <button class="sp-button sp-button--sm" data-part="form-submit" type="button" style="flex: 0 0 auto">Create account</button>
                <span class="sp-label" style="font-size: 10px">and six more on the next screen</span>
              </div>
            </div>

          </div>
        </div>
      </div>
      <span class="sp-text sp-context" data-part="note" style="width: 452px; height: 32px; font-size: 11px; line-height: 1.35">${VISITS.v1.note}</span>
    </div>
  `;

  const visit = part(root, 'visit');
  const form = part(root, 'form');
  const ask = part(root, 'ask');
  const question = part(root, 'ask-question');
  const why = part(root, 'ask-why');
  const field = part(root, 'ask-field') as HTMLInputElement;
  const fill = part(root, 'meter-fill');
  const readout = part(root, 'readout');
  const known = part(root, 'known');
  const caption = part(root, 'caption');
  const note = part(root, 'note');

  part(root, 'view').addEventListener('change', (event) => {
    const next = (event as CustomEvent<string>).detail as View;
    if (next === 'form') {
      flag(visit, 'hidden', true);
      flag(form, 'hidden', false);
      caption.textContent = FORM_CAPTION;
      note.textContent = FORM_NOTE;
      return;
    }
    const shown = VISITS[next];
    flag(form, 'hidden', true);
    flag(visit, 'hidden', false);
    ask.dataset.visit = next.slice(1);
    question.textContent = shown.ask;
    why.textContent = shown.why;
    field.value = '';
    field.placeholder = shown.field;
    fill.style.setProperty('--sp-value', `${shown.pct}%`);
    readout.dataset.pct = String(shown.pct);
    readout.textContent = `${shown.pct}%`;
    known.innerHTML = chips(shown.known);
    caption.textContent = shown.caption;
    note.textContent = shown.note;
  });
}
