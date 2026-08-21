import { TAGS, type Tag } from '#src/lib/schema.ts';
import type { TermEntry } from '#src/lib/terms.ts';

/**
 * What each tag is a facet OF, in the reader's words (SPEC §2.5). A tag carries no
 * definition of its own (that is what makes it a tag and not a head term), so this
 * line is the whole of its editorial content and the tag page's description.
 */
export const TAG_BLURBS: Record<Tag, string> = {
  a11y: 'Terms filed under their own kind that exist because of accessibility.',
  ai: 'The vocabulary of interfaces an assistant drives, or that drive one.',
  auth: 'Signing in, staying in, and proving you are a person.',
  commerce: 'Choosing, paying, and the pressure applied along the way.',
  dataviz: 'Charts and the parts they are assembled from.',
  editorial: 'Vocabulary the page inherited from print and publishing.',
  forms: 'Assembling a form, filling it in, and telling someone it is wrong.',
  gamification: 'Progress, streaks, and rewards used as motivation.',
  keyboard: 'Reaching and driving an interface without a pointer.',
  media: 'Video, audio, images, and the controls and alternatives they need.',
  messaging: 'Conversations, presence, and things that arrive unannounced.',
  navigation: 'Getting somewhere else, and knowing where you are.',
  onboarding: 'The first run, the empty screen, and teaching in place.',
  'perceived-performance': 'Making a wait read as shorter than it is.',
  'platform-registers': 'Vocabulary that exists because of one platform: TV, watch, phone, desktop, headset.',
  scroll: 'Everything that happens because a page is longer than a screen.',
  search: 'Asking for something by typing, and narrowing what comes back.',
  selection: 'Marking what an action will apply to.',
  tables: 'Rows, columns, and reading across both.',
  theming: 'One interface, more than one palette.',
  tokens: 'Design decisions stored as names so they can be repointed.',
  touch: 'Input from a finger rather than a cursor.',
  'web-platform': 'Terms that name a web platform feature, not a design idea.',
};

/**
 * Families that are NOT facets because their name is itself vocabulary (SPEC §2.5).
 * A reader hunting the facet list for "dark pattern" should be handed the term rather
 * than nothing, so /tags lists these alongside the real facets and says where to go.
 * A head term must not also be a tag; `bun validate` holds that line.
 */
export const HEAD_TERMS: { slug: string; why: string }[] = [
  { slug: 'dark-pattern', why: 'Seventeen deceptive patterns declare it, so its own page lists them.' },
  { slug: 'responsive-web-design', why: "The umbrella over LukeW's five responsive layout patterns." },
  { slug: 'microinteraction', why: 'The loops that are kinds of it and the ripples that are parts of one, both derived on its page.' },
  { slug: 'skeuomorphism', why: 'The claim every revival and reaction to it is measured against.' },
];

export interface TagFacet {
  tag: Tag;
  blurb: string;
  terms: TermEntry[];
}

/** Every tag with its members, name-sorted. Tags are a closed enum, so the order is the enum's. */
export function facets(terms: TermEntry[]): TagFacet[] {
  return TAGS.map((tag) => ({
    tag,
    blurb: TAG_BLURBS[tag],
    terms: terms.filter((t) => t.data.tags.includes(tag)).sort((a, b) => a.data.name.localeCompare(b.data.name)),
  }));
}
