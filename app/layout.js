import "./globals.css";
import Header from "@/components/Header/Header";
import TransitionLayout from "@/components/TransitionLayout";
import localFont from "next/font/local";

const sharpGrotesk = localFont({
  src: "./SharpGrotesk_SemiBold.otf",
});

export const metadata = {
  title: "A Unified Whole®",
  description: "",
  // TODO: add favicon
  // TODO: add thumbnail image for social media
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={`antialiased ${sharpGrotesk.className}`}>
        <TransitionLayout>
          <Header />
          <div data-transition-content>{children}</div>
        </TransitionLayout>
      </body>
    </html>
  );
}
