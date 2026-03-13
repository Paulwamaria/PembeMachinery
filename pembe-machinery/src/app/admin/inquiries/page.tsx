import Link from "next/link";
import AdminInquiryFilters from "@/components/AdminInquiryFilters";
import { getAdminInquiries, getInquiryStats } from "@/lib/admin-inquiries";

export default async function AdminInquiriesPage({
    searchParams,
}: {
    searchParams: Promise<{
        q?: string;
        status?: string;
    }>;
}) {
    const params = await searchParams;

    const [inquiries, stats] = await Promise.all([
        getAdminInquiries(params),
        getInquiryStats(),
    ]);

    return (
        <div className="space-y-6">
            <div>
                <p className="section-kicker">Admin</p>
                <h1 className="section-title">Inquiry CRM</h1>
                <p className="mt-2 text-slate-600">
                    View, track, and manage incoming machinery and quotation inquiries.
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <div className="soft-card p-5">
                    <p className="text-sm text-slate-500">Total Inquiries</p>
                    <h3 className="mt-2 text-3xl font-bold">{stats.total}</h3>
                </div>

                <div className="soft-card p-5">
                    <p className="text-sm text-slate-500">New</p>
                    <h3 className="mt-2 text-3xl font-bold text-[color:var(--pembe-purple)]">
                        {stats.fresh}
                    </h3>
                </div>

                <div className="soft-card p-5">
                    <p className="text-sm text-slate-500">Contacted</p>
                    <h3 className="mt-2 text-3xl font-bold text-[color:var(--pembe-green)]">
                        {stats.contacted}
                    </h3>
                </div>

                <div className="soft-card p-5">
                    <p className="text-sm text-slate-500">Closed</p>
                    <h3 className="mt-2 text-3xl font-bold text-[color:var(--pembe-magenta)]">
                        {stats.closed}
                    </h3>
                </div>
            </div>

            <AdminInquiryFilters />

            <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500">
                    {inquiries.length} inquir{inquiries.length === 1 ? "y" : "ies"} found
                </p>
            </div>

            <div className="soft-card overflow-x-auto">
                <table className="min-w-full text-sm">
                    <thead>
                        <tr className="border-b text-left">
                            <th className="p-3">Customer</th>
                            <th className="p-3">Product</th>
                            <th className="p-3">Message</th>
                            <th className="p-3">Status</th>
                            <th className="p-3">Date</th>
                            <th className="p-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inquiries.map((item) => (
                            <tr key={item.id} className="border-b align-top">
                                <td className="p-3">
                                    <div className="font-medium text-slate-900">{item.fullName}</div>

                                    <div className="mt-1 text-xs text-slate-500">{item.phone}</div>

                                    {item.email && (
                                        <div className="text-xs text-slate-500">{item.email}</div>
                                    )}

                                    {item.company && (
                                        <div className="text-xs text-slate-500">{item.company}</div>
                                    )}

                                    <div className="mt-3 flex flex-wrap gap-2">
                                        <a
                                            href={`tel:${item.phone}`}
                                            className="ui-button text-xs"
                                        >
                                            Call
                                        </a>

                                        {item.email && (
                                            <a
                                                href={`mailto:${item.email}`}
                                                className="ui-button text-xs"
                                            >
                                                Email
                                            </a>
                                        )}

                                        <a
                                            href={`https://wa.me/${phone}?text=Hello%20${item.fullName},%20regarding%20your%20inquiry%20about%20${item.product?.name}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="ui-button-green text-xs"
                                        >
                                            WhatsApp
                                        </a>
                                    </div>
                                </td>

                                <td className="p-3">
                                    {item.product ? (
                                        <Link
                                            href={`/products/${item.product.slug}`}
                                            target="_blank"
                                            className="font-medium text-[color:var(--pembe-purple)] underline"
                                        >
                                            {item.product.name}
                                        </Link>
                                    ) : (
                                        <span className="text-slate-400">No linked product</span>
                                    )}
                                </td>

                                <td className="p-3">
                                    <div className="max-w-xs whitespace-pre-line text-slate-600">
                                        {item.message || "-"}
                                    </div>
                                </td>

                                <td className="p-3">
                                    <span className="brand-badge">{item.status}</span>
                                </td>

                                <td className="p-3 whitespace-nowrap text-slate-500">
                                    {new Date(item.createdAt).toLocaleString()}
                                </td>

                                <td className="p-3">
                                    <form
                                        action={`/api/admin/inquiries/${item.id}/status`}
                                        method="POST"
                                        className="flex flex-col gap-2"
                                    >
                                        <select
                                            name="status"
                                            defaultValue={item.status}
                                            className="ui-input min-w-[140px]"
                                        >
                                            <option value="new">new</option>
                                            <option value="contacted">contacted</option>
                                            <option value="closed">closed</option>
                                        </select>

                                        <button type="submit" className="ui-button-dark">
                                            Update
                                        </button>
                                    </form>
                                </td>
                            </tr>
                        ))}

                        {inquiries.length === 0 && (
                            <tr>
                                <td colSpan={6} className="p-6 text-center text-slate-500">
                                    No inquiries found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}