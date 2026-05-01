import { Inter, Cormorant_Garamond } from "next/font/google";
import "../styles/globals.css";
import { BRAND } from "@/config/constants";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-serif",
});

export const metadata = {
  title: `${BRAND.name} | ${BRAND.tagline}`,
  description: "Exquisite hand-crafted luxury jewelry for the modern connoisseur.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
