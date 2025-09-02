document.addEventListener('DOMContentLoaded', function () {
    const $blogName = document.getElementById('site-name')
    let blogNameWidth = $blogName && $blogName.offsetWidth
    const $menusEle = document.querySelector('#menus .menus_items')
    let menusWidth = $menusEle && $menusEle.offsetWidth
    const $searchEle = document.querySelector('#search-button')
    let searchWidth = $searchEle && $searchEle.offsetWidth

    const adjustMenu = (change = false) => {
        if (change) {
            blogNameWidth = $blogName && $blogName.offsetWidth
            menusWidth = $menusEle && $menusEle.offsetWidth
            searchWidth = $searchEle && $searchEle.offsetWidth
        }
        const $nav = document.getElementById('nav')
        let t
        if (window.innerWidth < 768) t = true
        else t = blogNameWidth + menusWidth + searchWidth > $nav.offsetWidth - 120

        if (t) {
            $nav.classList.add('hide-menu')
        } else {
            $nav.classList.remove('hide-menu')
        }
    }

    // 初始化header
    const initAdjust = () => {
        adjustMenu()
        document.getElementById('nav').classList.add('show')
    }

    // sidebar menus
    const sidebarFn = () => {
        const $toggleMenu = document.getElementById('toggle-menu')
        const $mobileSidebarMenus = document.getElementById('sidebar-menus')
        const $menuMask = document.getElementById('menu-mask')
        const $body = document.body

        function openMobileSidebar() {
            btf.sidebarPaddingR()
            $body.style.overflow = 'hidden'
            btf.fadeIn($menuMask, 0.5)
            $mobileSidebarMenus.classList.add('open')
        }

        function closeMobileSidebar() {
            $body.style.overflow = ''
            $body.style.paddingRight = ''
            btf.fadeOut($menuMask, 0.5)
            $mobileSidebarMenus.classList.remove('open')
        }

        $toggleMenu.addEventListener('click', openMobileSidebar)

        $menuMask.addEventListener('click', e => {
            if ($mobileSidebarMenus.classList.contains('open')) {
                closeMobileSidebar()
            }
        })

        window.addEventListener('resize', e => {
            if (btf.isHidden($toggleMenu)) {
                if ($mobileSidebarMenus.classList.contains('open')) closeMobileSidebar()
            }
        })
    }

    /**
     * 首頁top_img底下的箭頭
     */
    const scrollDownInIndex = () => {
        const $scrollDownEle = document.getElementById('scroll-down')
        const $homeTop = document.getElementById('home_top')
        $scrollDownEle && $scrollDownEle.addEventListener('click', function () {
            $homeTop &&  btf.scrollToDest($homeTop.offsetTop, 300)

        })
    }


    /**
     * justified-gallery 圖庫排版
     * 需要 jQuery
     */

    let detectJgJsLoad = false
    const runJustifiedGallery = function (ele) {

        if (detectJgJsLoad) btf.initJustifiedGallerys(ele)
        else {
            $('head').append(`<link rel="stylesheet" type="text/css" href="${GLOBAL_CONFIG.source.justifiedGallery.css}">`)
            $.getScript(`${GLOBAL_CONFIG.source.justifiedGallery.js}`, function () {

                btf.initJustifiedGallerys(ele)
            })
            detectJgJsLoad = true
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

    const jqLoadAndRun = () => {
        const $fancyboxEle = GLOBAL_CONFIG.lightbox === 'fancybox'
            ? document.querySelectorAll('#article-container :not(a):not(.rss-plan-info-group):not(.no-lightbox) > img, #article-container > img,.bber-container-img > img')
            : []
        const fbLengthNoZero = $fancyboxEle.length > 0
        const $jgEle = document.querySelectorAll('#article-container .gallery')
        const jgLengthNoZero = $jgEle.length > 0

        if (jgLengthNoZero || fbLengthNoZero) {
            btf.isJqueryLoad(() => {
                jgLengthNoZero && runJustifiedGallery($jgEle)
                fbLengthNoZero && addFancybox($fancyboxEle)
            })
        }
    }

    /**
     *  toc
     */
    const tocFn = function () {
        const postContent = document.querySelector('.post-content');
        if (postContent == null) return;
        const titles = postContent.querySelectorAll('h1,h2,h3,h4,h5,h6');
        // 没有 toc 目录，则直接移除
        if (titles.length === 0 || !titles) {
            const cardToc = document.getElementById("card-toc");
            cardToc?.remove();
            const $mobileTocButton = document.getElementById("mobile-toc-button")
            if ($mobileTocButton) {
                $('#mobile-toc-button').attr('style', 'display: none');
            }
        } else {
            tocbot.init({
                tocSelector: '.toc-content',
                contentSelector: '.post-content',
                headingSelector: 'h1,h2,h3,h4,h5,h6',
                listItemClass: 'toc-item',
                activeLinkClass: 'active',
                activeListItemClass: 'active',
                headingsOffset: -400,
                scrollSmooth: true,
                scrollSmoothOffset: -70,
                tocScrollOffset: 50,
            });

            const $cardTocLayout = document.getElementById('card-toc')
            const $cardToc = $cardTocLayout.getElementsByClassName('toc-content')[0]

            // toc元素點擊
            $cardToc.addEventListener('click', (ele) => {
                if (window.innerWidth < 900) {
                    $cardTocLayout.classList.remove("open");
                }
            })

        }
    }


    /**
     * Rightside
     */
    const rightSideFn = {
        switchReadMode: () => { // read-mode
            const $body = document.body
            $body.classList.add('read-mode')
            const newEle = document.createElement('button')
            newEle.type = 'button'
            newEle.className = 'haofont hao-icon-sign-out-alt exit-readmode'
            $body.appendChild(newEle)

            function clickFn () {
                $body.classList.remove('read-mode')
                newEle.remove()
                newEle.removeEventListener('click', clickFn)
            }

            newEle.addEventListener('click', clickFn)
        },
        showOrHideBtn: () => { // rightside 點擊設置 按鈕 展開
            document.getElementById('rightside-config-hide').classList.toggle('show')
        },
        scrollToTop: () => { // Back to top
            btf.scrollToDest(0, 500)
        },
        hideAsideBtn: () => { // Hide aside
            const $htmlDom = document.documentElement.classList
            $htmlDom.contains('hide-aside')
                ? saveToLocal.set('aside-status', 'show', 2)
                : saveToLocal.set('aside-status', 'hide', 2)
            $htmlDom.toggle('hide-aside')
        },
        runMobileToc: item => {
            const tocEle = document.getElementById("card-toc");
            tocEle.style.transformOrigin = `right ${item.getBoundingClientRect().top + 17}px`;
            tocEle.style.transition = "transform 0.3s ease-in-out";
            tocEle.classList.toggle("open");
            tocEle.addEventListener(
                "transitionend",
                () => {
                    tocEle.style.transition = "";
                    tocEle.style.transformOrigin = "";
                },
                { once: true }
            );
        },
    }

    document.getElementById('rightside').addEventListener('click', function (e) {
        const $target = e.target.id || e.target.parentNode.id
        switch ($target) {
            case 'go-up':
                rightSideFn.scrollToTop()
                break
            case 'rightside-config':
                rightSideFn.showOrHideBtn()
                break
            case "mobile-toc-button":
                rightSideFn.runMobileToc(this);
                break;
            case 'readmode':
                rightSideFn.switchReadMode()
                break
            case 'darkmode':
                navFn.switchDarkMode();
                break
            case 'hide-aside-btn':
                rightSideFn.hideAsideBtn()
                break
            default:
                break
        }
    })

    /**
     * 滾動處理
     */
    const scrollFn = function () {
        const $postComment = document.getElementById('post-comment')
        const $rightside = document.getElementById('rightside')
        const innerHeight = window.innerHeight + 0

        if ($postComment) {
            $('#to_comment').attr('style', 'display: block');
        } else {
            $('#to_comment').attr('style', 'display: none');
        }

        // 當滾動條小于 0 的時候
        if (document.body.scrollHeight <= innerHeight) {
            $rightside.style.cssText = 'opacity: 1; transform: translateX(-58px)'
            return
        }

        let initTop = 0
        let isChatShow = true
        const $header = document.getElementById('page-header')
        const $gulitop = document.getElementById('guli_top')
        const $cookies_window = document.getElementById('cookies-window')
        const isChatBtnHide = typeof chatBtnHide === 'function'
        const isChatBtnShow = typeof chatBtnShow === 'function'
        window.addEventListener('scroll', btf.throttle(function (e) {
            const currentTop = window.scrollY || document.documentElement.scrollTop
            const isDown = scrollDirection(currentTop)
            if (currentTop > 0) {
                if (isDown) {
                    if ($header.classList.contains('nav-visible')) $header.classList.remove('nav-visible')
                    if (isChatBtnShow && isChatShow === true) {
                        chatBtnHide()
                        isChatShow = false
                    }
                } else {
                    if (!$header.classList.contains('nav-visible')) $header.classList.add('nav-visible')
                    if (isChatBtnHide && isChatShow === false) {
                        chatBtnShow()
                        isChatShow = true
                    }
                }


                $header.classList.add('nav-fixed')
                if($cookies_window!=null && $cookies_window!=''){
                    $cookies_window.classList.add('cw-hide')
                }
                if (window.getComputedStyle($rightside).getPropertyValue('opacity') === '0') {
                    $rightside.style.cssText = 'opacity: 0.8; transform: translateX(-58px)'
                }
            } else {
                if (currentTop === 0) {
                    $header.classList.remove('nav-fixed', 'nav-visible')
                }
                $rightside.style.cssText = "opacity: ''; transform: ''"
            }

            if (document.body.scrollHeight <= innerHeight) {
                $rightside.style.cssText = 'opacity: 0.8; transform: translateX(-58px)'
            }
        }, 200))

        // find the scroll direction
        function scrollDirection (currentTop) {
            const result = currentTop > initTop // true is down & false is up
            initTop = currentTop
            return result
        }
    }

    /**
     * menu
     * 側邊欄sub-menu 展開/收縮
     * 解決menus在觸摸屏下，滑動屏幕menus_item_child不消失的問題（手機hover的bug)
     */
    const clickFnOfSubMenu = function () {
        document.querySelectorAll('#sidebar-menus .expand').forEach(function (e) {
            e.addEventListener('click', function () {
                this.classList.toggle('hide')
                const $dom = this.parentNode.nextElementSibling
                if (btf.isHidden($dom)) {
                    $dom.style.display = 'block'
                } else {
                    $dom.style.display = 'none'
                }
            })
        })

        window.addEventListener('touchmove', function (e) {
            const $menusChild = document.querySelectorAll('#nav .menus_item_child')
            $menusChild.forEach(item => {
                if (!btf.isHidden(item)) item.style.display = 'none'
            })
        })
    }

    /**
     * 複製時加上版權信息
     */
    const addCopyright = () => {
        const copyright = GLOBAL_CONFIG.copyright
        document.body.oncopy = (e) => {
            e.preventDefault()
            let textFont;
            const copyFont = window.getSelection(0).toString()
            if (copyFont.length > copyright.limitCount) {
                textFont = copyFont + '\n' + '\n' + '\n' +
                    copyright.languages.author + '\n' +
                    copyright.languages.link + window.location.href + '\n' +
                    copyright.languages.source + '\n' +
                    copyright.languages.info
            } else {
                textFont = copyFont
            }
            if (e.clipboardData) {
                return e.clipboardData.setData('text', textFont)
            } else {
                return window.clipboardData.setData('text', textFont)
            }
        }
    }

    /**
     * 網頁運行時間
     */
    const addRuntime = () => {
        const $runtimeCount = document.getElementById('runtimeshow');
        if ($runtimeCount) {
            var s1 = $runtimeCount.innerText;;//建站时间
            if (s1) {
                s1 = new Date(s1.replace(/-/g, "/"));
                s2 = new Date();
                var days = s2.getTime() - s1.getTime();
                var number_of_days = parseInt(days / (1000 * 60 * 60 * 24));
                $runtimeCount.innerText = number_of_days + "天";
            }
        }
    }

    /**
     * 最後一次更新時間
     */
    const addLastPushDate = () => {
        const $lastPushDateItem = document.getElementById('last-push-date')
        if ($lastPushDateItem) {
            const lastPushDate = $lastPushDateItem.getAttribute('data-lastPushDate')
            $lastPushDateItem.innerText = btf.diffDate(lastPushDate, true)
        }
    }

    /**
     * table overflow
     */
    const addTableWrap = function () {
        const $table = document.querySelectorAll('#article-container :not(.highlight) > table, #article-container > table')
        if ($table.length) {
            $table.forEach(item => {
                btf.wrap(item, 'div', '', 'table-wrap')
            })
        }
    }

    /**
     * tag-hide
     */
    const clickFnOfTagHide = function () {
        const $hideInline = document.querySelectorAll('#article-container .hide-button')
        if ($hideInline.length) {
            $hideInline.forEach(function (item) {
                item.addEventListener('click', function (e) {
                    const $this = this
                    const $hideContent = $this.nextElementSibling
                    $this.classList.toggle('open')
                    if ($this.classList.contains('open')) {
                        if ($hideContent.querySelectorAll('.gallery').length > 0) {
                            btf.initJustifiedGallerys($hideContent.querySelectorAll('.gallery'))
                        }
                    }
                })
            })
        }
    }

    const tabsFn = {
        clickFnOfTabs: function () {
            document.querySelectorAll('#article-container .tab > button').forEach(function (item) {
                item.addEventListener('click', function (e) {
                    const $this = this
                    const $tabItem = $this.parentNode

                    if (!$tabItem.classList.contains('active')) {
                        const $tabContent = $tabItem.parentNode.nextElementSibling
                        const $siblings = btf.siblings($tabItem, '.active')[0]
                        $siblings && $siblings.classList.remove('active')
                        $tabItem.classList.add('active')
                        const tabId = $this.getAttribute('data-href').replace('#', '')
                        const childList = [...$tabContent.children]
                        childList.forEach(item => {
                            if (item.id === tabId) item.classList.add('active')
                            else item.classList.remove('active')
                        })
                        const $isTabJustifiedGallery = $tabContent.querySelectorAll(`#${tabId} .gallery`)
                        if ($isTabJustifiedGallery.length > 0) {
                            btf.initJustifiedGallerys($isTabJustifiedGallery)
                        }
                    }
                })
            })
        },
        backToTop: () => {
            document.querySelectorAll('#article-container .tabs .tab-to-top').forEach(function (item) {
                item.addEventListener('click', function () {
                    btf.scrollToDest(btf.getEleTop(btf.getParents(this, '.tabs')), 300)
                })
            })
        }
    }

    const toggleCardCategory = function () {
        const $cardCategory = document.querySelectorAll('#aside-cat-list .card-category-list-item.parent i')
        if ($cardCategory.length) {
            $cardCategory.forEach(function (item) {
                item.addEventListener('click', function (e) {
                    e.preventDefault()
                    const $this = this
                    $this.classList.toggle('expand')
                    const $parentEle = $this.parentNode.nextElementSibling
                    if (btf.isHidden($parentEle)) {
                        $parentEle.style.display = 'block'
                    } else {
                        $parentEle.style.display = 'none'
                    }
                })
            })
        }
    }

    const addPostOutdateNotice = function () {
        const data = GLOBAL_CONFIG.noticeOutdate
        const diffDay = btf.diffDate("2022-11-04 20:08:15")
        if (diffDay >= data.limitDay) {
            const ele = document.createElement('div')
            ele.className = 'post-outdate-notice'
            ele.textContent = data.messagePrev + ' ' + diffDay + ' ' + data.messageNext
            const $targetEle = document.getElementById('article-container')
            if (data.position === 'top') {
                $targetEle.insertBefore(ele, $targetEle.firstChild)
            } else {
                $targetEle.appendChild(ele)
            }
        }
    }

    const lazyloadImg = () => {
        window.lazyLoadInstance = new LazyLoad({
            elements_selector: 'img',
            threshold: 0,
            data_src: 'lazy-src',
            callback_error: (img) => {
                img.setAttribute("srcset", GLOBAL_CONFIG.lazyload.error);
            }
        })
    }

    const unRefreshFn = function () {
        window.addEventListener('resize', adjustMenu)
        window.addEventListener('orientationchange', () => {
            setTimeout(adjustMenu(true), 100)
        })

        clickFnOfSubMenu()
        GLOBAL_CONFIG.lazyload.enable && lazyloadImg()
        GLOBAL_CONFIG.copyright !== undefined && addCopyright()
    }

    window.refreshFn = function () {
        initAdjust();


        if (GLOBAL_CONFIG.isPost) {
            addRuntime();
            tocFn();
        } else {
            addLastPushDate()
            toggleCardCategory()
            addRuntime()
        }

        sidebarFn()
        GLOBAL_CONFIG.isHome && scrollDownInIndex()
        scrollFn()
        addTableWrap()
        clickFnOfTagHide()
        tabsFn.clickFnOfTabs()
        tabsFn.backToTop()
        jqLoadAndRun()
    }

    refreshFn()
    unRefreshFn()
})
