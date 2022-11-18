<template>
  <div class="app-container">
    <div class="topList">
      <div class="topListLeft" >
    <el-input style="padding:8px;" maxlength="12" v-model="input" placeholder="请输入内容"></el-input>
    <el-button style="margin:8px;" icon="el-icon-search" type="success" @click="handleAdd">
          查询
        </el-button>
    <el-button style="margin:8px;" icon="el-icon-plus" type="primary" @click="handleAdd">
          添加
        </el-button>
        <el-button style="margin:8px;" icon="el-icon-delete" type="danger" @click="handleDelete">
          删除
        </el-button>
      </div>
      </div>
    <el-table
    class="my_table"
      v-loading="listLoading"
      :data="list"
      :default-sort="{ prop: 'date', order: 'ascending' }"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
      <el-table-column align="center" prop="date" label="封面" width="220">
        <template slot-scope="scope">
          <img
            v-if="scope.row.thumb != null"
            class="post-item__preview delay-0"
            :src="scope.row.thumb"
          />
          <div
            v-else
            class="post-item__preview align-items-center d-flex delay-5"
            :style="getStyles()"
          >
            <h3 class="flex text-center text-white opacity-50">NOPIC</h3>
          </div>
        </template>
      </el-table-column>

      <el-table-column align="center" prop="date" label="ID" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="105px" align="center" label="时间">
        <template slot-scope="scope">
          <span v-text="formatDate(scope.row.addTime)"></span>
        </template>
      </el-table-column>

      <el-table-column width="80px" align="center" label="作者">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>

      <el-table-column width="100px" label="重要性">
        <template slot-scope="scope">
          <svg-icon
            v-for="n in +scope.row.ownerTag"
            :key="n"
            icon-class="star"
            class="meta-item__icon"
          />
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="状态" width="110">
        <template slot-scope="{ row }">
          <el-tag :type="row.status | statusFilter">
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column width="120px" min-width="140px" label="标题">
        <template slot-scope="{ row }">
          <router-link target="_blank"  :to="'/post/' + row.id" class="link-type">
            <span>{{ row.title }}</span>
          </router-link>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="200">
        <template slot-scope="scope">
          <router-link :to="'/resource/edit/' + scope.row.id">
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
  </div>
</template>

<script>
import { DelectArticleById } from '@/api/article'
import { getAllResource ,DelectResourceById } from '@/api/resource'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import { formatDate } from '@/utils/date.js'

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
    getStyles() {

      //生成随机颜色
      let max = 8;
      let min = 1;

      let x = Math.floor(Math.random() * (max - min + 1)) + min;

      const backcolor = "randomColor" + x;
   
      if (backcolor == "randomColor1") {
        return "background-image: linear-gradient( 135deg, #ABDCFF 10%, #0396FF 100%);"
      }
      if (backcolor == "randomColor2") {
        return "background-image: linear-gradient( 135deg, #FEB692 10%, #EA5455 100%);"
      }
      if (backcolor == "randomColor3") {
        return "background-image: linear-gradient( 135deg, #CE9FFC 10%, #7367F0 100%);"
      }
      if (backcolor == "randomColor4") {
        return "background-image: linear-gradient( 135deg, #90F7EC 10%, #32CCBC 100%);"
      }
      if (backcolor == "randomColor5") {
        return "background-image: linear-gradient( 135deg, #81FBB8 10%, #28C76F 100%);"
      }
      if (backcolor == "randomColor6") {
        return "background-image: linear-gradient( 135deg, #E2B0FF 10%, #9F44D3 100%);"
      }
      if (backcolor == "randomColor7") {
        return "background-image: linear-gradient( 135deg, #5EFCE8 10%, #736EFE 100%);"
      }
      if (backcolor == "randomColor8") {
        return "background-image: linear-gradient( 135deg, #FFD3A5 10%, #FD6585 100%);"
      }


      return "background-image: linear-gradient( 135deg, #FFD3A5 10%, #FD6585 100%);"
    },
    delectArtive(id) {
      this.$confirm('此操作将永久删除文章是否确认删除？', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonClass: "danger",
        confirmButtonText: '删除',
        cancelButtonText: '放弃删除'
      })
        .then(() => {
          DelectResourceById(id).then(resp => {
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
      getAllResource(this.listQuery).then(resp => {
        this.list = resp.data.data
        this.total = resp.data.total
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


</style>
<style  scoped>
  .text-white {
  color: #fff !important;
}
.opacity-50 {
  opacity: 0.5 !important;
}
.topList{
  display: flex;
  background-color: #fff !important;
  border-radius: 8px 8px 0 0;
}
.topListLeft{
  display: flex;
  width: 500px;
}
.my_table >>> .el-table__row>td{
  /* 去除表格线 */
  border: none;
  /* border: 1pxsolidhsla(210,8%,51%,.09); */
}
.my_table >>> .el-table th.is-leaf {
  /* 去除上边框 */
    border: none;
}
.my_table >>> .el-table::before{
  /* 去除下边框 */
  height: 0;
}

   </style>