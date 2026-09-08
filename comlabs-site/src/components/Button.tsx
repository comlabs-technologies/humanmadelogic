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
  size = 'default'
}: ButtonProps) {
  const baseStyles = `
    inline-flex items-center justify-center
    font-medium transition-all duration-200 ease-out
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-wine/20
  `;

  const variants = {
    primary: `
      bg-wine text-surface
      hover:bg-wine/90
      active:bg-wine/95
      rounded-button
    `,
    secondary: `
      bg-lilac text-ink
      border border-line
      hover:bg-lilac/80
      active:bg-lilac
      rounded-small
    `,
    link: `
      text-violet
      hover:underline
      underline-offset-4
      decoration-violet/50
    `,
  };

  const sizes = {
    default: 'h-12 px-5 text-body',
    large: 'h-14 px-7 text-body-lg',
  };

  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

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
