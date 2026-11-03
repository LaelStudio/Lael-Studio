// ==========================================
// REQUIRED CURRENCY SELECTION
// ==========================================
const currencyOverlay = document.querySelector('#currency-overlay');
const currencyOptions = [...document.querySelectorAll('.currency-option')];
let selectedCurrency = 'USD';

//_____________________________________________________________
// DISCOUNT PRICES, SELECT TRUE OR FALSE, CAN CHANGE VALUE
const discounts = {
  GBP: {
    Minimalist: { active: true, percent: 30, price: 489 },
    Refined: { active: true, percent: 30, price: 769 },
    Masterpiece: { active: true, percent: 30, price: 979 }
  },
  EUR: {
    Minimalist: { active: true, percent: 30, price: 419 },
    Refined: { active: true, percent: 30, price: 629 },
    Masterpiece: { active: true, percent: 30, price: 839 }
  },
  USD: {
    Minimalist: { active: true, percent: 30, price: 349 },
    Refined: { active: true, percent: 30, price: 524 },
    Masterpiece: { active: true, percent: 30, price: 699 }
  }
};

//______________________________________________________________
// NORMAL PRICES, CAN CHANGE EACH VALUE
const currencyPrices = {
  GBP: {
    locale: 'en-GB',
    packages: { Minimalist: 699, Refined: 1099, Masterpiece: 1399 },
    enquiry: { Minimalist: 699, Refined: 1099, Masterpiece: 1399 },
    domainRenewal: [10, 15],
    additionalSection: 179,
    ecommerceMinimum: 2599
  },
  EUR: {
    locale: 'en-IE',
    packages: { Minimalist: 599, Refined: 899, Masterpiece: 1199 },
    enquiry: { Minimalist: 599, Refined: 899, Masterpiece: 1199 },
    domainRenewal: [10, 20],
    additionalSection: 149,
    ecommerceMinimum: 2199
  },
  USD: {
    locale: 'en-US',
    packages: { Minimalist: 499, Refined: 749, Masterpiece: 999 },
    enquiry: { Minimalist: 499, Refined: 749, Masterpiece: 999 },
    domainRenewal: [10, 30],
    additionalSection: 129,
    ecommerceMinimum: 1799
  }
};

//LEAVE ALONE BELOW THIS LINE
const packageCards = [...document.querySelectorAll('.price-card')];
packageCards.forEach((card) => {
  const price = card.querySelector('strong');
  if (!price) return;

  const originalPrice = document.createElement('span');
  originalPrice.className = 'package-price-original';
  originalPrice.textContent = price.textContent;

  const salePrice = document.createElement('span');
  salePrice.className = 'package-price-sale';
  salePrice.hidden = true;

  price.classList.add('package-price');
  price.replaceChildren(originalPrice, salePrice);

  const discountBadge = document.createElement('span');
  discountBadge.className = 'discount-badge';
  card.append(discountBadge);
});

function updateDisplayedPrices(currency) {
  const prices = currencyPrices[currency];
  const formatter = new Intl.NumberFormat(prices.locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0
  });
  const formatPrice = (amount) => formatter.format(amount);

  document.querySelectorAll('.price-card').forEach((card, index) => {

const portfolioSection = document.querySelector('#portfolio');
const portfolioBackground = portfolioSection?.querySelector('.portfolio-background');
const desktopPortfolioQuery = window.matchMedia('(min-width: 769px)');

function orientPortfolioBackground() {
  if (!portfolioSection || !portfolioBackground) return;

  if (desktopPortfolioQuery.matches) {
    const { width, height } = portfolioSection.getBoundingClientRect();
    portfolioBackground.style.width = `${height}px`;
    portfolioBackground.style.height = `${width}px`;
    portfolioBackground.style.transform = 'translate(-50%, -50%) rotate(90deg)';
    return;
  }

  portfolioBackground.style.width = '100%';
  portfolioBackground.style.height = '100%';
  portfolioBackground.style.transform = 'translate(-50%, -50%)';
}

if (portfolioSection && portfolioBackground) {
  orientPortfolioBackground();
  window.addEventListener('resize', orientPortfolioBackground);
  window.addEventListener('load', orientPortfolioBackground, { once: true });
}
    const price = card.querySelector('strong');
    const packageName = Object.keys(prices.packages)[index];
    if (!price || !packageName) return;

    const discount = discounts[currency][packageName];
    const discountIsActive = Boolean(discount?.active);
    price.querySelector('.package-price-original').textContent = formatPrice(prices.packages[packageName]);
    price.classList.toggle('has-discount', discountIsActive);

    const salePrice = price.querySelector('.package-price-sale');
    salePrice.textContent = discountIsActive ? formatPrice(discount.price) : '';
    salePrice.hidden = !discountIsActive;

    const discountBadge = card.querySelector('.discount-badge');
    discountBadge.textContent = discountIsActive ? `${discount.percent}% OFF` : '';
    discountBadge.classList.toggle('is-active', discountIsActive);
  });

  const packageSelect = document.querySelector('select[name="package"]');
  const enquiryOptions = packageSelect?.querySelectorAll('option') ?? [];
  Object.entries(prices.enquiry).forEach(([packageName, amount], index) => {
    const option = enquiryOptions[index + 1];
    if (!option) return;

    const discount = discounts[currency][packageName];
    const discountIsActive = Boolean(discount?.active);
    const displayedPrice = discountIsActive ? discount.price : amount;
    option.textContent = `${packageName} — ${formatPrice(displayedPrice)}${discountIsActive ? ` (${discount.percent}% off)` : ''}`;
    option.dataset.discounted = String(discountIsActive);
    option.style.color = discountIsActive ? 'var(--red)' : '';
  });
  updatePackageSelectDiscountState();

  const renewalFaq = [...document.querySelectorAll('.faq-list details')]
    .find((item) => item.querySelector('summary')?.textContent.includes('renew'));
  const renewalAnswer = renewalFaq?.querySelector('p');
  if (renewalAnswer) {
    renewalAnswer.textContent = renewalAnswer.textContent.replace(
      /\$\s*[\d,]+[–-]\$?\s*[\d,]+/,
      `${formatPrice(prices.domainRenewal[0])}–${formatPrice(prices.domainRenewal[1])}`
    );
  }

  const pricingNote = document.querySelector('.pricing-note');
  const pricingNotePrice = pricingNote?.querySelector('.pricing-note-price');
  if (pricingNotePrice) {
    pricingNotePrice.textContent = `${formatPrice(prices.packages.Masterpiece)} + ${formatPrice(prices.additionalSection)} per additional section,`;
  }

  const commerceCopy = document.querySelector('.commerce-note span');
  if (commerceCopy?.firstChild?.nodeType === Node.TEXT_NODE) {
    commerceCopy.firstChild.nodeValue = `Standard online shops aren't our thing. E-commerce builds are handled via custom quote only, starting from ${formatPrice(prices.ecommerceMinimum)}+. `;
  }
}

const packageSelect = document.querySelector('select[name="package"]');

function updatePackageSelectDiscountState() {
  const selectedOption = packageSelect?.selectedOptions[0];
  packageSelect?.classList.toggle('has-discount-selection', selectedOption?.dataset.discounted === 'true');
}

packageSelect?.addEventListener('change', updatePackageSelectDiscountState);

const whySection = document.querySelector('#why-choose-us');
const whyBackground = document.createElement('img');
whyBackground.className = 'why-background';
whyBackground.src = 'choose.jpeg';
whyBackground.alt = '';
whyBackground.setAttribute('aria-hidden', 'true');

if (whySection) {
  whySection.prepend(whyBackground);
}

function orientWhyBackground() {
  if (!whySection) return;

  if (window.matchMedia('(min-width: 769px)').matches) {
    const { width, height } = whySection.getBoundingClientRect();
    whyBackground.style.width = `${height}px`;
    whyBackground.style.height = `${width}px`;
    whyBackground.style.transform = 'translate(-50%, -50%) rotate(90deg)';
    return;
  }

  whyBackground.style.width = '100%';
  whyBackground.style.height = '100%';
  whyBackground.style.transform = 'translate(-50%, -50%)';
}

if (whySection) {
  orientWhyBackground();
  window.addEventListener('resize', orientWhyBackground);
  window.addEventListener('load', orientWhyBackground, { once: true });
}

const processSection = document.querySelector('#the-process');
const processBackground = document.createElement('img');
processBackground.className = 'process-background';
processBackground.src = 'howitworks.jpeg';
processBackground.alt = '';
processBackground.setAttribute('aria-hidden', 'true');

if (processSection) {
  processSection.prepend(processBackground);
}

function orientProcessBackground() {
  if (!processSection) return;

  if (window.matchMedia('(min-width: 769px)').matches) {
    const { width, height } = processSection.getBoundingClientRect();
    processBackground.style.width = `${height}px`;
    processBackground.style.height = `${width}px`;
    processBackground.style.transform = 'translate(-50%, -50%) rotate(90deg)';
    return;
  }

  processBackground.style.width = '100%';
  processBackground.style.height = '100%';
  processBackground.style.transform = 'translate(-50%, -50%)';
}

if (processSection) {
  orientProcessBackground();
  window.addEventListener('resize', orientProcessBackground);
  window.addEventListener('load', orientProcessBackground, { once: true });
}

const servicesSection = document.querySelector('#services');
const servicesBackground = document.createElement('img');
servicesBackground.className = 'services-background';
servicesBackground.src = 'process1.jpeg';
servicesBackground.alt = '';
servicesBackground.setAttribute('aria-hidden', 'true');

if (servicesSection) {
  servicesSection.prepend(servicesBackground);
}

function orientServicesBackground() {
  if (!servicesSection) return;

  if (window.matchMedia('(min-width: 769px)').matches) {
    const { width, height } = servicesSection.getBoundingClientRect();
    servicesBackground.style.width = `${height}px`;
    servicesBackground.style.height = `${width}px`;
    servicesBackground.style.transform = 'translate(-50%, -50%) rotate(90deg)';
    return;
  }

  servicesBackground.style.width = '100%';
  servicesBackground.style.height = '100%';
  servicesBackground.style.transform = 'translate(-50%, -50%)';
}

if (servicesSection) {
  orientServicesBackground();
  window.addEventListener('resize', orientServicesBackground);
  window.addEventListener('load', orientServicesBackground, { once: true });
}

const pricingTrack = document.querySelector('.pricing');
const originalPricingCards = pricingTrack ? [...pricingTrack.querySelectorAll('.price-card')] : [];
const pricingCarouselControls = document.createElement('div');
const previousPackageButton = document.createElement('button');
const nextPackageButton = document.createElement('button');
const mobilePricingQuery = window.matchMedia('(max-width: 768px)');

pricingCarouselControls.className = 'pricing-carousel-controls';
previousPackageButton.type = 'button';
previousPackageButton.className = 'pricing-carousel-button';
previousPackageButton.setAttribute('aria-label', 'Previous package');
previousPackageButton.textContent = '‹';
nextPackageButton.type = 'button';
nextPackageButton.className = 'pricing-carousel-button';
nextPackageButton.setAttribute('aria-label', 'Next package');
nextPackageButton.textContent = '›';
pricingCarouselControls.append(previousPackageButton, nextPackageButton);

if (pricingTrack && originalPricingCards.length) {
  const pricingCarousel = document.createElement('div');
  pricingCarousel.className = 'pricing-carousel';
  pricingTrack.parentNode.insertBefore(pricingCarousel, pricingTrack);
  pricingCarousel.append(pricingCarouselControls, pricingTrack);
}

function updatePricingCarouselControls() {
  if (!pricingTrack || !mobilePricingQuery.matches) return;

  const maxScroll = pricingTrack.scrollWidth - pricingTrack.clientWidth;
  previousPackageButton.disabled = pricingTrack.scrollLeft <= 1;
  nextPackageButton.disabled = pricingTrack.scrollLeft >= maxScroll - 1;
}

function syncPricingCarousel() {
  if (!pricingTrack) return;

  const cards = mobilePricingQuery.matches
    ? originalPricingCards.slice().sort((leftCard, rightCard) => {
      const prices = currencyPrices[selectedCurrency].packages;
      const leftName = leftCard.querySelector('h3')?.textContent.trim();
      const rightName = rightCard.querySelector('h3')?.textContent.trim();
      return (prices[leftName] ?? Infinity) - (prices[rightName] ?? Infinity);
    })
    : originalPricingCards;

  cards.forEach((card) => pricingTrack.append(card));
  pricingTrack.scrollLeft = 0;
  updatePricingCarouselControls();
}

if (pricingTrack && originalPricingCards.length) {
  previousPackageButton.addEventListener('click', () => {
    pricingTrack.scrollBy({ left: -pricingTrack.clientWidth, behavior: 'smooth' });
  });
  nextPackageButton.addEventListener('click', () => {
    pricingTrack.scrollBy({ left: pricingTrack.clientWidth, behavior: 'smooth' });
  });
  pricingTrack.addEventListener('scroll', updatePricingCarouselControls, { passive: true });
  mobilePricingQuery.addEventListener('change', syncPricingCarousel);
  syncPricingCarousel();
}

if (currencyOverlay) {
  document.body.classList.add('currency-selection-open');
  currencyOptions[0]?.focus();
}

currencyOptions.forEach((option) => {
  option.addEventListener('click', () => {
    selectedCurrency = option.dataset.currency;
    updateDisplayedPrices(selectedCurrency);
    syncPricingCarousel();
    currencyOptions.forEach((currencyOption) => {
      currencyOption.disabled = true;
    });
    option.classList.add('is-selected');

    window.setTimeout(() => {
      currencyOverlay.hidden = true;
      document.body.classList.remove('currency-selection-open');
    }, 1000);
  });
});

if (currencyOverlay && !currencyOverlay.hidden) {
  document.addEventListener('keydown', (event) => {
    if (currencyOverlay.hidden) return;

    if (event.key === 'Escape') {
      event.preventDefault();
    }

    if (event.key === 'Tab') {
      event.preventDefault();
      const currentIndex = currencyOptions.indexOf(document.activeElement);
      const direction = event.shiftKey ? -1 : 1;
      const nextIndex = (currentIndex + direction + currencyOptions.length) % currencyOptions.length;
      currencyOptions[nextIndex].focus();
    }
  });

  document.addEventListener('touchmove', (event) => {
    if (!currencyOverlay.hidden) event.preventDefault();
  }, { passive: false });
}

// ==========================================
// MOBILE MENU TOGGLE & NAVIGATION
// ==========================================
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('#mobileMenu') || document.querySelector('.mobile-menu');

function closeNavigation() {
  if (!mobileMenu || !menuToggle) return;

  mobileMenu.classList.remove('active');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open navigation');
}

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    if (mobileMenu) {
      const isOpen = mobileMenu.classList.toggle('active');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    }
  });
}

document.addEventListener('click', (event) => {
  if (!mobileMenu?.classList.contains('active')) return;
  if (mobileMenu.contains(event.target) || menuToggle?.contains(event.target)) return;

  closeNavigation();
});

// Automatically close mobile menu when clicking any link
document.querySelectorAll('.mobile-menu a, .quick-links a').forEach((link) => {
  link.addEventListener('click', closeNavigation);
});


// ==========================================
// SELECTED WORK LIGHTBOX
// ==========================================
const workLightbox = document.createElement('dialog');
workLightbox.className = 'work-lightbox';
workLightbox.setAttribute('aria-label', 'Selected work preview');
workLightbox.innerHTML = `
  <div class="work-lightbox-content">
    <div class="work-lightbox-toolbar">
      <p class="work-lightbox-title"></p>
      <button class="work-lightbox-zoom-out" type="button" aria-label="Zoom out">-</button>
      <button class="work-lightbox-zoom-in" type="button" aria-label="Zoom in">+</button>
      <button class="work-lightbox-close" type="button" aria-label="Close preview">×</button>
    </div>
    <div class="work-lightbox-stage">
      <img class="work-lightbox-image" alt="">
    </div>
  </div>
`;
document.body.append(workLightbox);

const workLightboxImage = workLightbox.querySelector('.work-lightbox-image');
const workLightboxTitle = workLightbox.querySelector('.work-lightbox-title');
const workLightboxClose = workLightbox.querySelector('.work-lightbox-close');
const workLightboxZoomIn = workLightbox.querySelector('.work-lightbox-zoom-in');
const workLightboxZoomOut = workLightbox.querySelector('.work-lightbox-zoom-out');
let workLightboxZoom = 1;
let workLightboxTrigger = null;

function setWorkLightboxZoom(zoom) {
  workLightboxZoom = Math.min(3, Math.max(1, zoom));
  workLightboxImage.style.transform = `scale(${workLightboxZoom})`;
  workLightboxZoomOut.disabled = workLightboxZoom === 1;
  workLightboxZoomIn.disabled = workLightboxZoom === 3;
}

function closeWorkLightbox() {
  if (workLightbox.open) workLightbox.close();
}

document.addEventListener('click', (event) => {
  const button = event.target.closest('.work-view');
  if (!button) return;

  const image = button.closest('.work-image')?.querySelector('img');
  if (!image) return;

  workLightboxTrigger = button;
  workLightboxImage.src = image.currentSrc || image.src;
  workLightboxImage.alt = image.alt;
  workLightboxTitle.textContent = button.closest('.work')?.querySelector('h3')?.textContent.trim() || image.alt;
  setWorkLightboxZoom(1);
  document.body.classList.add('work-lightbox-open');
  workLightbox.showModal();
  workLightboxClose.focus();
});

workLightboxClose.addEventListener('click', closeWorkLightbox);
workLightbox.addEventListener('click', (event) => {
  if (event.target === workLightbox) closeWorkLightbox();
});
workLightbox.addEventListener('close', () => {
  document.body.classList.remove('work-lightbox-open');
  setWorkLightboxZoom(1);
  workLightboxTrigger?.focus();
});
workLightbox.addEventListener('cancel', (event) => {
  event.preventDefault();
  closeWorkLightbox();
});

workLightboxZoomIn.addEventListener('click', () => setWorkLightboxZoom(workLightboxZoom + 0.5));
workLightboxZoomOut.addEventListener('click', () => setWorkLightboxZoom(workLightboxZoom - 0.5));


// ==========================================
// ENQUIRY FORM SUBMISSION & SUCCESS OVERLAY
// ==========================================
const enquiryForm = document.querySelector('#enquiry-form');
const formMessage = document.querySelector('#form-message');
const successOverlay = document.querySelector('#success-overlay');
const successClose = document.querySelector('.success-close');

if (enquiryForm) {
  const messageField = enquiryForm.querySelector('textarea[name="message"]');
  const mobileViewport = window.matchMedia('(max-width: 768px)');

  if (messageField) {
    const resizeMessageField = () => {
      if (!mobileViewport.matches) {
        messageField.style.height = '';
        return;
      }

      messageField.style.height = '32px';
      messageField.style.height = `${messageField.scrollHeight}px`;
    };

    messageField.addEventListener('input', resizeMessageField);
    mobileViewport.addEventListener('change', resizeMessageField);
    resizeMessageField();
    enquiryForm.addEventListener('reset', () => requestAnimationFrame(resizeMessageField));
  }

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
}

if (successClose && successOverlay) {
  successClose.addEventListener('click', () => {
    successOverlay.hidden = true;
  });
}

// Sticky Header Scroll Handler
window.addEventListener('scroll', () => {
  const header = document.querySelector('.site-header');
  if (window.scrollY > 0) {
    header.classList.add('is-sticky');
  } else {
    header.classList.remove('is-sticky');
  }
});