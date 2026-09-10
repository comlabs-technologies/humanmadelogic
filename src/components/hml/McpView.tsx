'use client';

import { useState } from 'react';
import { mcp } from '@/config/agency';
import { MagneticDisc } from './MagneticDisc';
import { RevealOnScroll } from './RevealOnScroll';
import { RevealText } from './RevealText';

const cursorSnippet = `{
  "mcpServers": {
    "comlabs": {
      "url": "https://your-domain/api/mcp"
    }
  }
}`;

const claudeSnippet = `{
  "mcpServers": {
    "comlabs": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://your-domain/api/mcp"]
    }
  }
}`;

const stdioSnippet = `{
  "mcpServers": {
    "comlabs": {
      "command": "npx",
      "args": ["tsx", "src/mcp/stdio.ts"],
      "cwd": "."
    }
  }
}`;

function CopyBlock({ label, code }: { label: string; code: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <figure className="border-t border-obsidian/10 pt-8 first:border-t-0 first:pt-0">
      <div className="flex items-baseline justify-between gap-4">
        <figcaption className="text-[13px] uppercase tracking-[0.18em] text-slate">{label}</figcaption>
        <button
          type="button"
          onClick={async () => {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1600);
          }}
          className="text-[13px] text-obsidian transition-colors hover:text-slate"
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre className="mt-4 overflow-x-auto text-[13px] leading-[1.6] text-obsidian/85">{code}</pre>
    </figure>
  );
}

export function McpView() {
  const [active, setActive] = useState<string | null>(null);
  const clients = [...mcp.clients, ...mcp.clients];

  return (
    <>
      <section className="relative overflow-hidden pt-28 sm:pt-32 lg:pt-36">
        <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-12">
          <p className="text-[11px] uppercase tracking-[0.2em] text-slate">{mcp.eyebrow}</p>
          <RevealText
            as="h1"
            immediate
            delay={0.12}
            lines={mcp.heading}
            className="mt-6 text-[12vw] leading-[0.92] tracking-[-0.055em] sm:text-[8vw] lg:text-[6.4vw] xl:text-[92px]"
          />
          <p className="mt-8 max-w-[52ch] text-[16px] leading-[1.6] text-slate sm:text-[17px]">{mcp.body}</p>
        </div>
      </section>

      <section aria-label="Connected clients" className="mt-16 border-y border-obsidian/10 py-8 sm:py-10">
        <div className="hidden overflow-hidden lg:block">
          <div className="hml-marquee flex w-max">
            <ul className="flex shrink-0 items-baseline gap-12 pr-12">
              {clients.map((name, index) => (
                <li key={`${name}-${index}`} className="flex shrink-0 items-baseline gap-3 whitespace-nowrap">
                  <span aria-hidden="true" className="h-[7px] w-[7px] rounded-full bg-signalYellow" />
                  <span className="text-[26px] tracking-[-0.04em] sm:text-[32px]">{name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <ul className="mx-auto grid max-w-editorial grid-cols-2 gap-x-6 gap-y-4 px-5 sm:grid-cols-3 sm:px-8 lg:hidden">
          {mcp.clients.map((name) => (
            <li key={name} className="text-[22px] tracking-[-0.04em]">
              {name}
            </li>
          ))}
        </ul>
      </section>

      <section className="py-24 sm:py-32 lg:py-40">
        <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-12">
          <div className="grid gap-8 lg:grid-cols-12">
            <p className="text-[11px] uppercase tracking-[0.2em] text-slate lg:col-span-3">/ How it connects</p>
            <RevealText
              lines={['Point a client at the server.', 'Ask any configured model.']}
              className="text-[7.4vw] leading-[1.05] tracking-[-0.04em] sm:text-[4.8vw] lg:col-span-9 lg:text-[3.6vw] xl:text-[52px]"
            />
          </div>

          <ol className="relative mt-16 lg:mt-20">
            <span aria-hidden="true" className="absolute left-0 top-0 hidden h-full w-px bg-obsidian/10 sm:block" />
            {mcp.steps.map((step, index) => (
              <li key={step.index} className="relative border-b border-obsidian/10 py-10 sm:pl-10 lg:py-14">
                <span
                  aria-hidden="true"
                  className={`absolute left-0 top-[52px] hidden h-[9px] w-[9px] -translate-x-1/2 rounded-full sm:block ${
                    index === 0 ? 'bg-signalYellow' : 'bg-obsidian/25'
                  }`}
                />
                <div className="flex items-baseline gap-5">
                  <span className="text-[12px] tabular-nums tracking-[0.18em] text-slate">{step.index}</span>
                  <h2 className="text-[30px] leading-[1.1] tracking-[-0.04em] sm:text-[38px]">{step.title}</h2>
                </div>
                <p className="mt-4 max-w-[46ch] text-[16px] leading-[1.6] text-slate sm:ml-[52px]">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="pb-8 sm:pb-12">
        <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-12">
          <p className="text-[11px] uppercase tracking-[0.2em] text-slate">/ Models</p>
          <ul className="mt-10 grid border-t border-obsidian/10 md:grid-cols-3">
            {mcp.providers.map((item, index) => {
              const isActive = active === item.id;
              return (
                <li
                  key={item.id}
                  onPointerEnter={() => setActive(item.id)}
                  onPointerLeave={() => setActive((current) => (current === item.id ? null : current))}
                  className={`border-b px-1 py-8 transition-colors duration-300 md:px-6 ${
                    index > 0 ? 'md:border-l' : ''
                  } ${isActive ? 'border-obsidian/40' : 'border-obsidian/10'}`}
                >
                  <span
                    className={`block text-[12px] tabular-nums tracking-[0.18em] transition-[color,transform] duration-500 ${
                      isActive ? 'translate-x-1 text-signalYellow' : 'text-slate'
                    }`}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-4 text-[26px] leading-[1.15] tracking-[-0.035em] sm:text-[30px]">{item.title}</h3>
                  <p className="mt-3 text-[15px] leading-[1.6] text-slate">{item.body}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="text-[11px] uppercase tracking-[0.2em] text-slate">/ Tools</p>
              <RevealText
                lines={['What the server can do.']}
                className="mt-6 text-[8vw] leading-[1.04] tracking-[-0.04em] sm:text-[5.2vw] lg:text-[3.4vw] xl:text-[50px]"
              />
            </div>
            <RevealOnScroll className="lg:col-span-7">
              <ul>
                {mcp.tools.map((tool) => (
                  <li key={tool.name} className="flex flex-col gap-2 border-b border-obsidian/10 py-5 first:border-t sm:flex-row sm:items-baseline sm:justify-between">
                    <code className="text-[16px] tracking-[-0.03em]">{tool.name}</code>
                    <span className="max-w-[36ch] text-[15px] text-slate sm:text-right">{tool.purpose}</span>
                  </li>
                ))}
              </ul>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      <section className="pb-24 sm:pb-32">
        <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-12">
          <p className="text-[11px] uppercase tracking-[0.2em] text-slate">/ Connect</p>
          <RevealOnScroll className="mt-10 space-y-0">
            <CopyBlock label="Cursor" code={cursorSnippet} />
            <CopyBlock label="Claude Desktop" code={claudeSnippet} />
            <CopyBlock label="Local stdio" code={stdioSnippet} />
          </RevealOnScroll>
        </div>
      </section>

      <section className="relative overflow-hidden bg-obsidian text-paper">
        <MagneticDisc />
        <div className="relative mx-auto max-w-editorial px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
          <RevealText
            lines={['Same studio.', 'Now in the client.']}
            className="max-w-[14ch] text-[11vw] leading-[0.96] tracking-[-0.05em] sm:text-[7vw] lg:text-[5.2vw] xl:text-[72px]"
          />
          <a
            href="/contact"
            className="group mt-12 inline-flex h-14 items-center gap-3 rounded-full bg-signalYellow px-7 text-[16px] font-medium text-obsidian transition-transform duration-300 hover:scale-[1.03]"
          >
            Request access
            <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>
      </section>
    </>
  );
}
