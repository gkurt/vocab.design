import { kitCss } from '#src/kit/kit.ts';
import { pageUrl } from '#src/lib/url.ts';
import type { DemoModule } from '#src/stage/demo.ts';
import type { SpecimenWindow } from '#src/stage/frame.ts';
import { loadDemo } from '#src/stage/registry.ts';

export type Isolation = 'inline' | 'iframe';

/**
 * Where a specimen lives (SPEC §5–6), with the two isolation modes behind one
 * shape so neither the stage nor the player has to ask which it is driving.
 *
 * Shadow DOM is the default and the cheap one. An iframe is a whole document,
 * which is the only honest home for a term whose subject *is* document scope:
 * `document.startViewTransition`, the browser's own top-level focus order, the
 * page scroller. It costs a second realm and a second coordinate space, and this
 * module is where both stop being anyone else's problem: `mount` comes from
 * inside the frame so kit custom elements upgrade in the registry that document
 * can see, and `offset` converts specimen coordinates to page ones for the
 * overlay, which stays outside either boundary.
 */
export interface Surface {
  /** Where mount roots are appended. */
  host: ParentNode;
  /** The document the specimen's nodes belong to. */
  doc: Document;
  mount: DemoModule['mount'];
  /** A specimen's events never cross either boundary; this is what hears them. */
  events: EventTarget;
  /** The specimen's outermost box: the pointer leaving it is the pointer leaving the specimen. */
  edge: Element;
  /**
   * Where the hunt for a scroller stops, because past it the scroller is the page's
   * and not the specimen's (SPEC §7). A frame's own document scroller is still the
   * specimen's, which is why this is not the same node as `edge`.
   */
  outside: Node;
  /** Specimen coordinates to page coordinates. Zero for a shadow root, which shares the page's viewport. */
  offset: () => { x: number; y: number };
  /** Put a stage attribute where the kit reads it: `:host` for a shadow root, `:root` for a document. */
  flag: (name: string, value: string) => void;
}

export function createSurface(canvas: HTMLElement, slug: string, name: string, isolation: Isolation): Promise<Surface | undefined> {
  return isolation === 'iframe' ? frameSurface(canvas, slug, name) : shadowSurface(canvas, slug);
}

/**
 * The kit, parsed once per document rather than once per specimen. A constructed sheet
 * is shareable between roots, and a list page mounts a dozen specimens: 42KB of CSS
 * parsed a dozen times is a cost with nothing to show for it.
 */
let kitSheet: CSSStyleSheet | undefined;

function sharedKitSheet(): CSSStyleSheet {
  if (!kitSheet) {
    kitSheet = new CSSStyleSheet();
    kitSheet.replaceSync(kitCss);
  }
  return kitSheet;
}

async function shadowSurface(canvas: HTMLElement, slug: string): Promise<Surface | undefined> {
  const demo = await loadDemo(slug);
  if (!demo) return undefined;
  // A stage torn down and reconnected keeps the root it already has: attachShadow
  // throws the second time, and the specimen inside it was discarded on teardown.
  const shadow = canvas.shadowRoot ?? canvas.attachShadow({ mode: 'open' });
  shadow.adoptedStyleSheets = [sharedKitSheet()];
  return {
    host: shadow,
    doc: document,
    mount: demo.mount,
    events: shadow,
    edge: canvas,
    outside: canvas,
    offset: () => ({ x: 0, y: 0 }),
    flag: (attribute, value) => canvas.setAttribute(attribute, value),
  };
}

async function frameSurface(canvas: HTMLElement, slug: string, name: string): Promise<Surface | undefined> {
  const frame = document.createElement('iframe');
  frame.className = 'vd-stage-frame';
  // Named for a screen reader, which meets this as one more frame in the page.
  frame.title = `${name} specimen`;
  frame.src = pageUrl(`/specimen/${slug}`);
  const loaded = new Promise<void>((resolve) => frame.addEventListener('load', () => resolve(), { once: true }));
  canvas.append(frame);
  await loaded;
  const doc = frame.contentDocument;
  const published = (frame.contentWindow as SpecimenWindow | null)?.__specimen;
  if (!doc || !published) return undefined;
  const { mount } = await published;
  return {
    host: doc.body,
    doc,
    mount,
    events: doc,
    edge: doc.documentElement,
    outside: doc,
    offset: () => {
      const rect = frame.getBoundingClientRect();
      return { x: rect.left, y: rect.top };
    },
    flag: (attribute, value) => doc.documentElement.setAttribute(attribute, value),
  };
}
