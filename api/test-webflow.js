// api/test-webflow.js
// Verifies Webflow connection. Uses global fetch (Node 18+ on Vercel).

function setCors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

// simple helper to handle OPTIONS preflight
export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    setCors(res);
    return res.status(204).end();
  }
  setCors(res);

  try {
    const SITE_ID = process.env.SITE_ID;
    const TOKEN = process.env.WEBFLOW_API_TOKEN;
    if (!SITE_ID || !TOKEN) {
      return res.status(400).json({ error: 'Missing SITE_ID or WEBFLOW_API_TOKEN in env' });
    }

    const wfRes = await fetch(`https://api.webflow.com/v2/sites/${SITE_ID}`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        'accept-version': '1.0.0'
      }
    });

    const body = await wfRes.json();
    if (!wfRes.ok) {
      return res.status(wfRes.status).json({ error: body });
    }
    return res.status(200).json(body);
  } catch (err) {
    console.error('test-webflow error', err);
    return res.status(500).json({ error: String(err) });
  }
}
