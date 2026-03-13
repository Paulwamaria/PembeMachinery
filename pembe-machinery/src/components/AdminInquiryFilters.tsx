"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

export default function AdminInquiryFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (!value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  }

  function clearFilters() {
    startTransition(() => {
      router.push(pathname);
    });
  }

  return (
    <div className="soft-card p-4">
      <div className="grid gap-4 md:grid-cols-3">
        <input
          type="text"
          placeholder="Search name, phone, email, product..."
          defaultValue={searchParams.get("q") || ""}
          className="ui-input w-full md:col-span-2"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              updateParam("q", (e.target as HTMLInputElement).value);
            }
          }}
          onBlur={(e) => updateParam("q", e.target.value)}
        />

        <select
          className="ui-input w-full"
          defaultValue={searchParams.get("status") || ""}
          onChange={(e) => updateParam("status", e.target.value)}
        >
          <option value="">All Statuses</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          type="button"
          onClick={clearFilters}
          className="ui-button"
          disabled={isPending}
        >
          {isPending ? "Updating..." : "Clear Filters"}
        </button>
      </div>
    </div>
  );
}