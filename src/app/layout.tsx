import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";
import { NuqsAdapter } from 'nuqs/adapters/next/app'


const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ethereal Resonance | Ambient Piano",
  description: "Express your musical core through virtual keys",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${inter.variable} h-full antialiased dark`}
      suppressHydrationWarning
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col">
        <NuqsAdapter>
          {children}
        </NuqsAdapter>

        {/* Screen Resolution Blocker for Small Screens */}
        <div className="lg:hidden fixed inset-0 z-[9999] bg-background/90 backdrop-blur-xl flex flex-col items-center justify-center p-8 text-center text-on-surface">
          <span className="material-symbols-outlined text-6xl text-primary mb-6">
            desktop_windows
          </span>
          <h2 className="text-3xl font-headline font-extralight tracking-tighter mb-4">
            Screen Resolution Too Small
          </h2>
          <p className="font-label text-sm uppercase tracking-widest text-on-surface-variant max-w-md leading-relaxed">
            Please use this application on a device with a larger screen resolution for the best experience.
          </p>
        </div>
      </body>
    </html>
  );
}
