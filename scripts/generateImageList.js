const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '../public/images');
const outputFile = path.join(__dirname, '../app/images.js');

const files = fs.readdirSync(imagesDir)
  .filter(file => /\.(jpe?g|png|gif|webp)$/i.test(file))
  .map(file => `/images/${file}`);

const content = `export default ${JSON.stringify(files, null, 2)};\n`;

fs.writeFileSync(outputFile, content);
console.log('Image list generated!');
