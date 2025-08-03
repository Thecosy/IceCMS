<script setup lang="ts">
import "@wangeditor/editor/dist/css/style.css";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { onBeforeUnmount, ref, shallowRef, onMounted } from "vue";
import { defineProps } from 'vue';
import * as ArticleAPI from "@/api/art_function/article";

const props = defineProps({
  data: {
    type: String, // 或者其他你期望的类型
    default: ''
  }
});

defineOptions({
  name: "BaseEditor"
});

const mode = "default";
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();

// 内容 HTML
const valueHtml = ref('');

const fetchData = async (articleId) => {
  try {
    const response = await ArticleAPI.getArticleById(articleId);
    if (response.code === 200) {
      // classList.value = response.data;
      console.log(response)
      const res: {
        [x: string]: string; title: string
      } = Array.isArray(response.data) ? { title: '' } : response.data;
      valueHtml.value = res.content
    }
  } catch (error) {
    console.error('Error fetching articles:', error);
  }
};

// 模拟 ajax 异步获取内容
onMounted(() => {
  setTimeout(() => {
    // valueHtml.value = '';
  }, 1500);
  fetchData(props.data);
});

// 暴露给父组件的内容
defineExpose({
  getValueHtml() {
    return valueHtml.value;
  }
});

const { VITE_APP_BASE_API } = import.meta.env;
const uploadUrl = ref(`${VITE_APP_BASE_API}/FileApi/updateimage`);

const toolbarConfig: any = { excludeKeys: "fullScreen" };
const editorConfig = { placeholder: "请输入内容...", MENU_CONF: {} };
// 更多详细配置看 https://www.wangeditor.com/v5/menu-config.html#%E4%B8%8A%E4%BC%A0%E5%9B%BE%E7%89%87
editorConfig.MENU_CONF["uploadImage"] = {
  // 服务端上传地址，根据实际业务改写
  server: uploadUrl.value,
  // form-data 的 fieldName，根据实际业务改写
  fieldName: "editormd-image-file", // 更新为后端期望的字段名
  // 选择文件时的类型限制，根据实际业务改写
  allowedFileTypes: ["image/png", "image/jpg", "image/jpeg"],
  // 自定义插入图片
  customInsert(res: any, insertFn) {
    // res.url是后端返回的图片地址，根据实际业务改写
    if (res.url) {
      setTimeout(() => {
        // insertFn插入图片进编辑器
        insertFn(res.url);
      }, 2000);
    }
  }
};

const emit = defineEmits(['updateContent']);

const handleCreated = editor => {
  // 记录 editor 实例，重要！
  editorRef.value = editor;
};

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});

</script>

<template>
  <div class="wangeditor">
    <Toolbar :editor="editorRef" :defaultConfig="toolbarConfig" :mode="mode" style="border-bottom: 1px solid #ccc" />
    <Editor v-model="valueHtml" :defaultConfig="editorConfig" :mode="mode" style="height: 500px; overflow-y: hidden"
      @onCreated="handleCreated" />
  </div>
</template>
