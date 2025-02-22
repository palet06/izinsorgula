import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/appcomponents/Navbar";

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
      <body
        className={`${rubikFont.className}  antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
