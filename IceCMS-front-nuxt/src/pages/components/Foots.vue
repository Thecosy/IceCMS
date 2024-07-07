<template>
  <div class="macwk-footer white border-top pc-model">
    <div class="container">
      <a href="/" class="logo">
        <!-- <svg id="macwk-svg-logo" width="32" height="32"
          xmlns="http://www.w3.org/2000/svg">
          <defs>
            <lineargradient x1="50%" y1="0%" x2="50%" y2="100%" id="a">
              <stop offset="0%" class="stop-color-circle"></stop>
              <stop offset="100%" class="stop-color-circle"></stop>
            </lineargradient>
            <lineargradient x1="100%" y1="86.198%" x2="-14.813%" y2="-4.357%" id="b">
              <stop offset="0%" class="stop-color-default"></stop>
              <stop offset="40.927%" class="stop-color-default"></stop>
              <stop offset="100%" class="stop-color-default"></stop>
            </lineargradient>
            <lineargradient x1="86.515%" y1="24.533%" x2="0%" y2="24.533%" id="c">
              <stop stop-opacity="0" offset="0%" class="stop-color-default"></stop>
              <stop offset="100%" class="stop-color-default-linearGradient"></stop>
            </lineargradient>
          </defs>
          <g fill="none" fill-rule="evenodd">
            <path
              d="M29.952 16c0-1.933-1.562-3.5-3.488-3.5a3.494 3.494 0 0 0-3.488 3.5c0 1.933 1.561 3.5 3.488 3.5a3.494 3.494 0 0 0 3.488-3.5"
              fill="url(#a)"></path>
            <path
              d="M25.865 25.9a13.932 13.932 0 0 1-6.377 3.66c-1.115.286-2.284.44-3.488.44a13.893 13.893 0 0 1-10.512-4.797A13.968 13.968 0 0 1 2.048 16c0-3.523 1.298-6.742 3.44-9.203A13.893 13.893 0 0 1 16 2c1.204 0 2.373.154 3.488.44a13.932 13.932 0 0 1 6.377 3.66l-4.933 4.95A6.942 6.942 0 0 0 16 9c-3.852 0-6.976 3.134-6.976 7l.002.18C9.122 19.964 12.208 23 16 23c1.926 0 3.67-.784 4.932-2.05l4.933 4.95z"
              fill="url(#b)"></path>
            <path
              d="M20.932 11.05A6.942 6.942 0 0 0 16 9c-3.852 0-6.976 3.134-6.976 7a13.98 13.98 0 0 1 4.087-9.9 13.932 13.932 0 0 1 6.377-3.66l1.444 8.61z"
              fill="url(#c)"></path>
          </g>
        </svg> -->
        <img src="../../static/image/logo.svg" />
        <span class="ml-4">{{ setting.sitTitle }}</span></a>
      <div class="nav">
        <a href="/" class="nav-link">首页</a>
        <a href="about" class="nav-link">关于 </a><a href="contact" class="nav-link">联系 </a><a href="privacy"
          class="nav-link">隐私 </a><a href="version" class="nav-link">版本检测 </a><a href="changelogs"
          class="nav-link">更新日志
        </a>
      </div>
      <div class="copyright">
        <p class="mb-0">
          <span class="mr-3"><a href="javascript:;" target="_blank">{{ setting.beian }}</a></span>
          <span>{{ setting.banquan }}</span>
        </p>
      </div>
    </div>
  </div>
</template>
<script>

import { mapState, mapMutations } from 'vuex'

export default ({
  name: 'Foots',
  setup() {

  },
  methods: {
    async getSetting() {
      const setting = this.$cookies.get("setting")
      this.setting = setting
    },
  },
  data() {
    return {
      setting: {},
    }
  },
    mounted() {
      this.getSetting()
    },
    computed: {
    ...mapState(['playlist', 'glabledata', 'count'])
  },
})
</script>
<style scoped>
@import "../../static/mycss/body.css";
</style>
