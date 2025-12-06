// 二维码工具

// 切换标签页
function switchTab(tab) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.panel').forEach(p => p.style.display = 'none');
  
  if (tab === 'generate') {
    document.querySelector('.tab:first-child').classList.add('active');
    document.getElementById('generatePanel').style.display = 'block';
  } else {
    document.querySelector('.tab:last-child').classList.add('active');
    document.getElementById('scanPanel').style.display = 'block';
  }
}

// 生成二维码（使用 Canvas 绘制简单二维码）
function generateQR() {
  const input = document.getElementById('qrInput').value.trim();
  if (!input) {
    alert('请输入要生成二维码的内容');
    return;
  }
  
  const qrcodeDiv = document.getElementById('qrcode');
  const resultDiv = document.getElementById('qrResult');
  
  // 使用在线 API 生成二维码
  const size = 200;
  const apiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(input)}`;
  
  qrcodeDiv.innerHTML = `<img id="qrImage" src="${apiUrl}" alt="二维码" />`;
  resultDiv.style.display = 'block';
}

// 下载二维码
function downloadQR() {
  const img = document.getElementById('qrImage');
  if (!img) return;
  
  // 创建下载链接
  const link = document.createElement('a');
  link.href = img.src;
  link.download = 'qrcode.png';
  link.click();
}

// 识别二维码
function scanQR() {
  const file = document.getElementById('qrFile').files[0];
  const resultDiv = document.getElementById('scanResult');
  
  if (!file) return;
  
  // 使用在线 API 识别二维码
  const formData = new FormData();
  formData.append('file', file);
  
  resultDiv.innerHTML = '识别中...';
  
  fetch('https://api.qrserver.com/v1/read-qr-code/', {
    method: 'POST',
    body: formData
  })
  .then(res => res.json())
  .then(data => {
    if (data && data[0] && data[0].symbol && data[0].symbol[0]) {
      const result = data[0].symbol[0].data;
      if (result) {
        resultDiv.innerHTML = `<strong>识别结果：</strong><br><span class="result-text">${escapeHtml(result)}</span>
          <button onclick="copyText('${escapeHtml(result).replace(/'/g, "\\'")}')">复制</button>`;
      } else {
        resultDiv.innerHTML = '未能识别二维码内容';
      }
    } else {
      resultDiv.innerHTML = '未能识别二维码内容';
    }
  })
  .catch(() => {
    resultDiv.innerHTML = '识别失败，请重试';
  });
}

// HTML 转义
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// 复制文本
function copyText(text) {
  navigator.clipboard.writeText(text).then(() => {
    alert('已复制到剪贴板');
  });
}
