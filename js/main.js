// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// 导航栏滚动效果
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
        return;
    }
    
    if (currentScroll > lastScroll) {
        // 向下滚动
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // 向上滚动
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// 项目卡片动画
const projectCards = document.querySelectorAll('.project-card');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

projectCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.6s ease-out';
    observer.observe(card);
});

// 项目详情弹窗功能
document.addEventListener('DOMContentLoaded', () => {
    // 获取所有查看详情按钮
    const viewDetailsButtons = document.querySelectorAll('.view-details');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.modal-close');

    // 打开弹窗
    viewDetailsButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const projectId = button.getAttribute('data-project');
            const modal = document.getElementById(`${projectId}-modal`);
            if (modal) {
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden'; // 防止背景滚动
            }
        });
    });

    // 关闭弹窗
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto'; // 恢复背景滚动
            }
        });
    });

    // 点击弹窗外部关闭
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });

    // ESC键关闭弹窗
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                if (modal.style.display === 'block') {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            });
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // 获取所有项目图片和按钮
    const projectImages = document.querySelectorAll('.project-image');
    const viewDetailsBtns = document.querySelectorAll('.view-details');
    const modals = document.querySelectorAll('.modal');
    const closeBtns = document.querySelectorAll('.modal-close');

    // 打开模态窗口的函数
    function openModal(modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        // 延迟添加 show 类以触发动画
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
    }

    // 关闭模态窗口的函数
    function closeModal(modal) {
        modal.classList.remove('show');
        modal.classList.add('hide');
        // 等待动画完成后隐藏模态窗口
        setTimeout(() => {
            modal.style.display = 'none';
            modal.classList.remove('hide');
            document.body.style.overflow = 'auto';
        }, 300);
    }

    // 为项目图片添加点击事件
    projectImages.forEach(image => {
        image.addEventListener('click', function() {
            const projectId = this.closest('.project-item').querySelector('.view-details').dataset.project;
            const modal = document.getElementById(`${projectId}-modal`);
            if (modal) {
                openModal(modal);
            }
        });
    });

    // 为查看详情按钮添加点击事件
    viewDetailsBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const projectId = this.dataset.project;
            const modal = document.getElementById(`${projectId}-modal`);
            if (modal) {
                openModal(modal);
            }
        });
    });

    // 为关闭按钮添加点击事件
    closeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal);
        });
    });

    // 点击模态窗口外部关闭
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal(this);
            }
        });
    });

    // ESC 键关闭模态窗口
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const openModal = document.querySelector('.modal.show');
            if (openModal) {
                closeModal(openModal);
            }
        }
    });
});

// 处理查看所有项目按钮
document.addEventListener('DOMContentLoaded', function() {
    const viewAllBtn = document.getElementById('viewAllBtn');
    if (viewAllBtn) {
        viewAllBtn.addEventListener('click', function() {
            // 显示所有隐藏的项目
            const hiddenProjects = document.querySelectorAll('.project-item.hidden');
            hiddenProjects.forEach((project, index) => {
                setTimeout(() => {
                    project.classList.remove('hidden');
                    project.style.animation = 'fadeInUp 1s ease-out forwards';
                }, index * 200); // 每个项目延迟200ms显示
            });
            
            // 隐藏按钮
            const btnContainer = document.querySelector('.view-all-btn-container');
            btnContainer.style.animation = 'fadeOutDown 0.5s ease-out forwards';
            setTimeout(() => {
                btnContainer.style.display = 'none';
            }, 500);
        });
    }
});

// 处理模态窗口中的查看所有详情按钮
document.addEventListener('DOMContentLoaded', function() {
    const viewAllDetailsBtns = document.querySelectorAll('.view-all-details-btn');
    
    viewAllDetailsBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            const hiddenSections = modal.querySelectorAll('.detail-section.hidden');
            
            // 显示所有隐藏的部分
            hiddenSections.forEach((section, index) => {
                setTimeout(() => {
                    section.classList.remove('hidden');
                    section.style.animation = 'fadeInUp 1s ease-out forwards';
                }, index * 200); // 每个部分延迟200ms显示
            });
            
            // 隐藏按钮
            const btnContainer = this.parentElement;
            btnContainer.style.animation = 'fadeOutDown 0.5s ease-out forwards';
            setTimeout(() => {
                btnContainer.style.display = 'none';
            }, 500);
        });
    });
});

// 初始化 Amplitude
if (typeof amplitude !== 'undefined') {
    amplitude.init('YOUR_API_KEY', {
        defaultTracking: true
    });
}

// 视频控制功能
document.addEventListener('DOMContentLoaded', function() {
    let lastVideoTime = 0;
    const vegetableModal = document.getElementById('vegetable-monitor-modal');
    
    // 获取视频iframe
    function getVideoIframe() {
        return vegetableModal ? vegetableModal.querySelector('.video-container iframe') : null;
    }
    
    // 获取YouTube播放器
    function getYouTubePlayer(iframe) {
        return iframe ? new YT.Player(iframe) : null;
    }
    
    // 保存视频播放位置
    function saveVideoTime(player) {
        if (player && typeof player.getCurrentTime === 'function') {
            lastVideoTime = player.getCurrentTime();
        }
    }
    
    // 暂停视频
    function pauseVideo(player) {
        if (player && typeof player.pauseVideo === 'function') {
            saveVideoTime(player);
            player.pauseVideo();
        }
    }

    // 加载YouTube API
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // 当YouTube API准备就绪时
    window.onYouTubeIframeAPIReady = function() {
        const iframe = getVideoIframe();
        if (iframe) {
            const player = getYouTubePlayer(iframe);
            
            // 监听模态窗口关闭事件
            const closeBtn = vegetableModal.querySelector('.modal-close');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => pauseVideo(player));
            }

            // 点击模态窗口外部关闭时暂停视频
            vegetableModal.addEventListener('click', (e) => {
                if (e.target === vegetableModal) {
                    pauseVideo(player);
                }
            });

            // ESC键关闭时暂停视频
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && vegetableModal.classList.contains('show')) {
                    pauseVideo(player);
                }
            });

            // 重新打开模态窗口时恢复播放位置
            const vegetableBtn = document.querySelector('[data-project="vegetable-monitor"]');
            if (vegetableBtn) {
                vegetableBtn.addEventListener('click', () => {
                    if (player && lastVideoTime > 0) {
                        setTimeout(() => {
                            player.seekTo(lastVideoTime);
                        }, 1000);
                    }
                });
            }
        }
    };
});

// WeChat弹窗功能
document.addEventListener('DOMContentLoaded', function() {
    const wechatBtns = document.querySelectorAll('.wechat-btn');
    const wechatPopup = document.querySelector('.wechat-popup');
    const popupBackdrop = document.querySelector('.popup-backdrop');
    const closePopupBtn = document.querySelector('.close-popup');

    function showPopup() {
        wechatPopup.classList.add('show');
        popupBackdrop.classList.add('show');
    }

    function hidePopup() {
        wechatPopup.classList.remove('show');
        popupBackdrop.classList.remove('show');
    }

    wechatBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            showPopup();
        });
    });

    closePopupBtn.addEventListener('click', hidePopup);
    popupBackdrop.addEventListener('click', hidePopup);
}); 