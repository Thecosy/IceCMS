<template>
  <div class="home">
    <div data-server-rendered="true" id="__nuxt">
      <!---->
      <div id="__layout">
        <div data-fetch-key="0" class="app light IceCMS-animation">
          <top :message1="acticve"></top>
          <div class="IceCMS-privacy soft-layout white bg my-6 py-5">
            <section class="layout-content">
              <div class="container">
                <div class="content-header feedback-header">
                  <div class="h-150 w-r is-align-middle w-r--flex">
                    <div class="w-c w-c-2">
                      <svg
                        width="70"
                        height="60"
                        viewBox="0 0 125 107"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g fill="none" fill-rule="evenodd">
                          <circle
                            cx="48"
                            cy="59"
                            r="48"
                            class="circle-fill"
                          ></circle>
                          <path
                            d="M58.536 39.713c0-6.884 1.72-14.007 5.163-21.368 3.443-7.36 8.167-13.458 14.173-18.292l11.645 7.91c-3.589 4.98-6.262 10.016-8.02 15.106S78.86 33.598 78.86 39.384v13.623H58.536V39.713z"
                            class="path-fill"
                          ></path>
                          <path
                            d="M93.252 39.713c0-6.884 1.722-14.007 5.164-21.368 3.442-7.36 8.166-13.458 14.172-18.292l11.646 7.91c-3.589 4.98-6.262 10.016-8.02 15.106s-2.637 10.529-2.637 16.315v13.623H93.252V39.713z"
                            class="path-fill-1"
                          ></path>
                        </g>
                      </svg>
                    </div>
                    <div class="w-c w-c-22"><h4>隐私政策</h4></div>
                  </div>
                </div>
                <div class="article-global">
                  <p>
                    IceCMS
                    非常重视用户的隐私和个人信息保护。您在使用网站时，可能会收集和使用您的相关信息。希望通过《IceCMS隐私政策》向您说明在您使用
                    IceCMS 网站时，如何收集、使用、保存、共享和转让这些信息。
                  </p>
                  <h5>一、如何收集和使用您的个人信息</h5>
                  <p>
                    网络身份标识信息（浏览器UA、IP地址）；个人位置信息（定位信息、经纬度）；电子邮件地址。
                  </p>
                  <p>仅会出于以下目的，收集和使用您的个人信息：</p>
                  <ul>
                    <li>
                      评论/反馈/提交应用时会记录您的邮箱，当我回复后会通过邮件通知您（主动，存储，不会公开邮箱）
                    </li>
                    <li>
                      评论/反馈/提交应用时会记录您的位置信息，用作展示所在地所用，如北京市的网友（被动，存储，不会公开IP）
                    </li>
                    <li>
                      评论/反馈/提交应用时会记录您的浏览器代理，用作展示系统版本方便大家参考以及我回复问题时可以快速定位问题（被动，存储）
                    </li>
                    <li>
                      下载时会记录您的IP地址，防止被恶意调用可及时封禁相应IP（被动，存储，定期清理数据）
                    </li>
                    <li>
                      顶部天气预报会读取您的经纬度用作查询位置所用（被动，存储）
                    </li>
                  </ul>
                  <p>
                    除了以上5条还有一个是百度的访客统计，这个数据是百度管理的，再也没有其它的了！
                  </p>
                  <h5>二、如何使用 Cookies 和本地 LocalStorage 存储</h5>
                  <p>
                    大家都知道，IceCMS
                    是没有会员注册功能的，为实现无账号评论、网站风格切换、浏览模式切换功能，会在您的浏览器中进行本地存储，您可以随时清除浏览器中保存的所有
                    Cookies 以及 LocalStorage。
                  </p>
                  <h5>三、如何共享、转让您的个人信息</h5>
                  <ul>
                    <li>不会与任何公司、组织和个人共享您的个人信息</li>
                    <li>不会将您的个人信息转让给任何公司、组织和个人</li>
                  </ul>
                  <p class="text-danger">
                    另外需要特别说明的是 IceCMS
                    的所有客户端应用一律不会收集及存储您的任何信息，如：macOS
                    小助手、IceCMS 应用更新器
                  </p>
                  <h5>所有使用到的信息如下：</h5>
                  <!---->
                </div>
              </div>
            </section>
          </div>
          <foot />
          <div infos="0">
            <div
              class="
                adBanner
                pub_300x250 pub_300x250m pub_728x90
                text-ad
                textAd
                text_ad text_ads text-ads text-ad-links
              "
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import top from './components/Top.vue'
import foot from './components/Foots.vue'

export default ({
  name: 'List',
  components: { top, foot },
  data() {
    return {
      acticve: 'nav-link active',
    }
  },

})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../static/mycss/top.css";
@import "../static/mycss/body.css";
</style>