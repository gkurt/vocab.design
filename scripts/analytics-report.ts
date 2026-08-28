/**
 * The analytics report, as code (SPEC §10).
 *
 * GA4 has no API for its own dashboards, Explorations or report collections, so anything
 * built in the console has to be clicked and cannot be reviewed, diffed, or handed to
 * anyone. What matters here is a short list of questions that never change, so it lives in
 * the repo instead: which words readers reached for and did not find, which ones only
 * matched after the search threw half the query away, which graph edges get crossed, and
 * which aliases carry traffic.
 *
 * Read it as a reading list for the vocabulary, not as traffic numbers. Every failed query
 * is a candidate alias or a term nobody has written yet.
 *
 * Two sources, one report, because they are the same question from opposite sides. GA says
 * what readers typed into OUR search and did not find. Search Console says what they typed
 * into GOOGLE before arriving, which is the vocabulary people reach for when they have not
 * found us yet: an impression with no click is a word we rank for and answer badly.
 *
 * Auth is the `vocab-analytics` service account, impersonated through the caller's own
 * gcloud credentials, so no key file exists. Run `gcloud auth application-default login`
 * once; the token is minted per run and never written to disk.
 *
 *   bun run analytics                 # the last 28 days
 *   bun run analytics 7              # the last 7 days
 *   bun run analytics --now          # realtime, for checking that wiring works at all
 *   bun run analytics --json         # the same data, machine readable
 */

export {}; // top-level await needs this file to be a module

const PROPERTY = process.env.GA_PROPERTY_ID ?? '551099625';
const SERVICE_ACCOUNT = process.env.GA_SERVICE_ACCOUNT ?? 'vocab-analytics@vocab-design-506215.iam.gserviceaccount.com';
const SEARCH_CONSOLE_SITE = process.env.SC_SITE ?? 'sc-domain:vocab.design';
const SCOPES = ['https://www.googleapis.com/auth/analytics.readonly', 'https://www.googleapis.com/auth/webmasters.readonly'];
/** How many rows of a long tail are worth reading in one sitting. */
const ROWS = 25;

interface Row {
  dimensionValues?: { value?: string }[];
  metricValues?: { value?: string }[];
}

interface ReportResponse {
  rows?: Row[];
  error?: { message?: string };
}

/** One question, phrased as the Data API phrases it. */
interface Question {
  title: string;
  /** Why the answer matters, printed under the title so a report explains itself. */
  note?: string;
  dimensions: string[];
  event?: string;
  /** Extra equality filters on custom dimensions, e.g. names_result = false. */
  where?: Record<string, string>;
  limit?: number;
  /** Column names, for a source whose rows carry more than a single count. */
  headers?: string[];
}

/** Search Console reports four metrics per row and needs its own shape. */
interface Arrival {
  title: string;
  note?: string;
  dimensions: string[];
  limit?: number;
}

const ARRIVALS: Arrival[] = [
  {
    title: 'Queries Google sent here',
    note: 'What people typed before arriving. Impressions with no clicks are words we rank for and apparently answer badly.',
    dimensions: ['query'],
  },
  {
    title: 'Query to page',
    note: 'Where each query landed. A query answered by a page that is not the term for it is the missing-alias problem seen from outside.',
    dimensions: ['query', 'page'],
  },
  {
    title: 'Pages Google shows',
    dimensions: ['page'],
  },
];

/**
 * Realtime is a different schema, not a different date range: it knows nothing about
 * `customEvent:` dimensions. So `--now` asks the only question it can, which happens to be
 * the one worth asking there anyway: is anything arriving at all?
 */
const NOW: Question[] = [
  {
    title: 'Events arriving now',
    note: 'The last 30 minutes. Realtime cannot see custom parameters, only event names.',
    dimensions: ['eventName'],
    limit: 30,
  },
];

const QUESTIONS: Question[] = [
  {
    title: 'Found nothing',
    note: 'A query with no match at all. Either the word is missing from the vocabulary, or it is an alias nobody has recorded.',
    event: 'search_no_results',
    dimensions: ['customEvent:search_term', 'customEvent:surface'],
  },
  {
    title: 'Only matched after dropping words',
    note: 'The salvage pass had to shed words to find anything, so the reader described the thing and we answered something adjacent.',
    event: 'search_distant',
    dimensions: ['customEvent:search_term', 'customEvent:ran', 'customEvent:dropped_words'],
  },
  {
    title: 'Described, not named',
    note: 'A hit whose headword does not contain what was typed. An alias match looks like this too, so read it as a lead.',
    event: 'search',
    where: { 'customEvent:names_result': 'false' },
    dimensions: ['customEvent:search_term', 'customEvent:top_result'],
  },
  {
    title: 'Nobody took a result',
    note: 'Results were shown and the reader left them. The strongest signal that the answer was not in the list.',
    event: 'search_abandoned',
    dimensions: ['customEvent:search_term', 'customEvent:results'],
  },
  {
    title: 'Where the answer sat',
    note: 'Rank of the clicked result. Anything but a pile at 1 means the ranking is wrong for how readers ask.',
    event: 'search_result_click',
    dimensions: ['customEvent:position'],
    limit: 12,
  },
  {
    title: 'Searches that worked',
    note: 'For contrast, and for spotting words that get searched far more than they get read.',
    event: 'search',
    where: { 'customEvent:names_result': 'true' },
    dimensions: ['customEvent:search_term', 'customEvent:top_result'],
  },
  {
    title: 'Aliases arrived by',
    note: 'Every alias is a search query we answer. This is which ones are actually asked.',
    event: 'alias_hit',
    dimensions: ['customEvent:alias', 'customEvent:term'],
  },
  {
    title: 'Graph edges crossed',
    note: 'Whether the relations are used or merely present. `prose` is a link inside an article.',
    event: 'relation_click',
    dimensions: ['customEvent:relation'],
    limit: 12,
  },
  {
    title: 'Where those edges led',
    event: 'relation_click',
    dimensions: ['customEvent:to', 'customEvent:relation'],
  },
  {
    title: 'How search was opened',
    note: 'Whether the keyboard shortcut earns its keep.',
    event: 'search_open',
    dimensions: ['customEvent:via'],
    limit: 12,
  },
  {
    title: 'Pages read, by kind',
    event: 'page_view',
    dimensions: ['customEvent:page_type'],
    limit: 12,
  },
  {
    title: 'Terms read, by category',
    event: 'page_view',
    dimensions: ['customEvent:term_category'],
    limit: 12,
  },
];

async function run(command: string, args: string[]): Promise<string> {
  const proc = Bun.spawn([command, ...args], { stdout: 'pipe', stderr: 'pipe' });
  const [out, err, code] = await Promise.all([new Response(proc.stdout).text(), new Response(proc.stderr).text(), proc.exited]);
  if (code !== 0) throw new Error(`${command} failed: ${err.trim() || out.trim()}`);
  return out.trim();
}

/**
 * A token for the service account, minted through the caller's gcloud credentials.
 * Nothing is stored: the token lives for this process and is never written down.
 */
async function token(): Promise<string> {
  let caller: string;
  try {
    caller = await run('gcloud', ['auth', 'application-default', 'print-access-token']);
  } catch {
    throw new Error('no gcloud credentials. Run: gcloud auth application-default login');
  }
  const response = await fetch(
    `https://iamcredentials.googleapis.com/v1/projects/-/serviceAccounts/${SERVICE_ACCOUNT}:generateAccessToken`,
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${caller}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ scope: SCOPES, lifetime: '3600s' }),
    },
  );
  const body = (await response.json()) as { accessToken?: string; error?: { message?: string } };
  if (!body.accessToken) throw new Error(`could not impersonate ${SERVICE_ACCOUNT}: ${body.error?.message ?? response.statusText}`);
  return body.accessToken;
}

function filters(question: Question) {
  const expressions = [];
  if (question.event) {
    expressions.push({ filter: { fieldName: 'eventName', stringFilter: { value: question.event } } });
  }
  for (const [field, value] of Object.entries(question.where ?? {})) {
    expressions.push({ filter: { fieldName: field, stringFilter: { value } } });
  }
  if (expressions.length === 0) return undefined;
  if (expressions.length === 1) return expressions[0];
  return { andGroup: { expressions } };
}

async function ask(auth: string, question: Question, days: number, realtime: boolean): Promise<Row[]> {
  const endpoint = realtime ? 'runRealtimeReport' : 'runReport';
  const body: Record<string, unknown> = {
    dimensions: question.dimensions.map((name) => ({ name })),
    metrics: [{ name: 'eventCount' }],
    dimensionFilter: filters(question),
    orderBys: [{ metric: { metricName: 'eventCount' }, desc: true }],
    limit: question.limit ?? ROWS,
  };
  // Realtime covers the last 30 minutes and takes no date range, which is exactly what
  // makes it the right tool for "did that event I just fired arrive".
  if (!realtime) body.dateRanges = [{ startDate: `${days}daysAgo`, endDate: 'today' }];
  const response = await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${PROPERTY}:${endpoint}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${auth}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const report = (await response.json()) as ReportResponse;
  if (report.error) throw new Error(report.error.message ?? response.statusText);
  return report.rows ?? [];
}

/** YYYY-MM-DD, which is the only date format Search Console accepts. */
function day(offset: number): string {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() - offset);
  return date.toISOString().slice(0, 10);
}

/**
 * Search Console's data lags two or three days and cannot be hurried, so the last rows of
 * any window are always empty. Nothing is wrong when a fresh property answers with nothing:
 * a new domain is not crawled on the day it appears.
 */
async function arrivals(auth: string, question: Arrival, days: number): Promise<Row[]> {
  const site = encodeURIComponent(SEARCH_CONSOLE_SITE);
  const response = await fetch(`https://searchconsole.googleapis.com/webmasters/v3/sites/${site}/searchAnalytics/query`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${auth}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      startDate: day(days),
      endDate: day(0),
      dimensions: question.dimensions,
      rowLimit: question.limit ?? ROWS,
    }),
  });
  const body = (await response.json()) as {
    rows?: { keys?: string[]; clicks?: number; impressions?: number; ctr?: number; position?: number }[];
    error?: { message?: string };
  };
  if (body.error) throw new Error(body.error.message ?? response.statusText);
  // Reshaped into the same rows the Data API returns, so one renderer prints both sources.
  return (body.rows ?? []).map((row) => ({
    dimensionValues: (row.keys ?? []).map((value) => ({ value })),
    metricValues: [
      { value: String(row.clicks ?? 0) },
      { value: String(row.impressions ?? 0) },
      { value: `${(100 * (row.ctr ?? 0)).toFixed(1)}%` },
      { value: (row.position ?? 0).toFixed(1) },
    ],
  }));
}

/**
 * GA4 spells "this event did not carry the parameter" two different ways, and which one
 * it uses changed under us on 2026-08-27: every event-scoped custom dimension in the
 * property switched from `(not set)` to an empty string on the same day, including ones
 * the site never sends on a page view. Both mean absent, so both are printed as absent
 * rather than as an unlabelled row nobody can interpret.
 */
function label(value: string | undefined): string {
  return value === undefined || value === '' ? '(absent)' : value;
}

function table(rows: Row[], headers?: string[]): string {
  if (rows.length === 0) return '  (nothing)';
  const cells = rows.map((row) => [
    ...(row.dimensionValues ?? []).map((d) => label(d.value)),
    ...(row.metricValues ?? []).map((m) => m.value ?? '0'),
  ]);
  const metrics = (rows[0]?.metricValues ?? []).length;
  const body = headers ? [[...headers], ...cells] : cells;
  const widths = body[0]?.map((_, i) => Math.max(...body.map((c) => (c[i] ?? '').length))) ?? [];
  return body
    .map(
      (cell) =>
        `  ${cell.map((value, i) => (i >= cell.length - metrics ? value.padStart(Math.max(widths[i] ?? 0, 6)) : value.padEnd(widths[i] ?? 0))).join('  ')}`,
    )
    .join('\n');
}

const args = process.argv.slice(2);
const realtime = args.includes('--now');
const json = args.includes('--json');
const days = Number(args.find((a) => /^\d+$/.test(a)) ?? 28);

const SEARCH_METRICS = ['clicks', 'impr', 'ctr', 'pos'];

const auth = await token();
const answers: { question: Question; rows: Row[]; failed?: string }[] = [];
for (const question of realtime ? NOW : QUESTIONS) {
  try {
    answers.push({ question, rows: await ask(auth, question, days, realtime) });
  } catch (error) {
    // One question failing (a dimension GA has not finished registering, most likely) is
    // not a reason to lose the rest of the report.
    answers.push({ question, rows: [], failed: error instanceof Error ? error.message : String(error) });
  }
}

// Realtime is a GA-only idea: Search Console has no such thing, so `--now` skips it.
if (!realtime) {
  for (const arrival of ARRIVALS) {
    const question: Question = { ...arrival, headers: [...arrival.dimensions, ...SEARCH_METRICS] };
    try {
      answers.push({ question, rows: await arrivals(auth, arrival, days) });
    } catch (error) {
      answers.push({ question, rows: [], failed: error instanceof Error ? error.message : String(error) });
    }
  }
}

if (json) {
  console.log(
    JSON.stringify(
      answers.map(({ question, rows }) => ({
        title: question.title,
        rows: rows.map((row) => ({
          values: (row.dimensionValues ?? []).map((d) => d.value),
          metrics: Object.fromEntries(
            (row.metricValues ?? []).map((m, i) => [question.headers?.slice(-(row.metricValues ?? []).length)[i] ?? 'count', m.value]),
          ),
        })),
      })),
      null,
      2,
    ),
  );
} else {
  const window = realtime ? 'the last 30 minutes' : `the last ${days} days`;
  console.log(`\nvocab.design · what readers could not find · ${window}\n${'='.repeat(64)}`);
  for (const { question, rows, failed } of answers) {
    console.log(`\n${question.title}`);
    if (question.note) console.log(`  ${question.note}`);
    console.log(failed ? `  unavailable: ${failed}` : table(rows, question.headers));
  }
  console.log('\nGA custom dimensions take a day or two to report after being created, and Search Console lags two to three days.\n');
}
