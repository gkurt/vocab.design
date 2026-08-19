/**
 * Choreography step vocabulary (SPEC §8). Complete and demo-agnostic — nothing
 * demo-specific may be added here. Targets are `data-part` selectors only.
 */
export type Step =
  | { moveTo: string }
  | { click: true }
  | { dblclick: true }
  | { rightClick: true }
  | { middleClick: true }
  | { drag: { to: string } }
  /**
   * Press and hold the current target for this many ms (SPEC §8). Under the touch
   * persona the reported pressure climbs at a finger's rate (full force at 900 ms),
   * so the hold's length chooses the depth reached; ends with pointerup and never
   * a click — a long press is not a tap.
   */
  | { hold: number }
  | { press: string }
  | { type: string }
  | { scroll: { x?: number; y?: number } }
  | { wait: number }
  /** `hidden` is satisfied by an element that is absent as well as one that is not visible. */
  | { assert: { selector: string; state: 'visible' | 'hidden' } };

/** Identity helper that gives choreography files a typed, greppable shape. */
export function steps(list: Step[]): Step[] {
  return list;
}
