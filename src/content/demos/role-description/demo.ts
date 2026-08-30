import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/** The beat before the voice reaches the role, so the transcript reads as speech. */
const SPEAK_MS = 480;

type Source = 'stock' | 'honest' | 'lying';

const SOURCE = {
  stock: { role: 'carousel', attribute: 'not set', verdict: 'platform wording' },
  honest: { role: 'slide reel', attribute: '"slide reel"', verdict: 'author wording' },
  lying: { role: 'video player', attribute: '"video player"', verdict: 'misleading, a failure' },
} as const satisfies Record<Source, unknown>;

const LABEL = 'Product tour';

/**
 * Role description specimen: a group of slides whose announced role is chosen by
 * `aria-roledescription`, beside a transcript of what is said on entering it. The widget on
 * screen never changes, because the attribute changes speech and nothing else.
 *
 * The transcript is a portrayal, labelled as one, following the live region and atomic live
 * region specimens rather than inventing a second convention for the same job.
 *
 * Each state also carried a paragraph explaining itself ("The author renames the role to the
 * phrase the rest of the product uses..."), which is the article talking inside the window.
 * The specimen already has a verdict in the strip and may not have two, so the paragraphs
 * went: the spoken line changing while the widget does not is the whole demonstration.
 *
 * The subject is the announced role token, given its own element: the term names the words
 * spoken for the role, not the widget that carries them and not the picker that chose them.
 * The reel, the picker and the verdict are scenery (SPEC §5). The specimen mounts
 * on an authored role description, so the resting state identify poses is the term itself, and
 * the token is the announced role in every state the script visits.
 *
 * The speech delay comes from the DemoClock, so a pose can hold the transcript still. The token
 * ends its line and every changing readout holds a fixed box, so no state moves anything
 * (SPEC §5).
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  const slide = (index: number) => `
    <div class="sp-surface" style="width: 96px; height: 52px; display: flex; align-items: center;
                                   justify-content: center; background: var(--sp-sunken)">
      <span class="sp-label" style="font-size: 10.5px">Slide ${index}</span>
    </div>`;

  const dot = (on: boolean) => `
    <span style="width: 6px; height: 6px; border-radius: 50%;
                 background: ${on ? 'var(--sp-accent)' : 'var(--sp-line)'}"></span>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 12px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px; justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="aria-roledescription" data-part="source" data-value="honest">
            <button class="sp-segment" type="button" data-part="seg-stock" value="stock"
                    style="padding: 4px 10px; font-size: 11.5px; white-space: nowrap">Not set</button>
            <button class="sp-segment" type="button" data-part="seg-honest" value="honest"
                    style="padding: 4px 10px; font-size: 11.5px; white-space: nowrap">Slide reel</button>
            <button class="sp-segment" type="button" data-part="seg-lying" value="lying"
                    style="padding: 4px 10px; font-size: 11.5px; white-space: nowrap">Video player</button>
          </sp-segmented>
        </div>

        <div class="sp-surface sp-context" data-part="reel" role="group" aria-label="${LABEL}"
             aria-roledescription="slide reel" style="margin-top: 10px; padding: 9px 10px">
          <div class="sp-row" style="gap: 8px; justify-content: center">
            ${slide(1)}${slide(2)}${slide(3)}
          </div>
          <div class="sp-row" style="gap: 5px; justify-content: center; margin-top: 8px">
            ${dot(true)}${dot(false)}${dot(false)}
          </div>
        </div>

                              <span class="sp-label" data-stage-verdict data-part="verdict"
                  style="flex: 0 0 auto; width: 132px; text-align: right; font-size: 10px">${SOURCE.honest.verdict}</span>
          
          <p class="sp-text sp-text--ink" data-stage-announce data-part="utterance" data-state="spoken"
             style="margin: 4px 0 0; height: 22px; line-height: 22px; font-size: 12px;
                    white-space: nowrap">“${LABEL}, <span data-part="role" data-subject data-source="honest"
              style="font-weight: 600">${SOURCE.honest.role}</span>”</p>
        
      </div>
    </div>
  `;

  const reel = part(root, 'reel');
  const utterance = part(root, 'utterance');
  const role = part(root, 'role');
  const verdict = part(root, 'verdict');
  let pending: number | undefined;

  const apply = (source: Source) => {
    const rule = SOURCE[source];
    if (source === 'stock') reel.removeAttribute('aria-roledescription');
    else reel.setAttribute('aria-roledescription', rule.role);
    reel.dataset.source = source;

    // The line keeps the last thing said until the new announcement is out, so the subject is
    // never a placeholder (SPEC §6).
    clock.clearTimeout(pending);
    utterance.dataset.state = 'queued';
    pending = clock.setTimeout(() => {
      utterance.dataset.state = 'spoken';
      role.dataset.source = source;
      role.textContent = rule.role;
      verdict.textContent = rule.verdict;
    }, SPEAK_MS);
  };

  part(root, 'source').addEventListener('change', (event) => {
    apply((event as CustomEvent<string>).detail as Source);
  });
}
