/**
 * Scroll Engine & Chapter Transition Orchestrator
 * 
 * Handles IntersectionObserver animations, smooth chapter jumping,
 * progress bar tracking, touch swipe transitions, and parallax scrolling.
 */

class ScrollEngine {
  constructor(options = {}) {
    this.chapters = Array.from(document.querySelectorAll('.chapter-section'));
    this.totalChapters = this.chapters.length;
    this.currentChapterIndex = 0;
    this.isTransitioning = false;

    this.navPills = Array.from(document.querySelectorAll('.chapter-nav-dot'));
    this.chapterIndexEl = document.getElementById('current-chapter-num');
    this.chapterTitleEl = document.getElementById('current-chapter-title');
    this.progressBar = document.getElementById('progress-bar-fill');

    this.chapterTitles = [
      "The Prologue",
      "A New Friendship",
      "Her Presence",
      "The Little Things",
      "Happy Birthday",
      "The Final Message"
    ];

    this.initObserver();
    this.initParallax();
    this.initKeyAndTouchEvents();
  }

  initObserver() {
    // Reveal Observer for scroll-triggered elements
    const revealCallback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          // Once revealed, keep it or allow re-trigger
        }
      });
    };

    this.revealObserver = new IntersectionObserver(revealCallback, {
      root: null,
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    const revealElements = document.querySelectorAll(
      '.reveal-fade, .reveal-up, .reveal-blur, .reveal-mask, .photo-card, .editorial-quote'
    );
    revealElements.forEach(el => this.revealObserver.observe(el));

    // Chapter Active Observer
    const chapterCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.45) {
          const index = parseInt(entry.target.getAttribute('data-chapter-index'), 10);
          if (!isNaN(index)) {
            this.setActiveChapter(index, false);
          }
        }
      });
    };

    this.chapterObserver = new IntersectionObserver(chapterCallback, {
      root: null,
      threshold: [0.45, 0.75]
    });

    this.chapters.forEach(chapter => this.chapterObserver.observe(chapter));
  }

  initParallax() {
    // Lightweight mouse parallax for desktop cards
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      const parallaxCards = document.querySelectorAll('.parallax-card');
      
      window.addEventListener('mousemove', (e) => {
        const mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        const mouseY = (e.clientY / window.innerHeight - 0.5) * 2;

        parallaxCards.forEach(card => {
          const depth = parseFloat(card.getAttribute('data-depth')) || 15;
          const rotX = -mouseY * (depth * 0.4);
          const rotY = mouseX * (depth * 0.4);
          const transX = mouseX * depth;
          const transY = mouseY * depth;

          card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translate3d(${transX}px, ${transY}px, 0)`;
        });
      });
    }
  }

  initKeyAndTouchEvents() {
    // Keyboard navigation
    window.addEventListener('keydown', (e) => {
      if (['ArrowDown', 'PageDown', ' '].includes(e.key)) {
        if (e.key === ' ' && e.target.tagName === 'BUTTON') return;
        e.preventDefault();
        this.nextChapter();
      } else if (['ArrowUp', 'PageUp'].includes(e.key)) {
        e.preventDefault();
        this.prevChapter();
      }
    });

    // Touch Swipe Detection for mobile devices
    let touchStartY = 0;
    let touchEndY = 0;
    let touchStartX = 0;
    let touchEndX = 0;

    window.addEventListener('touchstart', (e) => {
      touchStartY = e.changedTouches[0].screenY;
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    window.addEventListener('touchend', (e) => {
      touchEndY = e.changedTouches[0].screenY;
      touchEndX = e.changedTouches[0].screenX;
      this.handleSwipeGesture(touchStartX, touchStartY, touchEndX, touchEndY);
    }, { passive: true });
  }

  handleSwipeGesture(startX, startY, endX, endY) {
    const diffY = startY - endY;
    const diffX = startX - endX;

    // Primarily vertical swipe
    if (Math.abs(diffY) > Math.abs(diffX) && Math.abs(diffY) > 80) {
      if (diffY > 0) {
        // Swiped up -> go next if at section boundary
      } else {
        // Swiped down -> go prev
      }
    }
  }

  goToChapter(index) {
    if (index < 0 || index >= this.totalChapters) return;
    const target = this.chapters[index];
    if (!target) return;

    this.isTransitioning = true;
    target.scrollIntoView({ behavior: 'smooth' });
    this.setActiveChapter(index, true);

    setTimeout(() => {
      this.isTransitioning = false;
    }, 900);
  }

  nextChapter() {
    if (this.currentChapterIndex < this.totalChapters - 1) {
      this.goToChapter(this.currentChapterIndex + 1);
    }
  }

  prevChapter() {
    if (this.currentChapterIndex > 0) {
      this.goToChapter(this.currentChapterIndex - 1);
    }
  }

  setActiveChapter(index, updateScroll = false) {
    this.currentChapterIndex = index;

    // Update Progress Indicator
    const progressPercent = ((index + 1) / this.totalChapters) * 100;
    if (this.progressBar) {
      this.progressBar.style.width = `${progressPercent}%`;
    }

    // Update Number Marker
    if (this.chapterIndexEl) {
      this.chapterIndexEl.textContent = `0${index + 1}`;
    }

    // Update Chapter Title
    if (this.chapterTitleEl && this.chapterTitles[index]) {
      this.chapterTitleEl.textContent = this.chapterTitles[index];
    }

    // Update Navigation Dots / Pills
    this.navPills.forEach((pill, idx) => {
      if (idx === index) {
        pill.classList.add('is-active');
        pill.setAttribute('aria-current', 'step');
      } else {
        pill.classList.remove('is-active');
        pill.removeAttribute('aria-current');
      }
    });

    // Update active class on chapter element
    this.chapters.forEach((ch, idx) => {
      if (idx === index) {
        ch.classList.add('is-active-chapter');
        // Trigger internal reveal animations in the chapter
        const unrevealed = ch.querySelectorAll('.reveal-fade:not(.is-revealed), .reveal-up:not(.is-revealed)');
        unrevealed.forEach(el => el.classList.add('is-revealed'));
      } else {
        ch.classList.remove('is-active-chapter');
      }
    });
  }
}

window.ScrollEngine = ScrollEngine;
