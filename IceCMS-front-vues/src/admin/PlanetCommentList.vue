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
  
        <el-table-column width="105px" align="center" label="时间">
          <template slot-scope="scope">
            <span v-text="formatDate(scope.row.addTime)"></span>
          </template>
        </el-table-column>
  
        <el-table-column width="80px" align="center" label="作者">
          <template slot-scope="scope">
            <span>{{ scope.row.reviewers }}</span>
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
  
        <el-table-column width="220px" min-width="140px" label="内容">
          <template slot-scope="{ row }">
            <router-link target="_blank"  :to="'/post/' + row.id" class="link-type">
              <span>{{ row.content }}</span>
            </router-link>
          </template>
        </el-table-column>
  
        <el-table-column align="center" label="操作" width="200">
          <template slot-scope="scope">
           
              <el-button @click="changescore(scope.row.id)" type="primary" size="mini" icon="el-icon-edit">
                修改
              </el-button>
          
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

        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="getList"
      />

      <el-dialog title="圈子修改" :visible.sync="dialogFormVisible">
  <el-form >
    <el-form-item label="圈子内容" :label-width="formLabelWidth">
      <el-input  v-model="content" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="是否禁用" :label-width="formLabelWidth">
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
  </template>
  
  <script>
  import { getAllSquare, DelectSquareById, ChangeSquareById } from '@/api/squareComment'
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
        contentid: '',
        content:"",
        dialogFormVisible: false,
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
      changescore(id){
        this.dialogFormVisible = true;
        this.contentid=id;
      },
      sitmap(){
        this.dialogFormVisible = false
        ChangeSquareById(this.contentid,this.content).then(response => {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.getList()
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
              this.getList()
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
      getList() {
        console.log("getlist")
        this.listLoading = true
        getAllSquare(this.listQuery).then(resp => {
          console.log(resp)
          this.list = resp.data
          console.log(this.list)
        //   this.total = resp.data.total
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
  