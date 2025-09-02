var btf = {



    // 修改时间显示"最近"
    diffDateExact: function (d, more = false) {
        const dateNow = new Date();
        const datePost = new Date(d);
        const dateDiff = dateNow.getTime() - datePost.getTime();
        const minute = 1000 * 60;
        const hour = minute * 60;
        const day = hour * 24;
        const month = day * 30;

        let result;
        if (more) {
            const monthCount = dateDiff / month;
            const dayCount = dateDiff / day;
            const hourCount = dateDiff / hour;
            const minuteCount = dateDiff / minute;

            if (monthCount >= 1) {
                result = datePost.toLocaleDateString().replace(/\//g, "-");
            } else if (dayCount >= 1) {
                result = parseInt(dayCount) + " " + GLOBAL_CONFIG.date_suffix.day;
            } else if (hourCount >= 1) {
                result = parseInt(hourCount) + " " + GLOBAL_CONFIG.date_suffix.hour;
            } else if (minuteCount >= 1) {
                result = parseInt(minuteCount) + " " + GLOBAL_CONFIG.date_suffix.min;
            } else {
                result = GLOBAL_CONFIG.date_suffix.just;
            }
        } else {
            result = parseInt(dateDiff / day);
        }
        return result;
    },

    loadLightbox: ele => {

        const jqLoadAndRun = () => {
            const $fancyboxEle = GLOBAL_CONFIG.lightbox === 'fancybox'
                ? ele
                : []
            const fbLengthNoZero = $fancyboxEle.length > 0

            if (fbLengthNoZero) {
                btf.isJqueryLoad(() => {
                    fbLengthNoZero && addFancybox($fancyboxEle)
                })
            }
        }

        /**
         * fancybox
         */
        const addFancybox = function (ele) {
            const runFancybox = (ele) => {
                ele.each(function (i, o) {
                    const $this = $(o)
                    const lazyloadSrc = $this.attr('data-lazy-src') || $this.attr('src')
                    const dataCaption = $this.attr('alt') || ''
                    $this.wrap(`<a href="${lazyloadSrc}" data-fancybox="images" data-caption="${dataCaption}" class="fancybox" data-srcset="${lazyloadSrc}"></a>`)
                })

                $().fancybox({
                    selector: '[data-fancybox]',
                    loop: true,
                    transitionEffect: 'slide',
                    protect: true,
                    buttons: ['slideShow', 'fullScreen', 'thumbs', 'close'],
                    hash: false
                })
            }

            if (typeof $.fancybox === 'undefined') {
                // $('head').append(`<link rel="stylesheet" type="text/css" href="${GLOBAL_CONFIG.source.fancybox.css}">`)
                $.getScript(`${GLOBAL_CONFIG.source.fancybox.js}`, function () {
                    runFancybox($(ele))
                })
            } else {
                runFancybox($(ele))
            }
        }

        jqLoadAndRun()

    },
    debounce: function (func, wait, immediate) {
        let timeout
        return function () {
            const context = this
            const args = arguments
            const later = function () {
                timeout = null
                if (!immediate) func.apply(context, args)
            }
            const callNow = immediate && !timeout
            clearTimeout(timeout)
            timeout = setTimeout(later, wait)
            if (callNow) func.apply(context, args)
        }
    },

    throttle: function (func, wait, options) {
        let timeout, context, args
        let previous = 0
        if (!options) options = {}

        const later = function () {
            previous = options.leading === false ? 0 : new Date().getTime()
            timeout = null
            func.apply(context, args)
            if (!timeout) context = args = null
        }

        const throttled = function () {
            const now = new Date().getTime()
            if (!previous && options.leading === false) previous = now
            const remaining = wait - (now - previous)
            context = this
            args = arguments
            if (remaining <= 0 || remaining > wait) {
                if (timeout) {
                    clearTimeout(timeout)
                    timeout = null
                }
                previous = now
                func.apply(context, args)
                if (!timeout) context = args = null
            } else if (!timeout && options.trailing !== false) {
                timeout = setTimeout(later, remaining)
            }
        }

        return throttled
    },

    sidebarPaddingR: () => {
        const innerWidth = window.innerWidth
        const clientWidth = document.body.clientWidth
        const paddingRight = innerWidth - clientWidth
        if (innerWidth !== clientWidth) {
            document.body.style.paddingRight = paddingRight + 'px'
        }
    },

    snackbarShow: (text, showActionFunction = false, duration = 2000, actionText = false) => {
        const { position, bgLight, bgDark } = GLOBAL_CONFIG.Snackbar;
        const bg = document.documentElement.getAttribute("data-theme") === "light" ? bgLight : bgDark;
        const root = document.querySelector(":root");
        root.style.setProperty("--heo-snackbar-time", duration + "ms");

        Snackbar.show({
            text: text,
            backgroundColor: bg,
            onActionClick: showActionFunction,
            actionText: actionText,
            showAction: actionText,
            duration: duration,
            pos: position,
            customClass: "snackbar-css",
        });
    },

    initJustifiedGallerys: function (selector) {
        selector.forEach((function(t) {
                btf.isHidden(t) || fjGallery(t, {
                    itemSelector: ".fj-gallery-item",
                    rowHeight: 240,
                    gutter: 4,
                    onJustify: function() {
                        this.$container.style.opacity = "1"
                    }
                })
            }
        ))
        document.querySelectorAll('#article-container .loadings')[0]?.classList.remove("loadings");
    },

    diffDate: (d, more = false) => {
        const dateNow = new Date()
        const datePost = new Date(d)
        const dateDiff = dateNow.getTime() - datePost.getTime()
        const minute = 1000 * 60
        const hour = minute * 60
        const day = hour * 24
        const month = day * 30

        let result
        if (more) {
            const monthCount = dateDiff / month
            const dayCount = dateDiff / day
            const hourCount = dateDiff / hour
            const minuteCount = dateDiff / minute

            if (monthCount > 12) {
                // result = datePost.toLocaleDateString().replace(/\//g, '-')
                result = datePost.toLocaleDateString()
            } else if (dayCount >= 7) {
                // } else if (monthCount >= 1) {
                result = datePost.toLocaleDateString().substr(5)
                // result = parseInt(monthCount) + ' ' + GLOBAL_CONFIG.date_suffix.month
            } else if (dayCount >= 1) {
                result = parseInt(dayCount) + '' + GLOBAL_CONFIG.date_suffix.day
            } else if (hourCount >= 1) {
                // result = '最近'
                result = parseInt(hourCount) + ' ' + GLOBAL_CONFIG.date_suffix.hour
            } else if (minuteCount >= 1) {
                // result = '最近'
                result = parseInt(minuteCount) + ' ' + GLOBAL_CONFIG.date_suffix.min
            } else {
                result = GLOBAL_CONFIG.date_suffix.just
            }
        } else {
            result = parseInt(dateDiff / day)
        }
        return result
    },

    loadComment: (dom, callback) => {
        if ('IntersectionObserver' in window) {
            const observerItem = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    callback()
                    observerItem.disconnect()
                }
            }, {threshold: [0]})
            observerItem.observe(dom)
        } else {
            callback()
        }
    },


    scrollToDest: (e,t)=>{
        if (e < 0 || t < 0)
            return;
        const n = window.scrollY || window.screenTop;
        if (e -= 70,
        "CSS"in window && CSS.supports("scroll-behavior", "smooth"))
            return void window.scrollTo({
                top: e,
                behavior: "smooth"
            });
        let o = null;
        t = t || 500,
            window.requestAnimationFrame((function i(s) {
                    if (o = o || s,
                    n < e) {
                        const r = s - o;
                        window.scrollTo(0, (e - n) * r / t + n),
                            r < t ? window.requestAnimationFrame(i) : window.scrollTo(0, e)
                    } else {
                        const r = s - o;
                        window.scrollTo(0, n - (n - e) * r / t),
                            r < t ? window.requestAnimationFrame(i) : window.scrollTo(0, e)
                    }
                }
            ))
    },

    fadeIn: (ele, time) => {
        ele.style.cssText = `display:block;animation: to_show ${time}s`
    },

    fadeOut: (ele, time) => {
        ele.addEventListener('animationend', function f() {
            ele.style.cssText = "display: none; animation: '' "
            ele.removeEventListener('animationend', f)
        })
        ele.style.animation = `to_hide ${time}s`
    },

    getParents: (elem, selector) => {
        for (; elem && elem !== document; elem = elem.parentNode) {
            if (elem.matches(selector)) return elem
        }
        return null
    },

    siblings: (ele, selector) => {
        return [...ele.parentNode.children].filter((child) => {
            if (selector) {
                return child !== ele && child.matches(selector)
            }
            return child !== ele
        })
    },

    /**
     *
     * @param {*} selector
     * @param {*} eleType the type of create element
     * @param {*} id id
     * @param {*} cn class name
     */
    wrap: function (selector, eleType, id = '', cn = '') {
        const creatEle = document.createElement(eleType)
        if (id) creatEle.id = id
        if (cn) creatEle.className = cn
        selector.parentNode.insertBefore(creatEle, selector)
        creatEle.appendChild(selector)
    },

    unwrap: function (el) {
        const elParentNode = el.parentNode
        if (elParentNode !== document.body) {
            elParentNode.parentNode.insertBefore(el, elParentNode)
            elParentNode.parentNode.removeChild(elParentNode)
        }
    },

    isJqueryLoad: (fn) => {
        if (typeof jQuery === 'undefined') {
            getScript(GLOBAL_CONFIG.source.jQuery).then(fn)
        } else {
            fn()
        }
    },

    isHidden: (ele) => ele.offsetHeight === 0 && ele.offsetWidth === 0,

    getEleTop: (ele) => {
        let actualTop = ele.offsetTop
        let current = ele.offsetParent

        while (current !== null) {
            actualTop += current.offsetTop
            current = current.offsetParent
        }

        return actualTop
    },
    //过滤标签
    changeContent: (content,length = null)=>{
        if (content === '') return content

        content = content.replace(/<img.*?src="(.*?)"?[^\>]+>/ig, '[图片]') // replace image link
        content = content.replace(/<a[^>]+?href=["']?([^"']+)["']?[^>]*>([^<]+)<\/a>/gi, '[链接]') // replace url
        content = content.replace(/<pre><code>.*?<\/pre>/gi, '[代码]') // replace code
        content = content.replace(/<[^>]+>/g, "") // remove html tag

        if (length!=null){
            if (content.length > length) {
                content = content.substring(0, length) + '...'
            }
        }

        return content
    }

}
