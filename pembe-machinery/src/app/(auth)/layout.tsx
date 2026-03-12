export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[linear-gradient(to_bottom,#f8f9ff,#eef2f9)] px-4 flex items-center justify-center">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-[rgba(91,44,163,0.14)] blur-3xl animate-pulse" />
        <div className="absolute top-[20%] right-[-60px] h-80 w-80 rounded-full bg-[rgba(45,190,63,0.10)] blur-3xl animate-pulse [animation-delay:700ms]" />
        <div className="absolute bottom-[-80px] left-[18%] h-72 w-72 rounded-full bg-[rgba(194,24,122,0.10)] blur-3xl animate-pulse [animation-delay:1400ms]" />
        <div className="absolute bottom-[10%] right-[12%] h-40 w-40 rounded-full border border-[rgba(91,44,163,0.12)] bg-white/20 backdrop-blur-sm animate-bounce [animation-duration:5s]" />
        <div className="absolute top-[14%] left-[42%] h-20 w-20 rounded-full border border-[rgba(45,190,63,0.18)] bg-white/20 backdrop-blur-sm animate-bounce [animation-duration:6s]" />
      </div>

      <div className="relative z-10 w-full flex items-center justify-center">
        {children}
      </div>
    </main>
  );
}