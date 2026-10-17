import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Toast from "./components/Toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "UtilityHub — 111+ High-Performance Online Tools",
  description: "The ultimate developer & everyday online toolkit with 111+ free tools. Text, image, developer, math, SEO, social media, productivity, file, security, color, and AI tools — 100% private and client-side.",
  keywords: "online tools, developer tools, utility hub, json formatter, qr code generator, password generator, diff checker, base64, regex tester, free utilities",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <Toast />
      </body>
    </html>
  );
}
