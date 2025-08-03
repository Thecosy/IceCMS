import { E as ElForm, a as ElFormItem } from './el-form-DWMILsFE.mjs';
import { E as ElInput } from './el-input-2q_vffSS.mjs';
import { E as ElButton } from './el-button-LIU117i9.mjs';
import { u as useUserStore } from './useUserStore-gmH42dcJ.mjs';
import { v as vLoading } from './el-loading-B0BjiLcr.mjs';
import { defineComponent, ref, computed, reactive, mergeProps, unref, withCtx, createBlock, openBlock, createVNode, toDisplayString, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrGetDirectiveProps, ssrRenderComponent, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';
import { b as ChangePassword } from './webuser-CDNs4gr0.mjs';
import { E as ElMessage } from './index-D2_eFSsF.mjs';
import { E as ElNotification } from './index-0K9UalJV.mjs';
import { _ as _export_sfc } from './server.mjs';
import '@vue/shared';
import 'lodash-unified';
import './event-BZTOGHfp.mjs';
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
import 'vue-router';
import '@kangc/v-md-editor/lib/theme/vuepress.js';
import 'prismjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "changePw",
  __ssrInlineRender: true,
  setup(__props) {
    const loading = ref(false);
    const formRef = ref();
    const form = ref({
      yuanPassWord: "",
      NewPassWord: "",
      ShowPassWord: ""
    });
    const passwordStrength = computed(() => {
      const password = form.value.NewPassWord;
      if (!password) return "";
      let score = 0;
      if (password.length >= 8) score++;
      if (/[a-z]/.test(password)) score++;
      if (/[A-Z]/.test(password)) score++;
      if (/\d/.test(password)) score++;
      if (/[^a-zA-Z\d]/.test(password)) score++;
      if (score <= 2) return "weak";
      if (score <= 3) return "medium";
      return "strong";
    });
    const passwordStrengthText = computed(() => {
      const strength = passwordStrength.value;
      if (!form.value.NewPassWord) return "";
      if (strength === "weak") return "弱";
      if (strength === "medium") return "中";
      return "强";
    });
    const rules = reactive({
      yuanPassWord: [
        { required: true, message: "请输入原密码", trigger: "blur" }
      ],
      NewPassWord: [
        { required: true, message: "请输入新密码", trigger: "blur" },
        { min: 6, message: "密码长度至少6位", trigger: "blur" }
      ],
      ShowPassWord: [
        { required: true, message: "请确认新密码", trigger: "blur" },
        {
          validator: (rule, value, callback) => {
            if (value !== form.value.NewPassWord) {
              callback(new Error("两次输入的密码不一致"));
            } else {
              callback();
            }
          },
          trigger: "blur"
        }
      ]
    });
    const onSubmit = async () => {
      if (!formRef.value) return;
      try {
        await formRef.value.validate();
        const userStore = useUserStore();
        if (!userStore.userid) {
          ElMessage.error("用户信息无效，请重新登录");
          return;
        }
        loading.value = true;
        const response = await ChangePassword(
          form.value.yuanPassWord,
          form.value.NewPassWord,
          userStore.userid
        );
        if (response && response.code === 200) {
          ElNotification({
            title: "成功",
            message: "密码修改成功",
            type: "success",
            offset: 50
          });
          resetForm();
        } else if (response && response.code === 400) {
          ElNotification({
            title: "失败",
            message: "原密码不正确，请重新输入",
            type: "warning",
            offset: 50
          });
        } else {
          ElNotification({
            title: "失败",
            message: "密码修改失败",
            type: "warning",
            offset: 50
          });
        }
      } catch (error) {
        console.error("修改密码出错:", error);
        ElNotification({
          title: "失败",
          message: "修改失败，请检查网络连接",
          type: "error",
          offset: 50
        });
      } finally {
        loading.value = false;
      }
    };
    const resetForm = () => {
      if (!formRef.value) return;
      formRef.value.resetFields();
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_form = ElForm;
      const _component_el_form_item = ElFormItem;
      const _component_el_input = ElInput;
      const _component_el_button = ElButton;
      const _directive_loading = vLoading;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "change-password-container home" }, _attrs))} data-v-a3a40646><div class="header" data-v-a3a40646><div class="header-icon" data-v-a3a40646><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-a3a40646><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM12 17c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM15.1 8H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" fill="currentColor" data-v-a3a40646></path></svg></div><h2 data-v-a3a40646>修改密码</h2><p class="subtitle" data-v-a3a40646>为了您的账户安全，请定期更新密码</p></div><div${ssrRenderAttrs(mergeProps({ class: "form-container" }, ssrGetDirectiveProps(_ctx, _directive_loading, unref(loading))))} data-v-a3a40646>`);
      _push(ssrRenderComponent(_component_el_form, {
        ref_key: "formRef",
        ref: formRef,
        model: unref(form),
        rules: unref(rules),
        "label-width": "100px",
        class: "password-form",
        "label-position": "top"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="form-item-wrapper" data-v-a3a40646${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_form_item, {
              label: "原密码",
              prop: "yuanPassWord"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_input, {
                    modelValue: unref(form).yuanPassWord,
                    "onUpdate:modelValue": ($event) => unref(form).yuanPassWord = $event,
                    placeholder: "请输入当前密码",
                    "show-password": "",
                    size: "large",
                    class: "password-input"
                  }, {
                    prefix: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-a3a40646${_scopeId3}><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM12 17c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM15.1 8H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" fill="currentColor" data-v-a3a40646${_scopeId3}></path></svg>`);
                      } else {
                        return [
                          (openBlock(), createBlock("svg", {
                            viewBox: "0 0 24 24",
                            fill: "none",
                            xmlns: "http://www.w3.org/2000/svg"
                          }, [
                            createVNode("path", {
                              d: "M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM12 17c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM15.1 8H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z",
                              fill: "currentColor"
                            })
                          ]))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_input, {
                      modelValue: unref(form).yuanPassWord,
                      "onUpdate:modelValue": ($event) => unref(form).yuanPassWord = $event,
                      placeholder: "请输入当前密码",
                      "show-password": "",
                      size: "large",
                      class: "password-input"
                    }, {
                      prefix: withCtx(() => [
                        (openBlock(), createBlock("svg", {
                          viewBox: "0 0 24 24",
                          fill: "none",
                          xmlns: "http://www.w3.org/2000/svg"
                        }, [
                          createVNode("path", {
                            d: "M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM12 17c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM15.1 8H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z",
                            fill: "currentColor"
                          })
                        ]))
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="form-item-wrapper" data-v-a3a40646${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_form_item, {
              label: "新密码",
              prop: "NewPassWord"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_input, {
                    modelValue: unref(form).NewPassWord,
                    "onUpdate:modelValue": ($event) => unref(form).NewPassWord = $event,
                    placeholder: "请输入新密码（至少6位）",
                    "show-password": "",
                    size: "large",
                    class: "password-input"
                  }, {
                    prefix: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-a3a40646${_scopeId3}><path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1L13.5 2.5L16.17 5.17C15.24 5.06 14.32 5 13.38 5C10.38 5 7.68 6.64 6.09 9.22L7.66 10.79C8.78 8.61 10.79 7 13.38 7C14.32 7 15.24 7.17 16.17 7.5L13.5 10.17L15 11.67L21 9Z" fill="currentColor" data-v-a3a40646${_scopeId3}></path></svg>`);
                      } else {
                        return [
                          (openBlock(), createBlock("svg", {
                            viewBox: "0 0 24 24",
                            fill: "none",
                            xmlns: "http://www.w3.org/2000/svg"
                          }, [
                            createVNode("path", {
                              d: "M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1L13.5 2.5L16.17 5.17C15.24 5.06 14.32 5 13.38 5C10.38 5 7.68 6.64 6.09 9.22L7.66 10.79C8.78 8.61 10.79 7 13.38 7C14.32 7 15.24 7.17 16.17 7.5L13.5 10.17L15 11.67L21 9Z",
                              fill: "currentColor"
                            })
                          ]))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="password-strength" data-v-a3a40646${_scopeId2}><div class="strength-bar" data-v-a3a40646${_scopeId2}><div class="${ssrRenderClass([unref(passwordStrength), "strength-fill"])}" data-v-a3a40646${_scopeId2}></div></div><span class="strength-text" data-v-a3a40646${_scopeId2}>${ssrInterpolate(unref(passwordStrengthText))}</span></div>`);
                } else {
                  return [
                    createVNode(_component_el_input, {
                      modelValue: unref(form).NewPassWord,
                      "onUpdate:modelValue": ($event) => unref(form).NewPassWord = $event,
                      placeholder: "请输入新密码（至少6位）",
                      "show-password": "",
                      size: "large",
                      class: "password-input"
                    }, {
                      prefix: withCtx(() => [
                        (openBlock(), createBlock("svg", {
                          viewBox: "0 0 24 24",
                          fill: "none",
                          xmlns: "http://www.w3.org/2000/svg"
                        }, [
                          createVNode("path", {
                            d: "M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1L13.5 2.5L16.17 5.17C15.24 5.06 14.32 5 13.38 5C10.38 5 7.68 6.64 6.09 9.22L7.66 10.79C8.78 8.61 10.79 7 13.38 7C14.32 7 15.24 7.17 16.17 7.5L13.5 10.17L15 11.67L21 9Z",
                            fill: "currentColor"
                          })
                        ]))
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode("div", { class: "password-strength" }, [
                      createVNode("div", { class: "strength-bar" }, [
                        createVNode("div", {
                          class: ["strength-fill", unref(passwordStrength)]
                        }, null, 2)
                      ]),
                      createVNode("span", { class: "strength-text" }, toDisplayString(unref(passwordStrengthText)), 1)
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="form-item-wrapper" data-v-a3a40646${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_form_item, {
              label: "确认新密码",
              prop: "ShowPassWord"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_input, {
                    modelValue: unref(form).ShowPassWord,
                    "onUpdate:modelValue": ($event) => unref(form).ShowPassWord = $event,
                    placeholder: "请再次输入新密码",
                    "show-password": "",
                    size: "large",
                    class: "password-input"
                  }, {
                    prefix: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-a3a40646${_scopeId3}><path d="M9 12L11 14L15 10M21 12C21 16.97 16.97 21 12 21C7.03 21 3 16.97 3 12C3 7.03 7.03 3 12 3C16.97 3 21 7.03 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-a3a40646${_scopeId3}></path></svg>`);
                      } else {
                        return [
                          (openBlock(), createBlock("svg", {
                            viewBox: "0 0 24 24",
                            fill: "none",
                            xmlns: "http://www.w3.org/2000/svg"
                          }, [
                            createVNode("path", {
                              d: "M9 12L11 14L15 10M21 12C21 16.97 16.97 21 12 21C7.03 21 3 16.97 3 12C3 7.03 7.03 3 12 3C16.97 3 21 7.03 21 12Z",
                              stroke: "currentColor",
                              "stroke-width": "2",
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round"
                            })
                          ]))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_input, {
                      modelValue: unref(form).ShowPassWord,
                      "onUpdate:modelValue": ($event) => unref(form).ShowPassWord = $event,
                      placeholder: "请再次输入新密码",
                      "show-password": "",
                      size: "large",
                      class: "password-input"
                    }, {
                      prefix: withCtx(() => [
                        (openBlock(), createBlock("svg", {
                          viewBox: "0 0 24 24",
                          fill: "none",
                          xmlns: "http://www.w3.org/2000/svg"
                        }, [
                          createVNode("path", {
                            d: "M9 12L11 14L15 10M21 12C21 16.97 16.97 21 12 21C7.03 21 3 16.97 3 12C3 7.03 7.03 3 12 3C16.97 3 21 7.03 21 12Z",
                            stroke: "currentColor",
                            "stroke-width": "2",
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round"
                          })
                        ]))
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="form-actions" data-v-a3a40646${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_button, {
              type: "primary",
              onClick: onSubmit,
              loading: unref(loading),
              size: "large",
              class: "submit-btn"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (!unref(loading)) {
                    _push3(`<span data-v-a3a40646${_scopeId2}>更新密码</span>`);
                  } else {
                    _push3(`<span data-v-a3a40646${_scopeId2}>更新中...</span>`);
                  }
                } else {
                  return [
                    !unref(loading) ? (openBlock(), createBlock("span", { key: 0 }, "更新密码")) : (openBlock(), createBlock("span", { key: 1 }, "更新中..."))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_button, {
              onClick: resetForm,
              size: "large",
              class: "reset-btn"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` 重置表单 `);
                } else {
                  return [
                    createTextVNode(" 重置表单 ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "form-item-wrapper" }, [
                createVNode(_component_el_form_item, {
                  label: "原密码",
                  prop: "yuanPassWord"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_input, {
                      modelValue: unref(form).yuanPassWord,
                      "onUpdate:modelValue": ($event) => unref(form).yuanPassWord = $event,
                      placeholder: "请输入当前密码",
                      "show-password": "",
                      size: "large",
                      class: "password-input"
                    }, {
                      prefix: withCtx(() => [
                        (openBlock(), createBlock("svg", {
                          viewBox: "0 0 24 24",
                          fill: "none",
                          xmlns: "http://www.w3.org/2000/svg"
                        }, [
                          createVNode("path", {
                            d: "M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM12 17c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM15.1 8H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z",
                            fill: "currentColor"
                          })
                        ]))
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  _: 1
                })
              ]),
              createVNode("div", { class: "form-item-wrapper" }, [
                createVNode(_component_el_form_item, {
                  label: "新密码",
                  prop: "NewPassWord"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_input, {
                      modelValue: unref(form).NewPassWord,
                      "onUpdate:modelValue": ($event) => unref(form).NewPassWord = $event,
                      placeholder: "请输入新密码（至少6位）",
                      "show-password": "",
                      size: "large",
                      class: "password-input"
                    }, {
                      prefix: withCtx(() => [
                        (openBlock(), createBlock("svg", {
                          viewBox: "0 0 24 24",
                          fill: "none",
                          xmlns: "http://www.w3.org/2000/svg"
                        }, [
                          createVNode("path", {
                            d: "M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1L13.5 2.5L16.17 5.17C15.24 5.06 14.32 5 13.38 5C10.38 5 7.68 6.64 6.09 9.22L7.66 10.79C8.78 8.61 10.79 7 13.38 7C14.32 7 15.24 7.17 16.17 7.5L13.5 10.17L15 11.67L21 9Z",
                            fill: "currentColor"
                          })
                        ]))
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode("div", { class: "password-strength" }, [
                      createVNode("div", { class: "strength-bar" }, [
                        createVNode("div", {
                          class: ["strength-fill", unref(passwordStrength)]
                        }, null, 2)
                      ]),
                      createVNode("span", { class: "strength-text" }, toDisplayString(unref(passwordStrengthText)), 1)
                    ])
                  ]),
                  _: 1
                })
              ]),
              createVNode("div", { class: "form-item-wrapper" }, [
                createVNode(_component_el_form_item, {
                  label: "确认新密码",
                  prop: "ShowPassWord"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_input, {
                      modelValue: unref(form).ShowPassWord,
                      "onUpdate:modelValue": ($event) => unref(form).ShowPassWord = $event,
                      placeholder: "请再次输入新密码",
                      "show-password": "",
                      size: "large",
                      class: "password-input"
                    }, {
                      prefix: withCtx(() => [
                        (openBlock(), createBlock("svg", {
                          viewBox: "0 0 24 24",
                          fill: "none",
                          xmlns: "http://www.w3.org/2000/svg"
                        }, [
                          createVNode("path", {
                            d: "M9 12L11 14L15 10M21 12C21 16.97 16.97 21 12 21C7.03 21 3 16.97 3 12C3 7.03 7.03 3 12 3C16.97 3 21 7.03 21 12Z",
                            stroke: "currentColor",
                            "stroke-width": "2",
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round"
                          })
                        ]))
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  _: 1
                })
              ]),
              createVNode("div", { class: "form-actions" }, [
                createVNode(_component_el_button, {
                  type: "primary",
                  onClick: onSubmit,
                  loading: unref(loading),
                  size: "large",
                  class: "submit-btn"
                }, {
                  default: withCtx(() => [
                    !unref(loading) ? (openBlock(), createBlock("span", { key: 0 }, "更新密码")) : (openBlock(), createBlock("span", { key: 1 }, "更新中..."))
                  ]),
                  _: 1
                }, 8, ["loading"]),
                createVNode(_component_el_button, {
                  onClick: resetForm,
                  size: "large",
                  class: "reset-btn"
                }, {
                  default: withCtx(() => [
                    createTextVNode(" 重置表单 ")
                  ]),
                  _: 1
                })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="security-tips" data-v-a3a40646><h3 data-v-a3a40646>密码安全建议</h3><ul data-v-a3a40646><li data-v-a3a40646>密码长度至少8位，建议包含大小写字母、数字和特殊字符</li><li data-v-a3a40646>不要使用过于简单的密码，如生日、手机号等</li><li data-v-a3a40646>定期更换密码，建议每3-6个月更换一次</li><li data-v-a3a40646>不要在多个平台使用相同密码</li></ul></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/UserInfo/changePw.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const changePw = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-a3a40646"]]);

export { changePw as default };
//# sourceMappingURL=changePw-DC9r0nYZ.mjs.map
