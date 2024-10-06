import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import { cookies } from "next/headers";

export const metadata: Metadata = {
    title: "My template",
    description: "My template description",
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
        <html lang={lang} className={theme === "dark" ? "dark" : "light"}>
            <body className={`antialiased`}>{children}</body>
        </html>
    );
}
