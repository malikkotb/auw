import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

export const metadata = {
  title: "A Unified Whole",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      {/* <Header /> */}
      <body className={`antialiased`}>
        {children}
        <Footer />
      </body>
    </html>
  );
}
