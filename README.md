# Angular Core SPA — Cloud Engineer Portfolio

A production portfolio site rebuilt from a legacy AngularJS 1.x demo into a modern
**Angular 19 + SSR + prerender** application. Demonstrates cloud-native frontend
architecture, SEO engineering, and CI/CD deployment to GitHub Pages.

**Live:** https://ongunakaycom.github.io/Angular-Core-SPA/

---

## 🎯 Why this repo exists

This project is a **migration case study**. The original repo was an AngularJS 1.x
single-page demo (preserved as the tag [`v1-legacy-angularjs`](../../tree/v1-legacy-angularjs)).
In 2026 it was rebuilt end-to-end to demonstrate:

- Angular 19 standalone components + lazy loading
- SSR + build-time prerendering for SEO
- Tailwind CSS v4 with a custom dark theme
- GitHub Pages deployment via GitHub Actions (official Pages action)
- Structured data (JSON-LD), sitemap, robots, and per-route metadata

The goal was not just to "make it work" — it was to engineer a modern, crawlable,
zero-cost static deployment without losing the original URL.

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
                            │  / /about /cv /ai-llm│
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

**Key decision:** GitHub Pages cannot run a Node server, so runtime SSR is replaced
with **build-time prerendering**. Every route is rendered to static HTML at build
time — identical SEO outcome, zero runtime cost, zero infra.

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
| Legacy | Original AngularJS 1.x preserved at `v1-legacy-angularjs` |

---

## 🗂 Project structure

```
Angular-Core-SPA/
├── .github/workflows/deploy.yml   # GitHub Actions → Pages
├── public/
│   ├── 404.html                   # SPA fallback + legacy hash redirects
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

### 1. AngularJS → Angular 19 migration without breaking the URL
The site was already indexed by Google at `ongunakaycom.github.io/Angular-Core-SPA/`.
Rebuilding it required preserving that exact base URL — no redirects, no SEO loss.
Solution: keep the repo, keep the path, set `baseHref: "/Angular-Core-SPA/"`, and
provide a hash-URL shim in `index.html` that redirects old `#/about` links to `/about`.

### 2. Prerender instead of runtime SSR
GitHub Pages is static. Angular 19 SSR normally runs on a Node server. We use the
**build-time prerender** path (`app.routes.server.ts` with `RenderMode.Prerender`)
so every route ships as real HTML. Result: Google sees full content without executing
JS, and hosting cost stays at zero.

### 3. Route-level metadata
Each route carries its own `title` and `data.description`. No global meta tag
duplication, no runtime meta service needed. Canonical, OG, and JSON-LD are declared
once in `index.html`.

### 4. Lazy loading per page
Each page is a standalone component loaded via `loadComponent`. Build output shows
one chunk per route (`home-component`, `about-component`, `cv-component`,
`ai-llm-component`) — meaning the initial bundle stays small and each route loads
independently.

### 5. GitHub Actions deployment
Uses GitHub's official Pages actions (`upload-pages-artifact` + `deploy-pages`),
with a `Verify prerendered output` step that fails the build if any prerendered
route is missing. This prevents broken deploys from reaching production.

---

## 🔍 SEO engineering

- **JSON-LD `Person` schema** in `index.html` — Google reads `jobTitle: "Cloud Engineer"`,
  `knowsAbout`, and `sameAs` links.
- **Per-route `<title>` and `<meta description>`** declared in `app.routes.ts`.
- **`sitemap.xml`** listing all 4 routes with priorities.
- **`robots.txt`** pointing to the sitemap.
- **`404.html`** SPA fallback that restores the requested URL and routes client-side.
- **Legacy hash URL redirect** (`#/about` → `/about`) to preserve old inbound links.

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

## 📚 Legacy

The original AngularJS 1.x implementation is preserved at the tag
[`v1-legacy-angularjs`](../../tree/v1-legacy-angularjs). It is not maintained.

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