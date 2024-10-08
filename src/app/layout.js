import { Amiri } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const amiri = Amiri({
  weight: ["400", "700"],
  subsets: ["arabic"]
});

export const metadata = {
  title: "QuranKom | موقع القران الكريم",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (

    <html lang="ar" dir="rtl">
      <body className={amiri.className}>
        <ThemeProvider attribute="class">
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>

  );
}
