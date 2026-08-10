import type { DemoClock } from '#src/stage/clock.ts';

/**
 * Contract every demo module fulfills (SPEC §5–6). Demos must be cheaply
 * re-creatable: reset is destroy-and-remount, never custom cleanup logic.
 * A demo never knows whether it is being driven by attract mode or a user.
 *
 * `clock` is the demo's only timer. The stage freezes it to pose the specimen
 * for identify and stops it on remount, neither of which it can do to a timer
 * the demo took from the global scope.
 */
export interface DemoModule {
  mount: (root: HTMLElement, clock: DemoClock) => void;
}
