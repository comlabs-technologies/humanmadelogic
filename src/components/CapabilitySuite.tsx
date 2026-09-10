'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Check } from 'lucide-react';
import { Container, SectionHeading } from '@/components/ui/Section';
import { CapabilitySceneView } from '@/components/scenes/CapabilityScenes';
import { capabilitySuite } from '@/config/content';
import type { CapabilityScene } from '@/config/content';

const capabilities = capabilitySuite.capabilities;

export function CapabilitySuite() {
  const [active, setActive] = useState<CapabilityScene>(capabilities[0].id);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Deep links such as /#automations open the matching capability.
  useEffect(() => {
    const applyHash = () => {
      const hash = window.location.hash.replace('#', '');
      const match = capabilities.find((capability) => capability.id === hash);
      if (match) setActive(match.id);
    };
    applyHash();
    window.addEventListener('hashchange', applyHash);
    return () => window.removeEventListener('hashchange', applyHash);
  }, []);

  const activeIndex = capabilities.findIndex((capability) => capability.id === active);
  const current = capabilities[activeIndex] ?? capabilities[0];

  const focusTab = (index: number) => {
    const next = (index + capabilities.length) % capabilities.length;
    setActive(capabilities[next].id);
    tabRefs.current[next]?.focus();
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault();
        focusTab(index + 1);
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault();
        focusTab(index - 1);
        break;
      case 'Home':
        event.preventDefault();
        focusTab(0);
        break;
      case 'End':
        event.preventDefault();
        focusTab(capabilities.length - 1);
        break;
      default:
        break;
    }
  };

  return (
    <section id="capabilities" className="relative bg-canvas py-section-mobile lg:py-section-desktop">
      {/* Anchor targets for the footer's product links. */}
      {capabilities.map((capability) => (
        <span
          key={capability.id}
          id={capability.id}
          aria-hidden="true"
          className="absolute -top-20"
        />
      ))}

      <Container>
        <SectionHeading
          eyebrow={capabilitySuite.eyebrow}
          heading={capabilitySuite.heading}
          body={capabilitySuite.body}
        />

        <div
          role="tablist"
          aria-label="Relay capabilities"
          className="mt-10 flex gap-1 border-b border-line overflow-x-auto"
        >
          {capabilities.map((capability, index) => {
            const selected = capability.id === active;
            return (
              <button
                key={capability.id}
                ref={(node) => {
                  tabRefs.current[index] = node;
                }}
                type="button"
                role="tab"
                id={`tab-${capability.id}`}
                aria-selected={selected}
                aria-controls={`panel-${capability.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(capability.id)}
                onKeyDown={(event) => onKeyDown(event, index)}
                className={`shrink-0 px-3.5 pb-3 pt-2 -mb-px border-b-2 text-[14px] font-medium tracking-tight transition-colors duration-200 ${
                  selected
                    ? 'border-ink text-ink'
                    : 'border-transparent text-subtle hover:text-ink'
                }`}
              >
                {capability.tabLabel}
              </button>
            );
          })}
        </div>

        <div
          key={current.id}
          role="tabpanel"
          id={`panel-${current.id}`}
          aria-labelledby={`tab-${current.id}`}
          tabIndex={0}
          className="mt-10 lg:mt-14 grid lg:grid-cols-2 gap-8 lg:gap-16 items-center animate-scene-in focus-visible:outline-none"
        >
          <div>
            <h3 className="text-heading-md lg:text-heading-lg text-ink">{current.title}</h3>
            <p className="text-body-lg text-muted mt-4 max-w-[480px]">{current.body}</p>
            <ul className="mt-6 space-y-3">
              {current.points.map((point) => (
                <li key={point} className="flex items-start gap-2.5">
                  <Check size={15} className="mt-1 text-signal shrink-0" aria-hidden="true" />
                  <span className="text-body text-ink">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <CapabilitySceneView scene={current.scene} />
        </div>
      </Container>
    </section>
  );
}
