import type { DemoModule } from '#src/stage/demo.ts';
import { loadDemo } from '#src/stage/registry.ts';

/** What a specimen document publishes for the stage embedding it (SPEC §6). */
export interface SpecimenFrame {
  mount: DemoModule['mount'];
}

export type SpecimenWindow = Window & { __specimen?: Promise<SpecimenFrame> };

/**
 * Called from inside a `demo: iframe` specimen document, which is the whole point
 * of that document existing: the demo module and every kit primitive it composes
 * are evaluated in *this* realm, so `customElements` registers here, `document`
 * means this document, and `document.activeElement` is the focus the specimen
 * actually owns. A stage that injected the same modules from outside would define
 * its custom elements in the parent's registry, where this document can never see
 * them.
 *
 * Published as a promise rather than awaited, so it is set during this module's
 * evaluation and is therefore already there when the parent hears `load`.
 */
export function publishSpecimen(slug: string): void {
  (window as SpecimenWindow).__specimen = Promise.resolve(loadDemo(slug)).then((demo) => {
    if (!demo) throw new Error(`no demo module for "${slug}"`);
    return { mount: demo.mount };
  });
}
