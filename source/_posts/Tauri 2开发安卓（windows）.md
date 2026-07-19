---
title: Tauri 2 开发安卓应用（Windows 环境搭建）
date: 2026-07-19 18:45:30
tags: [Tauri, Rust, Android, Windows, 移动开发]
categories: [教程]
---

> 本文记录在 Windows 上搭建 Tauri 2 Android 开发环境的步骤。
> 下载地址：[Android Studio 官网](https://developer.android.com/studio)

## 使用 Android Studio 中的 SDK Manager 安装以下内容

+ Android SDK Platform
+ Android SDK Platform-Tools
+ NDK (Side by side)
+ Android SDK Build-Tools
+ Android SDK Command-line Tools

## 临时设置环境变量

```powershell
$env:JAVA_HOME = "C:\Program Files\Android\Android Studio\jbr"
$env:ANDROID_HOME = "$env:LocalAppData\Android\Sdk"

$VERSION = Get-ChildItem -Name "$env:LocalAppData\Android\Sdk\ndk"
$env:NDK_HOME = "$env:LocalAppData\Android\Sdk\ndk\$VERSION"
```

> 本文仅覆盖 Android 开发环境配置，完整的 Tauri 项目创建和构建流程请参考 [Tauri 官方文档](https://v2.tauri.app/start/prerequisites/)。

