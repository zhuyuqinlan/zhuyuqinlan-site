---
title: Aria2 离线下载平台搭建
date: 2026-07-19 18:47:25
tags: [Aria2, Nginx, Docker, 下载, PT]
categories: [教程]
---

> 基于 Aria2 + AriaNg + Nginx 搭建离线下载平台，支持 BT/PT 下载。
>
> 参考链接：
> - [cnblogs 教程](https://www.cnblogs.com/zhuxiaoxi/p/7714457.html)
> - [right.com.cn 论坛](https://www.right.com.cn/forum/thread-4085443-1-1.html)

## systemd

```ini
[Unit]
Description=Aria2 Download Manager
After=network.target

[Service]
Type=simple
User=zhuyuqinlan
Group=zhuyuqinlan
ExecStart=/usr/bin/aria2c --conf-path=/etc/aria2/aria2.conf
Restart=on-failure
RestartSec=5

[Install]
WantedBy=multi-user.target
```

## aria2.conf

```ini
## 进度保存相关
input-file=/home/zhuyuqinlan/.aria2/aria2.session
save-session=/home/zhuyuqinlan/.aria2/aria2.session

## 文件保存相关
dir=/home/zhuyuqinlan/docker/filebrowser/data/aria2
continue=true

## 下载连接相关
max-connection-per-server=5
min-split-size=10M

## RPC 相关设置
enable-rpc=true
rpc-allow-origin-all=true
rpc-listen-all=true
rpc-secret=zhuyuqin520.com

## BT/PT 下载相关
listen-port=51413
enable-dht=false
enable-peer-exchange=false
peer-id-prefix=-TR2770-
user-agent=Transmission/2.77
seed-ratio=0
bt-seed-unverified=true
bt-save-metadata=true
all-proxy=http://127.0.0.1:20172
```

> 完整配置项说明请参考 [aria2 官方文档](https://aria2.github.io/manual/en/html/aria2c.html)。

## update_aria2_trackers.sh

```bash
#!/usr/bin/env bash
set -euo pipefail

# ---------- 配置 ----------
RPC="http://127.0.0.1:6800/jsonrpc"
TOKEN="zhuyuqin520.com"
URL="${1:-https://bt.me88.top/?q=%E7%94%B5%E4%BF%A1}"  # tracker 来源页面
MAX="${2:-100}"                                        # 最多取前 N 条 tracker

# ---------- 临时文件 ----------
TMP_HTML=$(mktemp)
TMP_TRACKERS=$(mktemp)

# ---------- 下载网页 ----------
curl -fsSL "$URL" -o "$TMP_HTML"

# ---------- 提取 tracker ----------
perl -nle 'while(/<td[^>]*\bnodetype=["'"'"']url["'"'"'][^>]*>([^<]+)<\/td>/gi){ print $1 }' "$TMP_HTML" \
  | tr -d '\r' \
  | sed 's/^[[:space:]]*//; s/[[:space:]]*$//' \
  | awk '!seen[$0]++{print}' \
  | head -n "$MAX" \
  > "$TMP_TRACKERS"

# ---------- 检查是否有 tracker ----------
if [ ! -s "$TMP_TRACKERS" ]; then
  echo "未提取到任何 tracker，退出" >&2
  exit 1
fi

# ---------- 拼接为逗号，用于 aria2 ----------
TRACKERS_CSV=$(paste -sd, - < "$TMP_TRACKERS")
ESC_TRACKERS=$(printf '%s' "$TRACKERS_CSV" | sed -e 's/\\/\\\\/g' -e 's/"/\\"/g')

# ---------- 构造 JSON 并调用 RPC ----------
JSON=$(printf '{"jsonrpc":"2.0","method":"aria2.changeGlobalOption","id":"1","params":["token:%s",{"bt-tracker":"%s"}]}' "$TOKEN" "$ESC_TRACKERS")
RESP=$(curl -sS -H "Content-Type: application/json" -d "$JSON" "$RPC" || true)

# ---------- 输出 ----------
echo "aria2 RPC 返回："
echo "$RESP"
echo
echo "已更新 bt-tracker（前 500 字）："
printf '%s\n' "$TRACKERS_CSV" | cut -c1-500

# ---------- 清理 ----------
rm -f "$TMP_HTML" "$TMP_TRACKERS"
```

## nginx

### nginx.conf

```nginx
worker_processes  1;

events {
    worker_connections  1024;
}

http {
    include       mime.types;
    default_type  application/octet-stream;
    sendfile        on;
    keepalive_timeout  65;

    include       conf.d/*.conf;
}
```

### ariang.conf

```nginx
server {
    listen 8888;
    server_name localhost;

    root /usr/share/nginx/html/ariang;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

- AriaNg 下载：[https://github.com/mayswind/AriaNg/releases](https://github.com/mayswind/AriaNg/releases)
