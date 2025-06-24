import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import Providers from "@/components/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aamir Property Dealer",
  description: "A leading property dealer in Pakistan and Abroad",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} antialiased `}
        suppressHydrationWarning={true}
      >
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <ClerkProvider
              appearance={{ variables: { colorPrimary: "#fe5933" } }}
            >
              {children}
            </ClerkProvider>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
