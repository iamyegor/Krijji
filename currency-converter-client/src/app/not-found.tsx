import React from "react";

export default function NotFound() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-neutral-900 text-white p-6 space-y-5">
            <div className="space-y-3 flex flex-col items-center">
                <h1 className="text-5xl font-bold">404</h1>
                <p className="text-lg font-semibold">The page you are looking for could not be found.</p>
            </div>
            <div className="space-y-3 flex flex-col items-center">
                <p className="text-lg">Please go back home.</p>
                <a
                    href="/"
                    className="inline-block px-6 py-3 text-sm font-medium text-black bg-white rounded-md hover:bg-gray-200 transition-colors"
                >
                    Go back home
                </a>
            </div>
        </div>
    );
}
