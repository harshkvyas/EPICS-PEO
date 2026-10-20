# Engineer Quest

## Results email delivery

The Grades 6–8 and Grades 9–12 quizzes show an **Email these results to yourself** form after the results. The browser does not use cookies, `localStorage`, analytics, or a database for this flow. With no server endpoint configured, it opens a prefilled message in the visitor's email app and clears the address from the page immediately. The visitor then sends the message from their email app.

Email cannot be sent automatically and securely from a static GitHub Pages site because an email-provider key must never be shipped to the browser. To enable automatic sending, deploy the route at `api/send-results.js` as a Cloudflare Worker endpoint, configure `window.ENGINEER_QUEST_EMAIL_ENDPOINT` to its URL, and set these runtime secrets in the endpoint's environment:

- `RESEND_API_KEY` — a Resend API key
- `RESEND_FROM_EMAIL` — a verified sender address, for example `Engineer Quest <results@example.org>`

The endpoint sends a transactional email and intentionally does not log or persist recipient addresses or quiz results. Do not add the API key to a JavaScript, HTML, or committed environment file. Confirm the selected email provider's retention settings and privacy terms before production use.

