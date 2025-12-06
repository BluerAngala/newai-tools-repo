# 工具开发规范

本文档详细说明如何为 NewAI Tools 开发新工具。

## 一、文件结构

每个工具必须包含以下文件：

```
tools/{tool-key}/
├── tool.json      # 工具元信息（必需）
├── index.html     # 工具页面（必需）
├── index.js       # 工具逻辑（必需）
└── index.css      # 工具样式（必需）
```

## 二、tool.json 规范

```json
{
  "key": "tool-key",           // 唯一标识，小写字母+连字符
  "name": "工具名称",           // 中文名称
  "icon": "🔧",                // Emoji 图标
  "category": "dev",           // 分类
  "description": "工具描述",    // 一句话描述
  "version": "1.0.0"           // 语义化版本
}
```

### key 命名规则

- 使用小写字母和连字符
- 简洁明了，如 `json-formatter`、`base64-encoder`
- 不使用下划线或驼峰

### category 可选值

- `dev` - 开发工具
- `encode` - 编码转换
- `image` - 图片处理
- `calculator` - 计算工具
- `productivity` - 效率工具
- `other` - 其他

## 三、index.html 模板

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>工具名称</title>
  <link rel="stylesheet" href="index.css">
</head>
<body>
  <div class="container">
    <h1>🔧 工具名称</h1>
    
    <!-- 功能卡片 -->
    <div class="card">
      <h2>功能标题</h2>
      <div class="input-group">
        <input type="text" id="input" placeholder="请输入...">
        <button class="btn" onclick="process()">处理</button>
      </div>
      <div class="result" id="result"></div>
    </div>
  </div>
  
  <script src="index.js"></script>
</body>
</html>
```

### HTML 规范

1. 声明 `lang="zh-CN"`
2. 包含 viewport meta 标签
3. 使用 `.container` 作为根容器
4. 使用 `.card` 包裹功能模块
5. 标题包含 emoji 图标

## 四、index.css 模板

```css
/* 基础重置 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* 页面 */
body {
  font-family: system-ui, -apple-system, sans-serif;
  background: #f5f5f5;
  min-height: 100vh;
  padding: 20px;
}

/* 容器 */
.container {
  max-width: 600px;
  margin: 0 auto;
}

/* 标题 */
h1 {
  text-align: center;
  color: #333;
  margin-bottom: 24px;
}

/* 卡片 */
.card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.card h2 {
  font-size: 14px;
  color: #666;
  margin-bottom: 12px;
}

/* 输入组 */
.input-group {
  display: flex;
  gap: 8px;
}

.input-group input,
.input-group textarea,
.input-group select {
  flex: 1;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
}

.input-group textarea {
  resize: vertical;
  min-height: 80px;
}

/* 按钮 */
.btn {
  padding: 10px 20px;
  background: #4f46e5;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  white-space: nowrap;
}

.btn:hover {
  background: #4338ca;
}

.btn-secondary {
  background: #6b7280;
}

.btn-secondary:hover {
  background: #4b5563;
}

.btn-sm {
  padding: 6px 12px;
  font-size: 12px;
}

/* 结果 */
.result {
  margin-top: 12px;
  padding: 12px;
  background: #f0f9ff;
  border-radius: 6px;
  font-family: monospace;
  word-break: break-all;
  white-space: pre-wrap;
}

.result:empty {
  display: none;
}

.error {
  color: #dc2626;
  background: #fef2f2;
}

.success {
  color: #16a34a;
  background: #f0fdf4;
}

/* 工具栏 */
.toolbar {
  display: flex;
  gap: 8px;
  margin-top: 12px;
}
```

### CSS 规范

- 主色调：`#4f46e5`（Indigo）
- 圆角：6px（小）、12px（大）
- 间距：8px 的倍数
- 字体：系统字体栈
- 代码展示：`monospace`

## 五、index.js 模板

```javascript
// 工具名称
// 版本: 1.0.0

/**
 * 处理函数
 */
function process() {
  const input = document.getElementById('input').value.trim();
  const resultEl = document.getElementById('result');
  
  // 输入验证
  if (!input) {
    showResult('result', '请输入内容', true);
    return;
  }
  
  try {
    // 处理逻辑
    const output = doSomething(input);
    showResult('result', output);
  } catch (err) {
    showResult('result', '处理失败: ' + err.message, true);
  }
}

/**
 * 显示结果
 * @param {string} id - 元素 ID
 * @param {string} content - 内容
 * @param {boolean} isError - 是否错误
 */
function showResult(id, content, isError = false) {
  const el = document.getElementById(id);
  el.textContent = content;
  el.className = 'result' + (isError ? ' error' : '');
}

/**
 * 复制到剪贴板
 * @param {string} text - 文本
 */
async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    // 可选：显示提示
  } catch (err) {
    console.error('复制失败:', err);
  }
}

/**
 * 清空输入
 */
function clearInput() {
  document.getElementById('input').value = '';
  document.getElementById('result').textContent = '';
}

// 初始化（可选）
document.addEventListener('DOMContentLoaded', () => {
  // 初始化逻辑
});
```

### JS 规范

1. 文件开头注释工具名称和版本
2. 函数添加 JSDoc 注释
3. 使用 `const`/`let`，禁止 `var`
4. 错误处理使用 try-catch
5. 异步操作使用 async/await

## 六、常用布局模板

### 输入-输出型

适用于：格式化、转换、计算

```html
<div class="card">
  <h2>输入</h2>
  <textarea id="input" rows="4" placeholder="请输入..."></textarea>
</div>

<div class="card">
  <div class="toolbar">
    <button class="btn" onclick="process()">处理</button>
    <button class="btn btn-secondary" onclick="clearInput()">清空</button>
  </div>
</div>

<div class="card">
  <h2>输出</h2>
  <div class="result" id="result"></div>
  <div class="toolbar">
    <button class="btn btn-sm" onclick="copyResult()">复制</button>
  </div>
</div>
```

### 双向转换型

适用于：编码/解码、加密/解密

```html
<div class="card">
  <h2>编码</h2>
  <div class="input-group">
    <input type="text" id="plainInput" placeholder="原文">
    <button class="btn" onclick="encode()">编码 →</button>
  </div>
  <div class="result" id="encodeResult"></div>
</div>

<div class="card">
  <h2>解码</h2>
  <div class="input-group">
    <input type="text" id="encodedInput" placeholder="编码后">
    <button class="btn" onclick="decode()">← 解码</button>
  </div>
  <div class="result" id="decodeResult"></div>
</div>
```

### 实时预览型

适用于：颜色选择、正则测试

```html
<div class="card">
  <h2>输入</h2>
  <input type="text" id="input" oninput="preview()">
</div>

<div class="card">
  <h2>预览</h2>
  <div id="preview"></div>
</div>
```

## 七、更新清单

完成工具开发后，更新 `tools-manifest.json`：

```json
{
  "version": "1.0.0",
  "updatedAt": "2025-12-06",
  "tools": [
    // ... 现有工具
    {
      "key": "my-tool",
      "name": "我的工具",
      "icon": "🔧",
      "category": "dev",
      "description": "工具描述",
      "version": "1.0.0",
      "files": ["index.html", "index.js", "index.css"],
      "size": 3000
    }
  ]
}
```

### size 计算

```bash
# 计算文件总大小（字节）
wc -c tools/my-tool/index.* | tail -1
```

## 八、开发检查清单

- [ ] 创建 `tools/{key}/` 目录
- [ ] 创建 `tool.json`
- [ ] 创建 `index.html`
- [ ] 创建 `index.css`
- [ ] 创建 `index.js`
- [ ] 更新 `tools-manifest.json`
- [ ] 本地测试功能
- [ ] 计算并填写 `size`

## 九、注意事项

1. **无外部依赖** - 使用原生 JS，避免大型库
2. **离线可用** - 资源本地化，不依赖 CDN
3. **响应式** - 适配不同窗口大小
4. **中文界面** - 界面文字使用中文
5. **即时反馈** - 操作后立即显示结果
6. **错误友好** - 清晰的错误提示
7. **复制功能** - 结果提供复制按钮

## 十、示例工具

参考 [timestamp](../tools/timestamp/) 工具的完整实现。
