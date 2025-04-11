import { NextRequest, NextResponse } from "next/server";

const supportedLocales = ["en", "zh", "fr", "es", "de", "ru"];
const defaultLocale = "en";

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    if (pathname === "/") {
        const preferredLanguage = request.cookies.get("preferredLanguage");

        if (preferredLanguage && supportedLocales.includes(preferredLanguage.value)) {
            if (preferredLanguage.value === "en") {
                return NextResponse.next();
            }
            return NextResponse.redirect(new URL(`/${preferredLanguage.value}`, request.url));
        }

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

        if (lang === "en") {
            return NextResponse.next();
        }

        return NextResponse.redirect(new URL(`/${lang}`, request.url));
    }
}

export const config = {
    matcher: ["/"],
};
