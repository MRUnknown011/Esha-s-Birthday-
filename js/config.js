/**
 * Ayesha's Birthday Experience - Configuration & Content
 * 
 * Edit this file to easily customize photos, captions, and text.
 * Real photos can be placed in `assets/images/` as `photo-01.jpg` through `photo-12.jpg`
 * or linked via any relative or absolute URL below.
 */

const EXPERIENCE_CONFIG = {
  recipient: {
    name: "Ayesha",
    birthdayFormatted: "03 / 09 / 2026",
    birthdayLong: "3 September 2026",
    year: "2026",
    dateShort: "03 · 09 · 2026"
  },

  // Audio settings
  audio: {
    ambientToneEnabled: true, // Generates soft cinematic lofi ambient soundscape via Web Audio API
    customAudioUrl: null,     // Optional: set to "assets/audio/soundtrack.mp3" if providing an mp3 file
    defaultVolume: 0.35
  },

  // 12 Photo Definitions with captions & fallback paths
  photos: [
    {
      id: 1,
      src: "assets/images/photo-01.jpg",
      fallback: "assets/images/photo-01.svg",
      title: "First Impressions",
      subtitle: "A NEW CHAPTER",
      caption: "Where a quiet conversation turned into a genuine connection."
    },
    {
      id: 2,
      src: "assets/images/photo-02.jpg",
      fallback: "assets/images/photo-02.svg",
      title: "Quiet Understanding",
      subtitle: "MOMENT IN TIME",
      caption: "Some friendships take years to form; others simply click."
    },
    {
      id: 3,
      src: "assets/images/photo-03.jpg",
      fallback: "assets/images/photo-03.svg",
      title: "Unexpected Depth",
      subtitle: "THE UNPLANNED SPARK",
      caption: "How quickly someone can become a constant source of positivity."
    },
    {
      id: 4,
      src: "assets/images/photo-04.jpg",
      fallback: "assets/images/photo-04.svg",
      title: "Her Presence",
      subtitle: "TIMELESS & GENUINE",
      caption: "Carrying a quiet calm that brightens any room."
    },
    {
      id: 5,
      src: "assets/images/photo-05.jpg",
      fallback: "assets/images/photo-05.svg",
      title: "The Grace in Laughter",
      subtitle: "NATURAL LIGHT",
      caption: "Effortless, contagious, and entirely real."
    },
    {
      id: 6,
      src: "assets/images/photo-06.jpg",
      fallback: "assets/images/photo-06.svg",
      title: "Quiet Confidence",
      subtitle: "EFFORTLESS ELEGANCE",
      caption: "A rare mix of gentle kindness and inner strength."
    },
    {
      id: 7,
      src: "assets/images/photo-07.jpg",
      fallback: "assets/images/photo-07.svg",
      title: "Unfiltered Authenticity",
      subtitle: "REAL & SINCERE",
      caption: "Never needing to pretend, always staying true."
    },
    {
      id: 8,
      src: "assets/images/photo-08.jpg",
      fallback: "assets/images/photo-08.svg",
      title: "Shared Perspectives",
      subtitle: "THE LITTLE THINGS",
      caption: "Finding humor and depth in the simplest moments."
    },
    {
      id: 9,
      src: "assets/images/photo-09.jpg",
      fallback: "assets/images/photo-09.svg",
      title: "Effortless Comfort",
      subtitle: "SIMPLE HARMONY",
      caption: "No pretense, no social masks — just good energy."
    },
    {
      id: 10,
      src: "assets/images/photo-10.jpg",
      fallback: "assets/images/photo-10.svg",
      title: "Meaning in the Ordinary",
      subtitle: "MEMORIES IN MOTION",
      caption: "The conversations that turn regular days into highlights."
    },
    {
      id: 11,
      src: "assets/images/photo-11.jpg",
      fallback: "assets/images/photo-11.svg",
      title: "A Rare Connection",
      subtitle: "LOOKING FORWARD",
      caption: "Grateful for the journey so far and all that is yet to come."
    },
    {
      id: 12,
      src: "assets/images/photo-12.jpg",
      fallback: "assets/images/photo-12.svg",
      title: "The Portrait of Ayesha",
      subtitle: "03 · 09 · 2026",
      caption: "Celebrating a truly wonderful person on her special day."
    }
  ],

  // Chapter 6 Letter Content
  letter: {
    greeting: "Dear Ayesha,",
    paragraphs: [
      "If someone told me a few months ago that we would become this close so quickly, I probably wouldn’t have believed them. Time is funny like that — sometimes it takes years to build trust, and other times, a friendship just effortlessly clicks from the very beginning.",
      "In the short time we’ve known each other, your presence has brought so much positivity, genuine laughter, and honest conversation. Having someone you can talk to freely, share thoughts with, and just be yourself around is rare, and I truly value that in our friendship.",
      "As you step into another year of your life, I hope you receive everything you deserve: immense happiness, peace of mind, big milestones, and quiet moments of contentment. Never lose that authenticity, warmth, and grace that make you who you are.",
      "I wanted to build this bespoke digital experience for you because a standard text message felt too ordinary for someone who has become such an important friend."
    ],
    closingWish: "Have the most extraordinary birthday and an unforgettable year ahead.",
    signature: "Your Best Friend",
    date: "03 · 09 · 2026",
    footerNote: "Made with care, specifically for Ayesha."
  }
};

window.EXPERIENCE_CONFIG = EXPERIENCE_CONFIG;
