import Navbar from "@/components/navbar/Navbar";
import "./globals.css";
import { Lexend } from "next/font/google";
import Footer from "@/components/footer/Footer";
import { ThemeContextProvider } from "@/context/ThemeContext";
import ThemeProvider from "@/providers/ThemeProvider";
import AuthProvider from "@/providers/AuthProvider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Head from "next/head";

const lexend = Lexend({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta property="og:title" content="FinPrez" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.finprez.com/" />
        <meta
          property="og:image"
          content="https://www.finprez.com/opengraph-image.jpg"
        />
        <meta property="og:description" content="FinPrez provides the latest stock market, IPO, financial and business news. Get personal finance advice, company news and more" />
      </head>
      <body className={lexend.className}>
        <AuthProvider>
          <ThemeContextProvider>
            <ThemeProvider>
              <div className="container">
                <div className="wrapper">
                  <Navbar />
                  {children}
                  <SpeedInsights />
                  <Footer />
                </div>
              </div>
            </ThemeProvider>
          </ThemeContextProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
