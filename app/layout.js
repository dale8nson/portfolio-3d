import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Dale Tristan Hutchinson",
  description: "Frontend Developer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className=''>{children}</body>
    </html>
  );
}
