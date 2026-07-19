---
title: Claude Code 安装 MCP Server
date: 2026-07-19 18:45:00
tags: [Claude Code, MCP, AI, 开发工具]
categories: [教程]
---

> 安装 [uv](https://docs.astral.sh/uv/getting-started/installation/) 和 uvx。
> 以下配置在 [cc-switch](https://github.com/SunBasket/cc-switch)（Claude Code 配置切换工具）中使用。

## postgres-mcp

配置内容：

```json
{
    "postgres": {
      "command": "uvx",
      "args": [
        "postgres-mcp",
        "--access-mode=unrestricted"
      ],
      "env": {
        "DATABASE_URI": "postgresql://username:password@localhost:5432/dbname"
      }
    }
}
```

在 cc-switch 中安装。

## playwright

配置内容：

```json
{
  "playwright": {
    "command": "npx",
    "args": [
      "@playwright/mcp@latest"
    ]
  }
}
```

在 cc-switch 中安装。
