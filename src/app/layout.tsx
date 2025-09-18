import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

import ReactQueryProvider from "@/providers/ReactQueryProvider";

import { Toaster } from "react-hot-toast";

const roboto = Roboto({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Minimal Kings League IT - Home",
  description:
    "Panoramica minima delle squadre e dei giocatori della Kings League Italia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" suppressHydrationWarning>
      <body className={roboto.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster
            position="top-center"
            gutter={12}
            containerStyle={{ margin: "8px" }}
            toastOptions={{
              success: {
                duration: 1000,
              },
              error: {
                duration: 2000,
              },
              style: {
                background: "var(--background)",
                border: "1px solid var(--border)",
                color: "var(--foreground)",
                fontSize: "16px",
                maxWidth: "500px",
              },
            }}
          />
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
