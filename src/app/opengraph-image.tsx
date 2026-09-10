import { ImageResponse } from 'next/og';
import { siteConfig } from '@/config/site';

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/**
 * Open Graph fallback, rendered at build time. It is used for every route
 * that does not define its own image.
 */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#f6f4ef',
          padding: '72px',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            width: '360px',
            height: '630px',
            backgroundColor: '#14322c',
            display: 'flex',
          }}
        />
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div
            style={{
              width: '18px',
              height: '18px',
              borderRadius: '5px',
              backgroundColor: '#14322c',
              display: 'flex',
            }}
          />
          <div style={{ fontSize: '34px', color: '#141412', letterSpacing: '-1.5px' }}>
            {siteConfig.name}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '720px',
          }}
        >
          <div
            style={{
              fontSize: '68px',
              lineHeight: 1.05,
              color: '#141412',
              letterSpacing: '-3px',
            }}
          >
            Clear context for every decision.
          </div>
          <div style={{ fontSize: '28px', color: '#5b594f', marginTop: '24px' }}>
            {siteConfig.tagline}
          </div>
        </div>

        <div style={{ fontSize: '22px', color: '#8a877c', display: 'flex' }}>
          Editorial AI SaaS template for Next.js
        </div>
      </div>
    ),
    size,
  );
}
