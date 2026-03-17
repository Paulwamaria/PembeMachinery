import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-[color:var(--border)] bg-[color:var(--soft-2)]">
      <div className="container-shell py-12 grid gap-10 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <img src="/logo.svg" alt="Nakuru Rollermill & Poshomill Center" className="h-10 w-auto" />
          </div>
          <p className="mt-4 text-sm leading-7 text-[color:var(--text-muted)]">
            Quality agricultural and processing machinery, fabrication services,
            and dependable customer support for businesses across Kenya.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-[color:var(--pembe-purple)]">Quick Links</h3>
          <div className="mt-4 space-y-2 text-sm text-[color:var(--text-muted)]">
            <div><Link href="/">Home</Link></div>
            <div><Link href="/products">Products</Link></div>
            <div><Link href="/services">Services</Link></div>
            <div><Link href="/projects">Projects</Link></div>
            <div><Link href="/contact">Contact</Link></div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-[color:var(--pembe-purple)]">Categories</h3>
          <div className="mt-4 space-y-2 text-sm text-[color:var(--text-muted)]">
            <div><Link href="/products?category=posho-mills">Posho Mills</Link></div>
            <div><Link href="/products?category=maize-shellers">Maize Shellers</Link></div>
            <div><Link href="/products?category=chaff-cutters">Chaff Cutters</Link></div>
            <div><Link href="/products?category=mixers">Mixers</Link></div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-[color:var(--pembe-purple)]">Contact</h3>
          <div className="mt-4 space-y-2 text-sm text-[color:var(--text-muted)]">
            <div>Phone: 0721 772 520</div>
            <div>WhatsApp: 0721 772 520</div>
            <div>Email: admin@pembemachinery.co.ke</div>
            <div>Nakuru, Kenya</div>
          </div>
        </div>
      </div>

      <div className="border-t border-[color:var(--border)]">
        <div className="container-shell py-4 flex flex-col gap-2 sm:flex-row sm:justify-between text-sm text-[color:var(--text-muted)]">
          <div>© {new Date().getFullYear()} Nakuru Rollermill & Poshomill Center. All rights reserved.</div>
          <div>Modern machinery sales and fabrication enquiries.</div>
        </div>
      </div>
    </footer>
  );
}
