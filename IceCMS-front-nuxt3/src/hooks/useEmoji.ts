import { ref } from 'vue'

export const useEmoji = () => {
    // 光标信息
    const richRange = ref<any>(null)

    // 选择表情包
    const appendEmoji = async (emoji: string) => {
        richRange.value = await getRichRange()

        const editorRange = richRange.value.range
        const textNode = editorRange.endContainer // 拿到末尾文本节点
        const endOffset = editorRange.endOffset // 光标位置
    
        if (editorRange.commonAncestorContainer?.dataset?.placeholder) {
            editorRange.commonAncestorContainer.dataset.placeholder = ''
        }

        editorRange.setStart(textNode, endOffset)
        editorRange.setEnd(textNode, endOffset)
        editorRange.deleteContents() // 删除草稿end
        const emojiDom: HTMLElement = createEmojiElement(emoji)
        insertHtmlEmojiAtCaret(
            emojiDom,
            richRange.value.selection,
            richRange.value.range
        )
    }

    // 创建表情
    const createEmojiElement = (emoji: string) => {
        const emojiDom = document.createElement('img')
        emojiDom.setAttribute('src', `/emoji/${emoji}.png`)
        emojiDom.setAttribute(
            'style',
            `width: 24px; height: 24px; transform: scale(0.9); cursor: default;`
        )
        return emojiDom
    }

    // 插入表情
    const insertHtmlEmojiAtCaret = (
        html: HTMLElement | string,
        selection: Selection,
        range: any
    ) => {
        if (range && selection) {
            const el = document.createElement('div')
            if (typeof html === 'string') {
                el.innerHTML = html
            } else if (Array.isArray(html)) {
                html.forEach((item) => {
                    el.appendChild(item)
                })
            } else {
                el.appendChild(html)
            }
            const frag: DocumentFragment = document.createDocumentFragment()
            let node
            let lastNode
            while ((node = el.firstChild)) {
                lastNode = frag.appendChild(node)
            }
            range!.insertNode(html)
            if (lastNode) {
                selection.collapseToEnd()
            }
        }
    }

    // 获取光标信息
    const getRichRange = () => {
        return new Promise((resolve, reject) => {
            const selection: any = window.getSelection()
            if (selection.getRangeAt && selection.rangeCount) {
                const range = selection.getRangeAt(0)
                resolve({
                    range,
                    selection
                })
            } else {
                reject(null)
            }
        })
    }

    return { appendEmoji }
}

