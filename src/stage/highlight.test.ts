import { describe, expect, test } from 'bun:test';
import { highlightBox } from '#src/stage/highlight.ts';

const CANVAS = { width: 800, height: 344 };

describe('highlightBox', () => {
  test('pads a comfortable subject and keeps it centred', () => {
    const box = highlightBox({ left: 300, top: 100, width: 300, height: 120 }, CANVAS);
    expect(box.width).toBe(332);
    expect(box.height).toBe(152);
    expect(box.left + box.width / 2).toBe(450);
    expect(box.top + box.height / 2).toBe(160);
  });

  test('grows a chip-sized subject to something a still can show', () => {
    const box = highlightBox({ left: 396, top: 168, width: 8, height: 8 }, CANVAS);
    expect(box.width).toBeGreaterThan(CANVAS.width * 0.3);
    expect(box.height).toBeGreaterThan(CANVAS.height * 0.3);
    // Still centred on the subject, which is the whole point of pointing at it.
    expect(box.left + box.width / 2).toBe(400);
    expect(box.top + box.height / 2).toBe(172);
  });

  test('slides a subject at the edge inside the canvas rather than shrinking the highlight', () => {
    const box = highlightBox({ left: 0, top: 0, width: 20, height: 20 }, CANVAS);
    expect(box.left).toBe(0);
    expect(box.top).toBe(0);
    expect(box.width).toBeCloseTo(CANVAS.width * 0.32);
    expect(box.height).toBeCloseTo(CANVAS.height * 0.32);
  });

  test('never reaches past the far edge either', () => {
    const box = highlightBox({ left: 780, top: 330, width: 20, height: 14 }, CANVAS);
    expect(box.left + box.width).toBeLessThanOrEqual(CANVAS.width);
    expect(box.top + box.height).toBeLessThanOrEqual(CANVAS.height);
  });

  test('a subject as big as the canvas fades nothing outside it', () => {
    const box = highlightBox({ left: 0, top: 0, width: 800, height: 344 }, CANVAS);
    expect(box).toEqual({ left: 0, top: 0, width: 800, height: 344 });
  });
});
