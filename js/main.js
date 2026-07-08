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
    document.querySelectorAll('.lib-btn').forEach(btn => {
        btn.classList.remove('active');
        // 如果按钮自定义属性或者文本匹配，就激活它
        if (btn.getAttribute('data-mode') === mode) {
            btn.classList.add('active');
        }
    });

    // 2. 雷达扫描全篇：集体切换代码与文字内容的显隐！
    if (mode === 'std') {
        document.querySelectorAll('.lib-std').forEach(el => el.style.display = 'block');
        document.querySelectorAll('.lib-hal').forEach(el => el.style.display = 'none');
    } else {
        document.querySelectorAll('.lib-std').forEach(el => el.style.display = 'none');
        document.querySelectorAll('.lib-hal').forEach(el => el.style.display = 'block');
    }

    // 3. 记入本地硬盘：让全站所有教程联动，下次进文章自动保持！
    localStorage.setItem('stm32-lib-mode', mode);
};

// 4. 页面刚加载完时，自动检查用户之前的 STM32 学习偏好！
document.addEventListener('DOMContentLoaded', function() {
    const savedLibMode = localStorage.getItem('stm32-lib-mode');
    if (savedLibMode === 'hal') {
        // 如果用户以前切到过 HAL 库，一进来就自动帮他切好！
        switchStm32Lib('hal');
    }
});