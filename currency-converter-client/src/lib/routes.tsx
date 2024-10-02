import RootLayout from "../components/ui/RootLayout.tsx";
import HomePage from "../pages/HomePage/HomePage.tsx";

export const routes = [
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
        ],
    },
];
