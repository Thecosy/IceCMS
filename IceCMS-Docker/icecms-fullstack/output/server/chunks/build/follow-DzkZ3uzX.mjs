import { E as ElRow, a as ElCol } from './el-col-P7eqMh2W.mjs';
import { E as ElCard } from './el-card-ReDS_y_B.mjs';
import { E as ElButton } from './el-button-LIU117i9.mjs';
import { defineComponent, ref, mergeProps, withCtx, createTextVNode, createVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';
import '@vue/shared';
import 'lodash-unified';
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
  __name: "follow",
  __ssrInlineRender: true,
  setup(__props) {
    ref(true);
    const followList = [
      {
        userid: "user001",
        name: "张三",
        profile: "https://randomuser.me/api/portraits/men/1.jpg",
        // 头像
        intro: "爱好编程，喜欢探索新技术"
      },
      {
        userid: "user002",
        name: "李四",
        profile: "https://randomuser.me/api/portraits/men/2.jpg",
        intro: "前端开发工程师，热爱开源"
      },
      {
        userid: "user003",
        name: "王五",
        profile: "https://randomuser.me/api/portraits/men/3.jpg",
        intro: "全栈开发者，喜欢分享技术文章"
      },
      {
        userid: "user004",
        name: "赵六",
        profile: "https://randomuser.me/api/portraits/men/4.jpg",
        intro: "后端开发，Java和Python的忠实粉丝"
      },
      {
        userid: "user005",
        name: "孙七",
        profile: "https://randomuser.me/api/portraits/men/5.jpg",
        intro: "移动开发，Android开发者，爱旅游"
      }
    ];
    async function handleUnfollow(followUserId) {
      try {
        const result = await axios.post("/api/user/unfollow", {
          userId: userStore.userid,
          followUserId
        });
        if (result.data.code === 200) {
          followList.value = followList.value.filter((f) => f.userid !== followUserId);
          this.$notify({
            title: "成功",
            message: "取消关注成功",
            type: "success",
            offset: 50
          });
        } else {
          this.$notify({
            title: "失败",
            message: "取消关注失败",
            type: "error",
            offset: 50
          });
        }
      } catch (error) {
        console.error("取消关注失败:", error);
        this.$notify({
          title: "错误",
          message: "取消关注时发生错误",
          type: "error",
          offset: 50
        });
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_row = ElRow;
      const _component_el_col = ElCol;
      const _component_el_card = ElCard;
      const _component_el_button = ElButton;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "follow-list home" }, _attrs))} data-v-351136b5><h2 data-v-351136b5>我的关注</h2>`);
      _push(ssrRenderComponent(_component_el_row, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(followList, (follow2) => {
              _push2(ssrRenderComponent(_component_el_col, {
                span: 8,
                key: follow2.userid
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_card, {
                      class: "user-card",
                      shadow: "hover"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="user-info" data-v-351136b5${_scopeId3}><img${ssrRenderAttr("src", follow2.profile)} alt="头像" class="avatar" data-v-351136b5${_scopeId3}><div class="user-details" data-v-351136b5${_scopeId3}><p class="username" data-v-351136b5${_scopeId3}>${ssrInterpolate(follow2.name)}</p><p class="intro" data-v-351136b5${_scopeId3}>${ssrInterpolate(follow2.intro || "暂无简介")}</p>`);
                          _push4(ssrRenderComponent(_component_el_button, {
                            onClick: ($event) => _ctx.goToProfile(follow2.userid),
                            type: "text",
                            size: "small"
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`查看个人主页`);
                              } else {
                                return [
                                  createTextVNode("查看个人主页")
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(`</div></div>`);
                          _push4(ssrRenderComponent(_component_el_button, {
                            onClick: ($event) => handleUnfollow(follow2.userid),
                            type: "danger",
                            size: "small",
                            class: "unfollow-btn"
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`取消关注`);
                              } else {
                                return [
                                  createTextVNode("取消关注")
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode("div", { class: "user-info" }, [
                              createVNode("img", {
                                src: follow2.profile,
                                alt: "头像",
                                class: "avatar"
                              }, null, 8, ["src"]),
                              createVNode("div", { class: "user-details" }, [
                                createVNode("p", { class: "username" }, toDisplayString(follow2.name), 1),
                                createVNode("p", { class: "intro" }, toDisplayString(follow2.intro || "暂无简介"), 1),
                                createVNode(_component_el_button, {
                                  onClick: ($event) => _ctx.goToProfile(follow2.userid),
                                  type: "text",
                                  size: "small"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("查看个人主页")
                                  ]),
                                  _: 2
                                }, 1032, ["onClick"])
                              ])
                            ]),
                            createVNode(_component_el_button, {
                              onClick: ($event) => handleUnfollow(follow2.userid),
                              type: "danger",
                              size: "small",
                              class: "unfollow-btn"
                            }, {
                              default: withCtx(() => [
                                createTextVNode("取消关注")
                              ]),
                              _: 2
                            }, 1032, ["onClick"])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_el_card, {
                        class: "user-card",
                        shadow: "hover"
                      }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "user-info" }, [
                            createVNode("img", {
                              src: follow2.profile,
                              alt: "头像",
                              class: "avatar"
                            }, null, 8, ["src"]),
                            createVNode("div", { class: "user-details" }, [
                              createVNode("p", { class: "username" }, toDisplayString(follow2.name), 1),
                              createVNode("p", { class: "intro" }, toDisplayString(follow2.intro || "暂无简介"), 1),
                              createVNode(_component_el_button, {
                                onClick: ($event) => _ctx.goToProfile(follow2.userid),
                                type: "text",
                                size: "small"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("查看个人主页")
                                ]),
                                _: 2
                              }, 1032, ["onClick"])
                            ])
                          ]),
                          createVNode(_component_el_button, {
                            onClick: ($event) => handleUnfollow(follow2.userid),
                            type: "danger",
                            size: "small",
                            class: "unfollow-btn"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("取消关注")
                            ]),
                            _: 2
                          }, 1032, ["onClick"])
                        ]),
                        _: 2
                      }, 1024)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(), createBlock(Fragment, null, renderList(followList, (follow2) => {
                return createVNode(_component_el_col, {
                  span: 8,
                  key: follow2.userid
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_card, {
                      class: "user-card",
                      shadow: "hover"
                    }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "user-info" }, [
                          createVNode("img", {
                            src: follow2.profile,
                            alt: "头像",
                            class: "avatar"
                          }, null, 8, ["src"]),
                          createVNode("div", { class: "user-details" }, [
                            createVNode("p", { class: "username" }, toDisplayString(follow2.name), 1),
                            createVNode("p", { class: "intro" }, toDisplayString(follow2.intro || "暂无简介"), 1),
                            createVNode(_component_el_button, {
                              onClick: ($event) => _ctx.goToProfile(follow2.userid),
                              type: "text",
                              size: "small"
                            }, {
                              default: withCtx(() => [
                                createTextVNode("查看个人主页")
                              ]),
                              _: 2
                            }, 1032, ["onClick"])
                          ])
                        ]),
                        createVNode(_component_el_button, {
                          onClick: ($event) => handleUnfollow(follow2.userid),
                          type: "danger",
                          size: "small",
                          class: "unfollow-btn"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("取消关注")
                          ]),
                          _: 2
                        }, 1032, ["onClick"])
                      ]),
                      _: 2
                    }, 1024)
                  ]),
                  _: 2
                }, 1024);
              }), 64))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/UserInfo/follow.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const follow = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-351136b5"]]);

export { follow as default };
//# sourceMappingURL=follow-DzkZ3uzX.mjs.map
