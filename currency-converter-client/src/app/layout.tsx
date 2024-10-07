import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import { cookies } from "next/headers";
import { Syne, Unbounded, Inter, DM_Sans } from "next/font/google";

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

    const preferredLanguage = cookies().get("preferredLanguage");
    let lang = preferredLanguage?.value ?? "en";

    if (!preferredLanguage) {
        const acceptLanguage = cookies().get("accept-language");

        if (acceptLanguage?.value) {
            lang = acceptLanguage.value;
        }
    }

    return (
        <html
            lang={lang}
            className={`${unboundedFont.variable} ${syneFont.variable} ${interFont.variable} ${dmSansFont.variable} ${theme === "dark" ? "dark" : "light"}`}
        >
            <body className={`antialiased`}>{children}</body>
        </html>
    );
}
