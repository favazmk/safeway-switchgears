import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SmoothScroll from "@/components/motion/SmoothScroll";
import { company } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.safewaytechnical.com"),
  title: {
    default: "Safeway Electric Switchgear Trading LLC | LV Switchgear & Control Panels, UAE",
    template: "%s | Safeway Electric Switchgear",
  },
  description:
    "Abu Dhabi based panel builder and switchgear trader since 1998. MDB, SMDB, MCC, PLC, VFD and ATS panels to IEC 61439, approved by TAQA (ADDC & AADC), DEWA and FEWA.",
  keywords: [
    "switchgear UAE",
    "panel builder Abu Dhabi",
    "LV switchgear",
    "MDB SMDB panels",
    "motor control center",
    "PLC control panel",
    "VFD panel",
    "ATS panel",
    "Musaffah",
  ],
  openGraph: {
    type: "website",
    siteName: company.name,
    title: "Safeway Electric Switchgear — Powering Reliability, Distributing Trust",
    description:
      "LV switchgear & control panel solutions for commercial, industrial and residential projects across the UAE.",
    images: ["/images/og.jpg"],
  },
  icons: { icon: "/icon.png" },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${interTight.variable} antialiased`}>
      <body className="flex min-h-screen flex-col">
        <SmoothScroll />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
