import "./globals.css";

export const metadata = {
  title: "Pembe Machinery",
  description: "Industrial machinery and fabrication solutions",
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