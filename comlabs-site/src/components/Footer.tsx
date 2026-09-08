import Link from 'next/link';

const columns = {
  Products: ['Mail', 'Docs', 'Grammarly', 'Go', 'Enterprise'],
  Company: ['About', 'Careers', 'Blog', 'Press', 'Love'],
  Legal: ['Privacy', 'Terms', 'Security', 'DPA'],
  Connect: ['X', 'LinkedIn', 'Instagram', 'TikTok', 'YouTube'],
};

export function Footer() {
  return (
    <footer className="relative bg-footer text-white overflow-hidden">
      <div className="relative z-10 max-w-container mx-auto px-gutter-mobile md:px-gutter-desktop pt-16 md:pt-20 pb-10">
        <div className="grid md:grid-cols-5 gap-10 mb-20">
          <div className="md:col-span-1">
            <p className="font-sans text-[15px] font-semibold tracking-tight mb-4">SUPERHUMAN</p>
            <p className="font-secondary text-body text-white/55 tracking-tight leading-relaxed">
              Builders of Superhuman Platform apps.
            </p>
          </div>
          <div className="md:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-8">
            {Object.entries(columns).map(([title, links]) => (
              <div key={title}>
                <p className="font-secondary text-label text-white/45 tracking-tight mb-4">{title}</p>
                <ul className="space-y-2.5">
                  {links.map((label) => (
                    <li key={label}>
                      <Link
                        href={`#${label.toLowerCase()}`}
                        className="font-secondary text-body text-white/80 hover:text-white tracking-tight"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="footer-watermark px-gutter-mobile md:px-gutter-desktop pb-4 whitespace-nowrap overflow-hidden">
        SUPERHUMAN
      </div>
    </footer>
  );
}
