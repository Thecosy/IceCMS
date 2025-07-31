<script setup lang="ts">
import { PropType } from "vue";
import { ListItem } from "./data";
import NoticeItem from "./noticeItem.vue";

const props = defineProps({
  list: {
    type: Array as PropType<Array<ListItem>>,
    default: () => []
  }
});

const emit = defineEmits(['read']);

// 处理通知已读事件
const handleNoticeRead = (id: number) => {
  emit('read', id);
};
</script>

<template>
  <div v-if="props.list.length">
    <NoticeItem
      v-for="(item, index) in props.list"
      :key="index"
      :noticeItem="item"
      @read="handleNoticeRead"
    />
  </div>
  <el-empty v-else description="暂无消息" />
</template>
