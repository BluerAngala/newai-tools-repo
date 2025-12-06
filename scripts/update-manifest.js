#!/usr/bin/env node
/**
 * 自动更新 tools-manifest.json
 * 扫描 tools/ 目录下所有工具的 tool.json，合并生成清单文件
 */

const fs = require('fs');
const path = require('path');

const TOOLS_DIR = path.join(__dirname, '..', 'tools');
const MANIFEST_PATH = path.join(__dirname, '..', 'tools-manifest.json');

// 获取目录大小（字节）
function getDirSize(dirPath) {
  let size = 0;
  const files = fs.readdirSync(dirPath);
  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);
    if (stat.isFile()) {
      size += stat.size;
    }
  }
  return size;
}

// 获取工具文件列表
function getToolFiles(dirPath) {
  return fs.readdirSync(dirPath).filter(f => 
    f.endsWith('.html') || f.endsWith('.js') || f.endsWith('.css')
  );
}

// 主函数
function updateManifest() {
  console.log('🔍 扫描工具目录...');
  
  const tools = [];
  const toolDirs = fs.readdirSync(TOOLS_DIR).filter(f => {
    const toolPath = path.join(TOOLS_DIR, f);
    return fs.statSync(toolPath).isDirectory();
  });

  for (const dir of toolDirs) {
    const toolDir = path.join(TOOLS_DIR, dir);
    const toolJsonPath = path.join(toolDir, 'tool.json');
    
    if (!fs.existsSync(toolJsonPath)) {
      console.warn(`⚠️  跳过 ${dir}：缺少 tool.json`);
      continue;
    }

    try {
      const toolConfig = JSON.parse(fs.readFileSync(toolJsonPath, 'utf-8'));
      const files = getToolFiles(toolDir);
      const size = getDirSize(toolDir);

      tools.push({
        key: toolConfig.key || dir,
        name: toolConfig.name,
        icon: toolConfig.icon,
        category: toolConfig.category,
        description: toolConfig.description,
        version: toolConfig.version || '1.0.0',
        files,
        size
      });

      console.log(`✅ ${toolConfig.name} (${dir})`);
    } catch (e) {
      console.error(`❌ 解析 ${dir}/tool.json 失败:`, e.message);
    }
  }

  // 按 key 排序
  tools.sort((a, b) => a.key.localeCompare(b.key));

  // 生成清单
  const manifest = {
    version: '1.0.0',
    updatedAt: new Date().toISOString().split('T')[0],
    tools
  };

  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + '\n');
  console.log(`\n📦 已更新 tools-manifest.json，共 ${tools.length} 个工具`);
}

updateManifest();
