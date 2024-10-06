import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ["DM Sans", "sans-serif"],
                head: ["Syne", "sans-serif"],
                "head-ru": ["Mulish", "sans-serif"],
                "sans-ru": ["Inter", "sans-serif"],
            },
            screens: {
                xs: "420px",
                sm: "640px",
                md: "768px",
                lg: "1024px",
                xl: "1280px",
            },
            colors: {
                bg: "rgba(var(--bg))",
                cbox: "rgba(var(--conversion-box))",
                txt: "rgba(var(--txt-default))",
                "txt-fd": "rgba(var(--txt-faded))",
                prim: "rgba(var(--primary))",
                exch: "rgba(var(--exchange))",
                bord: "rgba(var(--border))",
                "input-bord": "rgba(var(--input-border))",
                popover: "rgba(var(--popover))",
                "command-selected": "rgba(var(--command-selected))",
            },
            opacity: {
                mesh: "var(--mesh-opacity)",
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
        },
        container: {
            center: true,
            padding: "20px",
            screens: {
                sm: "1100px",
                md: "1100px",
                lg: "1100px",
                xl: "1100px",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
};
export default config;
