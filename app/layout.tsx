import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://insightpdf-swart.vercel.app";
const siteName = "InsightPDF";
const title = "InsightPDF - Analiza documentos PDF con Inteligencia Artificial";
const description =
  "Sube tus PDFs y obtén resúmenes inteligentes, extracción de insights, conceptos clave y un chat contextual con IA. Gratis, sin registro.";
const keywords = [
  "analizar PDF con IA",
  "resumen PDF inteligente",
  "extractor de texto PDF",
  "chat con documentos PDF",
  "inteligencia artificial documentos",
  "InsightPDF",
  "analizador PDF gratis",
  "Google Gemini PDF",
  "lector PDF inteligente",
];

export const metadata: Metadata = {
  title: {
    default: title,
    template: `%s | ${siteName}`,
  },
  description,
  keywords,
  authors: [{ name: "InsightPDF" }],
  creator: "InsightPDF",
  publisher: "InsightPDF",
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: siteUrl,
    siteName,
    title,
    description,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "InsightPDF - Analiza documentos con IA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
  manifest: "/manifest.json",
  verification: {
    google: "sr_GlJH8VdnfCFSpKCIgMxLEE7qMBb-sPJPylKLJp2E",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "InsightPDF",
              url: siteUrl,
              description,
              applicationCategory: "UtilityApplication",
              operatingSystem: "All",
              browserRequirements: "JavaScript",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              author: {
                "@type": "Organization",
                name: "InsightPDF",
              },
            }),
          }}
        />
        <link rel="canonical" href={siteUrl} />
      </head>
      <body className="min-h-full flex flex-col bg-white">{children}</body>
    </html>
  );
}
