import { flag, part } from '#src/kit/parts.ts';

type Stop = { key: string; side: Side; state: string; line: string };

type Side = 'nested' | 'fixed';

/** Every stop Tab visits, in order, with the line a reader speaks when it arrives. */
const STOPS: Stop[] = [
  { key: 'card-nested', side: 'nested', state: 'swallowed', line: 'link, “Northern lights tour, 3 nights from £480, Save”' },
  { key: 'save-nested', side: 'nested', state: 'inner', line: 'button, “Save”, still inside that link' },
  { key: 'link-fixed', side: 'fixed', state: 'link', line: 'link, “Northern lights tour”' },
  { key: 'save-fixed', side: 'fixed', state: 'button', line: 'button, “Save”' },
];

const CAPTIONS: Record<Side, string> = {
  nested: 'One name for two controls, and the second stop adds nothing a reader can act on.',
  fixed: 'Two controls, two names, two stops, and the card is still clickable end to end.',
};

const RESULTS = {
  hijacked: 'Save ran, then the link opened the tour. One press, two actions.',
  saved: 'Saved. The link never heard the press.',
  opened: 'Opened the tour.',
} as const;

/**
 * Nested interactive specimen: the clickable card written the obvious way, with a real
 * button inside the card's own link, beside the card-action version where the button is a
 * sibling and the link is stretched over the card by a layer of its own.
 *
 * The subject is the card that is itself a link, since the rule of this name is about the
 * control that contains another one, and the ring has to show the pair to show the term.
 * The repaired card is scenery and never the subject, which is why the subject can never
 * pass through an honest state and needs no `data-pose` (SPEC §5–6). The readout rows and
 * the caption are instrumentation.
 *
 * Both cards are built from real elements rather than pictures of them, because the
 * nesting is the term: the press on the inner button genuinely bubbles to the link that
 * encloses it, and the demo only reports what the DOM did. The ring is the demo's own
 * simulated focus, so Tab here never moves real focus (SPEC §7); the rows keep their room
 * from mount so a longer line moves nothing (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 14px 16px">
        <div class="sp-row" style="gap: 10px; align-items: stretch">
          <div class="sp-stack" style="flex: 1 1 0; gap: 4px; min-width: 0">
            <span class="sp-label sp-context">The button inside the link</span>
            <a class="sp-surface" href="#" data-part="card-nested" data-subject
               style="display: block; height: 104px; padding: 10px; color: inherit; text-decoration: none">
              <span class="sp-text sp-text--ink" style="display: block; font-size: 13px; font-weight: 600">Northern lights tour</span>
              <span class="sp-text" style="display: block; margin-top: 2px; font-size: 11px">3 nights from £480</span>
              <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="save-nested"
                      style="margin-top: 10px">Save</button>
            </a>
          </div>
          <div class="sp-stack sp-context" style="flex: 1 1 0; gap: 4px; min-width: 0">
            <span class="sp-label">The button beside it</span>
            <div class="sp-surface" data-part="card-fixed" style="position: relative; height: 104px; padding: 10px">
              <a href="#" data-part="link-fixed" style="font-size: 13px; font-weight: 600; color: inherit; text-decoration: none">
                Northern lights tour
                <span data-part="stretch" style="position: absolute; inset: 0"></span>
              </a>
              <span class="sp-text" style="display: block; margin-top: 2px; font-size: 11px">3 nights from £480</span>
              <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="save-fixed"
                      style="position: relative; z-index: 1; margin-top: 10px">Save</button>
            </div>
          </div>
        </div>

                  <span class="sp-text sp-text--ink" data-stage-announce data-part="announced" data-state="swallowed"
                style="font-size: 11px; white-space: nowrap"></span>
        
        <div class="sp-row sp-row--between sp-context" style="margin-top: 4px; height: 18px">
          <span class="sp-label">One press</span>
          <span class="sp-text sp-text--ink" data-part="result" data-state="none"
                style="font-size: 11px; white-space: nowrap">nothing pressed yet</span>
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" data-case="nested"
           style="margin: 8px 0 0; height: 16px; font-size: 11px; white-space: nowrap">${CAPTIONS.nested}</p>
      </div>
    </div>
  `;

  const announced = part(root, 'announced');
  const result = part(root, 'result');
  const caption = part(root, 'caption');
  const stops = STOPS.map((stop) => ({ stop, el: part(root, stop.key) }));
  let at = 0;

  const side = (which: Side) => {
    caption.dataset.case = which;
    caption.textContent = CAPTIONS[which];
  };

  const ring = (index: number) => {
    at = (index + STOPS.length) % STOPS.length;
    const current = STOPS[at];
    if (!current) return;
    for (const { stop, el } of stops) flag(el, 'data-sim-focus', stop.key === current.key);
    announced.dataset.state = current.state;
    announced.textContent = current.line;
    side(current.side);
  };

  const report = (state: keyof typeof RESULTS) => {
    result.dataset.state = state;
    result.textContent = RESULTS[state];
    side(state === 'hijacked' ? 'nested' : 'fixed');
  };

  ring(0);

  // The card is a link, so every press inside it reaches the link as well. Reported from
  // the bubble, which is the failure itself rather than a claim about it.
  part(root, 'card-nested').addEventListener('click', (event) => {
    event.preventDefault();
    report('hijacked');
  });

  part(root, 'link-fixed').addEventListener('click', (event) => {
    event.preventDefault();
    report('opened');
  });
  part(root, 'save-fixed').addEventListener('click', (event) => {
    event.stopPropagation();
    report('saved');
  });

  root.addEventListener('keydown', (event) => {
    if (event.key === 'Tab') ring(at + 1);
  });
}
