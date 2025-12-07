// 自媒体助手

// 数据存储
const formData = {
  post: { images: [], tags: [] },
  article: { cover: null, tags: [] },
  video: { file: null, cover: null, tags: [] }
};

let currentTab = 'post';

// 微信配置
const wechatConfig = {
  isOriginal: true,
  claimSourceType: 4,
  enableReward: true,
  enableAd: true,
  allowReprint: false,
  albumTitles: [],
  paySettings: {
    enabled: false,
    fee: 1000,
    previewPercent: 91,
    description: '付费阅读全文'
  }
};

// 工具函数
const $id = (id) => document.getElementById(id);
const $all = (selector) => document.querySelectorAll(selector);

// 切换标签页
function switchTab(tabName) {
  currentTab = tabName;
  // 更新标签激活状态
  $all('.tab').forEach((tab) => {
    tab.classList.toggle('active', tab.dataset.tab === tabName);
  });
  // 切换表单显示 - 移除所有 hidden，再添加需要隐藏的
  const forms = ['postForm', 'articleForm', 'videoForm'];
  forms.forEach((id) => {
    const el = $id(id);
    if (id === `${tabName}Form`) {
      el.classList.remove('hidden');
    } else {
      el.classList.add('hidden');
    }
  });
}

// 更新平台计数
function updatePlatformCount() {
  const all = $all('input[name="platform"]');
  const checked = $all('input[name="platform"]:checked');
  $id('cnCount').textContent = `${checked.length}/${all.length}`;
}


// 文件选择
function pickFile(accept, multiple, callback) {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = accept;
  input.multiple = multiple;
  input.onchange = (e) => callback(multiple ? Array.from(e.target.files) : e.target.files[0]);
  input.click();
}

// 上传图片
function uploadImage(type) {
  pickFile('image/*', true, (files) => {
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        formData[type].images.push(e.target.result);
        renderImagePreview(type);
      };
      reader.readAsDataURL(file);
    });
  });
}

// 粘贴图片
async function pasteImage(type) {
  try {
    const items = await navigator.clipboard.read();
    for (const item of items) {
      const imgType = item.types.find((t) => t.startsWith('image/'));
      if (imgType) {
        const blob = await item.getType(imgType);
        const reader = new FileReader();
        reader.onload = (e) => {
          formData[type].images.push(e.target.result);
          renderImagePreview(type);
        };
        reader.readAsDataURL(blob);
      }
    }
  } catch {
    alert('无法读取剪贴板图片');
  }
}

// 渲染图片预览
function renderImagePreview(type) {
  const container = $id(`${type}Images`);
  container.innerHTML = formData[type].images
    .map((img, i) => `
      <div class="img-item">
        <img src="${img}">
        <button class="remove-btn" onclick="removeImage('${type}',${i})">✕</button>
      </div>
    `)
    .join('');
}

// 删除图片
function removeImage(type, i) {
  formData[type].images.splice(i, 1);
  renderImagePreview(type);
}

// 上传封面
function uploadCover(type) {
  pickFile('image/*', false, (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      formData[type].cover = e.target.result;
      $id(`${type}CoverPlaceholder`).classList.add('hidden');
      const preview = $id(`${type}CoverPreview`);
      preview.src = e.target.result;
      preview.classList.remove('hidden');
    };
    reader.readAsDataURL(file);
  });
}

// 上传视频
function uploadVideo() {
  pickFile('video/*', false, (file) => {
    formData.video.file = file;
    $id('videoPlaceholder').classList.add('hidden');
    const preview = $id('videoPreview');
    preview.src = URL.createObjectURL(file);
    preview.classList.remove('hidden');
  });
}

// 标签输入处理
function handleTagInput(event, type) {
  if (event.key !== 'Enter') return;
  event.preventDefault();
  const input = $id(`${type}TagInput`);
  const tag = input.value.trim();
  if (tag && !formData[type].tags.includes(tag)) {
    formData[type].tags.push(tag);
    renderTags(type);
  }
  input.value = '';
}

// 渲染标签
function renderTags(type) {
  $id(`${type}Tags`).innerHTML = formData[type].tags
    .map((tag, i) => `<span class="tag">${tag}<button onclick="removeTag('${type}',${i})">✕</button></span>`)
    .join('');
}

// 删除标签
function removeTag(type, i) {
  formData[type].tags.splice(i, 1);
  renderTags(type);
}


// 发布内容
async function publishContent() {
  const platforms = Array.from($all('input[name="platform"]:checked')).map((cb) => cb.value);
  if (!platforms.length) {
    alert('请至少选择一个发布平台');
    return;
  }

  const getValue = (id) => $id(id).value.trim();
  const data = {
    type: currentTab,
    platforms,
    autoPublish: $id('autoPublish').checked
  };

  if (currentTab === 'post') {
    if (!getValue('postTitle')) return alert('请输入标题');
    if (!getValue('postContent')) return alert('请输入内容');
    Object.assign(data, {
      title: getValue('postTitle'),
      content: getValue('postContent'),
      images: formData.post.images,
      tags: formData.post.tags
    });
  } else if (currentTab === 'article') {
    if (!getValue('articleTitle')) return alert('请输入标题');
    if (!getValue('articleContent')) return alert('请输入文章内容');
    Object.assign(data, {
      title: getValue('articleTitle'),
      content: getValue('articleContent'),
      cover: formData.article.cover,
      tags: formData.article.tags
    });
  } else {
    if (!getValue('videoTitle')) return alert('请输入标题');
    if (!formData.video.file) return alert('请上传视频');
    Object.assign(data, {
      title: getValue('videoTitle'),
      video: formData.video.file,
      cover: formData.video.cover,
      tags: formData.video.tags
    });
  }

  console.log('发布数据:', data);

  for (const platform of platforms) {
    if (platform === 'wechat') await publishToWechat(data);
  }
}

// 微信公众号发布
async function publishToWechat(data) {
  if (data.type !== 'article') {
    alert('微信公众号目前仅支持发布文章类型');
    return;
  }
  if (!data.cover) {
    alert('微信公众号文章需要封面图');
    return;
  }

  const articleData = { title: data.title, content: data.content, cover: data.cover };
  
  // 通过 postMessage 请求父窗口打开微信后台（绕过 sandbox 限制）
  window.parent.postMessage({
    type: 'OPEN_EXTERNAL_URL',
    payload: {
      url: 'https://mp.weixin.qq.com/',
      publishData: { articleData, weixinOptions: wechatConfig }
    }
  }, '*');

  // 显示非阻塞提示
  showToast('正在打开微信公众号后台，请确保已登录...');
}

// 显示非阻塞提示
function showToast(message, duration = 3000) {
  // 移除已有的 toast
  const existing = document.getElementById('toast-notification');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'toast-notification';
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    bottom: 24px;
    left: 50%;
    transform: translateX(-50%);
    background: #333;
    color: #fff;
    padding: 12px 24px;
    border-radius: 8px;
    font-size: 14px;
    z-index: 10000;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    animation: toast-in 0.3s ease;
  `;

  // 添加动画样式
  if (!document.getElementById('toast-style')) {
    const style = document.createElement('style');
    style.id = 'toast-style';
    style.textContent = `
      @keyframes toast-in {
        from { opacity: 0; transform: translateX(-50%) translateY(20px); }
        to { opacity: 1; transform: translateX(-50%) translateY(0); }
      }
      @keyframes toast-out {
        from { opacity: 1; transform: translateX(-50%) translateY(0); }
        to { opacity: 0; transform: translateX(-50%) translateY(20px); }
      }
    `;
    document.head.appendChild(style);
  }

  document.body.appendChild(toast);

  // 自动消失
  setTimeout(() => {
    toast.style.animation = 'toast-out 0.3s ease forwards';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// 微信配置弹窗
function openWechatConfig() {
  const c = wechatConfig, p = c.paySettings;
  $id('wxIsOriginal').checked = c.isOriginal;
  $id('wxClaimSourceType').value = c.claimSourceType;
  $id('wxEnableReward').checked = c.enableReward;
  $id('wxEnableAd').checked = c.enableAd;
  $id('wxAllowReprint').checked = c.allowReprint;
  $id('wxAlbumTitles').value = c.albumTitles.join(',');
  $id('wxPayEnabled').checked = p.enabled;
  $id('wxPayFee').value = p.fee / 100;
  $id('wxPreviewPercent').value = p.previewPercent;
  $id('wxPayDescription').value = p.description;
  $id('wechatConfigModal').classList.remove('hidden');
}

function closeWechatConfig() {
  $id('wechatConfigModal').classList.add('hidden');
}

function saveWechatConfig() {
  const c = wechatConfig, p = c.paySettings;
  c.isOriginal = $id('wxIsOriginal').checked;
  c.claimSourceType = parseInt($id('wxClaimSourceType').value);
  c.enableReward = $id('wxEnableReward').checked;
  c.enableAd = $id('wxEnableAd').checked;
  c.allowReprint = $id('wxAllowReprint').checked;
  const titles = $id('wxAlbumTitles').value.trim();
  c.albumTitles = titles ? titles.split(',').map((s) => s.trim()).filter(Boolean) : [];
  p.enabled = $id('wxPayEnabled').checked;
  p.fee = Math.round(parseFloat($id('wxPayFee').value) * 100);
  p.previewPercent = parseInt($id('wxPreviewPercent').value);
  p.description = $id('wxPayDescription').value;
  console.log('微信配置已保存:', c);
  closeWechatConfig();
}
