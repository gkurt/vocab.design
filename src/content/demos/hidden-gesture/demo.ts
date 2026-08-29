import { icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/** The wait that turns a press into the hidden action, and nothing announces it. */
const HOLD_MS = 480;

type Row = { key: string; title: string; meta: string; advertised: boolean };

const ROWS: Row[] = [
  { key: 'advertised', title: 'Quarterly numbers', meta: 'Padma Rao · 09:14', advertised: true },
  { key: 'hidden', title: 'Studio walkthrough', meta: 'Théo Guérin · 08:02', advertised: false },
];

function row(spec: Row): string {
  const control = spec.advertised
    ? `<button class="sp-icon-button" type="button" data-part="star-button" aria-label="Star this message" style="flex: 0 0 auto">${icon('star')}</button>`
    : '<span aria-hidden="true" style="flex: 0 0 28px"></span>';

  return `
    <div
      class="sp-list-item"
      data-part="row-${spec.key}"${spec.advertised ? '' : ' data-subject'}
      style="height: 56px; touch-action: none; user-select: none"
    >
      <span style="flex: 1 1 auto; min-width: 0">
        <span class="sp-text sp-text--ink" style="display: block; font-size: 13px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis">${spec.title}</span>
        <span class="sp-text" style="display: block; font-size: 11px">${spec.meta}</span>
      </span>
      <span
        data-part="badge-${spec.key}"
        style="flex: 0 0 auto; display: flex; color: var(--sp-accent); opacity: 0; transition: opacity 0.18s var(--sp-ease)"
      >${icon('star', 'sp-icon--filled')}</span>
      ${control}
    </div>`;
}

/**
 * Hidden gesture specimen: two rows of one list that reach the same action by two
 * different inputs. The first says so, with a star button anyone can see and press. The
 * second has no control at all, and a press held past the threshold stars it anyway.
 * Both states are on stage at rest, so nothing here has to stage a moment of discovery:
 * the term is the row that answers an input it never mentions.
 *
 * The subject is that second row rather than the list, since the term names the thing
 * with the unadvertised action and not the surface it sits on. The advertised row is left
 * out of the context register on purpose: the two rows have to look identical apart from
 * the missing button, and quieting one would say the difference is emphasis.
 *
 * The hold is really wired, on `pointerdown` plus a clock timer and really cancelled by
 * an early lift, so a reader who takes the stage over gets the gesture rather than a mime
 * of it. The pointer is captured on a trusted press (SPEC §7) so a real finger that
 * drifts off the row still finishes its hold; the scripted press needs no capture, and
 * synthetic pointers cannot be captured at all. Nothing counts the press down on screen,
 * which is the term: a progress ring would be the signifier this row is missing.
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 448px; height: 200px">
        <div class="sp-topbar sp-context" style="padding: 6px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Messages</span>
          <span class="sp-label" style="font-size: 11px">Starred stays at the top</span>
        </div>

        <div class="sp-body" data-touch style="display: flex; flex-direction: column; justify-content: center; gap: 10px; padding: 12px">
          <div class="sp-surface" style="overflow: hidden">
            <div class="sp-list">${ROWS.map(row).join('')}</div>
          </div>
        </div>
      </div>

      <!-- The caption sits outside the frame on purpose: a line of app copy naming the
           gesture would be the signifier this row is missing. -->
      <p class="sp-label" data-stage-verdict data-part="caption" style="margin: 0; width: 448px; font-size: 11px">
        Both rows star. Only one of them says so.
      </p>
    </div>
  `;

  const star = (key: string) => {
    const target = part(root, `row-${key}`);
    flag(target, 'data-starred', true);
    part(root, `badge-${key}`).style.opacity = '1';
  };

  // The advertised path: a control that says what it does, pressed once.
  part(root, 'star-button').addEventListener('click', () => star('advertised'));

  const hiddenRow = part(root, 'row-hidden');
  let timer: number | undefined;

  const cancel = () => {
    clock.clearTimeout(timer);
    timer = undefined;
  };

  hiddenRow.addEventListener('pointerdown', (event) => {
    if (event.isTrusted) hiddenRow.setPointerCapture(event.pointerId);
    cancel();
    timer = clock.setTimeout(() => {
      timer = undefined;
      star('hidden');
    }, HOLD_MS);
  });

  // A lift inside the threshold is just a press that reached nothing, which is how a
  // reader who has never been told about the gesture leaves this row every time.
  hiddenRow.addEventListener('pointerup', cancel);
  hiddenRow.addEventListener('pointercancel', cancel);
}
