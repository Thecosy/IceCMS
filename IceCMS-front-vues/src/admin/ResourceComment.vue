<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      :default-sort="{ prop: 'date', order: 'ascending' }"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >

      <el-table-column align="center" prop="date" label="ID" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
          
      
            <el-table-column align="center" prop="date" label="ID" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.userId }}</span>
        </template>
      </el-table-column>
      


      <el-table-column width="105px" align="center" label="创建时间">
        <template slot-scope="scope">
          <span v-text="formatDate(scope.row.addTime)"></span>
        </template>
      </el-table-column>

      <el-table-column width="80px" align="center" label="用户名">
        <template slot-scope="scope">
          <span>{{ scope.row.username }}</span>
        </template>
      </el-table-column>
      
         <el-table-column align="center" prop="date" label="内容" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.content }}</span>
        </template>
      </el-table-column>

      <!-- <el-table-column align="center" label="头像">
        <template slot-scope="{ row }">
          <router-link target="_blank"  :to="'/post/' + row.id" class="link-type">
            <span>{{ row.profile }}</span>
          </router-link>
        </template>
      </el-table-column> -->

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


  </div>
</template>

<script>
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import { formatDate } from '@/utils/date.js'
import { getAllResourceComments } from '@/api/ResourceComment'

export default {
  name: 'ArticleList',
  components: { Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 8
      }
    }
  },
  created() {
    this.getList()
  },

  methods: {
    delectArtive(id) {
      this.$confirm('此操作将永久删除文章是否确认删除？', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonClass: "danger",
        confirmButtonText: '删除',
        cancelButtonText: '放弃删除'
      })
        .then(() => {
          DelectArticleById(id).then(resp => {
            this.$notify({
              title: '成功',
              message: '您已成功删除该文章',
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
              : '保留当前文章'
          })
        });
    },
    formatDate(time) {
      let data = new Date(time)
      return formatDate(data, 'yyyy-MM-dd hh:mm ')
    },
    getList() {
      this.listLoading = true
      getAllResourceComments().then(resp => {
       this.list = resp.data
       console.log(this.list)
       this.listLoading = false
      })
    }
  }
}
</script>

<style scoped>
.el-button:nth-child(1) {
  background: #055fe7;
}
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
.post-item__preview {
  width: 200px;
  height: 120px;
  border-radius: 10px;
  background-size: cover;
  background-position: 50%;
}
.delay-0 {
  -webkit-animation-delay: 0ms;
  animation-delay: 0ms;
  -webkit-animation-fill-mode: backwards !important;
  animation-fill-mode: backwards !important;
}
.text-center {
  text-align: center !important;
}
.flex {
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  /* flex样式呈现*/
  display: flex;
  /*垂直排列*/
  flex-direction: column;
  align-items: center; /*由于flex-direction: column，因此align-items代表的是水平方向*/
  justify-content: center; /*由于flex-direction: column，因此justify-content代表的是垂直方向*/
}
.flex {
  flex: 1;
}
.text-white {
  color: #fff !important;
}
.opacity-50 {
  opacity: 0.5 !important;
}
</style>
