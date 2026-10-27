const fs = require('node:fs/promises');
const path = require('node:path');
const sharp = require('sharp');

async function main() {
  const source = 'C:/Users/ozemo/OneDrive/Documents/photos for the photography page';
  const target = path.resolve('public/images/folder-collection');
  await fs.mkdir(target, { recursive: true });
  const files = (await fs.readdir(source)).filter(name => /\.(jpe?g|png|webp)$/i.test(name)).sort();
  const tiles = [];
  for (const [index, name] of files.entries()) {
    const output = path.basename(name, path.extname(name)) + '.webp';
    await sharp(path.join(source, name)).rotate().resize({ width: 2200, height: 2200, fit: 'inside', withoutEnlargement: true }).webp({ quality: 86 }).toFile(path.join(target, output));
    const thumb = await sharp(path.join(target, output)).resize(180, 150, { fit: 'contain', background: '#eeeeee' }).extend({ bottom: 30, background: '#ffffff' }).composite([{ input: Buffer.from(`<svg width="180" height="30"><text x="8" y="20" font-size="13">${name}</text></svg>`), top: 150, left: 0 }]).png().toBuffer();
    tiles.push({ input: thumb, left: (index % 8) * 180, top: Math.floor(index / 8) * 180 });
  }
  await sharp({ create: { width: 1440, height: Math.ceil(files.length / 8) * 180, channels: 3, background: '#ffffff' } }).composite(tiles).jpeg({ quality: 85 }).toFile('../folder-contact.jpg');
  console.log(JSON.stringify(files.map(name => '/images/folder-collection/' + path.basename(name, path.extname(name)) + '.webp')));
}
main().catch(error => { console.error(error); process.exitCode = 1; });
