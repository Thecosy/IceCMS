<template>
  <div class="home">
    <div data-server-rendered="true" id="__nuxt">
      <!---->
      <div id="__layout">
        <div data-fetch-key="0" class="app light macwk-animation">
          <top :message1="acticve"></top>
          <div class="macwk-privacy soft-layout white bg my-6 py-5">
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
                    <div class="w-c w-c-22"><h4>用户协议</h4></div>
                  </div>
                </div>
                <div class="article-global">
                  <p>
                    欢迎你来到IceCMS。
                    在这里，我们将介绍用户在浏览，互动，分享时所要了解并遵守的条款。当你进入IceCMS，成功注册，即成为IceCMS的用户，这将被视为无条件接受该协议所有条款的内容。所以请于注册前仔细阅读以下条款。
                  </p>
                  <h5>一、使用条款</h5>
                  <p>
                    用户一旦注册成功，网站将保存用户的基本资料，包括
                    ID、昵称、密码、邮箱、手机号等信息。其中昵称为用户在本站展示的名称（或名字），用户对该昵称的合法性承担全部责任，不得使用国家法律法规禁止的词语，不得冒充他人，以他人名义发布信息；密码由用户自行设置并负责保管。用户对基本资料的操作所带来的后果以及法律责任，将由用户本人自行承担。
                  </p>
                  <p>
                    IceCMS用户分为用户、作者、签约作者三种角色，各自有不同的权限和权利。
                  </p>
                  <p>
                    用户、作者、签约作者可以在IceCMS任何开放评论的文章中进行评论或回复，以及与任何开放私信的其他账户进行私信交流。评论、回复和私信交流时需遵守《IceCMS评论规范》的相关规定。
                  </p>
                  <p>
                    用户可以通过申请，获得写作权限，成为「作者」。作者拥有发布文章到个人主页，以及投稿到专栏的权限。作者发布到个人主页，以及投稿至专栏的文章，IceCMS有权在网站、旗下应用（App）、社交平台（如微博、微信等）、第三方合作平台（如
                  </p>
                  <p>
                    用户、作者、签约作者应在国家法律法规的约束下理性交流，不得发布违法信息，IceCMS将对以下信息进行删除：
                  </p>
                  <ul>
                    <li>反对宪法所确定的基本原则的；</li>
                    <li>
                      危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的；
                    </li>
                    <li>损害国家荣誉和利益的；</li>
                    <li>煽动民族仇恨、民族歧视，破坏民族团结的；</li>
                    <li>破坏国家宗教政策，宣扬邪教和封建迷信的；</li>
                    <li>散布谣言，扰乱社会秩序，破坏社会稳定的；</li>
                    <li>
                      散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的；
                    </li>
                    <li>侮辱或者诽谤他人，侵害他人合法权益的；</li>
                    <li>含有法律、行政法规禁止的其他内容的。</li>
                  </ul>
                  <p>
                    用户、作者、签约作者不得发布有悖社会公德、违反知识产权等信息，如有涉及，IceCMS有权进行屏蔽或删除。如情节严重，IceCMS有权对该用户、作者、签约作者作禁言处理。
                  </p>

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