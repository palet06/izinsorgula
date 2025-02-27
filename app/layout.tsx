import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/appcomponents/Navbar";
import { Footer } from "@/components/appcomponents/Footer";

const rubikFont = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
});



export const metadata: Metadata = {
  title: "Çalışma ve Sosyal Güvenlik Bakanlığı",
  description: "Çalışma İzni Sorgulama",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <meta name="referrer" content="unsafe-url"/>
      <body
        className={`${rubikFont.className}  antialiased bg-white`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
