// Cloudflare Worker route. Email credentials remain server-side environment variables.
// This handler intentionally does not log or persist recipient addresses or quiz results.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const QUIZZES = new Set(['Grades 6–8 · Engineering Explorer', 'Grades 9–12 · Pathway Finder']);

export async function onRequestPost(context) {
  let body;
  try {
    body = await context.request.json();
  } catch {
    return Response.json({ error: 'Invalid request' }, { status: 400 });
  }

  const { email, quiz, results } = body || {};
  if (
    typeof email !== 'string' ||
    email.length > 254 ||
    !EMAIL_PATTERN.test(email) ||
    !QUIZZES.has(quiz) ||
    typeof results !== 'string' ||
    results.length === 0 ||
    results.length > 12000
  ) {
    return Response.json({ error: 'Invalid email request' }, { status: 400 });
  }

  const apiKey = context.env.RESEND_API_KEY;
  const from = context.env.RESEND_FROM_EMAIL;
  if (!apiKey || !from) {
    return Response.json({ error: 'Email delivery is not configured' }, { status: 503 });
  }

  const resendResponse = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from,
      to: [email],
      subject: `Your ${quiz} results`,
      text: results
    })
  });

  return resendResponse.ok
    ? new Response(null, { status: 204 })
    : Response.json({ error: 'Email delivery failed' }, { status: 502 });
}

