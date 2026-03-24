import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "../redux/providers";
import ToastProvider from "../component/common/ToastProvider";

import "../styles/globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Todo List App",
  description: "A simple todo list application built with TypeScript, Next.js, Express, and MongoDB.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} >
          <ToastProvider>
            {children}
          </ToastProvider>
        </body>
      </Providers>
    </html>
  );
}
