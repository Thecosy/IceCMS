import { shallowRef, ref, onMounted, onUnmounted } from 'vue'

export const useInput = () => {
    const commenterRef = shallowRef<HTMLInputElement | null>(null)
    const richInputRef = shallowRef<HTMLInputElement | null>(null)
    const inputFocus = ref<boolean>(false)
    const placeholder = ref<string>('快来说两句吧...')
    const inputLength = ref<number>(0)

    // 聚焦输入
    const onRichFocus = () => {
        richInputRef.value?.focus()
    }

    // 输入时
    const onInputText = () => {
        const inputNode: HTMLInputElement | any = richInputRef.value
        if (!inputNode) return
        
        let textLength: number | any = 0
        for (const child of inputNode.childNodes) {
            if (child.nodeType === Node.TEXT_NODE) {
                // 添加空值检查，防止 textContent 为 null
                const textContent = child.textContent || ''
                textLength += textContent.trim().length
                console.log(textContent)
            }
            if (child.nodeName === 'DIV') {
                // 添加空值检查，防止 outerText 为 null 或 undefined
                const outerText = child.outerText || ''
                textLength += outerText.trim().length
            }
            if (child.nodeType === 1) {
                textLength += 1
            }
        }
        inputLength.value = textLength
        if (textLength) {
            placeholder.value = ''
        } else {
            placeholder.value = '快来说两句吧...'
        }
    }

    // 清空输入框内容
    const clearInputText = () => {
        inputLength.value = 0
        ;(richInputRef.value as HTMLInputElement).innerHTML = ''
    }

    // 输入光标位置移动至最后面
    const moveCursorToEnd = () => {
        const richInput = richInputRef.value as HTMLInputElement
        richInput.focus() // 确保元素获取焦点
        const range = document.createRange()
        const sel: any = window.getSelection()
        range.selectNodeContents(richInput)
        range.collapse(false)
        sel.removeAllRanges()
        sel.addRange(range)
    }

    // 判断鼠标聚焦元素是否在输入框以内
    const handleMouse = (e: Event) => {
        const clickedEl: HTMLElement | any = e.target
        const commenterElement = commenterRef.value as HTMLElement
        
        // 添加空值检查，防止 Cannot read properties of null 错误
        if (!commenterElement) {
            inputFocus.value = false
            return
        }
        
        const has = commenterElement.contains(clickedEl)
        if (!has) inputFocus.value = false
    }

    onMounted(() => {
        window.addEventListener('mousedown', handleMouse)
    })

    onUnmounted(() => {
        window.removeEventListener('mousedown', handleMouse)
    })
    return {
        commenterRef,
        richInputRef,
        inputFocus,
        placeholder,
        inputLength,

        onRichFocus,
        onInputText,
        clearInputText,
        moveCursorToEnd
    }
}

