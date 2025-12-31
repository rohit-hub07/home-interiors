import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "../Components/Navbar";
import { AuthProvider } from "../context/userContext";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Footer from "../Components/Footer";
import { PostProvider } from "../context/postContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Colours Kitchen",
  description: "Colours Kitchen",
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
      <AuthProvider>
        <PostProvider>
          <Navbar />
          <Toaster position="top-center" />
          {children}
          <Footer />
        </PostProvider>
      </AuthProvider>  
      </body>
    </html>
  );
}
