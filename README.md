# ☁️ Angular Core SPA — Cloud Engineer Portfolio

**A production portfolio site built with Angular 19, SSR, and build-time prerendering.**

[![Live Demo](https://img.shields.io/badge/Live_Demo-ongunakaycom.github.io-blue)](https://ongunakaycom.github.io/Angular-Core-SPA/)
[![Angular](https://img.shields.io/badge/Angular-19-DD0031?logo=angular&logoColor=white)](https://angular.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Deploy](https://img.shields.io/badge/Deploy-GitHub_Pages-222?logo=githubactions&logoColor=white)](https://github.com/ongunakaycom/Angular-Core-SPA/actions)
[![License](https://img.shields.io/badge/License-MIT-yellow)](./LICENSE)

</div>

---

## 🎯 Executive Summary

A real-world demonstration of modern Angular engineering pushed to its practical limits. The goal: ship a crawlable, fast, statically-hosted Angular app that behaves like a server-rendered site — **without paying for a server.**

**Key Achievements:**
- 🏗 **Angular 19** standalone components + route-level lazy loading.
- ⚡ **SSR + build-time prerendering** for full-content HTML.
- 🎨 **Tailwind CSS v4** with custom dark theme (`@theme`).
- 🚀 **Zero-cost CI/CD** — GitHub Actions → GitHub Pages.
- 🔍 **Structured SEO** — JSON-LD, sitemap, per-route metadata.

---

## 🏗 Architecture

```text
┌────────────────────────────────────────────────────────┐
│                     Angular 19 App                     │
│              (standalone + lazy routes)                │
└──────────────────────────┬─────────────────────────────┘
                           │
            ┌──────────────┴──────────────┐
            │                             │
     ┌──────▼──────┐               ┌──────▼──────┐
     │   Browser   │               │  Server     │
     │   bundle    │               │  (SSR)      │
     └──────┬──────┘               └──────┬──────┘
            │                             │
            └──────────────┬──────────────┘
                           │
                ┌──────────▼──────────┐
                │   prerender routes  │
                │ / /about /cv /ai-llm│
                └──────────┬──────────┘
                           │
                ┌──────────▼──────────┐
                │  dist/*/browser/    │
                │  static HTML + JS   │
                └──────────┬──────────┘
                           │
                ┌──────────▼──────────┐
                │    GitHub Pages     │
                │    (static host)    │
                └─────────────────────┘
```

**Engineering Decision:** GitHub Pages cannot run a Node server. Runtime SSR is replaced with **build-time prerendering**. Every route renders to static HTML at build time — identical SEO outcome, zero runtime cost, zero infra.

---

## ⚙️ Tech Stack

| Layer | Technology | Rationale |
|-------|------------|-----------|
| **Framework** | Angular 19 | Modern, scalable, standalone components. |
| **Rendering** | SSR + Prerender | SEO benefits without server costs. |
| **Styling** | Tailwind CSS v4 | Utility-first, fast UI development. |
| **Routing** | Angular Router | Route-level metadata and lazy loading. |
| **SEO** | JSON-LD, sitemap.xml | Maximized crawlability. |
| **Deployment** | GitHub Pages | Zero-cost, globally distributed static hosting. |

---

## 🧠 Engineering Highlights

### 1. Prerender instead of Runtime SSR
GitHub Pages is static. We use `RenderMode.Prerender` so every route ships as real HTML. Google sees full content without executing JS.

### 2. Route-Level Metadata
Each route carries its own `title` and `data.description`. Canonical, OG, and JSON-LD are declared once in `index.html`.

### 3. Lazy Loading Per Page
Each page is loaded via `loadComponent`. Build output shows one chunk per route (`home-component`, `about-component`, etc.) — initial bundle stays small.

### 4. Stable Base URL
Served from `/Angular-Core-SPA/`. Setting `baseHref` plus a hash-URL shim keeps deep links resolving correctly.

### 5. Verified Deploys
GitHub Actions uses official Pages actions with a **Verify prerendered output** step that fails the build if any route is missing.

---

## 🚀 Local Development

```bash
npm install
npm start          # ng serve → http://localhost:4200
```

## 📦 Build & Deploy

```bash
npm run build      # produces dist/angular-core-spa/browser/ with prerendered routes
```

Deployment is automatic: push to `main` triggers the GitHub Actions workflow.

---

## 👤 Author

<div align="center">

**Ongun Akay** — Cloud Engineer
*Google Cloud · AI/LLM · GKE & Cloud Run*

[![Website](https://img.shields.io/badge/Website-ongunakay.com-000000?style=flat-square&logo=google-chrome)](https://ongunakay.com)
[![GitHub](https://img.shields.io/badge/GitHub-ongunakaycom-181717?style=flat-square&logo=github)](https://github.com/ongunakaycom)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-ongunakay-0A66C2?style=flat-square&logo=linkedin)](https://linkedin.com/in/ongunakay)
[![Email](https://img.shields.io/badge/Email-info@ongunakay.com-EA4335?style=flat-square&logo=gmail)](mailto:info@ongunakay.com)

</div>

---

## 📄 License

MIT — see [LICENSE](./LICENSE).