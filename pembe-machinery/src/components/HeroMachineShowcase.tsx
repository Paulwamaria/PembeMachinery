"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type HeroItem = {
  id: string;
  slug: string;
  image: string;
  name: string;
};

export default function HeroMachineShowcase({
  items,
}: {
  items: HeroItem[];
}) {
  const safeItems = useMemo(() => items.filter((item) => item.image), [items]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (safeItems.length <= 1) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % safeItems.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [safeItems.length]);

  if (!safeItems.length) return null;

  const main = safeItems[activeIndex];
  const others = safeItems.filter((_, index) => index !== activeIndex).slice(0, 3);

  return (
    <div className="relative rounded-[2rem] border border-slate-200/70 bg-gradient-to-br from-purple-50 via-white to-green-50 p-4 shadow-sm">
      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <Link
          href={`/products/${main.slug}`}
          className="group overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
          <div className="aspect-[4/4] overflow-hidden bg-slate-100">
            <img
              src={main.image}
              alt={main.name}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
          </div>

          <div className="p-4">
            <div className="text-xs uppercase tracking-[0.2em] text-[color:var(--pembe-purple)]">
              Featured Machine
            </div>
            <h3 className="mt-2 text-lg font-semibold text-slate-900">
              {main.name}
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              Browse this machine and request a quote instantly.
            </p>
          </div>
        </Link>

        <div className="grid gap-4">
          {others.map((item, index) => (
            <Link
              key={`${item.id}-${index}`}
              href={`/products/${item.slug}`}
              className="group overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="aspect-[4/3] overflow-hidden bg-slate-100">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {safeItems.length > 1 && (
        <div className="mt-5 flex items-center justify-center gap-2">
          {safeItems.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`h-2.5 rounded-full transition-all ${
                index === activeIndex
                  ? "w-8 bg-[color:var(--pembe-purple)]"
                  : "w-2.5 bg-slate-300 hover:bg-slate-400"
              }`}
              aria-label={`Show ${item.name}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}