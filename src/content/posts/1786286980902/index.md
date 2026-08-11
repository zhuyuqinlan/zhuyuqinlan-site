---
title: Fedora安装与配置
published: 2026-08-09
description: ''
image: 'fedora&kde.png'
tags: []
category: ''
draft: false 
lang: ''
---
## 下载iso
> https://fedoraproject.org/zh-Hans/kde/download

![安装界面](安装界面.jpg "安装界面")

## 输入法
### 安装输入法本体
```bash
sudo dnf install fcitx5 fcitx5-rime fcitx5-configtool fcitx5-chinese-addons
```
### 设置kde虚拟键盘

![虚拟键盘](虚拟键盘.png "虚拟键盘")
## 添加fpmfusion
```bash
sudo dnf install \
https://mirrors.rpmfusion.org/free/fedora/rpmfusion-free-release-$(rpm -E %fedora).noarch.rpm \
https://mirrors.rpmfusion.org/nonfree/fedora/rpmfusion-nonfree-release-$(rpm -E %fedora).noarch.rpm
```
### 安装完成后刷新缓存
```bash
sudo dnf clean all
sudo dnf makecache
```
## 安装jetbrains-mono字体
```bash
sudo dnf install jetbrains-mono-fonts
```
### 刷新字体缓存&检查
```bash
fc-cache -fv
fc-list | grep -i "JetBrains"
```
![字体](font_jetbria.png "字体")
![字体效果](font_jetbria.png "字体效果")

## 安装常用软件
### vscode
```bash
# 导入gpg密钥 + 添加vscode源
sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc
echo -e "[code]\nname=Visual Studio Code\nbaseurl=https://packages.microsoft.com/yumrepos/vscode\nenabled=1\nautorefresh=1\ntype=rpm-md\ngpgcheck=1\ngpgkey=https://packages.microsoft.com/keys/microsoft.asc" | sudo tee /etc/yum.repos.d/vscode.repo > /dev/null

# 更新缓存并安装
sudo dnf check-update
sudo dnf install code
```
### 微信-QQ-飞书-腾讯会议
```bash
sudo flatpak remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo
flatpak install com.tencent.WeChat com.qq.QQ cn.feishu.Feishu com.tencent.wemeet
```
![桌面-1](桌面-1.png "桌面-1")

### 安装常用包
```bash
sudo dnf install vim xeyes proxychains-ng fastfetch
```
## 快照系统搭建Snapper + Btrfs Assistant + grub
### 安装 Snapper
```bash
sudo dnf install snapper
```
#### 创建 root 配置
```bash
sudo snapper -c root create-config /
```

#### 检查
```bash
sudo snapper list-configs
```
### 开启自动快照
```bash
sudo systemctl enable --now snapper-timeline.timer
sudo systemctl enable --now snapper-cleanup.timer
```
#### 测试
```bash
sudo snapper create -d "test"
```
### 安装 Btrfs Assistant
> 这是管理btrfs的GUI软件
```bash
sudo dnf install btrfs-assistant
```
### 安装 grub-btrfs
```bash
sudo dnf copr enable kylegospo/grub-btrfs
sudo dnf install grub-btrfs
```

### 更新 GRUB
```bash
sudo grub2-mkconfig -o /boot/grub2/grub.cfg
```

#### 重启
```bash
sudo reboot
```

## zsh配置
### 安装zsh
```bash
sudo dnf install zsh fzf eza
```