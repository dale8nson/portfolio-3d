import "./globals.css";


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
