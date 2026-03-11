"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Package, PlusSquare, Shapes, LogOut } from "lucide-react";

const navItems = [
  {
    href: "/admin",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/admin/products",
    label: "Products",
    icon: Package,
  },
  {
    href: "/admin/products/new",
    label: "New Product",
    icon: PlusSquare,
  },
  {
    href: "/admin/categories",
    label: "Categories",
    icon: Shapes,
  },
];

function isActive(pathname: string, href: string) {
  if (href === "/admin") return pathname === "/admin";
  return pathname.startsWith(href);
}

export default function AdminShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="grid min-h-screen lg:grid-cols-[260px_1fr]">
        <aside className="border-r border-slate-200 bg-white">
          <div className="sticky top-0 flex h-screen flex-col">
            <div className="border-b border-slate-200 px-6 py-5">
              <Link href="/admin" className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white font-bold shadow-sm">
                  PM
                </div>
                <div>
                  <div className="font-semibold tracking-tight">Pembe Admin</div>
                  <div className="text-xs text-slate-500">Management Panel</div>
                </div>
              </Link>
            </div>

            <nav className="flex-1 px-4 py-5 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(pathname, item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                      active
                        ? "bg-slate-900 text-white shadow-sm"
                        : "text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="border-t border-slate-200 p-4">
              <button
                onClick={logout}
                className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-100 transition"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </aside>

        <div className="min-w-0">
          <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
            <div className="flex items-center justify-between px-4 py-4 md:px-6">
              <div>
                <div className="text-sm uppercase tracking-[0.18em] text-slate-500">
                  Admin Panel
                </div>
                <div className="text-lg font-semibold text-slate-900">
                  Pembe Machinery
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-2">
                <Link
                  href="/"
                  className="inline-flex items-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  View Website
                </Link>
                <Link
                  href="/admin/products/new"
                  className="inline-flex items-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:opacity-90"
                >
                  Add Product
                </Link>
              </div>
            </div>
          </header>

          <div className="px-4 py-6 md:px-6">{children}</div>
        </div>
      </div>
    </div>
  );
}