export default function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/254721772520?text=Hello%20Pembe%20Machinery,%20I%20would%20like%20a%20quote."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-full border border-green-200 bg-white px-4 py-3 shadow-[0_12px_30px_rgba(0,0,0,0.14)] hover:scale-[1.02] transition"
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#25D366] text-white shadow-sm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          className="h-5 w-5 fill-current"
        >
          <path d="M19.11 17.24c-.27-.14-1.6-.79-1.84-.88-.25-.09-.43-.14-.61.14-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.14-1.16-.43-2.2-1.36-.81-.72-1.36-1.61-1.52-1.88-.16-.27-.02-.42.12-.56.12-.12.27-.32.41-.47.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.47-.07-.14-.61-1.47-.84-2.02-.22-.52-.44-.45-.61-.46h-.52c-.18 0-.47.07-.72.34-.25.27-.95.93-.95 2.27s.97 2.63 1.11 2.81c.14.18 1.91 2.91 4.63 4.08.65.28 1.16.44 1.56.56.66.21 1.26.18 1.73.11.53-.08 1.6-.65 1.83-1.28.23-.63.23-1.17.16-1.28-.07-.11-.25-.18-.52-.32z" />
          <path d="M16.02 3.2c-7.07 0-12.81 5.73-12.81 12.8 0 2.25.59 4.45 1.72 6.38L3 29l6.81-1.78a12.78 12.78 0 0 0 6.21 1.58h.01c7.07 0 12.8-5.74 12.8-12.81 0-3.43-1.34-6.65-3.77-9.08A12.72 12.72 0 0 0 16.02 3.2zm0 23.3h-.01a10.5 10.5 0 0 1-5.34-1.46l-.38-.23-4.04 1.06 1.08-3.94-.25-.41a10.49 10.49 0 0 1-1.62-5.56c0-5.79 4.71-10.5 10.51-10.5 2.8 0 5.43 1.09 7.41 3.07a10.4 10.4 0 0 1 3.08 7.42c0 5.79-4.71 10.5-10.5 10.5z" />
        </svg>
      </div>

      <div className="hidden sm:block leading-tight">
        <div className="text-sm font-semibold text-slate-900">Chat on WhatsApp</div>
        <div className="text-xs text-slate-500">Usually replies quickly</div>
      </div>
    </a>
  );
}