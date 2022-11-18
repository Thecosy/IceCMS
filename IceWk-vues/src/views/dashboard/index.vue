<template>
  <div class="dashboard-container">
    <github-corner class="github-corner" />
    <panel-group
      style="margin-top: 50px"
      @handleSetLineChartData="handleSetLineChartData"
    />
    <el-row :gutter="8">
      <el-col
        :xs="{ span: 24 }"
        :sm="{ span: 24 }"
        :md="{ span: 24 }"
        :lg="{ span: 12 }"
        :xl="{ span: 12 }"
        style="padding-right: 8px; margin-bottom: 30px"
      >
        <transaction-table />
      </el-col>
      <el-col
        :xs="{ span: 24 }"
        :sm="{ span: 12 }"
        :md="{ span: 12 }"
        :lg="{ span: 6 }"
        :xl="{ span: 6 }"
        style="margin-bottom: 30px"
      >
        <todo-list />
      </el-col>

      <el-col
        :xs="{ span: 24 }"
        :sm="{ span: 12 }"
        :md="{ span: 12 }"
        :lg="{ span: 6 }"
        :xl="{ span: 6 }"
        style="margin-bottom: 30px"
      >
        <box-card />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import TransactionTable from './components/TransactionTable'
import BoxCard from './components/BoxCard'
import TodoList from './components/TodoList'
import PanelGroup from './components/PanelGroup'
import GithubCorner from '@/components/GithubCorner'
import { test } from '@/api/test'
import { getArticleById } from '@/api/article'

export default {
  create: {

  },
  methods: {
    getArticle() {
      getArticleById(50).then(resp => {
        this.content = resp.data.content
      })
    },
    submitForm() {
      test().then(resp => {

        console.log(resp)
        this.res = resp.data.mes
        console.log(resp.data.mes)

      })
    }
  },
  name: 'Dashboard',
  components: {
    GithubCorner,
    PanelGroup,
    TodoList,
    TransactionTable,
    BoxCard,
  },
  data() {
    return {
      content: "",
      res: ""
    }
  },
  computed: {

  }

}
</script>

<style lang="scss" scoped>
.github-corner {
  position: absolute;
  top: 0px;
  border: 0;
  right: 0;
}
.dashboard {
  &-container {
    width: 100%;
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
