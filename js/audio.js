/**
 * Ambient Audio Controller & Generative Soundscape Engine
 * 
 * Uses Web Audio API to create a gentle, warm cinematic ambient harmonic pad,
 * or plays a custom audio track if configured.
 */

class AudioController {
  constructor(config = {}) {
    this.config = config;
    this.audioCtx = null;
    this.isPlaying = false;
    this.gainNode = null;
    this.customAudio = null;
    this.nodes = [];
    this.intervalId = null;

    this.initElements();
  }

  initElements() {
    this.btn = document.getElementById('audio-toggle');
    this.statusText = document.getElementById('audio-status');

    if (this.btn) {
      this.btn.addEventListener('click', () => this.toggle());
    }
  }

  initAudioContext() {
    if (this.audioCtx) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    this.audioCtx = new AudioContext();
    this.gainNode = this.audioCtx.createGain();
    this.gainNode.gain.setValueAtTime(0.001, this.audioCtx.currentTime);
    this.gainNode.connect(this.audioCtx.destination);
  }

  play() {
    if (this.isPlaying) return;

    // Check if custom audio URL is provided
    if (this.config.customAudioUrl) {
      if (!this.customAudio) {
        this.customAudio = new Audio(this.config.customAudioUrl);
        this.customAudio.loop = true;
        this.customAudio.volume = this.config.defaultVolume || 0.35;
      }
      this.customAudio.play().then(() => {
        this.isPlaying = true;
        this.updateUI(true);
      }).catch(err => {
        console.log("Audio autoplay prevented or file missing, falling back to synthesizer.", err);
        this.startGenerativeAmbient();
      });
      return;
    }

    this.startGenerativeAmbient();
  }

  startGenerativeAmbient() {
    try {
      this.initAudioContext();
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      // Warm cinematic pentatonic chord progression frequencies (Hz)
      const chordSets = [
        [174.61, 220.00, 261.63, 329.63], // Fmaj7 (F3, A3, C4, E4)
        [146.83, 220.00, 261.63, 349.23], // Dm7 (D3, A3, C4, F4)
        [164.81, 196.00, 246.94, 329.63], // Em7 (E3, G3, B3, E4)
        [130.81, 196.00, 261.63, 329.63]  // Cmaj7 (C3, G3, C4, E4)
      ];

      let chordIndex = 0;

      const playChord = () => {
        if (!this.isPlaying || !this.audioCtx) return;

        const now = this.audioCtx.currentTime;
        const freqs = chordSets[chordIndex % chordSets.length];
        chordIndex++;

        freqs.forEach((freq, idx) => {
          const osc = this.audioCtx.createOscillator();
          const noteGain = this.audioCtx.createGain();
          const filter = this.audioCtx.createBiquadFilter();

          osc.type = idx === 0 ? 'sine' : (idx % 2 === 0 ? 'triangle' : 'sine');
          osc.frequency.setValueAtTime(freq, now);

          // Subtle detune for rich analog warmth
          osc.detune.setValueAtTime((Math.random() - 0.5) * 8, now);

          // Low pass filter for soft velvet tone
          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(420 + idx * 80, now);
          filter.Q.setValueAtTime(1.2, now);

          // Attack - Sustain - Release envelope
          const dur = 7.5;
          const peakGain = (0.045 / (idx + 1)) * (this.config.defaultVolume || 0.35);

          noteGain.gain.setValueAtTime(0.0001, now);
          noteGain.gain.exponentialRampToValueAtTime(peakGain, now + 2.5);
          noteGain.gain.exponentialRampToValueAtTime(0.0001, now + dur);

          osc.connect(filter);
          filter.connect(noteGain);
          noteGain.connect(this.gainNode);

          osc.start(now);
          osc.stop(now + dur + 0.1);
        });
      };

      this.isPlaying = true;
      this.gainNode.gain.setValueAtTime(0.001, this.audioCtx.currentTime);
      this.gainNode.gain.exponentialRampToValueAtTime(1.0, this.audioCtx.currentTime + 1.5);

      playChord();
      this.intervalId = setInterval(playChord, 6500);

      this.updateUI(true);
    } catch (e) {
      console.error("Generative audio init error:", e);
    }
  }

  stop() {
    if (!this.isPlaying) return;

    if (this.customAudio) {
      this.customAudio.pause();
    }

    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }

    if (this.gainNode && this.audioCtx) {
      this.gainNode.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + 1.0);
    }

    this.isPlaying = false;
    this.updateUI(false);
  }

  toggle() {
    if (this.isPlaying) {
      this.stop();
    } else {
      this.play();
    }
  }

  updateUI(playing) {
    if (!this.btn) return;
    if (playing) {
      this.btn.classList.add('is-playing');
      this.btn.setAttribute('aria-label', 'Pause Ambient Sound');
      if (this.statusText) this.statusText.textContent = "SOUND ON";
    } else {
      this.btn.classList.remove('is-playing');
      this.btn.setAttribute('aria-label', 'Play Ambient Sound');
      if (this.statusText) this.statusText.textContent = "SOUND OFF";
    }
  }
}

window.AudioController = AudioController;
