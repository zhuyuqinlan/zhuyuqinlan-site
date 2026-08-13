// scripts/sync-articles.js
// 扫描 src/content/posts/ 下所有文章，批量注册到评论后端

import fs from "fs"
import path from "path"

const API_BASE = process.env.COMMENT_API_URL || "http://localhost:8812/api"
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

async function syncArticle(id, title) {
  const res = await fetch(`${API_BASE}/articles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": API_KEY,
    },
    body: JSON.stringify({ id, title }),
  })
  return res.ok
}

export async function syncArticles() {
  const dirs = fs.readdirSync(POSTS_DIR).filter((name) => {
    const filePath = path.join(POSTS_DIR, name, "index.md")
    return fs.existsSync(filePath)
  })

  console.log(`扫描到 ${dirs.length} 篇文章，开始同步...\n`)

  let synced = 0
  let skipped = 0
  let failed = 0

  for (const dir of dirs) {
    const filePath = path.join(POSTS_DIR, dir, "index.md")
    const meta = parseFrontmatter(filePath)

    if (!meta || !meta.title) {
      console.log(`  [跳过] ${dir} — 无法解析 frontmatter`)
      skipped++
      continue
    }

    if (meta.draft) {
      console.log(`  [草稿] ${dir} — ${meta.title}`)
      skipped++
      continue
    }

    try {
      const ok = await syncArticle(dir, meta.title)
      if (ok) {
        console.log(`  [同步] ${dir} — ${meta.title}`)
        synced++
      } else {
        console.log(`  [失败] ${dir} — ${meta.title}`)
        failed++
      }
    } catch (err) {
      console.log(`  [错误] ${dir} — ${err.message}`)
      failed++
    }
  }

  console.log(`\n同步完成: ${synced} 成功, ${skipped} 跳过, ${failed} 失败`)
}
