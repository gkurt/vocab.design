import { type IconName, icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/** The wait the gesture is made of, and how often the ring is repainted while it runs. */
const HOLD_MS = 480;
const TICK_MS = 60;

const TILE = [
  'position: relative',
  'display: flex',
  'align-items: flex-end',
  'overflow: hidden',
  'height: 60px',
  'padding: 0',
  'user-select: none',
].join('; ');

const CAPTION = ['width: 100%', 'padding: 2px 6px', 'background: rgb(16 24 40 / 0.42)', 'color: #ffffff', 'font-size: 11px'].join('; ');

const THUMBS = [
  { name: 'Dock', wash: 'linear-gradient(#a8c8e4, #cdd8c8)' },
  { name: 'Harbour', wash: 'linear-gradient(#efc59d, #90a6b7)' },
  { name: 'Ferry', wash: 'linear-gradient(#b8caa7, #70889b)' },
];

const ACTIONS: { key: string; label: string; glyph: IconName; done: string }[] = [
  { key: 'share', label: 'Share', glyph: 'share', done: 'Shared' },
  { key: 'album', label: 'Add to album', glyph: 'plus', done: 'Added to album' },
  { key: 'delete', label: 'Delete', glyph: 'trash', done: 'Deleted' },
];

/**
 * Long press specimen: a photo tile where a lift inside the threshold is a tap and a
 * press that outlasts it opens the quick actions. The subject is that one tile, since
 * the term names the gesture the tile answers rather than the menu it produces or the
 * grid it sits in.
 *
 * The hold is really wired, on `pointerdown` plus a clock timer, and really cancelled
 * by an early lift, so a reader who takes the stage over gets the gesture rather than a
 * mime of it. Nothing is re-parented between the press and the release: the ring and
 * the menu are in the tree from mount and only their attributes change, because
 * rebuilding the node under the finger cancels the gesture halfway through.
 *
 * There is no hold step in the choreography vocabulary (SPEC §8), so the scripted pass
 * reaches the held state through a labelled simulation control outside the frame. It
 * runs the same countdown the finger does, and it is instrumentation, so it is scenery.
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  const tiles = THUMBS.map(({ name, wash }, index) => {
    const subject = index === 1;
    return `
      <div
        class="sp-surface${subject ? '' : ' sp-context'}"
        ${subject ? 'data-part="tile" data-subject role="button" tabindex="0" aria-haspopup="menu"' : ''}
        style="${TILE}; background: ${wash}; cursor: ${subject ? 'pointer' : 'default'}; touch-action: none; transition: transform 0.16s var(--sp-ease), box-shadow 0.16s var(--sp-ease)"
      >
        <span style="${CAPTION}">${name}</span>
        ${
          subject
            ? `<span
                 data-part="ring"
                 style="position: absolute; left: 50%; top: 50%; width: 36px; height: 36px; margin: -18px 0 0 -18px; border-radius: 50%; pointer-events: none; opacity: 0; transition: opacity 0.12s; background: conic-gradient(var(--sp-accent) calc(var(--sp-hold, 0) * 1turn), rgb(255 255 255 / 0.5) 0); mask: radial-gradient(circle, transparent 11px, #000 12px)"
               ></span>`
            : ''
        }
      </div>`;
  }).join('');

  const items = ACTIONS.map(
    ({ key, label, glyph }) => `
      <button class="sp-menu-item" type="button" role="menuitem" data-part="action-${key}">
        ${icon(glyph)}
        ${label}
      </button>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Library</span>
          <span class="sp-text" data-part="readout" style="width: 168px; text-align: right">Hold a photo for actions</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center">
          <div style="position: relative; width: 300px">
            <div class="sp-grid" style="grid-template-columns: repeat(3, 1fr)">${tiles}</div>
            <div
              class="sp-menu"
              data-part="menu"
              role="menu"
              aria-label="Photo actions"
              style="left: 50%; top: calc(100% + 8px); margin-left: -76px; min-width: 152px; transform-origin: top center"
            >${items}</div>
          </div>
        </div>
      </div>
      <button class="sp-button sp-button--ghost sp-button--sm sp-context" type="button" data-part="sim">Simulate a ${HOLD_MS} ms hold</button>
    </div>
  `;

  const tile = part(root, 'tile');
  const ring = part(root, 'ring');
  const menu = part(root, 'menu');
  const readout = part(root, 'readout');

  let timer: number | undefined;
  let elapsed = 0;
  let held = false;

  const say = (text: string) => {
    readout.textContent = text;
  };

  const clearHold = () => {
    clock.clearTimeout(timer);
    timer = undefined;
    elapsed = 0;
    ring.style.setProperty('--sp-hold', '0');
    ring.style.opacity = '0';
  };

  const commit = () => {
    clearHold();
    held = true;
    flag(tile, 'data-held', true);
    tile.removeAttribute('data-tapped');
    // A transform, so the tile can rise without moving the tiles beside it (SPEC §5).
    tile.style.transform = 'scale(1.04)';
    tile.style.boxShadow = 'var(--sp-shadow)';
    flag(menu, 'data-open', true);
    say('Held: quick actions');
  };

  const tick = () => {
    elapsed += TICK_MS;
    ring.style.setProperty('--sp-hold', String(Math.min(elapsed / HOLD_MS, 1)));
    if (elapsed >= HOLD_MS) return commit();
    timer = clock.setTimeout(tick, TICK_MS);
  };

  /** Start the countdown, and pay for it while it runs: the ring is the cancel affordance. */
  const beginHold = () => {
    if (held) return;
    clearHold();
    ring.style.opacity = '1';
    say('Holding');
    timer = clock.setTimeout(tick, TICK_MS);
  };

  const dismiss = (outcome: string) => {
    held = false;
    clearHold();
    tile.removeAttribute('data-held');
    tile.style.transform = '';
    tile.style.boxShadow = '';
    flag(menu, 'data-open', false);
    say(outcome);
  };

  tile.addEventListener('pointerdown', beginHold);

  // An early lift is not a failed hold, it is a tap, and the tap has to be worth
  // something of its own or every press short of the threshold reads as broken.
  tile.addEventListener('pointerup', () => {
    if (held || timer === undefined) return;
    clearHold();
    flag(tile, 'data-tapped', true);
    say('Tapped: preview');
  });

  for (const event of ['pointercancel', 'pointerleave'] as const) {
    tile.addEventListener(event, () => {
      if (!held) clearHold();
    });
  }

  for (const { key, done } of ACTIONS) part(root, `action-${key}`).addEventListener('click', () => dismiss(done));

  // Light dismiss, so the menu is never left open behind the reader's back.
  root.addEventListener('pointerdown', (event) => {
    const at = event.target as Node;
    if (held && !tile.contains(at) && !menu.contains(at)) dismiss('Dismissed');
  });

  part(root, 'sim').addEventListener('click', beginHold);
}
