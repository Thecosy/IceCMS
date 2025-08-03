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
  __name: "post",
  __ssrInlineRender: true,
  setup(__props) {
    ref(true);
    const worksList = ref([
      {
        id: "WORK001",
        title: "数字艺术作品一",
        description: "这是我创作的第一件数字艺术作品，表现了虚拟与现实的结合。",
        coverImage: "https://via.placeholder.com/400x200.png?text=数字艺术作品一",
        creationDate: "2023-05-15",
        category: "数字艺术"
      },
      {
        id: "WORK002",
        title: "插画作品二",
        description: "这幅插画展示了未来城市的景象，充满科技感。",
        coverImage: "https://via.placeholder.com/400x200.png?text=插画作品二",
        creationDate: "2023-06-25",
        category: "插画"
      },
      {
        id: "WORK003",
        title: "摄影作品三",
        description: "黑白摄影，展现了城市在清晨的安静氛围。",
        coverImage: "https://via.placeholder.com/400x200.png?text=摄影作品三",
        creationDate: "2023-07-10",
        category: "摄影"
      },
      {
        id: "WORK004",
        title: "手工艺术作品四",
        description: "我用天然木材创作的艺术品，展示了自然的美感。",
        coverImage: "https://via.placeholder.com/400x200.png?text=手工艺术作品四",
        creationDate: "2023-08-20",
        category: "手工艺"
      },
      {
        id: "WORK005",
        title: "油画作品五",
        description: "油画作品，描绘了乡村的宁静与温暖。",
        coverImage: "https://via.placeholder.com/400x200.png?text=油画作品五",
        creationDate: "2023-09-05",
        category: "油画"
      },
      {
        id: "WORK006",
        title: "雕塑作品六",
        description: "现代雕塑，传递着力量与动感的艺术语言。",
        coverImage: "https://via.placeholder.com/400x200.png?text=雕塑作品六",
        creationDate: "2023-10-01",
        category: "雕塑"
      }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_row = ElRow;
      const _component_el_col = ElCol;
      const _component_el_card = ElCard;
      const _component_el_button = ElButton;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "works-view home" }, _attrs))} data-v-4b9e6e28><h2 data-v-4b9e6e28>我的作品</h2>`);
      _push(ssrRenderComponent(_component_el_row, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(worksList.value, (work) => {
              _push2(ssrRenderComponent(_component_el_col, {
                span: 8,
                key: work.id
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_card, {
                      class: "work-card",
                      shadow: "hover"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="work-info" data-v-4b9e6e28${_scopeId3}><img${ssrRenderAttr("src", work.coverImage)} alt="作品封面" class="work-cover" data-v-4b9e6e28${_scopeId3}><div class="work-details" data-v-4b9e6e28${_scopeId3}><p class="work-title" data-v-4b9e6e28${_scopeId3}>${ssrInterpolate(work.title)}</p><p class="work-description" data-v-4b9e6e28${_scopeId3}>${ssrInterpolate(work.description || "暂无描述")}</p></div></div>`);
                          _push4(ssrRenderComponent(_component_el_button, {
                            onClick: ($event) => _ctx.viewWorkDetails(work.id),
                            type: "primary",
                            size: "small",
                            class: "view-btn"
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`查看详情`);
                              } else {
                                return [
                                  createTextVNode("查看详情")
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode("div", { class: "work-info" }, [
                              createVNode("img", {
                                src: work.coverImage,
                                alt: "作品封面",
                                class: "work-cover"
                              }, null, 8, ["src"]),
                              createVNode("div", { class: "work-details" }, [
                                createVNode("p", { class: "work-title" }, toDisplayString(work.title), 1),
                                createVNode("p", { class: "work-description" }, toDisplayString(work.description || "暂无描述"), 1)
                              ])
                            ]),
                            createVNode(_component_el_button, {
                              onClick: ($event) => _ctx.viewWorkDetails(work.id),
                              type: "primary",
                              size: "small",
                              class: "view-btn"
                            }, {
                              default: withCtx(() => [
                                createTextVNode("查看详情")
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
                        class: "work-card",
                        shadow: "hover"
                      }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "work-info" }, [
                            createVNode("img", {
                              src: work.coverImage,
                              alt: "作品封面",
                              class: "work-cover"
                            }, null, 8, ["src"]),
                            createVNode("div", { class: "work-details" }, [
                              createVNode("p", { class: "work-title" }, toDisplayString(work.title), 1),
                              createVNode("p", { class: "work-description" }, toDisplayString(work.description || "暂无描述"), 1)
                            ])
                          ]),
                          createVNode(_component_el_button, {
                            onClick: ($event) => _ctx.viewWorkDetails(work.id),
                            type: "primary",
                            size: "small",
                            class: "view-btn"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("查看详情")
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
              (openBlock(true), createBlock(Fragment, null, renderList(worksList.value, (work) => {
                return openBlock(), createBlock(_component_el_col, {
                  span: 8,
                  key: work.id
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_card, {
                      class: "work-card",
                      shadow: "hover"
                    }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "work-info" }, [
                          createVNode("img", {
                            src: work.coverImage,
                            alt: "作品封面",
                            class: "work-cover"
                          }, null, 8, ["src"]),
                          createVNode("div", { class: "work-details" }, [
                            createVNode("p", { class: "work-title" }, toDisplayString(work.title), 1),
                            createVNode("p", { class: "work-description" }, toDisplayString(work.description || "暂无描述"), 1)
                          ])
                        ]),
                        createVNode(_component_el_button, {
                          onClick: ($event) => _ctx.viewWorkDetails(work.id),
                          type: "primary",
                          size: "small",
                          class: "view-btn"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("查看详情")
                          ]),
                          _: 2
                        }, 1032, ["onClick"])
                      ]),
                      _: 2
                    }, 1024)
                  ]),
                  _: 2
                }, 1024);
              }), 128))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/UserInfo/post.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const post = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-4b9e6e28"]]);

export { post as default };
//# sourceMappingURL=post-DBz9Y-4g.mjs.map
