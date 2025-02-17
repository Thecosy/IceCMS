<template>
    <div class="error">
      <div class="error-box">
        <h1 :data-t="error.statusCode " class="h1">{{ error.statusCode }}</h1>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'error',
    layout: "error", // you can set a custom layout for the error page

    props: {
     // 接受错误页面传递的错误信息
      error: {
        type: Object,
        required: true
      }
    },
    mounted () {
      console.log(this.error)
    },
  }
  </script>
  
<style lang="scss" scoped>
.error {
  width: 100%;
  height: 100vh;
  min-width: 500px;
  min-height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  overflow: hidden;;
  .error-box {
    width: 400px;
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
h1 {
  text-align: center;
  font-size: 6rem;
  animation: shake 0.6s ease-in-out infinite alternate;
  position: absolute;
  margin: 0 auto;
}
h1:before {
  content: attr(data-t);
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0.34em);
  height: 0.1em;
  line-height: 0.5em;
  width: 100%;
  animation: scan 0.5s ease-in-out 275ms infinite alternate,
    glitch-anim 0.3s ease-in-out infinite alternate;
  overflow: hidden;
  opacity: 0.7;
}
h1:after {
  content: attr(data-t);
  position: absolute;
  top: -8px;
  left: 50%;
  transform: translate(-50%, 0.34em);
  height: 0.5em;
  line-height: 0.1em;
  width: 100%;
  animation: scan 665ms ease-in-out 0.59s infinite alternate,
    glitch-anim 0.3s ease-in-out infinite alternate;
  overflow: hidden;
  opacity: 0.8;
}
@keyframes glitch-anim {
  0% {
    clip: rect(32px, 9999px, 28px, 0);
  }

  10% {
    clip: rect(13px, 9999px, 37px, 0);
  }

  20% {
    clip: rect(45px, 9999px, 33px, 0);
  }

  30% {
    clip: rect(31px, 9999px, 94px, 0);
  }

  40% {
    clip: rect(88px, 9999px, 98px, 0);
  }

  50% {
    clip: rect(9px, 9999px, 98px, 0);
  }

  60% {
    clip: rect(37px, 9999px, 17px, 0);
  }

  70% {
    clip: rect(77px, 9999px, 34px, 0);
  }

  80% {
    clip: rect(55px, 9999px, 49px, 0);
  }

  90% {
    clip: rect(10px, 9999px, 2px, 0);
  }

  to {
    clip: rect(35px, 9999px, 53px, 0);
  }
}
@keyframes scan {
  0%,
  20%,
  to {
    height: 0;
    transform: translate(-50%, 0.44em);
  }

  10%,
  15% {
    height: 1em;
    line-height: 0.2em;
    transform: translate(-55%, 0.09em);
  }
}
@keyframes shake {
  0% {
    transform: translate(-1px);
  }

  10% {
    transform: translate(2px, 1px);
  }

  30% {
    transform: translate(-3px, 2px);
  }

  35% {
    transform: translate(2px, -3px);
    filter: blur(4px);
  }

  45% {
    transform: translate(2px, 2px) skewY(-8deg) scaleX(0.96);
    filter: blur(0);
  }

  50% {
    transform: translate(-3px, 1px);
  }
}
</style>
