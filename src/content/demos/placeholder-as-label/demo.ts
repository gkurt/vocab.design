import { part } from '#src/kit/parts.ts';

const GHOST_NOTE = {
  empty: 'The prompt is the only thing naming this field.',
  filled: 'The prompt is gone. Nothing left says what this is.',
} as const;

/**
 * Placeholder as label specimen: the same address typed into a field whose prompt is
 * its only name and into one with a label above it. Typing deletes the first field's
 * name and leaves the second one's alone, which is the whole argument.
 *
 * The subject is the placeholder-only input, and the specimen says in its own caption
 * that the subject is the mistake: identify pointing at a broken field is honest here
 * in a way that pointing at the fix would not be, since the term names the antipattern.
 * The labelled field beside it is the comparison and stays scenery, and both notes hold
 * two lines of room from mount, so a message changing moves no field (SPEC §5). The two
 * columns split the row from zero rather than from their contents, so a longer message on
 * one side cannot take a few pixels off the other.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 428px">
        <span class="sp-heading sp-context">Delivery details</span>
        <div class="sp-row" style="align-items: flex-start; gap: 14px; margin-top: 12px">
          <div class="sp-field sp-grow" style="flex-basis: 0">
            <span class="sp-label sp-context">Placeholder only (the mistake)</span>
            <input class="sp-input" data-part="ghost-field" data-subject data-state="empty" placeholder="Email address" />
            <span class="sp-text sp-context" data-part="ghost-note" style="height: 32px; font-size: 11px">${GHOST_NOTE.empty}</span>
          </div>
          <div class="sp-field sp-grow sp-context" style="flex-basis: 0">
            <label class="sp-label" for="vd-labelled-field" data-part="fixed-label">Email address</label>
            <input class="sp-input" id="vd-labelled-field" data-part="fixed-field" data-state="empty" placeholder="you@example.com" />
            <span class="sp-text" data-part="fixed-note" style="height: 32px; font-size: 11px">The label stays put whatever is typed.</span>
          </div>
        </div>
      </div>
    </div>
  `;

  const ghost = part(root, 'ghost-field') as HTMLInputElement;
  const ghostNote = part(root, 'ghost-note');
  const fixed = part(root, 'fixed-field') as HTMLInputElement;

  // Filling a field is one-way inside a pass, so the script reaches the emptied state
  // rather than flipping it (SPEC §8); a remount is what gives the prompt back.
  ghost.addEventListener('input', () => {
    const state = ghost.value.length > 0 ? 'filled' : 'empty';
    ghost.dataset.state = state;
    ghostNote.textContent = GHOST_NOTE[state];
  });

  fixed.addEventListener('input', () => {
    fixed.dataset.state = fixed.value.length > 0 ? 'filled' : 'empty';
  });
}
