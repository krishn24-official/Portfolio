# Portfolio — React + Redux Thunk + Tailwind CSS

A developer portfolio built with a "technical blueprint" design direction:
deep navy background, cyan accent, monospace labels, and a signature
"title block" component modeled on engineering drawing corner stamps.

## Getting started

```bash
npm install
npm run dev
```

Open the local URL Vite prints (usually `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview   # preview the production build locally
```

## What to edit

**Almost everything you need to customize lives in one file:**

```
src/data/portfolioData.js
```

Update the `portfolioData` object with your real name, role, bio, skills,
and projects. Each project has `problem` / `decisions` / `learned` fields —
these map to the "what problem, what trade-offs, what you'd change" style
of case study that reads far stronger than a bullet-point list.

When you have a real backend or CMS, replace `fetchPortfolioFromServer()`
in the same file with an actual `fetch('/api/portfolio')` call — the Redux
Thunk action in `src/store/portfolioActions.js` doesn't need to change at all.

## Architecture

```
src/
  store/
    store.js              — Redux store, configured with the thunk middleware
    portfolioActions.js   — action types + the fetchPortfolioData() thunk
    portfolioReducer.js   — loading/data/error state for the async fetch
  data/
    portfolioData.js       — your content, + the simulated "API" call
  components/
    Navbar, Hero, TitleBlock, About, Skills,
    Projects, ProjectCard, Contact, Footer, Loader, SectionLabel
  App.jsx                  — dispatches the thunk on mount, renders by state
  main.jsx                 — mounts React + wraps the app in <Provider>
```

The app dispatches `fetchPortfolioData()` once on mount. That thunk:
1. Dispatches `FETCH_PORTFOLIO_REQUEST` (shows the loader)
2. Awaits the (simulated) async call
3. Dispatches `FETCH_PORTFOLIO_SUCCESS` with the data, or
   `FETCH_PORTFOLIO_FAILURE` with an error message

This mirrors exactly how you'd wire up a real API call later — swap the
data source, keep the same Redux flow.

## Deploying

Any static host works since this builds to plain static files:

- **Vercel / Netlify**: connect the repo, build command `npm run build`,
  output directory `dist`
- **GitHub Pages**: run `npm run build`, deploy the `dist/` folder

## Adding a résumé

Drop a `resume.pdf` into the `public/` folder — the "Download résumé"
button in the hero already points to `/resume.pdf`.
