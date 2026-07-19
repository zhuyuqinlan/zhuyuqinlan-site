---
title: Docker 搭建 C++ 开发环境（OpenCV + Java 为例）
date: 2026-07-19 18:47:50
tags: [Docker, C++, OpenCV, Java, CMake]
categories: [教程]
---

> 使用 Docker Compose 搭建 C++ 开发容器，集成 OpenCV 和 OpenJDK，通过 SSH 连接开发。

## 创建相关文件（在同一目录下）
### docker-compose.yml
```yaml
services:
  cpp-dev:
    build: .
    image: ubuntu-cpp-dev:v1.0
    container_name: cpp_dev
    ports:
      - "2222:22"      # 映射到宿主机端口 2222
      - "18080:18080"  # spring web端口
    tty: true
    stdin_open: true
    volumes:
      - ./tmp:/tmp  # 挂载宿主机代码目录
```

### Dockerfile
```bash
# 使用国内加速镜像，例如阿里云 ubuntu
FROM ubuntu:22.04

# 设置非交互模式（避免 tzdata 卡住）
ENV DEBIAN_FRONTEND=noninteractive
ENV TZ=Asia/Shanghai

# 设置国内源，加快下载速度
RUN sed -i 's@archive.ubuntu.com@mirrors.aliyun.com@g' /etc/apt/sources.list && \
    sed -i 's@security.ubuntu.com@mirrors.aliyun.com@g' /etc/apt/sources.list

# 更新系统、安装基础工具、SSH、C++开发环境
RUN apt-get update && apt-get install -y \
    tzdata \
    build-essential \
    g++ \
    cmake \
    git \
    vim \
    wget \
    curl \
    openssh-server \
    sudo \
    gdb \
    libopencv-dev \
    openjdk-8-jdk \
    && ln -snf /usr/share/zoneinfo/$TZ /etc/localtime \
    && echo $TZ > /etc/timezone \
    && mkdir /var/run/sshd \
    && rm -rf /var/lib/apt/lists/*

# 设置 root 密码，允许 SSH 登录
RUN echo 'root:root' | chpasswd
RUN sed -i 's/#PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config
RUN sed -i 's@session\s*required\s*pam_loginuid.so@session optional pam_loginuid.so@g' /etc/pam.d/sshd

# 开放 SSH 和 Java测试端口
EXPOSE 22 18080

# 容器启动时运行 SSH 服务
CMD ["/usr/sbin/sshd", "-D"]
```

### init.sh
```bash
#!/bin/bash                                                                                                                                                                                 
mkdir ./tmp                                                                                                                                                                                 
                                                                                                                                                                                            
echo "文件已创建"
```

## 运行初始化脚本构建并启动容器

```bash
bash init.sh
docker-compose up -d
```

## 连接开发

SSH 连接容器：

```bash
ssh root@localhost -p 2222
```

密码为 `root`（见 Dockerfile 中设置）。

> 将代码放入 `./tmp` 目录即可在容器内访问。


