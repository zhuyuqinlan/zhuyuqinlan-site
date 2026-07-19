---
title: Windows 安装 MySQL 便携版
date: 2026-07-19 18:46:10
tags: [MySQL, 数据库, Windows, 便携版]
categories: [教程]
---

> 无安装程序，解压即用的 MySQL 便携版部署方式。
> 下载地址：[MySQL Downloads](https://dev.mysql.com/downloads/mysql/)

## 准备my.ini
> 这个文件放到mysql安装目录下例如我这里是：D:/zhuyuqin/dev/docker/lemall/mysql-8.0.45-winx64
>

```properties
[mysqld]
# MySQL 安装目录（替换为你的实际路径）
basedir = D:/zhuyuqin/dev/docker/lemall/mysql-8.0.45-winx64

# 数据存储目录（会自动创建，路径需与 basedir 对应）
datadir = D:/zhuyuqin/dev/docker/lemall/mysql-8.0.45-winx64/data

# 端口号（默认3306，可自定义）
port = 3306

# 字符集（支持 emoji 需用 utf8mb4）
character-set-server = utf8mb4

# 最大连接数
max_connections = 200

# 默认存储引擎
default-storage-engine = INNODB


[mysql]
# 客户端字符集
default-character-set = utf8mb4


[client]
# 客户端连接端口（需与 mysqld 中的 port 一致）
port = 3306

default-character-set = utf8mb4
bind-address = 0.0.0.0
```

## 初始化
+ 在bin目录下执行

> 以后可通过.\mysqld.exe启动mysql
>

```powershell
.\mysqld.exe --initialize --console
```

+ 这时会生成一个临时密码，然后用这个密码登录

```powershell
.\mysql.exe -u root -p
```

+ 修改root密码

```sql
ALTER USER 'root'@'localhost' IDENTIFIED BY '123456';
```

+ 创建远程 root 账号

```sql
CREATE USER 'root'@'%' IDENTIFIED BY '123456';
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;
```

## 启动与停止

```powershell
# 启动
.\mysqld.exe

# 或以后台方式启动（新开一个 PowerShell 窗口）
Start-Process -FilePath ".\mysqld.exe" -WindowStyle Hidden
```

