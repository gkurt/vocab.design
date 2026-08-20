import { part } from '#src/kit/parts.ts';

const PANEL_W = 214;
const PANEL_H = 182;

const COMMITTED =
  'Take one tablet with water. Do not take more than one tablet in any six hour period, and tell your doctor if you already take blood thinners. Stop and call the clinic if the swelling returns.';
const SKIMMED =
  'Our platform empowers modern teams to unlock seamless collaboration, so you can deliver world class outcomes together at scale, wherever work happens. Built for the way teams work now.';

/** The seven words the skimming eye actually stopped on, by index into the blurb. */
const SKIMMED_FIXATIONS = [0, 1, 3, 8, 13, 18, 25];

const words = (text: string) =>
  text
    .split(' ')
    .map((word) => `<span data-word>${word}</span>`)
    .join(' ');

/**
 * Commitment pattern specimen: the same reader on two pages at once, with every fixation
 * drawn as a dot on the word it landed on.
 *
 * The subject is the dense trace over the page the reader is committed to. The term names
 * where fixations land rather than a component, so the narrowest element it names is the
 * figure tracing them (SPEC §5), and the sparse trace beside it is the scene that makes the
 * claim legible: this pattern is the exception, so the specimen has to show the rule next to
 * it. Both traces are drawn from the rendered word boxes, so the dots sit on real words, and
 * neither takes pointer events.
 */
export function mount(root: HTMLElement): void {
  const panel = (key: string, title: string, note: string, text: string) => `
    <div data-part="${key}-page" style="position: relative; flex: 0 0 auto; width: ${PANEL_W}px; height: ${PANEL_H}px; overflow: hidden; background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: var(--sp-radius)">
      <div class="sp-context" style="padding: 11px 12px">
        <span class="sp-heading" style="display: block; font-size: 12px">${title}</span>
        <span class="sp-label" style="display: block; margin: 2px 0 7px">${note}</span>
        <p data-part="${key}-text" style="margin: 0; font-size: 11px; line-height: 1.62">${words(text)}</p>
      </div>
      <div data-part="${key}-trace" ${key === 'read' ? 'data-subject' : ''} style="position: absolute; pointer-events: none"></div>
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 300px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">One reader, two blocks of text</span>
          <span class="sp-label">fixations plotted</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 9px; padding: 10px 12px">
          <div class="sp-row" style="gap: 12px; align-items: flex-start">
            ${panel('read', 'Dose and interactions', 'committed: every word', COMMITTED)}
            ${panel('skim', 'Why teams choose us', 'not committed: a glance', SKIMMED)}
          </div>
          <span class="sp-text sp-context" data-part="readout" style="height: 40px; max-width: 440px; text-align: center"></span>
        </div>
      </div>
    </div>
  `;

  /**
   * The dots are measured rather than stated: a fixation lands on a word, and only the
   * rendered line breaks know where the words are. Word spans are static text boxes with
   * nothing transitioned, and the read happens at mount, on the state being measured.
   */
  const draw = (key: string, indices: number[] | 'all', size: number, opacity: number) => {
    const page = part(root, `${key}-page`);
    const trace = part(root, `${key}-trace`);
    const pageBox = page.getBoundingClientRect();
    const all = [...part(root, `${key}-text`).querySelectorAll<HTMLElement>('[data-word]')];
    const picked = indices === 'all' ? all : all.filter((_, index) => indices.includes(index));

    const spots = picked.map((span) => {
      const box = span.getBoundingClientRect();
      return { x: box.left + box.width / 2 - pageBox.left, y: box.top + box.height / 2 - pageBox.top };
    });
    if (!spots.length) return;

    const left = Math.min(...spots.map((s) => s.x)) - size;
    const top = Math.min(...spots.map((s) => s.y)) - size;
    const right = Math.max(...spots.map((s) => s.x)) + size;
    const bottom = Math.max(...spots.map((s) => s.y)) + size;

    trace.style.left = `${left}px`;
    trace.style.top = `${top}px`;
    trace.style.width = `${right - left}px`;
    trace.style.height = `${bottom - top}px`;
    trace.innerHTML = spots
      .map(
        ({ x, y }) =>
          `<span style="position: absolute; left: ${x - left - size / 2}px; top: ${y - top - size / 2}px; width: ${size}px; height: ${size}px; border-radius: 50%; background: var(--sp-accent); opacity: ${opacity}"></span>`,
      )
      .join('');
    return spots.length;
  };

  draw('read', 'all', 9, 0.5);
  const skimmed = draw('skim', SKIMMED_FIXATIONS, 9, 0.5) ?? 0;

  part(root, 'readout').textContent =
    `A fixation on nearly every word of the dose, because getting it wrong costs the reader. The blurb beside it got ${skimmed}.`;
}
