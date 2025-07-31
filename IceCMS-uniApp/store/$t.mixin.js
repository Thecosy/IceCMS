import { mapState } from 'vuex'
import store from '@/store'

// 尝试将用户在根目录中的store/index.js的vuex的state变量加载到全局变量中
let $tStoreKey = []
try {
  $tStoreKey = store.state ? Object.keys(store.state) : []
} catch(e) {
  
}

module.exports = {
  beforeCreate() {
    // 将vuex方法挂在在$t中
    // 使用方法: 
    // 修改vuex的state中的user.name变量为IceCMS小菜 => this.$t.vuex('user.name', 'IceCMS小菜')
    // 修改vuexde state中的version变量为1.0.1 => this.$t.vuex('version', 1.0.1)
    this.$t.vuex = (name, value) => {
      this.$store.commit('$tStore', {
        name, value
      })
    }
  },
  computed: {
    // 将vuex的state中的变量结构到全局混入mixin中
    ...mapState($tStoreKey)
  }
}