/**
 * Particle & Ambient Light Dust Engine
 * High-performance ambient gold dust and floating starlight canvas effects.
 */

class ParticleEngine {
  constructor(canvasId, options = {}) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.options = Object.assign({
      particleCount: 50,
      color: '212, 175, 55', // Champagne Gold
      minSize: 0.8,
      maxSize: 2.6,
      minSpeed: 0.15,
      maxSpeed: 0.65,
      glow: true,
      fadeEdge: true,
      interactive: true
    }, options);

    this.particles = [];
    this.mouse = { x: null, y: null, radius: 100 };
    this.animId = null;
    this.isVisible = true;

    this.init();
  }

  init() {
    this.resize();
    this.createParticles();
    this.bindEvents();
    this.animate();
  }

  resize() {
    if (!this.canvas) return;
    const rect = this.canvas.parentElement ? this.canvas.parentElement.getBoundingClientRect() : document.body.getBoundingClientRect();
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.width = rect.width || window.innerWidth;
    this.height = rect.height || window.innerHeight;

    this.canvas.width = this.width * this.dpr;
    this.canvas.height = this.height * this.dpr;
    this.ctx.scale(this.dpr, this.dpr);
  }

  createParticles() {
    this.particles = [];
    // Adjust count based on screen size
    const count = window.innerWidth < 768 ? Math.floor(this.options.particleCount * 0.6) : this.options.particleCount;

    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        size: Math.random() * (this.options.maxSize - this.options.minSize) + this.options.minSize,
        speedX: (Math.random() - 0.5) * this.options.maxSpeed,
        speedY: -(Math.random() * (this.options.maxSpeed - this.options.minSpeed) + this.options.minSpeed),
        opacity: Math.random() * 0.7 + 0.2,
        baseOpacity: Math.random() * 0.7 + 0.2,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinklePhase: Math.random() * Math.PI * 2
      });
    }
  }

  bindEvents() {
    window.addEventListener('resize', () => {
      this.resize();
      this.createParticles();
    });

    if (this.options.interactive) {
      window.addEventListener('mousemove', (e) => {
        if (!this.canvas) return;
        const rect = this.canvas.getBoundingClientRect();
        this.mouse.x = e.clientX - rect.left;
        this.mouse.y = e.clientY - rect.top;
      });

      window.addEventListener('mouseleave', () => {
        this.mouse.x = null;
        this.mouse.y = null;
      });
    }
  }

  animate() {
    if (!this.ctx || !this.isVisible) return;

    this.ctx.clearRect(0, 0, this.width, this.height);

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];

      // Update positions
      p.x += p.speedX;
      p.y += p.speedY;
      p.twinklePhase += p.twinkleSpeed;
      p.opacity = p.baseOpacity + Math.sin(p.twinklePhase) * 0.2;
      p.opacity = Math.max(0.05, Math.min(0.95, p.opacity));

      // Wrap around edges
      if (p.y < 0) {
        p.y = this.height + 10;
        p.x = Math.random() * this.width;
      }
      if (p.x < 0) p.x = this.width;
      if (p.x > this.width) p.x = 0;

      // Mouse repulsion/interaction
      if (this.mouse.x !== null && this.mouse.y !== null) {
        const dx = p.x - this.mouse.x;
        const dy = p.y - this.mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < this.mouse.radius) {
          const force = (this.mouse.radius - dist) / this.mouse.radius;
          p.x += (dx / dist) * force * 2;
          p.y += (dy / dist) * force * 2;
        }
      }

      // Draw particle
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(${this.options.color}, ${p.opacity})`;

      if (this.options.glow && p.size > 1.8) {
        this.ctx.shadowBlur = 8;
        this.ctx.shadowColor = `rgba(${this.options.color}, 0.8)`;
      } else {
        this.ctx.shadowBlur = 0;
      }

      this.ctx.fill();
    }

    this.animId = requestAnimationFrame(() => this.animate());
  }

  destroy() {
    if (this.animId) cancelAnimationFrame(this.animId);
  }
}

window.ParticleEngine = ParticleEngine;
