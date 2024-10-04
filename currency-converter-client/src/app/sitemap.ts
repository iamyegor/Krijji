import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: "https://currency-converter.com",
            lastModified: new Date(),
            changeFrequency: "always",
            priority: 1,
        },
    ];
}
