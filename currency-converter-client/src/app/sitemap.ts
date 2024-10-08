import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    const siteUrl = process.env.url as string;

    return [
        {
            url: siteUrl,
            lastModified: new Date(),
            changeFrequency: "always",
            priority: 1,
        },
        {
            url: siteUrl + "/en",
            lastModified: new Date(),
            changeFrequency: "always",
            priority: 1,
        },
        {
            url: siteUrl + "/es",
            lastModified: new Date(),
            changeFrequency: "always",
            priority: 1,
        },
        {
            url: siteUrl + "/zh",
            lastModified: new Date(),
            changeFrequency: "always",
            priority: 1,
        },
        {
            url: siteUrl + "/de",
            lastModified: new Date(),
            changeFrequency: "always",
            priority: 1,
        },
        {
            url: siteUrl + "/fr",
            lastModified: new Date(),
            changeFrequency: "always",
            priority: 1,
        },
        {
            url: siteUrl + "/ru",
            lastModified: new Date(),
            changeFrequency: "always",
            priority: 1,
        },
    ];
}
