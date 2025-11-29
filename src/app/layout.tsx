import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  preload: true,
});

export const metadata: Metadata = {
  title: 'NCC Cadet Portal',
  description: 'Secure portal for NCC cadet registration and admin management',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} antialiased bg-ncc-gray text-gray-900 min-h-screen flex flex-col`}
      >
        <header className="bg-ncc-navy text-white flex items-center justify-start py-3 px-6">
           <img src="/ncc-logo.svg" alt="NCC Logo" className="w-10 h-10 md:w-12 md:h-12" />
           <h1 className="text-lg font-semibold text-white ml-2 md:ml-4">NCC Cadet Portal</h1>
         </header>
        <main className="flex-1 px-4 md:px-6">
          {children}
        </main>
        <footer className="bg-ncc-gray text-center py-4 text-sm text-gray-600">
          © 2023 NCC Cadet Portal. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
