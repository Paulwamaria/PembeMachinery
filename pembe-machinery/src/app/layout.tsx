import "./globals.css";

export const metadata = {
  title: "Nakuru Rollermill & Poshomill Center",
  description:
    "Supplying rollermills, poshomills, fabrication and machinery solutions in Kenya.",
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