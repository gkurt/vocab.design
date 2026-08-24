import { icon } from '#src/kit/icons.ts';
import { localBox } from '#src/kit/measure.ts';
import { flag, part } from '#src/kit/parts.ts';

type Member = { key: string; name: string };

const MEMBERS = [
  { key: 'ada', name: 'Ada Lovelace' },
  { key: 'marco', name: 'Marco Diaz' },
  { key: 'priya', name: 'Priya Raman' },
] as const satisfies readonly Member[];

const BUBBLE_WIDTH = 196;
const EDGE_MARGIN = 8;

/**
 * Popconfirm specimen: the question arrives beside the control that raised it, so
 * the row being removed is still on screen while it is being answered. The bubble
 * is the subject; the team list and its count are scenery.
 *
 * The bubble is out of flow and fixed in width, and it is re-anchored to whichever
 * trigger opened it, so nothing in the list makes room for it (SPEC §5). The
 * trigger only opens; Cancel, Escape, and a click outside are the ways out (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  const rows = MEMBERS.map(
    (member) => `
      <li class="sp-list-item" data-part="row-${member.key}">
        <span class="sp-grow">${member.name}</span>
        <button class="sp-icon-button" data-part="remove-${member.key}" aria-label="Remove ${member.name}">${icon('trash')}</button>
      </li>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" style="height: 290px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Team</span></div>
        <div class="sp-body sp-context" style="display: flex; flex-direction: column">
          <ul class="sp-list sp-grow" data-part="members">${rows}</ul>
          <span class="sp-text" data-part="count" role="status">3 members</span>
        </div>
        <div
          class="sp-popover"
          data-part="popconfirm"
          data-subject
          role="dialog"
          aria-labelledby="pc-question"
          style="width: ${BUBBLE_WIDTH}px; padding: 10px"
        >
          <span class="sp-text sp-text--ink" id="pc-question" data-part="question">Remove this member?</span>
          <div class="sp-row" style="justify-content: flex-end; margin-top: 10px">
            <button class="sp-button sp-button--ghost sp-button--sm" data-part="cancel">Cancel</button>
            <button class="sp-button sp-button--sm" data-part="confirm">Remove</button>
          </div>
        </div>
      </div>
    </div>
  `;

  const frame = root.querySelector('.sp-frame') as HTMLElement;
  const bubble = part(root, 'popconfirm');
  const question = part(root, 'question');
  const count = part(root, 'count');
  const list = part(root, 'members');

  let pending: Member | undefined;

  const anchorTo = (trigger: HTMLElement) => {
    const rect = localBox(trigger, frame);
    const center = rect.left + rect.width / 2;
    const left = Math.min(Math.max(center - BUBBLE_WIDTH + 26, EDGE_MARGIN), frame.offsetWidth - BUBBLE_WIDTH - EDGE_MARGIN);
    bubble.style.left = `${left}px`;
    bubble.style.top = `${rect.top + rect.height + 8}px`;
    bubble.style.setProperty('--sp-arrow-x', `${center - left - 4}px`);
  };

  const setOpen = (open: boolean) => {
    flag(bubble, 'data-open', open);
    if (!open) pending = undefined;
  };

  /** Opens, never toggles, and always to the same state: this row, this question. */
  const ask = (member: Member) => {
    pending = member;
    question.textContent = `Remove ${member.name} from the project?`;
    anchorTo(part(root, `remove-${member.key}`));
    setOpen(true);
  };

  const confirm = () => {
    if (!pending) return;
    part(root, `row-${pending.key}`).remove();
    count.textContent = `${list.children.length} members`;
    setOpen(false);
  };

  for (const member of MEMBERS) part(root, `remove-${member.key}`).addEventListener('click', () => ask(member));
  part(root, 'confirm').addEventListener('click', confirm);
  part(root, 'cancel').addEventListener('click', () => setOpen(false));

  root.addEventListener('pointerdown', (event) => {
    const target = event.target as Element | null;
    if (target && bubble.contains(target)) return;
    // The triggers keep their own click: pressing another row's button moves the
    // question there rather than closing it first.
    if (target?.closest('[data-part^="remove-"]')) return;
    setOpen(false);
  });
  root.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setOpen(false);
  });
}
