<template>
  <view v-if="!disabled" class="tn-image-upload-class tn-image-upload">
    <movable-area
      class="tn-image-upload__movable-area"
      :style="{
        height: movableAreaHeight
      }"
      @mouseenter="mouseEnterArea"
      @mouseleave="mouseLeaveArea"
       v-if="show"
    >
      <block v-if="lists.length>0">
		  <block
		    v-for="(item, index) in lists"
		    :key="index"
		  >
		    <movable-view
		      class="tn-image-upload__movable-view"
		      :style="{
		        width: $t.string.getLengthUnitValue(width),
		        height: $t.string.getLengthUnitValue(height),
		        zIndex: item.zIndex,
		        opacity: item.opacity,
		        
		      }"
		      :x="item.x"
		      :y="item.y"
		      direction="all"
		      :damping="40"
		      :disabled="item.disabled"
		      @change="movableChange($event, item)"
		      @touchstart="movableStart(item)"
		      @mousedown="movableStart(item)"
		      @touchend="movableEnd(item)"
		      @mouseup="movableEnd(item)"
		      @longpress="movableLongPress(item)"
		    >
		      <view
		        class="tn-image-upload__item tn-image-upload__item-preview"
		        :style="{
		          width: $t.string.getLengthUnitValue(itemWidth, 'px'),
		          height: $t.string.getLengthUnitValue(itemHeight, 'px'),
		          transform: `scale(${item.scale})`
		        }"
		      >
		        <!-- 删除按钮 -->
		        <view
		          v-if="deleteable"
		          class="tn-image-upload__item-preview__delete"
		          @tap.stop="deleteItem(index)"
		          :style="{
		            borderTopColor: deleteBackgroundColor
		          }"
		        >
		          <view
		            class="tn-image-upload__item-preview__delete--icon"
		            :class="[`tn-icon-${deleteIcon}`]"
		            :style="{
		              color: deleteColor
		            }"
		          ></view>
		        </view>
		        <!-- 进度条 -->
		        <tn-line-progress
		          v-if="showProgress && item.data.progress > 0 && !item.data.error"
		          class="tn-image-upload__item-preview__progress"
		          :percent="item.data.progress"
		          :showPercent="false"
		          :round="false"
		          :height="8"
		        ></tn-line-progress>
		        <!-- 重试按钮 -->
		        <view v-if="item.data.error" class="tn-image-upload__item-preview__error-btn" @tap.stop="retry(index)">点击重试</view>
		        <!-- 图片信息 -->
		        <image
		          class="tn-image-upload__item-preview__image"
		          :src="item.data.url || item.data.path"
		          :mode="imageMode"
		          @tap.stop="doPreviewImage(item.data.url || item.data.path, index)"
		        ></image>
		      </view>
		    </movable-view>
		  </block>
	  </block>
      
      <!-- 添加按钮 -->
      <view
        v-if="maxCount > lists.length"
        class="tn-image-upload__add"
        :style="{
          top: addBtn.y + 'px',
          left: addBtn.x + 'px',
          width: $t.string.getLengthUnitValue(itemWidth, 'px'),
          height: $t.string.getLengthUnitValue(itemHeight, 'px')
        }"
        @tap="selectFile"
      >
        <!-- 添加按钮 -->
        <view
          class="tn-image-upload__item tn-image-upload__item-add"
          hover-class="tn-hover-class"
          hover-stay-time="150"
          :style="{
            width: $t.string.getLengthUnitValue(itemWidth, 'px'),
            height: $t.string.getLengthUnitValue(itemHeight, 'px')
          }"
        >
          <view class="tn-image-upload__item-add--icon tn-icon-add"></view>
          <view class="tn-image-upload__item-add__tips">{{ uploadText }}</view>
        </view>
      </view>
    </movable-area>
  </view>
</template>

<script>
  export default {
    name: 'tn-image-upload-drag',
    props: {
      // 已上传的文件列表
      fileList: {
        type: Array,
        default() {
          return []
        }
      },
      // 上传图片地址
      action: {
        type: String,
        default: ''
      },
      // 上传文件的字段名称
      name: {
        type: String,
        default: 'file'
      },
      // 头部信息
      header: {
        type: Object,
        default() {
          return {}
        }
      },
      // 携带的参数
      formData: {
        type: Object,
        default() {
          return {}
        }
      },
      // 是否禁用
      disabled: {
        type: Boolean,
        default: false
      },
      // 是否自动上传
      autoUpload: {
        type: Boolean,
        default: true
      },
      // 最大上传数量
      maxCount: {
        type: Number,
        default: 9
      },
      // 预览上传图片的裁剪模式
      imageMode: {
        type: String,
        default: 'aspectFill'
      },
      // 点击图片是否全屏预览
      previewFullImage: {
        type: Boolean,
        default: true
      },
      // 是否显示进度条
      showProgress: {
        type: Boolean,
        default: true
      },
      // 是否显示删除按钮
      deleteable: {
        type: Boolean,
        default: true
      },
      // 删除按钮图标
      deleteIcon: {
        type: String,
        default: 'close'
      },
      // 删除按钮的背景颜色
      deleteBackgroundColor: {
        type: String,
        default: ''
      },
      // 删除按钮的颜色
      deleteColor: {
        type: String,
        default: ''
      },
      // 上传区域提示文字
      uploadText: {
        type: String,
        default: '选择图片'
      },
      // 显示toast提示
      showTips: {
        type: Boolean,
        default: true
      },
      // 预览图片和选择图片区域的宽度
      width: {
        type: Number,
        default: 200
      },
      // 预览图片和选择图片区域的高度
      height: {
        type: Number,
        default: 200
      },
      // 选择图片的尺寸
      // 参考上传文档 https://uniapp.dcloud.io/api/media/image
      sizeType: {
        type: Array,
        default() {
          return ['original', 'compressed']
        }
      },
      // 图片来源
      sourceType: {
        type: Array,
        default() {
          return ['album', 'camera']
        }
      },
      // 是否可以多选
      multiple: {
        type: Boolean,
        default: true
      },
      // 文件大小(byte)
      maxSize: {
        type: Number,
        default: 10 * 1024 * 1024
      },
      // 允许上传的类型
      limitType: {
        type: Array,
        default() {
          return ['png','jpg','jpeg','webp','gif','image']
        }
      },
      // 是否自定转换为json
      toJson: {
        type: Boolean,
        default: true
      },
      // 上传前钩子函数，每个文件上传前都会执行
      beforeUpload: {
        type: Function,
        default: null
      },
      // 删除文件前钩子函数
      beforeRemove: {
        type: Function,
        default: null
      },
      index: {
        type: [Number, String],
        default: ''
      }
    },
    computed: {
      movableAreaHeight() {
        if (this.lists.length < this.maxCount) {
          return Math.ceil((this.lists.length + 1) / this.baseData.columns) * uni.upx2px(this.height) + 'px'
        } else {
          return Math.ceil(this.lists.length / this.baseData.columns) * uni.upx2px(this.height) + 'px'
        }
      },
      itemWidth() {
        return uni.upx2px(this.width) - (uni.upx2px(10) * 2)
      },
      itemHeight() {
        return uni.upx2px(this.height) - (uni.upx2px(10) * 2)
      }
    },
    data() {
      return {
        lists: [],
        uploading: false,
        baseData: {
          windowWidth: 0,
          columns: 0,
          dragItem: null,
          widthPx: 0,
          heightPx: 0
        },
        addBtn: {
          x: 0,
          y: 0
        },
        timer: null,
        dragging: false,
        show: true
      }
    },
    watch: {
      fileList: {
        handler(val) {
		 val.map(value => {
            // 首先检查内部是否已经添加过这张图片，因为外部绑定了一个对象给fileList的话(对象引用)，进行修改外部fileList时，
            // 会触发watch，导致重新把原来的图片再次添加到this.lists
            // 数组的some方法意思是，只要数组元素有任意一个元素条件符合，就返回true，而另一个数组的every方法的意思是数组所有元素都符合条件才返回true
            let tmp = this.lists.some(listVal => {
              return listVal.url === value.url
            })
            // 如果内部没有这张图片，则添加到内部
            !tmp && this.lists.push({ data:{url: value.url, error: false, progress: 100} })
			//初始化图片数据位置
			this.$nextTick(() => {
			  this.updateDragInfo()
			})
			// 更新添加按钮位置
			this.updateAddBtnPositioin();
          })
        },
		deep:true,
        immediate: true
      },
      lists(val) {
        this.$emit('on-list-change', this.sortList(), this.index)
      }
    },
    created() {
      this.baseData.windowWidth = uni.getSystemInfoSync().windowWidth
    },
    mounted() {
      this.$nextTick(() => {
        this.updateDragInfo()
      })
    },
    methods: {
      // 清除列表
      clear() {
        this.lists = []
        this.updateAddBtnPositioin()
      },
      // 重新上传队列中上传失败所有文件
      reUpload() {
        this.uploadFile()
      },
      // 选择图片
      selectFile() {
        if (this.disabled) return
        const {
          name = '',
          maxCount,
          multiple,
          maxSize,
          sizeType,
          lists,
          camera,
          compressed,
          sourceType
        } = this
        let chooseFile = null
        const newMaxCount = maxCount - lists.length
        // 只选择图片的时候使用 chooseImage 来实现
        chooseFile = new Promise((resolve, reject) => {
          uni.chooseImage({
            count: multiple ? (newMaxCount > 9 ? 9 : newMaxCount) : 1,
            sourceType,
            sizeType,
            success: resolve,
            fail: reject
          })
        })
        chooseFile.then(res => {
          let file = null
          let listOldLength = lists.length
          res.tempFiles.map((val, index) => {
            if (!this.checkFileExt(val)) return
            
            // 是否超出最大限制数量
            if (!multiple && index >= 1) return
            if (val.size > maxSize) {
              this.$emit('on-oversize', val, this.sortList(), this.index)
              this.showToast('超出可允许文件大小')
            } else {
              if (maxCount <= lists.length) {
                this.$emit('on-exceed', val, this.sortList(), this.index)
                this.showToast('超出最大允许的文件数')
                return
              }
              lists.push(this.handleDragListItem({
                url: val.path,
                progress: 0,
                error: false,
                file: val
              }))
              this.updateAddBtnPositioin()
            }
          })
          this.$emit('on-choose-complete', this.sortList(), this.index)
          if (this.autoUpload) this.uploadFile(listOldLength)
        }).catch(err => {
          this.$emit('on-choose-fail', err)
        })
      },
      // 提示用户信息
      showToast(message, force = false) {
        if (this.showTips || force) {
          this.$t.message.toast(message)
        }
      },
      // 手动上传，通过ref进行调用
      upload() {
        this.uploadFile()
      },
      // 对失败图片进行再次上传
      retry(index) {
        this.lists[index].data.progress = 0
        this.lists[index].data.error = false
        this.lists[index].data.response = null
        this.$t.message.loading('重新上传')
        this.uploadFile(index)
      },
      // 上传文件
      async uploadFile(index = 0) {
        if (this.disabled) return
        if (this.uploading) return
        // 全部上传完成
        if (index >= this.lists.length) {
          this.$emit('on-uploaded', this.sortList(), this.index)
          return
        }
        // 检查是否已经全部上传或者上传中
        if (this.lists[index].data.progress === 100) {
          this.lists[index].data.uploadTask = null
          if (this.autoUpload) this.uploadFile(index + 1)
          return
        }
        // 执行before-upload钩子
        if (this.beforeUpload && typeof(this.beforeUpload) === 'function') {
          // 在微信，支付宝等环境(H5正常)，会导致父组件定义的函数体中的this变成子组件的this
          // 通过bind()方法，绑定父组件的this，让this的this为父组件的上下文
          // 因为upload组件可能会被嵌套在其他组件内，比如tn-form，这时this.$parent其实为tn-form的this，
          // 非页面的this，所以这里需要往上历遍，一直寻找到最顶端的$parent，这里用了this.$u.$parent.call(this)
          let beforeResponse = this.beforeUpload.bind(this.$t.$parent.call(this))(index, this.lists)
          // 判断是否返回了Promise
          if (!!beforeResponse && typeof beforeResponse.then === 'function') {
            await beforeResponse.then(res => {
              // promise返回成功，不进行操作继续
            }).catch(err => {
              // 进入catch回调的话，继续下一张
              return this.uploadFile(index + 1)
            })
          } else if (beforeResponse === false) {
            // 如果返回flase，继续下一张图片上传
            return this.uploadFile(index + 1)
          } else {
            // 为true的情况，不进行操作
          }
        }
        // 检查上传地址
        if (!this.action) {
          this.showToast('请配置上传地址', true)
          return
        }
        this.lists[index].data.error = false
        this.uploading = true
        // 创建上传对象
        const task = uni.uploadFile({
          url: this.action,
          filePath: this.lists[index].data.url,
          name: this.name,
          formData: this.formData,
          header: this.header,
          success: res => {
            // 判断啊是否为json字符串，将其转换为json格式
            let data = this.toJson && this.$t.test.jsonString(res.data) ? JSON.parse(res.data) : res.data
            if (![200, 201, 204].includes(res.statusCode)) {
              this.uploadError(index, data)
            } else {
              this.lists[index].data.response = data
              this.lists[index].data.progress = 100
              this.lists[index].data.error = false
              this.$emit('on-success', data, index, this.sortList(), this.index)
            }
          },
          fail: err => {
            this.uploadError(index, err)
          },
          complete: res => {
            this.$t.message.closeLoading()
            this.uploading = false
            this.uploadFile(index + 1)
            this.$emit('on-change', res, index, this.sortList(), this.index)
          }
        })
        this.lists[index].uploadTask = task
        task.onProgressUpdate(res => {
          if (res.progress > 0) {
            this.lists[index].data.progress = res.progress
            this.$emit('on-progress', res, index, this.sortList(), this.index)
          }
        })
      },
      // 上传失败
      uploadError(index, err) {
        this.lists[index].data.progress = 0
        this.lists[index].data.error = true
        this.lists[index].data.response = null
        this.showToast('上传失败，请重试')
        this.$emit('on-error', err, index, this.sortList(), this.index)
      },
      // 删除一个图片
      deleteItem(index) {
        if (!this.deleteable) return
        this.$t.message.modal(
          '提示',
          '你确定要删除吗？',
          async () => {
            // 先检查是否有定义before-remove移除前钩子
            // 执行before-remove钩子
            if (this.beforeRemove && typeof(this.beforeRemove) === 'function') {
              let beforeResponse = this.beforeRemove.bind(this.$t.$parent.call(this))(index, this.lists)
              // 判断是否返回promise 
              if (!!beforeResponse && typeof beforeResponse.then === 'function') {
                await beforeResponse.then(res => {
                  // promise返回成功不进行操作
                  this.handlerDeleteItem(index)
                }).catch(err => {
                  this.showToast('删除操作被中断')
                })
              } else if (beforeResponse === false) {
                this.showToast('删除操作被中断')
              } else {
                this.handlerDeleteItem(index)
              }
            } else {
              this.handlerDeleteItem(index)
            }
          }, true)
      },
      // 移除文件操作
      handlerDeleteItem(index) {
        // 如果文件正在上传中，终止上传任务
        if (this.lists[index].data.progress < 100 && this.lists[index].data.progress > 0) {
          typeof this.lists[index].data.uploadTask !== 'undefined' && this.lists[index].data.uploadTask.abort()
        }
        this.remove(index)
        this.$forceUpdate()
        this.$emit('on-remove', index, this.sortList(), this.index)
        this.showToast('删除成功')
      },
      // 移除文件，通过ref手动形式进行调用
      remove(index) {
        if (!this.deleteable) return
        // 判断索引合法
        if (index >= 0 && index < this.lists.length) {
          let currentItemIndex = this.lists[index].index
          this.lists.splice(index, 1)
          this.show = false;
          setTimeout(() => {
            this.show = true;
            // 重新排列列表信息
            for (let item of this.lists) {
              if (item.index > currentItemIndex) {
                item.index -= 1
                item.x = item.positionX * this.baseData.widthPx
                item.y = item.positionY * this.baseData.heightPx
                item.positionX = item.index % this.baseData.columns
                item.positionY = Math.floor(item.index / this.baseData.columns)
                this.$nextTick(() => {
                  item.x = item.positionX * this.baseData.widthPx
                  item.y = item.positionY * this.baseData.heightPx
                })
              }
            }
            this.updateAddBtnPositioin()
          }, 50)
          
          this.updateAddBtnPositioin()
        }
      },
      // 预览图片
      doPreviewImage(url, index) {
        if (!this.previewFullImage) return
        const images = this.lists.sort((l1, l2) => { return l1.index - l2.index}).map(item => item.data.url || item.data.path)
        uni.previewImage({
          urls: images,
          current: url,
          success: () => {
            this.$emit('on-preview', url, this.sortList(), this.index)
          },
          fail: () => {
            this.showToast('预览图片失败')
          }
        })
      },
      // 检查文件后缀是否合法
      checkFileExt(file) {
        // 是否为合法后缀
        let noArrowExt = false
        // 后缀名
        let fileExt = ''
        const reg = /.+\./
        
        // #ifdef H5
        fileExt = file.name.replace(reg, '').toLowerCase()
        // #endif
        // #ifndef H5
        fileExt = file.path.replace(reg, '').toLowerCase()
        // #endif
        noArrowExt = this.limitType.some(ext => {
          return ext.toLowerCase() === fileExt
        })
        if (!noArrowExt) this.showToast(`不支持${fileExt}格式的文件`)
        return noArrowExt
      },
      
      /********************* 拖拽处理 ********************/
      
      // 更新拖拽信息
      updateDragInfo() {
        this.baseData.widthPx = uni.upx2px(this.width)
        this.baseData.heightPx = uni.upx2px(this.height)
        
        // 获取可移动区域的信息，用于判断当前有多少列
        const query = uni.createSelectorQuery().in(this)
        query.select('.tn-image-upload__movable-area').boundingClientRect()
        query.exec((res) => {
          if (!res) {
            setTimeout(() => {
              this.updateDragInfo()
            }, 10)
            return
          }
          this.baseData.columns = Math.floor(res[0].width / this.baseData.widthPx)
          
          // 初始化可拖拽列表信息
          this.lists = []
          this.fileList.forEach((item) => {
            // 首先检查内部是否已经添加过这张图片，因为外部绑定了一个对象给fileList的话(对象引用)，进行修改外部fileList时，
            // 会触发watch，导致重新把原来的图片再次添加到this.lists
            // 数组的some方法意思是，只要数组元素有任意一个元素条件符合，就返回true，而另一个数组的every方法的意思是数组所有元素都符合条件才返回true
            let tmp = this.lists.map(value => {
              return value.data
            }).some(listVal => {
              return listVal.url === item.url
            })
            // 如果内部没有这张图片，则添加到内部
            !tmp && this.lists.push(this.handleDragListItem({
              url: item.url,
              error: false,
              progress: 100
            }))
          })
          
          // 更新添加按钮位置
          this.updateAddBtnPositioin()
        })
      },
      // 处理拖拽列表信息
      handleDragListItem(item) {
        const positionX = this.lists.length % this.baseData.columns
        const positionY = Math.floor(this.lists.length / this.baseData.columns)
        const x = positionX * this.baseData.widthPx
        const y = positionY * this.baseData.heightPx
        return {
          id: this.unique(),
          x,
          y,
          preX: x,
          preY: y,
          positionX,
          positionY,
          zIndex:1,
          disabled: true,
          opacity: 1,
          scale: 1,
          index: this.lists.length,
          offset: 0,
          moveEnd: false,
          moving: false,
          data: {
            ...item
          }
        }
      },
      // 生成元素唯一id
      unique(n = 6) {
        let id = ''
        for (let i = 0; i < n; i++) id += Math.floor(Math.random() * 10)
        return 'tn_' + new Date().getTime() + id
      },
      // 更新添加按钮位置
      updateAddBtnPositioin() {
        if (this.lists.length >= this.maxCount) return
        
        this.addBtn.x = (this.lists.length % this.baseData.columns) * this.baseData.widthPx
        this.addBtn.y = Math.floor(this.lists.length / this.baseData.columns) * this.baseData.heightPx
      },
      // 获取排序后数据
      sortList() {
        const list = this.lists.slice()
        list.sort((l1, l2) => {
          return l1.index - l2.index
        })
        return list.map(item => {
          return item.data
        })
      },
      mouseEnterArea () {
        // #ifdef H5
        this.lists.forEach(item => {
          item.disabled = false
        })
        // #endif
      },
      mouseLeaveArea () {
        // #ifdef H5
        if (this.baseData.dragItem) {
          this.lists.forEach(item => {
            item.disabled = true
            item.zIndex = 1
            item.offset = 0
            item.moveEnd = true
            if (item.id === this.baseData.dragItem.id) {
              if (this.timer) {
                clearTimeout(this.timer)
                this.timer = null
              }
              item.x = item.preX
              item.y = item.preY
              this.$nextTick(() => {
                item.x = item.positionX * this.baseData.widthPx
                item.y = item.positionY * this.baseData.heightPx
                this.baseData.dragItem = null
              })
            }
          })
          this.dragging = false
        }
        // #endif
      },
      movableLongPress(item) {
        // #ifndef H5
          uni.vibrateShort()
          // console.log("LongPress--------------------------------------------------------------");
          this.lists.forEach(value => {
            value.moving = false
          })
          this.dragging = true
          // 设置对应的元素允许拖动
          const index = this.lists.findIndex(obj => {
            return obj.id === item.id
          })
          item.disabled = false
          item.opacity = 0.7
          item.scale = 1.1
          this.$set(this.lists, index, item)
        // #endif
      },
      movableChange (e, item) {
        if (!item || !this.dragging) return
        // console.log("movableChange");
        item.moving = true
        item.preX = e.detail.x
        item.preY = e.detail.y
        // console.log(item.preX, item.preY);
        
        if (e.detail.source === 'touch') {
          if (!item.moveEnd) {
            item.offset = Math.sqrt(
              Math.pow(item.preX - item.positionX * this.baseData.widthPx, 2) + 
              Math.pow(item.preY - item.positionY * this.baseData.heightPx, 2))
          }
          let x = Math.floor((e.detail.x + this.baseData.widthPx / 2) / this.baseData.widthPx)
          if (x > this.baseData.columns) return
          let y = Math.floor((e.detail.y + this.baseData.heightPx / 2) / this.baseData.heightPx)
          let index = this.baseData.columns * y + x
          if (item.index !== index && index < this.lists.length) {
            for (let obj of this.lists) {
              if (item.index > index && obj.index >= index && obj.index < item.index) {
                this.updateItemPosition(obj, 1)
              } else if (item.index < index && obj.index <= index && obj.index > item.index) {
                this.updateItemPosition(obj, -1)
              } else if (item.id != obj.id) {
                // obj.offset = 0
                // console.log(obj.moving);
                // if (!obj.moving) {
                //   obj.preX = obj.positionX * this.baseData.widthPx
                //   obj.preY = obj.positionY * this.baseData.heightPx
                //   console.log("moving", obj.id, obj.preX, obj.preY);
                // }
                // obj.x = obj.preX
                // obj.y = obj.preY
                // // console.log(obj.id, obj.preX, obj.preY);
                // this.$nextTick(() => {
                //   obj.x = obj.positionX * this.baseData.widthPx
                //   obj.y = obj.positionY * this.baseData.heightPx
                // })
              }
            }
            item.index = index
            item.positionX = x
            item.positionY = y
            // TODO 发送事件
          }
        }
      },
      movableStart (item) {
        // console.log("movableStart");
        this.lists.forEach(item => {
          item.zIndex = 1
          // #ifdef H5
          item.disabled = false
          // #endif
        })
        item.zIndex = 10
        item.moveEnd = false
        this.baseData.dragItem = item
        // #ifdef H5
        this.dragging =true
        this.timer = setTimeout(() => {
          item.opacity = 0.7
          item.scale = 1.1
          clearTimeout(this.timer)
          this.timer = null
        }, 200)
        // #endif
      },
      movableEnd (item) {
        if (!this.dragging) return
        // console.log("movableEnd");
        const index = this.lists.findIndex(obj => {
          return obj.id === item.id
        })
        if (!item.moving) {
          item.preX = item.positionX * this.baseData.widthPx
          item.preY = item.positionY * this.baseData.heightPx
        }
        item.x = item.preX
        item.y = item.preY
        item.offset = 0
        item.moveEnd = true
        item.moving = false
        item.disabled = true
        // console.log(item.x, item.y);
        // console.log(item.id, item.moving);
        // this.$set(this.lists, index, item)
        // this.lists[index] = item
        // console.log(this.lists[index]);
        this.lists.forEach(listValue => {
          listValue.moving = false
          listValue.disabled = true
        })
        this.$nextTick(() => {
          item.x = item.positionX * this.baseData.widthPx
          item.y = item.positionY * this.baseData.heightPx
          item.opacity = 1
          item.scale = 1
          this.baseData.dragItem = null
          this.dragging = false
          // console.log(item.x, item.y);
          this.$set(this.lists, index, item)
        })
        this.$emit('sort-list', this.sortList())
      },
      // 更新图片位置信息
      updateItemPosition(item, offset) {
        const index = this.lists.findIndex(obj => {
          return obj.id === item.id
        })
        item.index += offset
        item.offset = 0
        item.positionX = item.index % this.baseData.columns
        item.positionY = Math.floor(item.index / this.baseData.columns)
        if (!item.moving) {
          item.preX = item.positionX * this.baseData.widthPx
          item.preY = item.positionY * this.baseData.heightPx
        }
        item.x = item.preX
        item.y = item.preY
        // console.log("updateItemPosition", item.id, item.preX, item.preY);
        // this.$set(this.lists, index, item)
        this.$nextTick(() => {
          item.x = item.positionX * this.baseData.widthPx
          item.y = item.positionY * this.baseData.heightPx
          this.$set(this.lists, index, item)
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  
  .tn-image-upload {
    position: relative;
    
    &__movable-area {
      width: 100%;
    }
    
    &__movable-view {
      overflow: hidden;
    }
    
    &__item {
      /* #ifndef APP-NVUE */
      display: flex;
      /* #endif */
      align-items: center;
      justify-content: center;
      width: 200rpx;
      height: 200rpx;
      background-color: transparent;
      position: relative;
      border-radius: 5rpx;
      overflow: hidden;
      
      &-preview {
        border: 1rpx solid $tn-space-color;
        
        &__delete {
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          top: 0;
          right: 0;
          z-index: 10;
          border-top: 60rpx solid;
          border-left: 60rpx solid transparent;
          border-top-color: rgba(0,0,0,0.1);
          width: 0rpx;
          height: 0rpx;
          
          &--icon {
            position: absolute;
            top: -50rpx;
            right: 6rpx;
            color: #FFFFFF;
            font-size: 24rpx;
            line-height: 1;
          }
        }
        
        &__progress {
          position: absolute;
          width: auto;
          bottom: 0rpx;
          left: 0rpx;
          right: 0rpx;
          z-index: 9;
          /* #ifdef MP-WEIXIN */
          display: inline-flex;
          /* #endif */
        }
        
        &__error-btn {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background-color: rgba(0,0,0,0.5);
          color: #FFFFFF;
          font-size: 20rpx;
          padding: 8rpx 0;
          text-align: center;
          z-index: 9;
          line-height: 1;
        }
        
        &__image {
          display: block;
          width: 100%;
          height: 100%;
          // border-radius: 10rpx;
        }
      }
      
      &-add {
        flex-direction: column;
        color: $tn-content-color;
        font-size: 26rpx;
        
        &--icon {
          font-size: 40rpx;
        }
        
        &__tips {
          margin-top: 20rpx;
          line-height: 40rpx;
        }
      }
    }
    
    &__add {
      background-color: $tn-space-color;
      position: absolute;
      // border-radius: 10rpx;
      // margin: 10rpx;
      // margin-left: 0;
    }
  }
</style>
