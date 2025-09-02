

/* 获取直属子元素 */
function getChildren(el, className) {
    for (let item of el.children) if (item.className === className) return item;
    return null;
}

function parseExpression(expression, occupied) {
    if (expression === "${full}") {
        return occupied;
    }
    const match = expression.replaceAll("full", occupied).match(/^\$\{([<>=]{1,2}.+)\?(.+):(.+)}$/);
    if (match) {
        return eval(`occupied${match[1]} ? ${match[2]} : ${match[3]}`);
    }
    throw new Error(`Invalid expression "${expression}"`);
}

function extractHeight(occupied, width, height) {
    const occupiedWidth = width.endsWith("%")
        ? occupied * (Number(width.slice(0, -1)) / 100)
        : Number(width);
    height = height.replaceAll("cwidth", occupiedWidth);
    if (height.startsWith("${") && height.endsWith("}")) {
        return parseExpression(height, occupied);
    } else {
        return height;
    }
}


// 跳转链接的卡片
document.addEventListener("DOMContentLoaded", () => {

    // 分栏 tab
    customElements.define(
        "hao-tabs",
        class HaoTabs extends HTMLElement {
            constructor() {
                super();
                this.options = {
                    id: this.getAttribute("id") || '',
                    index: this.getAttribute("index") || ''
                };
                const id = this.options.id
                const index = this.options.index
                const _temp = getChildren(this, "_tpl");
                let _innerHTML = _temp.innerHTML.trim().replace(/^(<br>)|(<br>)$/g, "");
                let navs = "";
                let contents = "";
                let newIndex = 0;

                _innerHTML.replace(
                    /{tabs-item([^}]*)}([\s\S]*?){\/tabs-item}/g,
                    function ($0, $1, $2) {
                        newIndex +=1;
                        let active =''
                        if(index!='' && index!=null){
                            if(newIndex == index){
                                active = 'active';
                            }
                        }else{
                            if(newIndex==1){
                                active = 'active'
                            }
                        }
                        navs += `
                         <li class="tab ${active}"><button type="button" data-href="#${id}-${newIndex}">${$1}</button></li>
                    `;
                        contents += `
                        <div class="tab-item-content  ${active}" id="${id}-${newIndex}">
                         ${$2.trim().replace(/^(<br>)|(<br>)$/g, "")}
                           <button type="button" class="tab-to-top" aria-label="scroll to top"><i class="haofont hao-icon-arrow-up"></i></button>
                        </div>
                    `;
                    }
                );
                let htmlStr = `
                <div class="tabs" id="${this.options.id}">
                   <ul class="nav-tabs">${navs}</ul>
                   <div class="tab-contents">${contents}</div>
                </div>
        
            `;
                this.innerHTML = htmlStr;
            }
        }
    );

    // 彩虹虚线
    customElements.define(
        "hao-dotted",
        class DottedDom extends HTMLElement {
            constructor() {
                super();
                this.startColor = this.getAttribute("begin") || "#ff6c6c";
                this.endColor = this.getAttribute("end") || "#1989fa";
                this.innerHTML = `
                <span class="tool_dotted" style="background-image: repeating-linear-gradient(-45deg, ${this.startColor} 0, ${this.startColor} 20%, transparent 0, transparent 25%, ${this.endColor} 0, ${this.endColor} 45%, transparent 0, transparent 50%)"></span>
            `;
            }
        }
    );

    // 进度条
    customElements.define(
        "hao-progress",
        class ProgressDom extends HTMLElement {
            constructor() {
                super();
                this.options = {
                    percentage: /^\d{1,3}%$/.test(this.getAttribute("pct"))
                        ? this.getAttribute("pct")
                        : "50%",
                    color: this.getAttribute("color") || "#ff6c6c",
                };
                this.innerHTML = `
                    <span class="tool_progress">
                        <div class="tool_progress__strip">
                            <div class="tool_progress__strip-percent" style="width: ${this.options.percentage}; background: ${this.options.color};"></div>
                        </div>
                        <div class="tool_progress__percentage">${this.options.percentage}</div>
                    </span>
                `;
            }
        }
    );

    // 小标记
    customElements.define(
        "hao-sign",
        class SignDom extends HTMLElement {
            constructor() {
                super();
                this.options = {
                    type: this.getAttribute("type"), // 小标签类型
                    content: this.innerHTML, // 内容
                };
                this.render();
            }
            render() {
                this.innerHTML = `<span class="${this.options.type}">${this.options.content}</span>`;
            }
        }
    );


    // B站视频
    customElements.define(
        "hao-bilibili",
        class BiliBiliDom extends HTMLElement {
            constructor() {
                super();
                this.options = {
                    bvid: this.getAttribute("bvid"),
                    page: +(this.getAttribute("page") || "1"),
                    width: this.getAttribute("width") || "100%",
                    height: this.getAttribute("height") || "500",
                    autoplay: this.getAttribute("autoplay") || 0,
                };
                this.render();
            }
            render() {
                if (!this.options.bvid) return (this.innerHTML = "请填写正确的bvid");
                const realHeight = extractHeight(this.parentElement.offsetWidth, this.options.width, this.options.height);
                this.setAttribute("height", realHeight);
                this.innerHTML = `
                    <iframe class="iframe-dom" allowfullscreen="true" scrolling="no" border="0" frameborder="no" framespacing="0" class="tool_vplayer" src="//player.bilibili.com/player.html?bvid=${this.options.bvid}&page=${this.options.page}&autoplay=${this.options.autoplay}" style="width:${this.options.width}; height:${realHeight}px;"></iframe>`;
            }
        }
    );

    // pdf
    customElements.define(
        "hao-pdf",
        class PDFDom extends HTMLElement {
            constructor() {
                super();
                this.options = {
                    src: this.getAttribute("src") || "",
                    width: this.getAttribute("width") || "100%",
                    height: this.getAttribute("height") || "500",
                };
                this.render();
            }
            render() {
                if (!this.options.src) return (this.innerHTML = "请填写正确的pdf链接");
                const realHeight = extractHeight(this.parentElement.offsetWidth, this.options.width, this.options.height);
                this.setAttribute("height", realHeight);
                this.innerHTML = `
                    <div class="tool_pdf">
                        <iframe class="iframe-dom" src="${this.options.src}" style="width:${this.options.width}; height:${realHeight}px;"></iframe>
                    </div>`;
            }
        }
    );

    customElements.define(
        "hao-introduction-card",
        class HaoIntroductionCard extends HTMLElement {
            constructor() {
                super();
                this.options = {
                    link: this.getAttribute("link") || 'https://0206.ink/',
                    img: this.getAttribute("img"),
                    tip: this.getAttribute("tip") || '小标题',
                    cardTitle: this.getAttribute("cardTitle") || '标题',
                    logo: this.getAttribute("logo"),
                    title: this.getAttribute("title"),
                    subTitle: this.getAttribute("subTitle"),
                };
                let style1 = ''
                let style2 = ''
                if(this.options.logo==null && this.options.title==null && this.options.subTitle==null){
                    style1 = 'height:416px'
                    style2 = 'height:100%;border-radius:15px'
                }
                let innerHTMLs =  `
					<div class="introduction-card" style="${style1}">
						<div class="introduction-card-top no-lightbox" style="${style2}">
							<div class="int-card-info">
								<div class="int-tip">${this.options.tip}</div>
								<div class="int-cardTitle">${this.options.cardTitle}</div>
							</div>
							<img ${GLOBAL_CONFIG.source.img.src}="${this.options.img}" alt="introduction">

						</div>
				`;
                if(this.options.logo!=null && this.options.title!=null && this.options.subTitle!=null){
                    innerHTMLs += `
					
						<div class="introduction-card-bottom">
							<div class="left no-lightbox">
								<img ${GLOBAL_CONFIG.source.img.src}="${this.options.logo}" alt="introduction">
								<div class="info">
									<div class="title">${this.options.title}</div>
									<div class="subTitle">${this.options.subTitle}</div>
								</div>
							</div>
							<div class="right">
								<a href="${this.options.link}" tableindex="-1" class="no-text-decoration"
									data-pjax-state="">前往
								</a>
							</div>
						</div>
                    `;
                }
                innerHTMLs += `
				   </div>
				`;
                this.innerHTML = innerHTMLs;
            }
        }
    );

    // 折叠框 folding
    customElements.define(
        "hao-folding",
        class HaoFolding extends HTMLElement {
            constructor() {
                super();
                this.options = {
                    title: this.getAttribute("title"),
                    color: this.getAttribute("color") || '',
                    type:  this.getAttribute("type") || ''
                };
                const _temp = getChildren(this, "_tpl");
                let contents = _temp.innerHTML.trim().replace(/^(<br>)|(<br>)$/g, "");

                let htmlStr = `
                <details class="folding-tag" ${this.options.color} ${this.options.type}>
                    <summary>${this.options.title}</summary>
                    <div class="content">
                       ${contents}
                    </div>
                </details>
            `;
                this.innerHTML = htmlStr;
            }
        }
    );


    // 链接卡片 link
    customElements.define(
        "hao-tag-link",
        class HaoTagLink extends HTMLElement {
            constructor() {
                super();
                this.options = {
                    link: this.getAttribute("link"),
                    logo: this.getAttribute("logo") || '',
                    title: this.getAttribute("title") || '',
                    described: this.getAttribute("described") || '',
                };
                let tagLinkLeft = `
                <div class="tag-link-left">
                    <i class="haofont hao-icon-link"></i>
                </div>`
                if(this.options.logo!=null && this.options.logo!=''){
                    tagLinkLeft = `
                    <div class="tag-link-left"
                        style="background-image:url(${this.options.logo})">
                    </div>`
                }
                let htmlStr = `
				<div calss="hao-tag-link">
					<a class="tag-Link" target="_blank"
						href="${this.options.link}" rel="external nofollow noreferrer"
						draggable="false">
						<div class="tag-link-tips">引用站外地址</div>
						<div class="tag-link-bottom">
                            ${tagLinkLeft}
							<div class="tag-link-right">
								<div class="tag-link-title">${this.options.title}</div>
								<div class="tag-link-sitename">${this.options.described}</div>
							</div><i class="haofont hao-icon-angle-right"></i>
						</div>
					</a>
				</div>
            `;
                this.innerHTML = htmlStr;
            }
        }
    );


    // Note (Bootstrap Callout)
    customElements.define(
        "hao-note",
        class HaoNote extends HTMLElement {
            constructor() {
                super();
                this.options = {
                    class: this.getAttribute("class") || '',
                    noIcon: this.getAttribute("noIcon") || '',
                    style: this.getAttribute("style") || ''
                };
                let htmlStr = `
				<div class="note ${this.options.class} ${this.options.noIcon} ${this.options.style}">${this.innerHTML.trim().replace(/^(<br>)|(<br>)$/g, "")}</div>
            `;
                this.innerHTML = htmlStr;
            }

        }
    );

    // 上标标签 tip
    customElements.define(
        "hao-tip",
        class HaoTip extends HTMLElement {
            constructor() {
                super();
                this.options = {
                    class: this.getAttribute("class") || 'info',
                    noIcon: this.getAttribute("noIcon") || ''
                };
                let htmlStr = `
				<div class="tip ${this.options.class} ${this.options.noIcon}">${this.innerHTML.trim().replace(/^(<br>)|(<br>)$/g, "")}</div>
            `;
                this.innerHTML = htmlStr;
            }

        }
    );


    // timeline
    customElements.define(
        "hao-timeline",
        class HaoTimeline extends HTMLElement {
            constructor() {
                super();
                this.options = {
                    title: this.getAttribute("title") || '',
                    color: this.getAttribute("color") || ''
                };
                const _temp = getChildren(this, "_tpl");
                let _innerHTML = _temp.innerHTML.trim().replace(/^(<br>)|(<br>)$/g, "");
                let content = "";
                _innerHTML.replace(
                    /{timeline-item([^}]*)}([\s\S]*?){\/timeline-item}/g,
                    function ($0, $1, $2) {
                        content += `
					<div class="timeline-item">
						<div class="timeline-item-title">
						<div class="item-circle">
							<p>${$1}</p>
						</div>
						</div>
						<div class="timeline-item-content">
						${$2.trim().replace(/^(<br>)|(<br>)$/g, "")}
						</div>
					</div>	
				`;
                    }
                );
                let htmlStr = `

					<div class="timeline ${this.options.color}">
						<div class="timeline-item headline">
							<div class="timeline-item-title">
							<div class="item-circle">
								<p>${this.options.title}</p>
							</div>
							</div>
						</div>
						${content}
						
					</div>
			
				`;
                this.innerHTML = htmlStr;
            }
        }
    );


    // 按钮 btns
    customElements.define(
        "hao-btns",
        class HaoBtns extends HTMLElement {
            constructor() {
                super();
                this.options = {
                    class: this.getAttribute("class") || '',
                    style: this.getAttribute("style") || '',
                    grid: this.getAttribute("grid") || '',
                };
                const _temp = getChildren(this, "_tpl");
                let _innerHTML = _temp.innerHTML.trim().replace(/^(<br>)|(<br>)$/g, "");
                let content = "";
                if(this.options.class == 'rounded'){
                    _innerHTML.replace(
                        /{([^}]*)}/g,
                        function ($0, $1) {
                            var str = $1.split(",", 5);
                            if(str.length==5){
                                content += `
									<a target="_blank" rel="noopener external nofollow noreferrer"
										href="${str[2]}"
										class="no-text-decoration"><i class="${str[4]}"></i> <b>${str[0]}</b>
										<p class="p red">${str[1]}</p><img
											${GLOBAL_CONFIG.source.img.src}="${str[3]}">
									</a>
								`;
                            }else{
                                content += `
								<a class="button no-text-decoration" href="${str[1]}" title="${str[0]}">
									<i class="${str[2]}"></i> ${str[0]}
								</a>
							`;
                            }
                        }

                    );
                }

                if(this.options.class == 'circle'){
                    _innerHTML.replace(
                        /{([^}]*)}/g,
                        function ($0, $1) {
                            var str = $1.split(",", 5);
                            if(str.length==5){
                                content += `
									<a target="_blank" rel="noopener external nofollow noreferrer"
										href="${str[2]}"
										class="no-text-decoration"><i class="${str[4]}"></i> <b>${str[0]}</b>
										<p class="p red">${str[1]}</p><img
											${GLOBAL_CONFIG.source.img.src}="${str[3]}">
									</a>
								`;
                            }else{
                                content += `
									<a class="button no-text-decoration" target="_blank" rel="noopener external nofollow noreferrer"
										href="${str[1]}" title="${str[0]}">
										<img
											${GLOBAL_CONFIG.source.img.src}="${str[2]}"/>${str[0]}
									</a>
								`;
                            }
                        }
                    );
                }

                let htmlStr = `
					<div class="btns ${this.options.class} ${this.options.style} ${this.options.grid}">
						${content}
					</div>
				`;
                this.innerHTML = htmlStr;
            }
        }
    );

    // gallerygroup 相册图库
    customElements.define(
        "hao-gallery-group",
        class HaoGalleryGroup extends HTMLElement {
            constructor() {
                super();
                const _temp = getChildren(this, "_tpl");
                let _innerHTML = _temp.innerHTML.trim().replace(/^(<br>)|(<br>)$/g, "");
                let contents = "";
                _innerHTML.replace(
                    /{([^}]*)}/g,
                    function ($0, $1) {
                        var str = $1.split(",",4);
                        contents += `
							<figure class="gallery-group no-lightbox group-two"">
								<img class="gallery-group-img" 
								${GLOBAL_CONFIG.source.img.src}="${str[3]}" 
								alt="Group Image Gallery" >
								<figcaption>
									<div class="gallery-group-name">${str[0]}</div>
									<p>${str[1]}</p><a target="_blank" rel="noopener" href="${str[2]}"></a>
								</figcaption>
							</figure>
						`;
                    }

                );
                let htmlStr = `
				    <div class="gallery-group-main">
					   ${contents}
					</div>
				`;
                this.innerHTML = htmlStr;
            }
        }
    );

    // gallery 相册
    customElements.define(
        "hao-gallery",
        class HaoGallery extends HTMLElement {
            constructor() {
                super();
                const _temp = getChildren(this, "_tpl");
                let _innerHTML = _temp.innerHTML.trim().replace(/^(<br>)|(<br>)$/g, "");
                let contents = "";
                _innerHTML.replace(
                    /{([^}]*)}/g,
                    function ($0, $1) {
                        var str = $1.split(",");
                        str.forEach((item) => {
                            contents += `
								<div class="fj-gallery-item">
									<img src="${item}">
								</div>
							`;
                        });
                    }
                );
                let htmlStr = `
					<section class="page-1 loadings">
						<div class="type-gallery ">
							<div class="gallery">
									${contents}	
							</div>
						</div>
					</section>
				`;
                this.innerHTML = htmlStr;
            }
        }
    );


    // flink 友链标签
    customElements.define(
        "hao-flink",
        class HaoFlink extends HTMLElement {
            constructor() {
                super();
                this.options = {
                    name: this.getAttribute("name"),
                    desc: this.getAttribute("desc"),
                    style: this.getAttribute("style"),
                };
                const _temp = getChildren(this, "_tpl");
                let _innerHTML = _temp.innerHTML.trim().replace(/^(<br>)|(<br>)$/g, "");
                let style = this.options.style;
                let content = "";
                let contents = "";
                let class_desc = "";
                _innerHTML.replace(
                    /{([^}]*)}/g,
                    function ($0, $1) {
                        var flink = $1.split(",",5);
                        if(style=='beautify'){
                            contents +=`
                                <div class="site-card">
                                    <a class="img" target="_blank" href="${flink[1]}" title="${flink[0]}">
                                        <img class="flink-avatar entered loaded" style="pointer-events: none;" alt="${flink[0]}" ${GLOBAL_CONFIG.source.img.src}="${flink[4] || flink[2]}" >
                                    </a>

                                    <a class="info cf-friends-link" target="_blank" href="${flink[1]}" title="${flink[0]}">
                                        <div class="site-card-avatar no-lightbox">
                                            <img class="flink-avatar cf-friends-avatar" alt="${flink[0]}" ${GLOBAL_CONFIG.source.img.src}="${flink[2]}">
                                        </div>
                                        <div class="site-card-text">
                                            <span class="title cf-friends-name">${flink[0]}</span>
                                            <span class="desc" title="${flink[3]}">${flink[3]}</span>
                                        </div>
                                    </a>
                                </div>
                            `
                        }
                        if(style=='default'){
                            contents +=`
                                <div class="flink-list-item">
                                    <a class="cf-friends-link" rel="external nofollow" target="_blank" href="${flink[1]}" title="${flink[0]}">
                                        <img class="flink-avatar cf-friends-avatar" alt="${flink[0]}" ${GLOBAL_CONFIG.source.img.src}="${flink[2]}">
                                        <div class="flink-item-info no-lightbox">
                                            <span class="flink-item-name cf-friends-name">${flink[0]}</span>
                                            <span class="flink-item-desc" title="${flink[3]}">${flink[3]}</span>
                                            <img ${GLOBAL_CONFIG.source.img.src}="${flink[2]}">
                                        </div>
                                    </a>
                                </div>
                            `
                        }
                    }

                );
                if(this.options.desc!=null && this.options.desc!=''){
                    class_desc =`
                     <div class="flink-desc">${this.options.desc}</div>
                    `
                }
                if(this.options.style=='beautify'){
                    content =`
                        <div class="site-card-group">
                          ${contents}
                        </div>
                    `
                }
                if(this.options.style=='default'){
                    content =`
                        <div class="flink-list">
                           ${contents}
                        </div>
                    `
                }
                let htmlStr = `
                    <div class="flink" id="article-container">
                       <div class="flink-name">${this.options.name}</div>
					   ${class_desc}
                       ${content}
					</div>
				`;
                this.innerHTML = htmlStr;
            }
        }
    );


    // 复选列表 checkbox
    customElements.define(
        "hao-checkbox",
        class HaoCheckbox extends HTMLElement {
            constructor() {
                super();
                this.options = {
                    class: this.getAttribute("class") || '',
                    colour: this.getAttribute("colour") || '',
                    status: this.getAttribute("status") || ''

                };
                let htmlStr = `
                <div class="checkbox ${this.options.class} ${this.options.colour} ${this.options.status}"><input type="checkbox" ${this.options.status}><p>${this.innerHTML.trim().replace(/^(<br>)|(<br>)$/g, "")}</p></div>
            `;
                this.innerHTML = htmlStr;
            }

        }
    );

    // tag-hide
    customElements.define(
        "hao-tag-hide",
        class HaoCheckbox extends HTMLElement {
            constructor() {
                super();
                this.options = {
                    display: this.getAttribute("display") || '查看',
                    bg: this.getAttribute("bg") || '',
                    color: this.getAttribute("color") || ''
                };
                let htmlStr = `
                    <span class="hide-inline">
                        <button type="button" class="hide-button" style="background-color:${this.options.bg};color:${this.options.color}">
                        ${this.options.display}<br>
                        </button>
                        <span class="hide-content">${this.innerHTML.trim().replace(/^(<br>)|(<br>)$/g, "")}</span>
                    </span>
                `;
                this.innerHTML = htmlStr;
            }

        }
    );

    customElements.define(
        "hao-dplayer",
        class HaoDplayer extends HTMLElement {
            constructor() {
                super();
                this.options = {
                    src: this.getAttribute("src") || "",
                    player:
                        this.getAttribute("player") ||
                        `/themes/theme-hao/assets/libs/dplayer/dplayer.html?url=`,
                    width: this.getAttribute("width") || "100%",
                    height: this.getAttribute("height") || "500px",
                };
                this.render();
            }
            render() {
                if (this.options.src)
                    this.innerHTML = `<iframe allowfullscreen="true" class="hao_vplayer" src="${
                        this.options.player + this.options.src
                    }" style="width:${this.options.width};height:${
                        this.options.height
                    }"></iframe>`;
                else this.innerHTML = "视频地址未填写！";
            }
        }
    );

});
