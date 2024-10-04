import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: ["/", "/en"],
            disallow: [],
        },
        sitemap: "https://currency-converter.ru/sitemap.xml",
    };
}
