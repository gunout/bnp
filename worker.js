/**
 * EURONEXT API PROXY — Cloudflare Worker
 * =======================================
 * Proxy CORS pour Yahoo Finance (Euronext Paris, Amsterdam, Bruxelles, Lisbonne)
 *
 * Déploiement :
 *   1. https://dash.cloudflare.com → Workers & Pages → Create
 *   2. Nom : euronext-proxy
 *   3. Coller ce code → Deploy
 *   4. URL finale : https://euronext-proxy.<sous-domaine>.workers.dev
 *
 * Usage :
 *   https://euronext-proxy.xxx.workers.dev/?url=<URL_ENCODÉE>
 *   ex: ?url=https%3A%2F%2Fquery1.finance.yahoo.com%2Fv8%2Ffinance%2Fchart%2FBNP.PA
 *
 * Test rapide :
 *   curl "https://euronext.gunout.workers.dev/?url=https%3A%2F%2Fquery1.finance.yahoo.com%2Fv8%2Ffinance%2Fchart%2FBNP.PA%3Finterval%3D1d%26range%3D1d"
 */

/* ============================================================
   CONFIGURATION
   ============================================================ */

const ALLOWED_HOSTS = [
  'query1.finance.yahoo.com',
  'query2.finance.yahoo.com'
];

const CACHE_TTL = 30; // secondes

const USER_AGENTS = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15',
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0'
];

/* ============================================================
   HANDLER PRINCIPAL
   ============================================================ */

export default {
  async fetch(request, env, ctx) {

    // --- CORS preflight ---
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders() });
    }

    // --- Méthode autorisée ---
    if (request.method !== 'GET') {
      return jsonError('Method not allowed', 405);
    }

    // --- Extraction du paramètre url ---
    const reqUrl = new URL(request.url);
    const target = reqUrl.searchParams.get('url');

    if (!target) {
      return jsonError('Missing url param. Usage: ?url=<URL_ENCODÉE>', 400);
    }

    // --- Décodage et validation ---
    let targetUrl;
    try {
      targetUrl = new URL(decodeURIComponent(target));
    } catch {
      try {
        targetUrl = new URL(target);
      } catch {
        return jsonError('Invalid URL', 400);
      }
    }

    // --- Whitelist ---
    if (!ALLOWED_HOSTS.includes(targetUrl.hostname)) {
      return jsonError(`Only ${ALLOWED_HOSTS.join(', ')} allowed`, 403);
    }

    // --- Cache Cloudflare ---
    const cacheKey = new Request(targetUrl.toString(), { method: 'GET' });
    const cache = caches.default;
    let cached = await cache.match(cacheKey);

    if (cached) {
      const res = new Response(cached.body, cached);
      res.headers.set('X-Cache', 'HIT');
      applyCors(res.headers);
      return res;
    }

    // --- Fetch upstream ---
    const ua = USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)];

    const upstreamHeaders = {
      'User-Agent': ua,
      'Accept': 'application/json,text/plain,*/*',
      'Accept-Language': 'fr-FR,fr;q=0.9,en;q=0.8',
      'Referer': 'https://finance.yahoo.com/',
      'Origin': 'https://finance.yahoo.com'
    };

    let upstream;
    try {
      upstream = await fetch(targetUrl.toString(), {
        method: 'GET',
        headers: upstreamHeaders,
        redirect: 'follow',
        cf: {
          cacheTtl: CACHE_TTL,
          cacheEverything: true
        }
      });
    } catch (e) {
      return jsonError('Upstream error: ' + e.message, 502);
    }

    if (!upstream.ok) {
      return jsonError(`Upstream ${upstream.status} ${upstream.statusText}`, upstream.status);
    }

    // --- Construction de la réponse ---
    const contentType = upstream.headers.get('content-type') || 'application/json';
    const body = await upstream.arrayBuffer();

    const response = new Response(body, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': `public, max-age=${CACHE_TTL}`,
        'X-Cache': 'MISS',
        'X-Upstream-Status': String(upstream.status)
      }
    });

    applyCors(response.headers);
    ctx.waitUntil(cache.put(cacheKey, response.clone()));

    return response;
  }
};

/* ============================================================
   HELPERS
   ============================================================ */

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400'
  };
}

function applyCors(headers) {
  headers.set('Access-Control-Allow-Origin', '*');
  headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
  headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

function jsonError(message, status = 500) {
  return new Response(
    JSON.stringify({ error: true, status, message }),
    {
      status,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders()
      }
    }
  );
}
