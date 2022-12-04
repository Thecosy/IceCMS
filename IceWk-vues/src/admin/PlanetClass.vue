<template>
    <div class="app-container">
      <el-row :gutter="20">
        <el-col :span="8">
          <div style="transform: translateX(40px)">
            <h2>分类</h2>
            <h5>添加新分类</h5>
          </div>
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="名称">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <!-- <el-form-item label="父级分类">
              <el-select v-model="form.father" placeholder="请选择父级分类">
                <el-option label="区域一" value="1"></el-option>
                <el-option label="区域二" value="2"></el-option>
              </el-select>
            </el-form-item> -->
            <el-form-item label="别名">
              <el-input v-model="form.otherName"></el-input>
            </el-form-item>
            <el-form-item label="描述">
              <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4 }"
                placeholder="请输入内容"
                v-model="form.describes"
              >
              </el-input>
            </el-form-item>
            <el-form-item label="分类图片">
              <div>
                <el-input placeholder="请输入内容" v-model="form.imgclass">
                  <template slot="prepend">Http://</template>
                </el-input>
              </div>
            </el-form-item>
            <el-form-item label="置顶分类">
              <el-switch v-model="form.top"></el-switch>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">添加新分类</el-button>
              <el-button>取消</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="16">
          <el-table
            v-loading="listLoading"
            :data="list"
            :default-sort="{ prop: 'date', order: 'ascending' }"
            border
            fit
            highlight-current-row
            style="width: 100%"
          >
            <el-table-column min-width="140px" label="名称">
              <template slot-scope="{ row }">
                  <span>{{ row.name }}</span>
              </template>
            </el-table-column>
  
            <el-table-column width="120px" align="center" label="描述">
              <template slot-scope="scope">
                <span>{{ scope.row.describes }}</span>
              </template>
            </el-table-column>
  
            <el-table-column width="100px" label="别名">
              <template slot-scope="scope">
                <span>{{ scope.row.otherName }}</span>
              </template>
            </el-table-column>
  
            <el-table-column class-name="status-col" label="文章总数" width="110">
              <template slot-scope="{ row }">
                <el-tag style="display: flex;justify-content: center;" >{{ row.num }}</el-tag>
              </template>
            </el-table-column>
  
            <el-table-column align="center" label="操作" width="200">
              <template slot-scope="scope">
                <router-link :to="'/article/edit/' + scope.row.id">
                  <el-button type="primary" size="mini" icon="el-icon-edit">
                    修改
                  </el-button>
                </router-link>
  
                <el-button
                  style="margin-left: 10px"
                  type="danger"
                  size="mini"
                  icon="el-icon-edit"
                  @click="delectArtive(scope.row.id)"
                >
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <pagination
          v-show="total > 0"
          :total="total"
            :page.sync="listQuery.page"
            :limit.sync="listQuery.limit"
            @pagination="getList"
          />
        </el-col>
      </el-row>
    </div>
  </template>
  
  <script>
  import { allClassName, DelectSquareClassById, newSquareClass } from '@/api/squareclass'
  
  import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
  
  export default {
    name: 'ArticleList',
    components: { Pagination },
    data() {
      return {
        list: null,
        total: 0,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 8
        },
        form: {
          name: '',
          father: '',
          otherName: '',
          describes: '',
          imgclass: '',
          top: false
  
        }
      }
    },
    created() {
      this.getList()
    },
    methods: {
          delectArtive(id) {
        this.$confirm('此操作将永久删除文章分类是否确认删除？', '确认信息', {
          distinguishCancelAndClose: true,
          confirmButtonClass: "danger",
          confirmButtonText: '删除',
          cancelButtonText: '放弃删除'
        })
          .then(() => {
            console.log("删除")
            DelectSquareClassById(id).then(resp => {
              this.$notify({
                title: '成功',
                message: '您已成功删除该分类',
                type: 'success'
              });
              //刷新当前页面
             this.getList()
            })
          })
          .catch(action => {
            this.$message({
              type: 'info',
              message: action === 'cancel'
                ? '放弃删除'
                : '保留当前分类'
            })
          });
      },
      formatDate(time) {
        let data = new Date(time)
        return formatDate(data, 'yyyy-MM-dd hh:mm ')
      },
      getList() {
        this.listLoading = true
       
      allClassName(this.listQuery).then(resp => {
        this.list = resp.data.data
        this.total = resp.data.total
        this.listLoading = false
      })
      },
      onSubmit() {
        let that = this
        this.loading = true
        newSquareClass(that.form).then(resp => {
          //做一个简单的返回数据判断
          console.log(resp)
          if (resp.status === 200) {
            if(resp.data == 143){
              console.log("创建失败")
            this.loading = false
            this.$notify.error({
              title: '失败',
              message: '该分类已存在',
            })
            }
            if(resp.data == 1){
                        this.getList()
            this.$notify({
              title: '成功',
              message: '创建分类成功',
              type: 'success',
              duration: 2000
            })
            this.loading = false
            }
          } else {
            console.log("创建失败")
          }
        })
          .catch((e) => {
            console.log('error submit!!')
            this.loading = false
            this.$notify.error({
              title: '失败',
              message: '请检查网络连接',
            })
            return false
          })
  
  
      },
    }
  }
  </script>
  
  <style scoped>
  </style>
  