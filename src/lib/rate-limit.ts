type Bucket = number[];

const windows = new Map<string, Bucket>();

export function rateLimit(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  const bucket = (windows.get(key) || []).filter((stamp) => now - stamp < windowMs);
  if (bucket.length >= limit) {
    windows.set(key, bucket);
    return false;
  }
  bucket.push(now);
  windows.set(key, bucket);
  return true;
}

export function clientKey(request: Request) {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return request.headers.get('x-real-ip') || 'local';
}
