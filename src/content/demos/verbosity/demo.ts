import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/** The beat between the reader landing on the control and the speech coming out. */
const SPEAK_MS = 480;

type Level = 'low' | 'medium' | 'high';

const NAME = 'Star';
const ROLE = 'toggle button';
const STATE = 'not pressed';
const DESCRIPTION = 'Starred mail is kept for a year';

const LEVEL = {
  low: {
    utterance: `“${NAME}”`,
    parts: 'name',
    caption:
      'Name only. The role, the state and the description are all switched off, and the reader gets the one word that cannot be dropped.',
  },
  medium: {
    utterance: `“${NAME}, ${ROLE}, ${STATE}”`,
    parts: 'name, role, state',
    caption: 'Role and state come back. This is where most practised users sit: enough to operate the control, nothing more.',
  },
  high: {
    utterance: `“${NAME}, ${ROLE}, ${STATE}. ${DESCRIPTION}.”`,
    parts: 'name, role, state, description',
    caption: 'Everything, description included. A hint that only shows up here is a hint most readers have already turned off.',
  },
} as const satisfies Record<Level, unknown>;

/**
 * Verbosity specimen: one control the screen reader has just landed on, a verbosity picker,
 * and a transcript of exactly what is spoken at each setting. Turning the setting down does
 * not change the markup at all; it changes how much of the markup is ever heard.
 *
 * The transcript is a portrayal, labelled as one, following the live region and atomic live
 * region specimens rather than inventing a second convention for the same job.
 *
 * The subject is the utterance line: verbosity is the length of what is said, so the thing
 * the term names is the sentence, not the control that produced it and not the picker that
 * chose the setting. The mail row and the picker are scenery (SPEC §5). The utterance is what
 * the setting decides at every level, so no level is dishonest and no `data-pose` is needed.
 *
 * The speech delay comes from the DemoClock, so a pose can hold the transcript still. The
 * utterance box reserves the two lines the high setting needs, so changing level moves
 * nothing (SPEC §5).
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  const segment = (level: Level, label: string) => `
    <button class="sp-segment" type="button" data-part="seg-${level}" value="${level}"
            style="padding: 4px 12px; font-size: 11.5px">${label}</button>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 12px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px; justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="level" data-axis="Verbosity" data-value="low">
            ${segment('low', 'Low')}
            ${segment('medium', 'Medium')}
            ${segment('high', 'High')}
          </sp-segmented>
        </div>

        <div class="sp-surface sp-context" style="margin-top: 10px; padding: 4px 6px">
          <div class="sp-list-item" data-part="row" style="gap: 8px">
            <button class="sp-icon-button" type="button" data-part="star" data-sim-focus
                    aria-pressed="false" aria-label="${NAME}" aria-describedby="verbosity-hint"
                    style="flex: 0 0 auto">${icon('star')}</button>
            <span class="sp-grow" style="font-size: 12.5px">Roof survey, Tuesday</span>
            <span class="sp-label" style="flex: 0 0 auto; font-size: 10.5px">09:12</span>
          </div>
          <p class="sp-label" id="verbosity-hint"
             style="margin: 0 0 4px 40px; font-size: 10px">${DESCRIPTION}</p>
        </div>

        <div class="sp-surface" style="margin-top: 10px; padding: 8px 10px">
          <div class="sp-row sp-row--between sp-context" style="gap: 10px">
            <span class="sp-label">Screen reader, on landing</span>
            <span class="sp-label" data-part="parts"
                  style="flex: 0 0 auto; width: 150px; text-align: right; font-size: 10px">name</span>
          </div>
          <p class="sp-text sp-text--ink" data-part="utterance" data-subject data-level="low" data-state="spoken"
             style="margin: 4px 0 0; height: 32px; display: flex; align-items: center;
                    font-size: 11.5px; line-height: 1.35">${LEVEL.low.utterance}</p>
        </div>

        <p class="sp-text sp-context" data-part="caption" data-level="low"
           style="margin: 8px 0 0; height: 32px; font-size: 11px; line-height: 1.35">${LEVEL.low.caption}</p>
      </div>
    </div>
  `;

  const utterance = part(root, 'utterance');
  const parts = part(root, 'parts');
  const caption = part(root, 'caption');
  let pending: number | undefined;

  const apply = (level: Level) => {
    const rule = LEVEL[level];

    // The reader speaks a beat after the setting changes, which is the whole reason the
    // transcript can be watched at all: the sentence arrives as speech rather than as a swap
    // of static text. The line keeps the last thing said until the new one is out, so the
    // subject is never a placeholder (SPEC §6).
    clock.clearTimeout(pending);
    utterance.dataset.state = 'queued';
    pending = clock.setTimeout(() => {
      utterance.dataset.level = level;
      utterance.dataset.state = 'spoken';
      utterance.textContent = rule.utterance;
      parts.textContent = rule.parts;
      caption.dataset.level = level;
      caption.textContent = rule.caption;
    }, SPEAK_MS);
  };

  part(root, 'level').addEventListener('change', (event) => {
    apply((event as CustomEvent<string>).detail as Level);
  });
}
