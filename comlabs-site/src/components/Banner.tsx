import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function Banner() {
  return (
    <div className="bg-banner text-white">
      <div className="max-w-container mx-auto px-gutter-mobile md:px-gutter-desktop h-10 flex items-center justify-center">
        <Link
          href="#mail"
          className="font-secondary text-label tracking-tight text-white/90 hover:text-white inline-flex items-center gap-1.5"
        >
          Looking for Superhuman Mail? Learn more
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
