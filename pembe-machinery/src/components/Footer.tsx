import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-200 bg-gray-50">
      <div className="container-shell py-12 grid gap-10 md:grid-cols-4">
        <div>
          <div className="font-semibold text-lg tracking-tight">Pembe Machinery</div>
          <p className="mt-4 text-sm text-gray-600 leading-7">
            Quality agricultural and processing machinery, fabrication services,
            and dependable customer support for businesses across Kenya.
          </p>
        </div>

        <div>
          <h3 className="font-semibold">Quick Links</h3>
          <div className="mt-4 space-y-2 text-sm text-gray-600">
            <div><Link href="/">Home</Link></div>
            <div><Link href="/products">Products</Link></div>
            <div><Link href="/services">Services</Link></div>
            <div><Link href="/projects">Projects</Link></div>
            <div><Link href="/contact">Contact</Link></div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold">Categories</h3>
          <div className="mt-4 space-y-2 text-sm text-gray-600">
            <div><Link href="/products?category=posho-mills">Posho Mills</Link></div>
            <div><Link href="/products?category=maize-shellers">Maize Shellers</Link></div>
            <div><Link href="/products?category=chaff-cutters">Chaff Cutters</Link></div>
            <div><Link href="/products?category=mixers">Mixers</Link></div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold">Contact</h3>
          <div className="mt-4 space-y-2 text-sm text-gray-600">
            <div>Phone: 0721 772 520</div>
            <div>WhatsApp: 0721 772 520</div>
            <div>Email: admin@pembemachinery.co.ke</div>
            <div>Nakuru, Kenya</div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200">
        <div className="container-shell py-4 flex flex-col gap-2 sm:flex-row sm:justify-between text-sm text-gray-500">
          <div>© {new Date().getFullYear()} Pembe Machinery. All rights reserved.</div>
          <div>Modern machinery sales and fabrication enquiries.</div>
        </div>
      </div>
    </footer>
  );
}