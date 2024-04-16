<template>
  <div class="wscn-http404-container">
    <div class="wscn-http404">
      <div class="pic-404">
        <img class="pic-404__parent" src="@/assets/404_images/404.png" alt="404">
        <img class="pic-404__child left" src="@/assets/404_images/404_cloud.png" alt="404">
        <img class="pic-404__child mid" src="@/assets/404_images/404_cloud.png" alt="404">
        <img class="pic-404__child right" src="@/assets/404_images/404_cloud.png" alt="404">
      </div>
      <div class="bullshit">
        <div class="bullshit__oops">OOPS!</div>
        <div class="bullshit__info">All rights reserved
          <a style="color:#20a0ff" href="https://wallstreetcn.com" target="_blank">wallstreetcn</a>
        </div>
        <div class="bullshit__headline">{{ message }}</div>
        <div class="bullshit__info">Please check that the URL you entered is correct, or click the button below to return to the homepage.</div>

        <button class="running-button" @click="Tohome()">
          <span class="default"> Back Home</span>
          <span class="active">Tracking</span>
          <div class="running">
            <div class="outer">
              <div class="body">
                <div class="arm behind" />
                <div class="arm front" />
                <div class="leg behind" />
                <div class="leg front" />
              </div>
            </div>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Page404',

  computed: {
    message() {
      return 'The webmaster said that you can not enter this page...'
    }
  },
  methods: {
    Tohome() {
      console.log('yes')
      this.$router.push({ path: '/' })
    }
  }
}
</script>

<style lang="scss" scoped>
.running {
  --color: #8A91B4;
  --duration: .8s;
  -webkit-transform: scale(var(--scale, 1));
          transform: scale(var(--scale, 1));
}
.running .outer {
  -webkit-animation: outer var(--duration) linear infinite;
          animation: outer var(--duration) linear infinite;
}
.running .outer .body {
  background: var(--color);
  height: 15px;
  width: 8px;
  border-radius: 4px;
  -webkit-transform-origin: 4px 11px;
          transform-origin: 4px 11px;
  position: relative;
  -webkit-transform: rotate(32deg);
          transform: rotate(32deg);
  -webkit-animation: body var(--duration) linear infinite;
          animation: body var(--duration) linear infinite;
}
.running .outer .body:before {
  content: '';
  width: 8px;
  height: 8px;
  border-radius: 4px;
  bottom: 16px;
  left: 0;
  position: absolute;
  background: var(--color);
}
.running .outer .body .arm,
.running .outer .body .arm:before,
.running .outer .body .leg,
.running .outer .body .leg:before {
  content: '';
  width: var(--w, 11px);
  height: 4px;
  top: var(--t, 0);
  left: var(--l, 2px);
  border-radius: 2px;
  -webkit-transform-origin: 2px 2px;
          transform-origin: 2px 2px;
  position: absolute;
  background: var(--c, var(--color));
  -webkit-transform: rotate(var(--r, 0deg));
          transform: rotate(var(--r, 0deg));
  -webkit-animation: var(--name, arm-leg) var(--duration) linear infinite;
          animation: var(--name, arm-leg) var(--duration) linear infinite;
}
.running .outer .body .arm:before {
  --l: 7px;
  --name: arm-b;
}
.running .outer .body .arm.front {
  --r: 24deg;
  --r-to: 164deg;
}
.running .outer .body .arm.front:before {
  --r: -48deg;
  --r-to: -36deg;
}
.running .outer .body .arm.behind {
  --r: 164deg;
  --r-to: 24deg;
}
.running .outer .body .arm.behind:before {
  --r: -36deg;
  --r-to: -48deg;
}
.running .outer .body .leg {
  --w: 12px;
  --t: 11px;
}
.running .outer .body .leg:before {
  --t: 0;
  --l: 8px;
}
.running .outer .body .leg.front {
  --r: 10deg;
  --r-to: 108deg;
}
.running .outer .body .leg.front:before {
  --r: 18deg;
  --r-to: 76deg;
}
.running .outer .body .leg.behind {
  --r: 108deg;
  --r-to: 10deg;
  --c: none;
}
.running .outer .body .leg.behind:before {
  --c: var(--color);
  --r: 76deg;
  --r-to: 18deg;
}
.running .outer .body .leg.behind:after {
  content: '';
  top: 0;
  right: 0;
  height: 4px;
  width: 6px;
  -webkit-clip-path: polygon(2px 0, 6px 0, 6px 4px, 0 4px);
          clip-path: polygon(2px 0, 6px 0, 6px 4px, 0 4px);
  border-radius: 0 2px 2px 0;
  position: absolute;
  background: var(--color);
}

.running-button {
  --color: #F6F8FF;
  --background: #1B9DFD;
  --background-hover: #1B9DFD;
  --background-active: #3b89c1;
  --background-active-hover: #4385b5;
  --shadow: rgba(0, 9, 61, 0.2);
  --padding-y: 12px;
  --padding-x: 36px;
  margin: 0;
  padding: var(--padding-y) 0;
  font-size: 16px;
  font-weight: 500;
  border-radius: 24px;
  line-height: 23px;
  position: relative;
  border: none;
  overflow: hidden;
  outline: none;
  cursor: pointer;
  -webkit-appearance: none;
  transition: box-shadow .3s, background .4s, -webkit-transform .3s;
  transition: box-shadow .3s, transform .3s, background .4s;
  transition: box-shadow .3s, transform .3s, background .4s, -webkit-transform .3s;
  box-shadow: 0 var(--shadow-y, 4px) var(--shadow-blur, 12px) var(--shadow);
  color: var(--color);
  background: var(--b, var(--background));
  -webkit-transform: translateY(var(--y, 0));
          transform: translateY(var(--y, 0));
}
.running-button span {
  display: block;
  transition: -webkit-transform .4s ease;
  transition: transform .4s ease;
  transition: transform .4s ease, -webkit-transform .4s ease;
  -webkit-transform: translateX(var(--x, 0));
          transform: translateX(var(--x, 0));
  padding: 0 var(--padding-x);
}
.running-button span.default {
  --x: var(--default-x, 0);
}
.running-button span.active {
  --x: var(--active-x, -100%);
  margin-top: -23px;
}
.running-button .running {
  --scale: .64;
  --color: #fff;
  position: absolute;
  top: 13px;
  right: 100%;
  transition: -webkit-transform .4s ease;
  transition: transform .4s ease;
  transition: transform .4s ease, -webkit-transform .4s ease;
  -webkit-transform: translateX(var(--running-x, -8px)) scale(var(--scale));
          transform: translateX(var(--running-x, -8px)) scale(var(--scale));
}
.running-button:hover {
  --b: var(--background-hover);
  --y: -2px;
  --shadow-y: 8px;
  --shadow-blur: 16px;
  --default-x: 12px;
  --running-x: var(--padding-x);
}
.running-button:active {
  --y: 1px;
  --shadow-y: 4px;
  --shadow-blur: 8px;
}
.running-button.active {
  --b: var(--background-active);
  --default-x: 100%;
  --active-x: -12%;
  --running-x: 108px;
}
.running-button.active:hover {
  --b: var(--background-active-hover);
}

@-webkit-keyframes outer {
  50% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
  }
  25%,
    75% {
    -webkit-transform: translateY(4px);
            transform: translateY(4px);
  }
}

@keyframes outer {
  50% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
  }
  25%,
    75% {
    -webkit-transform: translateY(4px);
            transform: translateY(4px);
  }
}
@-webkit-keyframes body {
  50% {
    -webkit-transform: rotate(16deg);
            transform: rotate(16deg);
  }
  25%,
    75% {
    -webkit-transform: rotate(24deg);
            transform: rotate(24deg);
  }
}
@keyframes body {
  50% {
    -webkit-transform: rotate(16deg);
            transform: rotate(16deg);
  }
  25%,
    75% {
    -webkit-transform: rotate(24deg);
            transform: rotate(24deg);
  }
}
@-webkit-keyframes arm-leg {
  50% {
    -webkit-transform: rotate(var(--r-to));
            transform: rotate(var(--r-to));
  }
}
@keyframes arm-leg {
  50% {
    -webkit-transform: rotate(var(--r-to));
            transform: rotate(var(--r-to));
  }
}
@-webkit-keyframes arm-b {
  30%,
    70% {
    -webkit-transform: rotate(var(--r-to));
            transform: rotate(var(--r-to));
  }
}
@keyframes arm-b {
  30%,
    70% {
    -webkit-transform: rotate(var(--r-to));
            transform: rotate(var(--r-to));
  }
}
html {
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
}

* {
  box-sizing: inherit;
}
*:before, *:after {
  box-sizing: inherit;
}

body {
  min-height: 100vh;
  display: flex;
  font-family: 'Roboto', Arial;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: #ECEFFC;
}
body .running-button {
  margin: 60px 0 0 0;
}
.wscn-http404-container{
  transform: translate(-50%,-50%);
  position: absolute;
  top: 40%;
  left: 50%;
}
.wscn-http404 {
  position: relative;
  width: 1200px;
  padding: 0 50px;
  overflow: hidden;
  .pic-404 {
    position: relative;
    float: left;
    width: 600px;
    overflow: hidden;
    &__parent {
      width: 100%;
    }
    &__child {
      position: absolute;
      &.left {
        width: 80px;
        top: 17px;
        left: 220px;
        opacity: 0;
        animation-name: cloudLeft;
        animation-duration: 2s;
        animation-timing-function: linear;
        animation-fill-mode: forwards;
        animation-delay: 1s;
      }
      &.mid {
        width: 46px;
        top: 10px;
        left: 420px;
        opacity: 0;
        animation-name: cloudMid;
        animation-duration: 2s;
        animation-timing-function: linear;
        animation-fill-mode: forwards;
        animation-delay: 1.2s;
      }
      &.right {
        width: 62px;
        top: 100px;
        left: 500px;
        opacity: 0;
        animation-name: cloudRight;
        animation-duration: 2s;
        animation-timing-function: linear;
        animation-fill-mode: forwards;
        animation-delay: 1s;
      }
      @keyframes cloudLeft {
        0% {
          top: 17px;
          left: 220px;
          opacity: 0;
        }
        20% {
          top: 33px;
          left: 188px;
          opacity: 1;
        }
        80% {
          top: 81px;
          left: 92px;
          opacity: 1;
        }
        100% {
          top: 97px;
          left: 60px;
          opacity: 0;
        }
      }
      @keyframes cloudMid {
        0% {
          top: 10px;
          left: 420px;
          opacity: 0;
        }
        20% {
          top: 40px;
          left: 360px;
          opacity: 1;
        }
        70% {
          top: 130px;
          left: 180px;
          opacity: 1;
        }
        100% {
          top: 160px;
          left: 120px;
          opacity: 0;
        }
      }
      @keyframes cloudRight {
        0% {
          top: 100px;
          left: 500px;
          opacity: 0;
        }
        20% {
          top: 120px;
          left: 460px;
          opacity: 1;
        }
        80% {
          top: 180px;
          left: 340px;
          opacity: 1;
        }
        100% {
          top: 200px;
          left: 300px;
          opacity: 0;
        }
      }
    }
  }
  .bullshit {
    position: relative;
    float: left;
    width: 300px;
    padding: 30px 0;
    overflow: hidden;
    &__oops {
      font-size: 32px;
      font-weight: bold;
      line-height: 40px;
      color: #1482f0;
      opacity: 0;
      margin-bottom: 20px;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-fill-mode: forwards;
    }
    &__headline {
      font-size: 20px;
      line-height: 24px;
      color: #222;
      font-weight: bold;
      opacity: 0;
      margin-bottom: 10px;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-delay: 0.1s;
      animation-fill-mode: forwards;
    }
    &__info {
      font-size: 13px;
      line-height: 21px;
      color: grey;
      opacity: 0;
      margin-bottom: 30px;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-delay: 0.2s;
      animation-fill-mode: forwards;
    }
    &__return-home {
      display: block;
      float: left;
      width: 110px;
      height: 36px;
      background: #1482f0;
      border-radius: 100px;
      text-align: center;
      color: #ffffff;
      opacity: 0;
      font-size: 14px;
      line-height: 36px;
      cursor: pointer;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-delay: 0.3s;
      animation-fill-mode: forwards;
    }
    @keyframes slideUp {
      0% {
        transform: translateY(60px);
        opacity: 0;
      }
      100% {
        transform: translateY(0);
        opacity: 1;
      }
    }
  }
}
</style>
