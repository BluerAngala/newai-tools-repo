// 正则表达式测试工具

const regexInput = document.getElementById('regexInput');
const flagsInput = document.getElementById('flagsInput');
const testText = document.getElementById('testText');
const matchResult = document.getElementById('matchResult');
const regexError = document.getElementById('regexError');

// 监听输入变化
regexInput.addEventListener('input', testRegex);
flagsInput.addEventListener('input', testRegex);
testText.addEventListener('input', testRegex);

// 测试正则表达式
function testRegex() {
  const pattern = regexInput.value;
  const flags = flagsInput.value;
  const text = testText.value;
  
  regexError.textContent = '';
  
  if (!pattern) {
    matchResult.innerHTML = '<div class="match-info">输入正则表达式和测试文本后自动匹配</div>';
    return;
  }
  
  if (!text) {
    matchResult.innerHTML = '<div class="match-info">请输入测试文本</div>';
    return;
  }
  
  try {
    const regex = new RegExp(pattern, flags);
    const matches = [];
    let match;
    
    if (flags.includes('g')) {
      while ((match = regex.exec(text)) !== null) {
        matches.push({
          value: match[0],
          index: match.index,
          groups: match.slice(1)
        });
        // 防止无限循环
        if (match.index === regex.lastIndex) {
          regex.lastIndex++;
        }
      }
    } else {
      match = regex.exec(text);
      if (match) {
        matches.push({
          value: match[0],
          index: match.index,
          groups: match.slice(1)
        });
      }
    }
    
    if (matches.length === 0) {
      matchResult.innerHTML = '<div class="match-info">没有匹配结果</div>';
    } else {
      let html = `<div class="match-count">找到 ${matches.length} 个匹配</div>`;
      html += '<div class="matches">';
      matches.forEach((m, i) => {
        html += `<div class="match-item">
          <span class="match-index">#${i + 1}</span>
          <span class="match-value">${escapeHtml(m.value)}</span>
          <span class="match-pos">位置: ${m.index}</span>
        </div>`;
        if (m.groups.length > 0) {
          html += '<div class="match-groups">';
          m.groups.forEach((g, gi) => {
            html += `<span class="group">组${gi + 1}: ${escapeHtml(g || '空')}</span>`;
          });
          html += '</div>';
        }
      });
      html += '</div>';
      
      // 高亮显示
      html += '<div class="highlighted-text">';
      html += highlightMatches(text, pattern, flags);
      html += '</div>';
      
      matchResult.innerHTML = html;
    }
  } catch (e) {
    regexError.textContent = '正则表达式错误: ' + e.message;
    matchResult.innerHTML = '';
  }
}

// 高亮匹配文本
function highlightMatches(text, pattern, flags) {
  try {
    const regex = new RegExp(pattern, flags.includes('g') ? flags : flags + 'g');
    return escapeHtml(text).replace(new RegExp(escapeHtml(pattern), flags.includes('g') ? flags : flags + 'g'), 
      match => `<mark>${match}</mark>`);
  } catch {
    return escapeHtml(text);
  }
}

// HTML 转义
function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// 使用预设正则
function usePreset(pattern) {
  regexInput.value = pattern;
  testRegex();
}
