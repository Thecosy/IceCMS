<template>
    <div class="site">
               
          <div class="sitpage">
            <h4>存储模式</h4>
                <el-switch
                    v-model="isCos"
                    active-color="#13ce66"
                    inactive-color="#FFEB9C"
                    active-text="COS模式"
                    inactive-text="本地模式"
                >
          </el-switch>
          <div v-show="isCos">
            <h4>设置访问域名</h4>
            <el-input v-model="postList.cosIntage" placeholder="请输入访问域名"></el-input>
            <h4>存储桶名称</h4>
            <el-input v-model="postList.cosBucketName" placeholder="请输入存储桶名称"></el-input>
            <h4>secretId</h4>
            <el-input v-model="postList.cosSecretId" placeholder="请输入secretId"></el-input>
            <h4>secretKey</h4>
            <el-input v-model="postList.cosSecretKey" placeholder="请输入secretKey"></el-input>
            <h4>bucket的区域</h4>
            <el-input v-model="postList.cosClientConfig" placeholder="请输入bucket的区域"></el-input>
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
  
  import { setSetting, getCosSetting, setSettingCos } from '@/api/setting'
  
  export default {
    methods: {
      sitmap(){
        this.postList.isCos =  this.isCos
        setSettingCos(this.postList).then(resp=>{
        console.log(resp)
        if(resp.data === 1){
          console.log("success")
           this.$notify({
                  title: '成功',
                  message: '修改成功',
                  type: 'success',
                  duration: 2000
                })
            this.fulldata()
        }else{
          console.log("no")
        }
      })
      },
      fulldata(){
        getCosSetting().then(resp => {   
        this.postList.cosIntage = resp.data.cosIntage
        this.postList.cosBucketName = resp.data.cosBucketName
        this.postList.cosSecretId = resp.data.cosSecretId
        this.postList.cosSecretKey = resp.data.cosSecretKey
        this.postList.cosClientConfig = resp.data.cosClientConfig
        this.isCos = resp.data.isCos
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
        isCos: false,
        postList: {
            cosIntage: "",
            cosBucketName: "",
            cosSecretId: "",
            cosSecretKey: "",
            cosClientConfig: "",
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