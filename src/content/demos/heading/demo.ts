/** One step of the outline: the words, the treatment that places it, and the level it is. */
const LEVELS = [
  { tag: 'h1', text: 'Payments', size: 23, gap: 0, lines: 2 },
  { tag: 'h2', text: 'Refunds', size: 16.5, gap: 15, lines: 2 },
  { tag: 'h3', text: 'Partial refunds', size: 13.5, gap: 13, lines: 2 },
];

/**
 * Heading specimen: three levels of one document, set on a scale, with the copy
 * under each reduced to texture so the eye reads the headings rather than the
 * words. The space above each is larger than the space below it, which is what
 * ties a heading to the section it names.
 *
 * The subject is one heading, the h2, rather than the set of three. A heading is
 * a single line of type, so the narrowest element the term names is that line;
 * ringing all three would be claiming the term is the outline, which is a
 * different word. The other two levels stay on stage as the scale it is read
 * against, and the level tags at the right are the specimen's own annotation.
 */
export function mount(root: HTMLElement): void {
  const block = ({ tag, text, size, gap, lines }: (typeof LEVELS)[number]) => {
    const subject = tag === 'h2' ? ' data-subject' : '';
    const width = (i: number) => (i === lines - 1 ? 62 : 100);
    const copy = Array.from({ length: lines }, (_, i) => `<div class="sp-line" style="width: ${width(i)}%"></div>`).join('');
    return `
      <div style="margin-top: ${gap}px">
        <div class="sp-row" style="gap: 10px; margin-bottom: 7px">
          <${tag} class="sp-grow" data-part="${tag}"${subject}
                  style="margin: 0; font-size: ${size}px; font-weight: 600; line-height: 1.25">${text}</${tag}>
          <span class="sp-label sp-context" style="font-variant-numeric: tabular-nums">${tag}</span>
        </div>
        <div class="sp-stack sp-context" data-part="copy-${tag}" style="gap: 6px">${copy}</div>
      </div>`;
  };

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 430px">
        ${LEVELS.map(block).join('')}
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin-top: 14px">
          Size and weight say how deep in the outline a section sits.
        </p>
      </div>
    </div>
  `;
}
