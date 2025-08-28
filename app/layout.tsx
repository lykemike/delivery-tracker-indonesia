import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "TrackID — Track Parcels & Calculate Shipping Rates",
    template: "%s | TrackID",
  },
  description:
    "Track parcels across major couriers (JNE, J&T, SiCepat, AnterAja, SPX) with real-time status, delivery ETAs, and an instant shipping rate calculator.",
  category: "Logistics",
  keywords: [
    "parcel tracking",
    "cek resi",
    "resi",
    "ongkir",
    "shipping rates",
    "courier tracking",
    "JNE",
    "J&T",
    "SiCepat",
    "AnterAja",
    "Shopee Xpress",
    "SPX",
    "Indonesia",
    "delivery ETA",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster position="bottom-right" reverseOrder={false} />
      </body>
    </html>
  );
}
