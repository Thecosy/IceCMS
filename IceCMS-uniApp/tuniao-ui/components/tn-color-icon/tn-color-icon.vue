<template>
  <text
    class="tn-color-icon-class tn-color-icon"
    :class="[
      'tn-color-icon-' + name
    ]"
    :style="{
      fontSize: size + unit,
      margin: margin
    }"
    @tap="handleClick"
  ></text>
</template>

<script>
  export default {
    name: 'tn-color-icon',
    props: {
      // 索引
      index: {
        type: [Number, String],
        default: '0'
      },
      // 图标名称
      name: {
        type: String,
        default: ''
      },
      // 图标大小
      size: {
        type: Number,
        default:32
      },
      // 大小单位
      unit: {
        type: String,
        default: 'px'
      },
      // 外边距
      margin: {
        type: String,
        default: '0'
      }
    },
    computed: {
      
    },
    data() {
      return {
        
      }
    },
    methods: {
      // 处理点击事件
      handleClick() {
        this.$emit("click", {
          index: Number(this.index)
        })
        this.$emit("tap", {
          index: Number(this.index)
        })
      }
    }
  }
</script>

<style scoped>
  @charset "UTF-8";
  
  @font-face {
    font-family: "tuniaoColorFont"; /* Project id 2445412 */
    /* Color fonts */
    src: url('iconfont.woff2?t=1632654518618') format('woff2');
  }
  
  .tn-color-icon {
    font-family: "tuniaoColorFont" !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    text-decoration: none;
  }
  
  .tn-color-icon-logo-github:before {
    content: "\e601";
  }
  
  .tn-color-icon-logo-qq:before {
    content: "\e602";
  }
  
  .tn-color-icon-logo-weixin:before {
    content: "\e603";
  }
  
  .tn-color-icon-logo-alipay:before {
    content: "\e604";
  }
  
  .tn-color-icon-logo-weibo:before {
    content: "\e605";
  }
  
  .tn-color-icon-logo-dingtalk:before {
    content: "\e606";
  }
  
  .tn-color-icon-safe:before {
    content: "\e607";
  }
  
  .tn-color-icon-wifi:before {
    content: "\e608";
  }
  
  .tn-color-icon-help:before {
    content: "\e609";
  }
  
  .tn-color-icon-tag:before {
    content: "\e60a";
  }
  
  .tn-color-icon-play:before {
    content: "\e60b";
  }
  
  .tn-color-icon-stopwatch:before {
    content: "\e60c";
  }
  
  .tn-color-icon-home:before {
    content: "\e60d";
  }
  
  .tn-color-icon-map:before {
    content: "\e60e";
  }
  
  .tn-color-icon-book:before {
    content: "\e60f";
  }
  
  .tn-color-icon-qrcode:before {
    content: "\e610";
  }
  
  .tn-color-icon-discover:before {
    content: "\e611";
  }
  
  .tn-color-icon-visitor:before {
    content: "\e612";
  }
  
  .tn-color-icon-menu:before {
    content: "\e613";
  }
  
  .tn-color-icon-renew:before {
    content: "\e614";
  }
  
  .tn-color-icon-business:before {
    content: "\e615";
  }
  
  .tn-color-icon-telephone:before {
    content: "\e616";
  }
  
  .tn-color-icon-medicine:before {
    content: "\e617";
  }
  
  .tn-color-icon-chicken:before {
    content: "\e618";
  }
  
  .tn-color-icon-clock:before {
    content: "\e619";
  }
  
  .tn-color-icon-download:before {
    content: "\e61a";
  }
  
  .tn-color-icon-lamp:before {
    content: "\e61b";
  }
  
  .tn-color-icon-hourglass:before {
    content: "\e61c";
  }
  
  .tn-color-icon-calendar:before {
    content: "\e61d";
  }
  
  .tn-color-icon-bluetooth:before {
    content: "\e61e";
  }
  
  .tn-color-icon-fish:before {
    content: "\e61f";
  }
  
  .tn-color-icon-seal:before {
    content: "\e620";
  }
  
  .tn-color-icon-remind:before {
    content: "\e621";
  }
  
  .tn-color-icon-music:before {
    content: "\e622";
  }
  
  .tn-color-icon-email:before {
    content: "\e623";
  }
  
  .tn-color-icon-medal:before {
    content: "\e624";
  }
  
  .tn-color-icon-image:before {
    content: "\e625";
  }
  
  .tn-color-icon-network:before {
    content: "\e626";
  }
  
  .tn-color-icon-wallet:before {
    content: "\e627";
  }
  
  .tn-color-icon-program:before {
    content: "\e628";
  }
  
  .tn-color-icon-shrimp:before {
    content: "\e629";
  }
  
  .tn-color-icon-collect:before {
    content: "\e62a";
  }
  
  .tn-color-icon-screw:before {
    content: "\e62b";
  }
  
  .tn-color-icon-set:before {
    content: "\e62c";
  }
  
  .tn-color-icon-userfavorite:before {
    content: "\e62d";
  }
  
  .tn-color-icon-useradd:before {
    content: "\e62e";
  }
  
  .tn-color-icon-honor:before {
    content: "\e62f";
  }
  
  .tn-color-icon-shop:before {
    content: "\e630";
  }
  
  .tn-color-icon-usercard:before {
    content: "\e631";
  }
  
  .tn-color-icon-school:before {
    content: "\e632";
  }
  
  .tn-color-icon-user:before {
    content: "\e633";
  }
  
  .tn-color-icon-internet:before {
    content: "\e634";
  }
  
  .tn-color-icon-time:before {
    content: "\e635";
  }
  
  .tn-color-icon-topic:before {
    content: "\e636";
  }
  
  .tn-color-icon-phone:before {
    content: "\e637";
  }
  
  .tn-color-icon-usertable:before {
    content: "\e638";
  }
  
  .tn-color-icon-userset:before {
    content: "\e639";
  }
  
  .tn-color-icon-game:before {
    content: "\e63a";
  }
  
</style>
