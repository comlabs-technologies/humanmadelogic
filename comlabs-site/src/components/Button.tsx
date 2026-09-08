'use client';

import React from 'react';
import Link from 'next/link';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'link';
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  size?: 'default' | 'large';
}

export function Button({
  variant = 'primary',
  children,
  href,
  onClick,
  className = '',
  size = 'default',
}: ButtonProps) {
  const baseStyles = `
    inline-flex items-center justify-center gap-2
    font-medium tracking-tight transition-colors duration-200 ease-out
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ink/20
  `;

  const variants = {
    primary: 'bg-ink text-white hover:bg-ink/90 rounded-button',
    secondary: 'bg-transparent text-ink border border-ink/20 hover:border-ink/40 rounded-button',
    link: 'text-ink hover:opacity-70',
  };

  const sizes = {
    default: 'h-11 px-5 text-body',
    large: 'h-12 px-6 text-body',
  };

  const classes = `${baseStyles} ${variants[variant]} ${variant === 'link' ? '' : sizes[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} onClick={onClick}>
      {children}
    </button>
  );
}
