import { part } from '#src/kit/parts.ts';

/**
 * Placeholder as label specimen: the same address typed into a field whose prompt is
 * its only name and into one with a label above it. Typing deletes the first field's
 * name and leaves the second one's alone, which is the whole argument.
 *
 * The subject is the placeholder-only input: identify pointing at a broken field is
 * honest here in a way that pointing at the fix would not be, since the term names the
 * antipattern. The labelled field beside it is the comparison and stays scenery. The two
 * columns split the row from zero rather than from their contents, so neither side can
 * take a few pixels off the other.
 *
 * Three lines of the site's voice used to sit in the form: the left column was headed
 * "Placeholder only (the mistake)", and each field carried a note ("The prompt is the only
 * thing naming this field.", becoming "The prompt is gone. Nothing left says what this is.",
 * and "The label stays put whatever is typed."). No checkout annotates its own fields that
 * way, and the article argues all of it at length, so the notes went and the heading became
 * a blank line: the left field has no name, which is the point, and the blank keeps its
 * input on the same baseline as the labelled one (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 428px">
        <span class="sp-heading sp-context">Delivery details</span>
        <div class="sp-row" style="align-items: flex-start; gap: 14px; margin-top: 12px">
          <div class="sp-field sp-grow" style="flex-basis: 0">
            <span class="sp-label" aria-hidden="true">&nbsp;</span>
            <input class="sp-input" data-part="ghost-field" data-subject data-state="empty" placeholder="Email address" />
          </div>
          <div class="sp-field sp-grow sp-context" style="flex-basis: 0">
            <label class="sp-label" for="vd-labelled-field" data-part="fixed-label">Email address</label>
            <input class="sp-input" id="vd-labelled-field" data-part="fixed-field" data-state="empty" placeholder="you@example.com" />
          </div>
        </div>
      </div>
    </div>
  `;

  const ghost = part(root, 'ghost-field') as HTMLInputElement;
  const fixed = part(root, 'fixed-field') as HTMLInputElement;

  // Filling a field is one-way inside a pass, so the script reaches the emptied state
  // rather than flipping it (SPEC §8); a remount is what gives the prompt back.
  ghost.addEventListener('input', () => {
    ghost.dataset.state = ghost.value.length > 0 ? 'filled' : 'empty';
  });

  fixed.addEventListener('input', () => {
    fixed.dataset.state = fixed.value.length > 0 ? 'filled' : 'empty';
  });
}
