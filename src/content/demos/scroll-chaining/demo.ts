import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/**
 * The spare strip the panel keeps below its last message. A browser spends leftover scroll
 * input on the page behind before the demo could ever see it, so the panel is given room
 * to receive it and the demo forwards it by hand, which is the same moment and the same
 * amount. The list is held at its end while that happens, so the strip is never on screen.
 */
const SPARE = 200;

const MESSAGES = [
  ['Ada', 'Ferry at 6 or the later one?'],
  ['Ada', 'The later one gets in after the shops shut'],
  ['Sam', 'Six then. I will bring the tickets'],
  ['Ada', 'Is the harbour car park still closed?'],
  ['Sam', 'Reopened last week'],
  ['Ada', 'Perfect. Meet at the slipway'],
  ['Sam', 'Bring the tide table'],
  ['Ada', 'Already in the bag'],
];

const PARAGRAPHS = 7;

const CAPTION = {
  default: 'overscroll-behavior: auto (the default): the leftover goes to the page',
  contain: 'overscroll-behavior: contain: the leftover stops here',
} as const;

type Mode = keyof typeof CAPTION;

/**
 * Scroll chaining specimen: a message panel floating over an article, scrolled past its
 * last message so the gesture the panel cannot use reaches the page behind it. The subject
 * is the panel, since chaining is what an inner scroller does with input it has run out of
 * room for; the article, the rulers, and the mode control are the scene around it.
 *
 * The handoff is drawn by the demo rather than by the browser, for the same reason the
 * overscroll specimen draws its own edge answer: a scripted scroll assigns a position and
 * a browser clamps it silently, so nothing would be left to observe. The panel therefore
 * keeps a strip of spare room (`SPARE`) below its last message, holds the list at its end
 * while the pointer runs into that strip, and passes what it collects to the article. The
 * amount and the moment are the browser's; only the plumbing is the demo's. The panel is a
 * real scroller, and every kit scroller carries `overscroll-behavior: contain` so that no
 * gesture inside a specimen can ever move the page the specimen is on, which is the other
 * reason the handoff here is drawn rather than performed.
 *
 * Both scrollers keep their boxes and the rulers keep their widths, so a handoff moves
 * content and nothing else (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const messages = MESSAGES.map(
    ([who, text]) => `
      <li class="sp-list-item" style="align-items: flex-start; padding: 7px 8px">
        <span class="sp-label" style="width: 32px">${who}</span>
        <span class="sp-grow sp-text sp-text--ink" style="font-size: 12px">${text}</span>
      </li>`,
  ).join('');

  const article = Array.from(
    { length: PARAGRAPHS },
    (_, i) => `
      <div class="sp-stack" style="gap: 6px; margin-bottom: 14px">
        <span class="sp-heading" style="font-size: 13px">Section ${i + 1}</span>
        <span class="sp-line" style="width: 100%"></span>
        <span class="sp-line" style="width: 92%"></span>
        <span class="sp-line" style="width: 78%"></span>
      </div>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 272px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Harbour notes</span>
          <span class="sp-text" data-part="readout" style="width: 200px; text-align: right; white-space: nowrap">Scroll the panel to its end</span>
        </div>
        <div class="sp-body" style="position: relative; padding: 0">
          <div
            class="sp-context"
            data-part="page"
            data-moved="no"
            style="position: absolute; inset: 0; overflow: hidden; padding: 12px 14px"
          >
            <div data-part="page-content">${article}</div>
          </div>
          <div
            class="sp-scroll sp-surface"
            data-part="panel"
            data-subject
            data-pose="[data-mode=default]"
            data-mode="default"
            data-chain="room"
            style="position: absolute; right: 10px; top: 10px; bottom: 10px; width: 214px; box-shadow: var(--sp-shadow); scrollbar-width: none"
          >
            <div data-part="panel-content" style="transform: translateY(0px)">
              <ul class="sp-list" style="padding: 4px 5px">${messages}</ul>
              <div data-part="spare" aria-hidden="true" style="height: ${SPARE}px"></div>
            </div>
          </div>
        </div>
        <div class="sp-topbar sp-context" style="gap: 10px; border-bottom: 0; border-top: 1px solid var(--sp-line)">
          <span class="sp-label" style="width: 44px">Panel</span>
          <div class="sp-progress" data-part="panel-ruler" style="width: 74px"><div class="sp-progress-fill" style="--sp-value: 0%; transition: none"></div></div>
          <span class="sp-label" style="width: 34px">Page</span>
          <div class="sp-progress" data-part="page-ruler" style="width: 74px"><div class="sp-progress-fill" style="--sp-value: 0%; transition: none"></div></div>
          <sp-segmented class="sp-segmented sp-grow" data-part="mode" data-value="default" style="justify-content: flex-end">
            <button class="sp-segment" data-part="mode-default" value="default" style="padding: 5px 10px">auto</button>
            <button class="sp-segment" data-part="mode-contain" value="contain" style="padding: 5px 10px">contain</button>
          </sp-segmented>
        </div>
      </div>
      <span class="sp-label sp-context" data-part="caption">${CAPTION.default}</span>
    </div>
  `;

  const panel = part(root, 'panel');
  const panelContent = part(root, 'panel-content');
  const page = part(root, 'page');
  const readout = part(root, 'readout');
  const caption = part(root, 'caption');
  const panelBar = part(root, 'panel-ruler').firstElementChild as HTMLElement;
  const pageBar = part(root, 'page-ruler').firstElementChild as HTMLElement;

  // Measured on the mounted tree, before anything has been written to it: the last message
  // sits `end` px down, and everything past that is the spare strip.
  const end = Math.max(1, panel.scrollHeight - panel.clientHeight - SPARE);
  const pageEnd = Math.max(1, page.scrollHeight - page.clientHeight);

  const setBar = (bar: HTMLElement, ratio: number) => bar.style.setProperty('--sp-value', `${Math.min(1, ratio) * 100}%`);

  const chain = () => {
    const spent = Math.min(panel.scrollTop, end);
    const leftover = Math.max(0, panel.scrollTop - end);
    // The list is held at its last message while the pointer runs into the spare strip,
    // so the strip is only ever a counter and never a blank space someone can see.
    panelContent.style.transform = `translateY(${leftover}px)`;
    setBar(panelBar, spent / end);
    if (leftover === 0) {
      page.scrollTop = 0;
      page.dataset.moved = 'no';
      setBar(pageBar, 0);
      panel.dataset.chain = 'room';
      readout.textContent = 'Room left in the panel';
      return;
    }
    if (panel.dataset.mode === 'contain') {
      page.dataset.moved = 'no';
      setBar(pageBar, 0);
      panel.dataset.chain = 'blocked';
      readout.textContent = `${Math.round(leftover)} px spent on nothing`;
      return;
    }
    page.scrollTop = Math.min(pageEnd, leftover);
    page.dataset.moved = 'yes';
    setBar(pageBar, page.scrollTop / pageEnd);
    panel.dataset.chain = 'chained';
    readout.textContent = `${Math.round(leftover)} px handed to the page`;
  };

  panel.addEventListener('scroll', chain);

  part(root, 'mode').addEventListener('change', (event) => {
    const next: Mode = (event as CustomEvent<string>).detail === 'contain' ? 'contain' : 'default';
    panel.dataset.mode = next;
    caption.textContent = CAPTION[next];
    // Each mode is reached from the same starting position, so the two runs are comparable.
    panel.scrollTop = 0;
    chain();
  });
}
