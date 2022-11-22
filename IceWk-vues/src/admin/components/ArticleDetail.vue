<template>
  <div class="createPost-container">
    <el-form
      ref="postForm"
      :model="postForm"
      :rules="rules"
      class="form-container"
    >
      <sticky :z-index="10" :class-name="'sub-navbar ' + postForm.status">
        <CommentDropdown v-model="postForm.commentDisabled" />
        <PlatformDropdown v-model="postForm.platforms" />
        <SourceUrlDropdown v-model="postForm.source_uri" />
        <el-button
          v-loading="loading"
          style="margin-left: 10px"
          type="success"
          @click="submitForm"
        >
          提交
        </el-button>
        <el-button v-loading="loading" type="warning" @click="draftForm">
          草稿
        </el-button>
      </sticky>

      <div class="createPost-main-container">
        <el-row>
          <Warning />

          <el-col :span="24">
            <el-form-item style="margin-bottom: 40px" prop="title">
              <MDinput
                v-model="postForm.title"
                :maxlength="100"
                name="name"
                required
              >
                标题
              </MDinput>
            </el-form-item>

            <div class="postInfo-container">
              <el-row>
                <el-col :span="8">
                  <el-form-item
                    label-width="60px"
                    label="作者:"
                    class="postInfo-container-item"
                    prop="author"
                  >
                    <el-select
                      v-model="postForm.author"
                      :remote-method="getRemoteUserList"
                      filterable
                      default-first-option
                      remote
                      placeholder="选择作者"
                    >
                      <el-option
                        v-for="(item, index) in userListOptions"
                        :key="item + index"
                        :label="item"
                        :value="item"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :span="10">
                  <el-form-item
                    label-width="120px"
                    label="发布时间:"
                    class="postInfo-container-item"
                  >
                    <el-date-picker
                      v-model="displayTime"
                      type="datetime"
                      format="yyyy-MM-dd HH:mm:ss"
                      placeholder="选择日期和时间"
                    />
                  </el-form-item>
                </el-col>

                <el-col :span="6">
                  <el-form-item
                    label-width="90px"
                    label="重要性:"
                    class="postInfo-container-item"
                  >
                    <el-rate
                      v-model="postForm.ownerTag"
                      :max="3"
                      :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
                      :low-threshold="1"
                      :high-threshold="3"
                      style="display: inline-block"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <div class="postInfo-container">
              <el-row>
                <el-col :span="8">
                  <el-form-item label-width="70px" label="简介:">
                    <el-input
                      v-model="postForm.intro"
                      :rows="1"
                      type="textarea"
                      class="article-textarea"
                      autosize
                      placeholder="简单介绍一下吧"
                    />
                    <span v-show="contentShortLength" class="word-counter"
                      >{{ contentShortLength }}words</span
                    >
                  </el-form-item>
                </el-col>

                <el-col :span="10">
                  <el-form-item label="标签:">
                    <el-drag-select
                      v-model="value"
                      style="width: 400px"
                      multiple
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in options"
                        :key="item.id"
                        :label="item.tagName"
                        :value="item.id"
                      />
                    </el-drag-select>
                  </el-form-item>
                </el-col>

                <el-col :span="6">
                  <el-form-item
                    label-width="60px"
                    label="分类:"
                    class="postInfo-container-item"
                    prop="class"
                  >
                    <el-select
                      v-model="postForm.sortClass"
                      :remote-method="getRemoteUserList"
                      filterable
                      default-first-option
                      remote
                      placeholder="选择分类"
                    >
                      <el-option
                        v-for="(item, index) in ClassListOptions"
                        :key="item + index"
                        :label="item"
                        :value="item"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
        <el-form-item prop="content" style="margin-bottom: 30px">
          <Tinymce ref="editor" v-model="postForm.content" :height="400" />
        </el-form-item>

        <el-form-item prop="image_uri" style="margin-bottom: 30px">
          <Upload :fortitle="this.postForm.title" :forcontent="this.postForm.intro" v-model="postForm.thumb" />
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>


import { validURL } from '@/utils/validate'
import { Todate } from '@/utils/date.js'

import ElDragSelect from '@/components/DragSelect' // base on element-ui
import Upload from '@/components/Upload/SingleImage'
import Sticky from '@/components/Sticky' // 粘性header组件
import Warning from './Warning'
import { CommentDropdown, PlatformDropdown, SourceUrlDropdown } from './Dropdown'

import { getArticleById } from '@/api/article'
import { getAllUserName } from '@/api/user'
import { createArticle } from '@/api/article'
import { getAllClassName } from '@/api/article'
import { getClassNameById } from '@/api/article'

import { getAllTag } from "@/api/alltag";

import Tinymce from '@/components/Tinymce'
import MDinput from '@/components/MDinput'

const defaultForm = {
  status: 'draft',
  title: '', // 文章题目
  content: '', // 文章内容
  intro: '', // 文章摘要
  source_uri: '', // 文章外链
  // image_uri: '', // 文章图片
  createTime: undefined, // 前台展示时间
  id: undefined,
  platforms: ['a-platform'],
  commentDisabled: false,
  ownerTag: 0
}

export default {
  name: 'ArticleDetail',
  components: { ElDragSelect, Tinymce, MDinput, Upload, Sticky, Warning, CommentDropdown, PlatformDropdown, SourceUrlDropdown },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const validateRequire = (rule, value, callback) => {
      if (value === '') {
        this.$message({
          message: rule.field + '为必传项',
          type: 'error'
        })
        callback(new Error(rule.field + '为必传项'))
      } else {
        callback()
      }
    }
    var listRule = (rule, value, callback) => {
      undefined
      if (this.postForm.author === '' || this.postForm.author === undefined || this.postForm.author === null) {
        undefined
        this.$message({
          message: rule.field + '为必传项',
          type: 'error'
        })
        callback(new Error(rule.field + '为必填字段'))
      } else {
        undefined
        callback()
      }
    }
    const validateSourceUri = (rule, value, callback) => {
      if (value) {
        /* eslint-disable */
        if (validURL(value)) {
          callback()
        } else {
          this.$message({
            message: '外链url填写不正确',
            type: 'error'
          })
          callback(new Error('外链url填写不正确'))
        }
      } else {
        callback()
      }
    }
    return {
      value: [],
      options: [],
      articleid: '',
      postForm: Object.assign({}, defaultForm),
      loading: false,
      userListOptions: [],
      ClassListOptions: [],
      rules: {
        image_uri: [{ validator: validateRequire }],
        title: [{ validator: validateRequire }],
        author: [{ validator: listRule }],
        content: [{ validator: validateRequire }],
        source_uri: [{ validator: validateSourceUri, trigger: 'blur' }]
      },
      tempRoute: {}
    }
  },
  computed: {
    contentShortLength() {
      return this.postForm.intro.length
    },
    displayTime: {
      // set and get is useful when the data
      // returned by the back end api is different from the front end
      // back end return => "2013-06-25 06:59:25"
      // front end need timestamp => 1372114765000
      get() {
        return (+new Date(this.postForm.createTime))
      },
      set(val) {
        this.postForm.createTime = new Date(val)
        this.postForm.createTime = Todate(this.postForm.createTime)
      }
    }
  },
  created() {
    //获取作者列表，和分类列表
    this.getRemoteUserList()

    //数据回填
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      this.articleid = this.$route.params.id
      this.fetchData(id)
      this.fetchData(this.articleid)
    }

    // Why need to make a copy of this.$route here?
    // Because if you enter this page and quickly switch tag, may be in the execution of the setTagsViewTitle function, this.$route is no longer pointing to the current page
    // https://github.com/PanJiaChen/vue-element-admin/issues/1221
    this.tempRoute = Object.assign({}, this.$route)
  },
  methods: {

    async fetchData(id) {
      getArticleById(id).then(response => {
        console.log(response)

        this.postForm = response.data
        //根据classId查询对应的名称
        getClassNameById(response.data.sortClass).then(response => {
          this.postForm.sortClass = response.data
        }
        )
        this.postForm.articleStatus = response.data.articleStatus
        this.setTagsViewTitle()
        // set page title
        this.setPageTitle()
      }).catch(err => {
        console.log(err)
      })
      getAllTag(id).then(response => { 
        this.options = response.data
      })
    },
    setTagsViewTitle() {
      const title = '编辑文章'
      const route = Object.assign({}, this.tempRoute, { title: `${title}-${this.postForm.id}` })
      this.$store.dispatch('tagsView/updateVisitedView', route)
    },
    setPageTitle() {
      const title = '编辑文章'
      document.title = `${title} - ${this.postForm.id}`
    },
    submitForm() {
      let that = this
      this.postForm.keyword = JSON.stringify(this.value)
      this.$refs.postForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.postForm.status = 'published'
          createArticle(that.postForm).then(resp => {
            //做一个简单的返回数据判断
            if (resp.status === 200) {
              this.$notify({
                title: '成功',
                message: '发布文章成功',
                type: 'success',
                duration: 2000
              })
              //返回一个此文章的id给本页
              this.postForm.id = resp.data

              this.postForm.status = 'published'
              this.loading = false
            } else {
              console.log("保存失败")
            }
          })
            .catch((e) => {
              console.log('error submit!!')
              this.postForm.status = 'draft'
              this.loading = false
              this.$notify.error({
                title: '失败',
                message: '请检查网络连接',
              })
              return false
            })

        } else {
          this.loading = false
          console.log('error submit!!')
          return false
        }
      })
    },
    draftForm() {
      if (this.postForm.content.length === 0 || this.postForm.title.length === 0) {
        this.$message({
          message: '请填写必要的标题和内容',
          type: 'warning'
        })
        return
      }
      var that = this
      this.loading = true
      this.postForm.status = 'draft'
      //后端保存草稿处理
      //再调用一次发布
      createArticle(that.postForm).then(resp => {
        //做一个简单的返回数据判断
        if (resp.status === 200) {
          this.$message({
            message: '保存成功',
            type: 'success',
            showClose: true,
            duration: 1000
          })
          this.postForm.status = 'draft'
          this.loading = false
        } else {
          console.log("保存失败")
          this.loading = false
        }
      })
        .catch((e) => {
          console.log('error submit!!')
          this.loading = false
          return false
        })
    },
    getRemoteUserList(query) {
      /* eslint-disable */
      //获取作者列表
      getAllUserName().then(resp => {
        this.userListOptions = resp.data.map(o => { return [o.username].toString() })
      })
      //获取分类列表
      getAllClassName().then(resp => {
        this.ClassListOptions = resp.data.map(o => { return [o.name].toString() })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";

.createPost-container {
  position: relative;
  width: 100%;
  .createPost-main-container {
    padding: 40px 45px 20px 50px;

    .postInfo-container {
      position: relative;
      @include clearfix;
      margin-bottom: 10px;

      .postInfo-container-item {
        float: left;
      }
    }
  }

  .word-counter {
    width: 40px;
    position: absolute;
    right: 40%;
    top: 0px;
  }
}

.article-textarea ::v-deep {
  textarea {
    width: 45%;
    padding-right: 40px;
    resize: none;
    border: none;
    border-radius: 0px;
    border-bottom: 1px solid #bfcbd9;
  }
}
</style>
