/**
 * Choreography step vocabulary (SPEC §8). Complete and demo-agnostic — nothing
 * demo-specific may be added here. Targets are `data-part` selectors only.
 */
export type Step =
  | { moveTo: string }
  | { click: true }
  | { dblclick: true }
  | { press: string }
  | { type: string }
  | { scroll: { x?: number; y?: number } }
  | { wait: number }
  | { assert: { selector: string; state: 'visible' | 'hidden' } };

/** Identity helper that gives choreography files a typed, greppable shape. */
export function steps(list: Step[]): Step[] {
  return list;
}
