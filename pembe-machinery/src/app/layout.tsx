import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://your-domain.com"),
  title: "Pembe Machinery",
  description: "Commercial machinery marketplace and quote platform.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}