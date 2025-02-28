
import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";


import AppWrapper from "@/components/appcomponents/AppWrapper";



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
    <html lang="tr">
    
      <body className={`${rubikFont.className}  antialiased bg-white`}>
        <AppWrapper>{children}</AppWrapper>
      </body>
    </html>
  );
}
