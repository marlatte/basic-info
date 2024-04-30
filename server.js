import { createServer } from 'http';
import url from 'url';
import path from 'path';
import fs from 'fs/promises';
const PORT = 8000;

// Get current path
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = createServer(async (req, res) => {
  try {
    if (req.method === 'GET') {
      let filePath, fileNotFound;

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
          fileNotFound = 404;
          break;
      }

      const data = await fs.readFile(filePath);
      res.writeHead(fileNotFound || 200, { 'Content-Type': 'text/html' });
      res.write(data);
      res.end();
    } else {
      throw new Error('Method not allowed');
    }
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Server error');
  }
});

server.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
