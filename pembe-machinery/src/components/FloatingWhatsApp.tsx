export default function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/254721772520?text=Hello%20Pembe%20Machinery,%20I%20would%20like%20a%20quote."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-black text-white px-4 py-3 shadow-lg hover:opacity-90"
    >
      <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
      <span className="text-sm font-medium">WhatsApp</span>
    </a>
  );
}