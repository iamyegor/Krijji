import bundleAnalyzer from "@next/bundle-analyzer";
import svgsConfig from "./svgs.config.js";

const withBundleAnalyzer = bundleAnalyzer({
    enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        imageServerPath:
            process.env.NODE_ENV === "development"
                ? "http://localhost:1844/images"
                : "https://help-desk-tg-bot.ru/images",
        server:
            process.env.NODE_ENV === "development"
                ? "http://localhost:5026/api"
                : "http://currency-converter-backend:8080/api",
        domain: "https://krijji.com/",
        url: "https://krijji.com",
        gaId: "G-FDZFL436SJ",
    },
    images: {
        domains: ["localhost"],
    },
    webpack: svgsConfig,
};

const config = withBundleAnalyzer(nextConfig);

export default config;
