import { createServer } from 'https';
import url from 'url';
import path from 'path';
import fs from 'fs/promises';
const PORT = 8000;

// Get current path
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = createServer(async (req, res) => {
  try {
    let filePath;
    switch (req.url) {
      case '/': {
        filePath = path.join(__dirname, 'public', 'index.html');
        break;
      }
      case '/about': {
        filePath = path.join(__dirname, 'public', 'about.html');
        break;
      }
      case '/contact': {
        filePath = path.join(__dirname, 'public', 'contact.html');
        break;
      }

      default:
        filePath = path.join(__dirname, 'public', '404.html');
        break;
    }
  } catch (error) {}
});
