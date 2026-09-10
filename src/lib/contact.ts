export type ContactFields = {
  name: string;
  email: string;
  company: string;
  topic: string;
  message: string;
};

export type ContactErrors = Partial<Record<keyof ContactFields, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContact(values: ContactFields): ContactErrors {
  const errors: ContactErrors = {};

  if (!values.name.trim()) {
    errors.name = 'Enter your name.';
  }

  if (!values.email.trim()) {
    errors.email = 'Enter an email address.';
  } else if (!EMAIL.test(values.email.trim())) {
    errors.email = 'That does not look like a valid email address.';
  }

  if (!values.message.trim()) {
    errors.message = 'Tell us a little about the work.';
  } else if (values.message.trim().length < 20) {
    errors.message = 'Please use at least 20 characters so we can help properly.';
  }

  return errors;
}
