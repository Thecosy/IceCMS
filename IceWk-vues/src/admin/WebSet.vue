<template>
  <div class="site">
    <el-tabs tab-position="left" style="height: 800px">
      <el-tab-pane label="网站配置" style="width: 620px">

        <div class="sitpage">
          <h4>网站标题</h4>
          <el-input style="width: 320px" v-model="postList.sitTitle" placeholder="请输入内容"></el-input>
          <h4>网站LOGO</h4>
          <Upload style="display: flex;" :foriscreate="this.isCreate" :fortitle="this.title" :forcontent="this.intro"
            v-model="postList.sitLogo" />
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2mb</div>

          <h4>版权</h4>
          <el-input style="width: 320px"  v-model="postList.banquan" placeholder="请输入内容"></el-input>
          <h4>备案号</h4>
          <el-input style="width: 320px"  v-model="postList.beian" placeholder="请输入内容"></el-input>


        </div>

      </el-tab-pane>
      <el-tab-pane label="文章设置">
        <h4>禁用评论</h4>
        <el-switch v-model="postList.comment_show" active-color="#13ce66" inactive-color="#ff4949">
        </el-switch>
      </el-tab-pane>
      <el-tab-pane label="资源设置">
        <h4>禁用评论</h4>
        <el-switch v-model="postList.comment_show" active-color="#13ce66" inactive-color="#ff4949">
        </el-switch>
        <h4>图片预览格式</h4>
        <el-switch v-model="postList.imageFormat" active-color="#13ce66" inactive-color="#FFEB9C" active-text="资源模式"
          inactive-text="主图模式">
        </el-switch>
      </el-tab-pane>
      <el-tab-pane label="首页设置">
        <h4>轮播图设置</h4>
        <div class="app-container">
          <el-table v-loading="listLoading" :data="list" :default-sort="{ prop: 'date', order: 'ascending' }" border fit
            highlight-current-row style="width: 100%">

            <el-table-column align="center" prop="date" label="ID" width="50">
              <template slot-scope="scope">
                <span>{{ scope.row.id }}</span>
              </template>
            </el-table-column>

            <el-table-column width="185px" align="center" label="图片">
              <template slot-scope="scope">
                <img class="post-item__preview delay-0" :src="scope.row.img" />

              </template>
            </el-table-column>

            <el-table-column width="80px" align="center" label="名称">
              <template slot-scope="scope">
                <span>{{ scope.row.title }}</span>
              </template>
            </el-table-column>
            <!--   
        <el-table-column class-name="status-col" label="状态" width="110">
          <template slot-scope="{ row }">
            <el-tag :type="row.deleted | statusFilter">
              {{ row.deleted }}
            </el-tag>
          </template>
        </el-table-column> -->

            <el-table-column width="220px" min-width="140px" label="简介">
              <template slot-scope="{ row }">
                  <span>{{ row.introduce }}</span>
              </template>
            </el-table-column>

            <el-table-column width="80px" min-width="80px" label="按钮">
              <template slot-scope="{ row }">
                  <span>{{ row.button }}</span>
              </template>
            </el-table-column>

            <el-table-column align="center" label="操作" width="200">
              <template slot-scope="scope">

                <el-button @click="changescore(scope.row.id)" type="primary" size="mini" icon="el-icon-edit">
                  修改
                </el-button>

                <el-button style="margin-left: 10px" type="danger" size="mini" icon="el-icon-edit"
                  @click="delectArtive(scope.row.id)">
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-dialog title="用户" :visible.sync="dialogFormVisible">
            <el-form>
              <el-form-item label="提醒">
                <el-input v-model="content" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="是否禁用">
                <el-select placeholder="请选择是否禁用">
                  <el-option label="是" value="shanghai"></el-option>
                  <el-option label="否" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="sitmap()">确 定</el-button>
            </div>
          </el-dialog>
        </div>
      </el-tab-pane>
      <el-row class="sitpagesitmap">
        <el-button size="small" type="danger" round>取消</el-button>
        <el-button size="small" type="primary" @click="sitmap()" round>保存</el-button>
      </el-row>
    </el-tabs>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'

import { GetAllSquareUser, DelectSquareById, ChangeSquareById } from '@/api/square'
import { formatDate } from '@/utils/date.js'

import { setSetting, getAllDispositionCarousel } from '@/api/setting'
import { getSetting } from '@/api/websetting'

import Upload from '@/components/Upload/SingleImage'

export default {
  components: { Upload },

  methods: {
    changescore(id) {
      this.dialogFormVisible = true;
      this.contentid = id;
    },
    sitmap() {
      this.dialogFormVisible = false
      ChangeSquareById(this.contentid, this.content).then(response => {
        this.$message({
          message: '修改成功',
          type: 'success'
        })
        this.fulldata()
      })
    },
    delectArtive(id) {
      this.$confirm('此操作将永久删除是否确认删除？', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonClass: "danger",
        confirmButtonText: '删除',
        cancelButtonText: '放弃删除'
      })
        .then(() => {
          DelectSquareById(id).then(resp => {
            this.$notify({
              title: '成功',
              message: '您已成功删除该文章',
              type: 'success'
            });
            //刷新当前页面
            this.fulldata()
          })
        })
        .catch(action => {
          this.$message({
            type: 'info',
            message: action === 'cancel'
              ? '放弃删除'
              : '保留当前评论'
          })
        });
    },
    formatDate(time) {
      let data = new Date(time)
      return formatDate(data, 'yyyy-MM-dd hh:mm ')
    },
    sitmap() {

      setSetting(this.postList).then(resp => {
        console.log(resp)
        if (resp.data === 1) {
          console.log("success")
          this.$notify({
            title: '成功',
            message: '修改成功',
            type: 'success',
            duration: 2000
          })
        } else {
          console.log("no")
        }
      })
    },
    fulldata() {
      console.log("getlist")
      this.listLoading = true
      getAllDispositionCarousel().then(resp => {
        console.log(resp)
        this.list = resp.data
        console.log(this.list)
        this.listLoading = false
      })
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
  computed: {
    ...mapState(['playlist', 'glabledata', 'count'])
  },
  async created() {
    await this.fulldata();
  },
  data() {
    return {
      isCreate: false,
      title: '',
      intro: '',
      thumb: '',
      contentid: '',
      content: "",
      dialogFormVisible: false,
      list: [],
      listLoading: true,
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

.site /deep/ .tabs-card .el-tabs__nav-scroll {
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

.site /deep/ .el-tabs__item:hover.span {
  color: #4FA1FF;
}

.site /deep/ .el-tabs__item.is-active {

  font-weight: bold;
  font-size: 16px;
  position: relative;
  color: #4FA1FF;
}

.site /deep/ .el-tabs__item:hover {
  color: #4FA1FF;
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