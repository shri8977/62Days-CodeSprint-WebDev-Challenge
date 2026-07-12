(() => {
  function $(sel) {
    return document.querySelector(sel);
  }

  function clampIndex(i, len) {
    if (len <= 0) return 0;
    return ((i % len) + len) % len;
  }

  class Slideshow {
    constructor({ images, containerSelector, intervalMs = 4000 }) {
      this.images = images || [];
      this.intervalMs = intervalMs;
      this.container = $(containerSelector);
      this.index = 0;
      this.timer = null;

      if (!this.container) return;

      this.imageEl = this.container.querySelector('img[data-role="image"]');
      this.captionEl = this.container.querySelector('[data-role="caption"]');
      this.prevBtn = this.container.querySelector('[data-role="prev"]');
      this.nextBtn = this.container.querySelector('[data-role="next"]');

      this.prevBtn?.addEventListener('click', () => this.showPrev());
      this.nextBtn?.addEventListener('click', () => this.showNext());

      this.show(0);
      this.start();
    }

    start() {
      this.stop();
      this.timer = setInterval(() => this.showNext(), this.intervalMs);
    }

    stop() {
      if (this.timer) clearInterval(this.timer);
      this.timer = null;
    }

    show(i) {
      const len = this.images.length;
      if (!len) return;

      this.index = clampIndex(i, len);
      const item = this.images[this.index];

      const src = typeof item === 'string' ? item : item.src;
      const caption = typeof item === 'string' ? '' : (item.caption ?? '');

      // Fade/dissolve transition
      if (!this.imageEl) return;

      this.imageEl.classList.add('fade-out');

      // Swap after fade-out completes
      window.setTimeout(() => {
        this.imageEl.src = src;
        if (this.captionEl) this.captionEl.textContent = caption;
        this.imageEl.classList.remove('fade-out');
        this.imageEl.classList.add('fade-in');

        window.setTimeout(() => {
          this.imageEl.classList.remove('fade-in');
        }, 450);
      }, 150);
    }

    showNext() {
      this.show(this.index + 1);
      // Keep autoplay going from the new position.
      this.start();
    }

    showPrev() {
      this.show(this.index - 1);
      this.start();
    }
  }

  window.initFractalsSlideshow = function initFractalsSlideshow(config) {
    new Slideshow(config);
  };
})();

