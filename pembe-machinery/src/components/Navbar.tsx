import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-[color:var(--border)] bg-white/85 backdrop-blur-md">
      <div className="container-shell">
        <div className="flex min-h-[76px] items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3">
            <img
              src="/logo.svg"
              alt="Pembe Machinery"
              className="h-11 w-auto"
            />

            <div className="hidden sm:block">
              <div className="font-semibold tracking-tight text-[color:var(--pembe-purple)]">
                Pembe Machinery
              </div>
              <div className="text-xs text-[color:var(--text-muted)]">
                Machinery & Fabrication
              </div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-7">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-700 hover:text-[color:var(--pembe-purple)]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="tel:0721772520"
              className="hidden sm:inline-flex ui-button ui-button-light text-sm"
            >
              Call Now
            </a>

            <a
              href="https://wa.me/254721772520"
              target="_blank"
              rel="noopener noreferrer"
              className="ui-button ui-button-dark text-sm"
            >
              Get Quote
            </a>
          </div>
        </div>

        <div className="lg:hidden pb-3">
          <div className="flex gap-2 overflow-x-auto">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="whitespace-nowrap rounded-full border border-[color:var(--border)] bg-white px-3 py-1.5 text-sm text-slate-700"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
