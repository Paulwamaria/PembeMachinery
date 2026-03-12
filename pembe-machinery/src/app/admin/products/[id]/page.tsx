"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { slugify } from "@/lib/slug";
import ProductImageSorter from "@/components/ProductImageSorter";

type Category = {
  id: string;
  name: string;
};

export default function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const [id, setId] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    (async () => {
      const resolved = await params;
      setId(resolved.id);

      const [catRes, productRes] = await Promise.all([
        fetch("/api/admin/categories"),
        fetch(`/api/admin/products/${resolved.id}`),
      ]);

      const catData = await catRes.json();
      setCategories(catData.results ?? []);

      if (!productRes.ok) {
        setLoading(false);
        return;
      }

      const product = await productRes.json();

      setName(product.name ?? "");
      setSlug(product.slug ?? "");
      setSummary(product.summary ?? "");
      setDescription(product.description ?? "");
      setCategoryId(product.categoryId ?? "");
      setFeatured(!!product.featured);
      setInStock(!!product.inStock);
      setImages(
        Array.isArray(product.images)
          ? product.images.filter(
              (img: unknown): img is string =>
                typeof img === "string" && img.trim().length > 0
            )
          : []
      );
      setSpecsText(product.specs ? JSON.stringify(product.specs, null, 2) : "{\n  \n}");
      setPrice(product.price ? String(product.price) : "");
      setCurrency(product.currency ?? "KES");
      setPriceOnRequest(!!product.priceOnRequest);

      setLoading(false);
    })();
  }, [params]);

  async function save(e: React.FormEvent) {
    e.preventDefault();

    if (!id) {
      alert("Product ID missing");
      return;
    }

    let specs = null;
    try {
      specs = specsText.trim() ? JSON.parse(specsText) : null;
    } catch {
      alert("Specs JSON is invalid");
      return;
    }

    const res = await fetch(`/api/admin/products/${id}`, {
      method: "PATCH",
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
        specs,
        price: price ? Number(price) : null,
        currency,
        priceOnRequest,
      }),
    });

    if (!res.ok) {
      alert("Failed to save product");
      return;
    }

    alert("Saved successfully");
  }

  async function remove() {
    if (!id) {
      alert("Product ID missing");
      return;
    }

    if (!confirm("Delete this product?")) return;

    const res = await fetch(`/api/admin/products/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      alert("Failed to delete");
      return;
    }

    router.push("/admin/products");
  }

  if (loading) {
    return <main className="p-6">Loading...</main>;
  }

  return (
    <main className="max-w-4xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Edit Product</h1>
        <button onClick={remove} className="ui-button ui-button-light">
          Delete
        </button>
      </div>

      <form onSubmit={save} className="mt-6 space-y-4">
        <div className="grid gap-3 md:grid-cols-2">
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
          <option value="">Select category</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <div className="grid gap-3 md:grid-cols-3">
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
          <label className="flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-3 py-3">
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
          <div className="mb-2 font-medium">Product Images</div>
          <ProductImageSorter productId={id} initialImages={images} />
        </div>

        <div>
          <div className="mb-1 font-medium">Specs JSON</div>
          <textarea
            className="ui-input min-h-[160px] font-mono text-sm"
            value={specsText}
            onChange={(e) => setSpecsText(e.target.value)}
          />
        </div>

        <button className="ui-button ui-button-dark">Save Changes</button>
      </form>
    </main>
  );
}