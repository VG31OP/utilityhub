'use client';

import confetti from 'canvas-confetti';

export function fireCelebrationConfetti() {
  if (typeof window === 'undefined') return;

  try {
    // Elegant Dribbble-style subtle confetti burst
    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.85 },
      colors: ['#6366F1', '#A855F7', '#38BDF8', '#10B981', '#F59E0B'],
      disableForReducedMotion: true,
      scalar: 0.9,
    });
  } catch {
    // Ignore if canvas is unavailable
  }
}

export function fireStarConfetti() {
  if (typeof window === 'undefined') return;

  try {
    confetti({
      particleCount: 30,
      spread: 45,
      origin: { y: 0.8 },
      colors: ['#F59E0B', '#FBBF24', '#FDE68A', '#A855F7'],
      shapes: ['star', 'circle'],
      disableForReducedMotion: true,
      scalar: 1.1,
    });
  } catch {
    // Ignore
  }
}
