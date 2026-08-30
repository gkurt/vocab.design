import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type Version = 'plain' | 'original';

type Draft = { text: string; sentences: string; longest: string; level: string; ok: boolean };

/** The same instruction, the same deadline, the same consequence, written twice. */
const DRAFTS: Record<Version, Draft> = {
  plain: {
    text: 'Send your documents within 30 days. If we have not received them by then, we will close your application.',
    sentences: '2',
    longest: '13 words',
    level: 'Lower secondary',
    ok: true,
  },
  original: {
    text: 'In the event that the aforementioned documentation is not received by the Department within thirty (30) days of the date of this notification, your application will be deemed to have been withdrawn and no further action will be taken in respect of it.',
    sentences: '1',
    longest: '43 words',
    level: 'Above lower secondary',
    ok: false,
  },
};

const CAPTION: Record<Version, string> = {
  plain:
    'The same instruction, the same deadline, the same consequence. Short sentences, words the reader already owns, and the action at the front.',
  original:
    'Correct, complete and unusable. Nothing here is wrong, and nobody gets the instruction out of it on one pass, which is the failure the criterion names.',
};

/**
 * Plain language specimen: one paragraph of departmental prose and one rewrite of it,
 * picked by a segmented control, with a countable readout beside them (sentences, longest
 * sentence, and where the draft sits against the lower secondary level WCAG 3.1.5 asks for).
 * The rewrite carries the same instruction, deadline and consequence, so what changed is the
 * writing rather than the content.
 *
 * The subject is the prose block, the narrowest element the term names. The original draft is
 * a counter-example the subject itself passes through, so the honest condition lives in
 * `data-pose` and the mount state satisfies it: identify refuses to pose a block of
 * departmental prose as plain language and plays on until the rewrite comes round (SPEC §6).
 * The segmented control, the readout row and the caption are scenery (SPEC §5).
 *
 * The block holds a fixed height, so the longer draft does not push the readout and the
 * caption down the frame (SPEC §5). Each segment reaches its own draft rather than toggling
 * (SPEC §8), and no timer is needed.
 *
 * The third readout cell was headed "Reading level (WCAG 3.1.5)". The measure is something a
 * readability panel really prints, so the cell stayed, but the citation was the site pointing
 * at the criterion from inside the fiction; it is just "Reading level" now, and the article
 * names the criterion.
 */
export function mount(root: HTMLElement): void {
  const cell = (label: string, name: string, value: string, grow: string) => `
    <div class="sp-stack" style="flex: ${grow} 1 0; min-width: 0; gap: 1px">
      <span class="sp-label" style="font-size: 9.5px">${label}</span>
      <span class="sp-text sp-text--ink" data-part="${name}" data-version="plain"
            style="font-size: 11.5px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis">${value}</span>
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 12px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px; justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-value="plain" data-axis="Version" data-term="plain">
            <button class="sp-segment" data-part="seg-plain" value="plain"
                    style="padding: 5px 10px; font-size: 12px">Rewritten</button>
            <button class="sp-segment" data-part="seg-original" value="original"
                    style="padding: 5px 10px; font-size: 12px">As it arrived</button>
          </sp-segmented>
        </div>

        <div class="sp-surface" data-part="prose" data-subject data-pose="[data-version=plain]" data-version="plain"
             style="margin-top: 9px; padding: 12px 13px; height: 100px; overflow: hidden">
          <p class="sp-prose sp-text--ink" data-part="draft"
             style="margin: 0; --sp-leading: 1.55; --sp-measure: 60ch; font-size: 12px">${DRAFTS.plain.text}</p>
        </div>

        <div class="sp-row sp-context" style="margin-top: 9px; gap: 10px; height: 30px">
          ${cell('Sentences', 'sentences', DRAFTS.plain.sentences, '1')}
          ${cell('Longest sentence', 'longest', DRAFTS.plain.longest, '1.2')}
          ${cell('Reading level', 'level', DRAFTS.plain.level, '1.7')}
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="caption" data-version="plain"
           style="margin: 8px 0 0; height: 32px; font-size: 11px">${CAPTION.plain}</p>
      </div>
    </div>
  `;

  const prose = part(root, 'prose');
  const draft = part(root, 'draft');
  const sentences = part(root, 'sentences');
  const longest = part(root, 'longest');
  const level = part(root, 'level');
  const caption = part(root, 'caption');

  const apply = (version: Version) => {
    const spec = DRAFTS[version];
    prose.dataset.version = version;
    draft.textContent = spec.text;
    for (const [el, value] of [
      [sentences, spec.sentences],
      [longest, spec.longest],
      [level, spec.level],
    ] as const) {
      el.dataset.version = version;
      el.textContent = value;
    }
    level.dataset.ok = spec.ok ? 'yes' : 'no';
    caption.dataset.version = version;
    caption.textContent = CAPTION[version];
  };

  apply('plain');

  part(root, 'segmented').addEventListener('change', (event) => {
    apply((event as CustomEvent<string>).detail as Version);
  });
}
