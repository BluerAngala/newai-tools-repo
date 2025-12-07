# NewAI Tools Repository

工具仓库，托管 NewAI Tools 浏览器扩展的所有工具文件。

## 目录结构

```
NewAI-Tools-repo/
├── libs/                     # 公共资源库
│   └── daisyui/              # daisyUI 5 + Tailwind CSS 4
│       ├── daisyui.css       # daisyUI 核心样式
│       ├── themes.css        # daisyUI 主题
│       └── tailwindcss-browser.js  # Tailwind CSS 浏览器版
├── tools/                    # 工具目录
│   └── {tool-key}/           # 单个工具
│       ├── tool.json         # 工具元信息
│       ├── index.html        # 主页面
│       ├── index.js          # 脚本逻辑
│       └── index.css         # 样式（可选）
├── tools-manifest.json       # 工具清单（扩展读取）
└── docs/                     # 开发文档
    └── tool-development.md   # 工具开发规范
```

## 快速开始

### 1. 创建工具目录

```bash
mkdir tools/my-tool
```

### 2. 创建 tool.json

```json
{
  "key": "my-tool",
  "name": "我的工具",
  "icon": "🔧",
  "category": "dev",
  "description": "工具功能描述",
  "version": "1.0.0",
  "author": "NewAI",
  "updatedAt": "2025-12-07",
  "tags": ["标签1", "标签2"],
  "features": ["功能1", "功能2"]
}
```

### 3. 创建页面文件（daisyUI 5 版）

```html
<!DOCTYPE html>
<html lang="zh-CN" data-theme="light">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>我的工具</title>
    <!-- daisyUI 5 + Tailwind CSS 4 本地资源 -->

    <link
      href="https://cdn.jsdelivr.net/npm/daisyui@5"
      rel="stylesheet"
      type="text/css"
    />
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
    <link
      href="https://cdn.jsdelivr.net/npm/daisyui@5/themes.css"
      rel="stylesheet"
      type="text/css"
    />
  </head>
  <body class="bg-base-200 min-h-screen">
    <!-- 工具内容 -->
  </body>
</html>
```

参考 [工具开发规范](docs/tool-development.md) 了解更多。

### 4. 更新清单

在 `tools-manifest.json` 的 `tools` 数组中添加：

```json
{
  "key": "my-tool",
  "name": "我的工具",
  "icon": "🔧",
  "category": "dev",
  "description": "工具功能描述",
  "version": "1.0.0",
  "author": "NewAI",
  "updatedAt": "2025-12-07",
  "files": ["index.html", "index.js", "tool.json"],
  "size": 5000
}
```

## 公共资源

### daisyUI 5 + Tailwind CSS 4

位于 `libs/daisyui/` 目录，工具通过相对路径引用：


```html
<link href="https://cdn.jsdelivr.net/npm/daisyui@5" rel="stylesheet" type="text/css" />
<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
<link href="https://cdn.jsdelivr.net/npm/daisyui@5/themes.css" rel="stylesheet" type="text/css" />
```

本地 `NewAI-Tools-repo\libs\daisyui` 保存了本地版本，可以本地使用。

## 工具分类

| category       | 说明     | 示例                     |
| -------------- | -------- | ------------------------ |
| `dev`          | 开发工具 | JSON 格式化、正则测试    |
| `encode`       | 编码转换 | Base64、时间戳、URL 编码 |
| `image`        | 图片处理 | 颜色选择、二维码         |
| `calculator`   | 计算工具 | 进制转换、单位换算       |
| `productivity` | 效率工具 | 自媒体助手               |
| `other`        | 其他     | -                        |

## 现有工具

| 工具                                         | 分类         | 描述             | UI 框架   |
| -------------------------------------------- | ------------ | ---------------- | --------- |
| 📢 [media-publisher](tools/media-publisher/) | productivity | 自媒体内容分发   | daisyUI 5 |
| ⏰ [timestamp](tools/timestamp/)             | encode       | 时间戳与日期互转 | 原生 CSS  |
| 🔐 [base64](tools/base64/)                   | encode       | Base64 编解码    | 原生 CSS  |
| 📋 [json-format](tools/json-format/)         | dev          | JSON 格式化      | 原生 CSS  |
| 🔍 [regex](tools/regex/)                     | dev          | 正则表达式测试   | 原生 CSS  |
| 🎨 [color-picker](tools/color-picker/)       | image        | 颜色选择器       | 原生 CSS  |
| 📱 [qrcode](tools/qrcode/)                   | image        | 二维码工具       | 原生 CSS  |

## 开发文档

- [工具开发规范](docs/tool-development.md) - 完整的开发指南和代码模板

## 部署

推送到 `main` 分支后自动部署到 GitHub Pages。

## 许可

MIT License
