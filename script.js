// 🎥 **视频悬停播放与暂停**
document.querySelectorAll('.video-card video').forEach(video => {
    video.addEventListener('mouseover', () => video.play());
    video.addEventListener('mouseout', () => video.pause());
});

// 📚 **视频分类切换**
function switchCategory(category) {
    document.querySelectorAll('.video-card').forEach(card => {
        card.style.display = card.dataset.category === category ? '' : 'none';
    });
}

// 🔍 **视频搜索**
function searchVideo() {
    const query = document.getElementById('search-input').value.trim().toLowerCase(); // 去除空格并转换为小写
    if (query === "") {
        return; // 终止函数执行
    }
    document.querySelectorAll('.video-card').forEach(card => {
        const description = card.querySelector('.description').textContent.toLowerCase();
        card.style.display = description.includes(query) ? '' : 'none';
    });
}




// ✍️ **填充搜索框**
function fillSearch(text) {
    const searchInput = document.getElementById('search-input');
    searchInput.value = text;
    searchVideo();
}

// 🔍 **搜索框支持 Enter 键搜索**
const searchInput = document.getElementById('search-input');
searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        searchVideo();
    }
});


// 💾 **下载视频**
function downloadVideo(url) {
    const a = document.createElement('a');
    a.href = url;
    a.download = url;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// 🖼️ **下载图片**
function downloadImage(url) {
    fetch(url)
        .then(response => response.blob())
        .then(blob => {
            const blobUrl = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = blobUrl;
            a.download = url.split('/').pop(); // 提取文件名
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(blobUrl); // 释放 Blob URL
        })
        .catch(err => console.error('下载失败:', err));
}

// 💡 **显示/隐藏建议框**
function showSuggestions() {
    document.getElementById('suggestions').style.display = 'flex';
}

function hideSuggestions() {
    setTimeout(() => {
        document.getElementById('suggestions').style.display = 'none';
    }, 200);
}

// 📺 **模态框：放大视频和图片**
document.querySelectorAll('.video-card video').forEach(video => {
    video.addEventListener('click', () => {
        openModal('video', video.src);
    });
});

document.querySelectorAll('.video-card img').forEach(img => {
    img.addEventListener('click', () => {
        openModal('image', img.src);
    });
});

// 打开模态框
function openModal(contentType, contentSrc) {
    const modal = document.getElementById('modal');
    const modalVideo = document.getElementById('modal-video');
    const modalImage = document.getElementById('modal-image');

    if (contentType === 'video') {
        modalVideo.style.display = 'block';
        modalImage.style.display = 'none';
        modalVideo.src = contentSrc;
        modalVideo.setAttribute('controls', false); // 确保视频无控制器
    } else if (contentType === 'image') {
        modalVideo.style.display = 'none';
        modalImage.style.display = 'block';
        modalImage.src = contentSrc;
    }

    modal.style.display = 'flex';
}

// 关闭模态框
function closeModal() {
    const modal = document.getElementById('modal');
    const modalVideo = document.getElementById('modal-video');

    modal.style.display = 'none';
    modalVideo.pause();
    modalVideo.src = ''; // 清除视频源以停止加载
}

// ❓ **特殊问题模态框**
        // 获取必要元素
        const questionButton1 = document.querySelector('#unique-question-button-id1');
        const modalOverlay1 = document.querySelector('#unique-modal-overlay-id1');
        const modal1 = document.querySelector('#unique-modal-id1');
        const closeButton1 = document.querySelector('#unique-close-button-id1');
        const categoryButtons1 = document.querySelectorAll('.category-btn1');
        const contentAreas1 = document.querySelectorAll('.content1');

        // 打开模态框
        questionButton1.addEventListener('click', () => {
            modalOverlay1.style.display = 'flex';
        });

        // 关闭模态框
        closeButton1.addEventListener('click', () => {
            modalOverlay1.style.display = 'none';
        });

        modalOverlay1.addEventListener('click', (e) => {
            if (e.target === modalOverlay1) {
                modalOverlay1.style.display = 'none';
            }
        });

        // 切换内容区域
        categoryButtons1.forEach(button => {
            button.addEventListener('click', () => {
                const targetContent = button.getAttribute('data-target');
                contentAreas1.forEach(content => {
                    content.classList.toggle('active', content.id === targetContent);
                });
                categoryButtons1.forEach(btn => {
                    btn.classList.toggle('active', btn === button);
                });
            });
        });

// 🛡️ **全局容错机制**（可选）
document.addEventListener('DOMContentLoaded', () => {
    console.log('脚本加载完成！');
});

document.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) { // 滚动超过 50px 时触发
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

//草稿
document.addEventListener('DOMContentLoaded', () => {
    // 获取所有的视频卡片元素（可根据需要调整选择器）
    const videoCards = document.querySelectorAll('.video-card');

    // 创建 Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 元素进入视口，添加可见类
                entry.target.classList.add('visible');
            } else {
                // 元素离开视口，移除可见类
                entry.target.classList.remove('visible');
            }
        });
    }, {
        threshold: 0.1, // 元素 10% 可见时触发
    });

    // 观察每个视频卡片
    videoCards.forEach(card => {
        card.classList.add('hidden'); // 初始化为隐藏状态
        observer.observe(card);
    });
});

    const huojian01Btn = document.getElementById('huojian01Btn');
    let isDragging = false;
    let hasDragged = false;
    let offsetX, offsetY;

    // 显示或隐藏按钮
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        huojian01Btn.classList.add('show');
      } else {
        huojian01Btn.classList.remove('show');
      }
    });

    // 滚动到顶部功能
    huojian01Btn.addEventListener('click', (e) => {
      if (!hasDragged) { // 仅在未拖动时执行
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      hasDragged = false; // 重置拖动状态
    });

    // 按下开始拖动（鼠标和触摸）
    const startDrag = (e) => {
      isDragging = true;
      hasDragged = false; // 重置拖动状态
      const clientX = e.clientX || e.touches[0].clientX;
      const clientY = e.clientY || e.touches[0].clientY;
      offsetX = clientX - huojian01Btn.getBoundingClientRect().left;
      offsetY = clientY - huojian01Btn.getBoundingClientRect().top;
      huojian01Btn.style.transition = 'none';
      e.preventDefault(); // 阻止默认行为，防止页面滚动
    };

    // 拖动过程（鼠标和触摸）
    const moveDrag = (e) => {
      if (isDragging) {
        hasDragged = true; // 标记发生了拖动
        const clientX = e.clientX || e.touches[0].clientX;
        const clientY = e.clientY || e.touches[0].clientY;
        let x = clientX - offsetX;
        let y = clientY - offsetY;

        // 防止按钮越界
        const btnWidth = huojian01Btn.offsetWidth;
        const btnHeight = huojian01Btn.offsetHeight;
        const maxX = window.innerWidth - btnWidth;
        const maxY = window.innerHeight - btnHeight;

        x = Math.max(0, Math.min(x, maxX));
        y = Math.max(0, Math.min(y, maxY));

        huojian01Btn.style.left = `${x}px`;
        huojian01Btn.style.top = `${y}px`;
      }
    };

    // 松开结束拖动（鼠标和触摸）
    const endDrag = () => {
      if (isDragging) {
        isDragging = false;
        huojian01Btn.style.transition = '';
      }
    };

    // 处理触摸和鼠标事件
    huojian01Btn.addEventListener('mousedown', startDrag);
    huojian01Btn.addEventListener('touchstart', startDrag);
    document.addEventListener('mousemove', moveDrag);
    document.addEventListener('touchmove', moveDrag);
    document.addEventListener('mouseup', endDrag);
    document.addEventListener('touchend', endDrag);

    // 触摸事件的 click 模拟
    huojian01Btn.addEventListener('touchend', (e) => {
      if (!hasDragged) {
        huojian01Btn.click(); // 触摸结束时触发点击事件
      }
    });

        // 获取元素
    const agreeCheckbox = document.getElementById("huoshi002AgreeCheckbox");
    const enterBtn = document.getElementById("huoshi002EnterBtn");
    const popupOverlay = document.getElementById("huoshi002Overlay");

    // 勾选框状态改变时，控制按钮可点击性
    agreeCheckbox.addEventListener('change', function() {
        if (agreeCheckbox.checked) {
            enterBtn.disabled = false;  // 启用按钮
        } else {
            enterBtn.disabled = true;   // 禁用按钮
        }
    });

    // 进入按钮点击事件
    enterBtn.addEventListener('click', function() {
        // 隐藏弹窗
        popupOverlay.style.display = 'none';
        
        // 这里可以放置任何进入网站后的逻辑，暂时保持页面不变
        // 如果需要跳转到其他页面，可以使用window.location.href
        // window.location.href = "https://www.example.com"; // 例如跳转到主页面

        // 这里不需要修改页面内容，只需要隐藏弹窗
    });

        // 显示iframe窗口
    function showIframe() {
        document.getElementById('AI01-iframe-container').style.display = 'block';
    }
    
    // 隐藏iframe窗口
    function hideIframe() {
        document.getElementById('AI01-iframe-container').style.display = 'none';
    }