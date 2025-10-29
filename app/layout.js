import "./globals.css";
import Header from "@/components/Header/Header";
import TransitionLayout from "@/components/TransitionLayout";

export const metadata = {
  title: "A Unified Whole®",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={`antialiased`}>
        <TransitionLayout>
          <Header />
          <div data-transition-content>{children}</div>
        </TransitionLayout>
      </body>
    </html>
  );
}
