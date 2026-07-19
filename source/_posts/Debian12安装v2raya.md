---
title: Debian 12 安装 v2rayA
date: 2026-07-19 18:40:00
tags: [Debian, v2rayA, 代理, 网络]
categories: [教程]
---

> 在 Debian 12 上安装 v2rayA 透明代理工具。
>
> 旧安装方式已失效，参考 [GitHub 讨论](https://github.com/v2rayA/v2rayA/discussions/1745)。

## 安装

```bash
curl -fsSL https://daeuniverse.pages.dev/install.sh | sudo bash
sudo apt update
sudo apt install v2raya v2ray
```

## 启动

```bash
sudo systemctl enable --now v2raya
sudo systemctl status v2raya
```

Web 管理界面访问 `http://localhost:2017`。

## 参考

- [https://daeuniverse.pages.dev](https://daeuniverse.pages.dev)

