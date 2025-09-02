// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  
  // 明确指定目录结构
  srcDir: '.',
  
  // Pages配置
  pages: true,
  
  // Modules配置
  modules: [
    '@pinia/nuxt'
  ],
  
  // CSS配置 - 使用assets目录中的CSS文件
  css: [
    '~/assets/css/zhheoblog.css',
    '~/assets/css/custom.css',
    '~/assets/css/commentBarrage.css',
    '~/assets/css/swiper-bundle.min.css',
    '~/assets/css/snackbar.min.css',
    '~/assets/css/prism.min.css',
    '~/assets/css/code.css',
    '~/assets/css/prism-dracula.css',
    '~/assets/css/prism-base16-ateliersulphurpool.light.css',
    '~/assets/css/iconfont.css',
    '~/assets/css/font_4593626_exv885sf1q5.css',
    '~/assets/css/likcc-notification.css',
    '~/assets/css/var-1.5.1.css',
    '~/assets/css/katex.min.css',
    '~/assets/css/style-1.7.0.css',
    '~/assets/css/index-3.0.0.css',
    '~/assets/css/var-1.5.2.css',
    '~/assets/css/fullPage.css',
    '~/assets/css/APlayer.min.css',
    '~/assets/css/tocbot.css',
    '~/assets/css/loading.css'
  ],
  
  // PostCSS配置
  postcss: {
    plugins: {
      autoprefixer: {},
    },
  },
  
  // Vite配置
  vite: {
    css: {
      postcss: {
        plugins: [
          {
            postcssPlugin: 'internal:charset-removal',
            AtRule: {
              charset: (atRule) => {
                if (atRule.name === 'charset') {
                  atRule.remove();
                }
              }
            }
          }
        ]
      }
    },
    logLevel: 'warn' // 减少日志输出
  },
  
  // App configuration  
  app: {
    layoutTransition: { name: 'layout', mode: 'out-in' },
          head: {
        title: 'IceCMS - Carol 小屋',
        htmlAttrs: {
          lang: 'zh-CN',
          style: 'visibility: hidden; opacity: 0; transition: opacity 0.3s ease;'
        },
        style: [
          {
            innerHTML: `
            /* 防止FOUC的关键CSS */
            #loading-box {
              position: fixed !important;
              top: 0 !important;
              left: 0 !important;
              width: 100% !important;
              height: 100% !important;
              z-index: 9999 !important;
              background: #fff !important;
              display: flex !important;
              align-items: center !important;
              justify-content: center !important;
            }
            
            #loading-box .loading-bg {
              display: flex !important;
              width: 100% !important;
              height: 100% !important;
              position: fixed !important;
              background: #fff !important;
              z-index: 9999 !important;
              opacity: 1 !important;
              align-items: center !important;
              justify-content: center !important;
            }
            
            #loading-box .loading-img {
              width: 100px !important;
              height: 100px !important;
              border-radius: 50% !important;
              animation: loadingAction 1s infinite alternate !important;
            }
            
            #loading-box .loading-image-dot {
              width: 30px !important;
              height: 30px !important;
              background: #6bdf8f !important;
              position: absolute !important;
              border-radius: 50% !important;
              border: 6px solid #fff !important;
              top: 50% !important;
              left: 50% !important;
              transform: translate(18px, 24px) !important;
            }
            
            @keyframes loadingAction {
              from { opacity: 1; }
              to { opacity: 0.6; }
            }
            
            #loading-box.loaded .loading-bg {
              opacity: 0 !important;
              transition: opacity 0.3s ease !important;
            }
            
            @media (prefers-color-scheme: dark) {
              #loading-box, #loading-box .loading-bg {
                background: #1a1a1a !important;
              }
            }
          `
          }
        ],
      meta: [
        { charset: 'utf-8' },
        { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
        { name: 'viewport', content: 'width=device-width,initial-scale=1' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'theme-color', content: 'var(--heo-card-bg)' },
        { name: 'keywords', content: '新·都在,xindu,新都,IceCMS,carol,coral,blog,halo,synology,群晖,nas,java,python,html,Carol博客,博客' },
        { name: 'description', content: '专业的技术,专业的网站,专业的人,只想专业的玩NAS' },
        // Open Graph
        { property: 'og:site_name', content: 'IceCMS' },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'IceCMS' },
        { property: 'og:url', content: 'https://blog.xindu.site' },
        { property: 'og:description', content: '专业的技术,专业的网站,专业的人,只想专业的玩NAS' },
        { property: 'og:image', content: 'https://pic.xindu.site/b/2023/656d4010e1e76.webp?type=blog' },
        // Twitter
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'IceCMS' },
        { name: 'twitter:url', content: 'https://blog.xindu.site' },
        { name: 'twitter:description', content: '专业的技术,专业的网站,专业的人,只想专业的玩NAS' },
        { name: 'twitter:image', content: 'https://pic.xindu.site/b/2023/656d4010e1e76.webp?type=blog' }
      ],
      link: [
        { rel: 'shortcut icon', href: 'https://api.minio.xindu.site/blog.cnkj.site/backup/logo-doiw.png' }
      ],
      script: [
        // 先定义SVG图标初始化函数
        {
          innerHTML: `
            function initSvgIcons() {
               if (window._iconfont_svg_string_4593626) {
                 const existingSvg = document.querySelector('#iconfont-svg-sprite');
                 if (!existingSvg) {
                   // 创建SVG精灵容器
                   const svgSprite = document.createElement('div');
                   svgSprite.id = 'iconfont-svg-sprite';
                   svgSprite.innerHTML = window._iconfont_svg_string_4593626;
                   svgSprite.style.display = 'none';
                   document.body.insertBefore(svgSprite, document.body.firstChild);
                   
                   // 添加SVG图标的CSS样式
                   if (!document.querySelector('#svg-icon-styles')) {
                     const style = document.createElement('style');
                     style.id = 'svg-icon-styles';
                     style.innerHTML = \`
                       .ali_icon {
                         width: 1em;
                         height: 1em;
                         vertical-align: -0.15em;
                         fill: currentColor;
                         overflow: hidden;
                         display: inline-block;
                       }
                       
                       /* 导航菜单中的图标样式 */
                       .menus_item .ali_icon {
                         width: 18px;
                         height: 18px;
                         margin-right: 12px;
                         fill: currentColor;
                         flex-shrink: 0;
                       }
                       
                       .menus_item_child .ali_icon {
                         width: 16px;
                         height: 16px;
                         margin-right: 10px;
                         fill: currentColor;
                         flex-shrink: 0;
                       }
                       
                       /* 头部导航中的图标样式 */
                       .nav .ali_icon {
                         width: 1.2em;
                         height: 1.2em;
                         vertical-align: -0.15em;
                         fill: currentColor;
                         overflow: hidden;
                       }
                       
                       /* 通用SVG图标悬停效果 */
                       .ali_icon:hover {
                         opacity: 0.8;
                         transition: opacity 0.3s ease;
                       }
                       
                       /* 确保SVG图标在不同主题下的颜色正确 */
                       [data-theme="light"] .ali_icon {
                         fill: var(--heo-fontcolor, #363636);
                       }
                       
                       [data-theme="dark"] .ali_icon {
                         fill: var(--heo-fontcolor, #f7f7fa);
                       }
                     \`;
                     document.head.appendChild(style);
                   }
                   
                   console.log('SVG图标及样式已初始化');
                 }
               } else {
                 console.warn('SVG图标字体未加载完成');
               }
             }
            
            // 页面加载完成后初始化
            document.addEventListener('DOMContentLoaded', function() {
              setTimeout(initSvgIcons, 100);
            });
            
            // 脚本加载完成后也尝试初始化
            if (document.readyState === 'loading') {
              document.addEventListener('DOMContentLoaded', initSvgIcons);
            } else {
              setTimeout(initSvgIcons, 50);
            }
          `,
          type: 'text/javascript'
        },
        // 图标字体 - 加载SVG图标字体定义
        {
          src: '/static/js/font_4593626_exv885sf1q5.js',
          type: 'text/javascript'
        },
        {
          innerHTML: `
            var GLOBAL_CONFIG = {
              htmlType: "index",
              postTitle: "",
              isPost: false,
              isHome: true,
              copyright: undefined,
              lightbox: 'fancybox',
              lazyload: {
                enable: false,
                error: "https://api.minio.xindu.site/blog.cnkj.site/backup/2380880178-5c3f060768f92_fix732.webp"
              },
              isFriendLinksInFooter: false,
              loadingBox: true,
              loadProgressBar: true,
              navMusicEnable: false,
              isMusic: false,
              helloText: ["🤖️ 数码科技爱好者"," 🔍 分享与热心帮助"," 🏠 智能家居小能手"," 🔨 设计开发一条龙"," 🤝 专修交互与设计"," 🏃 脚踏实地行动派"," 🧱 团队小组发动机"," 💢 壮汉人狠话不多"],
              profileStyle: "default",
              rightMenuEnable: false,
              date_suffix: {
                just: '刚刚',
                min: '分钟前',
                hour: '小时前',
                day: '天前',
                month: '个月前'
              },
              Snackbar: {
                chs_to_cht: "你已切换为繁体",
                cht_to_chs: "你已切换为简体",
                day_to_night: "你已切换为深色模式",
                night_to_day: "你已切换为浅色模式",
                bgLight: "#425AEF",
                bgDark: "#f2b94b",
                position: "top-center",
              },
              translate: {
                defaultEncoding: 2,
                translateDelay: 0,
                msgToTraditionalChinese: "繁",
                msgToSimplifiedChinese: "简",
                rightMenuMsgToTraditionalChinese: "轉為繁體",
                rightMenuMsgToSimplifiedChinese: "转为简体"
              },
              prism: {
                enable: true,
                enable_title: true,
                enable_hr: true,
                enable_line: true,
                enable_copy: true,
                enable_expander: true,
                prism_limit: Number(300) + 30,
                enable_height_limit: true
              }
            };
          `,
          type: 'text/javascript'
        }
      ]
    }
  }
})
