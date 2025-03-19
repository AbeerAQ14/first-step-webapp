import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "First Step",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
