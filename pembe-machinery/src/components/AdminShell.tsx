"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    LayoutDashboard,
    Package,
    PlusSquare,
    Shapes,
    LogOut,
    Video,
    MessageSquare,
} from "lucide-react";

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
    {
        href: "/admin/videos",
        label: "Videos",
        icon: Video,
    },
    {
        label: "Inquiries",
        href: "/admin/inquiries",
        icon:MessageSquare
    }
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
        router.push("/");
        router.refresh();
    }

    return (
        <div className="min-h-screen bg-[linear-gradient(to_bottom,#f8f9ff,#f3f6fb)]">
            <div className="grid min-h-screen lg:grid-cols-[270px_1fr]">
                <aside className="border-r border-[color:var(--border)] bg-white">
                    <div className="sticky top-0 flex h-screen flex-col">
                        <div className="border-b border-[color:var(--border)] px-6 py-5 bg-[linear-gradient(135deg,rgba(91,44,163,0.08),rgba(45,190,63,0.05))]">
                            <Link href="/admin" className="flex items-center gap-3">
                                <img src="/logo.svg" alt="Pembe Admin" className="h-11 w-auto" />
                                <div>
                                    <div className="font-semibold tracking-tight text-[color:var(--pembe-purple)]">
                                        Pembe Admin
                                    </div>
                                    <div className="text-xs text-[color:var(--text-muted)]">
                                        Management Panel
                                    </div>
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
                                        className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${active
                                            ? "text-white shadow-sm"
                                            : "text-slate-700 hover:bg-[color:var(--soft)]"
                                            }`}
                                        style={
                                            active
                                                ? {
                                                    background:
                                                        "linear-gradient(135deg,var(--pembe-purple),var(--pembe-purple-light))",
                                                }
                                                : {}
                                        }
                                    >
                                        <Icon size={18} />
                                        <span>{item.label}</span>
                                    </Link>
                                );
                            })}
                        </nav>

                        <div className="border-t border-[color:var(--border)] p-4">
                            <button
                                onClick={logout}
                                className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 hover:bg-[color:var(--soft)] transition"
                            >
                                <LogOut size={18} />
                                <span>Logout</span>
                            </button>
                        </div>
                    </div>
                </aside>

                <div className="min-w-0">
                    <header className="sticky top-0 z-20 border-b border-[color:var(--border)] bg-white/90 backdrop-blur">
                        <div className="flex items-center justify-between px-4 py-4 md:px-6">
                            <div>
                                <div className="text-sm uppercase tracking-[0.18em] text-[color:var(--text-muted)]">
                                    Admin Panel
                                </div>
                                <div className="text-lg font-semibold text-[color:var(--pembe-purple)]">
                                    Pembe Machinery
                                </div>
                            </div>

                            <div className="hidden sm:flex items-center gap-2">
                                <Link
                                    href="/"
                                    className="inline-flex items-center rounded-xl border border-[color:var(--border)] bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-[color:var(--soft)]"
                                >
                                    View Website
                                </Link>
                                <Link
                                    href="/admin/products/new"
                                    className="ui-button ui-button-dark text-sm"
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