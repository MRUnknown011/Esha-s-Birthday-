/**
 * Main Application Orchestrator
 * Connects configuration, particles, audio, scroll engine, and interactions.
 */

document.addEventListener('DOMContentLoaded', () => {
  const config = window.EXPERIENCE_CONFIG || {};

  // 1. Initialize Custom Cinematic Cursor (Desktop only)
  initCustomCursor();

  // 2. Image Fallback & Error Handling System
  initImageFallbacks();

  // 3. Initialize Particle Engines
  const introParticles = new ParticleEngine('intro-canvas', {
    particleCount: 40,
    color: '212, 175, 55',
    minSize: 0.8,
    maxSize: 2.2,
    minSpeed: 0.1,
    maxSpeed: 0.4
  });

  const birthdayParticles = new ParticleEngine('reveal-canvas', {
    particleCount: 85,
    color: '228, 196, 115',
    minSize: 1.0,
    maxSize: 3.2,
    minSpeed: 0.25,
    maxSpeed: 0.9,
    glow: true
  });

  // 4. Initialize Generative Audio Controller
  const audio = new AudioController(config.audio || {});

  // 5. Initialize Scroll & Transition Engine
  const scrollEngine = new ScrollEngine();

  // 6. Hook Chapter 1 "Begin Journey" button
  const beginBtn = document.getElementById('begin-btn');
  if (beginBtn) {
    beginBtn.addEventListener('click', () => {
      // Auto-start ambient soundscape on explicit user interaction
      audio.play();
      scrollEngine.goToChapter(1);
    });
  }

  // 7. Hook Chapter Navigation Dots
  const navDots = document.querySelectorAll('.chapter-nav-dot');
  navDots.forEach((dot, index) => {
    dot.addEventListener('click', (e) => {
      e.preventDefault();
      scrollEngine.goToChapter(index);
    });
  });

  // 8. Hook Floating Action Nav Buttons
  const nextBtn = document.getElementById('next-chapter-btn');
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      scrollEngine.nextChapter();
    });
  }

  // 9. Chapter 6 Replay & Keepsake Actions
  const replayBtn = document.getElementById('replay-btn');
  if (replayBtn) {
    replayBtn.addEventListener('click', () => {
      scrollEngine.goToChapter(0);
    });
  }

  const shareBtn = document.getElementById('share-btn');
  if (shareBtn) {
    shareBtn.addEventListener('click', () => {
      showToast("Link copied to clipboard. Share this moment with Ayesha!");
      if (navigator.clipboard && window.location.href) {
        navigator.clipboard.writeText(window.location.href).catch(() => {});
      }
    });
  }

  // 10. Image Lightbox Modal
  initLightbox();
});

/**
 * Custom Cursor for elegant desktop experience
 */
function initCustomCursor() {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  const cursorDot = document.getElementById('cursor-dot');
  const cursorRing = document.getElementById('cursor-ring');
  if (!cursorDot || !cursorRing) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
  });

  function renderRing() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
    requestAnimationFrame(renderRing);
  }
  renderRing();

  // Hover states
  const interactives = document.querySelectorAll('a, button, .photo-card, .chapter-nav-dot');
  interactives.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorRing.classList.add('is-hovering');
    });
    el.addEventListener('mouseleave', () => {
      cursorRing.classList.remove('is-hovering');
    });
  });
}

/**
 * Handle image fallbacks (JPG -> SVG) seamlessly
 */
function initImageFallbacks() {
  const images = document.querySelectorAll('img[data-fallback]');
  images.forEach(img => {
    img.addEventListener('error', function() {
      const fallbackSrc = this.getAttribute('data-fallback');
      if (fallbackSrc && this.src !== fallbackSrc) {
        this.src = fallbackSrc;
      }
    });
  });
}

/**
 * Lightbox Modal for inspecting photos
 */
function initLightbox() {
  const modal = document.getElementById('lightbox-modal');
  const modalImg = document.getElementById('lightbox-img');
  const modalTitle = document.getElementById('lightbox-title');
  const modalCaption = document.getElementById('lightbox-caption');
  const closeBtn = document.getElementById('lightbox-close');

  if (!modal || !modalImg) return;

  const photoCards = document.querySelectorAll('.photo-card img');
  photoCards.forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => {
      modalImg.src = img.src;
      const card = img.closest('.photo-card');
      const title = card ? card.querySelector('.photo-title')?.textContent : '';
      const caption = card ? card.querySelector('.photo-caption')?.textContent : '';

      if (modalTitle) modalTitle.textContent = title || 'Ayesha';
      if (modalCaption) modalCaption.textContent = caption || '03 · 09 · 2026';

      modal.classList.add('is-active');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeModal = () => {
    modal.classList.remove('is-active');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.classList.contains('lightbox-backdrop')) {
      closeModal();
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-active')) {
      closeModal();
    }
  });
}

/**
 * Elegant Toast Notification
 */
function showToast(message) {
  let toast = document.getElementById('app-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'app-toast';
    toast.className = 'app-toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('is-visible');

  setTimeout(() => {
    toast.classList.remove('is-visible');
  }, 3500);
}
