import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type Mode = 'default' | 'text' | 'contrast';

/** What each panel setting actually reaches: the rendering, and nothing else. */
const SKIN = {
  default: { bg: 'var(--sp-surface)', ink: 'var(--sp-ink)', muted: 'var(--sp-muted)', line: 'var(--sp-line)', body: 11.5, head: 12.5 },
  text: { bg: 'var(--sp-surface)', ink: 'var(--sp-ink)', muted: 'var(--sp-muted)', line: 'var(--sp-line)', body: 14, head: 15 },
  contrast: { bg: '#000000', ink: '#ffffff', muted: '#ffffff', line: '#ffffff', body: 11.5, head: 12.5 },
} as const satisfies Record<Mode, unknown>;

const NOTE = {
  default:
    'Text size and contrast are the widget’s to change. The name of the share control is not, and no setting in the panel computes one.',
  text: 'The copy grew. The share control has no text to grow, and still nothing to announce but its role.',
  contrast: 'The page inverted. The share control is still announced as “button”, with nothing after it.',
} as const;

/**
 * Accessibility overlay specimen: one page with a real failure in it (an icon button with no name),
 * a bolted-on widget offering the two knobs these products always offer, and the computed name of
 * that control reported underneath. The knobs work. The name stays empty in every state, which is
 * the whole claim.
 *
 * The subject is the widget: the term names the bolted-on panel, not the failure it leaves behind,
 * and a ring around the unlabelled button would identify the barrier rather than the product being
 * sold. The page, the unlabelled control, the name readout and the note are scenery (SPEC §5). The
 * widget is on stage and is the term in every state, so no `data-pose` is needed.
 *
 * The page is sized for its largest state (the enlarged text), so a setting changes the rendering
 * without moving anything (SPEC §5). No timers: every state is reached by a pick.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 11px 14px">
        <div data-part="page" data-mode="default"
             style="position: relative; overflow: hidden; height: 184px; border: 1px solid var(--sp-line);
                    border-radius: var(--sp-radius); background: var(--sp-surface)">
          <div class="sp-context">
            <div class="sp-topbar" data-part="bar" style="height: 34px; padding: 6px 10px; background: transparent">
              <span class="sp-heading sp-grow" data-part="title" style="font-size: 12.5px">Coast to Coast</span>
              <button class="sp-icon-button" type="button" data-part="ctl"
                      style="width: 24px; height: 24px">${icon('share')}</button>
            </div>
            <div style="padding: 10px 12px">
              <div class="sp-heading" data-part="head" style="height: 20px; font-size: 12.5px">Booking your crossing</div>
              <p class="sp-text" data-part="copy"
                 style="margin: 4px 0 0; height: 40px; font-size: 11.5px; line-height: 1.35">
                Ferries run twice daily from March to October. Book a week ahead in high summer.</p>
            </div>
          </div>

          <div class="sp-surface" data-part="widget" data-subject
               style="position: absolute; right: 8px; bottom: 8px; width: 240px; padding: 7px 9px;
                      box-shadow: var(--sp-shadow)">
            <div class="sp-row" style="gap: 6px; height: 16px">
              <span style="display: flex; color: var(--sp-accent)">${icon('sliders')}</span>
              <span class="sp-label" style="font-size: 10.5px; white-space: nowrap">Accessibility</span>
            </div>
            <sp-segmented class="sp-segmented" data-part="mode" data-value="default" data-axis="Setting"
                          style="margin-top: 6px; width: 100%">
              <button class="sp-segment" type="button" data-part="seg-default" value="default"
                      style="flex: 1 1 auto; padding: 3px 6px; font-size: 10px; white-space: nowrap">Default</button>
              <button class="sp-segment" type="button" data-part="seg-text" value="text"
                      style="flex: 1 1 auto; padding: 3px 6px; font-size: 10px; white-space: nowrap">Big text</button>
              <button class="sp-segment" type="button" data-part="seg-contrast" value="contrast"
                      style="flex: 1 1 auto; padding: 3px 6px; font-size: 10px; white-space: nowrap">Contrast</button>
            </sp-segmented>
          </div>
        </div>

        <div class="sp-surface sp-context" style="margin-top: 9px; padding: 8px 10px">
          <div class="sp-row" style="gap: 8px; height: 17px">
            <span style="display: flex; flex: 0 0 auto; color: var(--sp-warn)">${icon('alert')}</span>
            <span class="sp-label" style="flex: 0 0 auto; font-size: 10.5px; white-space: nowrap">Computed name of the share control</span>
            <span class="sp-grow"></span>
            <span class="sp-text sp-text--ink" data-part="name" data-mode="default" data-name="empty"
                  style="flex: 0 0 auto; font-size: 11.5px; font-weight: 600; white-space: nowrap">empty</span>
          </div>
          <p class="sp-text" data-stage-verdict data-part="note" data-mode="default"
             style="margin: 5px 0 0; height: 30px; font-size: 11px; line-height: 1.35">${NOTE.default}</p>
        </div>
      </div>
    </div>
  `;

  const page = part(root, 'page');
  const bar = part(root, 'bar');
  const title = part(root, 'title');
  const head = part(root, 'head');
  const copy = part(root, 'copy');
  const ctl = part(root, 'ctl');
  const name = part(root, 'name');
  const note = part(root, 'note');

  const apply = (mode: Mode) => {
    const skin = SKIN[mode];
    page.dataset.mode = mode;
    page.style.background = skin.bg;
    page.style.borderColor = skin.line;
    bar.style.borderBottomColor = skin.line;
    title.style.color = skin.ink;
    title.style.fontSize = `${skin.head}px`;
    head.style.color = skin.ink;
    head.style.fontSize = `${skin.head}px`;
    copy.style.color = skin.muted;
    copy.style.fontSize = `${skin.body}px`;
    ctl.style.color = skin.ink;
    // The one thing no panel setting reaches: the control still has no name to report.
    name.dataset.mode = mode;
    note.dataset.mode = mode;
    note.textContent = NOTE[mode];
  };

  part(root, 'mode').addEventListener('change', (event) => {
    apply((event as CustomEvent<string>).detail as Mode);
  });
}
