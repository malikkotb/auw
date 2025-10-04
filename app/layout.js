import "./globals.css";
import Header from "@/components/Header/Header";

// Grid overlay styles
const gridStyles = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: "grid",
  gridTemplateColumns: "repeat(12, 1fr)",
  gap: "14px",
  padding: "0 14px",
  pointerEvents: "none",
  zIndex: 9999,
};

const columnStyles = {
  backgroundColor: "rgba(255, 0, 0, 0.1)",
  height: "100%",
};

export const metadata = {
  title: "A Unified Whole",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      {/* <Header /> */}
      <body className={`antialiased`}>
        <div style={gridStyles}>
          {Array(12)
            .fill()
            .map((_, i) => (
              <div key={i} style={columnStyles} />
            ))}
        </div>
        {children}
      </body>
    </html>
  );
}
