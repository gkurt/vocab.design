import { icon } from '#src/kit/icons.ts';
import { localSize } from '#src/kit/measure.ts';
import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/*
 * Checked in the browser first: the CJK glyphs render here (Hiragino Mincho ProN,
 * with Hiragino Sans and Yu Mincho behind it), `writing-mode: vertical-rl` lays
 * the columns out right to left, and `text-orientation` really does decide whether
 * the Latin run lies on its side or stands up. Nothing in this specimen is drawn
 * on: the type is doing the work, and the only ink the demo adds is the arrow
 * naming which way the lines advance.
 */
const FACE = "'Hiragino Mincho ProN', 'Hiragino Sans', 'Yu Mincho', 'Noto Serif JP', serif";
const SIZE = 26;
/** The passage box, sized for the taller of the two settings (SPEC §5). */
const BOX = { width: 384, height: 118 };

/** "This sample was set in CSS, vertically, in 2024." */
const PASSAGE = [
  { text: 'この見本は', part: 'run-open' },
  { text: 'CSS', part: 'run-latin' },
  { text: 'で', part: 'run-mid' },
  { text: '2024', part: 'run-digits' },
  { text: '年に組まれた縦組みです', part: 'run-close' },
] as const;

const MODES = {
  horizontal: {
    css: 'writing-mode: horizontal-tb',
    read: 'horizontal-tb: characters run left, lines run down',
    vertical: false,
    orientation: 'mixed',
  },
  vertical: {
    css: 'writing-mode: vertical-rl',
    read: 'vertical-rl: characters run down, columns run right to left',
    vertical: true,
    orientation: 'mixed',
  },
  upright: {
    css: 'text-orientation: upright',
    read: 'upright: the Latin run stands up, letter above letter',
    vertical: true,
    orientation: 'upright',
  },
} as const;

type Mode = keyof typeof MODES;
const IS_MODE = (value: string): value is Mode => value in MODES;

/**
 * Vertical writing mode specimen: one Japanese sentence under a pick between the
 * horizontal setting, the vertical one, and the vertical one with upright
 * orientation. The sentence carries a Latin run and a year, which is where
 * `text-orientation` shows itself, and an arrow beside the block names the
 * direction the lines advance: down the page when horizontal, right to left when
 * vertical.
 *
 * The subject is the passage (SPEC §5). The term names the axis a block of lines
 * is set on, so the element the term names is the block itself, not a glyph inside
 * it. The horizontal setting is the counter-example that block passes through, so
 * the honest condition is declared in `data-pose` and the specimen mounts vertical
 * (SPEC §6). The picker, the arrows, the readout and the caption are the demo's
 * own instrumentation and stay in the context register.
 *
 * The Latin run's layout is measured rather than asserted from the setting that
 * was asked for: rotated it is taller than wide and shorter than three ems, upright
 * it is a stack of three full ems, and across it is wider than tall. A writing mode
 * is not a transitioned property, so the read after the write is honest (AGENTS.md).
 */
export function mount(root: HTMLElement): void {
  const runs = PASSAGE.map(({ text, part: name }) => `<span data-part="${name}">${text}</span>`).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 484px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-label" data-part="css" style="white-space: nowrap">${MODES.vertical.css}</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Mode" data-part="segmented" data-value="vertical" style="flex: 0 0 auto">
            <button class="sp-segment" data-part="seg-horizontal" value="horizontal" style="white-space: nowrap">horizontal</button>
            <button class="sp-segment" data-part="seg-vertical" value="vertical" style="white-space: nowrap">vertical</button>
            <button class="sp-segment" data-part="seg-upright" value="upright" style="white-space: nowrap">upright</button>
          </sp-segmented>
        </div>
        <div class="sp-row sp-context" data-part="strip" style="height: 22px; margin-top: 6px; justify-content: flex-end; width: ${BOX.width + 28}px">
          <span class="sp-row" data-part="arrow-columns" style="gap: 2px; color: var(--sp-muted)">
            ${icon('chevronLeft')}
            <span style="width: 68px; height: 2px; background: currentcolor"></span>
          </span>
        </div>
        <div class="sp-row" style="align-items: flex-start; gap: 0">
          <div class="sp-context" data-part="gutter" style="width: 28px; height: ${BOX.height}px;
               display: flex; flex-direction: column; align-items: center; justify-content: flex-start; gap: 2px; color: var(--sp-muted)">
            <span class="sp-stack" data-part="arrow-lines" style="align-items: center; gap: 2px">
              <span style="width: 2px; height: 44px; background: currentcolor"></span>
              ${icon('chevronDown')}
            </span>
          </div>
          <div data-part="passage" data-subject data-vertical="yes" data-mode="vertical" data-pose="[data-vertical=yes]"
               style="width: ${BOX.width}px; height: ${BOX.height}px; writing-mode: vertical-rl; text-orientation: mixed;
                      font-family: ${FACE}; font-size: ${SIZE}px; line-height: 1.7">${runs}</div>
        </div>
        <div class="sp-row sp-context" style="height: 30px; margin-top: 6px">
          <span class="sp-chip" data-part="readout" style="cursor: default">${MODES.vertical.read}</span>
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin-top: 2px">
          Set vertically, the first column is the one at the right edge, and the arrow says which way the
          lines advance.
        </p>
      </div>
    </div>
  `;

  const passage = part(root, 'passage');
  const latin = part(root, 'run-latin');
  const readout = part(root, 'readout');
  const css = part(root, 'css');
  const columns = part(root, 'arrow-columns');
  const lines = part(root, 'arrow-lines');

  const apply = (value: string) => {
    if (!IS_MODE(value)) return;
    const mode = MODES[value];
    passage.style.writingMode = mode.vertical ? 'vertical-rl' : 'horizontal-tb';
    passage.style.textOrientation = mode.orientation;
    passage.dataset.mode = value;
    passage.dataset.vertical = mode.vertical ? 'yes' : 'no';
    readout.textContent = mode.read;
    css.textContent = mode.css;
    flag(columns, 'hidden', !mode.vertical);
    flag(lines, 'hidden', mode.vertical);

    /* What the Latin run actually became, read off the layout the browser produced. */
    const box = localSize(latin);
    latin.dataset.lay = box.height <= box.width ? 'across' : box.height > SIZE * 2.4 ? 'upright' : 'sideways';
  };

  apply('vertical');
  part(root, 'segmented').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));
}
