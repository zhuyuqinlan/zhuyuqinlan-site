---
title: Windows 安装 fnm（Fast Node Manager）
date: 2026-07-19 18:46:50
tags: [fnm, Node.js, Windows, 版本管理]
categories: [教程]
---

> fnm 是一个轻量的 Node.js 版本管理工具，用 Rust 编写，速度比 nvm 快。
```powershell
winget install Schniz.fnm
```

## 设置环境变量
```powershell
$PROFILE
```

## 编辑该文件新增一行（如果没有这个文件那就手动创建）
```powershell
fnm env --use-on-cd --shell powershell | Out-String | Invoke-Expression
```

