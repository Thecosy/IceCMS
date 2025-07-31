import { useSettingStore } from '../stores/setting';
import { getSetting } from '../api/websetting';

export default defineNuxtPlugin(async (nuxtApp) => {
  if (process.server) {
    const settingStore = useSettingStore();
    if (!settingStore.settings) {
      try {
        const result = await getSetting("");
        settingStore.$patch({ settings: result || null 
        });
      } catch (err) {
        console.error('Failed to prefetch settings on server:', err);
      }
    }
  }
});
