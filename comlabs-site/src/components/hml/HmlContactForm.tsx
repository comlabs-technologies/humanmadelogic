'use client';

import { useState } from 'react';
import { contact } from '@/config/agency';
import { validateContact, type ContactErrors, type ContactFields } from '@/lib/contact';

const initial: ContactFields = {
  name: '',
  email: '',
  company: '',
  topic: contact.topics[0],
  message: '',
};

const fieldClass = (invalid: boolean) =>
  [
    'w-full h-12 px-4 rounded-full border bg-paper text-[15px] tracking-tight text-obsidian',
    'placeholder:text-slate/80 transition-colors duration-300',
    invalid ? 'border-[#b4442e]' : 'border-obsidian/15 hover:border-obsidian/35',
  ].join(' ');

export function HmlContactForm() {
  const [values, setValues] = useState<ContactFields>(initial);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof ContactFields, boolean>>>({});
  const [website, setWebsite] = useState('');
  const [pending, setPending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState('');

  const update = (key: keyof ContactFields, value: string) => {
    const next = { ...values, [key]: value };
    setValues(next);
    if (touched[key]) setErrors(validateContact(next));
  };

  const blur = (key: keyof ContactFields) => {
    setTouched((previous) => ({ ...previous, [key]: true }));
    setErrors(validateContact(values));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateContact(values);
    setErrors(nextErrors);
    setTouched({ name: true, email: true, company: true, topic: true, message: true });
    setServerError('');
    if (Object.keys(nextErrors).length > 0) return;

    setPending(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ ...values, website }),
      });
      const payload = (await response.json()) as { ok?: boolean; error?: string; errors?: ContactErrors };
      if (!response.ok || !payload.ok) {
        if (payload.errors) setErrors(payload.errors);
        setServerError(payload.error || 'We could not send that just now. Please try again.');
        return;
      }
      setSubmitted(true);
    } catch {
      setServerError('We could not send that just now. Please try again.');
    } finally {
      setPending(false);
    }
  };

  if (submitted) {
    return (
      <div role="status" className="border border-obsidian/10 bg-paper px-6 py-10 sm:px-8">
        <span aria-hidden="true" className="inline-block h-[9px] w-[9px] rounded-full bg-signalYellow" />
        <h2 className="mt-6 text-[32px] leading-[1.08] tracking-[-0.04em] sm:text-[40px]">{contact.successTitle}</h2>
        <p className="mt-4 max-w-[42ch] text-[16px] leading-[1.6] text-slate">{contact.successBody}</p>
        <button
          type="button"
          onClick={() => {
            setValues(initial);
            setErrors({});
            setTouched({});
            setSubmitted(false);
            setWebsite('');
          }}
          className="mt-8 inline-flex h-12 items-center rounded-full border border-obsidian/20 px-6 text-[15px] transition-colors hover:border-obsidian/45"
        >
          Send another message
        </button>
      </div>
    );
  }

  const invalid = (key: keyof ContactFields) => Boolean(touched[key] && errors[key]);

  return (
    <form noValidate onSubmit={handleSubmit} className="relative border border-obsidian/10 bg-paper px-6 py-8 sm:px-8 sm:py-10">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-[13px] text-obsidian">
            Name <span className="text-slate">(required)</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={(event) => update('name', event.target.value)}
            onBlur={() => blur('name')}
            aria-invalid={invalid('name')}
            className={fieldClass(invalid('name'))}
            placeholder="Alex Mercer"
          />
          {invalid('name') && <p className="mt-2 text-[12px] text-[#b4442e]">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email" className="mb-2 block text-[13px] text-obsidian">
            Email <span className="text-slate">(required)</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(event) => update('email', event.target.value)}
            onBlur={() => blur('email')}
            aria-invalid={invalid('email')}
            className={fieldClass(invalid('email'))}
            placeholder="you@company.com"
          />
          {invalid('email') && <p className="mt-2 text-[12px] text-[#b4442e]">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="company" className="mb-2 block text-[13px] text-obsidian">
            Company <span className="text-slate">(optional)</span>
          </label>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            value={values.company}
            onChange={(event) => update('company', event.target.value)}
            className={fieldClass(false)}
            placeholder="Northline"
          />
        </div>

        <div>
          <label htmlFor="topic" className="mb-2 block text-[13px] text-obsidian">
            Topic
          </label>
          <select
            id="topic"
            name="topic"
            value={values.topic}
            onChange={(event) => update('topic', event.target.value)}
            className={`${fieldClass(false)} appearance-none pr-8`}
          >
            {contact.topics.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="message" className="mb-2 block text-[13px] text-obsidian">
          Message <span className="text-slate">(required)</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          value={values.message}
          onChange={(event) => update('message', event.target.value)}
          onBlur={() => blur('message')}
          aria-invalid={invalid('message')}
          className={`${fieldClass(invalid('message'))} h-auto rounded-[18px] py-3`}
          placeholder="What are you building, changing, or trying to make impossible to ignore?"
        />
        {invalid('message') && <p className="mt-2 text-[12px] text-[#b4442e]">{errors.message}</p>}
      </div>

      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(event) => setWebsite(event.target.value)}
        />
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-12 items-center rounded-full bg-obsidian px-6 text-[15px] font-medium text-paper transition-transform duration-300 hover:scale-[1.03] disabled:pointer-events-none disabled:opacity-60"
        >
          {pending ? 'Sending' : 'Send message'}
          <span aria-hidden="true" className="ml-3">
            →
          </span>
        </button>
        <p className="text-[13px] text-slate">Goes to {contact.details[0].value}.</p>
      </div>

      {serverError && (
        <p role="alert" className="mt-4 text-[13px] text-[#b4442e]">
          {serverError}
        </p>
      )}
    </form>
  );
}
