'use client';

import React, { useState } from 'react';
import { AlertCircle, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { contactPage } from '@/config/content';

type Fields = {
  name: string;
  email: string;
  company: string;
  topic: string;
  message: string;
};

type Errors = Partial<Record<keyof Fields, string>>;

const initial: Fields = {
  name: '',
  email: '',
  company: '',
  topic: contactPage.topics[0],
  message: '',
};

function validate(values: Fields): Errors {
  const errors: Errors = {};

  if (!values.name.trim()) {
    errors.name = 'Enter your name.';
  }

  if (!values.email.trim()) {
    errors.email = 'Enter an email address.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) {
    errors.email = 'That does not look like a valid email address.';
  }

  if (!values.message.trim()) {
    errors.message = 'Tell us a little about your project.';
  } else if (values.message.trim().length < 20) {
    errors.message = 'Please use at least 20 characters so we can help properly.';
  }

  return errors;
}

const fieldClass = (invalid: boolean) =>
  [
    'w-full h-11 px-3 rounded-control border bg-surface text-[15px] tracking-tight text-ink',
    'placeholder:text-subtle transition-colors',
    invalid ? 'border-[#b4442e]' : 'border-line hover:border-ink/25',
  ].join(' ');

/**
 * Front-end only. Validation runs in the browser; nothing is transmitted.
 * Replace `handleSubmit` with your own endpoint when you ship.
 */
export function ContactForm() {
  const [values, setValues] = useState<Fields>(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof Fields, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);

  const update = (key: keyof Fields, value: string) => {
    const next = { ...values, [key]: value };
    setValues(next);
    if (touched[key]) {
      setErrors(validate(next));
    }
  };

  const blur = (key: keyof Fields) => {
    setTouched((previous) => ({ ...previous, [key]: true }));
    setErrors(validate(values));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    setTouched({ name: true, email: true, company: true, topic: true, message: true });

    if (Object.keys(nextErrors).length === 0) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div
        role="status"
        className="bg-surface border border-line rounded-scene p-6 lg:p-8 max-w-[560px]"
      >
        <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#e8f0eb] border border-[#cfe0d6]">
          <Check size={16} className="text-signal" aria-hidden="true" />
        </span>
        <h2 className="text-heading-md text-ink mt-4">{contactPage.successTitle}</h2>
        <p className="text-body text-muted mt-2">{contactPage.successBody}</p>
        <div className="mt-6">
          <Button
            variant="secondary"
            onClick={() => {
              setValues(initial);
              setErrors({});
              setTouched({});
              setSubmitted(false);
            }}
          >
            Send another message
          </Button>
        </div>
      </div>
    );
  }

  const invalid = (key: keyof Fields) => Boolean(touched[key] && errors[key]);

  const describedBy = (key: keyof Fields) => (invalid(key) ? `${key}-error` : undefined);

  const ErrorText = ({ id, children }: { id: string; children: React.ReactNode }) => (
    <p id={id} className="flex items-center gap-1.5 text-[12px] text-[#b4442e] mt-1.5">
      <AlertCircle size={12} aria-hidden="true" />
      {children}
    </p>
  );

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="bg-surface border border-line rounded-scene p-6 lg:p-8 max-w-[560px]"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-[13px] font-medium text-ink mb-1.5">
            Name <span className="text-subtle font-normal">(required)</span>
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
            aria-describedby={describedBy('name')}
            className={fieldClass(invalid('name'))}
            placeholder="Alex Mercer"
          />
          {invalid('name') && <ErrorText id="name-error">{errors.name}</ErrorText>}
        </div>

        <div>
          <label htmlFor="email" className="block text-[13px] font-medium text-ink mb-1.5">
            Email <span className="text-subtle font-normal">(required)</span>
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
            aria-describedby={describedBy('email')}
            className={fieldClass(invalid('email'))}
            placeholder="you@company.com"
          />
          {invalid('email') && <ErrorText id="email-error">{errors.email}</ErrorText>}
        </div>

        <div>
          <label htmlFor="company" className="block text-[13px] font-medium text-ink mb-1.5">
            Company <span className="text-subtle font-normal">(optional)</span>
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
          <label htmlFor="topic" className="block text-[13px] font-medium text-ink mb-1.5">
            Topic
          </label>
          <select
            id="topic"
            name="topic"
            value={values.topic}
            onChange={(event) => update('topic', event.target.value)}
            className={`${fieldClass(false)} appearance-none pr-8`}
          >
            {contactPage.topics.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="message" className="block text-[13px] font-medium text-ink mb-1.5">
          Message <span className="text-subtle font-normal">(required)</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={values.message}
          onChange={(event) => update('message', event.target.value)}
          onBlur={() => blur('message')}
          aria-invalid={invalid('message')}
          aria-describedby={describedBy('message')}
          className={`${fieldClass(invalid('message'))} h-auto py-3 resize-y`}
          placeholder="What are you building, and where do you need the template to bend?"
        />
        {invalid('message') && <ErrorText id="message-error">{errors.message}</ErrorText>}
      </div>

      <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-4">
        <Button type="submit" size="large">
          Send message
        </Button>
        <p className="text-[12px] text-subtle">
          Validation only — this demo form does not transmit anything.
        </p>
      </div>
    </form>
  );
}
