// JSON格式化工具

// 美化 JSON
function formatJSON() {
  const input = document.getElementById('jsonInput').value.trim();
  const output = document.getElementById('jsonOutput');
  const status = document.getElementById('status');
  
  if (!input) {
    showStatus('请输入 JSON 数据', 'error');
    return;
  }
  
  try {
    const obj = JSON.parse(input);
    output.textContent = JSON.stringify(obj, null, 2);
    showStatus('格式化成功', 'success');
  } catch (e) {
    showStatus('JSON 格式错误: ' + e.message, 'error');
    output.textContent = '';
  }
}

// 压缩 JSON
function compressJSON() {
  const input = document.getElementById('jsonInput').value.trim();
  const output = document.getElementById('jsonOutput');
  
  if (!input) {
    showStatus('请输入 JSON 数据', 'error');
    return;
  }
  
  try {
    const obj = JSON.parse(input);
    output.textContent = JSON.stringify(obj);
    showStatus('压缩成功', 'success');
  } catch (e) {
    showStatus('JSON 格式错误: ' + e.message, 'error');
    output.textContent = '';
  }
}

// 校验 JSON
function validateJSON() {
  const input = document.getElementById('jsonInput').value.trim();
  const output = document.getElementById('jsonOutput');
  
  if (!input) {
    showStatus('请输入 JSON 数据', 'error');
    return;
  }
  
  try {
    JSON.parse(input);
    showStatus('✓ JSON 格式正确', 'success');
    output.textContent = '';
  } catch (e) {
    showStatus('✗ JSON 格式错误: ' + e.message, 'error');
    output.textContent = '';
  }
}

// 复制结果
function copyResult() {
  const output = document.getElementById('jsonOutput').textContent;
  if (!output) {
    showStatus('没有可复制的内容', 'error');
    return;
  }
  
  navigator.clipboard.writeText(output).then(() => {
    showStatus('已复制到剪贴板', 'success');
  }).catch(() => {
    showStatus('复制失败', 'error');
  });
}

// 清空
function clearAll() {
  document.getElementById('jsonInput').value = '';
  document.getElementById('jsonOutput').textContent = '';
  document.getElementById('status').className = 'status';
  document.getElementById('status').textContent = '';
}

// 显示状态
function showStatus(message, type) {
  const status = document.getElementById('status');
  status.textContent = message;
  status.className = 'status ' + type;
}
