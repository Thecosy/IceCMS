//1 预览组件以及样式
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
// VuePress主题以及样式（这里也可以选择github主题）--VuePress主题代码呈黑色背景，github呈白色背景
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';

//use
const app = createApp(App)
 
 
app.use(VMdPreview)
 
 
app.mount('#app')
