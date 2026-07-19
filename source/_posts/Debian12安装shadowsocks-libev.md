---
title: Debian 12 安装 shadowsocks-libev
date: 2026-07-19 18:46:30
tags: [Debian, shadowsocks, 代理, 网络]
categories: [教程]
---

> 在 Debian 12 上通过 apt 安装 shadowsocks-libev 并配置 systemd 自启。
```bash
apt update
apt install -y shadowsocks-libev vim
```

## 配置
### 编辑
```bash
vim /etc/shadowsocks-libev/config.json
```

### 输入
```bash
{
    "server":"0.0.0.0",
    "server_port":30201,
    "password":"你的强密码123",
    "timeout":300,
    "method":"aes-256-gcm",
    "fast_open": false,
    "nameserver":"8.8.8.8",
    "mode":"tcp_and_udp"
}
```

## 启动
```bash
systemctl enable shadowsocks-libev
systemctl start shadowsocks-libev
systemctl status shadowsocks-libev
```

