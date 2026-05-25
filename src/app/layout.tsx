import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Audit Management | AI-enabled Tax Audit Prototype",
  description:
    "Synthetic static prototype demonstrating human-reviewed AI support for a tax audit workflow.",
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

