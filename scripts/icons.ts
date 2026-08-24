import { readFileSync } from 'node:fs';
import { chromium } from '@playwright/test';

/**
 * Raster the icon set from the one drawing that is source: `public/favicon.svg`.
 *
 *   bun run icons
 *
 * An SVG favicon covers every modern browser at every size, but two consumers cannot
 * take one. A browser asks for `/favicon.ico` before it has parsed any HTML, and on a
 * static host a missing one is answered with the 404 page; iOS wants a PNG for a home
 * screen and photographs the page itself when there is none. So this writes exactly
 * those two files and nothing else: `public/favicon.ico` (16 and 32, PNG-in-ICO, which
 * every browser since IE11 reads) and `public/apple-touch-icon.png` at 180.
 *
 * The Apple icon is rendered over an opaque accent ground rather than with the tile's
 * transparent corners, because iOS applies its own rounding: transparent corners under
 * that mask are a gamble on what shows through, and the mask's radius is within a
 * pixel of the tile's own anyway.
 *
 * Run it after editing the SVG. Nothing checks that these three agree, the same trade
 * the share images make (SPEC §10).
 */

const SVG = 'public/favicon.svg';
const ICO = 'public/favicon.ico';
const APPLE = 'public/apple-touch-icon.png';
/** The tile's own fill, so the Apple icon's corners are the tile rather than a hole. */
const GROUND = '#b34410';
const ICO_SIZES = [16, 32];
const APPLE_SIZE = 180;

/**
 * An ICO is a tiny container: a 6-byte header, one 16-byte directory entry per image,
 * then the images themselves. A zero width or height byte means 256, which is why the
 * dimensions are single bytes at all.
 */
function packIco(images: { size: number; png: Buffer }[]): Buffer {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // 1 = icon
  header.writeUInt16LE(images.length, 4);
  let offset = 6 + images.length * 16;
  const entries: Buffer[] = [];
  for (const { size, png } of images) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size % 256, 0);
    entry.writeUInt8(size % 256, 1);
    entry.writeUInt8(0, 2); // palette colors
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(png.length, 8);
    entry.writeUInt32LE(offset, 12);
    entries.push(entry);
    offset += png.length;
  }
  return Buffer.concat([header, ...entries, ...images.map((image) => image.png)]);
}

const svg = readFileSync(SVG, 'utf8');
const source = `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;

const browser = await chromium.launch();

async function raster(size: number, ground?: string): Promise<Buffer> {
  // A page exactly the icon's size, so the shot is the icon and no cropping is involved.
  const page = await browser.newPage({ viewport: { width: size, height: size }, deviceScaleFactor: 1 });
  await page.setContent(
    `<body style="margin:0;background:${ground ?? 'transparent'}"><img src="${source}" width="${size}" height="${size}"></body>`,
  );
  await page.waitForFunction(() => document.querySelector('img')?.complete === true);
  const png = await page.screenshot({ omitBackground: !ground });
  await page.close();
  return png;
}

const icoImages = [];
for (const size of ICO_SIZES) icoImages.push({ size, png: await raster(size) });
await Bun.write(ICO, packIco(icoImages));
await Bun.write(APPLE, await raster(APPLE_SIZE, GROUND));

await browser.close();

for (const file of [SVG, ICO, APPLE]) console.log(`${file} ${(Bun.file(file).size / 1024).toFixed(1)}KB`);
