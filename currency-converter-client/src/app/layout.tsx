import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import ThemeSelectProcessor from "@/components/ThemeSelectProcessor";

export const metadata: Metadata = {
    title: "My template",
    description: "My template description",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`antialiased`}>
                {children}
                <ThemeSelectProcessor />
            </body>
        </html>
    );
}
