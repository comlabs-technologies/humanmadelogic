'use client';

import { useEffect, useState } from 'react';
import { contact } from '@/config/agency';
import { HmlContactForm } from './HmlContactForm';
import { MagneticDisc } from './MagneticDisc';
import { RevealOnScroll } from './RevealOnScroll';
import { RevealText } from './RevealText';

export function ContactView() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    setCurrent(0);
  }, []);

  return (
    <>
      <section className="relative overflow-hidden pt-28 sm:pt-32 lg:pt-36">
        <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-12">
          <p className="text-[11px] uppercase tracking-[0.2em] text-slate">{contact.eyebrow}</p>
          <RevealText
            as="h1"
            immediate
            delay={0.12}
            lines={contact.heading}
            className="mt-6 text-[12vw] leading-[0.92] tracking-[-0.055em] sm:text-[8vw] lg:text-[6.4vw] xl:text-[92px]"
          />
          <p className="mt-8 max-w-[46ch] text-[16px] leading-[1.6] text-slate sm:text-[17px]">{contact.body}</p>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-28">
        <div className="mx-auto grid max-w-editorial gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16 lg:px-12">
          <RevealOnScroll className="lg:col-span-7">
            <HmlContactForm />
          </RevealOnScroll>

          <aside className="lg:col-span-5 lg:pt-4">
            <RevealOnScroll>
              <p className="text-[11px] uppercase tracking-[0.2em] text-slate">Direct</p>
              <dl className="mt-8">
                {contact.details.map((detail, index) => (
                  <div
                    key={detail.label}
                    onPointerEnter={() => setCurrent(index)}
                    className="relative border-b border-obsidian/10 py-5 first:border-t"
                  >
                    <span
                      aria-hidden="true"
                      className={`absolute left-0 top-1/2 h-[9px] w-[9px] -translate-x-1/2 -translate-y-1/2 rounded-full transition-colors duration-500 ${
                        current === index ? 'bg-signalYellow' : 'bg-obsidian/20'
                      }`}
                    />
                    <dt className="pl-6 text-[12px] uppercase tracking-[0.18em] text-slate">{detail.label}</dt>
                    <dd className="mt-2 pl-6 text-[18px] tracking-[-0.03em]">{detail.value}</dd>
                  </div>
                ))}
              </dl>
            </RevealOnScroll>
          </aside>
        </div>
      </section>

      <section className="relative overflow-hidden bg-obsidian text-paper">
        <MagneticDisc />
        <div className="relative mx-auto max-w-editorial px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
          <RevealText
            lines={['We read every note.', 'Then we write back.']}
            className="max-w-[14ch] text-[11vw] leading-[0.96] tracking-[-0.05em] sm:text-[7vw] lg:text-[5.2vw] xl:text-[72px]"
          />
          <p className="mt-8 max-w-[42ch] text-[16px] leading-[1.6] text-paper/65">
            No ticket queues. The same inbox that receives this form is the one the studio works from.
          </p>
        </div>
      </section>
    </>
  );
}
