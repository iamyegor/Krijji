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
    const theme = themeCookie ? themeCookie.value : "dark";

    return (
        <html lang="en" className={theme === "dark" ? "dark" : "light"}>
            <body className={`antialiased`}>{children}</body>
        </html>
    );
}
