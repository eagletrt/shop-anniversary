import "./globals.css";
import { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SplashScreenProvider } from "@/components/splash-screen-provider";
import { Toaster } from "@/components/ui/sonner";

// Metadata configuration for the application
export const metadata: Metadata = {
  generator: "Next.js", // Generator of the site
  applicationName: "E-Agle TRT Anniversary Shop", // Name of the application
  referrer: "strict-origin", // Referrer policy
  keywords: [
    // Keywords for SEO
    "E-Agle TRT",
    "Anniversary",
    "Shop",
    "Formula Student",
    "University of Trento",
    "UNITN",
    "Racing Team",
    "Engineering",
    "Motorsport",
    "Automotive",
    "Student Project",
    "Merchandise",
    "E-Agle TRT Shop",
  ],
  formatDetection: {
    email: false, // Disable email detection
    address: false, // Disable address detection
    telephone: false, // Disable telephone detection
  },
  robots: {
    // Robots meta tag configuration
    index: true, // Allow indexing
    follow: true, // Allow following links
    nocache: false, // Disable no-cache
    googleBot: {
      index: true, // Allow Google bot to index
      follow: false, // Disallow Google bot to follow links
      noimageindex: false, // Allow Google bot to index images
      "max-video-preview": -1, // No limit on video preview
      "max-image-preview": "large", // Large image preview
      "max-snippet": 1, // Maximum snippet length
    },
  },
  title: "E-Agle TRT Anniversary Shop", // Title of the site
  description:
    "Esplora lo shop ufficiale di E-Agle TRT per il decimo anniversario! Scopri il merchandising esclusivo e celebra con noi 10 anni di passione e motorsport.", // Description of the site
  openGraph: {
    title: "E-Agle TRT Anniversary Shop",
    description:
      "Esplora lo shop ufficiale di E-Agle TRT per il decimo anniversario! Scopri il merchandising esclusivo e celebra con noi 10 anni di passione e motorsport.",
    type: "website",
    locale: "it_IT",
    siteName: "E-Agle TRT Anniversary Shop",
  },
  icons: {
    // Icons configuration
    icon: [
      { url: "/icons/icon.svg", type: "image/svg+xml", sizes: "any" }, // SVG icon
      { url: "/icons/favicon.ico", type: "image/x-icon", sizes: "32x32" }, // Favicon
    ],
    apple: {
      url: "/icons/apple-touch-icon.png",
      type: "image/png",
      sizes: "180x180",
    }, // Apple touch icon
  },
  manifest: "/icons/manifest.webmanifest", // Web manifest file
  category: "shopping", // Category of the site
};

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const viewport: Viewport = {
  initialScale: 1, // Set the initial scale to 1
  maximumScale: 1, // Disable auto-zoom on mobile Safari
  width: "device-width", // Set the viewport width to the device width
  height: "device-height", // Set the viewport height to the device height
  viewportFit: "cover", // Extend into safe areas (needed for env(safe-area-inset-*))
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="it"
      suppressHydrationWarning
      className={`${inter.variable} scroll-smooth`}
      data-scroll-behavior="smooth"
    >
      <body>
        <SplashScreenProvider>
          <div className="flex min-h-screen flex-col bg-background">
            <Navbar />
            <main className="z-0 mb-4 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster />
        </SplashScreenProvider>
      </body>
    </html>
  );
}
