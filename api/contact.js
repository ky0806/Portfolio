// Vercel serverless function: stuurt berichten van het contactformulier via Resend naar CONTACT_TO.
// Noemt het bericht een van de ADMIN_KEYWORDS, dan gaat er ook een kopie naar CONTACT_TO_ADMIN.
// Environment variables:
//   RESEND_API_KEY    (verplicht) API-sleutel van Resend
//   CONTACT_TO        (verplicht) ontvanger van alle berichten
//   CONTACT_TO_ADMIN  (optioneel) extra ontvanger voor berichten die een trefwoord bevatten
//   CONTACT_FROM      (optioneel) afzender, bv. "Portfolio <contact@kaanyucel.nl>"; zonder deze
//                     variabele wordt de testafzender van Resend gebruikt

const LIMITS = { name: 100, email: 200, message: 5000 };
const EMAIL_RE = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;
const DEFAULT_FROM = 'Portfolio <onboarding@resend.dev>';
// Kleine letters; er wordt zonder hoofdletters gezocht, ook binnen woorden (bv. "boekhoudadministratie").
const ADMIN_KEYWORDS = ['administratie'];

function escapeHtml(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function findKeyword(text) {
  const lower = text.toLowerCase();
  return ADMIN_KEYWORDS.find((word) => lower.includes(word)) || null;
}

function sendMail(apiKey, payload) {
  return fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
}

function parseBody(req) {
  const body = req.body;
  if (body && typeof body === 'object' && !Buffer.isBuffer(body)) return body;
  if (typeof body === 'string' || Buffer.isBuffer(body)) {
    try { return JSON.parse(body.toString()); } catch (e) { return null; }
  }
  return null;
}

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, code: 'method_not_allowed', error: 'Method not allowed' });
  }

  const data = parseBody(req);
  if (!data) {
    return res.status(400).json({ ok: false, code: 'invalid_request', error: 'Invalid request.' });
  }

  // Honeypot: bots vullen dit verborgen veld in. Doe alsof het gelukt is, verstuur niets.
  if (typeof data.website === 'string' && data.website.trim() !== '') {
    return res.status(200).json({ ok: true });
  }

  const name = typeof data.name === 'string' ? data.name.trim() : '';
  const email = typeof data.email === 'string' ? data.email.trim() : '';
  const message = typeof data.message === 'string' ? data.message.trim() : '';

  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, code: 'missing_fields', error: 'Please fill in all fields.' });
  }
  if (name.length > LIMITS.name || email.length > LIMITS.email || message.length > LIMITS.message) {
    return res.status(400).json({ ok: false, code: 'too_long', error: 'One of the fields is too long.' });
  }
  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ ok: false, code: 'invalid_email', error: 'Please enter a valid email address.' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO;
  if (!apiKey || !to) {
    console.error('Contact form: RESEND_API_KEY or CONTACT_TO is not set');
    return res.status(500).json({ ok: false, code: 'send_failed', error: 'Sending failed. Please try again later.' });
  }

  // Geen regeleinden in de naam, zodat die niet in de mail-header terechtkomen.
  const safeName = name.replace(/[\r\n]+/g, ' ');

  const from = process.env.CONTACT_FROM || DEFAULT_FROM;
  const subject = 'Nieuw bericht via kaanyucel.nl van ' + safeName;
  const text = 'Naam: ' + safeName + '\nE-mail: ' + email + '\n\n' + message;
  const html =
    '<p><strong>Naam:</strong> ' + escapeHtml(safeName) + '<br>' +
    '<strong>E-mail:</strong> ' + escapeHtml(email) + '</p>' +
    '<p style="white-space:pre-wrap">' + escapeHtml(message) + '</p>';

  try {
    const response = await sendMail(apiKey, { from, to: [to], reply_to: email, subject, text, html });

    if (!response.ok) {
      // Details alleen in de serverlogs, nooit naar de browser.
      console.error('Resend error', response.status, await response.text());
      return res.status(500).json({ ok: false, code: 'send_failed', error: 'Sending failed. Please try again later.' });
    }

    // Extra kopie als het bericht een trefwoord bevat. Dit is een aparte mail, zodat een fout hier
    // (bijvoorbeeld een nog niet geverifieerd domein) nooit de hoofdmail of de bezoeker raakt.
    const adminTo = process.env.CONTACT_TO_ADMIN;
    const keyword = adminTo ? findKeyword(message) : null;
    if (keyword) {
      try {
        const note = 'Je ontvangt dit bericht omdat het woord "' + keyword + '" erin voorkomt.';
        const copy = await sendMail(apiKey, {
          from,
          to: [adminTo],
          reply_to: email,
          subject,
          text: note + '\n\n' + text,
          html: '<p><em>' + escapeHtml(note) + '</em></p>' + html,
        });
        if (!copy.ok) console.error('Resend error (admin copy)', copy.status, await copy.text());
      } catch (copyErr) {
        console.error('Contact form: admin copy failed', copyErr && copyErr.message);
      }
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Contact form: request to Resend failed', err && err.message);
    return res.status(500).json({ ok: false, code: 'send_failed', error: 'Sending failed. Please try again later.' });
  }
};
