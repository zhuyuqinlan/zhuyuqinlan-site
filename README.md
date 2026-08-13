# 🍥 执着的牛战士

> 基于 [Fuwari](https://github.com/saicaca/fuwari) 模板定制的个人博客。

[**🖥️ 在线预览**](https://zhuyuqinlan.top)

[![Node.js >= 20](https://img.shields.io/badge/node.js-%3E%3D20-brightgreen)](https://nodejs.org/)
[![pnpm >= 9](https://img.shields.io/badge/pnpm-%3E%3D9-blue)](https://pnpm.io/)
[![GitHub](https://img.shields.io/badge/GitHub-zhuyuqinlan%2Fzhuyuqinlan--site-blue?logo=github)](https://github.com/zhuyuqinlan/zhuyuqinlan-site)

![Preview Image](https://raw.githubusercontent.com/saicaca/resource/main/fuwari/home.png)

🌏 README in
[**中文**](https://github.com/saicaca/fuwari/blob/main/docs/README.zh-CN.md) /
[**日本語**](https://github.com/saicaca/fuwari/blob/main/docs/README.ja.md) /
[**한국어**](https://github.com/saicaca/fuwari/blob/main/docs/README.ko.md) /
[**Español**](https://github.com/saicaca/fuwari/blob/main/docs/README.es.md) /
[**ไทย**](https://github.com/saicaca/fuwari/blob/main/docs/README.th.md) /
[**Tiếng Việt**](https://github.com/saicaca/fuwari/blob/main/docs/README.vi.md) /
[**Bahasa Indonesia**](https://github.com/saicaca/fuwari/blob/main/docs/README.id.md) (Provided by the community and may not always be up-to-date)

## ✨ Features

- [x] Built with [Astro](https://astro.build) and [Tailwind CSS](https://tailwindcss.com)
- [x] Smooth animations and page transitions
- [x] Light / dark mode
- [x] Customizable theme colors & banner
- [x] Responsive design
- [x] Search functionality with [Pagefind](https://pagefind.app/)
- [x] [Markdown extended features](https://github.com/saicaca/fuwari?tab=readme-ov-file#-markdown-extended-syntax)
- [x] Table of contents
- [x] RSS feed
- [x] 博客评论（配套 [blog-comment-server](https://github.com/zhuyuqinlan/blog-comment-server)，支持图形验证码、楼中楼回复、IP 限流）

## 🚀 Getting Started

1. Create your blog repository:
    - [Generate a new repository](https://github.com/saicaca/fuwari/generate) from this template or fork this repository.
    - Or run one of the following commands:
       ```sh
       npm create fuwari@latest
       yarn create fuwari
       pnpm create fuwari@latest
       bun create fuwari@latest
       deno run -A npm:create-fuwari@latest
       ```
2. To edit your blog locally, clone your repository, run `pnpm install` to install dependencies.
    - Install [pnpm](https://pnpm.io) `npm install -g pnpm` if you haven't.
3. Edit the config file `src/config.ts` to customize your blog.
4. Run `pnpm new-post <filename>` to create a new post and edit it in `src/content/posts/`.
5. 如需启用评论功能，部署 [blog-comment-server](https://github.com/zhuyuqinlan/blog-comment-server) 并配置环境变量 `COMMENT_API_URL`（可在 `.env.development` 或 `.env.production` 中设置）。
6. Deploy your blog to Vercel, Netlify, GitHub Pages, etc. following [the guides](https://docs.astro.build/en/guides/deploy/). You need to edit the site configuration in `astro.config.mjs` before deployment.

## 📝 Frontmatter of Posts

```yaml
---
title: My First Blog Post
published: 2023-09-09
description: This is the first post of my new Astro blog.
image: ./cover.jpg
tags: [Foo, Bar]
category: Front-end
draft: false
lang: jp      # Set only if the post's language differs from the site's language in `config.ts`
---
```

## 🧩 Markdown Extended Syntax

In addition to Astro's default support for [GitHub Flavored Markdown](https://github.github.com/gfm/), several extra Markdown features are included:

- Admonitions ([Preview and Usage](https://fuwari.vercel.app/posts/markdown-extended/#admonitions))
- GitHub repository cards ([Preview and Usage](https://fuwari.vercel.app/posts/markdown-extended/#github-repository-cards))
- Enhanced code blocks with Expressive Code ([Preview](https://fuwari.vercel.app/posts/expressive-code/) / [Docs](https://expressive-code.com/))

## 💬 博客评论

本站集成了自研的 [blog-comment-server](https://github.com/zhuyuqinlan/blog-comment-server) 作为评论后端，特性包括：

- 游客评论（无需注册登录）
- 图形验证码（数学题）
- 楼中楼回复（两层结构）
- IP 限流（内存实现，无需 Redis）
- 软删除评论（管理员 token 鉴权）

### 环境变量

| 变量名 | 用途 | 配置位置 |
|:--------|:------|:---------|
| `COMMENT_API_URL` | 评论后端 API 地址 | `.env.development` 或 `.env.production` |
| `COMMENT_API_KEY` | 文章同步 API Key（**不写入 .env**） | 系统环境变量 |

### 启用步骤

1. 部署 [blog-comment-server](https://github.com/zhuyuqinlan/blog-comment-server)，从启动日志中获取 API Key
2. 在 `.env.development`（本地）或 `.env.production`（生产）中设置 `COMMENT_API_URL`
3. 同步文章到评论后端：
   ```bash
   # 本地开发
   COMMENT_API_KEY=your-api-key pnpm dev

   # 生产构建
   COMMENT_API_KEY=your-api-key pnpm build
   ```
   或在终端预先导出环境变量：
   ```bash
   export COMMENT_API_KEY=your-api-key
   pnpm dev
   ```

> 注意：`COMMENT_API_KEY` 仅用于文章同步，不需要写入 `.env` 文件。前端通过 `COMMENT_API_URL` 与评论后端通信，无需 API Key。

## ⚡ Commands

All commands are run from the root of the project, from a terminal:

| Command                    | Action                                              |
|:---------------------------|:----------------------------------------------------|
| `pnpm install`             | Installs dependencies                               |
| `pnpm dev`                 | Starts local dev server at `localhost:4321`         |
| `pnpm build`               | Build your production site to `./dist/`             |
| `pnpm preview`             | Preview your build locally, before deploying        |
| `pnpm check`               | Run checks for errors in your code                  |
| `pnpm format`              | Format your code using Biome                        |
| `pnpm new-post <filename>` | Create a new post                                   |
| `pnpm astro ...`           | Run CLI commands like `astro add`, `astro check`    |
| `pnpm astro --help`        | Get help using the Astro CLI                        |

## ✏️ Contributing

Check out the [Contributing Guide](https://github.com/saicaca/fuwari/blob/main/CONTRIBUTING.md) for details on how to contribute to this project.

## 📂 本项目

本站是基于 [Fuwari](https://github.com/saicaca/fuwari) 模板的定制版本，主要修改包括：

- 自定义主题配色、Banner、导航栏
- 集成 [blog-comment-server](https://github.com/zhuyuqinlan/blog-comment-server) 评论系统
- 添加友链、关于页面等自定义内容

- 前端仓库：[zhuyuqinlan-site](https://github.com/zhuyuqinlan/zhuyuqinlan-site)
- 后端仓库：[blog-comment-server](https://github.com/zhuyuqinlan/blog-comment-server)

## 📄 License

This project is licensed under the MIT License.

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fsaicaca%2Ffuwari.svg?type=large&issueType=license)](https://app.fossa.com/projects/git%2Bgithub.com%2Fsaicaca%2Ffuwari?ref=badge_large&issueType=license)
