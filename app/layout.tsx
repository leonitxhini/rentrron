import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Navbar } from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RRON Rent A Car - Premium Car Rental",
  description: "Premium car rental service in Ferizaj, Prishtina Airport, and Skopje Airport. Instant booking via WhatsApp.",
  keywords: "car rental, rent a car, Ferizaj, Prishtina Airport, Skopje Airport",
  icons: {
    icon: '/logo/favicon.ico',
    apple: '/logo/logo.png',
  },
  openGraph: {
    title: "RRON Rent A Car - Premium Car Rental",
    description: "Premium car rental service with instant booking",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <LanguageProvider>
            <Navbar />
            {children}
            <FloatingWhatsApp />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

