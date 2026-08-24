import { icon } from '#src/kit/icons.ts';
import { localPoint } from '#src/kit/measure.ts';
import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** The window is one box in every configuration, so only the division inside it changes. */
const RAIL = 52;
/** Everything the rail is not using, which the two panes share. */
const AVAIL = 400;
const MIN = 100;
/** The reading pane never goes below this, which is what clamps the drag. */
const MIN_DETAIL = 190;
const MAX = AVAIL - MIN_DETAIL;
const DEFAULT_W = 156;
/** How far off the surface a floating pane sits, which is also the height it gives up. */
const FLOAT_INSET = 8;
/** Drag stops, in pane widths, so a scripted drag lands somewhere nameable. */
const STOPS = [112, 206];

const MAIL = [
  { name: 'Harbour Board', line: 'Ferry timetable, winter' },
  { name: 'Trinity Pilots', line: 'Draught survey attached' },
  { name: 'Aoife Ni Bhraonain', line: 'Re: berth 4 lighting' },
];

interface Kind {
  key: string;
  label: string;
  /** Whether this pane is the one holding a stated width, or the one taking the leftover. */
  stated: 'pane' | 'other';
  floats: boolean;
  dismissible: boolean;
  note: string;
}

const KINDS: Kind[] = [
  {
    key: 'fixed',
    label: 'Fixed',
    stated: 'pane',
    floats: false,
    dismissible: false,
    note: 'Fixed: this pane holds the number, and the reading pane beside it takes whatever is left over.',
  },
  {
    key: 'flexible',
    label: 'Flexible',
    stated: 'other',
    floats: false,
    dismissible: false,
    note: 'Flexible: the same boundary, stated from the other side. Now the reading pane holds the number and this pane takes the remainder.',
  },
  {
    key: 'floating',
    label: 'Floating',
    stated: 'pane',
    floats: true,
    dismissible: false,
    note: 'Floating: the pane comes off the surface and sits over the content, which keeps the full width of the window behind it.',
  },
  {
    key: 'semi',
    label: 'Semi permanent',
    stated: 'pane',
    floats: false,
    dismissible: true,
    note: 'Semi permanent: real space while it is there, and the reader can send it away and call it back from the app bar.',
  },
];

const clamp = (n: number, low: number, high: number) => Math.max(low, Math.min(high, n));
const band = (width: number) => (width < 130 ? 'narrow' : width > 190 ? 'wide' : 'medium');

/**
 * Pane specimen: one window divided into a rail, a mailbox pane, and a reading pane, with the
 * boundary between the last two draggable and the marked pane's kind named absolutely.
 *
 * The subject is ONE pane, `data-part="pane"`: the region the word names, not the window that
 * holds three of them and not the boundary between two. The rail, the reading pane, the
 * splitter, the app bar and the picker are all scenery in the context register (SPEC §5).
 * Dismissing the pane in its semi permanent kind leaves the subject off stage, which identify
 * answers by summoning it (SPEC §6), so no `data-pose` condition is needed: every state this
 * pane is in, it is a pane.
 *
 * The four kinds are Material's, and they are about width and about who decides it. Fixed and
 * flexible put the same boundary in the same place and differ in which pane states a number,
 * so both panes carry their own width label and the difference is legible rather than implied.
 * Floating and semi permanent change the pane's relationship to the scene, which is visible
 * on the switch.
 *
 * The drag is captured on a trusted pointerdown so a reader's own drag survives leaving the
 * strip (SPEC §7), and it is released on pointerup and pointercancel, never pointerleave,
 * which does not fire while capture holds. Nothing here transitions a width, so the offsets
 * the drag writes are the ones the readouts report. The mailbox rows are cut so all three
 * fit the pane at its shortest, which is the floating kind, since a list clipped mid-row
 * would read as the pane's own answer to being narrow.
 */
export function mount(root: HTMLElement): void {
  const rows = MAIL.map(
    (mail) => `
      <div class="sp-list-item" data-part="mail-${mail.name.split(' ')[0]?.toLowerCase()}" style="gap: 8px; padding: 4px 9px">
        <span class="sp-avatar" style="width: 20px; height: 20px; font-size: 9px">${mail.name.slice(0, 1)}</span>
        <span class="sp-grow" style="overflow: hidden">
          <span style="display: block; font-weight: 500; font-size: 12px; line-height: 15px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis">${mail.name}</span>
          <span class="sp-label" style="display: block; font-size: 11px; line-height: 14px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis">${mail.line}</span>
        </span>
      </div>`,
  ).join('');

  const railButton = (name: 'inbox' | 'star' | 'trash', current: boolean) => `
    <span class="sp-nav-item" ${current ? 'data-current' : ''} style="display: flex; justify-content: center; padding: 6px 0">${icon(name)}</span>`;

  const stops = STOPS.map(
    (width) => `
      <span
        data-part="stop-${width}"
        aria-hidden="true"
        style="position: absolute; top: 8px; left: ${RAIL + width}px; width: 6px; height: 6px; translate: -50% 0; pointer-events: none"
      ></span>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 232px">
        <div class="sp-topbar sp-context" style="padding: 6px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Harbour Office</span>
          <span style="position: relative; width: 74px; height: 24px">
            <button
              class="sp-button sp-button--ghost sp-button--sm"
              type="button"
              data-part="hide"
              style="position: absolute; inset: 0; padding: 0; font-size: 11px; visibility: hidden"
            >Hide pane</button>
            <button
              class="sp-button sp-button--ghost sp-button--sm"
              type="button"
              data-part="show"
              style="position: absolute; inset: 0; padding: 0; font-size: 11px; visibility: hidden"
            >Show pane</button>
          </span>
        </div>

        <div class="sp-body" style="padding: 10px">
          <div class="sp-surface" style="height: 100%; overflow: hidden">
            <div data-part="window" style="position: relative; display: flex; height: 100%">
              <div
                class="sp-nav sp-context"
                data-part="rail"
                style="flex: 0 0 ${RAIL}px; gap: 4px; padding: 8px 6px; background: var(--sp-sunken); border-right: 1px solid var(--sp-line)"
              >
                ${railButton('inbox', true)}
                ${railButton('star', false)}
                ${railButton('trash', false)}
              </div>

              <div
                data-part="pane"
                data-subject
                data-kind="fixed"
                data-stated="pane"
                data-width="${DEFAULT_W}"
                data-band="${band(DEFAULT_W)}"
                role="group"
                aria-label="Mailboxes"
                style="display: flex; flex-direction: column; min-width: 0; overflow: hidden; background: var(--sp-surface)"
              >
                <div class="sp-row" style="flex: 0 0 auto; gap: 6px; padding: 7px 9px; border-bottom: 1px solid var(--sp-line)">
                  <span class="sp-label sp-grow" style="color: var(--sp-ink); overflow: hidden; white-space: nowrap; text-overflow: ellipsis">Mailboxes</span>
                  <span
                    class="sp-chip"
                    data-part="pane-width"
                    style="flex: 0 0 auto; padding: 1px 6px; font-size: 10px; cursor: default; border-color: var(--sp-accent); color: var(--sp-accent); font-variant-numeric: tabular-nums"
                  >${DEFAULT_W}dp</span>
                </div>
                <div class="sp-list" style="flex: 1 1 auto; min-height: 0; overflow: hidden">${rows}</div>
              </div>

              <div
                class="sp-context"
                data-part="detail"
                style="display: flex; flex-direction: column; min-width: 0; overflow: hidden; background: var(--sp-surface); border-left: 1px solid var(--sp-line)"
              >
                <div class="sp-row" style="flex: 0 0 auto; gap: 6px; padding: 7px 9px; border-bottom: 1px solid var(--sp-line)">
                  <span class="sp-label sp-grow" style="color: var(--sp-ink); overflow: hidden; white-space: nowrap; text-overflow: ellipsis">Ferry timetable, winter</span>
                  <span
                    class="sp-chip"
                    data-part="detail-width"
                    style="flex: 0 0 auto; padding: 1px 6px; font-size: 10px; cursor: default; font-variant-numeric: tabular-nums"
                  >1fr</span>
                </div>
                <div class="sp-stack" style="flex: 1 1 auto; min-height: 0; gap: 7px; padding: 10px 12px; overflow: hidden">
                  <div class="sp-line" style="width: 94%"></div>
                  <div class="sp-line" style="width: 88%"></div>
                  <div class="sp-line" style="width: 96%"></div>
                  <div class="sp-line" style="width: 62%"></div>
                  <div class="sp-line" style="width: 90%"></div>
                </div>
              </div>

              <span
                data-part="splitter"
                class="sp-context"
                role="separator"
                aria-label="Resize the mailbox pane"
                aria-orientation="vertical"
                style="position: absolute; top: 0; bottom: 0; left: ${RAIL + DEFAULT_W}px; z-index: 2; width: 10px; translate: -50% 0;
                       display: flex; justify-content: center; cursor: col-resize; touch-action: none"
              ><span data-part="splitter-bar" aria-hidden="true" style="width: 2px; height: 100%; background: var(--sp-line)"></span></span>

              ${stops}
            </div>
          </div>
        </div>
      </div>

      <div class="sp-stack sp-context" style="align-items: center; gap: 7px; width: 476px">
        <sp-segmented class="sp-segmented" data-part="kinds" data-value="fixed">
          ${KINDS.map(
            (kind) => `
            <button class="sp-segment" type="button" data-part="seg-${kind.key}" value="${kind.key}" style="padding: 4px 9px; font-size: 11px">${kind.label}</button>`,
          ).join('')}
        </sp-segmented>
        <span class="sp-label" data-part="note" role="status" style="height: 30px; width: 452px; font-size: 11px; line-height: 15px; text-align: center"></span>
      </div>
    </div>
  `;

  const windowEl = part(root, 'window');
  const pane = part(root, 'pane');
  const detail = part(root, 'detail');
  const splitter = part(root, 'splitter');
  const splitterBar = part(root, 'splitter-bar');
  const paneWidth = part(root, 'pane-width');
  const detailWidth = part(root, 'detail-width');
  const hide = part(root, 'hide');
  const show = part(root, 'show');
  const note = part(root, 'note');

  let width = DEFAULT_W;
  let kind = KINDS[0] as Kind;
  let shown = true;
  let held = false;

  const layout = () => {
    const floats = kind.floats;
    const left = (floats ? RAIL + FLOAT_INSET : RAIL) + width;

    pane.hidden = !shown;
    splitter.hidden = !shown;
    pane.dataset.kind = kind.key;
    pane.dataset.stated = kind.stated;
    pane.dataset.width = String(width);
    pane.dataset.band = band(width);

    if (floats) {
      pane.style.position = 'absolute';
      pane.style.left = `${RAIL + FLOAT_INSET}px`;
      pane.style.top = `${FLOAT_INSET}px`;
      pane.style.bottom = `${FLOAT_INSET}px`;
      pane.style.flex = '0 0 auto';
      pane.style.width = `${width}px`;
      pane.style.zIndex = '1';
      pane.style.border = '1px solid var(--sp-line)';
      pane.style.borderRadius = 'var(--sp-radius)';
      pane.style.boxShadow = 'var(--sp-shadow)';
    } else {
      pane.style.position = 'static';
      pane.style.width = 'auto';
      pane.style.zIndex = 'auto';
      pane.style.border = '0';
      pane.style.borderRadius = '0';
      pane.style.boxShadow = 'none';
      pane.style.flex = kind.stated === 'other' ? '1 1 auto' : `0 0 ${width}px`;
    }

    detail.style.flex = !floats && shown && kind.stated === 'other' ? `0 0 ${AVAIL - width}px` : '1 1 auto';

    splitter.style.left = `${left}px`;
    splitter.style.top = floats ? `${FLOAT_INSET}px` : '0';
    splitter.style.bottom = floats ? `${FLOAT_INSET}px` : '0';

    paneWidth.textContent = kind.stated === 'other' ? '1fr' : `${width}dp`;
    detailWidth.textContent = kind.stated === 'other' ? `${AVAIL - width}dp` : '1fr';

    hide.style.visibility = kind.dismissible && shown ? 'visible' : 'hidden';
    show.style.visibility = kind.dismissible && !shown ? 'visible' : 'hidden';
    note.textContent = kind.note;
  };

  const setWidth = (next: number) => {
    width = Math.round(clamp(next, MIN, MAX));
    layout();
  };

  const setKind = (key: string) => {
    kind = KINDS.find((entry) => entry.key === key) ?? kind;
    // Each segment names a kind and lands on it with the pane present, rather than
    // inheriting whatever the previous kind left behind (SPEC §8).
    shown = true;
    layout();
  };

  const offsetOf = (event: PointerEvent) => localPoint(event, windowEl).x - RAIL - (kind.floats ? FLOAT_INSET : 0);

  splitter.addEventListener('pointerdown', (event) => {
    held = true;
    splitterBar.style.background = 'var(--sp-accent)';
    splitterBar.style.width = '3px';
    // Mandatory, and invisible to every scripted pass: without it a reader's drag dies at
    // the strip's edge. Guarded, because a synthetic pointer cannot be captured (SPEC §7).
    if (event.isTrusted) splitter.setPointerCapture(event.pointerId);
  });

  splitter.addEventListener('pointermove', (event) => {
    if (!held) return;
    setWidth(offsetOf(event));
  });

  const release = (event: PointerEvent) => {
    if (!held) return;
    held = false;
    splitterBar.style.background = 'var(--sp-line)';
    splitterBar.style.width = '2px';
    setWidth(offsetOf(event));
  };

  splitter.addEventListener('pointerup', release);
  splitter.addEventListener('pointercancel', release);

  hide.addEventListener('click', () => {
    shown = false;
    layout();
  });

  show.addEventListener('click', () => {
    shown = true;
    layout();
  });

  part(root, 'kinds').addEventListener('change', (event) => setKind((event as CustomEvent<string>).detail));

  layout();
}
