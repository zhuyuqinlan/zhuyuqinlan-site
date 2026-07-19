---
title: Arch Linux 安装及配置（以 Sway 为例）
date: 2026-07-19 18:48:10
tags: [ArchLinux, Sway, Wayland, 桌面环境, PipeWire]
categories: [教程]
---

> 参考 [Arch Linux 安装指南](https://arch.icekylin.online/) 进行系统安装。
> 本文记录实体机安装 Arch Linux 后的桌面环境（Sway）及常用软件配置。

## 配置 swap 目录

> 用于休眠（告诉系统将内存写到硬盘哪个分区）。休眠需要 swap 大小 ≥ 内存大小。

### 检查当前 swap

```bash
swapon --show
free -h
```

### 配置 resume 参数

内核启动时需要知道从哪个 swap 分区恢复。在 `/etc/default/grub` 中修改启动参数（`/dev/nvme0n1p3` 替换为你的 swap 分区）：

```ini
GRUB_CMDLINE_LINUX_DEFAULT="quiet resume=/dev/nvme0n1p3"
```

更新 GRUB 配置：

```bash
sudo grub-mkconfig -o /boot/grub/grub.cfg
```

## 基础桌面环境

### 配置 archlinuxcn 镜像源

编辑 `/etc/pacman.conf`，在末尾加入：

```ini
[archlinuxcn]
SigLevel = Optional TrustedOnly
Server = http://repo.archlinuxcn.org/$arch
```

刷新并导入 key：

```bash
sudo pacman -Syyu
sudo pacman -S archlinuxcn-keyring
```

### 安装软件包

```bash
sudo pacman -S --needed \
  sway waybar alacritty wofi swaybg swaylock \
  noto-fonts-cjk otf-font-awesome ttf-arimo-nerd \
  ttf-jetbrains-mono-nerd ttf-dejavu ttf-liberation wqy-zenhei \
  fcitx5 fcitx5-chinese-addons fcitx5-gtk fcitx5-qt fcitx5-configtool \
  firefox \
  brightnessctl bluez bluez-utils tlp tlp-rdw \
  imv grim slurp wl-clipboard swappy yazi ueberzugpp \
  v2raya paru \
  nvim nvm lazygit ripgrep gdu bottom \
  opencv cmake jdk8-openjdk jdk17-openjdk vtk hdf5 \
  clang gdb lua lua-language-server marksman \
  xorg-xwayland xorg-xeyes \
  stow \
  libreoffice-fresh libreoffice-fresh-zh-cn \
  nginx aria2 \
  fastfetch tmux unzip openssh bash-completion glibc-locales git \
  docker docker-compose
```

> 安装完 Docker 后记得将当前用户加入 docker 组：`sudo usermod -aG docker $USER`

### 额外安装

```bash
npm install -g @volar/server http-server
paru -S wechat-bin
```

### 导入配置

从 [dotfiles 仓库](https://github.com/zhuyuqinlan/dotfiles) 导入配置：

```bash
cd ~ && git clone https://github.com/zhuyuqinlan/dotfiles.git
cd dotfiles
stow .
```

### nvim cmake 开发

```bash
cmake -DCMAKE_EXPORT_COMPILE_COMMANDS=ON ..
```

## 音频驱动

```bash
sudo pacman -S pipewire pipewire-pulse pipewire-alsa pipewire-jack wireplumber
```

| 包 | 作用 |
|----|------|
| pipewire | 核心音频服务 |
| pipewire-pulse | PulseAudio 兼容层 |
| pipewire-alsa | ALSA 兼容 |
| pipewire-jack | JACK 兼容 |
| wireplumber | 会话管理器（设备策略、音频路由） |

### 启动并开启开机自启

```bash
systemctl --user --now enable pipewire pipewire-pulse wireplumber
```

### 验证

```bash
pactl info | grep "Server Name"    # 查看 PulseAudio 接口是否被 PipeWire 接管
wpctl status                       # 查看设备音量状态
```
