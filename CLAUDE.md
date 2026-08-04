# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm install          # install deps (pnpm is enforced via only-allow)
pnpm dev              # dev server at localhost:4321
pnpm build            # astro build && pagefind --site dist (Pagefind indexing is part of build)
pnpm preview          # preview production build
pnpm check            # astro check
pnpm lint / pnpm format  # biome check / format --write
pnpm new-post <name>  # scaffold a new post under src/content/posts/<name>/index.md
```

## Configuration

All site customization flows through `src/config.ts`: title, language, theme hue, banner, TOC, navbar links (`LinkPreset.Home|Archive|About` or custom `NavBarLink`), profile, and license. Type definitions are in `src/types/config.ts`. Theme color is driven by `--hue` CSS variable (0-360); set `themeColor.fixed: true` to hide the hue picker.

## Content

Two Astro content collections defined in `src/content/config.ts`:

- **posts** — Zod-validated; frontmatter fields: title, published (date), description, image, tags, category, draft, lang. Extra internal fields `prevTitle/prevSlug/nextTitle/nextSlug` are auto-populated for post navigation.
- **spec** — schema-less (`z.object({})`); used for static pages like about.md and copyright.md.

Posts live in `src/content/posts/` (each in its own directory with `index.md`). Use `pnpm new-post` to scaffold.

## Architecture

**Markdown pipeline** (wired in `astro.config.mjs`): remark plugins run math → reading time → excerpt → admonitions → directives → sectionize → custom directive parser. Rehype plugins run katex → slug → components (admonitions, github cards) → autolink headings → external links. Custom plugins in `src/plugins/` are essential; if markdown rendering breaks, check `remark-directive-rehype.js` and `rehype-component-admonition.mjs`.

**Layout hierarchy**: `Layout.astro` (HTML shell, theme init, Swup hooks, PhotoSwipe) → `MainGridLayout.astro` (banner, navbar, sidebar, main grid, TOC). The `#swup-container` element is the swap target for SPA-like transitions.

**Swup transitions**: `@swup/astro` handles navigation. The `#toc` div must exist even when TOC is disabled (Swup container requirement). Swup hooks in `Layout.astro` reinitialize scrollbars and PhotoSwipe on content replace.

**Search**: `Search.svelte` loads Pagefind dynamically in production (`import.meta.env.PROD` guard in `Navbar.astro`). The `pagefind.yml` excludes Katex spans and the search panel from indexing.

**Theming**: CSS variables defined in `src/styles/variables.styl` using a Stylus `define()` mixin that generates `:root` / `:root.dark` variants. Theme mode (light/dark/auto) uses the `dark` class on `<html>` with localStorage persistence. Initial theme is set via an inline script in `Layout.astro` to prevent flash-of-wrong-theme.

**i18n**: Translations in `src/i18n/languages/*.ts`, keyed by `I18nKey` enum. `i18n()` returns the string for `siteConfig.lang`; `getTranslation(lang)` accepts any supported locale.

## Path Aliases

`@components/*`, `@assets/*`, `@constants/*`, `@utils/*`, `@i18n/*`, `@layouts/*`, `@/*` (→ `src/*`)

## CI

GitHub Actions (`.github/workflows/deploy.yml`) deploys to GitHub Pages on push to `master` using `withastro/action@v5`.

## Formatting

Biome with tab indentation, double quotes. `.svelte`/`.astro`/`.vue` files disable `useConst`, `useImportType`, and unused variable/import detection.
