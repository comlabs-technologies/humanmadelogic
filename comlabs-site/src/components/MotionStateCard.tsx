'use client';

import React, { useEffect, useState } from 'react';

export function MotionStateCard() {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const id = window.setInterval(() => {
      setSaved((value) => !value);
    }, 2400);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="bg-surface rounded-card border border-line w-[220px] p-4">
      <p className="font-secondary text-label text-muted tracking-tight mb-3">
        Document state
      </p>
      <div className="relative h-10 overflow-hidden">
        <div
          className={`absolute inset-0 flex items-center gap-2 transition-all duration-200 ease-out ${
            saved
              ? 'opacity-0 translate-y-1.5 pointer-events-none'
              : 'opacity-100 translate-y-0'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-muted shrink-0" />
          <span className="font-sans text-body tracking-tight text-ink">Unsaved</span>
        </div>
        <div
          className={`absolute inset-0 flex items-center gap-2 transition-all duration-200 ease-out ${
            saved
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 -translate-y-1.5 pointer-events-none'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-wine shrink-0" />
          <span className="font-sans text-body tracking-tight text-ink">Saved</span>
        </div>
      </div>
    </div>
  );
}
