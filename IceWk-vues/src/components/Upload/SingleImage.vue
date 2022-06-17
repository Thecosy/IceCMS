<template>
  <div class="upload-container">
    <el-upload
      :limit="1"
      :data="dataObj"
      :multiple="false"
      :show-file-list="false"
      :on-change="handleImageSuccess"
      class="image-uploader"
      drag
      action="#"
      :before-upload="beforeUpload"
      :http-request="Execute_File"
    >
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
    <el-progress v-show="theprogress" :percentage="percentage" :color="customColorMethod"></el-progress>
  </div>
</template>

<script>
import { addwatermarkimageUpload } from '@/api/updateImage'

export default {

  name: 'SingleImageUpload',
  props: {
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
      title:"",
      content:"",
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
    upload_change: function (file, fileList) {
      // 判断 > 1M
      if (file.size > 1048576) {
        fileList.pop();
        let msg_size = `您上传的${file.name}，该文件大于1M，请您重新上传。`;
        this.notify_self(msg_size, "size");
        return false;
      }
      // 判断重名文件
      let repeat_judge = this.fileList.find(item => {
        return item.name == file.name;
      });
      if (repeat_judge) {
        fileList.pop();
        let msg_repeat = `您上传的${file.name}，该文件有重名文件，请您重新上传。`;
        this.notify_self(msg_repeat, "repeat");
        return false;
      }
      this.fileList = JSON.parse(JSON.stringify(fileList));
      this.upload_List.push(file);
    },
    upload_remove(file, fileList) {
      this.fileList = JSON.parse(JSON.stringify(fileList));
      // 不直接赋值是因为打印出来的数据中，如果多个文件删至只剩一个时，该文件的raw为object，不是file
      this.upload_List.forEach((item, index) => {
        if (item.name == file.name) {
          this.upload_List.splice(index, 1);
        }
      });
    },
    upload_exceed(files, fileList) {
      this.$alert("您最多只能上传100个文件!", "上传文件", {
        confirmButtonText: "确定",
        type: "warning"
      });
    },
    notify_self(msg, type) {
      this.notifyPromise = this.notifyPromise.then(this.$nextTick).then(() => {
        this.$notify({
          title: `${type == "size" ? "文件大于1M" : "文件重名"}`,
          message: msg,
          iconClass: `${type == "size" ? "el-icon-s-opportunity" : "el-icon-message-solid"
            }`,
          customClass: `${type == "size" ? "notify_size" : "notify_repeat"}`,
          duration: 6000
        });
      });
    },
    Execute_File(file) {
      this.theprogress=true
      this.$message({
            message: '上传中,请稍后',
            showClose: true,
            duration: 1000
      })
      this.percentage=20
      var form = new FormData();
      form.append('editormd-image-file', file.file, file.file.name)
      this.title = this.fortitle
      this.content = this.forcontent
      window.setInterval(() => {
      setTimeout(() => {
      this.percentage+=3
      this.percentage%90
      }, 0)
      }, 200)
      addwatermarkimageUpload(form,this.title,this.content).then(resp => {
        this.$message({
            message: '上传成功',
            type: 'success',
            showClose: true,
            duration: 1000
        })
        this.percentage=100
        this.theprogress=false
        var imgUrl = resp.data.url;//根据返回值得不同这里要自己定义
        this.tempUrl = imgUrl
        this.handleImageSuccess()
      }).catch((e) => { 
       this.$message.error('抱歉,上传失败');
       this.theprogress=false
      console.log("上传失败") })
      const fileData = new FormData()
      fileData.append('file', file.file)

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
   width:450px;
      height:200px;
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
