import { getSetting } from '@/api/websetting'

export default async function ({ $cookies }) {
    if (!$cookies.get('setting')) {
        // 执行您的开局请求逻辑，例如使用axios发起请求
        //   const response = await axios.get('your-api-url');
        const res = await getSetting();
        if (res) {
            // 将获取的数据保存到Cookie中
            $cookies.set('setting', res.data);
        }
    }
}