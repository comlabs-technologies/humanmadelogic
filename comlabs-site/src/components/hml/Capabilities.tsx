'use client';

import { useState } from 'react';
import { capabilities } from '@/config/agency';
import { CapabilityVisual } from './CapabilityVisual';
import { RevealText } from './RevealText';

export function Capabilities() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section id="capabilities" className="scroll-mt-24 pb-8 sm:pb-12">
      <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-12">
          <p className="text-[11px] uppercase tracking-[0.2em] text-slate lg:col-span-3">
            {capabilities.label}
          </p>
          <RevealText
            lines={[capabilities.heading]}
            className="text-[7.4vw] leading-[1.05] tracking-[-0.04em] sm:text-[4.8vw] lg:col-span-9 lg:text-[3.6vw] xl:text-[52px]"
          />
        </div>

        <ul className="mt-14 grid border-t border-obsidian/10 sm:mt-20 md:grid-cols-2">
          {capabilities.items.map((item, index) => {
            const isActive = active === item.index;
            return (
              <li
                key={item.index}
                onPointerEnter={() => setActive(item.index)}
                onPointerLeave={() => setActive((current) => (current === item.index ? null : current))}
                onFocus={() => setActive(item.index)}
                onBlur={() => setActive((current) => (current === item.index ? null : current))}
                tabIndex={0}
                className={`group relative flex flex-col justify-between gap-8 border-b px-1 py-8 outline-none transition-colors duration-300 sm:py-10 md:px-6 md:even:border-l ${
                  isActive ? 'border-obsidian/40' : 'border-obsidian/10'
                } focus-visible:ring-2 focus-visible:ring-obsidian focus-visible:ring-offset-4 focus-visible:ring-offset-paper`}
              >
                <div className="flex items-start justify-between gap-6">
                  <div className="max-w-[42ch]">
                    <span
                      className={`block text-[12px] tabular-nums tracking-[0.18em] transition-[color,transform] duration-500 ${
                        isActive ? 'translate-x-1 text-signalYellow' : 'text-slate'
                      }`}
                    >
                      {item.index}
                    </span>
                    <h3 className="mt-4 text-[26px] leading-[1.15] tracking-[-0.035em] sm:text-[30px]">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-[15px] leading-[1.6] text-slate">{item.body}</p>
                  </div>

                  <div className="shrink-0 pt-1">
                    <CapabilityVisual kind={item.visual} active={isActive} />
                  </div>
                </div>

                <span className="sr-only">Capability {index + 1} of {capabilities.items.length}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
