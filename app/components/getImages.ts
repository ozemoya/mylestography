// pages/api/getImages.js
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const imagesDir = path.join(process.cwd(), 'public', 'images');
  const files = fs.readdirSync(imagesDir);

  const images = files
    .filter(file => /\.(jpg|jpeg|png|gif)$/.test(file)) // Filter only images
    .map(file => `/images/${file}`);

  res.status(200).json(images); // Return images as JSON
}