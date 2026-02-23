"use client";

type Props = {
  productName: string;
  productUrl?: string;
};

export default function WhatsAppQuoteButton({ productName, productUrl }: Props) {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "254721772520";

  const message = [
    "Hi Pembe Machinery,",
    `I'm interested in: ${productName}`,
    "Qty: 1",
    "Location: ",
    "Please share price and delivery details.",
    productUrl ? `Link: ${productUrl}` : "",
  ].filter(Boolean).join("\n");

  const href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center rounded-xl px-4 py-2 font-medium border hover:opacity-90"
    >
      Request Quote on WhatsApp
    </a>
  );
}