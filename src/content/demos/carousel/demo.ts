import { icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';

const SLIDES = [
  { title: 'Reef habitats', tag: 'Chapter one' },
  { title: 'Tide pools', tag: 'Chapter two' },
  { title: 'Kelp forests', tag: 'Chapter three' },
];

/**
 * Carousel specimen: a fixed viewport onto a longer row, with arrows and dots
 * moving the window along. The subject is the region that owns the slides *and*
 * their controls, since a track without controls is just a row.
 *
 * Every control resolves to an absolute index through one `go()` (SPEC §8): the
 * arrows compute a neighbour and hand it over, so no step is a flip whose result
 * depends on the state it happened to find. Nothing here rotates on a timer,
 * which is the one thing the pattern is most often blamed for.
 *
 * The track slides by `translate`, so the slide that arrives takes exactly the
 * room the one leaving gave up and no part of the scene moves (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const slides = SLIDES.map(
    ({ title, tag }, i) => `
      <div
        class="sp-row"
        data-part="slide-${i + 1}"
        role="group"
        aria-roledescription="slide"
        aria-label="${i + 1} of ${SLIDES.length}"
        style="flex: 0 0 100%; height: 100%; gap: 12px; padding: 10px"
      >
        <div class="sp-swatch" style="flex: 0 0 84px; height: 100%; --sp-swatch: var(--sp-accent-soft); display: flex; align-items: center; justify-content: center">
          <span class="sp-heading" style="font-size: 24px">${i + 1}</span>
        </div>
        <div class="sp-stack" style="flex: 1 1 auto; min-width: 0; gap: 7px">
          <span class="sp-label">${tag}</span>
          <span class="sp-heading">${title}</span>
          <div class="sp-line" style="width: 94%"></div>
          <div class="sp-line" style="width: 72%"></div>
        </div>
      </div>`,
  ).join('');

  const dots = SLIDES.map(
    (_, i) =>
      `<button class="sp-chip" type="button" data-part="dot-${i + 1}" aria-label="Show slide ${i + 1}" style="width: 10px; height: 10px; padding: 0"></button>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" style="width: 400px; height: 262px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Field guide</span>
          <span class="sp-text">Coastal</span>
        </div>
        <div class="sp-body">
          <section data-part="carousel" data-subject role="group" aria-roledescription="carousel" aria-label="Field guide chapters">
            <div class="sp-surface" data-part="viewport" aria-live="polite" style="overflow: hidden; height: 116px">
              <div
                class="sp-row"
                data-part="track"
                data-index="0"
                style="height: 100%; gap: 0; align-items: stretch; translate: 0 0; transition: translate 0.34s var(--sp-ease)"
              >${slides}</div>
            </div>
            <div class="sp-row sp-row--between" style="margin-top: 10px">
              <button class="sp-icon-button" type="button" data-part="prev" aria-label="Previous slide">
                <span style="display: flex; rotate: 180deg">${icon('chevronRight')}</span>
              </button>
              <div class="sp-row" style="gap: 7px">${dots}</div>
              <button class="sp-icon-button" type="button" data-part="next" aria-label="Next slide">${icon('chevronRight')}</button>
            </div>
          </section>
          <div class="sp-stack sp-context" style="margin-top: 12px; gap: 7px">
            <div class="sp-line" style="width: 88%"></div>
            <div class="sp-line" style="width: 64%"></div>
          </div>
        </div>
      </div>
    </div>
  `;

  const track = part(root, 'track');
  const panels = SLIDES.map((_, i) => part(root, `slide-${i + 1}`));
  const markers = SLIDES.map((_, i) => part(root, `dot-${i + 1}`));

  let index = 0;

  const go = (to: number) => {
    index = (to + SLIDES.length) % SLIDES.length;
    track.dataset.index = String(index);
    track.style.translate = `${index * -100}% 0`;
    panels.forEach((panel, i) => {
      flag(panel, 'data-current', i === index);
      // The slides waiting off screen are still in the row, and a reader stepping
      // by keyboard should not find them there.
      panel.setAttribute('aria-hidden', String(i !== index));
    });
    markers.forEach((marker, i) => {
      flag(marker, 'data-selected', i === index);
      if (i === index) marker.setAttribute('aria-current', 'true');
      else marker.removeAttribute('aria-current');
    });
  };

  markers.forEach((marker, i) => marker.addEventListener('click', () => go(i)));
  part(root, 'prev').addEventListener('click', () => go(index - 1));
  part(root, 'next').addEventListener('click', () => go(index + 1));

  go(0);
}
