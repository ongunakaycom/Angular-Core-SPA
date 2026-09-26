# Angular Core SPA — Cloud Engineer Portfolio

A production portfolio site built with **Angular 19**, **SSR**, and **build-time prerendering** — engineered for SEO, zero-cost hosting, and cloud-native frontend architecture.

**Live:** https://ongunakaycom.github.io/Angular-Core-SPA/

---

## 🎯 Why this repo exists

A real-world demonstration of modern Angular engineering pushed to its practical limits:

- **Angular 19** standalone components + route-level lazy loading
- **SSR + build-time prerendering** for full-content HTML without a Node server
- **Tailwind CSS v4** with a custom dark theme via `@theme`
- **Zero-cost CI/CD** — GitHub Actions → GitHub Pages via the official Pages action
- **Structured SEO** — JSON-LD, sitemap, robots, per-route metadata, SPA fallback

The goal: ship a crawlable, fast, statically-hosted Angular app that behaves like a server-rendered site — without paying for a server.

---

## 🏗 Architecture

```
                        ┌───────────────────────────────┐
                        │        Angular 19 App         │
                        │   (standalone + lazy routes)  │
                        └───────────────┬───────────────┘
                                        │
                        ┌───────────────┴───────────────┐
                        │                               │
                 ┌──────▼──────┐                ┌───────▼────────┐
                 │   Browser   │                │  Server (SSR)  │
                 │   bundle    │                │  main.server   │
                 └──────┬──────┘                └───────┬────────┘
                        │                               │
                        └──────────────┬────────────────┘
                                       │
                            ┌──────────▼──────────┐
                            │   prerender routes  │
                            │ / /about /cv /ai-llm│
                            └──────────┬──────────┘
                                       │
                             ┌─────────▼──────────┐
                             │  dist/*/browser/   │
                             │  static HTML + JS  │
                             └─────────┬──────────┘
                                       │
                             ┌─────────▼──────────┐
                             │   GitHub Pages     │
                             │   (static host)    │
                             └────────────────────┘
```

**Key decision:** GitHub Pages cannot run a Node server, so runtime SSR is replaced with **build-time prerendering**. Every route is rendered to static HTML at build time — identical SEO outcome, zero runtime cost, zero infra.

---

## ⚙️ Tech stack

| Layer | Technology |
|---|---|
| Framework | Angular 19 (standalone components, lazy routes) |
| Rendering | SSR entry + build-time prerender (`app.routes.server.ts`) |
| Styling | Tailwind CSS v4 + custom theme (`@theme`) |
| Routing | Angular Router with route-level `title` + `data` |
| SEO | JSON-LD `Person` schema, sitemap.xml, robots.txt, per-route meta |
| Build | Angular CLI 19 application builder |
| Deployment | GitHub Actions → GitHub Pages (`upload-pages-artifact` + `deploy-pages`) |

---

## 🗂 Project structure

```
Angular-Core-SPA/
├── .github/workflows/deploy.yml   # GitHub Actions → Pages
├── public/
│   ├── 404.html                   # SPA fallback + hash redirects
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── app/
│   │   ├── pages/
│   │   │   ├── home/              # Cloud Engineer hero + projects
│   │   │   ├── about/
│   │   │   ├── cv/
│   │   │   └── ai-llm/            # AI & LLM work
│   │   ├── app.component.*        # Header + footer shell
│   │   ├── app.config.ts
│   │   ├── app.config.server.ts
│   │   ├── app.routes.ts          # 4 lazy routes
│   │   └── app.routes.server.ts   # Prerender rules
│   ├── index.html                 # JSON-LD + meta + redirect shim
│   ├── main.ts
│   ├── main.server.ts
│   ├── server.ts
│   └── styles.css                 # Tailwind + @theme
├── angular.json                   # baseHref + prerender config
├── tsconfig.json
└── package.json
```

---

## 🧠 Engineering highlights

### 1. Prerender instead of runtime SSR
GitHub Pages is static. Angular 19 SSR normally runs on a Node server. We use the **build-time prerender** path (`app.routes.server.ts` with `RenderMode.Prerender`) so every route ships as real HTML. Result: Google sees full content without executing JS, and hosting cost stays at zero.

### 2. Route-level metadata
Each route carries its own `title` and `data.description`. No global meta tag duplication, no runtime meta service needed. Canonical, OG, and JSON-LD are declared once in `index.html`.

### 3. Lazy loading per page
Each page is a standalone component loaded via `loadComponent`. Build output shows one chunk per route (`home-component`, `about-component`, `cv-component`, `ai-llm-component`) — the initial bundle stays small and each route loads independently.

### 4. Stable base URL
The site is served from `ongunakaycom.github.io/Angular-Core-SPA/`. Setting `baseHref: "/Angular-Core-SPA/"` plus a hash-URL shim in `index.html` keeps deep links and `#/about`-style URLs resolving correctly on the static host.

### 5. Verified deploys
GitHub Actions uses the official Pages actions (`upload-pages-artifact` + `deploy-pages`), with a **Verify prerendered output** step that fails the build if any prerendered route is missing — preventing broken deploys from reaching production.

---

## 🔍 SEO engineering

- **JSON-LD `Person` schema** in `index.html` — Google reads `jobTitle: "Cloud Engineer"`, `knowsAbout`, and `sameAs` links.
- **Per-route `<title>` and `<meta description>`** declared in `app.routes.ts`.
- **`sitemap.xml`** listing all 4 routes with priorities.
- **`robots.txt`** pointing to the sitemap.
- **`404.html`** SPA fallback that restores the requested URL and routes client-side.
- **Hash URL redirect** (`#/about` → `/about`) to keep deep links working.

---

## 🚀 Local development

```bash
npm install
npm start          # ng serve → http://localhost:4200
```

## 📦 Build & deploy

```bash
npm run build      # produces dist/angular-core-spa/browser/ with prerendered routes
```

Deployment is automatic: push to `main` triggers the GitHub Actions workflow.

---

## 👤 Author

**Ongun Akay** — Cloud Engineer
Google Cloud · AI/LLM · GKE & Cloud Run

- Website: https://ongunakay.com
- GitHub: [@ongunakaycom](https://github.com/ongunakaycom)
- LinkedIn: [in/ongunakay](https://linkedin.com/in/ongunakay)
- Email: info@ongunakay.com

---

## 📄 License

MIT — see [LICENSE](./LICENSE).