'use client';

import { useEffect } from 'react';

export type PointerState = {
  /** Viewport position in pixels. */
  x: number;
  y: number;
  /** Normalised position, -1 … 1 from the viewport centre. */
  nx: number;
  ny: number;
  /** Smoothed movement speed, roughly 0 … 1. */
  velocity: number;
  /** True once the pointer has actually moved over the document. */
  active: boolean;
};

/**
 * One shared pointer record for the whole page. Everything that reacts to the
 * cursor — the hero fan, the shader uniforms, the project labels — reads this
 * from inside its own animation frame, so no component re-renders on movement.
 */
export const pointerState: { current: PointerState } = {
  current: { x: 0, y: 0, nx: 0, ny: 0, velocity: 0, active: false },
};

/**
 * Installs the pointer listeners. Mount this once, near the top of the page.
 * Pass `enabled: false` on touch devices or under reduced motion and the
 * listeners are never attached at all.
 */
export function usePointerVelocity(enabled = true) {
  useEffect(() => {
    const state = pointerState.current;

    if (!enabled) {
      state.velocity = 0;
      state.active = false;
      return;
    }

    let lastX = 0;
    let lastY = 0;
    let lastTime = 0;

    const onMove = (event: PointerEvent) => {
      const now = performance.now();

      if (lastTime > 0) {
        const dt = Math.max(16, now - lastTime);
        const speed = Math.hypot(event.clientX - lastX, event.clientY - lastY) / dt;
        // Ease towards the new speed so one fast flick does not spike the shaders.
        state.velocity += (Math.min(1, speed * 0.55) - state.velocity) * 0.4;
      }

      state.x = event.clientX;
      state.y = event.clientY;
      state.nx = (event.clientX / window.innerWidth) * 2 - 1;
      state.ny = (event.clientY / window.innerHeight) * 2 - 1;
      state.active = true;

      lastX = event.clientX;
      lastY = event.clientY;
      lastTime = now;
    };

    const onLeave = () => {
      state.active = false;
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);

    // Velocity has to decay even when the pointer stops emitting events.
    const decay = window.setInterval(() => {
      state.velocity *= 0.78;
      if (state.velocity < 0.001) state.velocity = 0;
    }, 100);

    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      window.clearInterval(decay);
      state.velocity = 0;
      state.active = false;
    };
  }, [enabled]);

  return pointerState;
}
