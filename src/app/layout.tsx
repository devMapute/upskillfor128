import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "./components/navigation";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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
        <Providers>

        <header>
          <div className="flex items-center justify-between p-4 bg-foreground text-background">
            <h1 className="text-xl font-bold">WAHOOOO</h1>
            <Navigation />
          </div>
        </header>
        {children}
        <footer>
          <div className="p-4 bg-foreground text-background">
            <p>Footer</p>
          </div>
        </footer>
        </Providers>
      </body>
    </html>
  );
}
