// Homo Ludens Worker: serves the static site from ./public and handles /api/feedback.
// Feedback is checked (same origin, size, honeypot, Turnstile, rate limit) and posted to a Discord channel.
//
// Secrets (set once with `npx wrangler secret put NAME`, or in the Cloudflare dashboard):
//   DISCORD_WEBHOOK_URL  the channel webhook URL from Discord
//   TURNSTILE_SECRET     the secret key of the Turnstile widget
// The Turnstile *site* key is public and lives in public/feedback.js.

const KINDS = { idea: 'Idea', bug: 'Bug', history: 'Historical mistake', other: 'Other' };
const GAMES = { portal: 'Portal', borderlines: 'Borderlines', retourvloot: 'Retourvloot' };
const COLORS = { idea: 0x2c6a47, bug: 0x962f2a, history: 0x9a6a14, other: 0x26457d };

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname === '/api/feedback') {
      if (request.method !== 'POST') return json({ ok: false, error: 'method' }, 405);
      try { return await feedback(request, env, url); }
      catch (e) { return json({ ok: false, error: 'server' }, 500); }
    }
    return env.ASSETS.fetch(request);
  },
};

async function feedback(request, env, url) {
  // Only accept posts from our own pages.
  const origin = request.headers.get('Origin');
  if (origin && origin !== url.origin) return json({ ok: false, error: 'origin' }, 403);
  if (!(request.headers.get('Content-Type') || '').includes('application/json')) return json({ ok: false, error: 'type' }, 415);
  const raw = await request.text();
  if (raw.length > 8000) return json({ ok: false, error: 'size' }, 413);
  let d; try { d = JSON.parse(raw); } catch (e) { return json({ ok: false, error: 'json' }, 400); }

  // Honeypot: real people never see this field.
  if (d.website) return json({ ok: true });

  const message = String(d.message || '').trim().slice(0, 2000);
  if (message.length < 5) return json({ ok: false, error: 'short' }, 400);
  const kind = KINDS[d.kind] ? d.kind : 'other';
  const game = GAMES[d.game] ? d.game : 'portal';
  const email = String(d.email || '').trim().slice(0, 120);
  const page = String(d.page || '').slice(0, 120);
  const context = String(d.context || '').slice(0, 300);

  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';

  // Rate limit: a few messages per minute per visitor.
  if (env.FEEDBACK_LIMIT) {
    const { success } = await env.FEEDBACK_LIMIT.limit({ key: ip });
    if (!success) return json({ ok: false, error: 'rate' }, 429);
  }

  // Turnstile: proves a real browser and person sent it. Fails closed if not configured.
  if (!env.TURNSTILE_SECRET) return json({ ok: false, error: 'not-configured' }, 503);
  const form = new FormData();
  form.append('secret', env.TURNSTILE_SECRET);
  form.append('response', String(d.token || ''));
  form.append('remoteip', ip);
  const tv = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body: form });
  const tr = await tv.json();
  if (!tr.success) return json({ ok: false, error: 'captcha' }, 403);

  if (!env.DISCORD_WEBHOOK_URL) return json({ ok: false, error: 'not-configured' }, 503);
  const fields = [
    { name: 'Page', value: page || '/', inline: true },
    { name: 'From', value: (request.cf && request.cf.country) || '?', inline: true },
  ];
  if (email) fields.push({ name: 'Reply to', value: email, inline: false });
  if (context) fields.push({ name: 'Context', value: context, inline: false });
  const res = await fetch(env.DISCORD_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: 'Homo Ludens',
      allowed_mentions: { parse: [] }, // never ping @everyone, whatever the message says
      embeds: [{
        title: `${GAMES[game]} · ${KINDS[kind]}`,
        description: message,
        color: COLORS[kind],
        fields,
        timestamp: new Date().toISOString(),
      }],
    }),
  });
  if (!res.ok) return json({ ok: false, error: 'deliver' }, 502);
  return json({ ok: true });
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });
}
