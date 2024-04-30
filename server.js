import { createServer } from 'http';
import url from 'url';
import path from 'path';
import fs from 'fs/promises';
const PORT = 8000;

// Get current path
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createPublicPath(base) {
  return path.join(__dirname, 'public', `${base}.html`);
}

const server = createServer(async (req, res) => {
  try {
    if (req.method === 'GET') {
      let filePath;
      const fileName = req.url === '/' ? '/index' : req.url;
      const routeOK = ['/index', '/about', '/contact'].includes(fileName);

      filePath = createPublicPath(routeOK ? fileName : '404');

      const data = await fs.readFile(filePath);
      res.statusCode = routeOK ? 200 : 404;
      res.setHeader('Content-Type', 'text/html');
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
