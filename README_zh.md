[English](README.md) | [中文](README_zh.md)

# CLI520 — AI 原生 CLI 工具注册表

一个为人类和 AI 智能体双重优化的命令行工具注册表。

**在线演示: https://cli.cypggs.com**

每个工具页面具有双重用途：
- **人类可读** — 清晰的 HTML 页面，包含安装说明、命令列表和使用示例
- **机器可读** — 结构化 JSON 元数据以 `<script type="application/json" id="cli-metadata">` 嵌入每个页面，同时提供完整的 JSON API (`/api/cli-index.json`)

## 为什么做这个

AI 智能体经常会幻觉出不存在的 CLI 工具名称和参数。这个注册表提供了一个可靠的数据源，智能体可以通过程序化查询来发现真实的工具及其准确的语法。

## 快速开始

```bash
npm install
npm run dev       # 开发服务器 localhost:4321
npm run build     # 构建静态站点到 dist/
npm run preview   # 本地预览构建结果
```

## 添加 CLI 工具

在 `src/content/cli/<slug>/` 下创建目录，包含两个文件：

**`index.md`** — 前置元数据 + Markdown 描述：
```yaml
---
name: 工具名称
slug: tool-name
category: dev          # ai | cloud | dev | knowledge | search | files
tagline: 一句话描述
---
Markdown 正文。
```

**`cli.json`** — 面向机器的结构化元数据：
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

然后运行 `npm run build` 验证。

## API 接口

- `GET /api/cli-index.json` — 所有工具的 JSON 数组
- 每个 `/cli/<slug>` 页面在 `<script id="cli-metadata">` 中嵌入完整元数据

## 技术栈

- [Astro](https://astro.build/) 6 — 静态站点生成器
- Astro Content Collections + Zod 模式校验
- 无需 JavaScript 运行时 — 纯静态 HTML + JSON

## 开源协议

[MIT](LICENSE)
