'use client';

import { useMemo, useState } from 'react';
import { admin } from '@/config/agency';
import type { Inquiry } from '@/lib/inquiries';
import { MagneticDisc } from './MagneticDisc';
import { RevealOnScroll } from './RevealOnScroll';
import { RevealText } from './RevealText';

type Provider = {
  id: string;
  label: string;
  configured: boolean;
  model: string;
  env: string;
};

type Mail = {
  to: string;
  smtp: boolean;
  from: string;
};

export function AdminDashboard({
  inquiries,
  providers,
  mail,
  endpoint,
}: {
  inquiries: Inquiry[];
  providers: Provider[];
  mail: Mail;
  endpoint: string;
}) {
  const [items, setItems] = useState(inquiries);
  const unread = useMemo(() => items.filter((item) => !item.read).length, [items]);

  const logout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    window.location.reload();
  };

  const toggleRead = async (inquiry: Inquiry) => {
    const response = await fetch('/api/admin/inquiries', {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ id: inquiry.id, read: !inquiry.read }),
    });
    if (!response.ok) return;
    const payload = (await response.json()) as { inquiry?: Inquiry };
    if (!payload.inquiry) return;
    setItems((current) => current.map((item) => (item.id === inquiry.id ? payload.inquiry! : item)));
  };

  return (
    <>
      <section className="relative overflow-hidden pt-28 sm:pt-32 lg:pt-36">
        <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-12">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-slate">{admin.eyebrow}</p>
              <RevealText
                as="h1"
                immediate
                delay={0.1}
                lines={admin.heading}
                className="mt-6 text-[12vw] leading-[0.92] tracking-[-0.055em] sm:text-[8vw] lg:text-[5.6vw] xl:text-[80px]"
              />
            </div>
            <button
              type="button"
              onClick={logout}
              className="inline-flex h-11 items-center rounded-full border border-obsidian/20 px-5 text-[14px]"
            >
              Sign out
            </button>
          </div>
          <p className="mt-8 max-w-[48ch] text-[16px] leading-[1.6] text-slate">{admin.body}</p>
        </div>
      </section>

      <section aria-label="Studio numbers" className="mt-14 border-y border-obsidian/10 py-8 sm:py-10">
        <ul className="mx-auto flex max-w-editorial flex-wrap gap-x-12 gap-y-6 px-5 sm:px-8 lg:px-12">
          {[
            { value: String(items.length), label: 'enquiries' },
            { value: String(unread), label: 'unread' },
            { value: String(providers.filter((item) => item.configured).length), label: 'models live' },
            { value: mail.smtp ? 'SMTP' : 'local', label: 'mailer' },
          ].map((item) => (
            <li key={item.label} className="flex items-baseline gap-3">
              <span className="text-[32px] tracking-[-0.04em]">{item.value}</span>
              <span className="text-[13px] text-slate">{item.label}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-12">
          <div className="grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="text-[11px] uppercase tracking-[0.2em] text-slate">/ MCP</p>
              <h2 className="mt-4 text-[32px] leading-[1.08] tracking-[-0.04em]">Connected backends</h2>
              <p className="mt-4 text-[15px] leading-[1.6] text-slate">
                Endpoint <code className="text-obsidian">{endpoint}</code>
              </p>
              <p className="mt-2 text-[15px] leading-[1.6] text-slate">
                Mail to {mail.to}. {mail.smtp ? 'SMTP is configured.' : 'SMTP is not configured — messages are stored locally.'}
              </p>
            </div>
            <RevealOnScroll className="lg:col-span-8">
              <ul className="border-t border-obsidian/10">
                {providers.map((provider) => (
                  <li key={provider.id} className="flex items-baseline justify-between gap-6 border-b border-obsidian/10 py-5">
                    <div>
                      <p className="text-[22px] tracking-[-0.04em]">{provider.label}</p>
                      <p className="mt-1 text-[13px] text-slate">
                        {provider.env} · {provider.model}
                      </p>
                    </div>
                    <span className="flex items-center gap-2 text-[13px] uppercase tracking-[0.16em]">
                      <span
                        aria-hidden="true"
                        className={`h-[7px] w-[7px] rounded-full ${provider.configured ? 'bg-signalYellow' : 'bg-obsidian/20'}`}
                      />
                      {provider.configured ? 'Live' : 'Off'}
                    </span>
                  </li>
                ))}
              </ul>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      <section className="pb-24 sm:pb-32">
        <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-12">
          <p className="text-[11px] uppercase tracking-[0.2em] text-slate">/ Enquiries</p>
          {items.length === 0 ? (
            <p className="mt-10 max-w-[40ch] text-[18px] leading-[1.5] text-slate">
              Nothing yet. The contact form and the MCP submit_inquiry tool both land here.
            </p>
          ) : (
            <ol className="mt-10">
              {items.map((item) => (
                <li key={item.id} className="border-b border-obsidian/10 py-8 first:border-t">
                  <div className="flex flex-wrap items-baseline justify-between gap-4">
                    <h3 className="text-[28px] tracking-[-0.04em]">{item.name}</h3>
                    <p className="text-[13px] text-slate">
                      {new Date(item.createdAt).toLocaleString()} · {item.source}
                      {item.emailed ? ' · emailed' : ' · stored'}
                    </p>
                  </div>
                  <p className="mt-2 text-[15px] text-slate">
                    {item.email}
                    {item.company ? ` · ${item.company}` : ''} · {item.topic}
                  </p>
                  <p className="mt-4 max-w-[62ch] text-[16px] leading-[1.6]">{item.message}</p>
                  <button
                    type="button"
                    onClick={() => toggleRead(item)}
                    className="mt-5 inline-flex h-10 items-center rounded-full border border-obsidian/20 px-4 text-[13px]"
                  >
                    {item.read ? 'Mark unread' : 'Mark read'}
                  </button>
                </li>
              ))}
            </ol>
          )}
        </div>
      </section>

      <section className="relative overflow-hidden bg-obsidian text-paper">
        <MagneticDisc />
        <div className="relative mx-auto max-w-editorial px-5 py-20 sm:px-8 lg:px-12">
          <p className="max-w-[28ch] text-[8vw] leading-[0.96] tracking-[-0.05em] sm:text-[48px]">Keep the thread close to the work.</p>
        </div>
      </section>
    </>
  );
}
