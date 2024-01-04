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
  image: "https://firebasestorage.googleapis.com/v0/b/finprez-61922.appspot.com/o/opengraph-image.png?alt=media&token=499ec5ab-598b-4640-9558-8a52486e3673",
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