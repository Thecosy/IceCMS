// stores/setting.ts
import { defineStore } from 'pinia';
import { getSetting } from '../api/websetting';

export interface Setting {
  readonly id: string;
  banquan: string;
  beian: string;
  comment_show: boolean;
  h5Show: boolean;
  imageFormat: boolean;
  sitLogo: string;
  sitSrc: string;
  sitTitle: string;
}

interface SettingState {
  settings: Setting | null;
  isLoading: boolean;
  error: string | null;
}
export const useSettingStore = defineStore('setting', {
    state: (): SettingState => ({
      settings: null,
      isLoading: false,
      error: null,
    }),
  
    actions: {
      async fetchSettings() {
        if (process.server) return; // 避免在服务端环境调用
  
        const storedData = process.client ? localStorage.getItem('settings') : null;
        const storedTime = process.client ? localStorage.getItem('settings_timestamp') : null;
        const isExpired =
          storedTime && Date.now() - parseInt(storedTime) > 24 * 60 * 60 * 1000; // 设置为 1 天有效期
  
        if (storedData && !isExpired) {
          this.settings = JSON.parse(storedData);
          return;
        }
  
        this.isLoading = true;
        this.error = null;
  
        try {
          const result = await getSetting("");
          this.settings = result.data || null;
  
          if (process.client) {
            localStorage.setItem('settings', JSON.stringify(this.settings));
            localStorage.setItem('settings_timestamp', Date.now().toString());
          }
        } catch (err: any) {
          this.error = err.message || 'Failed to fetch settings';
          console.error('Fetching settings failed:', err);
        } finally {
          this.isLoading = false;
        }
      },
  
      clearSettings() {
        this.settings = null;
  
        if (process.client) {
          localStorage.removeItem('settings');
          localStorage.removeItem('settings_timestamp');
        }
      },
    },
  });
  
