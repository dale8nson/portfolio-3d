'use client'
import { StoreProvider } from "@/lib/store";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <StoreProvider>
        <body className='fixed'>{children}</body>
      </StoreProvider>
    </html>
  );
}
