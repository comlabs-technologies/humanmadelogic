import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import type { ContactFields } from './contact';

export type Inquiry = ContactFields & {
  id: string;
  createdAt: string;
  emailed: boolean;
  read: boolean;
  source: 'contact' | 'mcp';
};

const storePath = () =>
  process.env.INQUIRIES_PATH || path.join(process.cwd(), 'data', 'inquiries.json');

let queue: Promise<unknown> = Promise.resolve();

function serial<T>(work: () => Promise<T>): Promise<T> {
  const next = queue.then(work, work);
  queue = next.then(
    () => undefined,
    () => undefined,
  );
  return next;
}

async function readAll(): Promise<Inquiry[]> {
  try {
    const raw = await readFile(storePath(), 'utf8');
    const parsed = JSON.parse(raw) as Inquiry[];
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return [];
    throw error;
  }
}

async function writeAll(items: Inquiry[]) {
  const file = storePath();
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, `${JSON.stringify(items, null, 2)}\n`, 'utf8');
}

export function listInquiries(): Promise<Inquiry[]> {
  return serial(async () => {
    const items = await readAll();
    return [...items].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  });
}

export function saveInquiry(
  fields: ContactFields,
  extras: Pick<Inquiry, 'emailed' | 'source'>,
): Promise<Inquiry> {
  return serial(async () => {
    const items = await readAll();
    const inquiry: Inquiry = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      name: fields.name.trim(),
      email: fields.email.trim(),
      company: fields.company.trim(),
      topic: fields.topic.trim() || 'New project',
      message: fields.message.trim(),
      emailed: extras.emailed,
      read: false,
      source: extras.source,
    };
    items.push(inquiry);
    await writeAll(items);
    return inquiry;
  });
}

export function markInquiryRead(id: string, read = true): Promise<Inquiry | null> {
  return serial(async () => {
    const items = await readAll();
    const inquiry = items.find((item) => item.id === id);
    if (!inquiry) return null;
    inquiry.read = read;
    await writeAll(items);
    return inquiry;
  });
}
