/*
 * The email address only exists in the form field and in the in-flight request.
 * Do not add localStorage, analytics, or persistence to this feature.
 */
(function () {
  const endpoint = window.ENGINEER_QUEST_EMAIL_ENDPOINT;

  function form(quizLabel) {
    return `<section class="email-results" aria-labelledby="email-results-title">
      <h3 id="email-results-title">Email these results to yourself</h3>
      <p>Enter an email address to receive this exploration summary. We use it only to send this message, then clear it. Students under 13 should use a parent, guardian, or educator email with permission.</p>
      <form class="email-results-form" novalidate>
        <label for="results-email">Email address</label>
        <div class="email-results-controls">
          <input id="results-email" name="email" type="email" inputmode="email" autocomplete="off" maxlength="254" required />
          <button class="button button-primary" type="submit">Email my results</button>
        </div>
        <p class="email-results-status" aria-live="polite"></p>
      </form>
    </section>`;
  }

  function bind(container, quizLabel, resultsText) {
    const emailForm = container.querySelector('.email-results-form');
    if (!emailForm) return;

    const input = emailForm.querySelector('input[type="email"]');
    const submit = emailForm.querySelector('button[type="submit"]');
    const status = emailForm.querySelector('.email-results-status');

    emailForm.addEventListener('submit', async event => {
      event.preventDefault();
      let email = input.value.trim();

      if (!input.checkValidity()) {
        status.textContent = 'Enter a valid email address.';
        input.focus();
        email = '';
        return;
      }

      submit.disabled = true;
      status.textContent = 'Sending your results…';

      try {
        if (endpoint) {
          const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, quiz: quizLabel, results: resultsText })
          });

          if (!response.ok) throw new Error('Email delivery failed');
          status.textContent = 'Sent! Your email address has been cleared from this page.';
        } else {
          const subject = `Your ${quizLabel} results`;
          const mailto = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(resultsText)}`;
          status.textContent = 'Your email app is opening. Finish sending the message there.';
          window.location.href = mailto;
        }

        input.value = '';
      } catch {
        status.textContent = 'We could not send the email right now. Please try again later.';
      } finally {
        email = '';
        submit.disabled = false;
      }
    });
  }

  window.EmailResults = { form, bind };
}());

