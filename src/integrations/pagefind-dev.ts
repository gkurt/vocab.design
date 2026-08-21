import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { extname, join, normalize, resolve, sep } from 'node:path';
import type { AstroIntegration } from 'astro';

/**
 * Serves the built Pagefind index at `/pagefind/*` while `astro dev` is running.
 *
 * Pagefind indexes `dist/` after Astro has written it, so the index is a build artifact
 * and the dev server knows nothing about it: `/search` is the one page that is dead in
 * dev, which is exactly where you want to work on it. This hands those requests to
 * `dist/pagefind/` off disk. Run `bun run build` once and dev search works, against
 * whatever the index held at that moment.
 *
 * That staleness is the deal, not a defect: the index is only as fresh as the last
 * build, so a term edited since then is searchable at its old text. Rebuild to refresh.
 *
 * Dev only. The build already emits these files into `dist/`, and `public/` is the wrong
 * home for them: 6MB of generated artifact does not belong in the repo, and it would be
 * copied into `dist/` on every build only to be overwritten by the real index.
 */

const MIME: Record<string, string> = {
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.wasm': 'application/wasm',
};

export function pagefindDev(distDir = 'dist'): AstroIntegration {
  return {
    name: 'pagefind-dev',
    hooks: {
      'astro:config:setup': ({ command, updateConfig, logger }) => {
        if (command !== 'dev') return;
        const root = resolve(distDir, 'pagefind');
        updateConfig({
          vite: {
            plugins: [
              {
                name: 'pagefind-dev',
                configureServer(server) {
                  server.middlewares.use('/pagefind', (req, res, next) => {
                    // Resolved per request, not at startup, so a build that finishes
                    // while dev is running starts answering without a restart.
                    const rel = normalize(decodeURIComponent((req.url ?? '/').split('?')[0] ?? '/'));
                    const file = join(root, rel);
                    if (!file.startsWith(root + sep)) return next();
                    stat(file)
                      .then((info) => {
                        if (!info.isFile()) return next();
                        // Pagefind's own fetches are same-origin and uncached here on
                        // purpose: a rebuilt index should not be shadowed by dev cache.
                        res.setHeader('Content-Type', MIME[extname(file)] ?? 'application/octet-stream');
                        res.setHeader('Content-Length', info.size);
                        res.setHeader('Cache-Control', 'no-store');
                        createReadStream(file).pipe(res);
                      })
                      .catch(() => next());
                  });
                },
              },
            ],
          },
        });
        stat(root).catch(() =>
          logger.warn(`no index at ${distDir}/pagefind, so /search will report itself empty. Run \`bun run build\` once to populate it.`),
        );
      },
    },
  };
}
