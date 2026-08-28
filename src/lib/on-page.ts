/**
 * Per-page wiring, under client-side navigation (SPEC §3).
 *
 * The router swaps one document for the next inside a single JavaScript realm, and that
 * changes the one thing every script on this site used to be able to assume: that it runs
 * again on the next page. A module body runs ONCE per session. Re-inserting
 * `<script type="module" src="...">` does not re-run a module the browser's module map
 * already holds, so a module that reached into the document at import time is holding the
 * FIRST page's elements for the rest of the visit: its listeners answer for a tree nobody
 * can see any more, and the page in front of the reader has nothing wired to it at all.
 *
 * So anything that touches the document goes in a setup function, and this calls it again
 * for each page. Two rules make that safe, and both are the caller's:
 *
 * - Register everything against the `signal`. `addEventListener(..., { signal })` and
 *   `signal.addEventListener('abort', ...)` for observers and timers. What a page wired
 *   has to be revocable, or every navigation leaves another dead listener on `document`.
 * - Read the DOM inside the setup, never above it. A `querySelector` at module scope is
 *   the defect this exists to prevent.
 *
 * The first run is synchronous and unconditional, which is the point: it IS the browser's
 * own page load, at exactly the moment it happened before the router existed. Nothing
 * about first paint is handed to the transition machinery. Later runs are on
 * `astro:page-load`, once the new document is in place and its own inline scripts have
 * run, and the teardown is on `astro:before-swap`, so the outgoing page stops listening
 * before the incoming one is swapped in rather than after.
 */

/**
 * Which page we are on, counted rather than compared: a setup remembers the generation it
 * belongs to, so the `astro:page-load` that fires on the browser's own load (window
 * `load`, after the synchronous run below) is recognised as the page already set up, and
 * the one after a swap is not. Order-independent, and right for a module imported late.
 */
let generation = 0;
document.addEventListener('astro:after-swap', () => {
  generation += 1;
});

export function onPage(setup: (signal: AbortSignal) => void): void {
  let controller: AbortController | undefined;
  let wired = -1;

  const run = () => {
    controller?.abort();
    controller = new AbortController();
    wired = generation;
    setup(controller.signal);
  };

  document.addEventListener('astro:before-swap', () => controller?.abort());
  document.addEventListener('astro:page-load', () => {
    if (wired !== generation) run();
  });

  run();
}
