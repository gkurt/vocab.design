/**
 * Low poly specimen: a faceted landscape drawn as flat filled triangles, every face one
 * colour and every boundary a hard line, beside the same gem rendered twice so the term's
 * mechanism is stated rather than asserted: faceted on the left, smoothly interpolated on
 * the right, identical silhouette, different surface.
 *
 * The facets are drawn rather than rendered. There is no mesh, no normal, and no light
 * here; each triangle's fill was picked by hand from one hue at several lightnesses, which
 * is exactly how illustrators reach the look without a renderer.
 *
 * The subject is the faceted scene. The comparison gems, the legend, and the caption are
 * the scenery that makes it readable, so they carry the context register (SPEC §5). Static:
 * an illustration has no states to watch.
 */
const SKY = ['#e6effc', '#d0e0f6'];
const ROCK = { litA: '#7186bd', shadeA: '#4a5f8f', litB: '#8098c9', shadeB: '#56709c' };
const SNOW = ['#f2f6ff', '#d8e2f6'];
const GROUND = ['#46996f', '#3f8f6b', '#35805f', '#2f7355'];
const GEM = ['#9fe7de', '#6bcfc4', '#43b9ad', '#35a196', '#2c8880'];

const poly = (points: string, fill: string, part?: string) =>
  `<polygon points="${points}" fill="${fill}"${part ? ` data-part="${part}"` : ''} />`;

/** The five-sided stone, cut into five faces around a centre point. */
const GEM_FACES = ['36,6 62,26 36,34', '62,26 52,64 36,34', '52,64 20,64 36,34', '20,64 10,26 36,34', '10,26 36,6 36,34'];
const GEM_OUTLINE = '36,6 62,26 52,64 20,64 10,26';

export function mount(root: HTMLElement): void {
  const scene = [
    poly('0,0 288,0 288,58 0,84', SKY[0] ?? '#e6effc'),
    poly('0,84 288,58 288,141 0,141', SKY[1] ?? '#d0e0f6'),
    poly('245,38 238,49 226,49 219,38 226,27 238,27', '#ffd166', 'sun'),
    poly('214,72 150,140 214,140', ROCK.shadeB),
    poly('214,72 284,140 214,140', ROCK.litB, 'facet-far'),
    poly('96,44 8,140 96,140', ROCK.shadeA, 'facet-shade'),
    poly('96,44 176,140 96,140', ROCK.litA, 'facet-lit'),
    poly('96,44 70,72 96,72', SNOW[0] ?? '#f2f6ff', 'facet-cap'),
    poly('96,44 122,72 96,72', SNOW[1] ?? '#d8e2f6'),
    poly('0,140 72,140 36,184', GROUND[1] ?? '#3f8f6b'),
    poly('0,140 36,184 0,184', GROUND[2] ?? '#35805f'),
    poly('72,140 144,140 108,184', GROUND[0] ?? '#46996f'),
    poly('72,140 108,184 36,184', GROUND[3] ?? '#2f7355'),
    poly('144,140 216,140 180,184', GROUND[1] ?? '#3f8f6b'),
    poly('144,140 180,184 108,184', GROUND[2] ?? '#35805f'),
    poly('216,140 288,140 252,184', GROUND[0] ?? '#46996f'),
    poly('216,140 252,184 180,184', GROUND[3] ?? '#2f7355'),
    poly('288,140 288,184 252,184', GROUND[1] ?? '#3f8f6b'),
  ].join('');

  const faceted = GEM_FACES.map((points, i) => poly(points, GEM[i] ?? '#43b9ad')).join('');

  root.innerHTML = `
    <div class="sp-app" style="gap: 10px">
      <div class="sp-window" style="width: 424px; padding: 13px 14px">
        <div class="sp-row" style="align-items: flex-start; gap: 13px">
          <span data-part="scene" data-subject aria-hidden="true"
                style="flex: 0 0 auto; display: block; width: 290px; height: 186px; overflow: hidden;
                       border-radius: 6px; border: 1px solid var(--sp-line)">
            <svg viewBox="0 0 288 184" width="288" height="184" role="presentation">${scene}</svg>
          </span>

          <div class="sp-stack sp-context" style="flex: 1 1 auto; gap: 8px; align-items: center">
            <div class="sp-stack" style="gap: 3px; align-items: center">
              <svg data-part="gem-faceted" viewBox="0 0 72 72" width="66" height="66" role="presentation">${faceted}</svg>
              <span class="sp-label" style="font-size: 11px">Flat shaded</span>
            </div>
            <div class="sp-stack" style="gap: 3px; align-items: center">
              <svg data-part="gem-smooth" viewBox="0 0 72 72" width="66" height="66" role="presentation">
                <defs>
                  <radialGradient id="lp-smooth" cx="36%" cy="26%" r="78%">
                    <stop offset="0" stop-color="${GEM[0]}" />
                    <stop offset="1" stop-color="${GEM[4]}" />
                  </radialGradient>
                </defs>
                <polygon points="${GEM_OUTLINE}" fill="url(#lp-smooth)" />
              </svg>
              <span class="sp-label" style="font-size: 11px">Interpolated</span>
            </div>
          </div>
        </div>
      </div>

      <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="max-width: 424px; margin: 0; text-align: center">
        Same silhouette either way. Turning the smoothing off is what leaves the edges showing.
      </p>
    </div>
  `;
}
