import { NextRequest, NextResponse } from "next/server";

const supportedLocales = ["en", "cn", "fr", "es", "de", "ru"];
const defaultLocale = "en";

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    if (pathname === "/") {
        const acceptLanguage = request.headers.get("accept-language");
        let lang = defaultLocale;

        if (acceptLanguage) {
            const preferredLocale = acceptLanguage
                .split(",")
                .map((lang) => lang.split(";")[0].trim().substring(0, 2))
                .find((lang) => supportedLocales.includes(lang));

            if (preferredLocale) {
                lang = preferredLocale;
            }
        }

        return NextResponse.redirect(new URL(`/${lang}`, request.url));
    }
}

export const config = {
    matcher: ["/"],
};
