<template>
  <div :class="{ fullscreen: fullscreen }" class="tinymce-container" :style="{ width: containerWidth }">
    <textarea :id="tinymceId" class="tinymce-textarea" />
    <div class="editor-custom-btn-container">
      <editorImage color="#1890ff" class="editor-upload-btn" @successCBK="imageSuccessCBK" />
    </div>
  </div>
</template>

<script>
/**
 * docs:
 * https://panjiachen.github.io/vue-element-admin-site/feature/component/rich-editor.html#tinymce
 */
import editorImage from './components/EditorImage'
import load from './dynamicLoadScript'
import { updateImage } from '@/api/updateImage'


// why use this cdn, detail see https://github.com/PanJiaChen/tinymce-all-in-one
// const tinymceCDN = 'https://cdn.jsdelivr.net/npm/tinymce-all-in-one@4.9.3/tinymce.min.js'
const tinymceCDN = 'https://cdn.staticfile.org/tinymce/6.2.0/tinymce.min.js'
// const tinymceCDN = 'https://cdn.jsdelivr.net/npm/tinymce-all-in-one@4.9.3/tinymce.min.js' // 此CDN在国外经常会挂，所以换其他国内cdn
// 国内常用cdn
// 七牛 https://www.staticfile.org
// 360  https://cdn.baomitu.com
// 字节跳动 https://cdn.bytedance.com
// const tinymceCDN = 'https://www.staticfile.org/tinymce/6.2.0/tinymce.min.js'


export default {
  name: 'Tinymce',
  components: { editorImage },
  props: {
    id: {
      type: String,
      default: function () {
        return 'vue-tinymce-' + +new Date() + ((Math.random() * 1000).toFixed(0) + '')
      }
    },
    value: {
      type: String,
      default: ''
    },
    toolbar: {
      type: Array,
      required: false,
      default() {
        return []
      }
    },
    menubar: {
      type: String,
      default: 'file edit insert view format table'
    },
    height: {
      type: [Number, String],
      required: false,
      default: 360
    },
    width: {
      type: [Number, String],
      required: false,
      default: 'auto'
    }
  },
  data() {
    return {
      hasChange: false,
      hasInit: false,
      tinymceId: this.id,
      fullscreen: false,
      languageTypeList: {
        'en': 'en',
        'zh': 'zh_CN',
        'es': 'es_MX',
        'ja': 'ja'
      }
    }
  },
  computed: {
    containerWidth() {
      const width = this.width
      if (/^[\d]+(\.[\d]+)?$/.test(width)) { // matches `100`, `'100'`
        return `${width}px`
      }
      return width
    }
  },
  watch: {
    value(val) {
      if (!this.hasChange && this.hasInit) {
        this.$nextTick(() =>
          window.tinymce.get(this.tinymceId).setContent(val || ''))
      }
    }
  },
  mounted() {
    this.init()
  },
  activated() {
    if (window.tinymce) {
      this.initTinymce()
    }
  },
  deactivated() {
    this.destroyTinymce()
  },
  destroyed() {
    this.destroyTinymce()
  },
  methods: {
    init() {
      // dynamic load tinymce from cdn
      load(tinymceCDN, (err) => {
        if (err) {
          this.$message.error(err.message)
          return
        }
        this.initTinymce()
      })
    },
    initTinymce() {
      const _this = this
      window.tinymce.init({
        content_style: "h3 {color: #ffffff !important;background-color: #222628;border-left: 12px solid #030303;width:30%;padding : 1px 1px 1px 20px;}h2 {color: #ffffff !important;background-color: #52A1FF;width:45%;border-left: 12px solid #4F89FF;padding : 1px 1px 1px 20px;} p, div {font-size: 14px; margin: 0px; border:0px ; padding: 0px}",
        // content_css: "./mycontent.css",
        theme_advanced_font_sizes: "10px,12px,13px,14px,16px,18px,20px",
        fontsize_formats: '12px 14px 16px 18px 24px 36px 48px 56px 72px',
        selector: `#${this.tinymceId}`,
        language: 'zh_CN',
        language_url: require('./zh_CN.js'),
        height: this.height,
        body_class: 'panel-body ',
        statusbar: false,
        object_resizing: false,
        toolbar: `undo redo | styleselect | formatselect | fontselect | fontsizeselect | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | outdent indent | image axupimgs link | insert paste code | numlist bullist | table fullscreen | forecolor backcolor hr | preview removeformat`,
        menubar: this.menubar,
        plugins: `image link code lists advlist importcss table fullscreen media preview`,
        forced_root_block: 'p',//将任何非块元素或文本节点都包装在块元素中
        end_container_on_empty_block: true,
        powerpaste_word_import: 'clean',
        code_dialog_height: 450,
        code_dialog_width: 1000,
        advlist_bullet_styles: 'square',
        advlist_number_styles: 'default',
        imagetools_cors_hosts: ['www.tinymce.com', 'codepen.io'],
        default_link_target: '_blank',
        link_title: false,
        init_instance_callback: editor => {
          if (_this.value) {
            editor.setContent(_this.value)
          }
          _this.hasInit = true
          editor.on('NodeChange Change KeyUp SetContent', () => {
            this.hasChange = true
            this.$emit('input', editor.getContent())
          })
        },
        setup(editor) {
          editor.on('FullscreenStateChanged', (e) => {
            _this.fullscreen = e.state
          })
        },
        // it will try to keep these URLs intact
        // https://www.tiny.cloud/docs-3x/reference/configuration/Configuration3x@convert_urls/
        // https://stackoverflow.com/questions/5196205/disable-tinymce-absolute-to-relative-url-conversions
        convert_urls: false,//本地url
        // CONFIG: Paste
        paste_retain_style_properties: 'all', //贴内容时要保留的样式
        paste_word_valid_elements: '*[*]',        // word需要它
        paste_data_images: true,                  // 粘贴的同时能把内容里的图片自动上传，非常强力的功能
        paste_convert_word_fake_lists: true,     // 插入word文档需要该属性
        paste_webkit_styles: 'all',   //指定粘贴到WebKit中时要保留的样式
        paste_merge_formats: true,   //合并相同的文本格式元素
        nonbreaking_force_tab: false,   //按下键盘tab键时强制TinyMCE插入三个实体

        images_upload_handler: (blobInfo, progress) =>
          new Promise((resolve, reject) => {
            var form = new FormData();
            form.append('editormd-image-file', blobInfo.blob(), blobInfo.filename());
            updateImage(form)
              .then(function (res) {
                resolve(res.data.url);

              }).catch(res => {
                //failure("error");
              });
          }),
      })
    },

    setContent(value) {
      window.tinymce.get(this.tinymceId).setContent(value)
    },
    getContent() {
      window.tinymce.get(this.tinymceId).getContent()
    },
    imageSuccessCBK(arr) {
      arr.forEach(v => window.tinymce.get(this.tinymceId).insertContent(`<img class="wscnph" src="${v.url}" >`))
    }
  }
}
</script>

<style lang="scss" scoped>
.tinymce-container {
  position: relative;
  line-height: normal;
}

.tinymce-container {
  ::v-deep {
    .mce-fullscreen {
      z-index: 10000;
    }
  }
}

.tinymce-textarea {
  visibility: hidden;
  z-index: -1;
}

.editor-custom-btn-container {
  position: absolute;
  right: 4px;
  top: 4px;
  /*z-index: 2005;*/
}

.fullscreen .editor-custom-btn-container {
  z-index: 10000;
  position: fixed;
}

.editor-upload-btn {
  display: inline-block;
}
</style>
