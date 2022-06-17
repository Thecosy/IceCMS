<template>
  <div class="macwk-footer white border-top pc-model" data-v-ea53b530="">
    <div class="container" data-v-ea53b530="">
      <a
        href="https://macwk.com/"
        class="logo active"
        data-v-ea53b530=""
        aria-current="page"
      >
        <svg
          id="macwk-svg-logo"
          width="32"
          height="32"
          xmlns="http://www.w3.org/2000/svg"
          data-v-6dd0b122=""
          data-v-ea53b530=""
        >
          <title data-v-6dd0b122="">MacWK</title>
          <defs data-v-6dd0b122="">
            <lineargradient
              x1="50%"
              y1="0%"
              x2="50%"
              y2="100%"
              id="a"
              data-v-6dd0b122=""
            >
              <stop
                offset="0%"
                class="stop-color-circle"
                data-v-6dd0b122=""
              ></stop>
              <stop
                offset="100%"
                class="stop-color-circle"
                data-v-6dd0b122=""
              ></stop>
            </lineargradient>
            <lineargradient
              x1="100%"
              y1="86.198%"
              x2="-14.813%"
              y2="-4.357%"
              id="b"
              data-v-6dd0b122=""
            >
              <stop
                offset="0%"
                class="stop-color-default"
                data-v-6dd0b122=""
              ></stop>
              <stop
                offset="40.927%"
                class="stop-color-default"
                data-v-6dd0b122=""
              ></stop>
              <stop
                offset="100%"
                class="stop-color-default"
                data-v-6dd0b122=""
              ></stop>
            </lineargradient>
            <lineargradient
              x1="86.515%"
              y1="24.533%"
              x2="0%"
              y2="24.533%"
              id="c"
              data-v-6dd0b122=""
            >
              <stop
                stop-opacity="0"
                offset="0%"
                class="stop-color-default"
                data-v-6dd0b122=""
              ></stop>
              <stop
                offset="100%"
                class="stop-color-default-linearGradient"
                data-v-6dd0b122=""
              ></stop>
            </lineargradient>
          </defs>
          <g fill="none" fill-rule="evenodd" data-v-6dd0b122="">
            <path
              d="M29.952 16c0-1.933-1.562-3.5-3.488-3.5a3.494 3.494 0 0 0-3.488 3.5c0 1.933 1.561 3.5 3.488 3.5a3.494 3.494 0 0 0 3.488-3.5"
              fill="url(#a)"
              data-v-6dd0b122=""
            ></path>
            <path
              d="M25.865 25.9a13.932 13.932 0 0 1-6.377 3.66c-1.115.286-2.284.44-3.488.44a13.893 13.893 0 0 1-10.512-4.797A13.968 13.968 0 0 1 2.048 16c0-3.523 1.298-6.742 3.44-9.203A13.893 13.893 0 0 1 16 2c1.204 0 2.373.154 3.488.44a13.932 13.932 0 0 1 6.377 3.66l-4.933 4.95A6.942 6.942 0 0 0 16 9c-3.852 0-6.976 3.134-6.976 7l.002.18C9.122 19.964 12.208 23 16 23c1.926 0 3.67-.784 4.932-2.05l4.933 4.95z"
              fill="url(#b)"
              data-v-6dd0b122=""
            ></path>
            <path
              d="M20.932 11.05A6.942 6.942 0 0 0 16 9c-3.852 0-6.976 3.134-6.976 7a13.98 13.98 0 0 1 4.087-9.9 13.932 13.932 0 0 1 6.377-3.66l1.444 8.61z"
              fill="url(#c)"
              data-v-6dd0b122=""
            ></path>
          </g>
        </svg>
        <span class="ml-4" data-v-ea53b530="">{{this.glabledata.glableSitTitle}}</span></a
      >
      <div class="nav" data-v-ea53b530="">
        <router-link to="/">
          <a class="nav-link active" data-v-ea53b530="" aria-current="page"
            >首页</a
          >
        </router-link>
        <router-link to="/about">
          <a class="nav-link" data-v-ea53b530="">关于 </a>
        </router-link>
        <a href="https://macwk.com/contact" class="nav-link" data-v-ea53b530=""
          >联系
        </a>
        <router-link to="/Privacy">
          <a class="nav-link" data-v-ea53b530="">隐私 </a>
        </router-link>
        <a href="https://macwk.com/version" class="nav-link" data-v-ea53b530=""
          >版本检测
        </a>
        <a
          href="https://macwk.com/changelogs"
          class="nav-link"
          data-v-ea53b530=""
          >更新日志
        </a>
      </div>
      <div class="copyright" data-v-ea53b530="">
        <p class="mb-0" data-v-ea53b530="">
          <span class="mr-3" data-v-ea53b530=""
            ><a
              href="https://beian.miit.gov.cn/"
              target="_blank"
              data-v-ea53b530=""
              >{{this.glabledata.glableBeian}}</a
            ></span
          >
          <span data-v-ea53b530=""
            >{{this.glabledata.glableBanquan}}</span
          >
        </p>
      </div>
    </div>
  </div>
</template>
<script>

import {mapState,mapMutations} from 'vuex'

export default ({
  name: 'Foots',
  setup() {
    
  },
    computed:{
       ...mapState(['playlist','glabledata','count'])
        },
})
</script>
