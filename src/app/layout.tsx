import type { Metadata } from "next";
import { Tajawal } from "next/font/google";
import "../styles/globals.css";
import TopBar from "@/components/layout/topBar";

const tajawal = Tajawal({
  weight: ["400", "500", "700", "800"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "First Step",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${tajawal.className} antialiased`}>
        <TopBar />
        {children}
      </body>
    </html>
  );
}
