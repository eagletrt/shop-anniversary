import "./globals.css";
import { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SplashScreenProvider } from "@/components/splash-screen-provider";

// Metadata configuration for the application
export const metadata: Metadata = {
  generator: "Next.js", // Generator of the site
  applicationName: "E-AgleTRT Anniversary Shop", // Name of the application
  referrer: "strict-origin", // Referrer policy
  keywords: [
    // Keywords for SEO
    "E-AgleTRT",
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
    "E-AgleTRT Shop",
  ],
  authors: [
    { name: "Marco Bassi", url: "mailto:marco.bassi-2@eagletrt.it" },
    { name: "Matteo Benini", url: "mailto:matteo.benini@eagletrt.it" },
  ], // Author information
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
  title: "E-AgleTRT Anniversary Shop", // Title of the site
  description: "Web application for managing anniversary shop", // Description of the site
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
        </SplashScreenProvider>
      </body>
    </html>
  );
}
