import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "Passage AI - The AI Admissions Automation",
  description:
    "AI agents handle the workflow, your team approves the outcomes. Transform your admissions process with intelligent automation.",
  keywords: [
    "AI",
    "admissions",
    "education",
    "automation",
    "workflow",
    "students",
  ],
  authors: [{ name: "Passage AI" }],
  openGraph: {
    title: "Passage AI - The AI Admissions Automation",
    description:
      "AI agents handle the workflow, your team approves the outcomes.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link
          rel="icon"
          href="https://cdn.prod.website-files.com/6584d9f09c54f1e2bb8ce41a/65b2963c70cb1850c0eeff27_Favicon%20-%20256%20x%20256%20-%20small%20p-1%20copy%202.png"
          type="image/png"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-background text-foreground min-h-screen">
        {children}
      </body>
    </html>
  );
}
