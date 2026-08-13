/* This is a script to create a new post markdown file with front-matter */

import "dotenv/config"
import { config } from "dotenv"

const envFile = process.env.NODE_ENV === "production" ? ".env.production" : ".env.development"
config({ path: envFile })

import fs from "fs"
import path from "path"

function getDate() {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, "0")
  const day = String(today.getDate()).padStart(2, "0")

  return `${year}-${month}-${day}`
}

const args = process.argv.slice(2)
if (args.length === 0) {
  console.error(`Error: No title argument provided
Usage: pnpm new-post -- "文章标题"`)
  process.exit(1)
}

const title = args[0]
const dirName = String(Date.now())
const fileName = `${dirName}/index.md`

const targetDir = "./src/content/posts/"
const fullPath = path.join(targetDir, fileName)

if (fs.existsSync(fullPath)) {
  console.error(`Error: File ${fullPath} already exists `)
  process.exit(1)
}

const dirPath = path.dirname(fullPath)
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
}

const content = `---
title: ${title}
published: ${getDate()}
description: ''
image: ''
tags: []
category: ''
draft: false
lang: ''
---
`

fs.writeFileSync(path.join(targetDir, fileName), content)

console.log(`Post ${fullPath} created`)
