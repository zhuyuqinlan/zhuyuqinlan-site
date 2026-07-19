---
title: Docker 部署 OpenList 文件列表服务
date: 2026-07-19 18:45:50
tags: [Docker, OpenList, 文件管理, 网盘]
categories: [教程]
---

> [OpenList](https://github.com/OpenListTeam/OpenList) 是一个支持多种存储的文件列表程序，可用于替代 Alist。
> 需提前安装 Docker 和 docker-compose。
## 目录结构

```bash
mkdir -p data
```

## docker-compose.yml

```yaml
# docker-compose.yml
services:
  openlist:
    image: 'openlistteam/openlist:latest'
    container_name: openlist
    user: '0:0' # Please replace `0:0` with the actual user ID and group ID you want to use to run OpenList.
    volumes:
      - './data:/opt/openlist/data'
    ports:
      - '5244:5244'
    environment:
      - UMASK=022
    restart: unless-stopped
```

## init
```bash
#!/bin/bash
mkdir data
```

