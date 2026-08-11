import { part } from '#src/kit/parts.ts';

const CAPACITY = 64;
/** Where the reading stops being comfortable, in gigabytes: the meter's high mark. */
const HIGH = 51.2;

const SCENES = {
  tidy: { used: 21.4, note: '' },
  loaded: { used: 58.6, note: 'Nearly full' },
} as const;

const gb = (value: number) => `${value.toFixed(1)} GB`;

/**
 * Meter specimen: storage used against storage bought, which is a fact about the
 * disk rather than a job in flight. The subject is the gauge alone: the panel
 * around it, the readout, and the two buttons that change what is stored are the
 * machine the reading is taken from.
 *
 * Both buttons assign an absolute reading rather than adding to one (SPEC §8), so
 * the script drives the meter into its warn zone and back out on purpose. The
 * readout is fixed width and the note beside it keeps its line whether or not
 * there is a warning to print (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 320px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">Storage</span>
          <span class="sp-text">Studio plan</span>
        </div>
        <div
          class="sp-progress sp-progress--meter"
          data-part="meter"
          data-subject
          data-zone="ok"
          role="meter"
          aria-label="Storage used"
          aria-valuemin="0"
          aria-valuemax="${CAPACITY}"
          aria-valuenow="${SCENES.tidy.used}"
          aria-valuetext="${gb(SCENES.tidy.used)} of ${gb(CAPACITY)} used"
          style="--sp-value: ${(SCENES.tidy.used / CAPACITY) * 100}%; height: 10px; margin-top: 16px"
        >
          <div class="sp-progress-fill"></div>
        </div>
        <div class="sp-row sp-row--between sp-context" style="margin-top: 8px; height: 20px">
          <span class="sp-text" data-part="readout" style="font-variant-numeric: tabular-nums">21.4 GB of 64.0 GB</span>
          <span class="sp-text" data-part="note"></span>
        </div>
        <div class="sp-row sp-context" style="margin-top: 16px">
          <button class="sp-button sp-button--sm" type="button" data-part="import-video">Import 4K footage</button>
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="empty-trash">Empty trash</button>
        </div>
      </div>
    </div>
  `;

  const meter = part(root, 'meter');
  const readout = part(root, 'readout');
  const note = part(root, 'note');

  const show = (scene: (typeof SCENES)[keyof typeof SCENES]) => {
    const { used, note: warning } = scene;
    meter.style.setProperty('--sp-value', `${(used / CAPACITY) * 100}%`);
    meter.dataset.zone = used >= HIGH ? 'warn' : 'ok';
    meter.setAttribute('aria-valuenow', String(used));
    meter.setAttribute('aria-valuetext', `${gb(used)} of ${gb(CAPACITY)} used`);
    readout.textContent = `${gb(used)} of ${gb(CAPACITY)}`;
    note.textContent = warning;
  };

  part(root, 'import-video').addEventListener('click', () => show(SCENES.loaded));
  part(root, 'empty-trash').addEventListener('click', () => show(SCENES.tidy));

  show(SCENES.tidy);
}
