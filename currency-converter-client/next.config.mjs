import svgsConfig from "./svgs.config.js";

/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        imageServerPath:
            process.env.NODE_ENV === "development" ? "http://localhost:1844/images" : "FILL_ME_IN",
        server: process.env.NODE_ENV === "development" ? "http://localhost:5026/api" : "FILL_ME_IN",
    },
    images: {
        domains: ["localhost"],
    },
    webpack: svgsConfig,
};

export default nextConfig;
