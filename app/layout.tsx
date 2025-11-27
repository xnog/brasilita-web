import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AuthProvider } from "@/components/providers/session-provider";
import { MixpanelProvider } from "@/components/providers/mixpanel-provider";
import { PageTracker } from "@/components/analytics/page-tracker";
import { UserTracker } from "@/components/analytics/user-tracker";
import { Toaster } from "sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL || 'https://brasilita.com'),
  title: "Brasilità - Seu imóvel na Itália",
  description: "Assessoria completa para brasileiros que desejam investir no mercado imobiliário italiano",
  openGraph: {
    title: "Brasilità - Seu imóvel na Itália",
    description: "Assessoria completa para brasileiros que desejam investir no mercado imobiliário italiano",
    siteName: "Brasilità",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Brasilità - Seu imóvel na Itália"
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Brasilità - Seu imóvel na Itália",
    description: "Assessoria completa para brasileiros que desejam investir no mercado imobiliário italiano",
    images: ["/logo.png"]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MixpanelProvider>
          <AuthProvider>
            <PageTracker />
            <UserTracker />
            {children}
            <Toaster position="top-right" richColors />
          </AuthProvider>
        </MixpanelProvider>
      </body>
    </html>
  );
}
