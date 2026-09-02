import { loadFont } from '@remotion/fonts';
import { staticFile } from 'remotion';

/**
 * The site's three faces, the same files the site ships (copied from the fontsource
 * packages under public/fonts). Loaded once per render process; Remotion holds the
 * first frame until they are in.
 */
export const fontsReady = Promise.all([
  loadFont({ family: 'Source Serif 4 Variable', url: staticFile('fonts/source-serif-4-latin-wght-normal.woff2'), weight: '200 900' }),
  loadFont({ family: 'Geist Variable', url: staticFile('fonts/geist-latin-wght-normal.woff2'), weight: '100 900' }),
  loadFont({ family: 'Geist Mono Variable', url: staticFile('fonts/geist-mono-latin-wght-normal.woff2'), weight: '100 900' }),
]);
