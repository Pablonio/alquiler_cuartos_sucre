import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthContext from "./context/AuthContext";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Alquiler Sucre",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script src="https://www.google.com/recaptcha/api.js?render=6LdYhqcpAAAAAID55_bHoE0R8pTRHF1acH2yA4KM"/>
      </head>
      <body className={inter.className}>
        <AuthContext>
          {children}  
        </AuthContext>
      </body>
    </html>
  );
}
