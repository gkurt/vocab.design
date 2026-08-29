/**
 * Author voice inside the fiction (SPEC §5.1).
 *
 * Two complaints share this detector, because they share one signal and differ only in
 * what a fixer does about a hit:
 *
 *   `author-voice-captions`   the site explaining its own demo, in a caption/note/legend
 *                             /hint/aside part or an unmarked explanatory <p>. Default fix
 *                             is DELETE: the term's article already says it.
 *   `stage-directions-as-labels`  an `sp-label` asserting an instrument the demo does not
 *                             draw ("Screen reader, polite queue"). Needs a judge, since
 *                             half of these labels are real product text.
 *
 * Recall-tuned on purpose. The `sp-label` half is roughly 50% false positives by design:
 * "High water 04:12, falling" is exactly what a tide app prints, and no regex separates it
 * from a stage direction. That is the judge's question, not this script's.
 *
 * Comments are stripped first. Naming a part in a doc comment is not using one, and a
 * previous sweep shipped a bad edit by matching inside one.
 *
 *   bun .claude/skills/specimen-sweep/detectors/author-voice.ts [--labels|--prose]
 */
import { Glob } from 'bun';

const COMMENTS = /\/\*[\s\S]*?\*\/|\/\/[^\n]*/g;
/** Part names that announce themselves as the author talking. */
const VOICE_PART = /data-part="(caption|note|explain|why|hint|instruction|aside|footnote|legend)[-"]/g;
/** A paragraph of kit text, holding a sentence, claimed by no part at all. */
const LOOSE_PROSE = /<p class="sp-text[^"]*"([^>]*)>\s*([^<>{}]{70,}?)\s*<\/p>/gs;
/** A label carrying a phrase rather than a word: four or more words is scene-setting, not a field name. */
const SCENE_LABEL = /<span class="sp-label"[^>]*>([^<>{}]{24,})<\/span>/g;

const only = Bun.argv.find((a) => a === '--labels' || a === '--prose');
const rows: string[] = [];

for await (const file of new Glob('src/content/demos/*/demo.ts').scan('.')) {
  const slug = file.split('/')[3];
  const source = (await Bun.file(file).text()).replace(COMMENTS, '');
  const hit = (kind: string, text: string) => rows.push(`${slug}\t${kind}\t${text.replace(/\s+/g, ' ').slice(0, 90)}`);

  if (only !== '--labels') {
    for (const m of source.matchAll(VOICE_PART)) hit('part', m[1]);
    for (const m of source.matchAll(LOOSE_PROSE)) {
      if (m[1].includes('data-part')) continue;
      if (/[.!?]/.test(m[2])) hit('loose-prose', m[2]);
    }
  }
  if (only !== '--prose') {
    for (const m of source.matchAll(SCENE_LABEL)) {
      if ((m[1].match(/ /g)?.length ?? 0) >= 3) hit('label?', m[1]);
    }
  }
}

for (const row of rows) console.log(row);
console.error(`\n${rows.length} candidates across ${new Set(rows.map((r) => r.split('\t')[0])).size} specimens`);
