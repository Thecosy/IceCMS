<template>
  <div class="app-container">
    <div style="width: 100%; margin-top: 30px" class="header">
      <div>
        <div class="titleavatar">
          <el-avatar :size="80" :src="user.profile"></el-avatar>
        </div>
        <div class="titlename">
          <span>{{ user.name }}</span>
        </div>
        <div class="titledisplay">
          <i class="el-icon-edit"></i>
          <span>前端</span>
          <i class="el-icon-user"></i>
          <span>管理员</span>
          <i class="el-icon-location-outline"></i>
          <span>北京</span>
        </div>
      </div>
    </div>
    <div style="width: 100%; margin-top: 30px" class="body">
      <div class="actionintext"><h4>站内通知</h4></div>

      <el-empty description="描述文字"></el-empty>
    </div>
    <el-form class="fromclass" ref="form" :model="form" label-width="80px">
      <el-row>
        <el-col :span="24">
          <div class="postInfo-container">
            <el-row>
              <el-col :span="8">
                <el-form-item label="昵称：">
                  <el-input style="width: 220px" v-model="form.name"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="10">
                <el-form-item label="邮箱：">
                  <el-input style="width: 220px" v-model="form.name"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="6">
                 <el-form-item label="积分：">
                  <el-input style="width: 220px" v-model="form.name"></el-input>
                </el-form-item> </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
      <el-form-item label="出生日期">
        <el-col :span="11">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.busterday"
            style="width: 100%"
          ></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="form.resource">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="个人简介">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">更新</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default ({
  created() {
    this.getUserInfo()
  },
  methods: {
    getUserInfo() {

      const user = JSON.parse(window.localStorage.getItem('access-admin'))
      this.user = user.data
      console.log(this.user)
      this.form.name = this.user.name
    }
  },
  data() {
    return {
      form: {
        name: '',
        busterday: '',
        resource: '',
        desc: '',
      },
      user: "",
    }
  },
  setup() {

  },
})
</script>


<style lang="scss" scoped>
.app-container {
  .roles-table {
    margin-top: 30px;
  }
  .permission-tree {
    margin-bottom: 30px;
  }
}
</style>

<style lang="scss" scoped >
.body {
  padding: 20px;
  flex-direction: row-reverse;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: flex-end;
  display: flex;
  align-items: center;
  height: 204px;
  color: var(--gray-10);
  background: #f1f3f4;
  background-size: cover;
  border-radius: 4px;
  :deep(.arco-avatar-trigger-icon-button) {
    color: rgb(var(--arcoblue-6));
    :deep(.arco-icon) {
      vertical-align: -1px;
    }
  }
  .user-msg {
    .arco-icon {
      color: rgb(var(--gray-10));
    }
    .arco-typography {
      margin-left: 6px;
    }
  }
}
.header {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 204px;
  color: var(--gray-10);
  background: url(//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/41c6b125cc2e27021bf7fcc9a9b1897c.svg~tplv-49unhts6dw-image.image)
    no-repeat;
  background-size: cover;
  border-radius: 4px;
  :deep(.arco-avatar-trigger-icon-button) {
    color: rgb(var(--arcoblue-6));
    :deep(.arco-icon) {
      vertical-align: -1px;
    }
  }
  .user-msg {
    .arco-icon {
      color: rgb(var(--gray-10));
    }
    .arco-typography {
      margin-left: 6px;
    }
  }
}
.titlename {
  display: flex;
  justify-content: center;
}
.titledisplay {
  display: flex;
  justify-content: center;
  padding: 8px;
}
.titleavatar {
  display: flex;
  justify-content: center;
  padding: 8px;
}
.actionintext {
  display: flex;
}
.fromclass {
  margin-top: 20px;
}
</style>