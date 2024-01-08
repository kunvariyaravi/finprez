import Navbar from "@/components/navbar/Navbar";
import "./globals.css";
import { Lexend } from "next/font/google";
import Footer from "@/components/footer/Footer";
import { ThemeContextProvider } from "@/context/ThemeContext";
import ThemeProvider from "@/providers/ThemeProvider";
import AuthProvider from "@/providers/AuthProvider";
import { SpeedInsights } from "@vercel/speed-insights/next"

const lexend = Lexend({ subsets: ["latin"] });

export const metadata = {
  title: "FinPrez",
  description: "FinPrez provides the latest stock market, IPO, financial and business news. Get personal finance advice, company news and more",
  openGraph: {
    images: '/opengraph-image.jpg',
  }
  
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={lexend.className}>
        <AuthProvider>
          <ThemeContextProvider>
            <ThemeProvider>
              <div className="container">
                <div className="wrapper">
                  <Navbar />
                  {children}
                  <Analytics />
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