import type { Metadata } from "next";
import { Toaster } from 'sonner';

import { Lato } from "next/font/google";
import "@/styles/globals.css";

const lato = Lato({ subsets: ["latin"], weight: ["100", "300", "400", "700", "900"] });

export const metadata: Metadata = {
  title: "Slackzzz",
  description: "Slack Clone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Toaster />
      <body className={lato.className}>{children}</body>
    </html>
  );
}

