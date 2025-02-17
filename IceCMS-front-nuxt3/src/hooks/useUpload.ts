import { ref } from 'vue'

export const useUpload = () => {
    const fileList = ref<string[]>([])

    const onUpload = (result: { uri: string }) => {
        fileList.value.push(result.uri)
    }

    // 删除图片
    const removeFile = (index: number) => {
        fileList.value.splice(index, 1)
    }

    return {
        fileList,
        onUpload,
        removeFile
    }
}
