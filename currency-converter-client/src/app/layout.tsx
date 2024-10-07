import getLangFromRequest from "@/utils/getLangFromRequest";
import type { Metadata } from "next";
import { DM_Sans, Inter, Syne, Unbounded } from "next/font/google";
import { cookies } from "next/headers";
import React from "react";
import "./globals.css";

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

export const metadata: Metadata = {
    title: "Currency Converter",
    description: "Effortlessly convert fiat and crypto currencies with our fast and accurate tool.",
};

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
            className={`${unboundedFont.variable} ${syneFont.variable} ${interFont.variable} ${dmSansFont.variable} ${theme === "dark" ? "dark" : "light"}`}
        >
            <body className={`antialiased`}>{children}</body>
        </html>
    );
}
