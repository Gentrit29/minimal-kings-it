import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

import ReactQueryProvider from "@/providers/ReactQueryProvider";

const roboto = Roboto({
  variable: "--font-roboto",
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
    <html lang="it">
      <body
        className={`${roboto.variable} bg-gradient-to-b from-neutral-900 via-yellow-800 to-yellow-900`}
      >
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
