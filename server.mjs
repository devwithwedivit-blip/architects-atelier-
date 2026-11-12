import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT || 5445);
const ROOT = path.resolve(__dirname, 'mad', 'www.i-mad.com');
const AA_ASSETS = path.join(ROOT, 'assets', 'aa');
const DATASET = JSON.parse(fs.readFileSync(path.join(AA_ASSETS, 'dataset.json'), 'utf8'));

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.otf': 'font/otf',
};

function sendFile(res, filePath, code = 200) {
  const ext = path.extname(filePath).toLowerCase();
  res.writeHead(code, {
    'Content-Type': MIME[ext] || 'application/octet-stream',
    'Cache-Control': 'no-cache',
  });
  fs.createReadStream(filePath).pipe(res);
}

function parseParamVal(raw) {
  if (!raw) return undefined;
  try { return JSON.parse(raw); } catch { return raw; }
}

function handleSanityQuery(urlObj, res) {
  const query = urlObj.searchParams.get('query') || '';
  const searchQuery = String(parseParamVal(urlObj.searchParams.get('$searchQuery')) || '').toLowerCase();
  const category = parseParamVal(urlObj.searchParams.get('$category'));
  const typology = parseParamVal(urlObj.searchParams.get('$typology'));
  const location = parseParamVal(urlObj.searchParams.get('$location'));
  const status = parseParamVal(urlObj.searchParams.get('$status'));

  let result;
  if (query.includes('projectTypology') && !query.includes('featuredProjects') && !query.includes('$searchQuery')) {
    result = ['Institutional', 'Commercial', 'Healthcare', 'Hospitality', 'Interior', 'Residential'].map(name => ({ name }));
  } else if (query.includes('articleTypology') && !query.includes('featuredProjects')) {
    result = searchQuery
      ? DATASET.articles.filter(a => a.title.toLowerCase().includes(searchQuery))
      : DATASET.articles;
  } else if (searchQuery) {
    result = DATASET.projects.filter(
      p => p.title.toLowerCase().includes(searchQuery) ||
           p.metadataTags.projectTypology.name.toLowerCase().includes(searchQuery) ||
           p.location.title.toLowerCase().includes(searchQuery)
    );
  } else if (query.includes('featuredProjects')) {
    let list = [...DATASET.projects];
    if (Array.isArray(category) && !category.includes('*')) {
      list = list.filter(p => category.includes(p.metadataTags.type));
    }
    if (Array.isArray(typology) && !typology.includes('*')) {
      list = list.filter(p => typology.includes(p.metadataTags.projectTypology.name));
    }
    if (Array.isArray(location) && !location.includes('*')) {
      list = list.filter(p => location.includes(p.metadataTags.location));
    }
    if (Array.isArray(status) && !status.includes('*')) {
      list = list.filter(p => status.includes(p.metadataTags.status));
    }
    if (query.includes('title desc')) list.sort((a, b) => b.title.localeCompare(a.title));
    else if (query.includes('title asc')) list.sort((a, b) => a.title.localeCompare(b.title));
    result = { featuredProjects: list };
  } else {
    result = [];
  }

  res.writeHead(200, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
  });
  res.end(JSON.stringify({ ms: 1, query, result }));
}

const server = http.createServer((req, res) => {
  const urlObj = new URL(req.url || '/', `http://localhost:${PORT}`);
  let pathname = decodeURIComponent(urlObj.pathname);

  if (pathname === '/en') pathname = '/';
  else if (pathname.startsWith('/en/')) pathname = pathname.slice(3);
  pathname = pathname.replace(/\/_next\/data\/([^/]+)\/en\.json$/, '/_next/data/$1/index.json');
  pathname = pathname.replace(/\/_next\/data\/([^/]+)\/en\//, '/_next/data/$1/');

  if (pathname.includes('/data/query/')) {
    return handleSanityQuery(urlObj, res);
  }

  if (pathname === '/api/email') {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    return res.end(JSON.stringify({ ok: true }));
  }

  if (pathname === '/_next/image') {
    const targetUrl = urlObj.searchParams.get('url') || '';
    const baseName = path.basename(targetUrl.split('?')[0]);
    const localFile = path.join(AA_ASSETS, baseName);
    if (fs.existsSync(localFile) && fs.statSync(localFile).isFile()) {
      return sendFile(res, localFile);
    }
    res.writeHead(404);
    return res.end('Image not found');
  }

  if (pathname.startsWith('/images/2d8zs6ec/production/')) {
    const baseName = path.basename(pathname);
    const localFile = path.join(AA_ASSETS, baseName);
    if (fs.existsSync(localFile) && fs.statSync(localFile).isFile()) {
      return sendFile(res, localFile);
    }
  }

  const mediaFontMap = {
    'BBManualMono.7bee8b73.woff2': 'BBManualMono.woff2',
    'HelveticaNeue-Light.c8884ff1.woff2': 'HelveticaNeue-Light.woff2',
    'HelveticaNeue-Regular.eac35dd4.otf': 'HelveticaNeue-Regular.otf',
  };
  if (pathname.startsWith('/_next/static/media/')) {
    const baseName = path.basename(pathname);
    if (mediaFontMap[baseName]) {
      const realFont = path.join(ROOT, 'fonts', mediaFontMap[baseName]);
      if (fs.existsSync(realFont)) return sendFile(res, realFont);
    }
  }

  if (pathname === '/_next/static/css/fe2c92f75706a07b.css') {
    res.writeHead(200, { 'Content-Type': 'text/css; charset=utf-8' });
    return res.end('/* uncaptured optional stylesheet */\n');
  }

  const candidates = [];
  if (pathname === '/') {
    candidates.push(path.join(ROOT, 'index.html'));
  } else {
    const cleanRel = pathname.replace(/^\/+/, '');
    candidates.push(path.join(ROOT, cleanRel));
    candidates.push(path.join(ROOT, `${cleanRel.replace(/\/$/, '')}.html`));
    candidates.push(path.join(ROOT, cleanRel, 'index.html'));
  }

  for (const cand of candidates) {
    const resolved = path.resolve(cand);
    if (!resolved.startsWith(path.resolve(ROOT))) continue;
    if (fs.existsSync(resolved) && fs.statSync(resolved).isFile()) {
      return sendFile(res, resolved);
    }
  }

  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Not found: ' + pathname);
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Architects Atelier live at http://localhost:${PORT}`);
});
