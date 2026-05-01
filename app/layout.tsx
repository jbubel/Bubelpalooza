import type { Metadata } from "next";
import { Anton, Geist_Mono, Work_Sans } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const anton = Anton({
  variable: "--font-anton",
  weight: "400",
  subsets: ["latin"],
});

const siteDescription =
  "Bubelpalooza is Sunday, May 24, 2026 at Bubel Beach Club in Leander, TX, with a crawfish boil, pool party, and live music.";

export const metadata: Metadata = {
  metadataBase: new URL("https://bubelpalooza.com"),
  title: {
    default: "Bubelpalooza",
    template: "%s | Bubelpalooza",
  },
  description: siteDescription,
  applicationName: "Bubelpalooza",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-icon.png", type: "image/png", sizes: "180x180" }],
  },
  openGraph: {
    title: "Bubelpalooza | Sunday, May 24",
    description: siteDescription,
    url: "/",
    siteName: "Bubelpalooza",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Bubelpalooza event poster for Sunday May 24 at Bubel Beach Club in Leander, Texas.",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bubelpalooza | Sunday, May 24",
    description: siteDescription,
    images: ["/opengraph-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${workSans.variable} ${geistMono.variable} ${anton.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
