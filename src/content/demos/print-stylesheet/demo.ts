import { icon } from '#src/kit/icons.ts';

const SENTENCE = 'Feed the starter twelve hours before you mix. The timings live in';
const LINK = 'the levain schedule';
const TAIL = ', and everything after depends on them.';

const chip = (label: string): string =>
  `<span style="padding: 2px 6px; border-radius: 4px; background: #222834; color: #8b94a3; font-size: 9px">${label}</span>`;

const dot = (): string => '<span style="width: 16px; height: 16px; border-radius: 50%; background: #262c36"></span>';

const relatedCard = (): string => `
  <div style="flex: 1 1 0; height: 34px; border-radius: 4px; background: #1b2029; padding: 6px">
    <div style="height: 5px; width: 80%; border-radius: 3px; background: #2c3340"></div>
    <div style="height: 5px; width: 55%; margin-top: 5px; border-radius: 3px; background: #2c3340"></div>
  </div>`;

/**
 * Print stylesheet specimen: one article, twice. On the left the page as it is served, dark
 * themed and full of ways to go somewhere else. On the right the same article as the print
 * rules leave it: ink on white, margins instead of a viewport, the navigation and the share
 * row and the cookie strip gone, the link's destination printed beside it because paper
 * cannot follow a link, and a folio the screen never had.
 *
 * The subject is the printed sheet, which is what the term names. The screen panel beside it
 * is the thing being translated rather than a peer instance of the term, so it sits in the
 * context register.
 *
 * The sheet states its own black and white rather than reading kit tokens, for the same
 * reason `.sp-glass` states its own: paper looks the same in a dark room, and a print view
 * that followed the page theme would be demonstrating the opposite of the term.
 *
 * A still script (SPEC §8): the whole claim is the difference between the two panels at rest,
 * and the stage cannot print, so there is no second state to reach and no cursor errand worth
 * running.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div style="display: flex; align-items: flex-start; gap: 16px">
        <div style="width: 242px">
          <span class="sp-label">Served</span>
          <div
            class="sp-context"
            data-part="screen"
            style="position: relative; margin-top: 4px; height: 206px; border: 1px solid #262c36; border-radius: 8px;
                   overflow: hidden; background: #14181f"
          >
            <div
              data-part="nav"
              class="sp-row"
              style="gap: 8px; height: 32px; padding: 0 8px; background: #1b2029; border-bottom: 1px solid #262c36; color: #8b94a3"
            >
              <span style="display: flex">${icon('menu')}</span>
              <span style="font-size: 10px">Recipes</span>
              <span style="font-size: 10px">Method</span>
              <span class="sp-grow"></span>
              <span style="padding: 3px 8px; border-radius: 999px; background: #33507f; color: #dbe4f7; font-size: 9px; white-space: nowrap"
                >Subscribe</span
              >
            </div>

            <div style="padding: 10px">
              <div style="color: #e8eaef; font-size: 13px; font-weight: 600">Sourdough, slowly</div>
              <p style="margin: 6px 0 0; color: #a7aeba; font-size: 10px; line-height: 1.5">
                ${SENTENCE}
                <span style="color: #7aa2ff; text-decoration: underline">${LINK}</span>${TAIL}
              </p>
              <div class="sp-row" data-part="share" style="gap: 6px; margin-top: 8px">${dot()}${dot()}${dot()}</div>
              <div class="sp-row" data-part="related" style="gap: 8px; margin-top: 8px">${relatedCard()}${relatedCard()}</div>
            </div>

            <div
              data-part="banner"
              class="sp-row"
              style="position: absolute; left: 0; right: 0; bottom: 0; gap: 6px; padding: 6px 8px; background: #222834;
                     border-top: 1px solid #2c3340; color: #8b94a3"
            >
              <span class="sp-grow" style="font-size: 9px">We value your privacy</span>
              ${chip('Accept')}
            </div>
          </div>
        </div>

        <div style="width: 184px">
          <span class="sp-label">Printed</span>
          <div
            data-part="sheet"
            data-subject
            style="position: relative; margin-top: 4px; height: 206px; padding: 16px 14px; background: #ffffff;
                   border: 1px solid #d9dbe0; border-radius: 2px; box-shadow: 0 2px 10px rgb(16 24 40 / 0.16)"
          >
            <div style="color: #16181d; font-size: 12px; font-weight: 600">Sourdough, slowly</div>
            <p style="margin: 6px 0 0; color: #2a2d34; font-size: 9.5px; line-height: 1.55">
              ${SENTENCE}
              <span style="color: #16181d; text-decoration: underline">${LINK}</span>
              <span data-part="target" style="color: #5c6068">(pastry.example/levain)</span>${TAIL}
            </p>
            <div
              data-part="folio"
              style="position: absolute; left: 14px; right: 14px; bottom: 12px; padding-top: 6px;
                     border-top: 1px solid #e2e4e8; color: #6d717a; font-size: 8px"
            >
              Page 1 of 3
            </div>
          </div>
        </div>
      </div>

      <p class="sp-text sp-context" data-stage-verdict data-part="note" style="width: 442px; margin: 0">
        Paper has no navigation and no way to follow a link, so the print rules drop what cannot
        work there and spell out what can.
      </p>
    </div>
  `;
}
