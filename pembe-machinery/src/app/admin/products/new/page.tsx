"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { slugify } from "@/lib/slug";
import ProductImageUploader from "@/components/ProductImageUploader";

type Category = {
  id: string;
  name: string;
};

export default function NewProductPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [featured, setFeatured] = useState(false);
  const [inStock, setInStock] = useState(true);
  const [images, setImages] = useState<string[]>([]);
  const [specsText, setSpecsText] = useState('{\n  \n}');

  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("KES");
  const [priceOnRequest, setPriceOnRequest] = useState(false);

  const autoSlug = useMemo(() => slugify(name), [name]);

  useEffect(() => {
    fetch("/api/admin/categories")
      .then((r) => r.json())
      .then((d) => {
        const items = d.results ?? [];
        setCategories(items);
        if (items[0]?.id) setCategoryId(items[0].id);
      });
  }, []);

  useEffect(() => {
    if (!slug) setSlug(autoSlug);
  }, [autoSlug, slug]);

  async function save(e: React.FormEvent) {
    e.preventDefault();

    let specs = null;
    try {
      specs = specsText.trim() ? JSON.parse(specsText) : null;
    } catch {
      alert("Specs JSON is invalid");
      return;
    }

    const res = await fetch("/api/admin/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        slug: slugify(slug),
        summary: summary || null,
        description: description || null,
        categoryId,
        featured,
        inStock,
        images: images.length ? images : null,
        specs,
        price: price ? Number(price) : null,
        currency,
        priceOnRequest,
      }),
    });

    if (!res.ok) {
      alert("Failed to create product");
      return;
    }

    const created = await res.json();
    router.push(`/admin/products/${created.id}`);
  }

  return (
    <main className="max-w-4xl">
      <h1 className="text-2xl font-semibold">New Product</h1>

      <form onSubmit={save} className="mt-6 space-y-4">
        <div className="grid md:grid-cols-2 gap-3">
          <input
            className="ui-input"
            placeholder="Product name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="ui-input"
            placeholder="Slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
          />
        </div>

        <select
          className="ui-input"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <div className="grid md:grid-cols-3 gap-3">
          <input
            className="ui-input"
            placeholder="Price"
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <input
            className="ui-input"
            placeholder="Currency"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          />
          <label className="flex items-center gap-2 rounded-xl border border-gray-300 px-3 py-3 bg-white">
            <input
              type="checkbox"
              checked={priceOnRequest}
              onChange={(e) => setPriceOnRequest(e.target.checked)}
            />
            Price on request
          </label>
        </div>

        <input
          className="ui-input"
          placeholder="Summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />

        <textarea
          className="ui-input min-h-[120px]"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="flex gap-6">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
            />
            Featured
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={inStock}
              onChange={(e) => setInStock(e.target.checked)}
            />
            In stock
          </label>
        </div>

        <div>
          <div className="font-medium mb-2">Product Images</div>
          <ProductImageUploader value={images} onChange={setImages} />
        </div>

        <div>
          <div className="font-medium mb-1">Specs JSON</div>
          <textarea
            className="ui-input min-h-[160px] font-mono text-sm"
            value={specsText}
            onChange={(e) => setSpecsText(e.target.value)}
          />
        </div>

        <button className="ui-button ui-button-dark">
          Create Product
        </button>
      </form>
    </main>
  );
}