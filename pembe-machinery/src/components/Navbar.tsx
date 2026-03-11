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
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur-md">
      <div className="container-shell">
        <div className="flex min-h-[72px] items-center justify-between gap-4">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white font-bold">
              PM
            </div>

            <div>
              <div className="font-semibold tracking-tight">
                Pembe Machinery
              </div>
              <div className="text-xs text-gray-500">
                Machinery & Fabrication
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-7">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-700 hover:text-black transition"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
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
              className="ui-button ui-button-dark text-sm"
            >
              Get Quote
            </a>

          </div>
        </div>

        {/* Mobile Nav */}
        <div className="lg:hidden pb-3">
          <div className="flex gap-2 overflow-x-auto">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="whitespace-nowrap rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm"
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