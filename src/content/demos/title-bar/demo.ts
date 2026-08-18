import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** The window controls the bar carries. Scenery here: the term is the strip, not the buttons. */
const DOTS = [
  { name: 'dot-close', fill: '#ff5f57' },
  { name: 'dot-min', fill: '#febc2e' },
  { name: 'dot-zoom', fill: '#28c840' },
];

const dot = ({ name, fill }: { name: string; fill: string }) => `
  <span
    data-part="${name}"
    data-fill="${fill}"
    aria-hidden="true"
    style="width: 12px; height: 12px; border-radius: 50%; background: ${fill}; box-shadow: inset 0 0 0 1px rgb(0 0 0 / 0.16)"
  ></span>`;

const tool = (name: string, label: string, mark: string) => `
  <button class="sp-icon-button" type="button" data-part="${name}" aria-label="${label}" style="width: 26px; height: 26px">${mark}</button>`;

const NOTE: Record<string, string> = {
  classic: 'Classic: the title sits centred in a strip of its own, the tools below it.',
  unified: 'Unified: one strip carries the window name and the document tools together.',
  inactive: 'Inactive: this window is not frontmost, so the strip dims and the document does not.',
};

/**
 * Title bar specimen: one document window whose top strip is shown in three registers. The
 * classic bar centres the window's name and leaves the tools on a row of their own; the
 * unified bar pulls those tools up into the same strip; the inactive bar dims because the
 * window is no longer frontmost.
 *
 * The subject is the strip, `data-part="bar"`, and nothing else. The window controls sit in
 * it and the tools move into it, but both are scenery: the term names the strip that carries
 * a window's name, its controls and its drag region. It is honestly a title bar in all three
 * registers, dimmed included, so no `data-pose` condition is needed.
 *
 * The strip keeps one height in every register and the two tool slots are both fixed boxes,
 * so moving the tools between them moves nothing else (SPEC §5), and the picker names an
 * absolute register rather than flipping whatever it finds (SPEC §8). Dragging the strip
 * moves the window, clamped so it can never leave the scene, which is the one behaviour a
 * title bar has that its buttons do not.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div
        class="sp-frame sp-frame--wide"
        data-part="window"
        data-register="classic"
        style="width: 452px; height: 206px; box-shadow: var(--sp-shadow)"
      >
        <div
          class="sp-topbar"
          data-part="bar"
          data-subject
          data-register="classic"
          style="height: 46px; padding: 0 10px; gap: 0; cursor: move"
        >
          <div class="sp-context" data-part="controls" style="display: flex; align-items: center; gap: 8px; flex: 0 0 auto; width: 100px">
            ${DOTS.map(dot).join('')}
          </div>
          <div data-part="title-slot" style="position: relative; flex: 1 1 auto; min-width: 0; height: 18px">
            <span
              data-part="title"
              data-place="centre"
              style="position: absolute; inset: 0; font-size: 12px; font-weight: 500; line-height: 18px; text-align: center;
                     white-space: nowrap; overflow: hidden"
            >Notes on lighting</span>
          </div>
          <div data-part="slot-bar" style="display: flex; align-items: center; justify-content: flex-end; gap: 4px; flex: 0 0 auto; width: 100px; height: 26px"></div>
        </div>

        <div class="sp-body sp-context" style="display: flex; flex-direction: column; gap: 10px; padding: 0 14px 14px">
          <div
            data-part="slot-row"
            style="display: flex; align-items: center; gap: 4px; flex: 0 0 auto; height: 38px; margin: 0 -14px; padding: 0 12px;
                   border-bottom: 1px solid var(--sp-line)"
          >
            <div class="sp-row" data-part="tools" data-in="row" style="gap: 4px">
              ${tool('tool-search', 'Search the document', icon('search'))}
              ${tool('tool-edit', 'Edit', icon('pencil'))}
              ${tool('tool-share', 'Share', icon('share'))}
            </div>
          </div>

          <span class="sp-heading" style="font-size: 13px">Warm lamps, cold windows</span>
          <div class="sp-line" style="width: 100%"></div>
          <div class="sp-line" style="width: 94%"></div>
          <div class="sp-line" style="width: 98%"></div>
          <div class="sp-line" style="width: 58%"></div>
        </div>
      </div>

      <div class="sp-stack sp-context" style="align-items: center; gap: 8px; width: 452px">
        <sp-segmented class="sp-segmented" data-part="picker" data-value="classic">
          <button class="sp-segment" type="button" data-part="seg-classic" value="classic" style="padding: 4px 10px; font-size: 12px">Classic</button>
          <button class="sp-segment" type="button" data-part="seg-unified" value="unified" style="padding: 4px 10px; font-size: 12px">Unified</button>
          <button class="sp-segment" type="button" data-part="seg-inactive" value="inactive" style="padding: 4px 10px; font-size: 12px">Inactive</button>
        </sp-segmented>
        <span
          class="sp-label"
          data-part="note"
          data-register="classic"
          role="status"
          style="height: 15px; font-size: 11px; line-height: 15px; white-space: nowrap; overflow: hidden"
        >${NOTE.classic}</span>
      </div>
    </div>
  `;

  const windowEl = part(root, 'window');
  const bar = part(root, 'bar');
  const title = part(root, 'title');
  const tools = part(root, 'tools');
  const slotRow = part(root, 'slot-row');
  const controls = part(root, 'controls');
  const note = part(root, 'note');
  const dots = DOTS.map((d) => part(root, d.name));

  const setRegister = (register: string) => {
    const unified = register === 'unified';
    const active = register !== 'inactive';

    tools.dataset.in = unified ? 'bar' : 'row';
    part(root, unified ? 'slot-bar' : 'slot-row').append(tools);
    // The row keeps its box either way, so the document below never moves. Its rule goes
    // with the tools: one strip in the unified register, two in the others.
    slotRow.style.borderBottom = unified ? '1px solid transparent' : '1px solid var(--sp-line)';

    title.dataset.place = unified ? 'left' : 'centre';
    title.style.textAlign = unified ? 'left' : 'center';
    // Both end slots are the same width where the title is centred, so it centres on the
    // window rather than on what is left over. The unified bar sets the name beside the
    // controls instead, which only moves where the title starts.
    controls.style.width = unified ? '64px' : '100px';

    // Inactive dims the strip and only the strip: colour, never opacity, so the bar stays a
    // real box with real ink for identify to ring (SPEC §8).
    bar.style.background = active ? 'var(--sp-surface)' : 'var(--sp-sunken)';
    title.style.color = active ? 'var(--sp-ink)' : 'var(--sp-muted)';
    for (const [i, el] of dots.entries()) el.style.background = active ? (DOTS[i]?.fill ?? '') : 'var(--sp-line)';
    windowEl.style.boxShadow = active ? 'var(--sp-shadow)' : 'none';

    bar.dataset.register = register;
    windowEl.dataset.register = register;
    note.dataset.register = register;
    note.textContent = NOTE[register] ?? '';
  };

  part(root, 'picker').addEventListener('change', (event) => setRegister((event as CustomEvent<string>).detail));

  // The drag region: grabbing the strip moves the window. Clamped, so the window can never
  // be dragged out of the scene, and the tools inside the bar keep their own clicks.
  let held: { x: number; y: number; dx: number; dy: number } | undefined;
  let offset = { x: 0, y: 0 };
  const clamp = (n: number, limit: number) => Math.min(limit, Math.max(-limit, n));

  bar.addEventListener('pointerdown', (event) => {
    if ((event.target as Element | null)?.closest('button')) return;
    held = { x: (event as PointerEvent).clientX, y: (event as PointerEvent).clientY, dx: offset.x, dy: offset.y };
  });

  root.addEventListener('pointermove', (event) => {
    if (!held) return;
    offset = {
      x: clamp(held.dx + (event as PointerEvent).clientX - held.x, 34),
      y: clamp(held.dy + (event as PointerEvent).clientY - held.y, 18),
    };
    windowEl.style.translate = `${offset.x}px ${offset.y}px`;
  });

  const release = () => {
    held = undefined;
  };
  root.addEventListener('pointerup', release);
  root.addEventListener('pointercancel', release);

  setRegister('classic');
}
