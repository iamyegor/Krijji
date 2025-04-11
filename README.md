# Global Currency Converter

[![CI/CD Status](https://github.com/iamyegor/YOUR_REPO_NAME/actions/workflows/YOUR_WORKFLOW.yaml/badge.svg)](https://github.com/iamyegor/YOUR_REPO_NAME/actions/workflows/YOUR_WORKFLOW.yaml)
[![.NET Core](https://img.shields.io/badge/.NET-Core-512BD4?logo=dotnet)](https://dotnet.microsoft.com/)
[![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A full-stack currency and cryptocurrency conversion platform built with ASP.NET Core and React (Next.js), featuring scheduled data updates and deployment via Docker/Kubernetes.

## Key Features

*   Real-time conversion for fiat (via FlateRate) and cryptocurrencies (via CoinGecko).
*   Automated background updates: Fiat rates every 12 hours, Crypto rates every minute (using Quartz.NET).
*   Multi-language support (6 languages).
*   Light/Dark theme switching.
*   Server-Side Rendering (SSR) with Next.js for improved SEO.
*   Client-side calculation logic for cross-currency conversions.

## Tech Stack

*   **Backend:** ASP.NET Core (C#), EF Core, Quartz.NET
*   **Frontend:** React, Next.js, Tailwind CSS
*   **Database:** PostgreSQL
*   **Infrastructure & DevOps:** Docker, Kubernetes, Helm, GitHub Actions (CI/CD)
*   **APIs:** FlateRate, CoinGecko

## Architecture

*   Backend follows Clean Architecture and utilizes Domain-Driven Design (DDD) principles (e.g., Value Objects).
*   Quartz.NET manages scheduled background tasks for data fetching.
*   Applications are containerized using Docker.
*   Deployment targets a Kubernetes cluster managed via Helm charts.
*   CI/CD pipeline automated with GitHub Actions.

## Conclusion

This project demonstrates building a reliable, full-stack application with a focus on scheduled data processing, modern architecture, and automated DevOps workflows.