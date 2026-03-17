import Link from "next/link";
import Image from "next/image";
import { COMPANY } from "@/lib/company";

const links = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/videos", label: "Showcase Videos" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/admin", label: "Admin" },
];

export default function Navbar() {
  const phoneRaw = COMPANY.phone.replace(/\s+/g, "");
  const telLink = "tel:" + phoneRaw;

  const whatsappLink = "https://wa.me/" + COMPANY.whatsapp;

  return (
    <header className="sticky top-0 z-50 border-b border-[color:var(--border)] bg-white/85 backdrop-blur-md">
      <div className="container-shell">
        <div className="flex min-h-[76px] items-center justify-between gap-4">

          {/* LOGO */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.svg"
              alt={COMPANY.name}
              width={50}
              height={50}
              className="object-contain"
              priority
            />

            <div className="leading-tight">
              <div className="font-semibold text-sm md:text-base">
                {COMPANY.shortName}
              </div>
              <div className="text-xs text-[color:var(--text-muted)]">
                & Poshomill Center
              </div>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-7">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-700 hover:text-[color:var(--pembe-purple)] transition"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA BUTTONS */}
          <div className="flex items-center gap-2">
            <a
              href={telLink}
              className="hidden sm:inline-flex ui-button ui-button-light text-sm"
            >
              Call Now
            </a>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="ui-button ui-button-dark text-sm"
            >
              Get Quote
            </a>
          </div>
        </div>

        {/* MOBILE NAV */}
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