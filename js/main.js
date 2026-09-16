// 🌟 Monologue 主题核心交互脚本：暗黑模式与状态记忆
document.addEventListener('DOMContentLoaded', function() {
    const toggleBtn = document.getElementById('theme-toggle');
    if (!toggleBtn) return;

    // 1. 进来页面先查户口：检查用户浏览器 localStorage 里是否存过暗黑偏好
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
        toggleBtn.innerHTML = '☀️ 日间模式';
    }

    // 2. 监听按钮点击事件：自由切换日与夜！
    toggleBtn.addEventListener('click', function() {
        // 切换 body 上的 dark-mode 类名
        document.body.classList.toggle('dark-mode');

        // 判断当前处于什么模式，并改写文字、保存进浏览器硬盘
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            toggleBtn.innerHTML = '☀️ 日间模式';
        } else {
            localStorage.setItem('theme', 'light');
            toggleBtn.innerHTML = '🌙 暗黑模式';
        }
    });
});
// ==========================================================================
// 🚀 STM32 双库全篇联动切换与本地记忆逻辑
// ==========================================================================
window.switchStm32Lib = function(mode) {
    // 1. 切换按钮的高亮状态 (active)
    document.querySelectorAll('.lib-btn, .pill-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-mode') === mode) {
            btn.classList.add('active');
        }
    });

    // 2. 雷达扫描全篇：集体切换代码与文字内容的显隐！
    if (mode === 'std') {
        document.querySelectorAll('.lib-std').forEach(el => el.style.display = '');
        document.querySelectorAll('.lib-hal').forEach(el => el.style.display = 'none');
    } else {
        document.querySelectorAll('.lib-std').forEach(el => el.style.display = 'none');
        document.querySelectorAll('.lib-hal').forEach(el => el.style.display = '');
    }

    // 3. 记入本地硬盘：让全站所有教程联动，下次进文章自动保持！
    localStorage.setItem('stm32-lib-mode', mode);

    // 4. 切换库内容后，页面高度可能发生变化，触发一次 TOC 重新校准
    setTimeout(updateActiveTocLink, 100);
};

// ==========================================================================
// 📑 仿 Vue 官方文档：本页目录 (TOC) 动态生成补漏与滚动监听高亮 (Scroll Spy)
// ==========================================================================
function initTableOfContents() {
    const tocContainer = document.getElementById('page-toc-container');
    const articleContent = document.getElementById('article-main-content');
    if (!tocContainer || !articleContent) return;

    // 1. 如果 Hexo 没能自动生成目录，前端根据 H1/H2/H3 自动构建补漏！
    if (!tocContainer.innerHTML.trim() || tocContainer.innerHTML.trim() === '') {
        const headings = articleContent.querySelectorAll('h1, h2, h3');
        if (headings.length === 0) {
            tocContainer.innerHTML = '<p style="color: var(--text-muted); font-size: 0.85rem; margin: 0;">本页暂无子标题</p>';
            return;
        }

        const ul = document.createElement('ul');
        ul.className = 'toc-list';

        headings.forEach((heading, idx) => {
            if (!heading.id) {
                // 为没有 ID 的标题自动分配合法 ID
                heading.id = 'heading-' + idx + '-' + heading.textContent.trim().replace(/\s+/g, '-');
            }

            const li = document.createElement('li');
            li.className = 'toc-item';
            if (heading.tagName.toLowerCase() === 'h3') {
                li.style.paddingLeft = '1rem';
            }

            const a = document.createElement('a');
            a.className = 'toc-link';
            a.href = '#' + heading.id;
            a.textContent = heading.textContent.trim();
            
            li.appendChild(a);
            ul.appendChild(li);
        });

        tocContainer.appendChild(ul);
    }

    // 2. 绑定平滑滚动点击监听
    tocContainer.querySelectorAll('.toc-link').forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = decodeURIComponent(this.getAttribute('href').substring(1));
            const targetEl = document.getElementById(targetId);
            if (targetEl) {
                e.preventDefault();
                const offsetTop = targetEl.getBoundingClientRect().top + window.pageYOffset - 80;
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
                // 立即高亮当前点击项
                tocContainer.querySelectorAll('.toc-link').forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // 3. 滚动监听高亮 (Scroll Spy)
    window.addEventListener('scroll', updateActiveTocLink, { passive: true });
    updateActiveTocLink();
}

function updateActiveTocLink() {
    const tocLinks = document.querySelectorAll('#page-toc-container .toc-link');
    if (!tocLinks || tocLinks.length === 0) return;

    const scrollPosition = window.scrollY + 120;
    let currentId = null;

    // 遍历正文中的所有锚点标题
    const headings = document.querySelectorAll('#article-main-content h1, #article-main-content h2, #article-main-content h3');
    headings.forEach(heading => {
        if (heading.id && heading.offsetTop <= scrollPosition) {
            currentId = heading.id;
        }
    });

    // 如果还没有滚动到第一个标题，默认选中第一个
    if (!currentId && headings.length > 0 && headings[0].id) {
        currentId = headings[0].id;
    }

    // 更新 TOC 高亮状态
    tocLinks.forEach(link => {
        link.classList.remove('active');
        const href = decodeURIComponent(link.getAttribute('href').substring(1));
        if (href === currentId) {
            link.classList.add('active');
            // 如果 TOC 超长，自动把高亮项滚动到视野中间
            const container = document.getElementById('page-toc-container');
            if (container && container.scrollHeight > container.clientHeight) {
                const linkTop = link.offsetTop - container.offsetTop;
                if (linkTop > container.clientHeight - 60 || linkTop < container.scrollTop) {
                    container.scrollTop = linkTop - container.clientHeight / 2;
                }
            }
        }
    });
}

// 4. 页面初始加载完成初始化
document.addEventListener('DOMContentLoaded', function() {
    const savedLibMode = localStorage.getItem('stm32-lib-mode');
    if (savedLibMode === 'hal' || savedLibMode === 'std') {
        switchStm32Lib(savedLibMode);
    } else {
        // 默认首先高亮显示标准库 (std)
        switchStm32Lib('std');
    }

    // 初始化本页目录
    initTableOfContents();
});