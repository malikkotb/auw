import "./globals.css";
import Header from "@/components/Header/Header";
// import { ViewTransitions } from "next-view-transitions";

export const metadata = {
  title: "A Unified Whole",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={`antialiased`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
