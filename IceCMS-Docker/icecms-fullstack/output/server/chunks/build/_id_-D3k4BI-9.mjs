import { E as ElInput } from './el-input-2q_vffSS.mjs';
import { E as ElButton } from './el-button-LIU117i9.mjs';
import { ref, computed, mergeProps, withCtx, createTextVNode, nextTick, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrRenderAttr, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import { useRoute } from 'vue-router';
import { _ as _export_sfc } from './server.mjs';
import 'lodash-unified';
import './event-BZTOGHfp.mjs';
import '@vue/shared';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import '@kangc/v-md-editor/lib/theme/vuepress.js';
import 'prismjs';

const _sfc_main = {
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const messagesContainer = ref(null);
    const selectedUserId = ref(parseInt(route.params.id));
    const messageInput = ref("");
    const chatUsers = ref([
      {
        id: 1,
        name: "张三",
        avatar: "/api/placeholder/40/40",
        lastMessage: "你好，最近怎么样？",
        lastTime: "10:30"
      },
      {
        id: 2,
        name: "李四",
        avatar: "/api/placeholder/40/40",
        lastMessage: "明天见面聊吧",
        lastTime: "09:15"
      },
      {
        id: 3,
        name: "王五",
        avatar: "/api/placeholder/40/40",
        lastMessage: "谢谢你的帮助",
        lastTime: "昨天"
      }
    ]);
    const messages = ref([
      {
        id: 1,
        content: "你好！",
        time: "10:25",
        isOwn: false
      },
      {
        id: 2,
        content: "你好，有什么可以帮助你的吗？",
        time: "10:26",
        isOwn: true
      },
      {
        id: 3,
        content: "我想了解一下产品情况",
        time: "10:28",
        isOwn: false
      }
    ]);
    const userInfo = ref({
      avatar: "/api/placeholder/40/40"
    });
    const currentUser = computed(() => {
      return chatUsers.value.find((user) => user.id === selectedUserId.value);
    });
    const sendMessage = () => {
      if (!messageInput.value.trim()) return;
      const newMessage = {
        id: messages.value.length + 1,
        content: messageInput.value.trim(),
        time: (/* @__PURE__ */ new Date()).toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" }),
        isOwn: true
      };
      messages.value.push(newMessage);
      messageInput.value = "";
      nextTick(() => {
        if (messagesContainer.value) {
          messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_input = ElInput;
      const _component_el_button = ElButton;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "chat-container" }, _attrs))} data-v-79ebbc39><div class="chat-sidebar" data-v-79ebbc39><div class="sidebar-header" data-v-79ebbc39><h3 data-v-79ebbc39>私信</h3></div><div class="chat-list" data-v-79ebbc39><!--[-->`);
      ssrRenderList(chatUsers.value, (user) => {
        _push(`<div class="${ssrRenderClass([{ active: selectedUserId.value === user.id }, "chat-item"])}" data-v-79ebbc39><div class="user-avatar" data-v-79ebbc39><img${ssrRenderAttr("src", user.avatar)}${ssrRenderAttr("alt", user.name)} data-v-79ebbc39></div><div class="user-info" data-v-79ebbc39><div class="user-name" data-v-79ebbc39>${ssrInterpolate(user.name)}</div><div class="last-message" data-v-79ebbc39>${ssrInterpolate(user.lastMessage)}</div></div><div class="message-time" data-v-79ebbc39>${ssrInterpolate(user.lastTime)}</div></div>`);
      });
      _push(`<!--]--></div></div><div class="chat-main" data-v-79ebbc39>`);
      if (currentUser.value) {
        _push(`<div class="chat-header" data-v-79ebbc39><div class="user-avatar" data-v-79ebbc39><img${ssrRenderAttr("src", currentUser.value.avatar)}${ssrRenderAttr("alt", currentUser.value.name)} data-v-79ebbc39></div><div class="user-name" data-v-79ebbc39>${ssrInterpolate(currentUser.value.name)}</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="chat-messages" data-v-79ebbc39><!--[-->`);
      ssrRenderList(messages.value, (message) => {
        _push(`<div class="${ssrRenderClass([{ "own-message": message.isOwn }, "message-item"])}" data-v-79ebbc39>`);
        if (!message.isOwn) {
          _push(`<div class="message-avatar" data-v-79ebbc39><img${ssrRenderAttr("src", currentUser.value?.avatar)}${ssrRenderAttr("alt", currentUser.value?.name)} data-v-79ebbc39></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="message-content" data-v-79ebbc39><div class="message-text" data-v-79ebbc39>${ssrInterpolate(message.content)}</div><div class="message-time" data-v-79ebbc39>${ssrInterpolate(message.time)}</div></div>`);
        if (message.isOwn) {
          _push(`<div class="message-avatar" data-v-79ebbc39><img${ssrRenderAttr("src", userInfo.value?.avatar)} alt="我" data-v-79ebbc39></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--></div><div class="chat-input" data-v-79ebbc39><div class="input-box" data-v-79ebbc39>`);
      _push(ssrRenderComponent(_component_el_input, {
        modelValue: messageInput.value,
        "onUpdate:modelValue": ($event) => messageInput.value = $event,
        type: "textarea",
        rows: 3,
        placeholder: "输入消息...",
        onKeydown: sendMessage
      }, null, _parent));
      _push(`</div><div class="input-actions" data-v-79ebbc39>`);
      _push(ssrRenderComponent(_component_el_button, {
        type: "primary",
        onClick: sendMessage,
        disabled: !messageInput.value.trim()
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` 发送 `);
          } else {
            return [
              createTextVNode(" 发送 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/UserInfo/chat/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-79ebbc39"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-D3k4BI-9.mjs.map
