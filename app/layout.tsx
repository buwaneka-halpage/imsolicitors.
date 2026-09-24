import type { Metadata } from "next";
import { Inter, Marcellus } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-inter",
  display: "swap",
});

const marcellus = Marcellus({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-marcellus",
  display: "swap",
});

export const metadata: Metadata = {
  title: "IM Solicitors — Criminal Defence, Civil Liberties & Public Law, London",
  description:
    "Boutique London law firm specialising in criminal defence, civil liberties and public law. 24/7 police station representation.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${marcellus.variable}`} style={{ scrollBehavior: "smooth" }}>
      <body>{children}</body>
    </html>
  );
}
