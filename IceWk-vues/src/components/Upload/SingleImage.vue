<template>
  <div class="upload-container">
    <el-upload :limit="1" :data="dataObj" :multiple="false" :show-file-list="false" :on-change="handleImageSuccess"
      class="image-uploader" drag action="#" :before-upload="beforeUpload" :http-request="Execute_File">
      <i class="el-icon-upload" />
      <div class="el-upload__text">将主图拖到此处，或<em>点击上传</em></div>
    </el-upload>
    <div class="image-preview">
      <div v-show="imageUrl.length > 1" class="image-preview-wrapper">
        <img class="image-my" :src="imageUrl + '?imageView2/1/w/450/h/200'" />
        <div class="image-preview-action">
          <i class="el-icon-delete" @click="rmImage" />
        </div>
      </div>
    </div>
    <el-progress v-show="theprogress" :percentage="percentage > 100 ? 100 : percentage"
      :color="customColorMethod"></el-progress>
  </div>
</template>

<script>
import { addwatermarkimageUpload, updateImage } from '@/api/updateImage'

export default {

  name: 'SingleImageUpload',
  props: {
    foriscreate: {
      type: Boolean,
      required: true,
      default: ''
    },
    fortitle: {
      type: String,
      required: true,
      default: ''
    },
    forcontent: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      theprogress: false,
      percentage: 20,
      title: "",
      content: "",
      upFile: "",
      tempUrl: '',
      dataObj: { token: '', key: '' }
    }
  },
  computed: {
    imageUrl() {
      return this.value
    }
  },
  methods: {
    customColorMethod(percentage) {
      if (percentage < 30) {
        return '#909399';
      } else if (percentage < 70) {
        return '#e6a23c';
      } else {
        return '#67c23a';
      }
    },
    increase() {
      this.percentage += 10;
      if (this.percentage > 100) {
        this.percentage = 100;
      }
    },
    decrease() {
      this.percentage -= 10;
      if (this.percentage < 0) {
        this.percentage = 0;
      }
    },
    Execute_File(file) {
      //判断文件大小
      if (file.size > 1024 * 1024 * 2) {
        this.$message({
          message: '上传文件大小不能超过 2MB!',
          showClose: true,
          duration: 1000
        })
        return false;
      }
      this.theprogress = true
      this.$message({
        message: '上传中,请稍后',
        showClose: true,
        duration: 1000
      })
      this.percentage = 20
      var form = new FormData();
      form.append('editormd-image-file', file.file, file.file.name)
      this.title = this.fortitle
      this.content = this.forcontent
      window.setInterval(() => {
        setTimeout(() => {
          this.percentage += 3
          this.percentage % 90
        }, 0)
      }, 20)
      if (this.foriscreate) {
        if (this.title.length < 1) {
          this.$message({
            message: '标题不能为空',
            showClose: true,
            duration: 1000
          })
          this.percentage = 0
          this.theprogress = false
          return
        }
        if (this.content.length < 1) {
          this.$message({
            message: '简介不能为空',
            showClose: true,
            duration: 1000
          })
          this.percentage = 0
          this.theprogress = false
          return
        }
        addwatermarkimageUpload(form, this.title, this.content).then(resp => {
          this.$message({
            message: '上传成功',
            type: 'success',
            showClose: true,
            duration: 1000
          })
          this.percentage = 100
          this.theprogress = false
          var imgUrl = resp.data.url;//根据返回值得不同这里要自己定义
          this.tempUrl = imgUrl
          this.handleImageSuccess()
        }).catch((e) => {
          this.$message.error('抱歉,上传失败,请检查网络环境或图片大小');
          this.theprogress = false
          console.log("上传失败")
        })
        const fileData = new FormData()
        fileData.append('file', file.file)
      }
      else {
        updateImage(form).then(resp => {
          this.$message({
            message: '上传成功',
            type: 'success',
            showClose: true,
            duration: 1000
          })
          this.percentage = 100
          this.theprogress = false
          var imgUrl = resp.data.url;//根据返回值得不同这里要自己定义
          this.tempUrl = imgUrl
          this.handleImageSuccess()
        }).catch((e) => {
          this.$message.error('抱歉,上传失败,请检查网络环境或图片大小');
          this.theprogress = false
          console.log("上传失败")
        })
        const fileData = new FormData()
        fileData.append('file', file.file)
      }
    },
    rmImage() {
      this.emitInput('')
    },
    emitInput(val) {
      this.$emit('input', val)
    },
    handleImageSuccess() {
      this.emitInput(this.tempUrl)
    },
    beforeUpload(file) {
      if (file) {
        let upfile = new FormData();
        upfile.append('file', file) //append /12XiE buS#
        this.upload = upfile;
      } else {
        return false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";

.upload-container {
  width: 100%;
  position: relative;
  @include clearfix;

  .image-uploader {
    width: 40%;
    float: left;
  }

  .image-preview {
    width: 450px;
    height: 200px;
    position: relative;
    border: 1px dashed #d9d9d9;
    float: left;
    margin-left: 50px;

    .image-preview-wrapper {
      width: 450px;
      height: 200px;
      display: table-cell;
      vertical-align: middle;

      img {
        max-width: 100%;
        max-height: 100%;
        display: block;
        margin: auto;
      }
    }

    .image-preview-action {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      cursor: default;
      text-align: center;
      color: #fff;
      opacity: 0;
      font-size: 20px;
      background-color: rgba(0, 0, 0, 0.5);
      transition: opacity 0.3s;
      cursor: pointer;
      text-align: center;
      line-height: 200px;

      .el-icon-delete {
        font-size: 36px;
      }
    }

    &:hover {
      .image-preview-action {
        opacity: 1;
      }
    }
  }
}
</style>
