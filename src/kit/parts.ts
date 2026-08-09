/**
 * `data-part` lookup — the one selector contract demos and choreographies share
 * (SPEC §8). Throws rather than returning null: a missing part is an authoring
 * error that should surface the moment the specimen mounts.
 */
export function part(root: ParentNode, name: string): HTMLElement {
  const el = root.querySelector<HTMLElement>(`[data-part="${name}"]`);
  if (!el) throw new Error(`specimen part "${name}" not found`);
  return el;
}

export function partsOf(root: ParentNode, name: string): HTMLElement[] {
  return [...root.querySelectorAll<HTMLElement>(`[data-part="${name}"]`)];
}

/** Toggle an attribute used as a boolean state flag (`data-open`, `data-selected`, …). */
export function flag(el: Element, name: string, on: boolean): void {
  if (on) el.setAttribute(name, '');
  else el.removeAttribute(name);
}
