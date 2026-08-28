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

document.querySelector('#enquiry-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const message = document.querySelector('#form-message');
  message.textContent = 'Thanks — your enquiry is ready to send. We will be in touch within 1–3 business days.';
  event.target.reset();
});