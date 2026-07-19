---
title: 安装配置 WSL2（Arch Linux）
date: 2026-07-19 18:47:15
tags: [WSL, ArchLinux, Sway, Linux, Windows]
categories: [教程]
---

> 在 Windows 上安装 WSL2 并配置 Arch Linux 发行版，包括桌面环境、开发工具等。

## 打开 PowerShell（管理员权限）  
##  安装WSL
```powershell
wsl --install
```

##  设置默认WSL版本为WSL2  
```powershell
wsl --set-default-version 2
```

## 查看可用发行版
```powershell
wsl --list --online
```

**安装完后需要重启 Windows**

## 安装Linux
```powershell
wsl --install -d archlinux
```

## 常用命令
```powershell
wsl --list --verbose        # 查看已安装的 Linux 发行版及状态
wsl -l -v                   # 同上
wsl --set-version <Distro> 2 # 切换指定发行版到 WSL2
wsl --set-default-version 2 # 设置默认安装为 WSL2
wsl --shutdown              # 关闭所有 WSL 实例
wsl --terminate <Distro>    # 关闭指定发行版
wsl --unregister <Distro>   # 卸载指定发行版（数据会丢失）
wsl --import <Distro> <InstallDir> <TarFile>  # 从 tar 安装发行版
wsl --export <Distro> <TarFile>              # 导出发行版
wsl                         # 启动默认发行版
wsl -d <Distro>             # 启动指定发行版
wsl -u <User>               # 以指定用户启动
wsl --user <User>           # 同上
wsl --exec <Command>        # 在 WSL 内执行命令后退出
wsl -e <Command>            # 同上
wsl --update                # 更新 WSL 内核
wsl --update rollback       # 回退 WSL 内核更新
wsl --help                  # 查看所有命令
```

## ArchLinux配置
> 直接用的root用户，方便，每次执行命令也不用加sudo
>

### archLinuxcn镜像
+ 编辑/etc/pacman.conf在末尾参数加入

```nginx
[archlinuxcn]
SigLevel = Optional TrustedOnly
Server = http://repo.archlinuxcn.org/$arch
```

+ 刷新并导入key

```bash
pacman -Syyu
pacman -S archlinuxcn-keyring
```

### 安装常用包
```bash
pacman -S --needed tmux vim unzip proxychains-ng yazi openssh fastfetch ttf-dejavu wqy-zenhei noto-fonts-cjk bash-completion glibc-locales git paru base-devel docker docker-compose
```

> [https://learn.microsoft.com/zh-cn/windows/wsl/networking#identify-ip-address](https://learn.microsoft.com/zh-cn/windows/wsl/networking#identify-ip-address)
>
> [https://www.cnblogs.com/netWild/p/18503950](https://www.cnblogs.com/netWild/p/18503950)
>
> 配置参考
>

```bash
pacman -S fnm
eval "$(fnm env --use-on-cd --shell bash)"

sudo pacman -S jdk-openjdk jdk-17openjdk
archlinux-java status
sudo archlinux-java set java-17-openjdk
java --version

curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh
```

### .wslconfig（放在 Windows 用户目录下）
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

### 新增sudo用户(可选)
```bash
useradd -m -G wheel -s /bin/bash zhuyuqinlan
passwd zhuyuqinlan
```

### 允许wheel组使用sudo(可选)
编辑`/etc/sudoers`

找到%wheel ALL=(ALL) ALL取消注释

### 设置wsl
编辑/etc/wsl.conf

> 如果配置了其他用户可以把root换掉
>

```ini
[boot]
systemd=true

[user]
default=root
```

### 设置语言环境
```bash
vim /etc/locale.gen      # 去掉 en_US.UTF-8 UTF-8 注释
locale-gen
echo "LANG=en_US.UTF-8" | sudo tee /etc/locale.conf
```

## .bash_profile
```bash
if [ -f ~/.bashrc ]; then
    source ~/.bashrc
fi
```

## .bashrc
```bash
eval "$(fnm env --use-on-cd --shell bash)"
alias dps='docker ps --format "table {{.ID}}    {{.Names}}      {{.Ports}}      {{.Status}}"' # 更友好的 Docker 容器列表
alias dis='docker images' # 显示 Docker 镜像
alias ta='tmux attach -t'
alias tw='tmux split-window'
alias twh='tmux split-window -h'
alias f='fastfetch'
alias ya='yazi'
```

## docker开机自启
```bash
systemctl enable --now docker
```

## 设置docker pull代理
```bash
mkdir -p /etc/systemd/system/docker.service.d
tee /etc/systemd/system/docker.service.d/http-proxy.conf > /dev/null <<'EOF'
[Service]
Environment="HTTP_PROXY=http://127.0.0.1:10808"
Environment="HTTPS_PROXY=http://127.0.0.1:10808"
Environment="NO_PROXY=localhost,127.0.0.1"
EOF
systemctl daemon-reload
systemctl restart docker
```

