import {  Outfit } from "next/font/google";
import "./globals.css";


const outfit = Outfit({ subsets: ["latin"], weight: ['400','500','600', '700'] });

export const metadata = {
  title: "Blog App",
  description: "Blog app for a blogger to post new blog pages",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={outfit.className}>{children}</body>
    </html>
  );
}
