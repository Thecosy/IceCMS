<template>
  <div class="Resource">
    <!-- 选择支付方式（登陆） -->
    <el-dialog
      :visible.sync="PaymentDialogVisibleLogin"
      :show-close="false"
      @close="closeDialog"
      width="320px"
      center
    >
      <h6 class="outh5">请选择支付方式</h6>
      <div class="swal2-content">
        <div id="swal2-content" style="display: block">
          <div class="pay-button-box">
            <div
              @click="selectPayTypeLogin('alipay')"
              class="pay-item"
              id="alipay"
              data-type="1"
            >
              <img
                style="margin-right: 14px"
                height="40"
                width="40"
                src="../static/image/pay/zhifubaorenzheng.svg"
              /><span>支付宝</span>
            </div>
            <div
              @click="selectPayTypeLogin('wxpay')"
              class="pay-item"
              id="weixinpay"
              data-type="2"
            >
              <img
                style="margin: 12px"
                height="40"
                width="40"
                src="../static/image/pay/weixinzhifu.svg"
              /><span>微信支付</span>
            </div>
             <div
              @click="selectPayTypeLogin('wxpay')"
              class="pay-item"
              id="weixinpay"
              data-type="2"
            >
              <img
                style="margin: 12px"
                height="40"
                width="40"
                src="../static/image/pay/jifen.svg"
              /><span>积分支付</span>
            </div>
          </div>
          <p style="font-size: 13px; padding: 0; margin: 0"></p>
        </div>
        <input class="swal2-input" style="display: none" /><input
          type="file"
          class="swal2-file"
          style="display: none"
        />
        <div class="swal2-range" style="display: none">
          <input type="range" /><output></output>
        </div>
        <select class="swal2-select" style="display: none"></select>
        <div class="swal2-radio" style="display: none"></div>
        <label for="swal2-checkbox" class="swal2-checkbox" style="display: none"
          ><input type="checkbox" /><span class="swal2-label"></span></label
        ><textarea class="swal2-textarea" style="display: none"></textarea>
        <div
          class="swal2-validation-message"
          id="swal2-validation-message"
          style="display: none"
        ></div>
      </div>
    </el-dialog>
    <!-- 选择支付方式（临时） -->
    <el-dialog
      :visible.sync="PaymentDialogVisibleTemp"
      :show-close="false"
      @close="closeDialog"
      width="320px"
      center
    >
      <h6 class="outh5">请选择支付方式</h6>
      <div class="swal2-content">
        <div id="swal2-content" style="display: block">
          <div class="pay-button-box">
            <div
              @click="selectPayType('alipay')"
              class="pay-item"
              id="alipay"
              data-type="1"
            >
              <img
                style="margin-right: 14px"
                height="40"
                width="40"
                src="../static/image/pay/zhifubaorenzheng.svg"
              /><span>支付宝</span>
            </div>
            <div
              @click="selectPayType('wxpay')"
              class="pay-item"
              id="weixinpay"
              data-type="2"
            >
              <img
                style="margin: 12px"
                height="40"
                width="40"
                src="../static/image/pay/weixinzhifu.svg"
              /><span>微信支付</span>
            </div>
          </div>
          <p style="font-size: 13px; padding: 0; margin: 0">
            当前为游客购买模式
          </p>
        </div>
        <input class="swal2-input" style="display: none" /><input
          type="file"
          class="swal2-file"
          style="display: none"
        />
        <div class="swal2-range" style="display: none">
          <input type="range" /><output></output>
        </div>
        <select class="swal2-select" style="display: none"></select>
        <div class="swal2-radio" style="display: none"></div>
        <label for="swal2-checkbox" class="swal2-checkbox" style="display: none"
          ><input type="checkbox" /><span class="swal2-label"></span></label
        ><textarea class="swal2-textarea" style="display: none"></textarea>
        <div
          class="swal2-validation-message"
          id="swal2-validation-message"
          style="display: none"
        ></div>
      </div>
    </el-dialog>
    <!-- 微信支付二维码 -->
    <div>
      <el-dialog
        :visible.sync="wxDialogVisible"
        :show-close="false"
        @close="closeDialog"
        width="320px"
        center
      >
        <h5 class="outh5">
          <img src="../static/image/pay/weixinbig.png" class="alipaybig_icon" />
        </h5>
        <h5 class="outh5">
          <div class="bottom alipay">使用扫码支付 {{ price / 100 }}元</div>
        </h5>
        <h5 class="outh5">
          <qriously :value="codeUrl" :size="190" />
        </h5>
        <div style="height: 40px"></div>
        <h5 class="outh7">
          <div style="color: #e0e0e0" class="bottom alipay">
            请使用微信扫一扫<br />扫描二维码支付<br />
          </div>
        </h5>
      </el-dialog>
    </div>
    <!-- 支付宝支付二维码 -->
    <div>
      <el-dialog
        :visible.sync="aliDialogVisible"
        :show-close="false"
        @close="closeDialog"
        width="320px"
        center
      >
        <h5 class="outh5">
          <img src="../static/image/pay/alipaybig.png" class="alipaybig_icon" />
        </h5>
        <h5 class="outh5">
          <div class="bottom alipay">使用扫码支付 {{ price / 100 }}元</div>
        </h5>
        <h5 class="outh5">
          <qriously :value="codeUrl" :size="190" />
        </h5>
        <div style="height: 40px"></div>
        <h5 class="outh6">
          <div style="color: #e0e0e0" class="bottom alipay">
            请使用支付宝扫一扫<br />扫描二维码支付<br />
          </div>
        </h5>
      </el-dialog>
    </div>
    <div data-server-rendered="true" id="__nuxt">
      <!---->
      <div id="__layout">
        <div data-fetch-key="0" class="app light macwk-animation">
          <top :message2="acticve" />
          <div class="overflow-hidden pt-5">
            <div class="layout-header pt-5 pb-5 position-relative pc-model">
              <!-- ../static/image/loding.gif -->
              <div>
                <img
                  src="../static/image/shape-1.svg"
                  class="shape-three"
                /><img
                  src="../static/image/shape-55.svg"
                  class="shape-four"
                /><img
                  src="../static/image/shape-56.svg"
                  class="shape-five"
                /><img
                  src="../static/image/shape-57.svg"
                  class="shape-six"
                /><img
                  src="../static/image/shape-58.svg"
                  class="shape-seven"
                /><img
                  src="../static/image/shape-59.svg"
                  class="shape-eight"
                /><img
                  src="../static/image/shape-60.svg"
                  class="shape-nine"
                /><img
                  src="../static/image/shape-61.svg"
                  class="shape-ten"
                /><img
                  src="../static/image/shape-62.svg"
                  class="shape-eleven"
                /><img
                  src="../static/image/shape-10.svg"
                  class="shape-10"
                /><img src="../static/image/shape-11.svg" class="shape-11" />
              </div>
              <div class="container">
                <div class="row align-items-center">
                    <div class="col-xs-12 col-lg-6 col-xl-6 text-center">
                   
                      <div v-if="carouselNum === 0" class="device-frame">
                        <el-carousel height="350px">
                          <el-carousel-item v-for="item in 1" :key="item">
                            <img
                              style="height: 349px; width: 576px"
                              :src="thumb"
                            /><img />
                          </el-carousel-item>
                        </el-carousel>
                      </div>
                      <div v-else class="device-frame">
                        <el-carousel style="    border-radius: 21px;
" height="350px">
                          <el-carousel-item
                            v-for="item in carousel"
                            :key="item"
                          >
                            <img
                              style="height: 349px; width: 576px"
                              :src="item.url"
                            /><img />
                          </el-carousel-item>
                        </el-carousel>
                      </div>
                      <div class="device-stripe"></div>
                      <div class="device-header"></div>
                      <div class="device-sensors"></div>
                      <div class="device-btns"></div>
                      <div class="device-power"></div>
                      <!---->
                    
                  </div>
                  <div class="col-xs-12 col-lg-6 col-xl-6">
                    <div class="header-app">
                      <img class="app-icon mr-3" />
                      <div class="list-body">
                       
                        <h3 style="font-size: 30px;font-weight: 700;
text-rendering: optimizeLegibility;">  {{ this.title }}</h3>
<p style="font-size: 15px;
line-height: 28px;font-weight: 400;" class="mg-bt-42">{{this.intro}}</p>

<div class="infor-bid">
<div class="content-left">
<h6>商品价格</h6>
<div class="value">{{this.price}} &#8194; &#8194;积分</div>
</div>
<div  v-if="this.createTime != null"  class="pagi"> 

                       {{formatDate(this.createTime)}}

                       {{Theweeks}}
                        </div>
                        <div  v-else  class="pagi"> 

                       {{formatDate(this.addTime)}}
                        {{Theweeks}}
                        </div>
</div>

                        <div class="mb-15">
                         <a     v-if="payJudej"  @click="Download()" href="#" data-toggle="modal" data-target="#popup_bid" class="sc-button style letter style-2 style-item-details"><span style="color: #ffffff;font-weight: 700;"><i class="el-icon-download"></i>支付购买</span>
</a>
<a       v-else   @click="NowDownload()" href="#" data-toggle="modal" data-target="#popup_bid" class="sc-button style letter style-2 style-item-details"><span style="color: #ffffff;font-weight: 700;"><i class="el-icon-download"></i>立即购买(已支付)</span>
</a>
                        
                          <button
                            v-if="!lovecheck"
                            @click="loveClick()"
                            class="
                              btn btn-outline-theme btn-round
                              px-5
                              zanUp
                              position-relative
                            "
                          >
                            <img
                          
                              class="dianzan"
                              src="../static/image/dianzan.svg"
                            />
                            赞 ({{ loveNum }})
                            <span class="likeanimation">+1</span>
                          </button>
                          <button
                            v-else
                            @click="loveClick()"
                            class="
                              btn btn-outline-theme btn-round
                              px-5
                              zanUp
                              position-relative
                            "
                          >
                            <img
                              class="dianzan"
                              src="../static/image/dianzanred.svg"
                            />
                            赞 ({{ loveNum }})
                            <span class="likeanimation">+1</span>
                          </button>
                        </div>
                        
                        <div class="mt-4 mb-6">
                          <div class="flat-tabs themesflat-tabs">
<ul class="menu-tab tab-title">
<li class="item-title titleactive">
<span class="inner">最近购买</span>
 </li>
<li class="item-title">
<span class="inner">历史</span>
</li>
<li class="item-title">
<span class="inner">用户</span>
</li>
</ul>
<div class="content-tab">
<div class="content-inner tab-content" style="">
<ul class="bid-history-list">
<li>
<div class="content">
<s></s><div class="author-item">
<div class="avatar">
                                           <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
</div>
<div class="infor">
<p>Bid listed for <span class="status">25 ETH 8</span>
hours ago
by <span class="creator">@Johnson</span> </p>
</div>
</div>
</div>
</li>
<li>
<div class="content">
<div class="author-item">
<div class="avatar">
                                           <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
</div>
<div class="infor">
<p>Bid listed for <span class="status">25 ETH 8</span>
hours ago
by <span class="creator">@Johnson</span> </p>
</div>
</div>
</div>
</li>
<li>
<div class="content">
<div class="author-item">
<div class="avatar">
                                           <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
</div>
<div class="infor">
<p>Bid listed for <span class="status">25 ETH 8</span>
hours ago
by <span class="creator">@Johnson</span> </p>
</div>
</div>
</div>
</li>
</ul>
</div>
 <div class="content-inner tab-content" style="display: none;">
<ul class="bid-history-list">
<li>
<div class="content">
<div class="client">
<div class="author-item">
<div class="avatar">
                                           <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
</div>
<div class="infor">
<p>Bid listed for <span class="status">25 ETH
8</span> hours ago
by <span class="creator">@Johnson</span> </p>
</div>
</div>
</div>
</div>
</li>
</ul>
</div>
<div class="content-inner tab-content" style="display: none;">
<div class="provenance">
<p>Lorem Ipsum is simply dummy text of the printing and typesetting
industry.
Lorem Ipsum has been the industry's standard dummy text ever since
the 1500s,
when an unknown printer took a galley of type and scrambled it to
make a type specimen book.
It has survived not only five centuries, but also the leap into
electronic typesetting,
remaining essentially unchanged. It was popularised in the 1960s
with the release of Letraset sheets containing Lorem Ipsum passages,
and more recently with desktop publishing software like Aldus
PageMaker including versions of Lorem Ipsum.</p>
</div>
</div>
</div>
</div>
                        </div>

                        <div class="mt-6 fs-13">
                          <!---->
                        </div>
                      </div>
                    </div>
                  </div>
                
                </div>
              </div>
            </div>
            <div class="soft-layouts bg mb-8 pc-model">
              <!-- <section class="layout-info">
                <div class="app-info shadow-2 white bg text-center">
                  <div class="w-r">
                    <div class="w-c w-c-4">
                      <div class="border-right my-4">
                        <p class="text-muted text-uppercase fs-10 ls-2 mb-0">
                          大小
                        </p>
                        <p
                          class="
                            mb-0
                            fs-20
                            font-weight-bolder
                            line-height-3
                            opacity-70
                          "
                        >
                          31.9
                        </p>
                        <p class="text-uppercase fs-10 ls-2 mb-0 opacity-70">
                          MB
                        </p>
                      </div>
                    </div>
                    <div class="w-c w-c-4">
                      <div class="border-right my-4">
                        <p class="text-muted text-uppercase fs-10 ls-2 mb-0">
                          下载
                        </p>
                        <p
                        v-if="hits == null" 
                          class="
                            mb-0
                            fs-20
                            font-weight-bolder
                            line-height-3
                            opacity-70
                          "
                        >
                        
                          0
                        </p>
                         <p
                          v-else
                          class="
                            mb-0
                            fs-20
                            font-weight-bolder
                            line-height-3
                            opacity-70
                          "
                        >
                        
                          {{ hits }}
                        </p>
                        <p class="text-uppercase fs-10 ls-2 mb-0 opacity-70">
                          次
                        </p>
                      </div>
                    </div>
                    <div class="w-c w-c-4">
                      <div class="border-right my-4">
                        <p class="text-muted text-uppercase fs-10 ls-2 mb-0">
                          语言
                        </p>
                        <p
                          class="
                            mb-0
                            fs-20
                            font-weight-bolder
                            line-height-3
                            opacity-70
                          "
                        >
                          <span class="text-inherit"> 中文 </span>
                        </p>
                        <p class="text-uppercase fs-10 ls-2 mb-0 opacity-70">
                          cn
                        </p>
                      </div>
                    </div>
                    <div class="w-c w-c-4">
                      <div class="border-right my-4">
                        <p class="text-muted text-uppercase fs-10 ls-2 mb-0">
                          价格
                        </p>
                        <p
                          class="
                            mb-0
                            fs-20
                            font-weight-bolder
                            line-height-3
                            opacity-70
                          "
                        >
                          {{ price }}积分
                        </p>
                        <p class="fs-10 ls-2 mb-0 opacity-70">money</p>
                      </div>
                    </div>
                    <div class="w-c w-c-4">
                      <div class="border-right my-4">
                        <p class="text-muted text-uppercase fs-10 ls-2 mb-0">
                          类别
                        </p>
                        <p
                          class="
                            mb-0
                            fs-20
                            font-weight-bolder
                            line-height-3
                            opacity-70
                            hover-opacity-normal
                          "
                        >
                        <router-link :to="'/classdetal/' + sortClasss">
                          <a >
                            {{ className }}
                            <i class="icon-arrow-r text-muted"></i
                          ></a>
                          </router-link>
                        </p>
                        <p class="fs-10 ls-2 mb-0 opacity-70">enhancement</p>
                      </div>
                    </div>
                    <div class="w-c w-c-4">
                      <div class="my-4">
                        <p class="text-uppercase fs-10 ls-2 mb-0 opacity-40">
                          更新日期
                        </p>

                        <p
                          class="
                            mb-0
                            fs-20
                            font-weight-bolder
                            line-height-3
                            opacity-70
                          "
                          v-if="this.createTime != null"
                          v-text="formatDate(this.createTime)"
                        ></p>
                        <p
                          class="
                            mb-0
                            fs-20
                            font-weight-bolder
                            line-height-3
                            opacity-70
                          "
                          v-else
                          v-text="formatDate(this.addTime)"
                        ></p>
                        <p class="text-uppercase fs-10 ls-2 mb-0 opacity-70">
                          {{ Theweeks }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <section class="layout-content">
                <div
                  id="step-read"
                  class="layout-content-install pt-7 mb-5"
                ></div>
             
                <div id="step-content" class="layout-content-infos">
                  <div class="container">
                    <div class="content-header">
                      <div class="h-150 w-r is-align-middle w-r--flex">
                        <div class="w-c w-c-2">
                          <svg
                            width="80"
                            height="70"
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
                        <div class="w-c w-c-22">
                          <h3>
                            正文概述
                           
                          </h3>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="soft-blockquote fw-400">
                        <div>
                          <p>{{ intro }}</p>
                        </div>
                      </div>
                     
                    </div>
                 
                    <div id="sidelist" v-html="this.content"></div>
                  </div>
                </div>
              
             
              </section> -->
                <div class="row gy-5">
                <div class="col-lg-9">
                    <div class="left-content">
                        <!-- Post card -->
                        <div class="post-card">
                         
                            <div class="card-content">
                               
                                <div class="post-content">
                                    <div>
                                          <h3 class="heading-secondary mar-left">简介</h3>
                                        <div class="post-txt mar-left" id="sidelist" v-html="this.content"></div>
                                            
                                    </div>
                                </div>
                            </div>
                        </div><!-- Tags -->
                        <div class="tags">
                            <h3 class="heading-secondary mar-left">标签</h3>
                            <div class="categories-tags mar-left"><a href="">kitchen </a><a href="">garden </a><a href="">cars
                                </a></div>
                        </div><!-- Author card -->
                        <div class="author-card">
                            <div >
                                <img class="card-img bg-cover" src="../static/img/ice-gave.png" />
                                </div>
                            <div class="card-text">
                                <h3 class="heading-secondary">提 示</h3>
                                <p class="body-text">如有下载链接失效或者资源求档，请发送邮件到：snym@snym.cn，客服QQ：23339097。我们收到消息后会尽快回应消息。使用百度网盘下载，请关闭V*P*N，否则会跳转出错。<a href="https://macoshome.com/course/7692.html">点我查看</a>部分地区蓝奏云下载链接无法访问问题解决。  </p>
                            </div>
                        </div><!-- Post navigation -->
                        <div class="post-navigation">
                          <a >
                            <div class="nav-prev">
                              <div  class="nav-button-left">
                              <span><img src="../static/img/long-arrow-2.png" alt="arrow"></span>
                                             <span>上一篇 </span> </div>
                                <div class="nav-post">
                                        <h3 class="heading-tertiary">Glasses Review:Enterprise Usage</h3>
                                   <span class="date body-text">Feb 06,2022</span></div>
                            </div>
                              </a>
                              <a>
                            <div class="nav-next"><div class="nav-button-right">下一篇 <span><img
                                            src="../static/img/long-arrow.png" alt="arrow"></span></div>
                                <div class="nav-post">
                                        <h3 class="heading-tertiary">Glasses Review:Enterprise Usage</h3>
                                    <span class="date body-text">Feb 06,2022</span></div>
                            </div>
                            </a>
                        </div><!-- Comments -->
                        <!-- <div class="post-comments">
                            <h3 class="heading-secondary">Comments(3)</h3>
                            <div class="comment-card">
                                <div class="card-top">
                                    <div class="card-meta">
                                        <div class="meta-item post-author">
                                            <div class="author-avatar bg-cover" style="
                                                        background-image: url('../static/img/post-author1.png');
                                                    "></div><a href="#" class="author-name">Terence Whittle</a>
                                        </div><span class="meta-item">Feb 06,2022 </span><span class="meta-item">6:15
                                            pm</span>
                                    </div><a href="#" class="button button-replay"><span><img
                                                src="../static/img/corner-left-down.png" alt=""></span>Replay </a>
                                </div>
                                <p class="body-text">My hands really liked it,it was absorbed easily and
                                    quickly,creating a feeling of hydration. And my hands really liked it,it was
                                    absorbed easily and quickly,creating a feeling of hydration. </p>
                            </div>
                            <div class="comment-card replay">
                                <div class="card-top">
                                    <div class="card-meta">
                                        <div class="meta-item post-author">
                                            <div class="author-avatar bg-cover" style="
                                                        background-image: url('../static/img/post-author1.png');
                                                    "></div><a href="#" class="author-name">Ruqayyah Povey</a>
                                        </div><span class="meta-item">Feb 06,2022 </span><span class="meta-item">6:15
                                            pm</span>
                                    </div><a href="#" class="button button-replay"><span><img
                                                src="../static/img/corner-left-down.png" alt=""></span>Replay </a>
                                </div>
                                <p class="body-text">My hands really liked it,it was absorbed easily and
                                    quickly,creating a feeling of hydration. And my hands really liked it,it was
                                    absorbed easily and quickly,creating a feeling of hydration. </p>
                            </div>
                            <div class="comment-card">
                                <div class="card-top">
                                    <div class="card-meta">
                                        <div class="meta-item post-author">
                                            <div class="author-avatar bg-cover" style="
                                                        background-image: url('../static/img/post-author1.png');
                                                    "></div><a href="#" class="author-name">Said Mclean</a>
                                        </div><span class="meta-item">Feb 06,2022 </span><span class="meta-item">6:15
                                            pm</span>
                                    </div><a href="#" class="button button-replay"><span><img
                                                src="../static/img/corner-left-down.png" alt=""></span>Replay </a>
                                </div>
                                <p class="body-text">My hands really liked it,it was absorbed easily and
                                    quickly,creating a feeling of hydration. And my hands really liked it,it was
                                    absorbed easily and quickly,creating a feeling of hydration. </p>
                            </div>
                        </div>
                        <div class="comment-box">
                            <h3 class="heading-secondary">Post a comment</h3>
                            <form class="comment-form">
                                <div class="row">
                                    <div class="col-md-4"><input type="text" placeholder="Your Name"></div>
                                    <div class="col-md-4"><input type="email" placeholder="Your Email"></div>
                                    <div class="col-md-4"><input type="text" placeholder="+1 (___) __ __ ___"></div>
                                    <div class="col-12"><textarea placeholder="Enter your comment"></textarea></div>
                                </div><button class="button button-primary">Post Comment</button>
                            </form>
                        </div> -->
                        <!-- ============= AD CAMPAIGN-2 ============= -->
                        <!-- <div class="ad-campaign-2 bg-cover mt-100"
                            style="background-image: url('../static/img/add-campign-3.png')">
                            <div class="row">
                                <div class="col-lg-6"></div>
                                <div class="col-lg-6">
                                    <div class="right-content">
                                        <div class="content"><span class="discount">20% off</span>
                                            <h2 class="heading-primary">Home furniture</h2>
                                        </div><a href="#" class="button icon-button active"><span class="icon"><i
                                                    class="fas fa-chevron-right"></i></span></a>
                                    </div>
                                </div>
                            </div>
                        </div> -->
                    </div>
                </div>
                <div class="col-lg-3">
                    <div class="right-content">
                        <!-- Widget search box -->
                        <div class="widget-search-box"><input type="text" placeholder="输入内容"><button
                                class="search-btn"><i class="fas el-icon-search"></i></button></div>
                        <h3 class="heading-tertiary">最新发布</h3>
                        <div class="recent-post-card">
                          <a href="">
                            <div>
                            <img class="card-thumb bg-cover" src="../static/img/thumb1.png"  />
                            </div>
                            <div class="card-content">
                                <div class="post-meta"><span class="meta-item">Design </span><span class="meta-item">Feb
                                        06,2022 </span><span class="meta-item"><i class="fal fa-comment"></i>13 </span>
                                </div>
                                    <h3 class="heading-secondary">Animated Cartoon Is The New Future Of Entertainment
                                    </h3>
                            </div>
                          </a>
                        </div>
                        <div class="recent-post-card">
                          <a href="">
                            <div >
                              <img class="card-thumb bg-cover" src="../static/img/thumb2.png"  />
                           </div>
                            <div class="card-content">
                                <div class="post-meta"><span class="meta-item">Food </span><span class="meta-item">Feb
                                        06,2022 </span><span class="meta-item"><i class="el-icon-chat-line-square"></i>13 </span>
                                </div>
                                    <h3 class="heading-secondary">The Beautiful French Village Of Saint-Emilion</h3>
                            </div>
                          </a>
                        </div><!-- Widget category -->
                        <div class="widget-categories">
                            <h3 class="heading-tertiary">标签云</h3>
                            <div class="categories-tags"><a href="" class="active">travel </a><a href="">kitchen </a><a
                                    href="">cars </a><a href="">garden </a><a href="">home </a><a href="">holiday </a><a
                                    href="">software </a><a href="">health </a><a href="">appliences </a><a
                                    href="">money </a><a href="">pets </a><a href="">office </a><a href="">electronics
                                </a><a href="">hobby </a><a href="">baby </a><a href="">digital </a></div>
                        </div><!-- Widget ad banner -->
                        <div class="widget-ad-banner bg-cover"
                            style="">
                            <div class="content"><span class="discount">20% off</span>
                                <h2 class="heading-secondary">Home Garden</h2>
                                <p class="body-text">Magna incididunt commodo aute consectetur cupida.</p><a href="#"
                                    class="button icon-button active"><span><i
                                            class="fas el-icon-caret-right"></i></span></a>
                            </div>
                        </div><!-- Widget social profile -->
                        <div class="widget-social-profile">
                             <h3 class="heading-tertiary mb-20">关注我们</h3>
                            <p class="body-text">找到更多</p>
                            <div class="social-items"><a href="#" class="social-link"><span class="icon"><i
                                            class="el-icon-lollipop"></i>
                                            </span></a><a href="#"
                                    class="social-link"><span class="icon"><i
                                            class="el-icon-ice-cream-square"></i></span></a><a href="#"
                                    class="social-link"><span class="icon"><i class="el-icon-lollipop"></i></span></a>
                            </div>
                        </div><!-- Widget popular post -->
                        <!-- Widget popular post -->
                        <div class="widget-popular-post mt-30">
                            <h3 class="heading-tertiary mb-20">Popular posts</h3><!-- Cat item -->
                            <div class="widget-category">
                                
                                    <img class="cat-thumb bg-cover" src="../static/img/recent-post-sm1.png" />
                                <div class="cat-content"><a href="#">
                                        <h4 class="cat-title">How to Make Every Trip</h4>
                                    </a>
                                    <div class="cat-meta"><span class="post-date meta-item">Feb 06,2022 </span><span
                                            class="meta-item comment"><i class="fal fa-comment"></i>13 </span></div>
                                </div>
                            </div><!-- Cat item -->
                            <div class="widget-category">
                    
                                    <img class="cat-thumb bg-cover" src="../static/img/recent-post-sm2.png" />
                                <div class="cat-content"><a href="#">
                                        <h4 class="cat-title">Mental Shoot Tips to Cope With the End of Summer </h4>
                                    </a>
                                    <div class="cat-meta"><span class="post-date meta-item">Feb 06,2022 </span><span
                                            class="meta-item comment"><i class="fal fa-comment"></i>13 </span></div>
                                </div>
                            </div><!-- Cat item -->
                        </div>
                    </div>
                </div>
            </div>
            </div>
            <div class="mobile-model">
              <div
                class="
                  d-flex
                  layout-min-full-height
                  justify-content-center
                  align-items-center
                "
              >
                <div class="text-center" style="width: 80%; margin: 0 auto">
                  <h1 class="mb-4">哇，窗口太小啦</h1>
                  <p class="mb-6">请调整浏览器窗口大小或者请使用手机查看！</p>
                </div>
              </div>
            </div>
            <div class="el-dialog__wrapper text-center" style="display: none">
              <div
                role="dialog"
                aria-modal="true"
                aria-label="dialog"
                class="el-dialog no-bg no-shadow"
                style="margin-top: 15vh; width: 1300px"
              >
                <div class="el-dialog__header">
                  <span class="el-dialog__title"></span
                  ><button
                    type="button"
                    aria-label="Close"
                    class="el-dialog__headerbtn"
                  >
                    <i class="el-dialog__close el-icon el-icon-close"></i>
                  </button>
                </div>
                <!---->
                <!---->
              </div>
            </div>
            <!---->
            <div
              id="sidetools"
              class="macwk-animation tinUpIn"
              style="display: none"
            >
              <div class="sidetools-item">
                <div class="sidetools-wrapper">
                  <a href="https://t.me/macwk" target="_blank" class="cursor"
                    ><span class="sidetools-icon kfqq"></span
                  ></a>
                </div>
              </div>
              <div class="sidetools-item">
                <div class="sidetools-wrapper">
                  <a class="el-tooltip cursor"
                    ><span class="sidetools-icon back-top"></span
                  ></a>
                </div>
              </div>
              <span>
                <div
                  role="tooltip"
                  id="el-popover-6929"
                  aria-hidden="true"
                  class="el-popover el-popper"
                  style="width: 200px; display: none"
                >
                  <!---->
                  <div class="text-center">
                    <a href="/feedback" class="mt-15 mb-0">在线留言</a>
                  </div>
                </div>
                <span class="el-popover__reference-wrapper"></span>
              </span>
              <span>
                <div
                  role="tooltip"
                  id="el-popover-3926"
                  aria-hidden="true"
                  class="el-popover el-popper"
                  style="width: 200px; display: none"
                >
                  <!---->
                  <div class="text-center">
                    <a href="/feedback" class="mt-15 mb-0">在线留言</a>
                  </div>
                </div>
                <span class="el-popover__reference-wrapper"></span>
              </span>
            </div>
            <!---->
            <!---->
          </div>
          <!-- v-on:click="show = !show"
                v-if="!show" -->
          <div class="myVEmojiPicker">
            <VEmojiPicker
              v-show="showDialog"
              :style="{ width: '340px', height: '200' }"
              labelSearch="Search"
              lang="pt-BR"
              @select="onSelectEmoji"
            />
          </div>
          <!-- 后台控制是否显示评论 -->
          <!-- <div v-if="!this.glabledata.glableCommentShow">
            <div v-show="!judjeComment"> -->
          <section
            v-if="mycomment"
            @click="sendMsg"
            class="
              fiexd-comments-bar
              d-flex
              align-items-center
              is-scroll
              macwk-animation
              slow
              pc-model
              tinRightIn
            "
          >
            <div
              class="
                d-flex
                align-items-center
                fs-20
                fw-700
                cursor-pointer
                w-full
                pl-3
              "
            >
              <div class="flex">
                共
                <span class="fs-36 mx-1"> {{ this.commentnum }}</span>
                条评论
              </div>
              <svg
                color="inherit"
                viewbox="0 0 32 32"
                class="w-32"
                style="
                  width: 1.5em;
                  height: 1.5em;
                  font-size: 2rem;
                  vertical-align: -6px;
                "
              >
                <path
                  fill="#FFFFFF"
                  d="M12.63,26.46H8.83a6.61,6.61,0,0,1-6.65-6.07,89.05,89.05,0,0,1,0-11.2A6.5,6.5,0,0,1,8.23,3.25a121.62,121.62,0,0,1,15.51,0A6.51,6.51,0,0,1,29.8,9.19a77.53,77.53,0,0,1,0,11.2,6.61,6.61,0,0,1-6.66,6.07H19.48L12.63,31V26.46"
                ></path>
                <path
                  d="M19.57,21.68h3.67a2.08,2.08,0,0,0,2.11-1.81,89.86,89.86,0,0,0,0-10.38,1.9,1.9,0,0,0-1.84-1.74,113.15,113.15,0,0,0-15,0A1.9,1.9,0,0,0,6.71,9.49a74.92,74.92,0,0,0-.06,10.38,2,2,0,0,0,2.1,1.81h3.81V26.5Z"
                  class="comment-icon-path"
                ></path>
              </svg>
            </div>
          </section>
          <!-- </div>
          </div> -->
          <comment
            :articleId="this.$route.params.id"
            :theEmoge="this.MyEmoge"
            ref="child"
            @closethecpmmentName="updateDate()"
            @openthecpmmentName="showemoge()"
          />
          <!---->
          <!---->
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
import { VEmojiPicker, emojisDefault, categoriesDefault } from "v-emoji-picker";

import top from './components/Top.vue'
import foot from './components/Foots.vue'
import comment from './components/ResComment.vue'

import { getResourceCommentnum } from '@/api/webresourceComment'
import { getResourceById, loveresource } from '@/api/webresource'
import { getResourceClassNameByid } from '@/api/webresourceclass'

import { formatDate, GetWeekdate } from '@/utils/date.js'

import wxPayApi from '../api/payment/wxPay'
import aliPayApi from '../api/payment/aliPay'
import orderInfoApi from '../api/payment/orderInfo'
export default {

  name: 'Resource',
  components: {
    top, foot, comment, VEmojiPicker

  },
  created() {
    //数据回填
    this.fetchData(this.$route.params.id)
    //根据Id查询用户是否购买过此资源
    const user = JSON.parse(window.localStorage.getItem('access-admin'))
    this.userJudje = (user == null)
    if (!this.userJudje) {
      this.userid = user.data.userid
      this.queryOrderStatusBytrues(this.$route.params.id, this.userid)
    }

    //获取资源评论数量
    getResourceCommentnum(this.$route.params.id).then(resp => {
      this.commentnum = resp.data
    })
  },

  methods: {
    loveClick() {
      if (!this.lovecheck) {
        if (this.firstLoveFlag) {
          loveresource(this.$route.params.id).then(resp => {
          })
          this.firstLoveFlag = false
        }
        this.$notify({
          title: '点赞成功👍',
          message: '您的赞我们已经收到',
          type: 'success',
          offset: 50
        });
        this.loveNum += 1
        this.lovecheck = true
      }
      else {
        this.$notify({
          title: '取消点赞',
          message: '已取消点赞',
          type: 'success',
          offset: 50
        });
        this.loveNum -= 1
        this.lovecheck = false
      }
    },
    onSelectEmoji(emoji) {
      this.MyEmoge = emoji.data;
    },
    showemoge() {
      // console.log("show")
      this.showDialog = !this.showDialog;
    },
    sendMsg() {
      this.$refs.child.getMsg('true');
      this.mycomment = false;
    },
    updateDate() {
      //关闭表情
      this.showDialog = false
      // console.log(data.show)
      this.mycomment = true;
      // console.log("调用了父组件的方法")
      // this.show1 = data.show;
      //改变了父组件的值
      // console.log('toCity:'+this.show1)
    },
    formatDate(time) {
      let data = new Date(time)
      return formatDate(data, 'yyyy-MM-dd ')
    },
    queryOrderStatusBytrues(resourceid, userid) {
      orderInfoApi.queryOrderStatusBytrue(userid, resourceid).then(response => {
        //检查已登陆用户是否购买过此资源，根据userid和resourceid判断
        if (response.data.code == 0) {
          this.payJudej = false
        }
        if (response.data.code == 101) {
          this.payJudej = true
        }

      })
    },
    // 查询订单状态
    queryOrderStatus() {
      orderInfoApi.queryOrderStatus(this.orderNo).then(response => {
        console.log('查询订单状态：' + response.data.code)

        // 支付成功后的页面跳转
        if (response.data.code === 0) {
          console.log('清除定时器')
          clearInterval(this.timer)
          // 关闭页面支付框
          this.wxDialogVisible = false
          this.aliDialogVisible = false
          this.$notify({
            title: '支付成功',
            message: '您已成功购买',
            type: 'success',
            offset: 50
          });
          // 三秒后跳转到订单列表
          setTimeout(() => {
            this.$router.push({ path: '/download/' + this.$route.params.id })
          }, 500)
        }
      })
    },

    //关闭微信支付二维码对话框时让“确认支付”按钮可用
    closeDialog() {
      console.log('close.................')
      this.payBtnDisabled = false
      console.log('清除定时器')
      clearInterval(this.timer)
    },

    //选择支付方式(登陆)
    selectPayTypeLogin(type) {
      console.log('支付方式：' + type)
      this.payOrder.payType = type
      //关闭支付方式选择
      this.PaymentDialogVisibleTemp = false
      this.PaymentDialogVisibleLogin = false
      //打开对应支付页面

      //支付宝支付
      if (this.payOrder.payType === 'alipay') {
        this.aliDialogVisible = true
        //调用统一下单接口
        aliPayApi.ftofPayLogin(this.$route.params.id, this.userid).then(response => {
          this.codeUrl = response.data.data.codeUrl
          this.orderNo = response.data.data.orderNo

          //启动定时器
          this.timer = setInterval(() => {
            //查询订单是否支付成功
            this.queryOrderStatus()
          }, 3000)

        })
      }
      //微信支付
      if (this.payOrder.payType === 'wxpay') {
        //打开支付二维码
        this.wxDialogVisible = true
        //调用统一下单接口
        wxPayApi.nativePayLogin(this.$route.params.id, this.userid).then(response => {
          console.log(response.data.data.codeUrl)
          this.codeUrl = response.data.data.codeUrl
          this.orderNo = response.data.data.orderNo

          //启动定时器
          this.timer = setInterval(() => {
            //查询订单是否支付成功
            this.queryOrderStatus()
          }, 3000)

        })

      }
    },
    //选择支付方式(临时)
    selectPayType(type) {
      console.log('支付方式：' + type)
      this.payOrder.payType = type
      //关闭支付方式选择
      this.PaymentDialogVisibleTemp = false
      this.PaymentDialogVisibleLogin = false
      //打开对应支付页面
      //支付宝支付
      if (this.payOrder.payType === 'alipay') {
        this.aliDialogVisible = true
        //调用统一下单接口
        aliPayApi.ftofPayTemp(this.$route.params.id).then(response => {
          this.codeUrl = response.data.data.codeUrl
          this.orderNo = response.data.data.orderNo

          //启动定时器
          this.timer = setInterval(() => {
            //查询订单是否支付成功
            this.queryOrderStatus()
          }, 3000)

        })
      }
      //微信支付
      if (this.payOrder.payType === 'wxpay') {
        //打开支付二维码
        this.wxDialogVisible = true

        //调用统一下单接口
        wxPayApi.nativePayTemp(this.$route.params.id).then(response => {
          console.log(response.data.data.codeUrl)
          this.codeUrl = response.data.data.codeUrl
          this.orderNo = response.data.data.orderNo

          //启动定时器
          this.timer = setInterval(() => {
            //查询订单是否支付成功
            this.queryOrderStatus()
          }, 3000)

        })

      }
    },
    NowDownload() {
      setTimeout(() => {
        this.$router.push({ path: '/download/' + this.$route.params.id })
      }, 500)

    },
    Download() {
      const user = JSON.parse(window.localStorage.getItem('access-admin'))
      this.userJudje = (user == null)
      if (!this.userJudje) { this.userid = user.data.userid }
      if (this.userJudje) {
        //游客购买
        console.log("游客购买")
        //禁用按钮，防止重复提交
        this.payBtnDisabled = true
        //打开支付方式选择
        this.PaymentDialogVisibleTemp = true

      }
      else {
        //登陆用户购买
        console.log("登陆用户购买")
        //禁用按钮，防止重复提交
        this.payBtnDisabled = true

        //打开支付方式选择
        this.PaymentDialogVisibleLogin = true
      }
    },
    fetchData(id) {
      getResourceById(id).then(resp => {
        console.log(resp)
        this.hits = resp.data.hits
        this.loveNum = resp.data.loveNum
        if (this.loveNum == null) {
          this.loveNum = 0
        }
        this.thumb = resp.data.thumb
        this.title = resp.data.title
        this.price = resp.data.price
        this.author = resp.data.author
        this.content = resp.data.content
        this.intro = resp.data.intro

        var str = JSON.parse(resp.data.carousel)
        // this.carouselNum = str.length
        this.carousel = str
        var sortClasss = resp.data.sortClass
         this.sortClasss = sortClasss
        //根据classid获取分类名称
        getResourceClassNameByid(sortClasss).then(resp => {
          this.className = resp.data;
        })
       this.addTime = resp.data.addTime
         this.createTime = resp.data.createTime
        if (resp.data.createTime != null) {
        

          let data = new Date(resp.data.createTime)
          var intime = formatDate(data, 'yyyy-MM-dd')
          var tiems = GetWeekdate(intime)
          this.Theweeks = this.weeks[tiems]
          console.log(resp.data.createTime)
          console.log(data)



        } else {
   

          let data = new Date(resp.data.addTime)
          var intime = formatDate(data, 'yyyy-MM-dd')
          var tiems = GetWeekdate(intime)
          this.Theweeks = this.weeks[tiems]
        }
        this.intro = resp.data.intro

      })

    },
  },
  data() {
    return {
      createTime: '',
      addTime: '',
      lovecheck: false,
      firstLoveFlag: true,
      loveNum: "",
      hits: "",
      carouselNum: "",
      commentnum: "",
      MyEmoge: "",
      showDialog: false,
      mycomment: true,
      carousel: [],
      className: "",
      sortClasss: "",
      sortClass: "",
      Theweeks: "",
      weeks: {
        "0": '星期日',
        "1": '星期一',
        "2": '星期二',
        "3": '星期三',
        "4": '星期四',
        "5": '星期五',
        "6": '星期六',
      },

      payJudej: true,
      payBtnDisabled: false,
      orderNo: "",
      codeUrl: "url",
      payOrder: { //订单信息
        productId: '', //商品id
        payType: 'wxpay' //支付方式
      },
      PaymentDialogVisibleLogin: false, //支付方式弹窗
      PaymentDialogVisibleTemp: false, //支付方式弹窗
      wxDialogVisible: false, //微信支付二维码弹窗
      aliDialogVisible: false, //支付宝支付二维码弹窗
      intro: "",
      content: "",
      price: "",
      title: "",
      acticve: 'nav-link active',
    }
  },
}
</script>

<style scoped src="../static/mycss/blog.css"></style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mar-left {
  margin-left: 15px;
}
.post-txt {
    font-size: 15px;
    font-weight: 440;
    color: #27222b;
    margin-top: 0;
    margin-bottom: 1rem;
}
.chat-container {
  z-index: 20 !important;
  border-radius: 10px !important;
  -webkit-box-shadow: 0 5px 25px 0 rgb(0 0 0 / 13%) !important;
  box-shadow: 0 5px 25px 0 rgb(0 0 0 / 13%) !important;
  background-color: #fff !important;
  width: 360px !important;
  height: 80% !important;
  left: auto !important;
  right: 20px !important;
  bottom: 20px !important;
}
</style>
  
<style scoped>
.myVEmojiPicker ::v-deep.category {
  background: none;
}
.myVEmojiPicker ::v-deep .border {
  border: 0px solid hsla(210, 8%, 51%, 0.09) !important;
}
.myVEmojiPicker ::v-deep .myVEmojiPicker[data-v-3bfe90b7] .border {
  border: 0px solid hsla(210, 8%, 51%, 0.09) !important;
}

.myVEmojiPicker ::v-deep .category.active[data-v-6d975e7c] {
  border-bottom: 3px solid #50a1ff;
}
.myVEmojiPicker ::v-deep .grid-emojis[data-v-5c988bee] {
  background: #ffffff;
}
.myVEmojiPicker ::v-deep .emoji-picker[data-v-f1d527bc] {
  --ep-color-bg: #ffffff;
  --ep-color-sbg: none;
}
.myVEmojiPicker {
  position: fixed;
  display: flex;
  flex-direction: column;
  right: 390px;
  bottom: 20px;
  z-index: 10;
}
.alipaybig_icon {
  display: inline-block;
  width: 120px;
  margin: 0;
  padding: 0;
  text-align: center;
}
.outh5 {
  padding: 0px;
  display: flex;
  align-content: flex-end;
  justify-content: center;
  flex-wrap: wrap;
}
.outh6 {
  height: 66px;
  text-align: center;
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 320px;
  background-color: #01a7ef;
  padding: 7px;
  display: flex;
  align-content: flex-end;
  justify-content: center;
  flex-wrap: wrap;
  border-radius: 0 0 10px 10px;
}
.outh7 {
  height: 66px;
  text-align: center;
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 320px;
  background-color: #09bb21;
  padding: 7px;
  display: flex;
  align-content: flex-end;
  justify-content: center;
  flex-wrap: wrap;
  border-radius: 0 0 10px 10px;
}
</style>
<style scoped>
.el-dialog--center {
  border-radius: 10px;
}
.el-dialog--center .el-dialog__body {
  border-radius: 10px;
  text-align: initial;
  background-color: #fff;
}
.el-dialog__header {
  display: none;
  background-color: #e0e0e0;
}
</style>
<style scoped>
.pay-button-box {
  padding: 12px 30px;
  z-index: 1;
  text-align: center;
}
.swal2-content {
  z-index: 1;
  justify-content: center;
  margin: 0;
  padding: 0;
  color: #545454;
  font-size: 1.125em;
  font-weight: 300;
  line-height: normal;
  text-align: center;
  word-wrap: break-word;
}
.pay-item {
  width: 100%;
  height: 60px;
  border: 0;
  cursor: pointer;
  font-size: 1.25rem;
  display: inline-block;
  line-height: 60px;
  text-align: center;
}
.device-macbook-pro .device-frame:before {
  bottom: 10px;
  color: #c8cacb;
  content: "IceCMS.com";
  font-size: 12px;
  height: 16px;
  left: 50%;
  line-height: 16px;
  margin-left: -100px;
  position: absolute;
  text-align: center;
  width: 200px;
  z-index: 1;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.dianzan {
  weight: 25px;
  height: 25px;
}
.btn-outline-theme:hover .dianzan{
  weight: 25px;
  height: 25px;
  position: relative;
    left: -80px;
    filter: drop-shadow(#fff 80px 0);
}
.soft-layouts {
      margin: 0 auto;
    overflow: hidden;
        width: 1170px;
}
.el-carousel__item[data-v-3aa17da5]:nth-child(2n + 1) {
    background-color: #d3dce6;
    border-radius: 17px;
}
.sc-button.style-item-details {
width: 240px;
height: 55px;
line-height: 55px;
padding: unset;
text-align: center;
}
.sc-button.style-2:hover {
background-position: right center;
}
.sc-button.style-2 {
background-image: linear-gradient(to left, #6345ED 58.12%, #DC39FC 81.74%);
border: unset;
background-size: 200% auto;
}
a:hover, a:focus {
color: var(--primary-color3);
text-decoration: none;
outline: 0;
-webkit-transition: all 0.3s ease-in-out;
-moz-transition: all 0.3s ease-in-out;
-ms-transition: all 0.3s ease-in-out;
-o-transition: all 0.3s ease-in-out;
transition: all 0.3s ease-in-out;
}
.sc-button {
display: inline-block;
position: relative;
padding: 9px 22px;
border-radius: 100px !important;
border: 0 none;
outline: 0 none;
cursor: pointer;
z-index: 1;
}
.menu-tab {
display: flex;
margin-bottom: 29px;
}
.titleactive {
background-color: #6345ED;
color: #fff;
box-shadow: unset;
}
.menu-tab li {
border-radius: 104px;
padding: 8px 21px;
font-size: 14px;
font-weight: 700;
margin-right: 8px;
cursor: pointer;
box-shadow: 4px 4px 60px rgba(99, 69, 237, 0.3);
-webkit-transition: all 0.3s ease-in-out;
-moz-transition: all 0.3s ease-in-out;
-ms-transition: all 0.3s ease-in-out;
-o-transition: all 0.3s ease-in-out;
transition: all 0.3s ease-in-out;
}
.author-item {
display: flex;
align-items: center;
}
.bid-history-list li {
margin-bottom: 17px;
}
.infor {
margin-top: -2px;
display: flex;
    text-align: center;


}
.infor p{
margin:0 auto;width:300px;

}
.btn-outline-theme {
    margin-left: 17px;
}
.btn-outline-theme {
    margin-left: 17px;
}
.btn-outline-theme:hover {
color: #fff;
}
.dianzan:hover {
color: #fff;
}
.fas {
font-weight: 900;
}
.infor-bid {
background: var(--color-4);
box-shadow: 4px 4px 60px rgba(99, 69, 237, 0.15);
border-radius: 8px;
padding: 17px 31px;
display: flex;
justify-content: space-between;
align-items: flex-end;
font-size: 13px;
margin-right: 17px;
margin-bottom: 31px;
}

.value {
    font-size: 15px;
    font-weight: 700;
    line-height: 10px;
    letter-spacing: 0.0015em;
    color: #50A0FF;
}
@media screen and (max-width:991px){
  .col-lg-3{display:none; }
  .post-content {
  width: 617px;
    /* overflow: auto; */
    /* padding: 20px; */
    line-height: 1.5;
    margin-right: 50px;
}
}
.post-content {
  width: 817px;
    /* overflow: auto; */
    /* padding: 20px; */
    line-height: 1.5;
    margin-right: 50px;
}
</style>

