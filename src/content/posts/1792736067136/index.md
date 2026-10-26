---
title: UE Cesium二维瓦片和3D tiles导入和设置
published: 2026-10-23
description: 'UE5.8 Cesium插件学习day2'
image: 'Snipaste_2026-10-26_11-52-43.png'
tags: [UE5, Cesium]
category: "学习"
draft: false
lang: ''
---
## 设置相机Actor坐标和角度
1. 选中DynamicPawn Actor
![设置坐标](Snipaste_2026-10-23_17-19-13.png "设置坐标")
2. 先双击DynamicPawn选中CesiumGeoreference Actor点击Place Georeference Origin Here
![调整标准坐标锚点](Snipaste_2026-10-23_17-25-27.png "调整标准坐标锚点")

## 导入3D tiles和二维图片瓦片
1. 选中添加tiles Actor
![3D tiles Actor](Snipaste_2026-10-23_17-14-59.png "3D tiles Actor")

2. 调整3D tiles参数为Ellipsoid
![调整参数](Snipaste_2026-10-23_15-17-31.png "调整参数")

3. 添加二维瓦片组件
![二维瓦片](Snipaste_2026-10-23_15-15-21.png "二维瓦片")
```text
http://127.0.0.1:9000/static/cecep-energy/tiles/{z}/{x}/{reverseY}.jpg
```

4. 填写二维瓦片链接
![二维瓦片链接](Snipaste_2026-10-23_17-26-38.png "二维瓦片链接")
```text
http://127.0.0.1:9000/static/cecep-energy/3d-tiles/1/tileset.json
```