"use client";

import { useState } from "react";

type Props = {
  productId?: number | null;
  productName?: string;
};

export default function ProductInquiryForm({ productId, productName }: Props) {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    company: "",
    message: productName
      ? `Hello, I would like a quote for ${productName}.`
      : "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function updateField(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setResult(null);
    setError(null);

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          productId,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit inquiry.");
      }

      setResult("Inquiry submitted successfully. We will contact you soon.");
      setForm({
        fullName: "",
        phone: "",
        email: "",
        company: "",
        message: productName
          ? `Hello, I would like a quote for ${productName}.`
          : "",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="soft-card p-5">
      <div className="mb-4">
        <p className="section-kicker">Request Formal Quote</p>
        <h3 className="section-title text-xl">Send an Inquiry</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="ui-input w-full"
          type="text"
          name="fullName"
          placeholder="Full Name *"
          value={form.fullName}
          onChange={updateField}
          required
        />

        <input
          className="ui-input w-full"
          type="text"
          name="phone"
          placeholder="Phone Number *"
          value={form.phone}
          onChange={updateField}
          required
        />

        <input
          className="ui-input w-full"
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={updateField}
        />

        <input
          className="ui-input w-full"
          type="text"
          name="company"
          placeholder="Company Name"
          value={form.company}
          onChange={updateField}
        />

        <textarea
          className="ui-input w-full min-h-[140px]"
          name="message"
          placeholder="Your message"
          value={form.message}
          onChange={updateField}
        />

        <button
          type="submit"
          className="ui-button-green w-full disabled:opacity-60"
          disabled={submitting}
        >
          {submitting ? "Submitting..." : "Submit Inquiry"}
        </button>

        {result && (
          <p className="text-sm font-medium text-green-700">{result}</p>
        )}

        {error && (
          <p className="text-sm font-medium text-red-600">{error}</p>
        )}
      </form>
    </div>
  );
}