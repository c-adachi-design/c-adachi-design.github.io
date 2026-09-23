document.addEventListener('DOMContentLoaded', () => {
  const workImages = document.querySelectorAll('.work-highlight__gallery img');

  if (workImages.length) {
    const lightbox = document.createElement('dialog');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
      <img class="lightbox__img" src="" alt="">
      <button type="button" class="lightbox__close" aria-label="Close">
        <i class="ti ti-x" aria-hidden="true"></i>
      </button>`;
    document.body.appendChild(lightbox);

    const lightboxImg = lightbox.querySelector('.lightbox__img');

    const openLightbox = (img) => {
      lightboxImg.src = img.currentSrc || img.src;
      lightboxImg.alt = img.alt;
      lightbox.showModal();
    };

    workImages.forEach((img) => {
      img.tabIndex = 0;
      img.setAttribute('role', 'button');
      img.addEventListener('click', () => openLightbox(img));
      img.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightbox(img);
        }
      });
    });

    // Clicking anywhere (image, backdrop, close button) closes it
    lightbox.addEventListener('click', () => lightbox.close());
  }

  const toggle = document.querySelector('.menu-toggle');
  const nav = document.getElementById('mobile-nav');

  if (!toggle || !nav) return;

  const closeMenu = () => {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
    nav.classList.remove('is-open');
    document.body.style.overflow = '';
  };

  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Open menu' : 'Close menu');
    nav.classList.toggle('is-open');
    document.body.style.overflow = isOpen ? '' : 'hidden';
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });
});
