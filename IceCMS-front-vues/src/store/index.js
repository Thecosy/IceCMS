import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import tagsView from './modules/tagsView'

Vue.use(Vuex)

const store = new Vuex.Store({
  // state 中存放的就是全局共享的数据
  state: {
    playlist:[
        {al:{},}
    ],
    glabledata:
      {
    glableBeian: "",
    glableBanquan:"",
    glableCommentShow:"",
    glableSitTitle:"",
    glableSieLogo:"",
    glableImageFormat:"",
    count:0,
    },
  },
  getters: {
  },
  // Mutation 用户变更Store数据
  mutations: {
    // 用来修改state中的playlist
    setPlaylist:function (state,value) {
      state.playlist.glableBeian = value
    },
    add(state){
      state.count++
    },
    glabledata:function (state,index) {
      state.glabledata.glableBeian = index.beian
      state.glabledata.glableBanquan = index.banquan
      state.glabledata.glableCommentShow = index.comment_show
      state.glabledata.glableSitTitle = index.sitTitle
      state.glabledata.glableSieLogo = index.sitLogo
      state.glabledata.glableImageFormat = index.imageFormat

    }
    },
    // 定义了一个action，用于查询接口数据
    actions: {
      glabledata(context, index) {
        context.commit('glabledata', index);
      },
    },
    modules: {
      app,
      settings,
      tagsView
    },
    getters
  })

export default store
