import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import AdminDashboard from "@/components/layouts/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { AI } from "./layouts/ai";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Task Tracker",
  description: "Author: Jeremy Munroe",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AdminDashboard>
          <AI>{children}</AI>
        </AdminDashboard>
        <Toaster />
      </body>
    </html>
  );
}
