import type { Metadata } from "next";
import "./globals.css";
import "./retro.css";

export const metadata: Metadata = {
  title: "Mylestography — Portrait & Editorial Photography",
  description: "Cinematic portrait, fashion, and event photography by Mylestography.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
