---
title: ArchLinux初始化（gnome+sway）
published: 2026-08-03 10:48:10
tags: [ArchLinux, Sway, Wayland, gnome]
category: 桌面
image: banner.png
---
安装ArchLinux系统可以参考：

> [https://arch.icekylin.online](https://arch.icekylin.online/)
>
> [https://wiki.archlinuxcn.org/wiki/%E5%AE%89%E8%A3%85%E6%8C%87%E5%8D%97](https://wiki.archlinuxcn.org/wiki/%E5%AE%89%E8%A3%85%E6%8C%87%E5%8D%97)
>
> [https://zhuanlan.zhihu.com/p/25308291469](https://zhuanlan.zhihu.com/p/25308291469)
>
我的配置
> https://github.com/zhuyuqinlan/dotfiles.git

## 安装tty字体并设置大号字体
```bash
sudo pacman -S terminus-font vim
```

编辑： /etc/vconsole.conf  

```text
FONT=ter-132b
```

## 基础桌面环境
### 配置archlinuxcn镜像源
+ 编辑/etc/pacman.conf在末尾参数加入

```bash
[archlinuxcn]
SigLevel = Optional TrustedOnly
Server = http://repo.archlinuxcn.org/$arch
```

+ 刷新并导入key

```bash
sudo pacman -Syyu
sudo pacman -S archlinuxcn-keyring
```

## 安装gnome桌面环境
```bash
sudo pacman -S gnome gnome-browser-connector
sudo systemctl enable gdm
sudo reboot
```

## 安装sway
```bash
sudo pacman -S sway polkit-gnome swayidle cliphist waybar alacritty wofi stow imv alsa-utils proxychains-ng git docker docker-compose podman patch base-develparu fastfetch firefox wl-clipboard swappy firefox-i18n-zh-cn noto-fonts-cjk ttf-arimo-nerd otf-font-awesome ttf-jetbrains-mono-nerd ttf-dejavu ttf-liberation brightnessctl xdg-desktop-portal-wlr xdg-desktop-portal-gtk mako
```

```bash
paru -s ttf-ms-fonts ttf-twemoji idlehack-git
```

### 把docker-compose插件设置docker插件
1. 查找位置

```bash
which docker-compose
```

2. 创建插件目录

```bash
mkdir -p ~/.docker/cli-plugins
```

3. 建立软链接

```bash
ln -s /usr/bin/docker-compose ~/.docker/cli-plugins/docker-compose
```

4. 测试

```bash
docker compose version
```

## 使用stow同步配置
```bash
git clone git@github.com:zhuyuqinlan/dotfiles.git
```

## zsh
```bash
sudo pacman -S zsh zsh-completions zsh-autosuggestions zsh-syntax-highlighting fzf eza bat tmux yazi less
```

### 设置
```bash
chsh -s /usr/bin/zsh
echo $SHELL
```

## 安装开发工具
```bash
paru -S visual-studio-code-bin
sudo pacman -S uv fnm rustup jdk8-openjdk jdk17-openjdk jdk21-openjdk maven
```

## 给启动脚本加上权限
```bash
chmod +x ~/.local/script/start.sh
```

## 编辑desktop文件指向start.sh
```bash
sudo vim /usr/share/wayland-sessions/sway.desktop
```

修改Exec为

```bash
/home/zhuyuqinlan/.local/script/start-sway.sh
```

## 配置中文环境
##  生成中文 locale  
1. 编辑并取消注释zh_CN.UTF-8 UTF-8

```bash
sudo vim /etc/locale.gen
```

2. 重新生成

```bash
sudo locale-gen
locale -a
```

## 输入法
## 安装
```bash
sudo pacman -S fcitx5 fcitx5-rime fcitx5-configtool
```

### 雾凇拼音
```bash
paru -S rime-ice-git
```

## 配置swap目录
> 用于休眠（告诉系统将内存放到硬盘哪个分区）
>

### 检查
+ 休眠要把 **内存内容写进 swap**，如果 swap 不够大（至少要 ≥ 内存大小），休眠会失败。

```bash
swapon --show
free -h
```

看 swap 大小是否 ≥ 内存大小。

### 内核参数没设置 resume 设备
+ 内核启动时需要知道从哪个 swap 恢复
+ 在 `/etc/default/grub` 里添加（举例）

```plain
GRUB_CMDLINE_LINUX_DEFAULT="quiet resume=/dev/nvme0n1p3"
```

`/dev/nvme0n1p3` 要换成你的 swap 分区。

## 快照
```bash
sudo pacman -S timeshift
```

