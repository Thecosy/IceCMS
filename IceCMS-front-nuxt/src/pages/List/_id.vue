<template>
  <div class="Resource">
    <!-- 选择支付方式（登录） -->
    <el-dialog :visible.sync="PaymentDialogVisibleLogin" :show-close="false" @close="closeDialog" width="320px" center>
      <h6 class="outh5">请选择支付方式</h6>
      <div class="swal2-content">
        <div id="swal2-content" style="display: block">
          <div class="pay-button-box">
            <div @click="selectPayTypeLogin('alipay')" class="pay-item" id="alipay" data-type="1">
              <img style="margin-right: 14px" height="40" width="40"
                src="../../static/image/pay/zhifubaorenzheng.svg" /><span>支付宝</span>
            </div>
            <div @click="selectPayTypeLogin('wxpay')" class="pay-item" id="weixinpay" data-type="2">
              <img style="margin: 12px" height="40" width="40"
                src="../../static/image/pay/weixinzhifu.svg" /><span>微信支付</span>
            </div>
            <div @click="selectPayTypeLogin('wxpay')" class="pay-item" id="weixinpay" data-type="2">
              <img style="margin: 12px" height="40" width="40"
                src="../../static/image/pay/jifen.svg" /><span>积分支付</span>
            </div>
          </div>
          <p style="font-size: 13px; padding: 0; margin: 0"></p>
        </div>
        <input class="swal2-input" style="display: none" /><input type="file" class="swal2-file"
          style="display: none" />
        <div class="swal2-range" style="display: none">
          <input type="range" /><output></output>
        </div>
        <select class="swal2-select" style="display: none"></select>
        <div class="swal2-radio" style="display: none"></div>
        <label for="swal2-checkbox" class="swal2-checkbox" style="display: none"><input type="checkbox" /><span
            class="swal2-label"></span></label><textarea class="swal2-textarea" style="display: none"></textarea>
        <div class="swal2-validation-message" id="swal2-validation-message" style="display: none"></div>
      </div>
    </el-dialog>
    <!-- 选择支付方式（临时） -->
    <el-dialog :visible.sync="PaymentDialogVisibleTemp" :show-close="false" @close="closeDialog" width="320px" center>
      <h6 class="outh5">请选择支付方式</h6>
      <div class="swal2-content">
        <div id="swal2-content" style="display: block">
          <div class="pay-button-box">
            <div @click="selectPayType('alipay')" class="pay-item" id="alipay" data-type="1">
              <img style="margin-right: 14px" height="40" width="40"
                src="../../static/image/pay/zhifubaorenzheng.svg" /><span>支付宝</span>
            </div>
            <div @click="selectPayType('wxpay')" class="pay-item" id="weixinpay" data-type="2">
              <img style="margin: 12px" height="40" width="40"
                src="../../static/image/pay/weixinzhifu.svg" /><span>微信支付</span>
            </div>
          </div>
          <p style="font-size: 13px; padding: 0; margin: 0">
            当前为游客购买模式
          </p>
        </div>
        <input class="swal2-input" style="display: none" /><input type="file" class="swal2-file"
          style="display: none" />
        <div class="swal2-range" style="display: none">
          <input type="range" /><output></output>
        </div>
        <select class="swal2-select" style="display: none"></select>
        <div class="swal2-radio" style="display: none"></div>
        <label for="swal2-checkbox" class="swal2-checkbox" style="display: none"><input type="checkbox" /><span
            class="swal2-label"></span></label><textarea class="swal2-textarea" style="display: none"></textarea>
        <div class="swal2-validation-message" id="swal2-validation-message" style="display: none"></div>
      </div>
    </el-dialog>
    <!-- 微信支付二维码 -->
    <div>
      <el-dialog :visible.sync="wxDialogVisible" :show-close="false" @close="closeDialog" width="320px" center>
        <h5 class="outh5">
          <img src="../../static/image/pay/weixinbig.png" class="alipaybig_icon" />
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
      <el-dialog :visible.sync="aliDialogVisible" :show-close="false" @close="closeDialog" width="320px" center>
        <h5 class="outh5">
          <img src="../../static/image/pay/alipaybig.png" class="alipaybig_icon" />
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
                <img src="../../static/image/shape-1.svg" class="shape-three" /><img
                  src="../../static/image/shape-55.svg" class="shape-four" /><img src="../../static/image/shape-56.svg"
                  class="shape-five" /><img src="../../static/image/shape-57.svg" class="shape-six" /><img
                  src="../../static/image/shape-58.svg" class="shape-seven" /><img src="../../static/image/shape-59.svg"
                  class="shape-eight" /><img src="../../static/image/shape-60.svg" class="shape-nine" /><img
                  src="../../static/image/shape-61.svg" class="shape-ten" /><img src="../../static/image/shape-62.svg"
                  class="shape-eleven" /><img src="../../static/image/shape-10.svg" class="shape-10" /><img
                  src="../../static/image/shape-11.svg" class="shape-11" />
              </div>
              <div v-if="videoAddress != null" class="container">
                <div class="row align-items-center">
                  <div class="col-xs-12 col-lg-6 col-xl-6">
                    <div class="header-app">
                      <img class="app-icon mr-3" />
                      <div class="list-body">
                        <h2 class="mb-4">
                          {{ title }}
                          <!---->
                          <!---->
                          <!---->
                          <!---->
                          <!---->
                        </h2>
                        <div class="mb-15">
                          <el-button size="mini" v-if="payJudej" :disabled="payBtnDisabled" @click="Download()"
                            class="btn btn-theme btn-round w-200 cursor mr-4" round><i class="el-icon-download"></i>
                            支付下载</el-button>
                          <el-button size="mini" v-else :disabled="payBtnDisabled" @click="NowDownload()"
                            class="btn btn-theme btn-round w-200 cursor mr-4" round><i class="el-icon-download"></i>
                            立即下载(已支付)</el-button>
                          <button v-if="!lovecheck" @click="loveClick()" class="
                              btn btn-outline-theme btn-round
                              px-5
                              zanUp
                              position-relative
                            ">
                            <img class="dianzan" src="../../static/image/dianzan.svg" />
                            赞 ({{ loveNum }})
                            <span class="likeanimation">+1</span>
                          </button>
                          <button v-else @click="loveClick()" class="
                              btn btn-outline-theme btn-round
                              px-5
                              zanUp
                              position-relative
                            ">
                            <img class="dianzan" src="../../static/image/dianzanred.svg" />
                            赞 ({{ loveNum }})
                            <span class="likeanimation">+1</span>
                          </button>
                        </div>
                        <div class="mt-4 mb-6"></div>

                        <div class="mt-6 fs-13">
                          <!---->
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-xs-12 col-lg-6 col-xl-6 text-center">
                    <vue-core-video-player :src="videoSource" :title="this.title"></vue-core-video-player>

                    <!-- <div class="
                        device device-macbook-pro device-silver device-silver
                      ">
                      <div class="device-frame">


                      </div>
                      <div class="device-stripe"></div>
                      <div class="device-header"></div>
                      <div class="device-sensors"></div>
                      <div class="device-btns"></div>
                      <div class="device-power"></div>
                    </div> -->
                  </div>

              </div>
              </div>
              <div v-else class="container">
                <div class="row align-items-center">
                  <div class="col-xs-12 col-lg-6 col-xl-6">
                    <div class="header-app">
                      <img class="app-icon mr-3" />
                      <div class="list-body">
                        <h2 class="mb-4">
                          {{ title }}
                          <!---->
                          <!---->
                          <!---->
                          <!---->
                          <!---->
                        </h2>
                        <div class="mb-15">
                          <el-button size="mini" v-if="payJudej" :disabled="payBtnDisabled" @click="Download()"
                            class="btn btn-theme btn-round w-200 cursor mr-4" round><i class="el-icon-download"></i>
                            支付下载</el-button>
                          <el-button size="mini" v-else :disabled="payBtnDisabled" @click="NowDownload()"
                            class="btn btn-theme btn-round w-200 cursor mr-4" round><i class="el-icon-download"></i>
                            立即下载(已支付)</el-button>
                          <button v-if="!lovecheck" @click="loveClick()" class="
                              btn btn-outline-theme btn-round
                              px-5
                              zanUp
                              position-relative
                            ">
                            <img class="dianzan" src="../../static/image/dianzan.svg" />
                            赞 ({{ loveNum }})
                            <span class="likeanimation">+1</span>
                          </button>
                          <button v-else @click="loveClick()" class="
                              btn btn-outline-theme btn-round
                              px-5
                              zanUp
                              position-relative
                            ">
                            <img class="dianzan" src="../../static/image/dianzanred.svg" />
                            赞 ({{ loveNum }})
                            <span class="likeanimation">+1</span>
                          </button>
                        </div>
                        <div class="mt-4 mb-6"></div>

                        <div class="mt-6 fs-13">
                          <!---->
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-xs-12 col-lg-6 col-xl-6 text-center">
                    <div class="
                        device device-macbook-pro device-silver device-silver
                      ">
                      <div v-if="carouselNum === 0" class="device-frame">
                        <el-carousel height="350px">
                          <el-carousel-item v-for="item in 1" :key="item">
                            <img style="height: 360px; width: 620px" :src="thumb" /><img />
                          </el-carousel-item>
                        </el-carousel>
                      </div>
                      <div v-else class="device-frame">
                        <el-carousel height="350px">
                          <el-carousel-item v-for="item in carousel" :key="item">
                            <img style="height: 360px; width: 620px" :src="item.url" /><img />
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
                  </div>
                </div>
              </div>
            </div>
            <div class="soft-layout white bg mb-8 pc-model">
              <section class="layout-info">
                <div class="app-info shadow-2 white bg text-center">
                  <div class="w-r">
                    <div class="w-c w-c-4">
                      <div class="border-right my-4">
                        <p class="text-muted text-uppercase fs-10 ls-2 mb-0">
                          大小
                        </p>
                        <p class="
                            mb-0
                            fs-20
                            font-weight-bolder
                            line-height-3
                            opacity-70
                          ">
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
                        <p v-if="hits == null" class="
                            mb-0
                            fs-20
                            font-weight-bolder
                            line-height-3
                            opacity-70
                          ">

                          0
                        </p>
                        <p v-else class="
                            mb-0
                            fs-20
                            font-weight-bolder
                            line-height-3
                            opacity-70
                          ">

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
                        <p class="
                            mb-0
                            fs-20
                            font-weight-bolder
                            line-height-3
                            opacity-70
                          ">
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
                        <p class="
                            mb-0
                            fs-20
                            font-weight-bolder
                            line-height-3
                            opacity-70
                          ">
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
                        <p class="
                            mb-0
                            fs-20
                            font-weight-bolder
                            line-height-3
                            opacity-70
                            hover-opacity-normal
                          ">

                          <a :href="'/classdetal/' + sortClasss">
                            {{ className }}
                            <i class="icon-arrow-r text-muted"></i></a>
                        </p>
                        <p class="fs-10 ls-2 mb-0 opacity-70">enhancement</p>
                      </div>
                    </div>
                    <div class="w-c w-c-4">
                      <div class="my-4">
                        <p class="text-uppercase fs-10 ls-2 mb-0 opacity-40">
                          更新日期
                        </p>

                        <p class="
                            mb-0
                            fs-20
                            font-weight-bolder
                            line-height-3
                            opacity-70
                          " v-if="this.createTime != null" v-text="formatDate(this.createTime)"></p>
                        <p class="
                            mb-0
                            fs-20
                            font-weight-bolder
                            line-height-3
                            opacity-70
                          " v-else v-text="formatDate(this.addTime)"></p>
                        <p class="text-uppercase fs-10 ls-2 mb-0 opacity-70">
                          {{ Theweeks }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <section class="layout-content">
                <div id="step-read" class="layout-content-install pt-7 mb-5"></div>
                <!---->
                <!---->
                <div id="step-content" class="layout-content-infos">
                  <div class="container">
                    <div class="content-header">
                      <div class="h-150 w-r is-align-middle w-r--flex">
                        <div class="w-c w-c-2">
                          <svg width="80" height="70" viewBox="0 0 125 107" xmlns="http://www.w3.org/2000/svg">
                            <g fill="none" fill-rule="evenodd">
                              <circle cx="48" cy="59" r="48" class="circle-fill"></circle>
                              <path
                                d="M58.536 39.713c0-6.884 1.72-14.007 5.163-21.368 3.443-7.36 8.167-13.458 14.173-18.292l11.645 7.91c-3.589 4.98-6.262 10.016-8.02 15.106S78.86 33.598 78.86 39.384v13.623H58.536V39.713z"
                                class="path-fill"></path>
                              <path
                                d="M93.252 39.713c0-6.884 1.722-14.007 5.164-21.368 3.442-7.36 8.166-13.458 14.172-18.292l11.646 7.91c-3.589 4.98-6.262 10.016-8.02 15.106s-2.637 10.529-2.637 16.315v13.623H93.252V39.713z"
                                class="path-fill-1"></path>
                            </g>
                          </svg>
                        </div>
                        <div class="w-c w-c-22">
                          <h3>
                            正文概述
                            <!---->
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
                      <!---->
                      <!---->
                    </div>
                    <!-- 内容区域 -->
                    <div id="sidelist" v-html="this.content"></div>
                  </div>
                </div>
                <!---->
                <!---->
              </section>
            </div>
            <div class="mobile-model">
              <div class="
                  d-flex
                  layout-min-full-height
                  justify-content-center
                  align-items-center
                ">
                <div class="text-center" style="width: 80%; margin: 0 auto">
                  <h1 class="mb-4">哇，窗口太小啦</h1>
                  <p class="mb-6">请调整浏览器窗口大小或者请使用手机查看！</p>
                </div>
              </div>
            </div>
            <div class="el-dialog__wrapper text-center" style="display: none">
              <div role="dialog" aria-modal="true" aria-label="dialog" class="el-dialog no-bg no-shadow"
                style="margin-top: 15vh; width: 1300px">
                <div class="el-dialog__header">
                  <span class="el-dialog__title"></span><button type="button" aria-label="Close"
                    class="el-dialog__headerbtn">
                    <i class="el-dialog__close el-icon el-icon-close"></i>
                  </button>
                </div>
                <!---->
                <!---->
              </div>
            </div>
            <!---->
            <div id="sidetools" class="macwk-animation tinUpIn" style="display: none">
              <div class="sidetools-item">
                <div class="sidetools-wrapper">
                  <a href="https://t.me/macwk" target="_blank" class="cursor"><span
                      class="sidetools-icon kfqq"></span></a>
                </div>
              </div>
              <div class="sidetools-item">
                <div class="sidetools-wrapper">
                  <a class="el-tooltip cursor"><span class="sidetools-icon back-top"></span></a>
                </div>
              </div>
              <span>
                <div role="tooltip" id="el-popover-6929" aria-hidden="true" class="el-popover el-popper"
                  style="width: 200px; display: none">
                  <!---->
                  <div class="text-center">
                    <a href="/feedback" class="mt-15 mb-0">在线留言</a>
                  </div>
                </div>
                <span class="el-popover__reference-wrapper"></span>
              </span>
              <span>
                <div role="tooltip" id="el-popover-3926" aria-hidden="true" class="el-popover el-popper"
                  style="width: 200px; display: none">
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
          <client-only>
            <div class="myVEmojiPicker">
              <VEmojiPicker v-show="showDialog" :style="{ width: '340px', height: '200' }" labelSearch="Search"
                lang="pt-BR" @select="onSelectEmoji" />
            </div>
          </client-only>
          <!-- 后台控制是否显示评论 -->
          <!-- <div v-if="!this.glabledata.glableCommentShow">
            <div v-show="!judjeComment"> -->
          <section v-if="mycomment" @click="sendMsg" class="
              fiexd-comments-bar
              d-flex
              align-items-center
              is-scroll
              macwk-animation
              slow
              pc-model
              tinRightIn
            ">
            <div class="
                d-flex
                align-items-center
                fs-20
                fw-700
                cursor-pointer
                w-full
                pl-3
              ">
              <div class="flex">
                共
                <span class="fs-36 mx-1">{{ commentnum || 0 }}</span>
                条评论
              </div>
              <svg color="inherit" viewbox="0 0 32 32" class="w-32" style="
                  width: 1.5em;
                  height: 1.5em;
                  font-size: 2rem;
                  vertical-align: -6px;
                ">
                <path fill="#FFFFFF"
                  d="M12.63,26.46H8.83a6.61,6.61,0,0,1-6.65-6.07,89.05,89.05,0,0,1,0-11.2A6.5,6.5,0,0,1,8.23,3.25a121.62,121.62,0,0,1,15.51,0A6.51,6.51,0,0,1,29.8,9.19a77.53,77.53,0,0,1,0,11.2,6.61,6.61,0,0,1-6.66,6.07H19.48L12.63,31V26.46">
                </path>
                <path
                  d="M19.57,21.68h3.67a2.08,2.08,0,0,0,2.11-1.81,89.86,89.86,0,0,0,0-10.38,1.9,1.9,0,0,0-1.84-1.74,113.15,113.15,0,0,0-15,0A1.9,1.9,0,0,0,6.71,9.49a74.92,74.92,0,0,0-.06,10.38,2,2,0,0,0,2.1,1.81h3.81V26.5Z"
                  class="comment-icon-path"></path>
              </svg>
            </div>
          </section>
          <!-- </div>
          </div> -->
          <comment :articleId="this.$route.params.id" :theEmoge="this.MyEmoge" ref="child"
            @closethecpmmentName="updateDate()" @openthecpmmentName="showemoge()" />
          <!---->
          <!---->
          <foot />
          <div infos="0">
            <div class="
                adBanner
                pub_300x250 pub_300x250m pub_728x90
                text-ad
                textAd
                text_ad text_ads text-ads text-ad-links
              "></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { getResourceById } from "../../asyncApi/webresource";

import { VEmojiPicker, emojisDefault, categoriesDefault } from "v-emoji-picker";

import comment from '../components/ResComment.vue'

import { getResourceCommentnum } from '@/api/webresourceComment'
import { loveresource } from '@/api/webresource'
import { getResourceClassNameByid } from '@/api/webresourceclass'

import { formatDate, GetWeekdate } from '@/utils/date.js'

import wxPayApi from '../../api/payment/wxPay'
import aliPayApi from '../../api/payment/aliPay'
import orderInfoApi from '../../api/payment/orderInfo'
export default {

  name: 'Resource',
  components: {
    top: () => import("../components/Top.vue"),
    foot: () => import("../components/Foots.vue"),
    comment, VEmojiPicker

  },
  // 当你想要动态页面内容有利于SEO或者是提升首屏渲染速度的时候，就在asyncData中请求数据
  // 所有接口通过服务端调用渲染
  // 只有列表通过服务端调用渲染，分类跟推荐接口在浏览器调用
  async asyncData({ route }) {
    let [Resource] = await Promise.all([
      getResourceById({ page: route.params.id || 1 }),
    ]);
    return {
      Resource: Resource,
      createTime: Resource.createTime,
      addTime: Resource.addTime,
      page: parseInt(route.params.id || 1),
    };
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
          message: '您的赞我们已经收到🫡',
          type: 'success',
          offset: 50
        });
        this.loveNum += 1
        this.lovecheck = true
      }
      else {
        this.$notify({
          title: '取消点赞',
          message: '是什么让您不喜欢了吗，我道歉',
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

    //选择支付方式(登录)
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
      if (process.client) {
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
          //登录用户购买
          console.log("登录用户购买")
          //禁用按钮，防止重复提交
          this.payBtnDisabled = true

          //打开支付方式选择
          this.PaymentDialogVisibleLogin = true
        }
      }
    },
    async judgeResource() {
      const user = JSON.parse(window.localStorage.getItem('access-admin'))
      this.userJudje = (user == null)
      if (!this.userJudje) {
        this.userid = user.data.userid
        let [res] = await orderInfoApi.queryOrderStatusBytrue(this.$route.params.id, this.userid);
        if (res) {
          //检查已登录用户是否购买过此资源，根据userid和resourceid判断
          if (res.data.code == 0) {
            this.payJudej = false
          }
          if (res.data.code == 101) {
            this.payJudej = true
          }
        }
      }
    },
    async fetchData() {
      this.hits = this.Resource.hits
      this.loveNum = this.Resource.loveNum
      if (this.loveNum == null) {
        this.loveNum = 0
      }
      this.videoAddress = this.Resource.videoAddress
      // 将this.videoAddress封装为videoSource形式
      this.videoSource = [{
        src: this.videoAddress,
        resolution: '1080p' // 你也可以根据需求添加其他分辨率
      }];
      console.log(this.videoAddress)
      this.thumb = this.Resource.thumb
      this.title = this.Resource.title
      this.price = this.Resource.price
      this.author = this.Resource.author
      this.content = this.Resource.content
      this.intro = this.Resource.intro

      var str = JSON.parse(this.Resource.carousel)
      this.carouselNum = str.length
      this.carousel = str
      var sortClasss = this.Resource.sortClass
      this.sortClasss = sortClasss
      //根据classid获取分类名称
      let [res] = await getResourceClassNameByid(sortClasss);
      if (res) {
        this.className = res.data;
      }
      //获取资源评论数量
      getResourceCommentnum(this.$route.params.id).then(resp => {
        this.commentnum = resp.data
      })
      if (this.createTime != null) {
        let data = new Date(this.createTime)
        var intime = formatDate(data, 'yyyy-MM-dd')
        var tiems = GetWeekdate(intime)
        this.Theweeks = this.weeks[tiems]
      } else {
        let data = new Date(this.addTime)
        var intime = formatDate(data, 'yyyy-MM-dd')
        var tiems = GetWeekdate(intime)
        this.Theweeks = this.weeks[tiems]
      }
      this.intro = this.Resource.intro
    },
  },
  data() {
    return {
      videoSource: [],
      videoAddress: "",
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
  mounted() {
    // 判断是否在服务端
    if (process.client) {
      // this.lazyLoad();
      // 在浏览器端调接口，需要服务端做反向代理
      // //数据回填
      this.fetchData()
    } else {
      //根据Id查询用户是否购买过此资源
      this.judgeResource()
    }

    // 顶部广告
    // (window.slotbydup = window.slotbydup || []).push({
    //   id: "u6324930",
    //   container: "_utrtw8kq5so",
    //   async: true,
    // });
  },
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
.myVEmojiPicker :deep(.category) {
  background: none;
}

.myVEmojiPicker :deep(.border) {
  border: 0px solid hsla(210, 8%, 51%, 0.09) !important;
}

.myVEmojiPicker :deep(.myVEmojiPicker[data-v-3bfe90b7]) .border {
  border: 0px solid hsla(210, 8%, 51%, 0.09) !important;
}

.myVEmojiPicker :deep(.category.active[data-v-6d975e7c]) {
  border-bottom: 3px solid #50a1ff;
}

.myVEmojiPicker :deep(.grid-emojis[data-v-5c988bee]) {
  background: #ffffff;
}

.myVEmojiPicker :deep(.emoji-picker[data-v-f1d527bc]) {
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
<style>
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
  content: "IceCMS.cn";
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

.player-container-out {
  width: 70%;
  display: flex;
}
</style>
