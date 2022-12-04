<template>
    <div class="site">
               
          <div class="sitpage">
            <h4>存储模式</h4>
                <el-switch
                    v-model="isCOS"
                    active-color="#13ce66"
                    inactive-color="#FFEB9C"
                    active-text="本地模式"
                    inactive-text="COS模式"
                >
          </el-switch>
          <div v-show="isCOS">
            <h4>设置访问域名</h4>
            <el-input v-model="postList.sitTitle" placeholder="请输入内容"></el-input>
            <h4>存储桶名称</h4>
            <el-input v-model="postList.banquan" placeholder="请输入内容"></el-input>
            <h4>secretId</h4>
            <el-input v-model="postList.beian" placeholder="请输入内容"></el-input>
            <h4>secretKey</h4>
            <el-input v-model="postList.beian" placeholder="请输入内容"></el-input>
            <h4>bucket的区域</h4>
            <el-input v-model="postList.beian" placeholder="请输入内容"></el-input>
        </div>
            <div class="mar-top">
            <el-button size="small" type="danger" round>取消</el-button>
            <el-button size="small" type="primary" @click="sitmap()" round>保存</el-button>
            </div>
          </div>
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
        isCOS: false,
        postList: {
          id: 1,
          sitTitle: "",
          sitLogo: "",
          banquan: "",
          beian: "",

        }
  
      };
    }
  };
  </script>
<style scoped>
.sitpage {
padding: 20px;
margin-left: 30px;
}
.mar-top{
margin-top: 20px;
}
</style>