import { part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/*
 * A real webfont race cannot be staged honestly inside a specimen: the files this
 * page loads are already cached by the time a reader reaches the stage, and a demo
 * cannot slow a download without reaching outside its frame. So the stages are
 * STATED, on the demo's own clock, and the caption says so.
 *
 * What is not faked is the faces. The fallback stage is the system sans this page
 * really falls through to; the loaded stages are Georgia, one of the few families
 * here that ships a drawn italic AND a drawn bold, so the last stage is the
 * family's own files rather than a model of them. The middle stage is what a
 * browser does when those two files have not arrived: the roman sheared for the
 * italic (checked in the browser: `font-style: italic` on a family that HAS an
 * italic hands over the real face, so the shear is applied to the roman itself,
 * exactly as oblique/demo.ts does) and the roman's outline thickened for the bold.
 */
const FALLBACK = 'Helvetica, Arial, sans-serif';
const LOADED = "Georgia, 'Liberation Serif', 'Nimbus Roman', 'DejaVu Serif', serif";
const SIZE = 17;
/** Room for the paragraph at its longest setting, so nothing below it moves (SPEC §5). */
const BOX = 116;

/** The shear a browser applies when it has no italic file to hand over. */
const SHEAR = 'display: inline-block; transform: skewX(-12deg); transform-origin: 0 100%';
/** The smear a browser applies when it has no bold file to hand over. */
const SMEAR = '-webkit-text-stroke: 0.4px currentcolor';

type Stage = {
  family: string;
  italic: string;
  bold: string;
  label: string;
  read: string;
};

const STAGES: Record<string, Stage> = {
  fallback: {
    family: FALLBACK,
    italic: 'font-style: italic',
    bold: 'font-weight: 700',
    label: 'nothing yet',
    read: 'the fallback family, drawing all three styles itself',
  },
  roman: {
    family: LOADED,
    italic: SHEAR,
    bold: `font-weight: 400; ${SMEAR}`,
    label: 'roman only',
    read: 'the roman landed: the italic and the bold are faked from it',
  },
  styles: {
    family: LOADED,
    italic: 'font-style: italic',
    bold: 'font-weight: 700',
    label: 'all three files',
    read: 'the last two files landed: every run is a drawn style now',
  },
};

const ORDER = ['fallback', 'roman', 'styles'] as const;
type Name = (typeof ORDER)[number];
/** How long each stage holds before the next file lands. */
const HOLD: Record<Name, number> = { fallback: 1600, roman: 2400, styles: 3200 };

const TEXT = {
  open: 'The roman arrives first and the page is set in it immediately. Runs that want ',
  italic: 'an italic',
  mid: ' or a ',
  bold: 'bold',
  close: ' wait for their own files, and until those land the browser draws them from the roman it already has.',
};

/**
 * FOFT specimen: one paragraph loading in three stages, each stage a file that
 * has arrived. First the fallback family, then the roman alone with its italic and
 * bold faked from it, then the drawn italic and drawn bold. The stages run on the
 * demo's clock, and the Reload control starts the sequence again, which is the one
 * kind of instrumentation a specimen is allowed: no reader input can perform a
 * download (SPEC §8).
 *
 * The subject is the italic run, the run whose own file arrives last (SPEC §5).
 * It is the term at every stage, because the term is the staging: the run is
 * fallback italic, then a sheared roman, then the family's italic. So there is no
 * counter-example state and no `data-pose` to declare.
 *
 * The paragraph box is fixed, so the reflow each file causes stays inside it and
 * the readout under it never moves (SPEC §5). Every timer comes from the DemoClock
 * the mount is handed, so identify can freeze a stage and inspect it.
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-label" style="white-space: nowrap">files arrived</span>
          <div class="sp-row" style="gap: 8px; flex: 0 0 auto">
            <span class="sp-chip" data-part="stage-label"
                  style="cursor: default; white-space: nowrap; width: 116px; justify-content: center"></span>
            <button class="sp-button sp-button--sm sp-button--ghost" data-part="reload" type="button">Reload</button>
          </div>
        </div>
        <div style="height: ${BOX}px; margin-top: 10px">
          <p data-part="paragraph" data-stage="fallback"
             style="margin: 0; font-size: ${SIZE}px; line-height: 1.45; font-family: ${FALLBACK}">${TEXT.open}<span
             data-part="run-italic" data-subject data-stage="fallback">${TEXT.italic}</span>${TEXT.mid}<span
             data-part="run-bold" data-stage="fallback">${TEXT.bold}</span>${TEXT.close}</p>
        </div>
        <div class="sp-row sp-context" style="height: 30px">
          <span class="sp-chip" data-part="readout" style="cursor: default"></span>
        </div>
        <p class="sp-text sp-context" data-part="caption" style="margin-top: 2px">
          The stages are stated on this stage's own clock, since the files are long since cached. The faked
          styles are what a browser really draws while it waits: the roman sheared, and the roman thickened.
        </p>
      </div>
    </div>
  `;

  const paragraph = part(root, 'paragraph');
  const italic = part(root, 'run-italic');
  const bold = part(root, 'run-bold');
  const label = part(root, 'stage-label');
  const readout = part(root, 'readout');

  let timer: number | undefined;

  const show = (name: Name) => {
    const stage = STAGES[name];
    if (!stage) return;
    paragraph.style.fontFamily = stage.family;
    paragraph.dataset.stage = name;
    italic.dataset.stage = name;
    italic.style.cssText = stage.italic;
    bold.dataset.stage = name;
    bold.style.cssText = stage.bold;
    label.textContent = stage.label;
    readout.textContent = stage.read;
  };

  const run = (index: number) => {
    const name = ORDER[index];
    if (!name) return;
    show(name);
    const next = ORDER[index + 1];
    if (!next) return;
    timer = clock.setTimeout(() => run(index + 1), HOLD[name]);
  };

  part(root, 'reload').addEventListener('click', () => {
    clock.clearTimeout(timer);
    run(0);
  });

  run(0);
}
