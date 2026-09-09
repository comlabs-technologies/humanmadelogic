import React from 'react';
import Link from 'next/link';

type Variant = 'primary' | 'secondary' | 'ghost' | 'inverse' | 'link';
type Size = 'default' | 'large';

type CommonProps = {
  variant?: Variant;
  size?: Size;
  children: React.ReactNode;
  className?: string;
};

type ButtonProps = CommonProps & {
  href?: string;
  type?: 'button' | 'submit';
  onClick?: () => void;
  disabled?: boolean;
  'aria-label'?: string;
};

const variants: Record<Variant, string> = {
  primary: 'bg-ink text-white hover:bg-ink/88 rounded-control',
  secondary:
    'bg-transparent text-ink border border-line hover:border-ink/35 hover:bg-white/60 rounded-control',
  ghost: 'bg-white text-ink border border-line hover:border-ink/30 rounded-control',
  inverse:
    'bg-transparent text-white border border-white/30 hover:border-white/60 hover:bg-white/10 rounded-control',
  link: 'text-ink underline-offset-4 hover:underline',
};

const sizes: Record<Size, string> = {
  default: 'h-10 px-4 text-[14px]',
  large: 'h-12 px-6 text-[15px]',
};

export function Button({
  variant = 'primary',
  size = 'default',
  children,
  className = '',
  href,
  type = 'button',
  onClick,
  disabled,
  ...rest
}: ButtonProps) {
  const classes = [
    'inline-flex items-center justify-center gap-2 font-medium tracking-tight',
    'transition-colors duration-200 ease-out disabled:opacity-50 disabled:pointer-events-none',
    variants[variant],
    variant === 'link' ? '' : sizes[size],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (href) {
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} disabled={disabled} {...rest}>
      {children}
    </button>
  );
}
