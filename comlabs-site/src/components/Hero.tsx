'use client';

import React from 'react';
import { ArrowRight, Search } from 'lucide-react';
import { Button } from './Button';
import { EditorialImage } from './EditorialImage';

function ChatPanel() {
  return (
    <div className="glass-panel rounded-card p-3 w-[240px]">
      <p className="font-secondary text-label text-muted tracking-tight mb-3">Ask Go</p>
      <div className="space-y-2">
        <div className="bg-white/80 rounded-small px-3 py-2">
          <p className="font-secondary text-[13px] tracking-tight text-ink">
            Prep me for the 2pm with Rivian.
          </p>
        </div>
        <div className="bg-white/50 rounded-small px-3 py-2">
          <p className="font-secondary text-[13px] tracking-tight text-muted">
            Brief is ready. Three open questions and a draft agenda.
          </p>
        </div>
      </div>
    </div>
  );
}

function CommandPanel() {
  return (
    <div className="glass-panel rounded-card p-3 w-[280px]">
      <div className="flex items-center gap-2 px-2 py-2 border-b border-black/5 mb-2">
        <Search size={14} className="text-muted" />
        <span className="font-secondary text-[13px] tracking-tight text-muted">Search Superhuman</span>
      </div>
      <div className="space-y-1">
        {['Jump to Mail', 'Open daily brief', 'Share availability'].map((item) => (
          <div key={item} className="px-2 py-1.5 rounded-small hover:bg-white/60">
            <p className="font-secondary text-[13px] tracking-tight text-ink">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function TeamPanel() {
  return (
    <div className="glass-panel rounded-card p-3 w-[230px]">
      <p className="font-secondary text-label text-muted tracking-tight mb-3">Team summary</p>
      <div className="space-y-2.5">
        {[
          { name: 'Amina Cole', detail: 'Docs reviewed' },
          { name: 'Joel Park', detail: 'Waiting on legal' },
          { name: 'Priya Shah', detail: 'Shipped notes' },
        ].map((row) => (
          <div key={row.name} className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-ink/10 text-[10px] flex items-center justify-center font-sans tracking-tight">
              {row.name.split(' ').map((n) => n[0]).join('')}
            </div>
            <div>
              <p className="font-secondary text-[12px] tracking-tight text-ink leading-tight">{row.name}</p>
              <p className="font-secondary text-[11px] tracking-tight text-muted">{row.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MailPanel() {
  return (
    <div className="glass-panel rounded-card p-3 w-[260px]">
      <p className="font-secondary text-label text-muted tracking-tight mb-3">Inbox</p>
      <div className="space-y-2">
        {[
          { from: 'Figma', subject: 'Prototype comments' },
          { from: 'Zapier', subject: 'Workflow paused' },
          { from: 'DoorDash', subject: 'Launch checklist' },
        ].map((row) => (
          <div key={row.subject} className="flex flex-col gap-0.5 py-1 border-b border-black/5 last:border-0">
            <p className="font-secondary text-[12px] tracking-tight text-ink">{row.from}</p>
            <p className="font-secondary text-[12px] tracking-tight text-muted">{row.subject}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="bg-canvas">
      <div className="max-w-container mx-auto px-gutter-mobile md:px-gutter-desktop pt-16 md:pt-24 pb-10 text-center">
        <h1 className="font-sans text-[40px] sm:text-[56px] md:text-display font-medium text-ink tracking-tight max-w-[780px] mx-auto">
          Superpowers, everywhere you work
        </h1>
        <p className="font-secondary text-body-lg md:text-subheading text-muted mt-5 max-w-[520px] mx-auto tracking-tight">
          Mail, Docs, and AI that works in every app and tab.
        </p>
        <div className="mt-8 flex justify-center">
          <Button href="#get-superhuman" size="large">
            Get Superhuman
            <ArrowRight size={16} />
          </Button>
        </div>
      </div>

      <div className="relative mx-auto max-w-[1280px] px-gutter-mobile md:px-gutter-desktop pb-8">
        <div className="relative aspect-[4/5] md:aspect-[16/9] overflow-hidden bg-[#1a1a1a] rounded-card">
          <EditorialImage
            src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=1800"
            alt="Person looking upward"
            className="absolute inset-0 w-full h-full object-cover"
            objectPosition="center 18%"
            priority
          />
          <div className="absolute inset-0 bg-black/20" />

          <div className="hidden md:block absolute left-[6%] top-[22%]">
            <ChatPanel />
          </div>
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-[14%]">
            <CommandPanel />
          </div>
          <div className="hidden md:block absolute right-[7%] top-[18%]">
            <TeamPanel />
          </div>
          <div className="hidden md:block absolute right-[12%] bottom-[10%]">
            <MailPanel />
          </div>

          <div className="md:hidden absolute inset-x-4 bottom-4">
            <CommandPanel />
          </div>
        </div>
      </div>
    </section>
  );
}
