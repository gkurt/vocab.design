import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/*
 * The three members are drawn here rather than set in faces, because no superfamily is
 * loaded on this site and the claim being made is precisely that one skeleton is shared.
 * Every member is built from the same numbers: baseline 100, x-height top 40, stems 10
 * wide, the i's stem at 13, the n's at 14 and 54, the o on a 24 by 30 ellipse. What each
 * class is allowed to change is only what happens at the ends of the strokes, and, for
 * the monospace, the advance each letter is given.
 */
const BASE = 100;
const XTOP = 40;
const STEM = 10;
/** Proportional advances. The i is narrow, which is what the monospace has to answer for. */
const ADVANCE = { i: 26, o: 68, n: 68 } as const;
const MONO = 68;
const WORD = ['i', 'o', 'n'] as const;

type Letter = (typeof WORD)[number];
type Member = 'serif' | 'sans' | 'mono';

const MEMBERS: Record<Member, { name: string; note: string }> = {
  serif: { name: 'Serif', note: 'the same skeleton, with serifs and a modulated bowl' },
  sans: { name: 'Sans', note: 'the skeleton bare: no serifs, one stroke thickness' },
  mono: { name: 'Mono', note: 'the same drawing on one advance width, so the i is padded' },
};

const IS_MEMBER = (value: string): value is Member => value in MEMBERS;

const ink = 'fill="none" stroke="currentColor" stroke-linecap="butt"';

/** A slab at a stroke end: the only thing the serif member is allowed to add. */
const slab = (x: number, y: number, width: number, height: number) =>
  `<rect x="${x - width / 2}" y="${y}" width="${width}" height="${height}" fill="currentColor"/>`;

/** The o as a ring, so the serif member can thin its top and bottom without moving the outline. */
function ring(cx: number, cy: number, rx: number, ry: number, thickH: number, thickV: number): string {
  const inner = (irx: number, iry: number) =>
    `M ${cx - irx} ${cy} A ${irx} ${iry} 0 1 1 ${cx + irx} ${cy} A ${irx} ${iry} 0 1 1 ${cx - irx} ${cy} Z`;
  return `<path fill="currentColor" fill-rule="evenodd" d="${inner(rx, ry)} ${inner(rx - thickH, ry - thickV)}"/>`;
}

function glyph(letter: Letter, member: Member): string {
  const serif = member === 'serif';
  if (letter === 'i') {
    const stem = `<line ${ink} x1="13" x2="13" y1="${XTOP}" y2="${BASE}" stroke-width="${STEM}"/>`;
    const dot = `<circle cx="13" cy="26" r="5.5" fill="currentColor"/>`;
    return serif ? `${stem}${dot}${slab(13, BASE - 4, 24, 4)}${slab(13, XTOP, 18, 3.5)}` : `${stem}${dot}`;
  }
  if (letter === 'n') {
    const shoulder = `<path ${ink} d="M14 ${XTOP + 18} Q14 ${XTOP} 34 ${XTOP} Q54 ${XTOP} 54 ${XTOP + 18} L54 ${BASE}" stroke-width="${STEM}"/>`;
    const stem = `<line ${ink} x1="14" x2="14" y1="${XTOP}" y2="${BASE}" stroke-width="${STEM}"/>`;
    if (!serif) return `${stem}${shoulder}`;
    return `${stem}${shoulder}${slab(14, BASE - 4, 24, 4)}${slab(54, BASE - 4, 24, 4)}${slab(14, XTOP, 18, 3.5)}`;
  }
  return serif ? ring(34, 70, 24, 30, 11, 5.5) : ring(34, 70, 24, 30, STEM, STEM);
}

/** The word, laid out on the member's own advances. Returns the markup and its width. */
function word(member: Member): { markup: string; width: number } {
  let x = 0;
  const parts: string[] = [];
  for (const letter of WORD) {
    const natural = ADVANCE[letter];
    const advance = member === 'mono' ? MONO : natural;
    parts.push(`<g transform="translate(${x + (advance - natural) / 2} 0)">${glyph(letter, member)}</g>`);
    x += advance;
  }
  if (member === 'mono') {
    const cells = [MONO, MONO * 2]
      .map(
        (at) => `<line x1="${at}" x2="${at}" y1="8" y2="112" stroke="var(--sp-line)" stroke-width="2" vector-effect="non-scaling-stroke"/>`,
      )
      .join('');
    return { markup: `${cells}${parts.join('')}`, width: x };
  }
  return { markup: parts.join(''), width: x };
}

function board(member: Member, scale: number, label: string): string {
  const { markup, width } = word(member);
  return `<svg viewBox="0 0 ${width} 120" width="${Math.round(width * scale)}" height="${Math.round(120 * scale)}"
      role="img" aria-label="The word ion drawn in the ${label} member" style="display: block">${markup}</svg>`;
}

const PANEL = 0.58;
const SHOW = 0.6;

/**
 * Superfamily specimen: one word drawn as a serif, a sans and a monospace built from a
 * single set of numbers, with the x-height and baseline ruled straight across all three
 * so the shared skeleton is measurable rather than asserted. The monospace shows what a
 * class is allowed to change beyond the terminals: the i keeps its drawing and is given
 * the same advance as the n, which is why it sits in a cell of padding.
 *
 * The subject is the set of three members, the narrowest thing the term names: a
 * superfamily is the family, not any one of its members and not the specimen around it.
 * The enlarged member, the picker and the caption are the demo's own instrumentation and
 * sit in the context register (SPEC §5). No member is dishonest, so no `data-pose` is
 * needed.
 *
 * Both boxes are fixed and every member is drawn at the same scale, so picking a member
 * moves nothing (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const start: Member = 'serif';
  const xRule = Math.round(XTOP * PANEL);
  const baseRule = Math.round(BASE * PANEL);
  const rule = (top: number, color: string) =>
    `<span style="position: absolute; left: 0; right: 0; top: ${top}px; height: 2px; background: ${color}"></span>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-label">shown large</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Family" data-part="segmented" data-value="${start}">
            <button class="sp-segment" data-part="seg-serif" value="serif">serif</button>
            <button class="sp-segment" data-part="seg-sans" value="sans">sans</button>
            <button class="sp-segment" data-part="seg-mono" value="mono">mono</button>
          </sp-segmented>
        </div>
        <div class="sp-row sp-context" style="gap: 16px; margin-top: 6px; height: 76px; align-items: center">
          <div data-part="show" data-member="${start}" style="flex: 0 0 auto">${board(start, SHOW, MEMBERS[start].name)}</div>
          <p class="sp-text" data-part="note" style="margin: 0">${MEMBERS[start].note}</p>
        </div>
        <div data-part="set" data-subject class="sp-row" style="position: relative; gap: 18px; margin-top: 2px; height: ${Math.round(120 * PANEL)}px; align-items: flex-start">
          ${rule(xRule, 'color-mix(in oklab, var(--sp-accent) 55%, transparent)')}
          ${rule(baseRule, 'color-mix(in oklab, var(--sp-accent) 55%, transparent)')}
          ${(Object.keys(MEMBERS) as Member[])
            .map(
              (member) =>
                `<div data-part="member-${member}" style="position: relative">${board(member, PANEL, MEMBERS[member].name)}</div>`,
            )
            .join('')}
        </div>
        <div class="sp-row sp-context" style="gap: 18px; height: 18px">
          ${(Object.keys(MEMBERS) as Member[])
            .map(
              (member) =>
                `<span class="sp-label" style="width: ${Math.round(word(member).width * PANEL)}px">${MEMBERS[member].name.toLowerCase()}</span>`,
            )
            .join('')}
        </div>
        <p class="sp-text sp-context" data-part="caption" style="margin-top: 4px">
          The rules are the shared x-height and baseline.
        </p>
      </div>
    </div>
  `;

  const show = part(root, 'show');
  const note = part(root, 'note');

  part(root, 'segmented').addEventListener('change', (event) => {
    const value = (event as CustomEvent<string>).detail;
    if (!IS_MEMBER(value)) return;
    show.dataset.member = value;
    show.innerHTML = board(value, SHOW, MEMBERS[value].name);
    note.textContent = MEMBERS[value].note;
  });
}
