/**
 * Publish a locally built `dist/` to GitHub Pages through the `gh-pages` branch, without
 * the Actions workflow.
 *
 * Pages has two deploy flows and only one of them is an Actions workflow you pay for. The
 * branch flow is a GitHub-managed build that keeps running when your own workflows cannot
 * (an exhausted Actions budget stops `deploy-pages.yml` dead but not this), so this is the
 * way to ship while billing is sorted out, and the fallback for any day CI is down.
 *
 * Two things about it are load-bearing:
 *
 * 1. `.nojekyll` is mandatory. Without it Jekyll processes the branch and drops every path
 *    beginning with an underscore, which is all of `_astro/`: the site deploys and every
 *    stylesheet and script 404s.
 * 2. The branch has to be PUSHED for a build to fire. Pointing the Pages source at a branch
 *    that already exists triggers nothing, which reads exactly like a broken deploy.
 *
 * The branch is a single orphan commit, rewritten every time, so 9,000 build artefacts
 * never accumulate as history.
 *
 *   bun run deploy            # build with the deploy's measurement ID, then publish
 *   bun run deploy --dirty    # publish whatever is in dist/ already
 */

export {}; // top-level await needs this file to be a module

const BRANCH = 'gh-pages';
const WORKTREE = '.git/vd-deploy';
/** The deploy's own measurement ID, matching the PUBLIC_GA_ID repository variable. */
const GA_ID = process.env.PUBLIC_GA_ID ?? 'G-8F2F1H3YTZ';

async function sh(command: string[], cwd?: string): Promise<string> {
  const proc = Bun.spawn(command, { cwd, stdout: 'pipe', stderr: 'pipe', env: { ...process.env, PUBLIC_GA_ID: GA_ID } });
  const [out, err, code] = await Promise.all([new Response(proc.stdout).text(), new Response(proc.stderr).text(), proc.exited]);
  if (code !== 0) throw new Error(`${command.join(' ')}\n${err.trim() || out.trim()}`);
  return out.trim();
}

const dirty = process.argv.includes('--dirty');
const head = await sh(['git', 'rev-parse', '--short', 'HEAD']);

if (!dirty) {
  console.log(`building ${head} with PUBLIC_GA_ID=${GA_ID}`);
  await sh(['bun', 'run', 'build']);
}

const cname = await Bun.file('dist/CNAME')
  .text()
  .catch(() => '');
if (!cname.trim()) throw new Error('dist/CNAME is missing: the custom domain would be dropped on deploy');

// A fresh worktree every run, so a half-finished deploy can never be published.
await sh(['rm', '-rf', WORKTREE]);
await sh(['git', 'worktree', 'prune']);
await sh(['git', 'worktree', 'add', '--detach', WORKTREE]);
// The local branch is disposable: what matters is the remote. Dropping it keeps every
// deploy a single orphan commit instead of failing because last time's branch is still here.
await sh(['git', 'branch', '-D', BRANCH]).catch(() => undefined);
await sh(['git', 'checkout', '--orphan', BRANCH], WORKTREE);
await sh(['git', 'rm', '-rq', '--cached', '.'], WORKTREE).catch(() => undefined);
await sh(['bash', '-c', `find . -maxdepth 1 ! -name . ! -name .git -exec rm -rf {} +`], WORKTREE);
await sh(['bash', '-c', `cp -R "${process.cwd()}/dist/." .`], WORKTREE);
await sh(['bash', '-c', 'touch .nojekyll'], WORKTREE);
await sh(['git', 'add', '-A'], WORKTREE);
await sh(['git', 'commit', '-q', '-m', `Built site: ${head}`], WORKTREE);
const files = (await sh(['git', 'ls-files'], WORKTREE)).split('\n').length;
await sh(['git', 'push', '--force', '-q', 'origin', BRANCH], WORKTREE);
await sh(['git', 'worktree', 'remove', WORKTREE, '--force']);

console.log(`pushed ${files} files to ${BRANCH} from ${head}`);
console.log(`Pages builds it in a minute or two: https://${cname.trim()}/`);
console.log('If nothing changes, check that the Pages source is still the branch: gh api /repos/gkurt/vocab.design/pages');
