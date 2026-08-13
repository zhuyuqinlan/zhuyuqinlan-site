// scripts/sync-articles.js
// 扫描 src/content/posts/ 下所有文章，批量注册到评论后端

import fs from "fs"
import path from "path"
import { config } from "dotenv"

const mode = process.env.NODE_ENV || "development"
config()
config({ path: `.env.${mode}` })

const API_BASE = process.env.COMMENT_API_URL || ""
const API_KEY = process.env.COMMENT_API_KEY || ""
const POSTS_DIR = "./src/content/posts"

function parseFrontmatter(filePath) {
  const content = fs.readFileSync(filePath, "utf-8")
  const match = content.match(/^---\n([\s\S]*?)\n---/)
  if (!match) return null

  const yaml = match[1]

  const titleMatch = yaml.match(/^title:\s*["']?(.+?)["']?\s*$/m)
  const title = titleMatch ? titleMatch[1] : ""

  const draftMatch = yaml.match(/^draft:\s*(\S+)/m)
  const draft = draftMatch ? draftMatch[1] === "true" : false

  return { title, draft }
}

async function syncArticles() {
  console.log(`API_BASE: ${API_BASE}`)
  console.log(`API_KEY: ${API_KEY ? "***" : "(空)"}\n`)

  const dirs = fs.readdirSync(POSTS_DIR).filter((name) => {
    const filePath = path.join(POSTS_DIR, name, "index.md")
    return fs.existsSync(filePath)
  })

  const articles = []

  for (const dir of dirs) {
    const filePath = path.join(POSTS_DIR, dir, "index.md")
    const meta = parseFrontmatter(filePath)

    if (!meta || !meta.title) {
      console.log(`  [跳过] ${dir} — 无法解析 frontmatter`)
      continue
    }

    if (meta.draft) {
      console.log(`  [草稿] ${dir} — ${meta.title}`)
      continue
    }

    articles.push({ id: dir, title: meta.title })
  }

  console.log(`共 ${articles.length} 篇文章，开始同步...\n`)

  try {
    const res = await fetch(`${API_BASE}/articles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": API_KEY,
      },
      body: JSON.stringify(articles),
    })

    if (res.ok) {
      console.log(`同步完成`)
    } else {
      console.log(`同步失败: ${res.status}`)
    }
  } catch (err) {
    console.log(`[错误] ${err.message}`)
  }
}

syncArticles()
