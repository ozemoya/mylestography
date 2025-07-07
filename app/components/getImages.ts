
import fs from 'fs';
import path from 'path';

import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const imagesDir = path.join(process.cwd(), 'public', 'images');
  const files = fs.readdirSync(imagesDir);


  const images = files
    .filter(file => /\.(jpg|jpeg|png|gif|CR3|JPG)$/.test(file)) // Filter only images, all relevant extensions
    .map(file => `/images/${file}`);

  res.status(200).json(images); // Return images as JSON
}