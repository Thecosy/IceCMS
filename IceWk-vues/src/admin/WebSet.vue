<template>
  <div class="site">
    <el-tabs tab-position="left" style="height: 800px">
      <el-tab-pane label="网站配置" style="width: 420px">
        
        <div class="sitpage">
          <h4>网站标题</h4>
          <el-input v-model="postList.sitTitle" placeholder="请输入内容"></el-input>
          <h4>网站LOGO</h4>
          <!-- <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload> -->

          <h4>版权</h4>
          <el-input v-model="postList.banquan" placeholder="请输入内容"></el-input>
          <h4>备案号</h4>
          <el-input v-model="postList.beian" placeholder="请输入内容"></el-input>
         
         
        </div>
       
      </el-tab-pane>
      <el-tab-pane label="主页轮播图">
        <h4>轮播图</h4>
       
      </el-tab-pane>
      <el-tab-pane label="文章设置">
        <h4>禁用评论</h4>
          <el-switch
            v-model="postList.comment_show"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
      </el-tab-pane>
      <el-tab-pane label="资源设置">
        <h4>禁用评论</h4>
          <el-switch
            v-model="postList.comment_show"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        <h4>图片预览格式</h4>
          <el-switch
            v-model="postList.imageFormat"
            active-color="#13ce66"
            inactive-color="#FFEB9C"
            active-text="资源模式"
            inactive-text="主图模式"
          >
          </el-switch>
      </el-tab-pane>
      <el-tab-pane label="首页设置">
        <h4>轮播图设置</h4>
          <el-switch
            v-model="postList.comment_show"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
      </el-tab-pane>
      <el-row class="sitpagesitmap">
          <el-button size="small" type="danger" round>取消</el-button>
          <el-button size="small" type="primary" @click="sitmap()" round>保存</el-button>
        </el-row>
    </el-tabs>
  </div>
</template>
<script>
import {mapState,mapMutations} from 'vuex'

import { setSetting } from '@/api/setting'
import { getSetting } from '@/api/websetting'

export default {
  methods: {
    sitmap(){
     
      setSetting(this.postList).then(resp=>{
      console.log(resp)
      if(resp.data === 1){
        console.log("success")
         this.$notify({
                title: '成功',
                message: '修改成功',
                type: 'success',
                duration: 2000
              })
      }else{
        console.log("no")
      }
    })
    },
    fulldata(){
     getSetting().then(resp => {   
      console.log(resp.data)
      this.postList.sitTitle = resp.data.sitTitle
      this.postList.sitLogo = resp.data.sitLogo
      this.postList.banquan = resp.data.banquan
      this.postList.beian = resp.data.beian
      this.postList.comment_show = resp.data.comment_show
      this.postList.imageFormat = resp.data.imageFormat
    })
    
    },
    handleClick(tab, event) {
      console.log(tab, event);
    }
  },
    computed:{
       ...mapState(['playlist','glabledata','count'])
        },
  async created() {
    await this.fulldata();
  },
  data() {
    return {
      postList: {
        id: 1,
        sitTitle: "",
        sitLogo: "",
        banquan: "",
        beian: "",
        comment_show: true,
        imageFormat: true,
      }

    };
  }
};
</script>
<style scoped>
.sitpagesitmap {
  margin-top: 20px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.site /deep/ .el-tabs__nav-wrap::after {
      display: none;
  }
  .site /deep/ .tabs-card .el-tabs__nav-scroll{
      padding: 0;
  }
  .site /deep/ .el-tabs__header {
    margin: 0;
  }
  .site /deep/ .el-tabs__nav-scroll {
    padding: 0 20px;
  }
  .site /deep/ .el-tabs__active-bar {
    background-color: #4FA1FF; 
    height: 4px;
    border-radius: 2px;
  }
  .site /deep/ .el-tabs__item:hover.span{
      color: #4FA1FF; 
  }
  .site /deep/ .el-tabs__item.is-active {

    font-weight: bold;
    font-size: 16px;
    position: relative;
      color:  #4FA1FF; 
  }
  .site /deep/ .el-tabs__item:hover {
    color:  #4FA1FF; 
  }
  .site /deep/ .el-tabs__item {
    color: #909399;
    font-size: 14px;
    font-weight: 500;
  }
  .site /deep/ .el-tabs.tabs-card .el-tabs__item span {
    background: none;
    box-shadow: none;
    height: 54px;
    line-height: 54px;
    min-width: 0;
    padding: 0;
    margin: 0 18px;
  }

</style>