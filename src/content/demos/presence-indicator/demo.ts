import { part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/** How long the join takes to land, so the offline state is readable before it flips. */
const JOIN_MS = 1600;

/**
 * The presence palette is the term's own claim, stated here rather than taken from the
 * kit: the kit keeps one accent and one warn hue on purpose (SPEC §5), and presence
 * needs four states that a reader can tell apart. Each hue is paired with a shape, so
 * colour is never the only thing carrying the state.
 */
type State = 'online' | 'idle' | 'busy' | 'offline';

const STATES: Record<State, { fill: string; mark: string; said: string }> = {
  online: { fill: '#2f9560', mark: 'none', said: 'online' },
  idle: { fill: '#d99a2b', mark: 'moon', said: 'away' },
  busy: { fill: '#d0473a', mark: 'bar', said: 'busy' },
  offline: { fill: 'transparent', mark: 'none', said: 'offline' },
};

type Member = { id: string; initials: string; name: string; state: State; note: string };

/** The one member whose dot answers the join, and the one the demo marks as subject. */
const JOINER: Member = { id: 'rae', initials: 'RO', name: 'Rae O.', state: 'offline', note: 'Last seen 09:14' };

const MEMBERS: Member[] = [
  { id: 'ada', initials: 'AM', name: 'Ada M.', state: 'online', note: 'Online' },
  { id: 'bo', initials: 'BT', name: 'Bo T.', state: 'idle', note: 'Away 12 min' },
  { id: 'cy', initials: 'CL', name: 'Cy L.', state: 'busy', note: 'In a meeting' },
  JOINER,
];

/**
 * Presence indicator specimen: a member list where each dot reports a different state,
 * and the last member's dot answers the moment they connect.
 *
 * The subject is that one dot, the narrowest element the term names: not the avatar it
 * rides on, not the row, and not the list. Every state it passes through is a presence
 * state, so it never stops being the term and needs no `data-pose`. The avatars, names
 * and status lines around it wear the context register; the dots do not, since dimming
 * them would dim the term itself.
 *
 * The status column is a fixed box and the readout has a row reserved for it, so a dot
 * changing state moves nothing (SPEC §5). The button composes the join from nothing
 * whenever it is pressed rather than flipping whatever it finds (SPEC §8), and the beat
 * between the two halves comes from the stage's clock.
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  const rows = MEMBERS.map(
    (m) => `
      <li class="sp-list-item" style="gap: 12px; padding: 5px 10px">
        <span style="position: relative; flex: 0 0 auto; display: inline-flex">
          <span class="sp-avatar sp-context">${m.initials}</span>
          <span
            data-part="dot-${m.id}"
            ${m.id === JOINER.id ? 'data-subject' : ''}
            data-state="${m.state}"
            role="img"
            aria-label="${m.name} is ${STATES[m.state].said}"
            style="position: absolute; right: -3px; bottom: -3px; width: 13px; height: 13px; overflow: hidden;
                   border-radius: 50%; box-shadow: 0 0 0 2px var(--sp-surface)"
          ><span data-part="mark-${m.id}" style="position: absolute"></span></span>
        </span>
        <span class="sp-context sp-grow" style="font-size: 13px; font-weight: 500">${m.name}</span>
        <span class="sp-context sp-label" data-part="note-${m.id}" style="flex: 0 0 auto; width: 116px; text-align: right">${m.note}</span>
      </li>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 276px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Harbour survey</span>
          <span class="sp-label">4 members</span>
        </div>
        <div class="sp-body" style="padding: 12px">
          <div class="sp-surface" style="overflow: hidden">
            <ul class="sp-list">${rows}</ul>
            <div
              data-part="slot"
              style="display: flex; align-items: center; height: 24px; padding: 0 10px; border-top: 1px solid var(--sp-line)"
            >
              <span class="sp-context sp-label" data-part="readout" hidden>${JOINER.name} came online just now</span>
            </div>
          </div>
        </div>
        <div class="sp-row sp-row--between sp-context" style="flex: 0 0 auto; padding: 8px 12px; border-top: 1px solid var(--sp-line)">
          <span class="sp-text" style="font-size: 12px">A dot is a promise about right now.</span>
          <button class="sp-button sp-button--sm" type="button" data-part="join">${JOINER.name} joins</button>
        </div>
      </div>
    </div>
  `;

  const paint = (member: Member, state: State) => {
    const dot = part(root, `dot-${member.id}`);
    const mark = part(root, `mark-${member.id}`);
    const spec = STATES[state];
    dot.dataset.state = state;
    dot.setAttribute('aria-label', `${member.name} is ${spec.said}`);
    dot.style.background = spec.fill;
    dot.style.border = state === 'offline' ? '2.5px solid var(--sp-muted)' : '0';
    mark.style.cssText = 'position: absolute';
    if (spec.mark === 'moon') {
      // A crescent: the surface colour bitten out of the top right corner.
      mark.style.cssText += '; top: -3px; right: -3px; width: 9px; height: 9px; border-radius: 50%; background: var(--sp-surface)';
    } else if (spec.mark === 'bar') {
      mark.style.cssText +=
        '; top: 50%; left: 50%; width: 7px; height: 2.5px; border-radius: 2px; background: #ffffff; translate: -50% -50%';
    } else {
      mark.style.cssText += '; display: none';
    }
  };

  const setJoined = (joined: boolean) => {
    paint(JOINER, joined ? 'online' : 'offline');
    part(root, `note-${JOINER.id}`).textContent = joined ? 'Online' : JOINER.note;
    part(root, 'readout').hidden = !joined;
  };

  for (const member of MEMBERS) paint(member, member.state);

  let timer: number | undefined;

  part(root, 'join').addEventListener('click', () => {
    clock.clearTimeout(timer);
    setJoined(false);
    timer = clock.setTimeout(() => setJoined(true), JOIN_MS);
  });
}
