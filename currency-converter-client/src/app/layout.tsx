import getLangFromRequest from "@/utils/getLangFromRequest";
import { DM_Sans, Inter, Syne, Unbounded } from "next/font/google";
import localFont from "next/font/local";
import { cookies } from "next/headers";
import React from "react";
import "./globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const nasalizationFont = localFont({
    src: "./fonts/nasalization.otf",
    variable: "--font-nasa",
});

const unboundedFont = Unbounded({
    subsets: ["cyrillic"],
    variable: "--font-unbounded",
    weight: ["400", "500", "600", "700"],
});

const syneFont = Syne({
    subsets: ["latin"],
    variable: "--font-syne",
    weight: ["400", "500", "600", "700"],
});

const interFont = Inter({
    subsets: ["cyrillic"],
    variable: "--font-inter",
    weight: ["400", "500", "600", "700"],
});

const dmSansFont = DM_Sans({
    subsets: ["latin"],
    variable: "--font-dm-sans",
    weight: ["400", "500", "600", "700"],
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const themeCookie = cookies().get("theme");
    const theme = themeCookie?.value ?? "dark";

    const lang = getLangFromRequest();

    return (
        <html
            lang={lang}
            className={`${unboundedFont.variable} ${syneFont.variable} ${interFont.variable} ${dmSansFont.variable} ${nasalizationFont.variable} ${theme === "dark" ? "dark" : "light"}`}
        >
            <GoogleAnalytics />
            <body className={`antialiased`}>{children}</body>
        </html>
    );
}
