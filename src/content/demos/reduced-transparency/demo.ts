import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type Setting = 'honoured' | 'ignored';

/** The panel's geometry, identical in both states: only its finish changes. */
const FRAME = `position: absolute; top: 26px; left: 50%; translate: -50% 0; width: 214px; padding: 11px 13px;
               display: flex; flex-direction: column; gap: 7px; border-radius: 14px`;

/** The frosted finish lives in the kit class; the opaque one is stated here. */
const SOLID = `background: var(--sp-surface); border: 1px solid var(--sp-line); color: var(--sp-ink);
               backdrop-filter: none; box-shadow: var(--sp-shadow)`;

const READOUT: Record<Setting, { samples: string; ratio: string }> = {
  ignored: { samples: 'Yes, the wash behind it', ratio: '2.9:1, and moving' },
  honoured: { samples: 'No, a flat fill', ratio: '9.4:1, fixed' },
};

const CAPTION: Record<Setting, string> = {
  ignored:
    'Vibrancy is the effect: the panel samples whatever is behind it, so the contrast of its own label changes as the backdrop does.',
  honoured:
    'The request is answered by replacing the finish, not by deleting the layer. Same panel, same place, same job, a colour you can count on.',
};

/**
 * Reduced transparency specimen: one panel floating over a saturated wash, with a segmented
 * control naming whether the reader's stated preference is honoured. Honoured, the panel is an
 * opaque fill whose label contrast is fixed; ignored, the same panel goes frosted and samples
 * the backdrop, and the wash reads straight through its text.
 *
 * The subject is the panel, the narrowest element the term names: the preference is about the
 * finish of a surface, so a ring around the wash would name a backdrop and a ring around the
 * scene would name the whole picture. The picker, the wash, the read-outs and the caption are
 * scenery (SPEC §5).
 *
 * The frosted state is the counter-example and it is a state the panel itself passes through, so
 * the honest condition lives in `data-pose` and the mount state satisfies it: identify refuses to
 * ring a panel that is currently translucent, and plays on (SPEC §6).
 *
 * The two finishes share one geometry string, so the panel cannot change size when it changes
 * state and nothing around it moves (SPEC §5). Each segment names its own setting rather than
 * toggling (SPEC §8), and no timer is needed.
 */
export function mount(root: HTMLElement): void {
  const cell = (label: string, name: string, value: string) => `
    <div class="sp-stack" style="flex: 1 1 0; min-width: 0; gap: 1px">
      <span class="sp-label" style="font-size: 9.5px">${label}</span>
      <span class="sp-text sp-text--ink" data-part="${name}" data-setting="honoured"
            style="font-size: 11.5px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis">${value}</span>
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 10px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px; justify-content: flex-end">
          <sp-segmented class="sp-segmented" data-part="setting" data-value="honoured" data-axis="Reduce Transparency" data-term="honoured">
            <button class="sp-segment" type="button" data-part="seg-ignored" value="ignored"
                    style="padding: 4px 10px; font-size: 11.5px; white-space: nowrap">Not honoured</button>
            <button class="sp-segment" type="button" data-part="seg-honoured" value="honoured"
                    style="padding: 4px 10px; font-size: 11.5px; white-space: nowrap">Honoured</button>
          </sp-segmented>
        </div>

        <!-- The scene stays out of the context register: it would reach through the wash and
             neutralize the panel inside it, and the panel is the subject (SPEC §5). The wash
             brings its own colours in any case. -->
        <div data-part="scene"
             style="position: relative; margin-top: 8px; height: 152px; border-radius: var(--sp-radius); overflow: hidden">
          <div class="sp-aurora" data-part="wash">
            <span class="sp-aurora-blob" style="top: -50px; left: 18px; --sp-blob-size: 150px; --sp-blob: #ffd166"></span>
            <span class="sp-aurora-blob" style="bottom: -62px; right: 26px; --sp-blob-size: 168px; --sp-blob: #34d399"></span>
            <span class="sp-aurora-blob" style="top: 34px; left: 232px; --sp-blob-size: 120px; --sp-blob: #f472b6"></span>
          </div>

          <div data-part="panel" data-subject data-setting="honoured" data-pose="[data-setting=honoured]"
               style="${FRAME}; ${SOLID}">
            <span style="font-size: 12.5px; font-weight: 600">Now playing</span>
            <span data-part="panel-text" style="font-size: 11px; line-height: 1.4">
              Three tracks left in this queue. Shuffle is off.
            </span>
            <span style="display: block; height: 4px; border-radius: 999px; background: currentcolor; opacity: 0.35"></span>
          </div>
        </div>

        <div class="sp-row sp-context" style="margin-top: 8px; height: 30px; gap: 12px">
          ${cell('Panel samples what is behind it', 'samples', READOUT.honoured.samples)}
          ${cell('Contrast of the panel’s own text', 'ratio', READOUT.honoured.ratio)}
        </div>

        <p class="sp-text sp-context" data-part="caption" data-setting="honoured"
           style="margin: 7px 0 0; height: 30px; font-size: 11px; line-height: 1.35">${CAPTION.honoured}</p>
      </div>
    </div>
  `;

  const panel = part(root, 'panel');
  const samples = part(root, 'samples');
  const ratio = part(root, 'ratio');
  const caption = part(root, 'caption');

  const apply = (setting: Setting) => {
    const honoured = setting === 'honoured';
    panel.dataset.setting = setting;
    // The frosted finish is a kit class and the opaque one is inline, so the style attribute is
    // rewritten whole rather than patched: an inline leftover would outrank the class.
    panel.className = honoured ? '' : 'sp-glass';
    panel.setAttribute('style', honoured ? `${FRAME}; ${SOLID}` : FRAME);
    for (const [el, value] of [
      [samples, READOUT[setting].samples],
      [ratio, READOUT[setting].ratio],
    ] as [HTMLElement, string][]) {
      el.dataset.setting = setting;
      el.textContent = value;
    }
    caption.dataset.setting = setting;
    caption.textContent = CAPTION[setting];
  };

  apply('honoured');

  part(root, 'setting').addEventListener('change', (event) => {
    apply((event as CustomEvent<string>).detail as Setting);
  });
}
