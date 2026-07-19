---
title: 安装配置 WSL2（Debian）
date: 2026-07-19 18:47:05
tags: [WSL, Debian, Docker, Linux, Windows]
categories: [教程]
---

> 在 Windows 上安装 WSL2 并配置 Debian 发行版，包括 Docker、镜像源等。

## 下载并安装

```bash
wsl --list --online
wsl --install -d Debian
```

## .wslconfig（放在 Windows 用户目录下）
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

## 编辑wsl.conf使用root作为默认用户
```bash
apt install vim
vim /etc/wsl.conf
```

输入以下内容后重启 WSL 生效：

```ini
[boot]
systemd=true

[user]
default=root
```

## 配置中科大镜像
```bash
tee /etc/apt/sources.list << 'EOF'
deb http://mirrors.ustc.edu.cn/debian/ trixie main contrib non-free
deb-src http://mirrors.ustc.edu.cn/debian/ trixie main contrib non-free

deb http://mirrors.ustc.edu.cn/debian-security trixie-security main contrib non-free
deb-src http://mirrors.ustc.edu.cn/debian-security trixie-security main contrib non-free

deb http://mirrors.ustc.edu.cn/debian/ trixie-updates main contrib non-free
deb-src http://mirrors.ustc.edu.cn/debian/ trixie-updates main contrib non-free
EOF
apt update && apt upgrade -y
```

## 安装常用软件
```bash
# docker
apt install ca-certificates curl gnupg lsb-release -y
mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian \
  trixie stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
apt update
apt install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin -y
docker --version

# 其他软件
apt install fastfetch tmux unzip
```

## 环境变量
```bash
# eval "$(fnm env --use-on-cd --shell bash)"
alias dps='docker ps --format "table {{.ID}}    {{.Names}}      {{.Ports}}      {{.Status}}"' # 更友好的 Docker 容器列表
alias dis='docker images' # 显示 Docker 镜像
alias ta='tmux attach -t'
alias tw='tmux split-window'
alias twh='tmux split-window -h'
alias f='fastfetch'
# alias ya='yazi'
```

## 设置docker pull代理
```bash
mkdir -p /etc/systemd/system/docker.service.d
tee /etc/systemd/system/docker.service.d/http-proxy.conf > /dev/null <<'EOF'
[Service]
Environment="HTTP_PROXY=http://127.0.0.1:7897"
Environment="HTTPS_PROXY=http://127.0.0.1:7897"
Environment="NO_PROXY=localhost,127.0.0.1"
EOF
systemctl daemon-reload
systemctl restart docker
```

