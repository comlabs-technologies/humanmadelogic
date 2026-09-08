'use client';

import React, { useState } from 'react';

const components = ['Button', 'Input', 'Select', 'Toast', 'Dialog'];
const states = ['Default', 'Hover', 'Focus', 'Disabled'];

export function ProductInspector() {
  const [selected, setSelected] = useState('Button');
  const [state, setState] = useState('Default');
  const [showToast, setShowToast] = useState(true);

  return (
    <div className="bg-surface rounded-card border border-line overflow-hidden">
      <div className="grid grid-cols-[140px_1fr] md:grid-cols-[160px_1fr] min-h-[320px]">
        <div className="border-r border-line py-3">
          <p className="font-secondary text-label text-muted px-3 mb-2 tracking-tight">
            Components
          </p>
          <ul>
            {components.map((name) => (
              <li key={name}>
                <button
                  type="button"
                  onClick={() => {
                    setSelected(name);
                    setShowToast(name === 'Button');
                  }}
                  className={`w-full text-left px-3 py-1.5 font-secondary text-body tracking-tight transition-colors duration-200 ${
                    selected === name ? 'bg-canvas text-ink' : 'text-muted hover:text-ink'
                  }`}
                >
                  {name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col">
          <div className="flex-1 p-4 border-b border-line bg-canvas flex items-center justify-center">
            <div className="bg-surface border border-line rounded-small px-5 py-2.5">
              <span className="font-sans text-body tracking-tight text-ink">
                {selected}
              </span>
            </div>
          </div>

          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between gap-4">
              <span className="font-secondary text-label text-muted tracking-tight">Label</span>
              <span className="font-secondary text-label text-ink tracking-tight">{selected}</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="font-secondary text-label text-muted tracking-tight">Radius</span>
              <span className="font-secondary text-label text-ink tracking-tight">16px</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="font-secondary text-label text-muted tracking-tight">State</span>
          <div className="flex flex-wrap justify-end gap-1">
                {states.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setState(item)}
                    className={`px-2 py-1 font-secondary text-label tracking-tight rounded-small border transition-colors duration-200 ${
                      state === item
                        ? 'border-ink text-ink bg-canvas'
                        : 'border-line text-muted hover:text-ink'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {showToast && (
              <div className="flex items-start gap-2 pt-2 border-t border-line">
                <span className="mt-0.5 inline-block w-1.5 h-1.5 rounded-full bg-wine shrink-0" />
                <p className="font-secondary text-label text-muted tracking-tight">
                  Label must be unique in this file.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
