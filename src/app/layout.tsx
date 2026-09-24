import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";
import ConvexClientProvider from "@/components/CovexClientProvider";
import "@liveblocks/react-ui/styles.css";

import "@liveblocks/react-tiptap/styles.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "syncDocs",
  description: "SyncDocs is a collaborative document workspace built for teams and individuals to create, manage, and edit rich documents in real time. It combines a sleek document editor with team collaboration, template-based creation, secure authentication, and cloud-powered image uploads.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.className}  h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider>
            <ConvexClientProvider>{children}</ConvexClientProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
