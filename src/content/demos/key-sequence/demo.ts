import { icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/** How long the prefix stays pending, and how often the window is redrawn while it drains. */
const WINDOW_MS = 1600;
const TICK_MS = 60;

const LEADER = 'g';

const FOLDERS = [
  { key: 'inbox', name: 'Inbox', letter: 'i', glyph: 'inbox' },
  { key: 'starred', name: 'Starred', letter: 's', glyph: 'star' },
  { key: 'drafts', name: 'Drafts', letter: 'd', glyph: 'pencil' },
] as const;

const START = 'drafts';

/**
 * Key sequence specimen: a mail app where `g` then a letter picks a folder, with the pending
 * prefix drawn as it waits. The subject is the sequence readout, because the term names an
 * ordered run of presses that has no other body on screen: the folders are what the sequence
 * happens to do here, and the pending state is the only place the sequence itself is visible.
 * Everything around it (the folder row, the message pane, the frame) is scenery in the
 * context register.
 *
 * A press is a real keydown the player can synthesize (SPEC §8), so nothing here is mimed:
 * the same handler answers the script and a reader who takes the stage over and types the
 * sequence themselves. The three endings the pending state can have are all demonstrated by
 * absolute presses: the expected key, an unexpected one, and the window running out.
 *
 * The readout holds its widths and the meter is always in the tree, so a sequence starting,
 * completing, or expiring moves nothing (SPEC §5).
 *
 * Two lines of the site's voice have gone. The title bar told the reader to "Type g then i,
 * s, or d", which the folder rows already show the way a mail app really shows a shortcut,
 * and a line under the meter read "The prefix waits 1.6 s for the next key, then gives up."
 * The meter draws that window, and the readout names the expiry when it happens, so the
 * sentence was only the article repeating itself inside the frame.
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  const folders = FOLDERS.map(
    ({ key, name, letter, glyph }) => `
      <span
        class="sp-nav-item"
        data-part="nav-${key}"
        ${key === START ? 'data-current' : ''}
        style="display: flex; align-items: center; gap: 8px; width: 138px"
      >
        ${icon(glyph)}
        <span class="sp-grow">${name}</span>
        <span class="sp-kbd" style="font-size: 10px">${LEADER} ${letter}</span>
      </span>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 254px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Mail</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 10px">
          <div
            class="sp-surface"
            data-part="sequence"
            data-subject
            data-state="idle"
            style="display: flex; flex-direction: column; gap: 8px; padding: 10px 12px"
          >
            <div class="sp-row" style="gap: 8px">
              <span class="sp-kbd" data-part="chip-lead" style="min-width: 22px">${LEADER}</span>
              <span class="sp-label" style="font-size: 11px">then</span>
              <span class="sp-kbd" data-part="chip-next" style="min-width: 22px">?</span>
              <span class="sp-grow"></span>
              <span
                class="sp-text sp-text--ink"
                data-part="verdict"
                style="width: 246px; text-align: right; white-space: nowrap; font-size: 12px"
              >No sequence started</span>
            </div>
            <div class="sp-progress" data-part="meter" style="--sp-value: 0%">
              <div class="sp-progress-fill" style="transition: width ${TICK_MS}ms linear"></div>
            </div>
          </div>
          <div class="sp-row sp-context" style="gap: 8px">${folders}</div>
          <div class="sp-stack sp-context sp-grow" data-part="pane" style="gap: 6px; justify-content: center">
            <span class="sp-label" data-part="pane-title" style="font-size: 11px">Drafts, 2 conversations</span>
            <span class="sp-line" style="width: 70%"></span>
            <span class="sp-line" style="width: 52%"></span>
          </div>
        </div>
      </div>
    </div>
  `;

  const sequence = part(root, 'sequence');
  const lead = part(root, 'chip-lead');
  const next = part(root, 'chip-next');
  const verdict = part(root, 'verdict');
  const meter = part(root, 'meter');
  const paneTitle = part(root, 'pane-title');

  let timer: number | undefined;
  let left = 0;
  let pending = false;
  let current: string = START;

  const say = (state: string, text: string) => {
    sequence.dataset.state = state;
    verdict.textContent = text;
  };

  const litLead = (on: boolean) => {
    lead.style.borderColor = on ? 'var(--sp-accent)' : '';
    lead.style.color = on ? 'var(--sp-ink)' : '';
    lead.style.background = on ? 'var(--sp-accent-soft)' : '';
  };

  const drawMeter = (fraction: number) => {
    meter.style.setProperty('--sp-value', `${Math.max(0, Math.min(1, fraction)) * 100}%`);
  };

  const stopPending = () => {
    clock.clearTimeout(timer);
    timer = undefined;
    pending = false;
    left = 0;
    litLead(false);
    drawMeter(0);
  };

  const tick = () => {
    left -= TICK_MS;
    drawMeter(left / WINDOW_MS);
    if (left > 0) {
      timer = clock.setTimeout(tick, TICK_MS);
      return;
    }
    stopPending();
    next.textContent = '?';
    say('expired', `${LEADER} expired after ${WINDOW_MS / 1000} s, nothing ran`);
  };

  // Reached, never flipped (SPEC §8): the leader always starts a fresh window, so a resumed
  // pass can never press `g` into a state where it means something else.
  const beginPending = () => {
    stopPending();
    pending = true;
    left = WINDOW_MS;
    litLead(true);
    next.textContent = '?';
    drawMeter(1);
    say('pending', `${LEADER} is pending, waiting for the next key`);
    timer = clock.setTimeout(tick, TICK_MS);
  };

  const goTo = (key: string, letter: string, name: string) => {
    current = key;
    for (const folder of FOLDERS) flag(part(root, `nav-${folder.key}`), 'data-current', folder.key === current);
    paneTitle.textContent = `${name}, 2 conversations`;
    next.textContent = letter;
    say('done', `${LEADER} ${letter} completed: ${name}`);
  };

  root.addEventListener('keydown', (event) => {
    const key = event.key.toLowerCase();
    if (!pending) {
      if (key === LEADER) return beginPending();
      const alone = FOLDERS.find((folder) => folder.letter === key);
      if (alone) say('stray', `${key} alone is not a shortcut here`);
      return;
    }
    stopPending();
    const chosen = FOLDERS.find((folder) => folder.letter === key);
    if (chosen) return goTo(chosen.key, chosen.letter, chosen.name);
    next.textContent = '?';
    if (key === 'escape') return say('cancelled', `${LEADER} cancelled by Escape`);
    say('miss', `${LEADER} ${key} is not a sequence, cancelled`);
  });
}
