const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

menuToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', isOpen);
});

document.querySelectorAll('.nav a').forEach((link) => {
  link.addEventListener('click', () => nav.classList.remove('open'));
});

document.addEventListener('click', (event) => {
  const button = event.target.closest('.expand-work');
  if (!button) return;

  const imageWrapper = button.closest('.work-image');
  const isExpanded = imageWrapper.classList.toggle('is-expanded');

  button.setAttribute('aria-expanded', String(isExpanded));
  button.querySelector('.expand-label').textContent = isExpanded ? 'Collapse image' : 'Expand image';
});

const enquiryForm = document.querySelector('#enquiry-form');
const formMessage = document.querySelector('#form-message');
const successOverlay = document.querySelector('#success-overlay');
const successClose = document.querySelector('.success-close');

enquiryForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const submitButton = enquiryForm.querySelector('button[type="submit"]');

  submitButton.disabled = true;
  formMessage.textContent = 'Sending...';

  try {
    const response = await fetch(enquiryForm.action, {
      method: 'POST',
      body: new FormData(enquiryForm),
      headers: { Accept: 'application/json' }
    });
    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Something went wrong. Please try again.');
    }

    enquiryForm.reset();
    formMessage.textContent = '';
    successOverlay.hidden = false;
    successClose.focus();
  } catch (error) {
    formMessage.textContent = error.message;
  } finally {
    submitButton.disabled = false;
  }
});

successClose.addEventListener('click', () => {
  successOverlay.hidden = true;
});

