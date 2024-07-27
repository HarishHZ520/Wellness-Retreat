import type { Metadata } from "next";
import { Inter, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import AppWrapper from "./AppWrapper";

const inter = Inter({ subsets: ["latin"] });
const source_code = Source_Sans_3({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wellness Retreats",
  description: "Rejuvenate with yoga, meditation, and relaxation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppWrapper className={source_code.className}>{children}</AppWrapper>
  );
}
