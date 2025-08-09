// api/from-figma.js
// Receives payloads from Figma plugin and (for now) logs/echoes them.
// This is where you'll later forward to Webflow (assets/pages/CMS).

function setCors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

async function parseJSONBody(req) {
  // Vercel/Node often provides req.body already. Fallback: read stream and parse.
  if (req.body) return req.body;
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  if (!chunks.length) return {};
  const raw = Buffer.concat(chunks).toString('utf8');
  try { return JSON.parse(raw); } catch (e) { return { raw }; }
}

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    setCors(res);
    return res.status(204).end();
  }
  setCors(res);

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const payload = await parseJSONBody(req);
    console.log('📦 Received from Figma:', payload);

    // TODO: transform payload and call Webflow API (assets/pages/collections)
    // Example placeholder response:
    return res.status(200).json({ status: 'ok', received: payload });
  } catch (err) {
    console.error('from-figma error', err);
    return res.status(500).json({ error: String(err) });
  }
}
