import { part } from '#src/kit/parts.ts';

const BLANK = 'Not provided';

const ROWS = [
  { key: 'name', question: 'Name', answer: 'Ada Mbeki' },
  { key: 'vehicle', question: 'Vehicle', answer: 'Blue van, KP19 TRX' },
  { key: 'address', question: 'Address', answer: '4 Mill Lane' },
  { key: 'contact', question: 'Contact', answer: BLANK },
] as const;

/**
 * Check answers specimen: the screen at the end of a one-question-per-page flow,
 * where every answer is visible at once and each one can still be changed. A change
 * link goes to that question and nowhere else, and saving lands back on the summary
 * with the edited answer in place, which is the round trip the pattern is judged on.
 *
 * The subject is the list of answers. The heading above it, the frame, and the send
 * row below are scenery (SPEC §5): the word names the enumeration of what was
 * entered, not the page it happens to be printed on.
 *
 * `data-pose` keeps identify on the state that is the term. Once the application has
 * gone, the same rows are a receipt, and "before the submission is final" is the half
 * of the definition that would be lost.
 *
 * The two screens share one fixed-height slot, and sending only changes paint, so
 * neither leaving the summary nor coming back to it moves anything (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const rows = ROWS.map(
    ({ key, question, answer }) => `
      <li class="sp-row" data-part="row-${key}" data-value="${answer}" style="gap: 8px; padding: 7px 0; border-top: 1px solid var(--sp-line)">
        <span class="sp-label" style="flex: 0 0 74px">${question}</span>
        <span class="sp-text sp-text--ink sp-grow" data-part="value-${key}" style="min-width: 0; font-size: 12px">${answer}</span>
        <button class="sp-button sp-button--quiet sp-button--sm" data-part="change-${key}" type="button"
                style="padding: 2px 4px; font-size: 12px; color: var(--sp-accent); text-decoration: underline">
          Change<span class="sp-visually-hidden"> ${question.toLowerCase()}</span>
        </button>
      </li>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" style="width: 320px; height: 278px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Permit application</span><span class="sp-label">Last step</span></div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 10px">

          <div data-part="stage" style="flex: 0 0 auto; height: 168px">
            <section data-part="summary" style="height: 100%">
              <span class="sp-heading sp-context" style="display: block; font-size: 14px; margin-bottom: 4px">Check your answers</span>
              <ul class="sp-list" data-part="answers" data-subject data-pose=":not([data-sent])">${rows}</ul>
            </section>

            <section data-part="edit" data-question="" hidden style="display: flex; flex-direction: column; gap: 8px; height: 100%">
              <span class="sp-heading" data-part="edit-title" style="font-size: 14px">Address</span>
              <span class="sp-text sp-context">One question, the one you came back for.</span>
              <input class="sp-input" data-part="edit-field" type="text" spellcheck="false" aria-label="Answer" />
              <div class="sp-row" style="gap: 8px; margin-top: auto">
                <button class="sp-button sp-button--sm" data-part="save" type="button">Save and continue</button>
                <button class="sp-button sp-button--ghost sp-button--sm" data-part="cancel" type="button">Cancel</button>
              </div>
            </section>
          </div>

          <div class="sp-row sp-row--between sp-context" style="flex: 0 0 auto">
            <span class="sp-label" data-part="status" role="status">Not sent yet</span>
            <button class="sp-button sp-button--sm" data-part="submit" type="button">Accept and send</button>
          </div>

        </div>
      </div>
    </div>
  `;

  const summary = part(root, 'summary');
  const edit = part(root, 'edit');
  const answers = part(root, 'answers');
  const title = part(root, 'edit-title');
  const field = part(root, 'edit-field') as HTMLInputElement;
  const status = part(root, 'status');
  const submit = part(root, 'submit');

  const sent = () => answers.hasAttribute('data-sent');

  const show = (screen: 'summary' | 'edit') => {
    summary.hidden = screen === 'edit';
    edit.hidden = screen === 'summary';
  };

  for (const { key, question } of ROWS) {
    part(root, `change-${key}`).addEventListener('click', () => {
      if (sent()) return;
      const current = part(root, `row-${key}`).dataset.value ?? '';
      edit.dataset.question = key;
      title.textContent = question;
      field.value = current === BLANK ? '' : current;
      field.setAttribute('aria-label', question);
      show('edit');
    });
  }

  // Both ways out of the edit screen land on the summary, so neither control depends
  // on the state it finds (SPEC §8). Cancel simply declines to write.
  part(root, 'save').addEventListener('click', () => {
    const key = edit.dataset.question;
    if (!key) return;
    const value = field.value.trim() || BLANK;
    part(root, `row-${key}`).dataset.value = value;
    part(root, `value-${key}`).textContent = value;
    show('summary');
  });

  part(root, 'cancel').addEventListener('click', () => show('summary'));

  submit.addEventListener('click', () => {
    if (sent()) return;
    answers.setAttribute('data-sent', '');
    for (const { key } of ROWS) part(root, `change-${key}`).setAttribute('aria-disabled', 'true');
    submit.setAttribute('aria-disabled', 'true');
    status.textContent = 'Sent. Reference PM-4471';
  });
}
