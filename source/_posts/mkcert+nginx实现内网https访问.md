---
title: mkcert + Nginx 实现内网 HTTPS 访问
date: 2026-07-19 18:47:40
tags: [mkcert, Nginx, HTTPS, Docker, 内网]
categories: [教程]
---

> 使用 mkcert 生成内网可信 SSL 证书，配合 Nginx Docker 容器实现 HTTPS 访问。
> 本文环境：Arch Linux。

## 安装 mkcert

```bash
sudo pacman -Syu
sudo pacman -S mkcert
```

## 创建所需文件（放在同一目录）

### docker-compose.yml

```yaml
services:
  nginx:
    image: nginx:1.25       # 官方稳定版
    container_name: nginx-ssl
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./html:/usr/share/nginx/html        # 网站目录
      - ./certs:/etc/ssl/certs             # 自签证书
      - ./nginx/conf.d:/etc/nginx/conf.d   # 挂载配置文件
    restart: unless-stopped
```

### init.sh

```bash
#!/bin/bash

LOCAL_IP="192.168.1.102" # 替换为实际局域网 IP
HOSTNAMES=("localhost" "127.0.0.1" "$LOCAL_IP")

# 创建目录
mkdir -p html certs nginx/conf.d

# 创建默认 index.html
if [ ! -f html/index.html ]; then
cat << 'HTMLEOF' > html/index.html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>nginx HTTPS 测试</title>
</head>
<body>
    <h1>Nginx HTTPS 成功运行！</h1>
</body>
</html>
HTMLEOF
fi

# 生成自签证书（mkcert）
if [ ! -f certs/server.crt ] || [ ! -f certs/server.key ]; then
    echo "生成自签证书..."
    mkcert -cert-file certs/server.crt -key-file certs/server.key "${HOSTNAMES[@]}"
fi

# 创建默认 nginx 虚拟主机配置
if [ ! -f nginx/conf.d/default.conf ]; then
cat << 'CONFEOF' > nginx/conf.d/default.conf
server {
    listen 80;
    server_name localhost $LOCAL_IP;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name localhost $LOCAL_IP;

    ssl_certificate     /etc/ssl/certs/server.crt;
    ssl_certificate_key /etc/ssl/certs/server.key;

    location / {
        root /usr/share/nginx/html;
        index index.html;
    }
}
CONFEOF
fi

echo "html、证书和 nginx 配置已生成完毕"
```

### generate-cert.sh

```bash
#!/bin/bash
# 导出 mkcert 根证书供客户端安装
openssl x509 -outform der -in ~/.local/share/mkcert/rootCA.pem -out rootCA.crt
cp ~/.local/share/mkcert/rootCA.pem .
```

## 运行步骤

1. 运行 `bash init.sh` 初始化目录并生成证书
2. 启动 Docker 容器：`docker-compose up -d`
3. 运行 `bash generate-cert.sh` 导出客户端证书

## 客户端安装证书

+ **Windows**：将 `rootCA.crt` 拷到 Windows 上双击安装（选择「当前用户」）
+ **Linux**：`rootCA.pem` 按发行版方式安装（不同发行版安装 CA 证书方式不同）

## 验证

访问 `https://<服务器IP>`，浏览器应显示连接安全。
