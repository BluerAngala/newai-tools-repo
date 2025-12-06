// 时间戳转换工具

// 更新当前时间显示
function updateCurrentTime() {
  const now = new Date();
  const timestamp = Math.floor(now.getTime() / 1000);
  
  document.getElementById('currentTimestamp').textContent = `时间戳: ${timestamp}`;
  document.getElementById('currentDate').textContent = `日期: ${formatDate(now)}`;
}

// 格式化日期
function formatDate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  const h = String(date.getHours()).padStart(2, '0');
  const min = String(date.getMinutes()).padStart(2, '0');
  const s = String(date.getSeconds()).padStart(2, '0');
  return `${y}-${m}-${d} ${h}:${min}:${s}`;
}

// 时间戳转日期
function timestampToDate() {
  const input = document.getElementById('timestampInput').value.trim();
  const result = document.getElementById('dateResult');
  
  if (!input) {
    result.textContent = '请输入时间戳';
    return;
  }
  
  let ts = parseInt(input, 10);
  if (isNaN(ts)) {
    result.textContent = '无效的时间戳';
    return;
  }
  
  // 自动判断秒/毫秒
  if (ts > 9999999999) {
    // 毫秒
    result.textContent = formatDate(new Date(ts));
  } else {
    // 秒
    result.textContent = formatDate(new Date(ts * 1000));
  }
}

// 日期转时间戳
function dateToTimestamp() {
  const input = document.getElementById('dateInput').value;
  const result = document.getElementById('timestampResult');
  
  if (!input) {
    result.textContent = '请选择日期时间';
    return;
  }
  
  const date = new Date(input);
  const seconds = Math.floor(date.getTime() / 1000);
  const millis = date.getTime();
  
  result.innerHTML = `秒: ${seconds}<br>毫秒: ${millis}`;
}

// 初始化
updateCurrentTime();
setInterval(updateCurrentTime, 1000);

// 设置默认日期为当前时间
document.getElementById('dateInput').value = new Date().toISOString().slice(0, 16);
