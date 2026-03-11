[English](README.md) | [中文](README_zh.md)

# CLI520 — AI-Native CLI Registry

A curated registry of command-line tools, optimized for both humans and AI agents.

**Demo: https://cli.cypggs.com**

Every tool page is dual-purpose:
- **Human-readable** — clean HTML with install instructions, commands, and usage examples
- **Machine-readable** — structured JSON metadata embedded as `<script type="application/json" id="cli-metadata">` in every page, plus a full JSON API at `/api/cli-index.json`

## Why

AI agents frequently hallucinate CLI tool names and flags. This registry provides a ground-truth source that agents can programmatically query to discover real tools with accurate syntax.

## Quick Start

```bash
npm install
npm run dev       # Dev server at localhost:4321
npm run build     # Build static site to dist/
npm run preview   # Preview the build
```

## Adding a CLI Tool

Create a directory under `src/content/cli/<slug>/` with two files:

**`index.md`** — Frontmatter + markdown description:
```yaml
---
name: Tool Name
slug: tool-name
category: dev          # ai | cloud | dev | knowledge | search | files
tagline: One-line description
---
Markdown body here.
```

**`cli.json`** — Structured metadata for machines:
```json
{
  "name": "tool-name",
  "description": "...",
  "category": "dev",
  "homepage": "https://...",
  "github": "https://...",
  "install": { "brew": "brew install tool-name" },
  "commands": [{ "name": "cmd", "syntax": "tool cmd <arg>", "description": "..." }],
  "agent_metadata": {
    "use_cases": ["..."],
    "example_workflow": "tool cmd1 | tool cmd2"
  }
}
```

Then run `npm run build` to verify.

## API

- `GET /api/cli-index.json` — All tools as a JSON array
- Each `/cli/<slug>` page embeds full metadata in `<script id="cli-metadata">`

## Tech Stack

- [Astro](https://astro.build/) 6 — Static site generator
- Astro Content Collections with Zod schema validation
- No JavaScript runtime required — pure static HTML + JSON

## License

[MIT](LICENSE)

