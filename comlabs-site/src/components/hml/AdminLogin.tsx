'use client';

import { useState } from 'react';
import { admin } from '@/config/agency';
import { RevealText } from './RevealText';

export function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);
    setError('');
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const payload = (await response.json()) as { ok?: boolean; error?: string };
      if (!response.ok || !payload.ok) {
        setError(payload.error || 'Could not sign in.');
        return;
      }
      window.location.reload();
    } catch {
      setError('Could not sign in.');
    } finally {
      setPending(false);
    }
  };

  return (
    <section className="relative overflow-hidden pt-28 sm:pt-32 lg:pt-40">
      <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-12">
        <p className="text-[11px] uppercase tracking-[0.2em] text-slate">{admin.eyebrow}</p>
        <RevealText
          as="h1"
          immediate
          delay={0.1}
          lines={[admin.loginHeading]}
          className="mt-6 text-[12vw] leading-[0.92] tracking-[-0.055em] sm:text-[8vw] lg:text-[6vw] xl:text-[84px]"
        />
        <p className="mt-6 max-w-[42ch] text-[16px] leading-[1.6] text-slate">{admin.loginBody}</p>

        <form onSubmit={submit} className="mt-12 max-w-[420px]">
          <label htmlFor="password" className="mb-2 block text-[13px]">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="h-12 w-full rounded-full border border-obsidian/15 bg-paper px-4 text-[15px] transition-colors duration-300 hover:border-obsidian/35"
          />
          <button
            type="submit"
            disabled={pending}
            className="mt-6 inline-flex h-12 items-center rounded-full bg-obsidian px-6 text-[15px] font-medium text-paper transition-transform duration-300 hover:scale-[1.03] disabled:opacity-60"
          >
            {pending ? 'Checking' : 'Enter'}
          </button>
          {error && (
            <p role="alert" className="mt-4 text-[13px] text-[#b4442e]">
              {error}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
