import '#src/stage/specimen-stage.ts';

/** What a preview needs to know about a term to show its specimen (SPEC §3). */
export interface PreviewSpec {
  slug: string;
  name: string;
  /** Isolation mode, passed through to the stage (SPEC §6). */
  isolation: string;
}

/**
 * The stage a card shows (SPEC §3): the specimen scaled into the card's picture, with no
 * control bar and one badge in the corner. Built the same way for a listing and for the
 * front page's carousel, because a preview is the same object in both; what differs is
 * only which one of them is granted the stage.
 *
 * It is born holding. Being granted is a separate decision, taken by whatever is
 * arranging these previews, and a stage that played the moment it mounted would put a
 * second specimen in motion on every page that mounts more than one.
 */
export function previewStage(spec: PreviewSpec): HTMLElement {
  const stage = document.createElement('vd-stage');
  stage.dataset.slug = spec.slug;
  stage.dataset.name = spec.name;
  stage.dataset.isolation = spec.isolation;
  stage.dataset.state = 'idle';
  stage.dataset.hold = '';
  // No control bar: a card has no room for one, and the demo is driven on its own page.
  // What it gets instead is the badge, which says this is the specimen playing and points
  // the term out when a reader hovers it. The overlay is a child of the stage rather than
  // of the body, because only the body is scaled and the stage draws in page coordinates.
  const label = `Point out the ${spec.name.toLowerCase()}`;
  stage.innerHTML =
    '<div class="vd-preview-scale"><figure><div class="vd-stage-body"><div data-stage-canvas></div></div></figure></div>' +
    '<div data-stage-overlay aria-hidden="true"></div>' +
    `<button class="vd-playing" type="button" title="${label}" aria-label="Playing: ${label.toLowerCase()}"><span></span><span></span><span></span></button>`;
  const badge = stage.querySelector<HTMLElement>('.vd-playing');
  badge?.addEventListener('pointerenter', () => stage.setAttribute('data-identify', ''));
  badge?.addEventListener('pointerleave', () => stage.removeAttribute('data-identify'));
  badge?.addEventListener('focus', () => stage.setAttribute('data-identify', ''));
  badge?.addEventListener('blur', () => stage.removeAttribute('data-identify'));
  return stage;
}
