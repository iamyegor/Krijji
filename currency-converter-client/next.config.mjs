import svgsConfig from "./svgs.config.js";

/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        imageServerPath:
            process.env.NODE_ENV === "development" ? "http://localhost:1844/images" : "https://help-desk-tg-bot.ru/images",
        server: process.env.NODE_ENV === "development" ? "http://localhost:5026/api" : "http://currency-converter-backend:8080/api",
    },
    images: {
        domains: ["localhost"],
    },
    webpack: svgsConfig,
};

export default nextConfig;
