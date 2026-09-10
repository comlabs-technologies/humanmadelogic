import { createHmac, timingSafeEqual } from 'node:crypto';

export const ADMIN_COOKIE = 'hml_admin';
const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

export function adminPasswordConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD);
}

function secret() {
  return process.env.ADMIN_SECRET || process.env.ADMIN_PASSWORD || 'hml-dev-only';
}

function sign(payload: string) {
  return createHmac('sha256', secret()).update(payload).digest('hex');
}

export function passwordsMatch(input: string) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  const left = Buffer.from(input);
  const right = Buffer.from(expected);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

export function signAdminToken() {
  const payload = String(Date.now() + WEEK_MS);
  return `${payload}.${sign(payload)}`;
}

export function verifyAdminToken(token: string | undefined | null) {
  if (!token) return false;
  const [payload, signature] = token.split('.');
  if (!payload || !signature) return false;
  const expected = sign(payload);
  const left = Buffer.from(signature);
  const right = Buffer.from(expected);
  if (left.length !== right.length || !timingSafeEqual(left, right)) return false;
  const expires = Number(payload);
  return Number.isFinite(expires) && Date.now() < expires;
}

export function readCookie(header: string | null, name: string) {
  if (!header) return undefined;
  const parts = header.split(';');
  for (const part of parts) {
    const [key, ...rest] = part.trim().split('=');
    if (key === name) return decodeURIComponent(rest.join('='));
  }
  return undefined;
}

export function isAdminRequest(request: Request) {
  return verifyAdminToken(readCookie(request.headers.get('cookie'), ADMIN_COOKIE));
}

export function adminCookieHeader(token: string) {
  return `${ADMIN_COOKIE}=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${Math.floor(WEEK_MS / 1000)}`;
}

export function clearAdminCookieHeader() {
  return `${ADMIN_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`;
}

export function mcpAdminAuthorized(token: string | undefined) {
  const expected = process.env.MCP_ADMIN_TOKEN || process.env.ADMIN_PASSWORD;
  if (!expected || !token) return false;
  const left = Buffer.from(token);
  const right = Buffer.from(expected);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}
