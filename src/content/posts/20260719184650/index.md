---
title: Windows 安装 fnm（Fast Node Manager）
published: 2026-07-19 18:46:50
tags: [fnm, Node.js, Windows, 版本管理]
category: 开发
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

## 安装 Node.js

```powershell
# 安装指定版本（例如 20 LTS）
fnm install 20
fnm use 20

# 设为默认版本
fnm default 20
```

## 验证安装

```powershell
node -v
npm -v
```

