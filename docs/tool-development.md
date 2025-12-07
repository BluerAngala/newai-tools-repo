# 工具开发规范

本文档详细说明如何为 NewAI Tools 开发新工具。

## 一、文件结构

每个工具必须包含以下文件：

```
tools/{tool-key}/
├── tool.json      # 工具元信息（必需）
├── index.html     # 工具页面（必需）
├── index.js       # 工具逻辑（必需）
└── index.css      # 工具样式（可选，使用 daisyUI 时不需要）
```

## 二、公共资源

工具仓库提供了公共的 UI 框架资源，位于 `libs/` 目录：

```
libs/
└── daisyui/
    ├── daisyui.css           # daisyUI 5 核心样式
    ├── themes.css            # daisyUI 5 主题样式
    └── tailwindcss-browser.js # Tailwind CSS 4 浏览器版
```

### 推荐使用 daisyUI 5

新工具推荐使用 daisyUI 5 + Tailwind CSS 4 进行开发，优势：

- 现代化的 UI 组件
- 丰富的主题支持
- 响应式设计开箱即用
- 无需编写自定义 CSS

## 三、tool.json 规范

```json
{
  "key": "tool-key",
  "name": "工具名称",
  "icon": "🔧",
  "category": "dev",
  "description": "工具描述",
  "version": "1.0.0",
  "author": "NewAI",
  "updatedAt": "2025-12-07",
  "tags": ["标签1", "标签2"],
  "features": ["功能特性1", "功能特性2"]
}
```

### 字段说明

| 字段        | 必需 | 说明                      |
| ----------- | ---- | ------------------------- |
| key         | ✅   | 唯一标识，小写字母+连字符 |
| name        | ✅   | 中文名称                  |
| icon        | ✅   | Emoji 图标                |
| category    | ✅   | 分类                      |
| description | ✅   | 一句话描述                |
| version     | ✅   | 语义化版本                |
| author      | ✅   | 作者                      |
| updatedAt   | ✅   | 更新日期 YYYY-MM-DD       |
| tags        | ⬚    | 标签数组                  |
| features    | ⬚    | 功能特性数组              |

### category 可选值

- `dev` - 开发工具
- `encode` - 编码转换
- `image` - 图片处理
- `calculator` - 计算工具
- `productivity` - 效率工具
- `other` - 其他

## 四、index.html 模板（daisyUI 5 版）

```html
<!DOCTYPE html>
<html lang="zh-CN" data-theme="light">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>工具名称</title>
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
    <div class="container mx-auto p-4 max-w-2xl">
      <!-- 标题 -->
      <h1 class="text-2xl font-bold text-center mb-6">🔧 工具名称</h1>

      <!-- 功能卡片 -->
      <div class="card bg-base-100 shadow-sm">
        <div class="card-body">
          <h2 class="card-title text-sm text-base-content/70">功能标题</h2>

          <fieldset class="fieldset">
            <legend class="fieldset-legend">输入</legend>
            <input
              type="text"
              id="input"
              placeholder="请输入..."
              class="input w-full"
            />
          </fieldset>

          <div class="flex gap-2 mt-4">
            <button class="btn btn-primary" onclick="process()">处理</button>
            <button class="btn btn-ghost" onclick="clearInput()">清空</button>
          </div>

          <div
            id="result"
            class="mt-4 p-3 bg-base-200 rounded-lg font-mono text-sm whitespace-pre-wrap hidden"
          ></div>
        </div>
      </div>
    </div>

    <script src="index.js"></script>
  </body>
</html>
```

### HTML 规范

1. 声明 `lang="zh-CN"` 和 `data-theme="light"`
2. 包含 viewport meta 标签
3. 引用本地 daisyUI 资源（相对路径 `../../libs/daisyui/`）
4. 使用 daisyUI 组件类名
5. 标题包含 emoji 图标

## 五、常用 daisyUI 组件

### 按钮

```html
<button class="btn btn-primary">主要按钮</button>
<button class="btn btn-secondary">次要按钮</button>
<button class="btn btn-ghost">幽灵按钮</button>
<button class="btn btn-outline">边框按钮</button>
<button class="btn btn-sm">小按钮</button>
<button class="btn btn-lg">大按钮</button>
```

### 输入框

```html
<input type="text" class="input w-full" placeholder="文本输入" />
<textarea class="textarea w-full h-32" placeholder="多行文本"></textarea>
<select class="select w-full">
  <option>选项1</option>
</select>
```

### 表单字段

```html
<fieldset class="fieldset">
  <legend class="fieldset-legend">字段标题</legend>
  <input type="text" class="input w-full" />
  <p class="label text-xs">提示信息</p>
</fieldset>
```

### 卡片

```html
<div class="card bg-base-100 shadow-sm">
  <div class="card-body">
    <h2 class="card-title">标题</h2>
    <p>内容</p>
    <div class="card-actions justify-end">
      <button class="btn btn-primary">操作</button>
    </div>
  </div>
</div>
```

### 标签页

```html
<div role="tablist" class="tabs tabs-box">
  <button role="tab" class="tab tab-active">标签1</button>
  <button role="tab" class="tab">标签2</button>
</div>
```

### 徽章

```html
<span class="badge badge-primary">标签</span>
<span class="badge badge-outline">边框标签</span>
```

### 开关

```html
<label class="flex items-center gap-2 cursor-pointer">
  <span class="label">开关</span>
  <input type="checkbox" class="toggle toggle-primary" />
</label>
```

### 弹窗

```html
<button onclick="my_modal.showModal()">打开弹窗</button>
<dialog id="my_modal" class="modal">
  <div class="modal-box">
    <h3 class="font-bold text-lg">标题</h3>
    <p class="py-4">内容</p>
    <div class="modal-action">
      <button class="btn" onclick="my_modal.close()">关闭</button>
    </div>
  </div>
  <form method="dialog" class="modal-backdrop"><button>close</button></form>
</dialog>
```

## 六、index.js 模板

```javascript
// 工具名称 - daisyUI 5 版本
// 版本: 1.0.0

/**
 * 处理函数
 */
function process() {
  const input = document.getElementById("input").value.trim();

  // 输入验证
  if (!input) {
    showResult("请输入内容", true);
    return;
  }

  try {
    // 处理逻辑
    const output = doSomething(input);
    showResult(output);
  } catch (err) {
    showResult("处理失败: " + err.message, true);
  }
}

/**
 * 显示结果
 * @param {string} content - 内容
 * @param {boolean} isError - 是否错误
 */
function showResult(content, isError = false) {
  const el = document.getElementById("result");
  el.textContent = content;
  el.classList.remove("hidden", "text-error", "bg-error/10");
  if (isError) {
    el.classList.add("text-error", "bg-error/10");
  }
}

/**
 * 复制到剪贴板
 * @param {string} text - 文本
 */
async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    // 可选：显示 toast 提示
  } catch (err) {
    console.error("复制失败:", err);
  }
}

/**
 * 清空输入
 */
function clearInput() {
  document.getElementById("input").value = "";
  document.getElementById("result").classList.add("hidden");
}

// 初始化
document.addEventListener("DOMContentLoaded", () => {
  // 初始化逻辑
});
```

## 七、常用布局模板

### 输入-输出型（daisyUI 版）

```html
<div class="card bg-base-100 shadow-sm mb-4">
  <div class="card-body">
    <fieldset class="fieldset">
      <legend class="fieldset-legend">输入</legend>
      <textarea
        id="input"
        class="textarea w-full h-32"
        placeholder="请输入..."
      ></textarea>
    </fieldset>
  </div>
</div>

<div class="flex gap-2 justify-center mb-4">
  <button class="btn btn-primary" onclick="process()">处理</button>
  <button class="btn btn-ghost" onclick="clearInput()">清空</button>
</div>

<div class="card bg-base-100 shadow-sm">
  <div class="card-body">
    <fieldset class="fieldset">
      <legend class="fieldset-legend">输出</legend>
      <div
        id="result"
        class="p-3 bg-base-200 rounded-lg font-mono text-sm min-h-20"
      ></div>
    </fieldset>
    <div class="card-actions justify-end mt-2">
      <button class="btn btn-sm btn-outline" onclick="copyResult()">
        复制
      </button>
    </div>
  </div>
</div>
```

### 双向转换型（daisyUI 版）

```html
<div class="card bg-base-100 shadow-sm mb-4">
  <div class="card-body">
    <h2 class="card-title text-sm">编码</h2>
    <div class="flex gap-2">
      <input
        type="text"
        id="plainInput"
        class="input flex-1"
        placeholder="原文"
      />
      <button class="btn btn-primary" onclick="encode()">编码 →</button>
    </div>
    <div
      id="encodeResult"
      class="mt-2 p-3 bg-base-200 rounded-lg font-mono text-sm hidden"
    ></div>
  </div>
</div>

<div class="card bg-base-100 shadow-sm">
  <div class="card-body">
    <h2 class="card-title text-sm">解码</h2>
    <div class="flex gap-2">
      <input
        type="text"
        id="encodedInput"
        class="input flex-1"
        placeholder="编码后"
      />
      <button class="btn btn-primary" onclick="decode()">← 解码</button>
    </div>
    <div
      id="decodeResult"
      class="mt-2 p-3 bg-base-200 rounded-lg font-mono text-sm hidden"
    ></div>
  </div>
</div>
```

## 八、主题支持

daisyUI 5 支持多种主题，通过 `data-theme` 属性切换：

```html
<html data-theme="light">
  <!-- 亮色主题 -->
  <html data-theme="dark">
    <!-- 暗色主题 -->
  </html>
</html>
```

### 主题切换按钮

```html
<label class="swap swap-rotate">
  <input type="checkbox" class="theme-controller" value="dark" />
  <span class="swap-on">🌙</span>
  <span class="swap-off">☀️</span>
</label>
```

## 九、更新清单

完成工具开发后，更新 `tools-manifest.json`：

```json
{
  "version": "1.0.0",
  "updatedAt": "2025-12-07",
  "tools": [
    {
      "key": "my-tool",
      "name": "我的工具",
      "icon": "🔧",
      "category": "dev",
      "description": "工具描述",
      "version": "1.0.0",
      "author": "NewAI",
      "updatedAt": "2025-12-07",
      "files": ["index.html", "index.js", "tool.json"],
      "size": 5000
    }
  ]
}
```

### size 计算

```bash
# 计算文件总大小（字节）
wc -c tools/my-tool/index.* tools/my-tool/tool.json | tail -1
```

## 十、开发检查清单

- [ ] 创建 `tools/{key}/` 目录
- [ ] 创建 `tool.json`（包含 tags 和 features）
- [ ] 创建 `index.html`（使用 daisyUI 5）
- [ ] 创建 `index.js`
- [ ] 更新 `tools-manifest.json`
- [ ] 本地测试功能
- [ ] 计算并填写 `size`

## 十一、注意事项

1. **使用本地资源** - 引用 `../../libs/daisyui/` 下的文件
2. **响应式设计** - 使用 Tailwind 响应式类（sm:、lg:）
3. **中文界面** - 界面文字使用中文
4. **即时反馈** - 操作后立即显示结果
5. **错误友好** - 使用 daisyUI 的 alert 或 toast 显示错误
6. **复制功能** - 结果提供复制按钮
7. **主题兼容** - 使用 daisyUI 语义化颜色（base-100、primary 等）

## 十二、示例工具

参考以下工具的完整实现：

- [media-publisher](../tools/media-publisher/) - daisyUI 5 版本示例
- [timestamp](../tools/timestamp/) - 传统 CSS 版本示例
