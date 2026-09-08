'use client';

import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { Button } from './Button';
import { EditorialImage } from './EditorialImage';
import { editorialImages } from '@/lib/editorialImages';

const tabs = [
  { id: 'mail', label: 'Mail' },
  { id: 'grammarly', label: 'Grammarly' },
  { id: 'docs', label: 'Docs' },
  { id: 'go', label: 'Go' },
];

function MailScene() {
  const rows = [
    { from: 'Rahul Vohra', subject: 'Q3 launch plan', snippet: 'Auto-draft is ready when you are.', unread: true },
    { from: 'Design systems', subject: 'Component review', snippet: 'Please look at the inspector states.', unread: true },
    { from: 'Rivian', subject: 'Onsite briefing', snippet: 'Agenda attached for Thursday.', unread: false },
    { from: 'Zapier', subject: 'Workflow recovered', snippet: 'Your Mail → Docs zap is live.', unread: false },
  ];

  return (
    <div className="grain-scene scene-mail rounded-card h-full min-h-[360px] p-5 md:p-8 flex items-center justify-center">
      <div className="bg-white rounded-card w-full max-w-[420px] overflow-hidden">
        <div className="px-4 py-3 border-b border-line flex items-center justify-between">
          <span className="font-sans text-label tracking-tight">Inbox</span>
          <span className="font-secondary text-label text-muted tracking-tight">Split</span>
        </div>
        <ul>
          {rows.map((row) => (
            <li key={row.subject} className="px-4 py-3 border-b border-line last:border-0">
              <div className="flex items-center justify-between gap-3">
                <span className={`font-secondary text-[13px] tracking-tight ${row.unread ? 'text-ink' : 'text-muted'}`}>
                  {row.from}
                </span>
                {row.unread && <span className="w-1.5 h-1.5 rounded-full bg-ink" />}
              </div>
              <p className="font-secondary text-[13px] tracking-tight text-ink mt-0.5">{row.subject}</p>
              <p className="font-secondary text-[12px] tracking-tight text-muted">{row.snippet}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function GrammarlyScene() {
  return (
    <div className="grain-scene scene-grammarly rounded-card h-full min-h-[360px] p-5 md:p-8 flex items-center justify-center">
      <div className="bg-white rounded-card w-full max-w-[420px] p-5">
        <p className="font-sans text-label tracking-tight text-muted mb-4">Slack · #launch</p>
        <p className="font-secondary text-body tracking-tight text-ink leading-relaxed">
          Sharing the brief now — Grammarly tightened the{' '}
          <span className="border-b-2 border-[#6b4eff]">opening</span> so it sounds like you.
        </p>
        <div className="mt-4 bg-canvas rounded-small p-3 border border-line">
          <p className="font-secondary text-label tracking-tight text-muted mb-1">Suggestion</p>
          <p className="font-secondary text-[13px] tracking-tight text-ink">
            Rewrite: “Here’s the launch brief, already in your voice.”
          </p>
        </div>
      </div>
    </div>
  );
}

function DocsScene() {
  return (
    <div className="grain-scene scene-docs rounded-card h-full min-h-[360px] p-5 md:p-8 flex items-center justify-center">
      <div className="bg-white rounded-card w-full max-w-[440px] overflow-hidden">
        <div className="px-5 py-4 border-b border-line">
          <p className="font-sans text-[15px] tracking-tight">Launch workspace</p>
        </div>
        <div className="p-5">
          <div className="grid grid-cols-3 gap-2 mb-4">
            {['Brief', 'Owners', 'Status'].map((h) => (
              <p key={h} className="font-secondary text-[11px] tracking-tight text-muted">{h}</p>
            ))}
            {['Homepage', 'Amina', 'Live'].map((c) => (
              <p key={c} className="font-secondary text-[13px] tracking-tight text-ink">{c}</p>
            ))}
            {['Inbox split', 'Joel', 'Review'].map((c) => (
              <p key={c} className="font-secondary text-[13px] tracking-tight text-ink">{c}</p>
            ))}
          </div>
          <div className="border border-line rounded-small px-3 py-2 font-secondary text-[13px] tracking-tight text-muted">
            / ask Docs to draft next steps
          </div>
        </div>
      </div>
    </div>
  );
}

function GoScene() {
  const people = [
    { name: 'Amina Cole', role: 'Product' },
    { name: 'Joel Park', role: 'Design' },
    { name: 'Priya Shah', role: 'Engineering' },
    { name: 'Chris Nguyen', role: 'Sales' },
  ];

  return (
    <div className="relative rounded-card h-full min-h-[360px] overflow-hidden bg-canvas">
      <EditorialImage
        src={editorialImages.productScenes}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        objectPosition="center"
      />
      <div className="absolute inset-0 bg-white/20" />
      <div className="relative h-full min-h-[360px] p-5 md:p-8 flex items-center justify-center">
        <div className="bg-white rounded-card w-full max-w-[380px] p-4">
          <p className="font-sans text-label tracking-tight mb-3">Team directory</p>
          <ul className="space-y-2.5">
            {people.map((person) => (
              <li key={person.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-canvas border border-line font-sans text-[10px] flex items-center justify-center tracking-tight">
                    {person.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <span className="font-secondary text-[13px] tracking-tight text-ink">{person.name}</span>
                </div>
                <span className="font-secondary text-[12px] tracking-tight text-muted">{person.role}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

const products = [
  {
    id: 'mail',
    title: 'The most productive email app ever made.',
    body: 'Fly through your inbox twice as fast, never drop the ball, and save four hours every week.',
    href: '#mail',
    points: ['Auto drafts from inbox context', 'Split Inbox that surfaces what matters', 'Scheduling without the back-and-forth'],
    Visual: MailScene,
  },
  {
    id: 'grammarly',
    title: 'Everyone’s favorite AI writing partner.',
    body: 'Grammarly helps you write and edit in the apps you already use, in a voice that still sounds like you.',
    href: '#grammarly',
    points: ['Suggestions that match your taste', 'Works across browser, docs, and chat', 'Rewrites without flattening your tone'],
    Visual: GrammarlyScene,
  },
  {
    id: 'docs',
    title: 'The best place for teams and AI to work together.',
    body: 'Superhuman Docs is home base for projects, workflows, data, and tools—so the team builds from one surface.',
    href: '#docs',
    points: ['Docs, tables, and workflows together', 'Agents that write into the page', 'Connected to the tools you already run'],
    Visual: DocsScene,
  },
  {
    id: 'go',
    title: 'AI that works in every app you use.',
    body: 'Go brings agents into the tools you already live in. Type, and help appears before you have to ask.',
    href: '#go',
    points: ['Meeting prep from calendar and mail', 'Daily briefs that keep commitments visible', 'Custom agents without a ticket to engineering'],
    Visual: GoScene,
  },
];

export function SuiteSection() {
  const [active, setActive] = useState('mail');

  const onTab = (id: string) => {
    setActive(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="suite" className="bg-canvas pb-section-mobile md:pb-section-desktop">
      <div className="max-w-container mx-auto px-gutter-mobile md:px-gutter-desktop">
        <div className="flex items-end justify-between gap-6 mb-8">
          <h2 className="font-sans text-heading-lg md:text-heading-xl tracking-tight">
            Your Superhuman suite
          </h2>
          <Button href="#get-superhuman" variant="secondary" className="hidden sm:inline-flex shrink-0">
            Get the suite
          </Button>
        </div>

        <div className="flex gap-6 border-b border-line mb-14 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTab(tab.id)}
              className={`font-secondary text-body tracking-tight pb-3 border-b-2 -mb-px transition-colors duration-200 ${
                active === tab.id
                  ? 'border-ink text-ink'
                  : 'border-transparent text-muted hover:text-ink'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="space-y-20 md:space-y-28">
          {products.map((product) => {
            const Visual = product.Visual;
            return (
              <article key={product.id} id={product.id} className="grid md:grid-cols-2 gap-10 md:gap-16 items-center scroll-mt-24">
                <div>
                  <h3 className="font-sans text-heading-md md:text-heading-lg tracking-tight text-ink mb-4">
                    {product.title}
                  </h3>
                  <p className="font-secondary text-body-lg text-muted tracking-tight mb-5">
                    {product.body}
                  </p>
                  <Button variant="link" href={product.href} className="mb-6">
                    Learn more
                    <ArrowRight size={16} />
                  </Button>
                  <ul className="space-y-2.5">
                    {product.points.map((point) => (
                      <li key={point} className="flex items-start gap-2.5">
                        <Check size={16} className="mt-0.5 text-ink shrink-0" />
                        <span className="font-secondary text-body tracking-tight text-ink">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Visual />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
