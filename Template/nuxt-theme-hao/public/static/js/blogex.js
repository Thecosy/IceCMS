function checkOpen() {
}

checkOpen.toString = function () {
    this.opened = true;
};

//封面纯色
function coverColor() {
    var path = document.getElementById("post-cover")?.src;
    // console.log(path);
    if (path !== undefined) {

        // 获取颜色 https://github.com/fast-average-color/fast-average-color
        const fac = new FastAverageColor();

        fac.getColorAsync(path, {
            // 忽略白色
            ignoredColor: [255, 255, 255, 255]
        })
            .then(color => {
                /**
                 * 获取数据后的处理程序
                 */
                var value = color.hex;
                // console.log(value);
                // document.getElementById('page-header').style.backgroundColor=value;
                // document.styleSheets[0].addRule('#page-header:before','background: '+ value +'!important');

                if (getContrastYIQ(value) === "light") {
                    value = LightenDarkenColor(colorHex(value), -40)
                }

                const style = document.createElement('style');
                document.head.appendChild(style);
                const styleSheet = style.sheet;
                styleSheet.insertRule(`:root{--heo-main: ${value}!important}`, styleSheet.cssRules.length);
                styleSheet.insertRule(`:root{--heo-main-op: ${value}23!important}`, styleSheet.cssRules.length);
                styleSheet.insertRule(`:root{--heo-main-op-deep: ${value}dd!important}`, styleSheet.cssRules.length);
                styleSheet.insertRule(`:root{--heo-main-none: ${value}00!important}`, styleSheet.cssRules.length);
                heo.initThemeColor()
                document.getElementById("coverdiv").classList.add("loaded");
            })
            .catch(e => {
                console.log(e);
            });

    } else {
        // document.styleSheets[0].addRule('#page-header:before','background: none!important');
        const style = document.createElement('style');
        document.head.appendChild(style);
        const styleSheet = style.sheet;
        styleSheet.insertRule(`:root{--heo-main: var(--heo-theme)!important}`, styleSheet.cssRules.length);
        styleSheet.insertRule(`:root{--heo-main-op: var(--heo-theme-op)!important}`, styleSheet.cssRules.length);
        styleSheet.insertRule(`:root{--heo-main-op-deep:var(--heo-theme-op-deep)!important}`, styleSheet.cssRules.length);
        styleSheet.insertRule(`:root{--heo-main-none: var(--heo-theme-none)!important}`, styleSheet.cssRules.length);
        heo.initThemeColor()
    }
}

//RGB颜色转化为16进制颜色
function colorHex(str) {
    var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    var that = str;
    if (/^(rgb|RGB)/.test(that)) {
        var aColor = that.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
        var strHex = "#";
        for (var i = 0; i < aColor.length; i++) {
            var hex = Number(aColor[i]).toString(16);
            if (hex === "0") {
                hex += hex;
            }
            strHex += hex;
        }
        if (strHex.length !== 7) {
            strHex = that;
        }
        return strHex;
    } else if (reg.test(that)) {
        var aNum = that.replace(/#/, "").split("");
        if (aNum.length === 6) {
            return that;
        } else if (aNum.length === 3) {
            var numHex = "#";
            for (var i = 0; i < aNum.length; i += 1) {
                numHex += (aNum[i] + aNum[i]);
            }
            return numHex;
        }
    } else {
        return that;
    }
}

//16进制颜色转化为RGB颜色
function colorRgb(str) {
    var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    var sColor = str.toLowerCase();
    if (sColor && reg.test(sColor)) {
        if (sColor.length === 4) {
            var sColorNew = "#";
            for (var i = 1; i < 4; i += 1) {
                sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
            }
            sColor = sColorNew;
        }
        //处理六位的颜色值
        var sColorChange = [];
        for (var i = 1; i < 7; i += 2) {
            sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
        }
        return "rgb(" + sColorChange.join(",") + ")";
    } else {
        return sColor;
    }
}

//变暗变亮主方法
function LightenDarkenColor(col, amt) {
    var usePound = false;

    if (col[0] == "#") {
        col = col.slice(1);
        usePound = true;
    }

    var num = parseInt(col, 16);

    var r = (num >> 16) + amt;

    if (r > 255) r = 255;
    else if (r < 0) r = 0;

    var b = ((num >> 8) & 0x00FF) + amt;

    if (b > 255) b = 255;
    else if (b < 0) b = 0;

    var g = (num & 0x0000FF) + amt;

    if (g > 255) g = 255;
    else if (g < 0) g = 0;


    return (usePound ? "#" : "") + String("000000" + (g | (b << 8) | (r << 16)).toString(16)).slice(-6);
}

//判断是否为亮色
function getContrastYIQ(hexcolor) {
    var colorrgb = colorRgb(hexcolor);
    var colors = colorrgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    var red = colors[1];
    var green = colors[2];
    var blue = colors[3];
    var brightness;
    brightness = (red * 299) + (green * 587) + (blue * 114);
    brightness = brightness / 255000;
    if (brightness >= 0.5) {
        return "light";
    } else {
        return "dark";
    }
}

window.onload = function () {
    var copybtnlist = document.getElementsByClassName("copybtn")
    for (var i = 0; i < copybtnlist.length; i++) {
        document.getElementsByClassName("copybtn")[i].addEventListener("click", function () {
            showcopy();
        });
    }
    heo.initThemeColor();
}

function showcopy() {
    if (GLOBAL_CONFIG.Snackbar !== undefined) {
        btf.snackbarShow(GLOBAL_CONFIG.copy.success)
    } else {
        const prevEle = ctx.previousElementSibling
        prevEle.innerText = GLOBAL_CONFIG.copy.success
        prevEle.style.opacity = 1
        setTimeout(() => {
            prevEle.style.opacity = 0
        }, 700)
    }
}

// 早上好问好
// 获取时间
var getTimeState = () => {

        if (GLOBAL_CONFIG.profileStyle == 'default') {
            // 获取当前时间
            var timeNow = new Date();
            // 获取当前小时
            var hours = timeNow.getHours();
            // 设置默认文字
            var text = ``;
            // 判断当前时间段
            if (hours >= 0 && hours <= 5) {
                text = `晚安`;
            } else if (hours > 5 && hours <= 10) {
                text = `早上好`;
            } else if (hours > 10 && hours <= 14) {
                text = `中午好`;
            } else if (hours > 14 && hours <= 18) {
                text = `下午好`;
            } else if (hours > 18 && hours <= 24) {
                text = `晚上好`;
            }
            // 返回当前时间段对应的状态
            return text;

        }

        if (GLOBAL_CONFIG.profileStyle == 'one') {
            var e = (new Date).getHours()
                , t = "";
            return e >= 0 && e <= 5 ? t = "睡个好觉，保证精力充沛" : e > 5 && e <= 10 ? t = "一日之计在于晨" : e > 10 && e <= 14 ? t = "吃饱了才有力气干活" : e > 14 && e <= 18 ? t = "集中精力，攻克难关" : e > 18 && e <= 24 && (t = "不要太劳累了，早睡更健康"),
                t
        }

    },
//深色模式切换
    switchDarkMode = () => {
        "dark" === document.documentElement.getAttribute("data-theme") ? (activateLightMode(),
            saveToLocal.set("theme", "light", 2),
        void 0 !== GLOBAL_CONFIG.Snackbar && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.night_to_day, false, 2000),
            $(".menu-darkmode-text").text("深色模式")) : (activateDarkMode(),
            saveToLocal.set("theme", "dark", 2),
        void 0 !== GLOBAL_CONFIG.Snackbar && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.day_to_night, false, 2000),
            $(".menu-darkmode-text").text("浅色模式")),
            handleCases()
        heo.darkModeStatus();
        //代码块
        if (GLOBAL_CONFIG.prism.enable) {
            halo.dataCodeTheme();
        }
    }
    , handleCases = () => {
        "function" == typeof utterancesTheme && utterancesTheme(),
        "object" == typeof FB && window.loadFBComment(),
        window.DISQUS && document.getElementById("disqus_thread").children.length && setTimeout((() => window.disqusReset()), 200)
    }
    , navFn = {
        switchDarkMode: switchDarkMode
    };

//引用到评论
function rightMenuCommentText(txt) {
    if (GLOBAL_CONFIG.rightMenuEnable) {
        rm.hideRightMenu();
    }
    var input = document.getElementsByClassName(GLOBAL_CONFIG.source.comments.textarea)[0];
    let evt = document.createEvent('HTMLEvents');
    evt.initEvent('input', true, true);
    let inputValue = replaceAll(txt, '\n', '\n> ')
    input.value = '> ' + inputValue + '\n\n';
    input.dispatchEvent(evt);
    var domTop = document.querySelector("#post-comment").offsetTop;
    window.scrollTo(0, domTop - 80);
    input.focus();
    input.setSelectionRange(-1, -1);
    if (document.getElementById("comment-tips")) {
        document.getElementById("comment-tips").classList.add("show");
    }
}

//替换所有内容
function replaceAll(string, search, replace) {
    return string.split(search).join(replace);
}

// 移除赞赏蒙版
function RemoveRewardMask() {
    if (!document.querySelector(".reward-main")) return;
    document.querySelector(".reward-main").style.display = "none";
    document.getElementById("quit-box").style.display = "none";
}

//添加赞赏蒙版
function AddRewardMask() {
    if (!document.querySelector(".reward-main")) return;
    document.querySelector(".reward-main").style.display = "flex";
    document.getElementById("quit-box").style.display = "flex";
}

//监听蒙版关闭
document.addEventListener('touchstart', e => {
    RemoveRewardMask()
}, false)

//监听ctrl+C
$(document).unbind('keydown').bind('keydown', function (e) {
    if (GLOBAL_CONFIG.rightMenuEnable) {
        if ((e.ctrlKey || e.metaKey) && (e.keyCode == 67) && (selectTextNow != '')) {
            btf.snackbarShow('复制成功，复制和转载请标注本文地址');
            rm.rightmenuCopyText(selectTextNow);
            return false;
        }
    } else {

    }
})

//颜色
document.addEventListener('scroll', btf.throttle(function () {
    heo.initThemeColor()
}, 200))

//友链随机传送
function travelling() {
    function getLinks() {
        const links = "/apis/api.plugin.halo.run/v1alpha1/plugins/PluginLinks/links?keyword="
        fetch(links)
            .then(res => res.json())
            .then(json => {
                saveToLocal.set('links-data', JSON.stringify(json.items), 10 / (60 * 24))
                renderer(json.items);
            })
    }

    function renderer(data) {
        var linksData = data
        var name = ''
        var link = ''
        if (linksData.length > 0) {
            var randomFriendLinks = getArrayItems(linksData, 1);
            name = randomFriendLinks[0].spec.displayName;
            link = randomFriendLinks[0].spec.url;
        }
        var msg = "点击前往按钮进入随机一个友链，不保证跳转网站的安全性和可用性。本次随机到的是本站友链：「" + name + "」";
        const style = document.createElement('style');
        document.head.appendChild(style);
        const styleSheet = style.sheet;
        styleSheet.insertRule(`:root{--heo-snackbar-time: 8000ms!important}`, styleSheet.cssRules.length);
        Snackbar.show({
            text: msg,
            duration: 8000,
            pos: 'top-center',
            actionText: '前往',
            onActionClick: function (element) {
                $(element).css('opacity', 0);
                window.open(link, '_blank');
            }
        });
    }

    function init() {
        const data = saveToLocal.get('links-data')
        if (data) {
            renderer(JSON.parse(data))
        } else {
            getLinks()
        }
    }

    init()
}

//前往黑洞
function toforeverblog() {
    var msg = "点击前往按钮进入「十年之约」项目中的成员博客，不保证跳转网站的安全性和可用性";
    Snackbar.show({
        text: msg,
        duration: 8000,
        pos: 'top-center',
        actionText: '前往',
        onActionClick: function (element) {
            //Set opacity of element to 0 to close Snackbar
            $(element).css('opacity', 0);
            window.open(link, 'https://www.foreverblog.cn/go.html');
        }
    });
}

//前往开往项目
function totraveling() {
    btf.snackbarShow("即将跳转到「开往」项目的成员博客，不保证跳转网站的安全性和可用性", function (element) {
        element.style.opacity = 0,
        travellingsTimer && clearTimeout(travellingsTimer)
    }, 5000, "取消"),
        travellingsTimer = setTimeout(function () {
            window.open("https://www.travellings.cn/go.html", "_blank")
        }, "5000")
}

// 移除加载动画
function removeLoading() {
    setTimeout(function () {
        preloader.endLoading();
    }, 3000)
}

function addFriendLink() {
    var input = document.getElementsByClassName(GLOBAL_CONFIG.source.comments.textarea)[0];
    let evt = document.createEvent('HTMLEvents');
    evt.initEvent('input', true, true);
    input.value = '昵称（请勿包含博客等字样）：\n网站地址（要求博客地址，请勿提交个人主页）：\n头像图片url（请提供尽可能清晰的图片，我会上传到我自己的图床）：\n描述：\n';
    input.dispatchEvent(evt);
    heo.scrollTo("#post-comment");
    input.focus();
    input.setSelectionRange(-1, -1);
}

//从一个给定的数组arr中,随机返回num个不重复项
function getArrayItems(arr, num) {
    //新建一个数组,将传入的数组复制过来,用于运算,而不要直接操作传入的数组;
    var temp_array = new Array();
    for (var index in arr) {
        temp_array.push(arr[index]);
    }
    //取出的数值项,保存在此数组
    var return_array = new Array();
    for (var i = 0; i < num; i++) {
        //判断如果数组还有可以取出的元素,以防下标越界
        if (temp_array.length > 0) {
            //在数组中产生一个随机索引
            var arrIndex = Math.floor(Math.random() * temp_array.length);
            //将此随机索引的对应的数组元素值复制出来
            return_array[i] = temp_array[arrIndex];
            //然后删掉此索引的数组元素,这时候temp_array变为新的数组
            temp_array.splice(arrIndex, 1);
        } else {
            //数组中数据项取完后,退出循环,比如数组本来只有10项,但要求取出20项.
            break;
        }
    }
    return return_array;
}

function bindTodayCardHoverEvent() {
    $(".topGroup").hover((function() {}
    ), (function() {
            hoverOnCommentBarrage = !1,
                document.getElementById("topGroup").classList.remove("hideCard"),
                document.getElementById("topGroup").style.zIndex = 1
        }
    ))
}

//评论增加放大功能
function owoBig() {
    new MutationObserver((e => {
            for (let t of e)
                if ("childList" === t.type)
                    for (let e of t.addedNodes)
                        if (e.classList && e.classList.contains("OwO-body")) {
                            let t = e
                                , o = ""
                                , n = !0
                                , a = document.createElement("div");
                            a.id = "owo-big",
                                document.querySelector("body").appendChild(a),
                                t.addEventListener("contextmenu", (e => e.preventDefault())),
                                t.addEventListener("mouseover", (e => {
                                        "LI" === e.target.tagName && n && (n = !1,
                                            o = setTimeout((() => {
                                                    let t = 3 * e.target.clientWidth
                                                        , o = e.x - e.offsetX - (t - e.target.clientWidth) / 2
                                                        , n = e.y - e.offsetY;
                                                    a.style.height = 3 * e.target.clientHeight + "px",
                                                        a.style.width = t + "px",
                                                        a.style.left = o + "px",
                                                        a.style.top = n + "px",
                                                        a.style.display = "flex",
                                                        a.innerHTML = `<img src="${e.target.querySelector("img").src}">`
                                                }
                                            ), 300))
                                    }
                                )),
                                t.addEventListener("mouseout", (e => {
                                        a.style.display = "none",
                                            n = !0,
                                            clearTimeout(o)
                                    }
                                ))
                        }
        }
    )).observe(document.getElementById("post-comment"), {
        childList: !0,
        subtree: !0
    })
}

// 检测按键
window.onkeydown = function (e) {
    if (e.keyCode === 123) {
        btf.snackbarShow('开发者模式已打开，请遵循GPL协议', false, 3000)
    }
}

// 阻止搜索滚动
// document.querySelector('#algolia-search').addEventListener('wheel', (e) => {
//   e.preventDefault()
// })
document.querySelector('#console') && document.querySelector('#console').addEventListener('wheel', (e) => {
    e.preventDefault()
})
// document.querySelector('#loading-box').addEventListener('wheel', (e) => {
//   e.preventDefault()
// })

//自动调整即刻短文尺寸
window.addEventListener("resize", (function () {
        document.querySelector("#waterfall") && heo.reflashEssayWaterFall()
    }
));

function initObserver() {
    var e = document.getElementById("post-comment")
        , t = document.getElementById("pagination");
    e && new IntersectionObserver((function (e) {
            e.forEach((function (e) {
                    e.isIntersecting ? (t && t.classList.add("show-window"),
                        document.querySelector(".comment-barrage").style.bottom = "-200px") : (t && t.classList.remove("show-window"),
                        document.querySelector(".comment-barrage").style.bottom = "0px")
                }
            ))
        }
    )).observe(e)
}

// 页面百分比
function percent() {
    let e = document.documentElement.scrollTop || window.pageYOffset
        ,
        t = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight) - document.documentElement.clientHeight
        , o = Math.round(e / t * 100)
        , n = document.querySelector("#percent");
    var a = window.scrollY + document.documentElement.clientHeight
        , i = document.getElementById("post-comment") || document.getElementById("footer");
    i.offsetTop + i.offsetHeight / 2 < a || o > 90 ? (document.querySelector("#nav-totop").classList.add("long"),
        n.innerHTML = "返回顶部") : (document.querySelector("#nav-totop").classList.remove("long"),
    o >= 0 && (n.innerHTML = o)),
        endresult = t - e,
        endresult < 100 ? $(".needEndHide").addClass("hide") : $(".needEndHide").removeClass("hide"),
        window.onscroll = percent
}

// 首页分页隐藏置顶内容
function checkUrlAndAddHideBanner() {
    var e = window.location.href;
    if (/\/page\//.test(e)) {
        var t = document.getElementById("recent-top-post-group")
            , o = document.getElementById("bbTimeList")
            , c = document.getElementById("climb");
        t && (t.classList.add("more-page"),
        o && o.classList.add("more-page"),
        c && c.classList.add("more-page"));
    }
}

function setBodyDataType() {
    var body = document.body;
    var att = document.createAttribute("data-type");
    att.value = GLOBAL_CONFIG.htmlType;
    body.setAttributeNode(att);
}

function listenToPageInputPress() {
    var e = document.getElementById("toPageText")
        , t = document.getElementById("toPageButton");
    e && (e.addEventListener("keydown", (e => {
            13 === e.keyCode && (heo.toPage(),
                pjax.loadUrl(t.href))
        }
    )),
        e.addEventListener("input", (function () {
                "" === e.value || "0" === e.value ? t.classList.remove("haveValue") : t.classList.add("haveValue");
                var o = document.querySelectorAll(".page-number")
                    , n = +o[o.length - 1].innerHTML;
                +document.getElementById("toPageText").value > n && (e.value = n)
            }
        )))
}

function initBlog() {
    // 图片主色
    GLOBAL_CONFIG.source.post.dynamicBackground && coverColor(),
    GLOBAL_CONFIG.rightMenuEnable && addRightMenuClickEvent(),
        percent(),
        listenToPageInputPress(),
        setBodyDataType(),
        heo.topPostScroll(),
        heo.sayhi(),
        heo.stopImgRightDrag(),
        heo.addPowerLinksInPostRightSide(),
        heo.qrcodeCreate(),
        //右下角 snackbar 弹窗
    GLOBAL_CONFIG.source.tool.switch && heo.hidecookie(),
        heo.onlyHome(),
        heo.addNavBackgroundInit(),
        heo.initIndexEssay(),
        heo.reflashEssayWaterFall(),
        heo.darkModeStatus(),
        heo.categoriesBarActive(),
        heo.initThemeColor(),
        heo.topCategoriesBarScroll(),
        //隐藏加载动画
    GLOBAL_CONFIG.loadingBox && heo.hideLoading(),
        heo.tagPageActive(),
        initObserver(),
        checkUrlAndAddHideBanner(),
        bindTodayCardHoverEvent(),
        halo.getTopSponsors(),
        halo.checkAd()


}

// 如果当前页有评论就执行函数
document.getElementById("post-comment") && owoBig()

//检查是否开启快捷键
// if (localStorage.getItem('keyboardToggle') !== 'false') {
//     document.querySelector("#consoleKeyboard").classList.add("on");
// } else {
//     document.querySelector("#consoleKeyboard").classList.remove("on");
// }

//响应esc键
$(window).on('keydown', function (ev) {

    // Escape
    if (ev.keyCode == 27) {
        heo.hideLoading();
        heo.hideConsole();
        rm.hideRightMenu();
    }

    if (heo_keyboard && ev.shiftKey && !heo_intype) {

        // 显示快捷键面板 shift键
        // if (ev.keyCode == 16) {
        //     document.querySelector("#keyboard-tips").classList.add("show");
        // }

        //关闭快捷键 shift+K
        if (ev.keyCode == 75) {
            heo.keyboardToggle();
            return false;
        }

        //响应打开控制台键 shift+A
        if (ev.keyCode == 65) {
            heo.showConsole();
            return false;
        }

        //音乐控制 shift+M
        if (ev.keyCode == 77) {
            heo.musicToggle();
            return false;
        }

        //随机文章 shift+R
        if (ev.keyCode == 82) {
            toRandomPost();
            return false;
        }

        //回到首页 shift+H
        if (ev.keyCode == 72) {
            pjax.loadUrl("/");
            return false;
        }

        //深色模式 shift+D
        if (ev.keyCode == 68) {
            rm.switchDarkMode();
            return false;
        }

        //友链鱼塘 shift+F
        if (ev.keyCode == 70) {
            pjax.loadUrl("/moments/");
            return false;
        }

        //友情链接页面 shift+L
        if (ev.keyCode == 76) {
            pjax.loadUrl("/link/");
            return false;
        }

        //关于本站 shift+P
        if (ev.keyCode == 80) {
            pjax.loadUrl("/about/");
            return false;
        }

        //在线工具 shift+T
        if (ev.keyCode == 84) {
            pjax.loadUrl("/tlink/");
            return false;
        }

    }

});

// $(window).on('keyup', function (ev) {
//     // 显示快捷键面板
//     if (ev.keyCode == 16) {
//         document.querySelector("#keyboard-tips").classList.remove("show");
//     }
// });

//输入状态检测
$("input").focus(function () {
    heo_intype = true;
});
$("textarea").focus(function () {
    heo_intype = true;
});
$("input").focusout(function () {
    heo_intype = false;
});
$("textarea").focusout(function () {
    heo_intype = false;
});

//老旧浏览器检测
function browserTC() {
    btf.snackbarShow("");
    Snackbar.show({
        text: '为了保护访客访问安全，本站已停止对你正在使用的过低版本浏览器的支持',
        actionText: '关闭',
        duration: '6000',
        pos: 'bottom-right'
    });
}

function browserVersion() {
    var userAgent = navigator.userAgent;
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1;
    var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
    var isEdge = userAgent.indexOf("Edge") > -1 && !isIE;
    var isFirefox = userAgent.indexOf("Firefox") > -1;
    var isOpera = userAgent.indexOf("Opera") > -1 || userAgent.indexOf("OPR") > -1;
    var isChrome = userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Edge") == -1 && userAgent.indexOf("OPR") == -1;
    var isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1 && userAgent.indexOf("Edge") == -1 && userAgent.indexOf("OPR") == -1;
    if (isEdge) {
        if (userAgent.split('Edge/')[1].split('.')[0] < 90) {
            browserTC()
        }
    } else if (isFirefox) {
        if (userAgent.split('Firefox/')[1].split('.')[0] < 90) {
            browserTC()
        }
    } else if (isOpera) {
        if (userAgent.split('OPR/')[1].split('.')[0] < 80) {
            browserTC()
        }
    } else if (isChrome) {
        if (userAgent.split('Chrome/')[1].split('.')[0] < 90) {
            browserTC()
        }
    } else if (isSafari) {
        //不知道Safari多少版本才算老旧
    }
}

function setCookies(obj, limitTime) {
    let data = new Date(new Date().getTime() + limitTime * 24 * 60 * 60 * 1000).toUTCString()
    for (let i in obj) {
        document.cookie = i + '=' + obj[i] + ';expires=' + data
    }
}

function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}

if (getCookie('browsertc') != 1) {
    setCookies({
        browsertc: 1,
    }, 1); //设置cookie缓存一天，即一天弹一次
    browserVersion();
}

//当前窗口得到焦点 
// window.onfocus = function () {
//     document.querySelector("#keyboard-tips").classList.remove("show");
// };

//注入函数
document.addEventListener('pjax:click', function () {
    //显示加载进度条
    if (GLOBAL_CONFIG.loadProgressBar) {
        Pace.restart();
    }
    //显示加载动画
    if (GLOBAL_CONFIG.loadingBox) {
        heo.showLoading();
    }
})
