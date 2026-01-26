import type { Metadata } from "next";
import "../globals.css";

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
