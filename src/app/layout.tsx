import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HP Studio - Premium Photography",
  description: "Cinematic, luxury photography portfolio.",
  authors: [{ name: "HP Studio" }],
  openGraph: {
    title: "HP Studio",
    description: "Cinematic, luxury photography portfolio.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HP Studio",
    description: "Cinematic, luxury photography portfolio.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700;1,800;1,900&family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
