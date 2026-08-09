import { part } from '#src/kit/parts.ts';

const SECTIONS = [
  { id: 'overview', title: 'Overview' },
  { id: 'install', title: 'Install' },
  { id: 'tokens', title: 'Tokens' },
  { id: 'api', title: 'API' },
  { id: 'theming', title: 'Theming' },
  { id: 'faq', title: 'FAQ' },
];

/**
 * Scroll spy specimen: the navigation reads the scroll position and marks the
 * section you are actually looking at. The document is scenery; the nav that
 * keeps itself in sync is the term.
 */
export function mount(root: HTMLElement): void {
  const nav = SECTIONS.map(
    (section, index) =>
      `<li><span class="sp-nav-item" data-part="nav-${section.id}"${index === 0 ? ' data-current' : ''}>${section.title}</span></li>`,
  ).join('');
  const doc = SECTIONS.map(
    (section) => `
      <section data-part="section-${section.id}" style="padding-bottom: 18px">
        <div class="sp-heading">${section.title}</div>
        <div class="sp-stack" style="margin-top: 8px">
          <div class="sp-line" style="width: 92%"></div>
          <div class="sp-line" style="width: 78%"></div>
          <div class="sp-line" style="width: 86%"></div>
          <div class="sp-line" style="width: 60%"></div>
        </div>
      </section>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="flex-direction: row; height: 250px">
        <nav data-part="nav" data-subject aria-label="On this page"
             style="width: 132px; flex: 0 0 auto; padding: 12px 10px; border-right: 1px solid var(--sp-line)">
          <span class="sp-label">On this page</span>
          <ul class="sp-nav" style="margin-top: 8px">${nav}</ul>
        </nav>
        <div class="sp-scroll sp-context" data-part="doc" style="flex: 1 1 auto; padding: 12px">${doc}</div>
      </div>
    </div>
  `;

  const pane = part(root, 'doc');
  const items = SECTIONS.map((section) => part(root, `nav-${section.id}`));

  const sync = () => {
    const threshold = pane.getBoundingClientRect().top + 24;
    let current = SECTIONS[0]?.id;
    for (const section of SECTIONS) {
      if (part(root, `section-${section.id}`).getBoundingClientRect().top <= threshold) current = section.id;
    }
    // The last section can be too short to ever reach the threshold: at the end
    // of the scroll, it is the one being read.
    if (pane.scrollTop + pane.clientHeight >= pane.scrollHeight - 2) current = SECTIONS.at(-1)?.id;
    for (const item of items) item.removeAttribute('data-current');
    if (current) part(root, `nav-${current}`).setAttribute('data-current', '');
  };

  pane.addEventListener('scroll', sync);

  // The nav still navigates: spying is what it does on the way back.
  SECTIONS.forEach((section) => {
    part(root, `nav-${section.id}`).addEventListener('click', () => {
      const offset = part(root, `section-${section.id}`).getBoundingClientRect().top - pane.getBoundingClientRect().top;
      pane.scrollBy({ top: offset, behavior: 'smooth' });
    });
  });
}
