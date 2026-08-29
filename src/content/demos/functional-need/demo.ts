import { icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type Framing = 'need' | 'category';

const STATEMENT = {
  need: 'Needs to set a value without a sustained precise drag.',
  category: 'Users with motor impairments cannot operate this control.',
} as const satisfies Record<Framing, string>;

const CAPTION = {
  need: 'The need names the barrier and the fix in one sentence, and it reaches everyone the drag defeats, diagnosis or not.',
  category: 'A category invites one question instead: how many of our users are those? A count is not a specification.',
} as const satisfies Record<Framing, string>;

/** The readers this one barrier stops. `named` marks the ones a disability category already reaches. */
const READERS = [
  { label: 'Tremor, permanent', named: true },
  { label: 'Switch access, one contact', named: true },
  { label: 'Wrist in a cast, three weeks', named: false },
  { label: 'Trackpad, no mouse', named: false },
  { label: 'One hand, phone on a train', named: false },
] as const;

/**
 * Functional need specimen: one barrier (a crop handle that can only be set by a sustained precise
 * drag) written two ways, with the readers each wording reaches listed beside it. Nothing about the
 * barrier changes between the picks; only the sentence describing it does, and the coverage count is
 * what the change buys.
 *
 * The subject is the statement itself, given its own element, because the term is a way of writing a
 * barrier rather than a widget. The control, the reader list, the count, the picker and the caption
 * are scenery (SPEC §5). The category wording is a counter-example the subject passes through, so the
 * honest condition is declared in `data-pose` and the mount state satisfies it (SPEC §6).
 *
 * Both sentences sit in one reserved box, both captions in another, and the rows keep their height
 * whichever mark they carry, so a pick moves nothing (SPEC §5). No timers: each state is a pick.
 */
export function mount(root: HTMLElement): void {
  // Rendered in the mount state, which is the need framing: every reader reached.
  const row = (reader: (typeof READERS)[number], index: number) => `
    <div class="sp-row" data-part="reader-${index + 1}" data-covered
         style="gap: 6px; height: 19px; color: var(--sp-ink)">
      <span data-part="mark-${index + 1}" style="display: flex; flex: 0 0 auto; width: 16px; height: 16px"
        >${icon('check')}</span>
      <span style="flex: 1 1 auto; min-width: 0; font-size: 11px; white-space: nowrap">${reader.label}</span>
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 11px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px">
          <span class="sp-label" style="flex: 0 0 auto">One barrier</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="framing" data-value="need" data-axis="Framing" data-term="need" style="flex: 0 0 auto">
            <button class="sp-segment" type="button" data-part="seg-need" value="need"
                    style="padding: 3px 11px; font-size: 11px; white-space: nowrap">Functional need</button>
            <button class="sp-segment" type="button" data-part="seg-category" value="category"
                    style="padding: 3px 11px; font-size: 11px; white-space: nowrap">Disability category</button>
          </sp-segmented>
        </div>

        <p class="sp-text sp-text--ink" data-part="statement" data-framing="need" data-subject
           data-pose="[data-framing=need]"
           style="margin: 9px 0 0; height: 46px; padding: 7px 10px; border-radius: 6px;
                  background: var(--sp-accent-soft); font-size: 12.5px; line-height: 1.35">${STATEMENT.need}</p>

        <div class="sp-row" style="align-items: stretch; gap: 12px; margin-top: 9px">
          <div class="sp-surface sp-context" style="flex: 0 0 auto; width: 168px; height: 138px; padding: 9px 10px">
            <span class="sp-label" style="font-size: 11px">The barrier</span>
            <div style="position: relative; height: 18px; margin-top: 10px">
              <div style="position: absolute; left: 0; right: 0; top: 7px; height: 5px; border-radius: 3px;
                          background: var(--sp-sunken)"></div>
              <div data-part="handle"
                   style="position: absolute; left: 62px; top: 0; width: 5px; height: 18px; border-radius: 2px;
                          background: var(--sp-ink)"></div>
            </div>
            <p class="sp-text" style="margin: 8px 0 0; font-size: 10.5px; line-height: 1.35">
              Set the crop by dragging a 5px handle. No keys, no buttons, no second route.</p>
          </div>

          <div class="sp-surface sp-context" style="flex: 1 1 auto; min-width: 0; height: 138px; padding: 9px 10px">
            <div class="sp-row sp-row--between" style="gap: 8px">
              <span class="sp-label" style="flex: 0 0 auto; font-size: 11px">Readers it reaches</span>
              <span class="sp-text sp-text--ink" data-part="count" data-count="5"
                    style="flex: 0 0 auto; font-size: 11px; white-space: nowrap">5 of 5</span>
            </div>
            <div class="sp-stack" style="gap: 2px; margin-top: 6px">
              ${READERS.map(row).join('')}
            </div>
          </div>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="caption" data-framing="need"
           style="margin: 9px 0 0; height: 32px; font-size: 11px; line-height: 1.35">${CAPTION.need}</p>
      </div>
    </div>
  `;

  const statement = part(root, 'statement');
  const caption = part(root, 'caption');
  const count = part(root, 'count');
  const rows = READERS.map((reader, index) => ({
    reader,
    el: part(root, `reader-${index + 1}`),
    mark: part(root, `mark-${index + 1}`),
  }));

  const apply = (framing: Framing) => {
    statement.dataset.framing = framing;
    statement.textContent = STATEMENT[framing];
    caption.dataset.framing = framing;
    caption.textContent = CAPTION[framing];

    let reached = 0;
    for (const { reader, el, mark } of rows) {
      // The need reaches every reader the drag defeats; the category reaches only the ones it names.
      const covered = framing === 'need' || reader.named;
      if (covered) reached += 1;
      flag(el, 'data-covered', covered);
      el.style.color = covered ? 'var(--sp-ink)' : 'var(--sp-muted)';
      mark.innerHTML = icon(covered ? 'check' : 'minus');
    }
    count.dataset.count = String(reached);
    count.textContent = `${reached} of ${READERS.length}`;
  };

  part(root, 'framing').addEventListener('change', (event) => {
    apply((event as CustomEvent<string>).detail as Framing);
  });

  apply('need');
}
