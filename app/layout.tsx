import type React from "react";
import type { Metadata } from "next";
import { Playfair_Display, Open_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans",
});

export const metadata: Metadata = {
  title: "Equipales Caudel - Tradición y Calidad",
  description:
    "Equipales artesanales y pieles de alta calidad. Muebles tradicionales mexicanos hechos a mano en Jalisco con más de 50 años de tradición familiar.",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${playfair.variable} ${openSans.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
