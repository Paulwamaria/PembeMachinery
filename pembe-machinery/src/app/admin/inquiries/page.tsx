import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function AdminInquiriesPage() {
  const inquiries = await prisma.inquiry.findMany({
    include: {
      product: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <p className="section-kicker">Admin</p>
        <h1 className="section-title">Inquiries</h1>
      </div>

      <div className="soft-card overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b text-left">
              <th className="p-3">Date</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Email</th>
              <th className="p-3">Product</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map((item) => (
              <tr key={item.id} className="border-b align-top">
                <td className="p-3 whitespace-nowrap">
                  {new Date(item.createdAt).toLocaleString()}
                </td>
                <td className="p-3">
                  <div className="font-medium">{item.fullName}</div>
                  {item.company && (
                    <div className="text-xs text-slate-500">{item.company}</div>
                  )}
                  {item.message && (
                    <div className="mt-2 max-w-xs text-xs text-slate-600">
                      {item.message}
                    </div>
                  )}
                </td>
                <td className="p-3">{item.phone}</td>
                <td className="p-3">{item.email || "-"}</td>
                <td className="p-3">
                  {item.product ? (
                    <Link
                      href={`/products/${item.product.slug}`}
                      className="text-blue-600 underline"
                      target="_blank"
                    >
                      {item.product.name}
                    </Link>
                  ) : (
                    "-"
                  )}
                </td>
                <td className="p-3">
                  <span className="brand-badge">{item.status}</span>
                </td>
                <td className="p-3">
                  <form
                    action={`/api/admin/inquiries/${item.id}/status`}
                    method="POST"
                    className="flex gap-2"
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
                    <button type="submit" className="ui-button">
                      Update
                    </button>
                  </form>
                </td>
              </tr>
            ))}

            {inquiries.length === 0 && (
              <tr>
                <td colSpan={7} className="p-6 text-center text-slate-500">
                  No inquiries yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}