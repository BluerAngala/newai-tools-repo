// 颜色选择器工具

// 初始化
const colorPicker = document.getElementById('colorPicker');
const colorPreview = document.getElementById('colorPreview');

colorPicker.addEventListener('input', function() {
  updateColor(this.value);
});

// 初始显示
updateColor(colorPicker.value);

// 更新颜色显示
function updateColor(hex) {
  colorPreview.style.backgroundColor = hex;
  
  // HEX
  document.getElementById('hexValue').value = hex.toUpperCase();
  
  // RGB
  const rgb = hexToRgb(hex);
  document.getElementById('rgbValue').value = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  
  // HSL
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  document.getElementById('hslValue').value = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
}

// HEX 转 RGB
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 0, g: 0, b: 0 };
}

// RGB 转 HSL
function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

// RGB 转 HEX
function rgbToHex(r, g, b) {
  return '#' + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
}

// 解析颜色输入
function parseColor() {
  const input = document.getElementById('colorInput').value.trim();
  if (!input) return;
  
  let hex = null;
  
  // 尝试解析 HEX
  if (/^#?[0-9a-f]{6}$/i.test(input)) {
    hex = input.startsWith('#') ? input : '#' + input;
  }
  // 尝试解析 RGB
  else if (/^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i.test(input)) {
    const match = input.match(/(\d+)/g);
    hex = rgbToHex(parseInt(match[0]), parseInt(match[1]), parseInt(match[2]));
  }
  // 尝试解析简单的 r,g,b 格式
  else if (/^\d+\s*,\s*\d+\s*,\s*\d+$/.test(input)) {
    const parts = input.split(',').map(s => parseInt(s.trim()));
    hex = rgbToHex(parts[0], parts[1], parts[2]);
  }
  
  if (hex) {
    colorPicker.value = hex;
    updateColor(hex);
  } else {
    alert('无法解析颜色值，请输入有效的 HEX 或 RGB 格式');
  }
}

// 复制值
function copyValue(id) {
  const value = document.getElementById(id).value;
  navigator.clipboard.writeText(value).then(() => {
    // 简单的复制成功提示
    const btn = document.querySelector(`#${id} + button`);
    const originalText = btn.textContent;
    btn.textContent = '已复制';
    setTimeout(() => btn.textContent = originalText, 1000);
  });
}
