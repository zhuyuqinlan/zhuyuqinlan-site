---
title: 安装配置 WSL2（Ubuntu）
date: 2026-07-19 18:47:10
tags: [WSL, Ubuntu, Linux, Windows]
categories: [教程]
---

> 在 Windows 上安装 WSL2 并配置 Ubuntu 24.04 发行版。

## 下载并安装
```bash
wsl --list --online
wsl --install -d Ubuntu-24.04
```

## .wslconfig（放在windows用户目录下）
```ini
[wsl2]
memory=4GB                        # 分配给 WSL 2 的内存大小（上限）
processors=2                  # 分配给 WSL 2 的 CPU 核心数 （上限）
 
[experimental]
autoMemoryReclaim=gradual         # 开启自动回收内存，可在 gradual, dropcache, disabled 之间选择
networkingMode=mirrored           # 开启镜像网络
dnsTunneling=true                 # 开启 DNS Tunneling
firewall=true                     # 开启 Windows 防火墙
autoProxy=false                    # 开启自动同步代理
sparseVhd=true                    # 开启自动释放 WSL2 虚拟硬盘空间
```

## 更换为国内镜像
```bash
sudo cp /etc/apt/sources.list.d/ubuntu.sources /etc/apt/sources.list.d/ubuntu.sources.bak
sudo tee /etc/apt/sources.list.d/ubuntu.sources <<-'EOF'
Types: deb
URIs: https://mirrors.tuna.tsinghua.edu.cn/ubuntu
Suites: noble noble-updates noble-backports
Components: main restricted universe multiverse
Signed-By: /usr/share/keyrings/ubuntu-archive-keyring.gpg
EOF
```

更新软件包和仓库

```bash
sudo apt update && sudo apt upgrade -y
```

