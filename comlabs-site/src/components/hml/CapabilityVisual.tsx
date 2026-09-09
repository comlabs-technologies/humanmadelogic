'use client';

import type { CSSProperties } from 'react';
import type { CapabilityVisualKind } from '@/config/agency';

const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)';

const move = (active: boolean, from: string, to: string, delay = 0): CSSProperties => ({
  transform: active ? to : from,
  transition: `transform 620ms ${EASE} ${delay}ms, opacity 420ms ease ${delay}ms`,
});

type Props = { kind: CapabilityVisualKind; active: boolean };

/**
 * A bespoke mark for each capability — not an icon set. Every one is plain SVG
 * driven by CSS transitions, so nothing extra loads and reduced-motion users
 * simply see the resting composition.
 */
export function CapabilityVisual({ kind, active }: Props) {
  const stroke = 'currentColor';

  return (
    <svg
      viewBox="0 0 120 80"
      aria-hidden="true"
      focusable="false"
      className="h-[70px] w-[104px] overflow-visible text-obsidian"
    >
      {kind === 'letterforms' && (
        <g>
          {[0, 1, 2, 3].map((index) => (
            <rect
              key={index}
              x={16 + index * 24}
              y={18}
              width={12}
              height={44}
              rx={6}
              fill={index === 2 ? '#F4BD49' : stroke}
              style={{
                transformOrigin: `${22 + index * 24}px 62px`,
                ...move(
                  active,
                  'scaleY(1)',
                  `scaleY(${[0.55, 1.2, 0.75, 1.05][index]})`,
                  index * 55,
                ),
              }}
            />
          ))}
        </g>
      )}

      {kind === 'system' && (
        <g>
          {[
            { x: 10, y: 10, to: 'translate(24px, 12px)' },
            { x: 84, y: 12, to: 'translate(-24px, 10px)' },
            { x: 12, y: 52, to: 'translate(26px, -12px)' },
            { x: 86, y: 50, to: 'translate(-26px, -10px)' },
          ].map((mark, index) => (
            <rect
              key={index}
              x={mark.x}
              y={mark.y}
              width={20}
              height={20}
              rx={index % 2 ? 10 : 3}
              fill={index === 1 ? '#F4BD49' : stroke}
              style={move(active, 'translate(0, 0)', mark.to, index * 60)}
            />
          ))}
        </g>
      )}

      {kind === 'cursor' && (
        <g>
          <rect x={8} y={10} width={104} height={60} rx={6} fill="none" stroke={stroke} strokeWidth={1.5} opacity={0.35} />
          <rect x={16} y={18} width={40} height={8} rx={4} fill={stroke} opacity={0.75} />
          <rect
            x={16}
            y={34}
            width={88}
            height={28}
            rx={4}
            fill={stroke}
            opacity={0.12}
            style={move(active, 'scaleX(1)', 'scaleX(0.62)', 40)}
          />
          <rect
            x={16}
            y={34}
            width={30}
            height={28}
            rx={4}
            fill="#F4BD49"
            style={move(active, 'translate(0,0)', 'translate(58px, 0)', 90)}
          />
          <path
            d="M0 0 L0 13 L4 9.5 L7 15 L9.5 13.5 L6.5 8.5 L11 8 Z"
            fill={stroke}
            style={move(active, 'translate(34px, 24px)', 'translate(82px, 44px)', 0)}
          />
        </g>
      )}

      {kind === 'contact-sheet' && (
        <g>
          {[0, 1, 2, 3, 4, 5].map((index) => {
            const column = index % 3;
            const row = Math.floor(index / 3);
            return (
              <rect
                key={index}
                x={10 + column * 36}
                y={12 + row * 30}
                width={30}
                height={24}
                rx={3}
                fill={index === 4 ? '#F4BD49' : stroke}
                opacity={index === 4 ? 1 : 0.22 + index * 0.1}
                style={move(active, 'translateY(0)', `translateY(${index % 2 ? 5 : -5}px)`, index * 45)}
              />
            );
          })}
        </g>
      )}

      {kind === 'signal' && (
        <g>
          <polyline
            points="10,58 34,44 58,50 82,24 110,32"
            fill="none"
            stroke={stroke}
            strokeWidth={1.5}
            opacity={0.4}
          />
          {[
            [10, 58],
            [34, 44],
            [58, 50],
            [82, 24],
            [110, 32],
          ].map(([cx, cy], index) => (
            <circle
              key={index}
              cx={cx}
              cy={cy}
              r={index === 3 ? 6 : 4}
              fill={index === 3 ? '#F4BD49' : stroke}
              style={move(active, 'translateY(0)', `translateY(${index % 2 ? 6 : -6}px)`, index * 60)}
            />
          ))}
        </g>
      )}

      {kind === 'modules' && (
        <g>
          <rect
            x={10}
            y={12}
            width={46}
            height={56}
            rx={4}
            fill={stroke}
            opacity={0.16}
            style={move(active, 'scaleY(1)', 'scaleY(0.72)', 0)}
          />
          <rect
            x={64}
            y={12}
            width={46}
            height={24}
            rx={4}
            fill={stroke}
            style={move(active, 'translateY(0)', 'translateY(-4px)', 70)}
          />
          <rect
            x={64}
            y={44}
            width={46}
            height={24}
            rx={4}
            fill="#F4BD49"
            style={move(active, 'translateY(0)', 'translateY(6px)', 130)}
          />
          <rect
            x={18}
            y={22}
            width={30}
            height={6}
            rx={3}
            fill={stroke}
            style={move(active, 'translateY(0)', 'translateY(22px)', 180)}
          />
        </g>
      )}
    </svg>
  );
}
