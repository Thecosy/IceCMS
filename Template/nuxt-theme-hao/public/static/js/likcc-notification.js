(function() {
    // 默认跳转函数 - 普通新窗口跳转
    function openNewWindow(url) {
        if (url) {
            window.open(url, '_blank', 'noopener,noreferrer');
        } else {
            console.warn('openNewWindow: URL参数不能为空');
        }
    }

    // 默认跳转函数 - 带提醒的新窗口跳转
    function openNewWindowWithAlert(url, alertMessage) {
        if (url) {
            // 显示提醒信息
            if (alertMessage) {
                alert(alertMessage);
            }
            // 打开新窗口
            window.open(url, '_blank', 'noopener,noreferrer');
        } else {
            console.warn('openNewWindowWithAlert: URL参数不能为空');
        }
    }

    // 定义插件对象
    window.LikccNotification = {
        instances: [],

        // 默认跳转函数
        openNewWindow: openNewWindow,
        openNewWindowWithAlert: openNewWindowWithAlert,

        // 创建弹窗
        create: function(options) {
            // 合并默认配置
            const config = {
                title: '通知',
                content: '这是一条通知内容',
                position: 'center', // center, left-bottom, right-bottom, left-top, right-top
                mainButton: {
                    text: '',
                    color: '#165DFF',
                    callbackFunction: null // 支持函数名或函数引用
                },
                secondaryButton: {
                    text: '',
                    color: '#86909C',
                    callbackFunction: null // 支持函数名或函数引用
                },
                urlPatterns: [],      // 支持多个路径模式的数组
                showOnLoad: true,     // 是否在页面加载时自动显示
                autoClose: 0,         // 自动关闭时间(秒)，0表示不自动关闭
                closeOnClickOutside: true,
                popupInterval: 0,     // 新增：弹窗弹出间隔（小时），0为不限制
                confettiEnable: true  // 新增：是否启用 confetti 爆炸效果
            };
            // 合并用户配置
            if (options) {
                Object.assign(config, options);

                if (options.mainButton) {
                    Object.assign(config.mainButton, options.mainButton);
                }

                if (options.secondaryButton) {
                    Object.assign(config.secondaryButton, options.secondaryButton);
                }
            }

            // 弹窗唯一 key，可用 title 或自定义 id
            const popupKey = 'likcc-notification-' + (config.title ? config.title : 'default');
            // 检查弹出间隔
            if (config.popupInterval && Number(config.popupInterval) > 0) {
                const lastTime = localStorage.getItem(popupKey + '-lastTime');
                const now = Date.now();
                if (lastTime && now - Number(lastTime) < Number(config.popupInterval) * 3600 * 1000) {
                    // 未到间隔时间，不弹出
                    return null;
                }
            }

            // 创建通知实例
            const instance = {
                config: config,
                element: null,
                isOpen: false,

                // 执行回调函数的方法
                executeCallback: function(callbackType, event) {
                    const buttonConfig = callbackType === 'main' ? config.mainButton : config.secondaryButton;
                    // 兼容旧版本的callbackFunction
                    if (buttonConfig.callbackFunction) {
                        if (typeof buttonConfig.callbackFunction === 'string') {
                            // 如果是字符串，尝试从全局作用域获取函数
                            const globalFunction = window[buttonConfig.callbackFunction];
                            if (typeof globalFunction === 'function') {
                                // 检查是否是内置函数，如果是则传递预设参数
                                if (buttonConfig.callbackFunction === 'openNewWindow' && buttonConfig.url) {
                                    globalFunction(buttonConfig.url);
                                } else if (buttonConfig.callbackFunction === 'openNewWindowWithAlert' && buttonConfig.url) {
                                    globalFunction(buttonConfig.url, buttonConfig.alertMessage || '即将跳转');
                                } else {
                                    globalFunction(event, this);
                                }
                            } else {
                                console.warn(`函数 ${buttonConfig.callbackFunction} 未找到`);
                            }
                        } else if (typeof buttonConfig.callbackFunction === 'function') {
                            // 如果是函数引用，直接调用
                            buttonConfig.callbackFunction(buttonConfig.url, buttonConfig.alertMessage || '即将跳转');
                        }
                    }
                },

                // 初始化方法
                init: function() {
                    // 检查URL匹配
                    if (!this.checkUrlPattern()) {
                        return;
                    }

                    // 确保document.body存在
                    if (!document.body) {
                        // 如果body不存在，等待DOM加载完成
                        if (document.readyState === 'loading') {
                            document.addEventListener('DOMContentLoaded', () => {
                                this.init();
                            });
                            return;
                        } else {
                            console.error('document.body is not available');
                            return;
                        }
                    }

                    // 创建DOM元素
                    this.createElement();

                    // 添加到文档
                    document.body.appendChild(this.element);

                    // 如果配置为页面加载时显示
                    if (config.showOnLoad) {
                        setTimeout(() => {
                            this.open();
                        }, 100);
                    }

                    // 添加到实例列表
                    LikccNotification.instances.push(this);
                },

                // 检查URL匹配
                checkUrlPattern: function() {
                    const currentPath = window.location.pathname;

                    // 如果没有设置任何路径模式，不显示弹窗
                    if (!config.urlPatterns || config.urlPatterns.length === 0) {
                        return false;
                    }

                    // 检查是否匹配任何路径模式
                    return config.urlPatterns.some(pattern => {
                        let regexStr = pattern
                                .replace(/\//g, '\\/')
                                .replace(/\*\*/g, '.*')
                                .replace(/\*/g, '[^/]*');
                        if (pattern.endsWith('/**')) {
                            regexStr = '^' + regexStr.replace(/\\\/\.\*\*$/, '\\/.*') + '$';
                        } else {
                            regexStr = '^' + regexStr + '$';
                        }
                        const regex = new RegExp(regexStr);
                        return regex.test(currentPath);
                    });
                },

                // 创建DOM元素
                createElement: function() {
                    // 创建容器元素
                    const container = document.createElement('div');
                    container.className = `likcc-notification-container likcc-notification-container-${config.position}`;
                    container.style.display = 'none';

                    // 创建包裹元素
                    const wrapper = document.createElement('div');
                    wrapper.className = 'likcc-notification-wrapper';

                    // 创建头部
                    const header = document.createElement('div');
                    header.className = 'likcc-notification-header';

                    // 创建标题
                    const title = document.createElement('h3');
                    title.className = 'likcc-notification-title';
                    title.textContent = config.title;

                    // 创建关闭按钮
                    const closeBtn = document.createElement('button');
                    closeBtn.className = 'likcc-notification-close';
                    closeBtn.innerHTML = '&times;';
                    closeBtn.addEventListener('click', () => this.close());

                    // 添加头部元素
                    header.appendChild(title);
                    header.appendChild(closeBtn);

                    // 创建内容
                    const content = document.createElement('div');
                    content.className = 'likcc-notification-content';

                    // 如果内容是HTML字符串
                    if (typeof config.content === 'string' &&
                            (config.content.startsWith('<') || config.content.includes('</'))) {
                        content.innerHTML = config.content;
                    } else {
                        content.textContent = config.content;
                    }

                    // 创建按钮区域
                    const buttons = document.createElement('div');
                    buttons.className = 'likcc-notification-buttons';

                    // 创建主按钮
                    const mainButton = document.createElement('button');
                    mainButton.className = 'likcc-notification-main-button';
                    mainButton.textContent = config.mainButton.text;
                    mainButton.style.backgroundColor = config.mainButton.color;
                    mainButton.addEventListener('click', (e) => {
                        this.executeCallback('main', e);
                        this.close();
                    });

                    // 创建次要按钮
                    const secondaryButton = document.createElement('button');
                    secondaryButton.className = 'likcc-notification-secondary-button';
                    secondaryButton.textContent = config.secondaryButton.text;
                    secondaryButton.style.backgroundColor = config.secondaryButton.color;
                    secondaryButton.addEventListener('click', (e) => {
                        this.executeCallback('secondary', e);
                        this.close();
                    });

                    // 添加按钮
                    buttons.appendChild(mainButton);
                    buttons.appendChild(secondaryButton);

                    // 添加所有元素到包装器
                    wrapper.appendChild(header);
                    wrapper.appendChild(content);
                    wrapper.appendChild(buttons);

                    // 添加包装器到容器
                    container.appendChild(wrapper);

                    // 添加点击外部关闭事件
                    if (config.closeOnClickOutside) {
                        container.addEventListener('click', (e) => {
                            if (e.target === container) {
                                this.close();
                            }
                        });
                    }

                    this.element = container;
                },

                // 打开弹窗
                open: function() {
                    if (this.isOpen) return;

                    this.element.style.display = 'flex';
                    // 添加动画类
                    setTimeout(() => {
                        this.element.classList.add('likcc-notification-container--active');
                    }, 10);

                    // confetti 爆炸效果
                    if (config.confettiEnable && typeof window.confetti === 'function') {
                        window.confetti({
                            particleCount: 100,
                            spread: 70,
                            origin: { y: 0.3 },
                            zIndex: 9999
                        });
                    }

                    this.isOpen = true;

                    // 设置自动关闭
                    if (config.autoClose > 0) {
                        setTimeout(() => {
                            this.close();
                        }, config.autoClose * 1000);
                    }

                    // 记录弹出时间
                    if (config.popupInterval && Number(config.popupInterval) > 0) {
                        const popupKey = 'likcc-notification-' + (config.title ? config.title : 'default');
                        localStorage.setItem(popupKey + '-lastTime', Date.now().toString());
                    }
                },

                // 关闭弹窗
                close: function() {
                    if (!this.isOpen) return;

                    this.element.classList.remove('likcc-notification-container--active');

                    // 动画结束后隐藏
                    setTimeout(() => {
                        this.element.style.display = 'none';
                    }, 300);

                    this.isOpen = false;
                },

                // 更新内容
                updateContent: function(newContent) {
                    if (!this.element) return;

                    const contentElement = this.element.querySelector('.likcc-notification-content');
                    if (contentElement) {
                        // 如果内容是HTML字符串
                        if (typeof newContent === 'string' &&
                                (newContent.startsWith('<') || newContent.includes('</'))) {
                            contentElement.innerHTML = newContent;
                        } else {
                            contentElement.textContent = newContent;
                        }
                    }
                },

                // 销毁实例
                destroy: function() {
                    if (this.element && this.element.parentNode) {
                        this.element.parentNode.removeChild(this.element);
                    }

                    // 从实例列表中移除
                    const index = LikccNotification.instances.indexOf(this);
                    if (index !== -1) {
                        LikccNotification.instances.splice(index, 1);
                    }
                }
            };

            // 初始化实例
            instance.init();

            return instance;
        },

        // 获取所有实例
        getAll: function() {
            return this.instances;
        },

        // 关闭所有弹窗
        closeAll: function() {
            this.instances.forEach(instance => {
                instance.close();
            });
        },

        // 销毁所有实例
        destroyAll: function() {
            this.instances.forEach(instance => {
                instance.destroy();
            });
            this.instances = [];
        }
    };
})();