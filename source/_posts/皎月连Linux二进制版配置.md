---
title: 皎月连 Linux 二进制版配置
date: 2026-07-19 18:47:35
tags: [皎月连, 内网穿透, Linux, systemd]
categories: [教程]
---

> 在 Linux 服务器上配置皎月连（NatPierce）内网穿透工具，使用 systemd 管理服务。

## 下载

从 [官网下载页面](https://www.natpierce.cn/pc/downloads/index_new.html) 获取 Linux 二进制版本。

## 配置并运行

1. 创建目录 `/opt/natpierce`

```bash
mkdir -p /opt/natpierce
```

2. 将解压后的二进制文件移动到 `/opt/natpierce`

3. 赋予执行权限

```bash
chmod +x /opt/natpierce/natpierce
```

4. 配置 systemd 服务

创建 service 配置文件：

```bash
vim /etc/systemd/system/natpierce.service
```

写入以下内容：

```ini
[Unit]
Description=Natpierce Tunnel Service
After=network-online.target
Wants=network-online.target

[Service]
WorkingDirectory=/opt/natpierce
ExecStart=/opt/natpierce/natpierce
Restart=always
RestartSec=5
User=root
# 日志直接走 systemd journal
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=multi-user.target
```

5. 重新加载 systemd

```bash
systemctl daemon-reload
```

6. 启动并设为开机自启

```bash
systemctl enable --now natpierce.service
```

7. 查看运行状态 / 日志

```bash
systemctl status natpierce.service
journalctl -u natpierce.service -f
```
