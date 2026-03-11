# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

CLI520 is an AI-native CLI tool registry — a static website where each tool page is both human-readable and machine-readable (via embedded JSON metadata). Built with Astro 6, static output only.

**Live site**: https://cli.cypggs.com
**Repo**: https://github.com/cypggs/cli

## Commands

```bash
npm run dev       # Dev server (localhost:4321)
npm run build     # Build static site to dist/
npm run preview   # Preview built site locally
```

## Architecture

### Dual-layer content system

Each CLI tool is a directory under `src/content/cli/<tool-name>/` containing two files:
- **`index.md`** — Frontmatter (name, slug, category, tagline) + markdown description for human reading
- **`cli.json`** — Structured metadata (install commands, CLI commands, agent_metadata) for machine reading

The content collection schema is in `src/content.config.ts` using Astro's `glob` loader. Valid categories: `ai`, `cloud`, `dev`, `knowledge`, `search`, `files`.

### How pages consume content

- **`src/pages/index.astro`** — Homepage groups tools by category using `getCollection('cli')`
- **`src/pages/cli/[slug].astro`** — Detail pages render markdown via `render()` AND load `cli.json` via `fs.readFileSync` at build time. The critical feature: each page embeds the full `cli.json` as `<script type="application/json" id="cli-metadata">` so AI agents can parse it
- **`src/pages/api/cli-index.json.ts`** — Static JSON endpoint that aggregates all `cli.json` files into a single array

### Adding a new CLI tool

1. Create `src/content/cli/<slug>/index.md` with frontmatter matching the Zod schema
2. Create `src/content/cli/<slug>/cli.json` with structured metadata (see any existing tool for the shape: name, description, category, homepage, github, install, commands, agent_metadata)
3. Run `npm run build` to verify

### Deployment

Static files in `dist/` are deployed to the cloud server at `43.167.244.52` via scp to `/var/www/cli.cypggs.com/`. Nginx serves the site with HTTPS (Let's Encrypt).

```bash
npm run build && scp -r dist/* root@43.167.244.52:/var/www/cli.cypggs.com/
```
