import type {Metadata} from 'next';
import {Geist, Geist_Mono} from 'next/font/google';
import './globals.css';
import { ThemeProvider } from "next-themes";
// CookiesProvider from react-cookie is not strictly necessary if all cookie logic
// is handled by cookies-next within client components and useEffect.
// If you have other components that might rely on react-cookie's context,
// you might re-add it. For now, let's simplify.
// import { CookiesProvider } from "react-cookie";

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Tap Counter',
  description: 'A simple tap counter app.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <CookiesProvider> // Removed for now, relying on cookies-next in client components
      <html lang="en" suppressHydrationWarning>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    // </CookiesProvider>
  );
}
