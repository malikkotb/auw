import "./globals.css";
import Header from "@/components/Header/Header";
import PageWrapper from "@/components/PageWrapper";
import { ViewTransitions } from "next-view-transitions";
export const metadata = {
  title: "A Unified Whole",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <ViewTransitions>
      <html lang='en'>
        <body className={`antialiased`}>
          <Header />
          {/* <PageWrapper> */}
          <div className='to-animate'>{children}</div>
          {/* </PageWrapper> */}
        </body>
      </html>
    </ViewTransitions>
  );
}
