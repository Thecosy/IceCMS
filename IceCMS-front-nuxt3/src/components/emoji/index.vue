<template>
    <client-only>
        <!-- 发送表情 -->
        <ElPopover
            placement="bottom-start"
            title=""
            width="416"
            trigger="click"
            class="!p-2"
            :teleported="false"
            @show="emit('show')"
        >
            <ElScrollbar height="120px" class="w-[416px]">
                <div class="flex flex-wrap pt-2" style="gap: 10px">
                    <img
                        class="hover:scale-[1.2] sm:cursor-pointer"
                        :class="`em ${item} `"
                        v-for="(item, index) in emoji"
                        :key="index"
                        style="font-size: 28px;padding: 1.8px;"
                        :src="`/emoji/${item}.png`"
                        @click="emit('append', item)"
                    />
                </div>
            </ElScrollbar>
            <template #reference>
                <div
                    title="表情"
                    class="w-[22px] h-[22px] cursor-pointer text-[#8a919f] hover:text-primary"
                >
                
                    <!-- <Icon
                        size="22"
                        name="/emoji/daxiao.png"
                        color="inherit"
                    ></Icon> -->
                    <div class="emoji-icon"></div>
                </div>
            </template>
        </ElPopover>
    </client-only>
</template>
<script setup lang="ts">
import EmojiArr from '../../../types/emojiArr'
import { ref } from 'vue';

const emit = defineEmits<{
    (e: 'show'): void
    (e: 'append', value: string): void
}>()
const emoji = ref<string[]>(EmojiArr)
</script>


<style scoped>
.emoji-icon {
  width: 28px; /* 适当增加大小，使其看起来更粗 */
  height: 28px;
  background-color: #B5B5B7;
  -webkit-mask-image: url('../../static/image/biaoqing.svg');
  mask-image: url('../../static/image/biaoqing.svg');
  -webkit-mask-size: cover;
  mask-size: cover;
  -webkit-mask-composite: destination-over; /* 避免过度裁剪 */
}
</style>