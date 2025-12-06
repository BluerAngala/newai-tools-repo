// Base64 编解码工具

// 编码
function encode() {
  const input = document.getElementById('input').value;
  const output = document.getElementById('output');
  
  if (!input) {
    showStatus('请输入要编码的文本', 'error');
    return;
  }
  
  try {
    // 支持中文编码
    const encoded = btoa(unescape(encodeURIComponent(input)));
    output.value = encoded;
    showStatus('编码成功', 'success');
  } catch (e) {
    showStatus('编码失败: ' + e.message, 'error');
  }
}

// 解码
function decode() {
  const input = document.getElementById('input').value.trim();
  const output = document.getElementById('output');
  
  if (!input) {
    showStatus('请输入要解码的 Base64 字符串', 'error');
    return;
  }
  
  try {
    // 支持中文解码
    const decoded = decodeURIComponent(escape(atob(input)));
    output.value = decoded;
    showStatus('解码成功', 'success');
  } catch (e) {
    showStatus('解码失败，请检查输入是否为有效的 Base64', 'error');
  }
}

// 复制结果
function copyResult() {
  const output = document.getElementById('output').value;
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
  document.getElementById('input').value = '';
  document.getElementById('output').value = '';
  document.getElementById('status').className = 'status';
  document.getElementById('status').textContent = '';
}

// 显示状态
function showStatus(message, type) {
  const status = document.getElementById('status');
  status.textContent = message;
  status.className = 'status ' + type;
}
