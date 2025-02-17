// plugins/main.js
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';

// Prism 代码块关键字高亮
import Prism from 'prismjs';
// 代码高亮
import 'prismjs/components/prism-json';

export default defineNuxtPlugin(nuxtApp => {
    // 在 Nuxt 3 中，直接在 nuxtApp 上使用插件
    nuxtApp.vueApp.use(VMdPreview);

    // 如果你需要设置主题，可以在这里设置
    // 选择使用主题
    VMdPreview.use(vuepressTheme, {
        Prism,
    });
});