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
## 安装jetbrains-mono-nerd字体
```bash
curl -LO https://github.com/ryanoasis/nerd-fonts/releases/download/v3.5.0/JetBrainsMono.zip
mkdir -p ~/.local/share/fonts
unzip -d ~/.local/share/fonts JetBrainsMono.zip 
rm JetBrainsMono.zip 
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
## 安装开发工具
### 安装开发包
```bash
sudo dnf install @development-tools
```
### jdk
* 下载脚本vim install-jdk.sh
```bash
#!/bin/bash
# ========================================
# JDK安装根目录
# ========================================
JDK_ROOT="$HOME/program/jdk"
mkdir -p "${JDK_ROOT}"
download_and_extract() {
    local tar_file="$1"
    local url="$2"
    local target_dir="$3"
    echo "========================================"
    echo "开始安装: ${tar_file}"
    echo "安装位置: ${target_dir}"
    # 下载
    curl -L --progress-bar -o "${tar_file}" "${url}"
    if [ $? -ne 0 ]; then
        echo "❌ 下载失败: ${tar_file}"
        return 1
    fi
    echo "✅ 下载完成，开始解压"
    # 创建目标目录
    mkdir -p "${target_dir}"
    # 解压
    tar -zxf "${tar_file}" \
        --strip-components=1 \
        -C "${target_dir}"
    if [ $? -ne 0 ]; then
        echo "❌ 解压失败: ${tar_file}"
        return 1
    fi
    echo "✅ 安装完成: ${target_dir}"
    rm -f "${tar_file}"
}
# ========================================
# JDK下载地址
# ========================================
download_and_extract \
"jdk-8.tar.gz" \
"https://mirrors.tuna.tsinghua.edu.cn/Adoptium/8/jdk/x64/linux/OpenJDK8U-jdk_x64_linux_hotspot_8u502b07.tar.gz" \
"${JDK_ROOT}/jdk8"

download_and_extract \
"jdk-11.tar.gz" \
"https://mirrors.tuna.tsinghua.edu.cn/Adoptium/11/jdk/x64/linux/OpenJDK11U-jdk_x64_linux_hotspot_11.0.32_9.tar.gz" \
"${JDK_ROOT}/jdk11"

download_and_extract \
"jdk-17.tar.gz" \
"https://mirrors.tuna.tsinghua.edu.cn/Adoptium/17/jdk/x64/linux/OpenJDK17U-jdk_x64_linux_hotspot_17.0.20_8.tar.gz" \
"${JDK_ROOT}/jdk17"

download_and_extract \
"jdk-21.tar.gz" \
"https://mirrors.tuna.tsinghua.edu.cn/Adoptium/21/jdk/x64/linux/OpenJDK21U-jdk_x64_linux_hotspot_21.0.12_8.tar.gz" \
"${JDK_ROOT}/jdk21"

download_and_extract \
"jdk-25.tar.gz" \
"https://mirrors.tuna.tsinghua.edu.cn/Adoptium/25/jdk/x64/linux/OpenJDK25U-jdk_x64_linux_hotspot_25.0.4_7.tar.gz" \
"${JDK_ROOT}/jdk25"

echo
echo "========================================"
echo "🎉 全部安装完成"
echo "JDK目录:"
echo
ls -la "${JDK_ROOT}"
```
* 配置环境变量
```bash
export JAVA_HOME=$HOME/program/jdk/jdk17
export PATH=$JAVA_HOME/bin:$PATH
```
### fnm
```bash
curl -fsSL https://fnm.vercel.app/install | bash
```
### uv maven
```bash
sudo dnf install uv maven
```
### rust
```bash
sudo dnf install rustup
rustup-init
```
## dotfiles
> https://github.com/zhuyuqinlan/dotfiles

### 安装stow
```bash
sudo dnf install stow
```
## zsh配置
### 安装zsh
```bash
sudo dnf install zsh fzf eza zsh-autosuggestions zsh-syntax-highlighting
```
### 同步配置
```bash
cd ~/dotfiles
stow zsh
```
### 设置为默认的shell
```bash
chsh -s /usr/bin/zsh
echo $SHELL
```