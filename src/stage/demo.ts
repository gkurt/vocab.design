/**
 * Contract every demo module fulfills (SPEC §5–6). Demos must be cheaply
 * re-creatable: reset is destroy-and-remount, never custom cleanup logic.
 * A demo never knows whether it is being driven by attract mode or a user.
 */
export interface DemoModule {
  mount: (root: HTMLElement) => void;
}
