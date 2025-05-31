import url from 'url';
import path from 'path';
import express from 'express';
const app = express();
const PORT = 8000;

// Get current path
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createPublicPath(base) {
  return path.join(__dirname, 'public', `${base}.html`);
}

app.get('/', (req, res) => {
  res.sendFile(createPublicPath('/index'));
});

app.get('/about', (req, res) => {
  res.sendFile(createPublicPath('about'));
});

app.get('/contact', (req, res) => {
  res.sendFile(createPublicPath('contact'));
});

app.get('/*catchAll', (req, res) => {
  res.sendFile(createPublicPath('404'));
});

app.listen(PORT, () => {
  console.log(`Express app running on http://localhost:${PORT}`);
});
