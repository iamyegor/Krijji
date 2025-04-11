import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: ["/", "/en", "/es", "/zh", "/de", "/fr", "/ru"],
            disallow: [],
        },
        sitemap: `${process.env.url!}/sitemap.xml`,
    };
}
