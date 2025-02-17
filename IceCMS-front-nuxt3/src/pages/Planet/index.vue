<!-- pages/planet/index.vue -->
<script setup lang="ts">
import { useRouter } from 'vue-router';

// 使用 `useRouter` 来重定向
const router = useRouter();

// 假设默认的 `id` 是 1，你可以根据需要设置一个默认 `id`
const defaultId = 1;

router.push(`/planet/${defaultId}`);
</script>