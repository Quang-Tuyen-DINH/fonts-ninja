import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";
import { coerceMode, THEME_COOKIE } from "@/lib/theme";
import { NavBar } from "@/components/NavBar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fonts Library",
  description: "Made by Quang Tuyen DINH",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const mode = coerceMode(cookieStore.get(THEME_COOKIE)?.value ?? null);

  return (
    <html lang="en" data-theme={mode} className={inter.variable}>
      <body className={`${inter.variable}`}>
        <NavBar themeInitial={mode} />
        <div className="container">
          {children}
        </div>
      </body>
    </html>
  );
}
