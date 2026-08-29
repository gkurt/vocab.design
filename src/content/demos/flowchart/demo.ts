import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

const MONO = 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';
/** The picture's box, stated: the diagram is drawn into it, never measured out of it. */
const PLOT = { w: 242, h: 196 };
const BOX = { h: 32, wide: 112, narrow: 98 };
/** Four source lines are always reserved, so adding one moves nothing (SPEC §5). */
const LINES = 4;

type Shape = 'step' | 'decision';
type Node = { id: string; label: string; shape: Shape };
type Edge = { from: string; to: string; label?: string };
type Source = { text: string[]; nodes: Node[]; edges: Edge[]; note: string };

/**
 * Two versions of the same source. The picture is derived from them and nothing in the
 * demo carries a coordinate, which is the term's whole modern claim: the author writes
 * the steps and the engine decides where they sit.
 */
const SOURCES: Record<'linear' | 'branch', Source> = {
  linear: {
    text: ['flowchart TD', '  A[Submit] --> B[Validate]', '  B --> C[Save record]'],
    nodes: [
      { id: 'A', label: 'Submit', shape: 'step' },
      { id: 'B', label: 'Validate', shape: 'step' },
      { id: 'C', label: 'Save record', shape: 'step' },
    ],
    edges: [
      { from: 'A', to: 'B' },
      { from: 'B', to: 'C' },
    ],
    note: 'Three steps, one path: the engine stacked them in the order the text names.',
  },
  branch: {
    text: ['flowchart TD', '  A[Submit] --> B{Valid?}', '  B -- yes --> C[Save record]', '  B -- no --> D[Show error]'],
    nodes: [
      { id: 'A', label: 'Submit', shape: 'step' },
      { id: 'B', label: 'Valid?', shape: 'decision' },
      { id: 'C', label: 'Save record', shape: 'step' },
      { id: 'D', label: 'Show error', shape: 'step' },
    ],
    edges: [
      { from: 'A', to: 'B' },
      { from: 'B', to: 'C', label: 'yes' },
      { from: 'B', to: 'D', label: 'no' },
    ],
    note: 'One line more, and the whole picture is re-placed: the branch was never drawn by hand.',
  },
};

const START = 'linear';

/** Rank by longest path from the root, the layered arrangement this shape is read in. */
function ranks(source: Source): Map<string, number> {
  const rank = new Map<string, number>();
  for (const node of source.nodes) rank.set(node.id, 0);
  for (let pass = 0; pass < source.nodes.length; pass++) {
    for (const edge of source.edges) {
      const next = (rank.get(edge.from) ?? 0) + 1;
      if (next > (rank.get(edge.to) ?? 0)) rank.set(edge.to, next);
    }
  }
  return rank;
}

type Placed = Node & { cx: number; cy: number; w: number; h: number };

/** Where every box lands, given only the ranks and how many share one. */
function place(source: Source): Placed[] {
  const rank = ranks(source);
  const depth = Math.max(...[...rank.values()]) + 1;
  const rows = (r: number) => source.nodes.filter((node) => rank.get(node.id) === r);
  return source.nodes.map((node) => {
    const r = rank.get(node.id) ?? 0;
    const row = rows(r);
    const index = row.indexOf(node);
    const w = row.length > 1 ? BOX.narrow : BOX.wide;
    return {
      ...node,
      w,
      h: BOX.h,
      cx: (PLOT.w * (index + 0.5)) / row.length,
      cy: (PLOT.h * (r + 0.5)) / depth,
    };
  });
}

function shapeMarkup(node: Placed): string {
  if (node.shape === 'decision') {
    const half = node.h / 2 + 5;
    const points = `${node.cx},${node.cy - half} ${node.cx + node.w / 2},${node.cy} ${node.cx},${node.cy + half} ${node.cx - node.w / 2},${node.cy}`;
    return `<polygon points="${points}" fill="var(--sp-accent-soft)" stroke="var(--sp-accent)" stroke-width="1.6"></polygon>`;
  }
  return `<rect x="${node.cx - node.w / 2}" y="${node.cy - node.h / 2}" width="${node.w}" height="${node.h}" rx="5"
            fill="var(--sp-sunken)" stroke="var(--sp-line)" stroke-width="1.6"></rect>`;
}

/**
 * Flowchart specimen: a few lines of source on the left, the picture the engine draws from
 * them on the right, and a pick between two sources that changes the text and the diagram
 * together.
 *
 * The subject is the rendered diagram, which is the narrowest element the term names: the
 * source pane, the picker and the note are the instrument and wear the context register
 * (SPEC §5). Nothing here is draggable and there is no port to pull a line out of, which is
 * the whole distinction from a node graph: this picture is read, not operated.
 *
 * No coordinate is authored. Both sources declare steps and arrows only, and `place()`
 * ranks them by longest path and spreads each rank across the plot, so switching source
 * genuinely re-places every box the way a layout engine would.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: auto">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">signup.mmd</span>
          <sp-segmented class="sp-segmented" data-axis="Shape" data-part="picker" data-value="${START}">
            <button class="sp-segment" type="button" data-part="seg-linear" value="linear">one path</button>
            <button class="sp-segment" type="button" data-part="seg-branch" value="branch">a decision</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="padding: 12px; display: flex; flex-direction: column; gap: 8px">
          <div style="display: flex; gap: 10px; align-items: stretch">
            <div
              class="sp-context"
              data-part="source"
              style="flex: 0 0 auto; width: 196px; height: ${PLOT.h + 2}px; padding: 10px; background: var(--sp-surface);
                     border: 1px solid var(--sp-line); border-radius: var(--sp-radius); overflow: hidden"
            >
              <span class="sp-label" style="font-size: 10px">source</span>
              <div data-part="code" style="margin-top: 6px; font-family: ${MONO}; font-size: 10px; line-height: 17px; color: var(--sp-ink)">
                ${Array.from({ length: LINES }, (_, i) => `<div style="height: 17px; white-space: pre"><span data-part="line-${i + 1}"></span></div>`).join('')}
              </div>
            </div>
            <div style="flex: 1 1 auto; min-width: 0; background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: var(--sp-radius)">
              <svg
                data-part="diagram"
                data-subject
                data-mode="${START}"
                role="img"
                aria-label="Signup flowchart"
                viewBox="0 0 ${PLOT.w} ${PLOT.h}"
                style="display: block; width: ${PLOT.w}px; height: ${PLOT.h}px"
              >
                <defs>
                  <marker id="fc-arrow" viewBox="0 0 8 8" refX="6.5" refY="4" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M0 0 L 7 4 L 0 8 z" fill="var(--sp-muted)"></path>
                  </marker>
                </defs>
                <g data-part="arrows" fill="none" stroke="var(--sp-muted)" stroke-width="1.6"></g>
                <g data-part="boxes"></g>
              </svg>
            </div>
          </div>
          <span class="sp-text sp-context" data-part="note" style="height: 19px; font-size: 11px; overflow: hidden"></span>
        </div>
      </div>
    </div>
  `;

  const diagram = part(root, 'diagram');
  const arrows = part(root, 'arrows');
  const boxes = part(root, 'boxes');
  const note = part(root, 'note');
  const picker = part(root, 'picker') as HTMLElement & { value: string };

  const draw = (mode: string) => {
    const source = mode === 'branch' ? SOURCES.branch : SOURCES.linear;
    const placed = place(source);
    const at = (id: string) => placed.find((node) => node.id === id) as Placed;

    for (let i = 0; i < LINES; i++) part(root, `line-${i + 1}`).textContent = source.text[i] ?? '';

    boxes.innerHTML = placed
      .map(
        (node) => `
        <g data-part="node-${node.id}">
          ${shapeMarkup(node)}
          <text x="${node.cx}" y="${node.cy + 4}" text-anchor="middle" font-size="11" fill="var(--sp-ink)">${node.label}</text>
        </g>`,
      )
      .join('');

    arrows.innerHTML = source.edges
      .map(({ from, to, label }) => {
        const a = at(from);
        const b = at(to);
        const y1 = a.cy + (a.shape === 'decision' ? a.h / 2 + 5 : a.h / 2);
        const y2 = b.cy - (b.shape === 'decision' ? b.h / 2 + 5 : b.h / 2) - 5;
        const bend = (y2 - y1) / 2;
        // The label sits ON the line, in a box the paper shows through, because a branch
        // label placed beside a bend is the one a reader has to guess the owner of.
        const mid = { x: (a.cx + 3 * a.cx + 3 * b.cx + b.cx) / 8, y: (y1 + y2) / 2 };
        const tag = label
          ? `<g data-part="label-${from}-${to}" stroke="none">
               <rect x="${mid.x - 13}" y="${mid.y - 8}" width="26" height="16" rx="4" fill="var(--sp-surface)"></rect>
               <text x="${mid.x}" y="${mid.y + 3.5}" text-anchor="middle" font-size="10" fill="var(--sp-muted)">${label}</text>
             </g>`
          : '';
        return `<path data-part="arrow-${from}-${to}" d="M ${a.cx} ${y1} C ${a.cx} ${y1 + bend}, ${b.cx} ${y2 - bend}, ${b.cx} ${y2}"
                      marker-end="url(#fc-arrow)"></path>${tag}`;
      })
      .join('');

    diagram.dataset.mode = mode;
    note.textContent = source.note;
  };

  picker.addEventListener('change', (event) => draw((event as CustomEvent<string>).detail));
  draw(START);
}
