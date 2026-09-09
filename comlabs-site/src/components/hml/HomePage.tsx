'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useFinePointer, useMediaQuery } from '@/lib/hml/useMediaQuery';
import { useReducedMotion } from '@/lib/hml/useReducedMotion';
import { usePointerVelocity } from '@/lib/hml/usePointerVelocity';
import { SmoothScrollProvider } from './SmoothScrollProvider';
import { LoadingTransition } from './LoadingTransition';
import { SiteHeader } from './SiteHeader';
import { Hero } from './Hero';
import { AgencyStatement } from './AgencyStatement';
import { Capabilities } from './Capabilities';
import { SelectedWork } from './SelectedWork';
import { Process } from './Process';
import { ProofStrip } from './ProofStrip';
import { Testimonial } from './Testimonial';
import { FinalCTA } from './FinalCTA';
import { SiteFooter } from './SiteFooter';

/** The WebGL layer never runs on the server and never blocks first paint. */
const WebGLLayer = dynamic(() => import('./webgl/WebGLLayer'), { ssr: false });

function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')),
    );
  } catch {
    return false;
  }
}

export function HomePage() {
  const reducedMotion = useReducedMotion();
  const finePointer = useFinePointer();
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const [canRender3D, setCanRender3D] = useState(false);

  // Pointer tracking is only installed where it is actually used.
  usePointerVelocity(finePointer && !reducedMotion);

  useEffect(() => {
    // Defer the capability check so it never competes with first paint.
    const id = window.requestAnimationFrame(() => setCanRender3D(supportsWebGL()));
    return () => window.cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    const previous = document.body.style.backgroundColor;
    document.body.style.backgroundColor = '#F2F0EB';
    return () => {
      document.body.style.backgroundColor = previous;
    };
  }, []);

  // Shaders are a desktop enhancement: on touch and reduced motion the same
  // composition renders as ordinary DOM images.
  const webgl = canRender3D && isDesktop && finePointer && !reducedMotion;

  return (
    <SmoothScrollProvider>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <LoadingTransition />
      <SiteHeader />

      {/* Paper backdrop → shared canvas → content. */}
      <div aria-hidden="true" className="fixed inset-0 z-0 bg-paper" />
      {webgl && <WebGLLayer />}

      <main id="main" className="hml relative z-10">
        <Hero />
        <AgencyStatement />
        <Capabilities />
        <SelectedWork />
        <Process />
        <ProofStrip />
        <Testimonial />
        <FinalCTA />
      </main>

      <div className="relative z-10">
        <SiteFooter />
      </div>
    </SmoothScrollProvider>
  );
}
