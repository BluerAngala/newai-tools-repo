# NewAI Tools Repository

工具仓库，托管 NewAI Tools 扩展的所有工具文件。

## 结构

```
tools/
├── timestamp/          # 时间戳转换
│   ├── tool.json       # 工具元信息
│   ├── index.html      # 主页面
│   ├── index.js        # 脚本
│   └── index.css       # 样式
└── ...
tools-manifest.json     # 工具清单
```

## 添加新工具

1. 在 `tools/` 下创建工具目录
2. 添加 `tool.json`、`index.html`、`index.js`、`index.css`
3. 更新 `tools-manifest.json`

## 部署

推送到 GitHub 后自动部署到 GitHub Pages。
