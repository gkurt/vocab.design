import { part } from '#src/kit/parts.ts';

/**
 * The parser, such as it is: four patterns over the sentence, each one turning a phrase into
 * a constraint. A real one is a model or a grammar; what the term is about is that the input
 * is the sentence and the constraints are derived from it, not picked.
 */
const RULES = [
  { name: 'chip-status', key: 'status', test: /unpaid|overdue|outstanding/, read: () => 'unpaid' },
  { name: 'chip-customer', key: 'customer', test: /acme/, read: () => 'Acme Tooling' },
  { name: 'chip-amount', key: 'amount', test: /(?:over|above|more than)\s*(\d[\d,]*)/, read: (m: RegExpMatchArray) => `> ${m[1]}` },
  { name: 'chip-period', key: 'date', test: /last quarter/, read: () => 'Oct to Dec' },
] as const;

const MATCHES = [
  ['INV-2291', 'Acme Tooling', '1,340.00'],
  ['INV-2318', 'Acme Tooling', '1,905.00'],
] as const;

const matchRows = MATCHES.map(
  ([ref, who, amount]) => `
    <span class="sp-row sp-row--between" style="gap: 8px">
      <span class="sp-text" style="font-size: 11px">${ref} &middot; ${who}</span>
      <span class="sp-text sp-text--ink" style="font-size: 11px">${amount}</span>
    </span>`,
).join('');

const chip = (key: string, value: string, name: string) => `
  <span class="sp-chip" data-part="${name}" style="cursor: default">
    <span class="sp-label" style="font-size: 10px; text-transform: uppercase; letter-spacing: 0.04em">${key}</span>${value}
  </span>`;

/**
 * Natural language interface specimen: one field that takes a sentence, and a parse echoed
 * back underneath it as constraints the reader can check. The chips appear phrase by phrase
 * as the sentence lands, which is the demonstration: nothing here was picked from a control,
 * and the interface is showing what it understood rather than asking for it a field at a time.
 *
 * The subject is the field where ordinary language goes. The chips are the echo, the Run
 * button and the result panel are the search around it, and all of that is scenery: the term
 * names the input, not the query engine behind it.
 *
 * The chip row's empty state reads "No filters yet", which is what the search would print; it
 * read "The sentence is parsed into constraints here." under a line saying "Every chip below the
 * field was read out of the sentence, not chosen.", both of which were the site narrating its own
 * demonstration. The chips appearing as the sentence lands is the demonstration.
 *
 * A real `<input>`, so a reader who takes over can click it and type a sentence of their own,
 * and Enter runs the search the way the button does. The chip row and the result panel both
 * hold a fixed height, so a parse that finds four constraints moves nothing that a parse
 * finding none did not (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 266px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Invoices</span>
          <span class="sp-text">2,431 records</span>
        </div>
        <div style="flex: 1 1 auto; min-height: 0; display: flex; flex-direction: column; gap: 10px; padding: 12px; background: var(--sp-sunken)">
          <div class="sp-row" style="gap: 8px">
            <input
              class="sp-input"
              data-part="query"
              data-subject
              type="text"
              autocomplete="off"
              spellcheck="false"
              placeholder="Ask for it in your own words"
              aria-label="Describe the invoices you want"
            />
            <button class="sp-button sp-button--sm sp-context" data-part="run" type="button">Run</button>
          </div>
          <div
            class="sp-row sp-row--wrap sp-context"
            data-part="chips"
            style="gap: 6px; height: 60px; align-content: flex-start"
          >
            <span class="sp-text" data-part="chips-empty" style="font-size: 11px">No filters yet</span>
          </div>
          <div
            class="sp-surface sp-context"
            data-part="results"
            style="display: flex; flex-direction: column; gap: 6px; height: 80px; padding: 8px 10px"
          >
            <span class="sp-label" data-part="result" data-state="idle">Nothing run yet</span>
            <div data-part="rows" style="display: flex; flex-direction: column; gap: 4px; opacity: 0; transition: opacity 0.2s var(--sp-ease)">
              ${matchRows}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  const query = part(root, 'query') as HTMLInputElement;
  const chips = part(root, 'chips');
  const empty = part(root, 'chips-empty');
  const result = part(root, 'result');
  const rows = part(root, 'rows');

  const parse = () => {
    const said = query.value.toLowerCase();
    const found = RULES.flatMap((rule) => {
      const match = said.match(rule.test);
      return match ? [chip(rule.key, rule.read(match), rule.name)] : [];
    });
    empty.hidden = found.length > 0;
    // The placeholder line stays in the row rather than being replaced, so the row it sits
    // in keeps its height whether the parse found four constraints or none.
    for (const stale of chips.querySelectorAll('.sp-chip')) stale.remove();
    chips.insertAdjacentHTML('beforeend', found.join(''));
    return found.length;
  };

  const run = () => {
    const count = parse();
    result.dataset.state = count > 0 ? 'ran' : 'idle';
    result.textContent = count > 0 ? '2 matches, 3,245.00 total' : 'Nothing understood yet, so nothing to run';
    rows.style.opacity = count > 0 ? '1' : '0';
  };

  query.addEventListener('input', () => {
    parse();
    // A changed sentence has not been asked yet: the old answer would be a lie.
    result.dataset.state = 'idle';
    result.textContent = 'Nothing run yet';
    rows.style.opacity = '0';
  });

  // A real reader's Enter runs the search, exactly as the button does. No manufactured
  // click: both paths call the same function (SPEC §8).
  query.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') run();
  });

  part(root, 'run').addEventListener('click', run);
}
