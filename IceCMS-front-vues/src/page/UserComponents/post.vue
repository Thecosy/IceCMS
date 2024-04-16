<template>
    <div class="home">
      <div class="homeContent">
        <div class="mw-row" style="width: 100%;display: flex;flex-wrap: wrap;">
        <div style="margin-left: 30px;width: 220px;" v-for="item, index in datafrom">
                                  <router-link :target="istarget" :to="'/post/' + item.id">
                                    <a  class="macwk-app border white cursor-pointer padding-xl">

                                      <div data-v-2661c954="" class="soft-card">
                                        <div data-v-2661c954="" class="li-card-img-div">
                                          <img data-v-2661c954="" :src="item.thumb"
                                            class="budongImg img72 dingweiImg" />
                                          <transition name="fade">
                                            <img data-v-2661c954="" :src="item.thumb"
                                              class="gaosiImg img72 dingweiImg" />
                                          </transition>
                                        </div>
                                        <div data-v-2661c954="" class="size-12 text-B6BABF margin-top-90"
                                          style="min-height: 20px;">
                                          <span data-v-2661c954="">{{item.author }}</span>
                                        </div>
                                        <div data-v-2661c954=""
                                          class="margin-top size-18 text-bold  text-block card-hover-red">
                                          <span data-v-2661c954="">{{item.title }}</span>
                                        </div>
                                        <div data-v-2661c954="" class="margin-top1 size-14 text-B6BABF limitText">
                                          <span data-v-2661c954="">{{item.intro}}</span>
                                        </div>
                                        <div data-v-2661c954="" class="margin-top2 text-B6BABF flex-row size-12"
                                          style=" bottom: 20px; width: 100%;">
                                          <div data-v-2661c954="">
                                            <i data-v-2661c954="" class="el-icon-view"></i>
                                            <span data-v-2661c954="">34.5k</span>
                                          </div>
                                          <div data-v-2661c954="" style="margin-left: 6px;" class="margin-left">
                                            <i data-v-2661c954="" class="el-icon-download"></i>
                                            <span data-v-2661c954="">1500</span>
                                          </div>
                                       
                                        </div>
                                      </div>

                                    </a>

                                  </router-link>
                                </div>
                            </div>
      </div>
    </div>
  </template>
  <script>
import { getAllResourcebyAuthor } from '@/api/webresource'
import { getAllArticlebyAuthor } from '@/api/webarticle'

  export default {
    data() {
      return {
        form: {
          userId: '',
          name: '',
          email: '',
          integral: '',
          intro: '',
        },
        datafrom:[],
      }
    },
    created() {
      this.getmywork()
    },
    methods: {
        getmywork() {
        const user = JSON.parse(window.localStorage.getItem('access-admin'))

        getAllArticlebyAuthor(user.data.username).then(resp => {
        //获取分类
        console.log(resp)
        this.datafrom = resp.data
      })

    },

    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  .site-content {
    display: flex;
    padding: 20px;
    margin-left: 43px;
    margin-right: 43px;
  }
  .usertopName {
    display: flex;
  }
  .home {
    background-color: #ffffff;
    border-radius: 13px;
  }
  .homeContent {
    margin-top: 40px;
  }
  </style>
  !-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  .macwk-app__body {
    padding: 13px 9px 5px;
  }
  
  .macwk-animation .delay-3 {
    border-radius: 8px 8px 0px 0px;
  }
  
  .listtitleimg {
    height: 155px;
    width: 100%;
  }
  </style>
  
  <style lang="scss" scoped>
  .delay-3 {
    ::v-deep {
      .el-image__inner {
        border-radius: 8px 8px 0px 0px;
      }
    }
  }
  
  .delayImg {
    height: 155px;
    width: 100%;
    border-radius: 8px 8px 0px 0px;
  }
  
  .app-content-main .app-content-bottom {
    border-radius: 15px;
  }
  
  .heading-tertiary-list {
    font-size: 15px;
    line-height: 23px;
    font-weight: 670;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  
  .card-meta {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    border-bottom: 1px solid #dcdcdc;
    padding-bottom: 1px;
    margin-bottom: 3px;
  }
  
  .post-author {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  }
  
  .meta-item {
    margin-right: 18px;
    position: relative;
    font-size: 14px;
  }
  
  .author-name {
    font-size: 12px;
    font-weight: 600;
    font-family: "Advent Pro", sans-serif;
    color: #222;
  }
  
  .value {
    font-size: 15px;
    font-weight: 700;
    line-height: 10px;
    letter-spacing: 0.0015em;
    color: #50A0FF;
  }
  
  .button {
    display: flex;
    font-size: 16px;
    font-weight: 700;
    font-family: "Titillium Web", sans-serif;
    flex-direction: row;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: space-between;
    align-items: center;
  }
  
  .meta-item:not(:last-child)::after {
    content: "";
    width: 5px;
    height: 5px;
    background-color: #177ef7;
    border-radius: 50%;
    position: absolute;
    right: -15px;
    top: 50%;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
  }
  </style>
  <style  scoped>
  .gaosiImg {
    filter: blur(20px) opacity(70%) brightness(110%);
    transition: .3s;
    ;
    z-index: 8
  }
  
  .dingweiImg,
  .recommendDingweiImg {
    position: absolute;
    top: 15px !important;
    left: 20px !important
  }
  
  .img72,
  .imgQueXing3 {
    width: 72px;
    height: 72px;
  }
  
  .margin-top-90 {
    margin-top: 90px;
  }
  
  .text-block {
    color: #3c4248;
  }
  
  .text-bold {
    font-weight: 700;
  }
  
  .size-18 {
    font-size: 18px;
  }
  
  .margin-top {
    margin-top: 10px;
  }
  
  .cursor {
    cursor: pointer;
  }
  
  .padding-xl {
    padding: 20px;
  }
  
  .text-B6BABF {
    color: #b6babf;
  }
  
  .size-14 {
    font-size: 14px;
  }
  
  .margin-top {
    margin-top: 10px;
  }
  
  .limitText {
    max-width: 180px;
    height: 20px;
    overflow: hidden;
  }
  
  .flex-row {
    display: flex;
    flex-direction: row !important;
  }
  
  .size-12 {
    font-size: 12px;
  }
  
  .margin-top2 {
    margin-top: 20px;
  }
  
  .home /deep/ .el-skeleton {
    display: flex;
    flex-wrap: wrap;
  }
  </style>