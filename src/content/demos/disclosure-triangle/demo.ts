import { part } from '#src/kit/parts.ts';

/**
 * The triangle itself. The kit's icon set carries chevrons, not the filled solid
 * this term is about, and the kit is frozen, so the specimen draws the one glyph
 * the word names. It rides the kit's chevron class, which is what rotates it a
 * quarter turn when the control it sits in reports itself expanded.
 */
const TRIANGLE =
  '<svg class="sp-icon sp-icon--filled sp-icon--chevron" viewBox="0 0 24 24" aria-hidden="true" style="width: 11px; height: 11px"><path d="M8 4.5 17 12l-9 7.5z" stroke-width="1"/></svg>';

const CHILDREN = ['button.tsx', 'card.tsx', 'chip.tsx'];

/**
 * Disclosure triangle specimen: a two-level file tree whose branch is opened by
 * the twisty beside it. The subject is the triangle, not the row and not the
 * branch: the term names the glyph whose direction is the state.
 *
 * The branch is the last thing in the frame, so opening it fills empty space
 * rather than pushing the rows above it around (SPEC §5). The toggling is the
 * term here, so the trigger flips and the script drives both directions (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  const children = CHILDREN.map(
    (file) => `<li class="sp-nav-item" data-part="child-${file.split('.')[0]}" style="padding-left: 34px; cursor: default">${file}</li>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" style="height: 264px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Explorer</span></div>
        <div class="sp-body sp-context" style="padding: 8px">
          <ul class="sp-nav">
            <li class="sp-nav-item" style="padding-left: 34px; cursor: default">app.tsx</li>
            <li class="sp-nav-item" style="padding-left: 34px; cursor: default">README.md</li>
            <li class="sp-row" style="gap: 0">
              <button
                class="sp-icon-button"
                type="button"
                data-part="twisty"
                data-subject
                aria-expanded="false"
                aria-controls="vd-branch"
                aria-label="Expand components"
                style="width: 22px; height: 26px"
              >${TRIANGLE}</button>
              <button
                class="sp-nav-item sp-grow"
                type="button"
                data-part="branch-label"
                style="border: 0; background: transparent; font: inherit; font-size: 13px; text-align: left; padding-left: 4px"
              >components</button>
            </li>
          </ul>
          <ul class="sp-nav" data-part="branch" id="vd-branch" hidden>${children}</ul>
        </div>
      </div>
    </div>
  `;

  const twisty = part(root, 'twisty');
  const branch = part(root, 'branch');

  const setOpen = (open: boolean) => {
    branch.hidden = !open;
    twisty.setAttribute('aria-expanded', String(open));
    twisty.setAttribute('aria-label', `${open ? 'Collapse' : 'Expand'} components`);
  };

  const flip = () => setOpen(Boolean(branch.hidden));

  // The row opens the branch as well: a reader who missed a seven-pixel triangle
  // by two pixels should not be punished for it.
  twisty.addEventListener('click', flip);
  part(root, 'branch-label').addEventListener('click', flip);
}
