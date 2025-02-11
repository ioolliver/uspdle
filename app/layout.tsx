import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "USPDle",
  description: "Adivinhe o local da USP baseado em uma imagem.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
