import "./globals.css";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { getServerUser } from "@/lib/auth";
import AuthProvider from "@/providers/AuthProvider";
import SmoothScroll from "@/components/smoothScroll";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { Geist, Geist_Mono, Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://queueup.site"),
  title: {
    default: "QueueUp - Ultimate Social Media Post Scheduler",
    template: "%s | QueueUp",
  },
  description:
    "QueueUp is the all-in-one platform to plan, schedule, and automate your social media posts across LinkedIn, Twitter, Facebook, and more. Boost your online presence effortlessly.",
  keywords: [
    "social media scheduler",
    "post automation",
    "linkedin scheduler",
    "twitter scheduler",
    "facebook scheduler",
    "social media management",
    "social media planner",
    "content scheduling",
    "auto post",
    "QueueUp",
  ],
  authors: [{ name: "Kunal Bhalerao", url: "https://queueup.site" }],
  creator: "Kunal Bhalerao",
  publisher: "QueueUp",

  // Open Graph
  openGraph: {
    title: "QueueUp - Plan and Automate Your Social Media",
    description:
      "Schedule your posts effortlessly across all major social media platforms. Save time and grow your audience with QueueUp.",
    url: "https://queueup.site",
    siteName: "QueueUp",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "QueueUp Dashboard Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // Twitter
  twitter: {
    card: "summary_large_image",
    title: "QueueUp - Social Media Post Scheduler",
    description:
      "Plan, schedule, and automate your social media posts from one powerful dashboard.",
    creator: "@KUNAL_BHALERAO_",
    images: ["/twitter-image.png"],
  },

  // Robots
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

  // Icons
  icons: {
    icon: "/icon.png",
    shortcut: "/shortcut-icon.png",
    apple: "/apple-icon.png",
  },

  // Verification
  verification: {
    google: "your-google-verification-code", // Replace with your Google Search Console code when ready
  },

  // Alternates
  alternates: {
    canonical: "https://queueup.site",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let user = null;
  let serverReachable = false;

  try {
    user = await getServerUser();
    serverReachable = true;
  } catch {
    serverReachable = false;
  }

  return (
    <html
      lang="en"
      className={cn("font-sans", inter.variable)}
      suppressHydrationWarning
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider user={user} serverReachable={serverReachable}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <SmoothScroll>
              <TooltipProvider>{children}</TooltipProvider>
            </SmoothScroll>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
