/**
 * Page-level scheduler (SPEC §7): exactly one stage plays at a time. Stages
 * claim before entering attract; on release the next waiting stage is granted.
 */
let current: object | null = null;
const waiting = new Map<object, () => void>();

export function claim(owner: object, onGrant: () => void): boolean {
  if (current === null || current === owner) {
    current = owner;
    waiting.delete(owner);
    return true;
  }
  waiting.set(owner, onGrant);
  return false;
}

export function release(owner: object): void {
  waiting.delete(owner);
  if (current !== owner) return;
  current = null;
  const next = waiting.entries().next();
  if (next.done) return;
  const [nextOwner, grant] = next.value;
  waiting.delete(nextOwner);
  current = nextOwner;
  grant();
}
