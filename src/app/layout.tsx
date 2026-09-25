import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";
import ConvexClientProvider from "@/components/CovexClientProvider";
import "@liveblocks/react-ui/styles.css";

import "@liveblocks/react-tiptap/styles.css";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "syncDocs",
  description:
    "SyncDocs is a collaborative document workspace built for teams and individuals to create, manage, and edit rich documents in real time. It combines a sleek document editor with team collaboration, template-based creation, secure authentication, and cloud-powered image uploads.",
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.className}  h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <AuthProvider>
            <ConvexClientProvider>
              
              
              {children}
              
              
              
              
              
              </ConvexClientProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
