---
name: chrome-copy
description: Write or audit reader-facing copy in the vocab.design chrome (page headings, intro paragraphs, empty states, error messages, button and filter labels, noscript blocks, llms.txt, share cards). Catches the four ways this codebase's prose goes wrong: rationale leak, advocacy, backlog disclosure, and presupposition. Use this whenever you add or edit ANY user-visible string in src/pages, src/components or src/layouts, whenever the user complains that copy is confusing, self-referential, jargon-heavy, "too much implementation detail", or reads like the design doc, and whenever you are asked to rewrite a heading, a blurb, an empty state or an error message. Do not use it for term article prose in src/content/terms, which authoring-round owns.
---

# Chrome copy

## The one idea

Every prose defect found on this site has the same cause: **the sentence is addressed to
someone who already holds the author's model of the site.** In `SPEC.md` and in code
comments that reader exists and the voice is excellent. On a page they do not exist, and
the same voice produces copy that is true, well-formed, on-brand, and useless.

So the question is never "is this well written". It is **who is this written to.** A
reader arriving cold on one page, most likely a term page from a search engine, wanting a
word.

This produces two opposite symptoms, which is why the defect is hard to see. Rationale
leak says too much. Presupposition says too little while sounding complete. Both come
from assuming the reader is a peer reviewing the design.

## Three tests

Apply in this order. They are cheap and they catch different things.

**Subject test.** Does the grammatical subject name something the reader wants (a word, a
page, a spelling), or something we built (terms, aliases, the dictionary's structure, the
index)? A sentence whose subject is the machinery is written from the wrong seat.

**So-what test.** What does the reader do differently having read this? If the honest
answer is "understands our reasoning", cut it. Understanding our reasoning is not a user
goal, and a reader who disagreed with a filing decision was never going to be argued
round by a caption.

**Cold-start test.** Read it as someone who has seen no other page on this site. If it
needs a page they have not read, it is broken for most of the traffic. This one matters
here more than on most sites: the build assumes people land on term pages from search
(canonical URLs, breadcrumbs, per-term share images, a 60-character title budget), so
vocabulary introduced only on the front page is introduced where fewest people are.

## Four failure modes

### 1. Rationale leak

A design decision stated **with its justification**, when the reader needs neither. The
tell is the word **so**: a because-clause pointing at a decision nobody questioned.

```
before  Terms live at the top level, so this was probably a headword that is
        spelled differently here, or one nobody has written up yet.
after   We could not find that word. Check the spelling, or search the dictionary.

before  Aliases are left out here so the headwords read as a list; the glossary
        carries every spelling the site answers to.
after   Aliases are in the glossary.
```

The rationale is usually correct and usually already written down where it belongs. Check
the neighbouring code comment before you delete it; often the page is quoting the comment.

Cutting the rationale is not a licence to paraphrase the noun. That second one shipped for
a while as "For the other names each term goes by, see the glossary", five words spent
avoiding *alias* on a page whose own count line reads "3,888 aliases" two screens above.
A word the site uses unglossed elsewhere is a word this page may use.

### 2. Advocacy where instruction belongs

An argument, addressed to someone who might disagree with a design decision. Nobody on
the page is disagreeing. Give the instruction and drop the case for it.

```
before  An alias is not a footnote here, it is the spelling most people arrive
        with, so each one is listed under its own letter and takes you to the term
        it names.
after   Aliases are listed under their own letter and link to the term they name.
```

A whole paragraph can be advocacy. When the front page's tag section was renamed from
"By facet", the paragraph defending the taxonomy became unnecessary and was deleted
rather than rewritten. A rename that removes prose is doing real work.

### 3. Backlog and implementation disclosure

The reader is shown the editorial pipeline or the index internals: what has not been
written yet, why links are wired the way they are, what Pagefind indexes.

```
before  These have a definition so links never dead-end. The article and demo
        are still to come.
after   These terms have a definition. The full article and demo are still to come.

before  Full text over every term: the headword, its aliases, the definition, and
        the article. If you only half know the word, describe the thing instead,
        because the articles are indexed too.
after   Search the full text of every entry: the term, its aliases, the definition
        and the article. If you only half know the word, describe the thing instead.
```

"Links never dead-end" is a maintainer's anxiety wearing a reader's reassurance. Keep the
fact (there is a definition), drop the reason we made sure of it.

### 4. Presupposition

A claim packaged as already-shared background instead of asserted. This is the nastiest
mode, because a reader who lacks the presupposition does not see a broken sentence, they
see a sentence that failed to land, and they blame themselves. It has four grammatical
fingerprints:

**Definite article on first mention.** "The" claims a referent the reader already has.

```
before  Nothing for "toast". Aliases are indexed, so try the other name for it.
after   No results for "toast". Try another spelling, or describe the thing you mean.
```

That one was the worst string on the site: peak confusion, no affordance, three
presuppositions, and an instruction that cannot be followed (if they knew the other name
they would have typed it). When rewriting an empty state, give an action they can take
with what they already know.

**Contrastive particles with no stated contrast**: *here, instead, too, also, still,
rather than, the other way*. Each presupposes an alternative never shown. "An alias is
not a footnote **here**" needs a rival dictionary the reader is not holding.

Mechanical first pass over a file you are auditing:

```bash
grep -rnE "\b(here|instead|too|also|still|rather than|the other way)\b" <files> \
  | grep -vE ":[0-9]+: *(//|\*|\{/\*)"
```

Most surviving hits are innocent ("still to come" is temporal, not contrastive). The ones
that are not will be obvious once you are looking. The second grep drops code comments,
which is where this vocabulary legitimately lives and where most of the noise is.

**House jargon used as if it were English.** The private vocabulary is *headword, alias,
facet, specimen, stub, family, identify*. Some is deliberate house style worth keeping;
what breaks is using it in a sentence that needs the reader to already have it. Two of
these are internal names with a plain reader-facing twin, and the twin always wins: say
**tag** for facet (SPEC §2.5) and **demo** for specimen (SPEC §6). For the rest, prefer
grounding the word to banning it:

```
before  Demos illustrate the concept; for production use, start here.
after   The demo above shows the idea. To build it, start with one of these.
```

"The demo above" points at the thing on the page, in place, at no cost. Grounding a house
word that way is almost always better than either presupposing it or purging it.

Also watch for the data model's verbs escaping. Terms do not **declare** things to a
reader; authors declare things in frontmatter.

```
before  17 terms declare dark pattern · the same facet by category
after   17 terms belong to dark pattern · see them grouped by category
```

**Deixis with no antecedent**: *these, this, here* pointing at a two-word heading or at
nothing.

## The affordance exemption

Do not apply the jargon rule to control labels. It is the one place the rule inverts, and
over-applying it produces limp buttons.

**Prose jargon** appears in a sentence, has no recovery, and the reader must already hold
the concept for the sentence to pay off. **A control label is completed by the control**:
it costs one click to test, the result is instant and reversible, and the label is learned
for every future encounter. The stage's `⌖ Identify` button is fine exactly as it is. So
is `Play` sitting next to it, and any objection that kills one kills the other.

Bare transitive imperatives with an implied object are the normal register for buttons.
Judge a label on whether pressing it teaches it, not on whether reading it does.

A related distinction worth keeping: *headword* is deliberate house vocabulary, the way it
is in a real dictionary, and a reader meets it beside the word it labels. *Specimen* was
argued for on the same grounds and lost, because it is not standard anywhere a reader has
been, and it was carrying the front page's opening paragraph and the description Google
prints. The register a word buys is worth nothing at the moment of first contact.

## House constraints

- **No em-dashes.** Comma, colon, period or parentheses. `bun validate` enforces this for
  term content; the chrome is on you.
- **No contractions.** The chrome has zero, deliberately. Keep it that way.
- **Active voice, conventional words.** A reader on a 404 is already confused; do not
  spend their attention on register.
- **"tag", never "facet"** in any user-visible string. The URL, the frontmatter field and
  the Pagefind filter key all said `tag` all along; `facet` survives only as the internal
  name for the enriched object `facets()` returns, and in SPEC.md / AGENTS.md where the
  distinction from a category is what is being described. See SPEC §2.5.
- Never a bare domain or raw URL in prose; a named site is a markdown link.

## Working

**Writing something new.** Draft the useful sentence first, then run the three tests on
it. Most first drafts fail the so-what test on their second clause, which is where the
justification lands.

**Auditing a file or a page.** Read every user-visible string, not just the paragraphs:
headings, `aria-label`, `title`, `placeholder`, `<option>` text, `noscript`, status
messages built in TypeScript, `llms.txt` output, capture cards. Empty states and error
messages are worth doing first, because that is where a confused reader already is.

Useful sweep for a component or page directory:

```bash
grep -rnoE "(textContent|title|aria-label|placeholder|alt)\s*[:=]\s*[\"'\`][^\"'\`]{6,120}[\"'\`]" src/components src/layouts
```

**Verifying.** A copy change is still a code change. Run `bun validate`, `bun typecheck`,
`bun run test`, `bun check`. Strings built at runtime (search status lines, the 404's
suggestions) are not verified by a build: exercise them in a browser against a real
`bun run build`, since `build:nosearch` ships no Pagefind index and the empty state can
never fire. If a count line on `src/pages/capture/site-card.astro` changed, re-shoot the
share card with `bun run og --build --site`.

**Scope.** Do not touch code comments, `SPEC.md` or `AGENTS.md` prose under these rules.
That voice is correct for its reader. Term articles in `src/content/terms` belong to
authoring-round; the principles carry, but the register and the gates there are its own.
