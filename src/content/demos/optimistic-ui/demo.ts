import { icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';

const ROUND_TRIP_MS = 1400;

/**
 * Optimistic UI specimen: the count moves the instant you click, and the server
 * catches up afterwards. The second half of the term is the part demos usually
 * skip, so this one also shows the reconciliation when the request fails.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" data-subject style="width: 300px">
        <div class="sp-row">
          <span class="sp-avatar">AM</span>
          <span class="sp-grow">
            <span class="sp-heading">Ada M.</span>
            <p class="sp-text">Pushed the new colour ramp</p>
          </span>
        </div>
        <div class="sp-row" style="margin-top: 14px">
          <button class="sp-button sp-button--ghost sp-button--sm sp-row" data-part="like" aria-pressed="false">
            ${icon('heart')} <span data-part="count">18</span>
          </button>
          <span class="sp-text" data-part="status" data-state="idle">Not liked yet</span>
        </div>
      </div>
      <!-- Instrumentation, not the pattern: the term is what the window does. -->
      <label class="sp-row sp-text sp-context" style="gap: 6px">
        <input type="checkbox" data-part="fail" />
        Make the next request fail
      </label>
    </div>
  `;

  const like = part(root, 'like');
  const count = part(root, 'count');
  const status = part(root, 'status');
  const fail = part(root, 'fail') as HTMLInputElement;
  let liked = false;
  let value = 18;
  let timer: ReturnType<typeof setTimeout> | undefined;

  const paint = (state: 'idle' | 'pending' | 'saved' | 'reverted', text: string) => {
    status.dataset.state = state;
    status.textContent = text;
    status.className = state === 'pending' ? 'sp-text sp-pending' : 'sp-text';
  };

  like.addEventListener('click', () => {
    clearTimeout(timer);
    const next = !liked;
    // The interface commits first: state, count, and pressed styling all move now.
    liked = next;
    value += next ? 1 : -1;
    count.textContent = String(value);
    like.setAttribute('aria-pressed', String(next));
    flag(like, 'data-selected', next);
    paint('pending', 'Sending…');

    const willFail = fail.checked;
    timer = setTimeout(() => {
      if (!willFail) {
        paint('saved', 'Saved');
        return;
      }
      // Reconciliation: the optimistic guess is rolled back and said out loud.
      liked = !next;
      value += next ? -1 : 1;
      count.textContent = String(value);
      like.setAttribute('aria-pressed', String(liked));
      flag(like, 'data-selected', liked);
      fail.checked = false;
      paint('reverted', 'Could not save, put back');
    }, ROUND_TRIP_MS);
  });
}
