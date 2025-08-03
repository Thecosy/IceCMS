import { defineComponent, computed, unref, createElementBlock, openBlock, withModifiers, normalizeClass, createBlock, createCommentVNode, createElementVNode, Transition, withCtx, withDirectives, createVNode, vShow, normalizeStyle, renderSlot, Fragment, renderList, toDisplayString, getCurrentInstance, useSlots, ref, watch, shallowRef, provide, isVNode, inject } from 'vue';
import { w as withInstall, n as withNoopInstall, _ as _export_sfc, b as buildProps, c as useLocale, a as ElIcon, v as arrow_left_default, x as arrow_right_default } from './el-button-LIU117i9.mjs';
import { e as useNamespace, f as isNumber } from './server.mjs';
import { throttle } from 'lodash-unified';
import { f as flattedChildren } from './el-overlay-D0BXiGeq.mjs';
import { isString } from '@vue/shared';

const carouselProps = buildProps({
  initialIndex: {
    type: Number,
    default: 0
  },
  height: {
    type: String,
    default: ""
  },
  trigger: {
    type: String,
    values: ["hover", "click"],
    default: "hover"
  },
  autoplay: {
    type: Boolean,
    default: true
  },
  interval: {
    type: Number,
    default: 3e3
  },
  indicatorPosition: {
    type: String,
    values: ["", "none", "outside"],
    default: ""
  },
  arrow: {
    type: String,
    values: ["always", "hover", "never"],
    default: "hover"
  },
  type: {
    type: String,
    values: ["", "card"],
    default: ""
  },
  cardScale: {
    type: Number,
    default: 0.83
  },
  loop: {
    type: Boolean,
    default: true
  },
  direction: {
    type: String,
    values: ["horizontal", "vertical"],
    default: "horizontal"
  },
  pauseOnHover: {
    type: Boolean,
    default: true
  },
  motionBlur: Boolean
});
const carouselEmits = {
  change: (current, prev) => [current, prev].every(isNumber)
};
const carouselContextKey = Symbol("carouselContextKey");
const CAROUSEL_ITEM_NAME = "ElCarouselItem";
const getOrderedChildren = (vm, childComponentName, children) => {
  const nodes = flattedChildren(vm.subTree).filter((n) => {
    var _a;
    return isVNode(n) && ((_a = n.type) == null ? void 0 : _a.name) === childComponentName && !!n.component;
  });
  const uids = nodes.map((n) => n.component.uid);
  return uids.map((uid) => children[uid]).filter((p) => !!p);
};
const useOrderedChildren = (vm, childComponentName) => {
  const children = {};
  const orderedChildren = shallowRef([]);
  const addChild = (child) => {
    children[child.uid] = child;
    orderedChildren.value = getOrderedChildren(vm, childComponentName, children);
  };
  const removeChild = (uid) => {
    delete children[uid];
    orderedChildren.value = orderedChildren.value.filter((children2) => children2.uid !== uid);
  };
  return {
    children: orderedChildren,
    addChild,
    removeChild
  };
};
const THROTTLE_TIME = 300;
const useCarousel = (props, emit, componentName) => {
  const {
    children: items,
    addChild: addItem,
    removeChild: removeItem
  } = useOrderedChildren(getCurrentInstance(), CAROUSEL_ITEM_NAME);
  const slots = useSlots();
  const activeIndex = ref(-1);
  const timer = ref(null);
  const hover = ref(false);
  const root = ref();
  const containerHeight = ref(0);
  const isItemsTwoLength = ref(true);
  const isFirstCall = ref(true);
  const isTransitioning = ref(false);
  const arrowDisplay = computed(() => props.arrow !== "never" && !unref(isVertical));
  const hasLabel = computed(() => {
    return items.value.some((item) => item.props.label.toString().length > 0);
  });
  const isCardType = computed(() => props.type === "card");
  const isVertical = computed(() => props.direction === "vertical");
  const containerStyle = computed(() => {
    if (props.height !== "auto") {
      return {
        height: props.height
      };
    }
    return {
      height: `${containerHeight.value}px`,
      overflow: "hidden"
    };
  });
  const throttledArrowClick = throttle((index) => {
    setActiveItem(index);
  }, THROTTLE_TIME, { trailing: true });
  const throttledIndicatorHover = throttle((index) => {
    handleIndicatorHover(index);
  }, THROTTLE_TIME);
  const isTwoLengthShow = (index) => {
    if (!isItemsTwoLength.value)
      return true;
    return activeIndex.value <= 1 ? index <= 1 : index > 1;
  };
  function pauseTimer() {
    if (timer.value) {
      clearInterval(timer.value);
      timer.value = null;
    }
  }
  function startTimer() {
    if (props.interval <= 0 || !props.autoplay || timer.value)
      return;
    timer.value = setInterval(() => playSlides(), props.interval);
  }
  const playSlides = () => {
    if (!isFirstCall.value) {
      isTransitioning.value = true;
    }
    isFirstCall.value = false;
    if (activeIndex.value < items.value.length - 1) {
      activeIndex.value = activeIndex.value + 1;
    } else if (props.loop) {
      activeIndex.value = 0;
    } else {
      isTransitioning.value = false;
    }
  };
  function setActiveItem(index) {
    if (!isFirstCall.value) {
      isTransitioning.value = true;
    }
    isFirstCall.value = false;
    if (isString(index)) {
      const filteredItems = items.value.filter((item) => item.props.name === index);
      if (filteredItems.length > 0) {
        index = items.value.indexOf(filteredItems[0]);
      }
    }
    index = Number(index);
    if (Number.isNaN(index) || index !== Math.floor(index)) {
      return;
    }
    const itemCount = items.value.length;
    const oldIndex = activeIndex.value;
    if (index < 0) {
      activeIndex.value = props.loop ? itemCount - 1 : 0;
    } else if (index >= itemCount) {
      activeIndex.value = props.loop ? 0 : itemCount - 1;
    } else {
      activeIndex.value = index;
    }
    if (oldIndex === activeIndex.value) {
      resetItemPosition(oldIndex);
    }
    resetTimer();
  }
  function resetItemPosition(oldIndex) {
    items.value.forEach((item, index) => {
      item.translateItem(index, activeIndex.value, oldIndex);
    });
  }
  function itemInStage(item, index) {
    var _a, _b, _c, _d;
    const _items = unref(items);
    const itemCount = _items.length;
    if (itemCount === 0 || !item.states.inStage)
      return false;
    const nextItemIndex = index + 1;
    const prevItemIndex = index - 1;
    const lastItemIndex = itemCount - 1;
    const isLastItemActive = _items[lastItemIndex].states.active;
    const isFirstItemActive = _items[0].states.active;
    const isNextItemActive = (_b = (_a = _items[nextItemIndex]) == null ? void 0 : _a.states) == null ? void 0 : _b.active;
    const isPrevItemActive = (_d = (_c = _items[prevItemIndex]) == null ? void 0 : _c.states) == null ? void 0 : _d.active;
    if (index === lastItemIndex && isFirstItemActive || isNextItemActive) {
      return "left";
    } else if (index === 0 && isLastItemActive || isPrevItemActive) {
      return "right";
    }
    return false;
  }
  function handleMouseEnter() {
    hover.value = true;
    if (props.pauseOnHover) {
      pauseTimer();
    }
  }
  function handleMouseLeave() {
    hover.value = false;
    startTimer();
  }
  function handleTransitionEnd() {
    isTransitioning.value = false;
  }
  function handleButtonEnter(arrow) {
    if (unref(isVertical))
      return;
    items.value.forEach((item, index) => {
      if (arrow === itemInStage(item, index)) {
        item.states.hover = true;
      }
    });
  }
  function handleButtonLeave() {
    if (unref(isVertical))
      return;
    items.value.forEach((item) => {
      item.states.hover = false;
    });
  }
  function handleIndicatorClick(index) {
    if (index !== activeIndex.value) {
      if (!isFirstCall.value) {
        isTransitioning.value = true;
      }
    }
    activeIndex.value = index;
  }
  function handleIndicatorHover(index) {
    if (props.trigger === "hover" && index !== activeIndex.value) {
      activeIndex.value = index;
      if (!isFirstCall.value) {
        isTransitioning.value = true;
      }
    }
  }
  function prev() {
    setActiveItem(activeIndex.value - 1);
  }
  function next() {
    setActiveItem(activeIndex.value + 1);
  }
  function resetTimer() {
    pauseTimer();
    if (!props.pauseOnHover)
      startTimer();
  }
  function setContainerHeight(height) {
    if (props.height !== "auto")
      return;
    containerHeight.value = height;
  }
  function PlaceholderItem() {
    var _a;
    const defaultSlots = (_a = slots.default) == null ? void 0 : _a.call(slots);
    if (!defaultSlots)
      return null;
    const flatSlots = flattedChildren(defaultSlots);
    const normalizeSlots = flatSlots.filter((slot) => {
      return isVNode(slot) && slot.type.name === CAROUSEL_ITEM_NAME;
    });
    if ((normalizeSlots == null ? void 0 : normalizeSlots.length) === 2 && props.loop && !isCardType.value) {
      isItemsTwoLength.value = true;
      return normalizeSlots;
    }
    isItemsTwoLength.value = false;
    return null;
  }
  watch(() => activeIndex.value, (current, prev2) => {
    resetItemPosition(prev2);
    if (isItemsTwoLength.value) {
      current = current % 2;
      prev2 = prev2 % 2;
    }
    if (prev2 > -1) {
      emit("change", current, prev2);
    }
  });
  watch(() => props.autoplay, (autoplay) => {
    autoplay ? startTimer() : pauseTimer();
  });
  watch(() => props.loop, () => {
    setActiveItem(activeIndex.value);
  });
  watch(() => props.interval, () => {
    resetTimer();
  });
  shallowRef();
  provide(carouselContextKey, {
    root,
    isCardType,
    isVertical,
    items,
    loop: props.loop,
    cardScale: props.cardScale,
    addItem,
    removeItem,
    setActiveItem,
    setContainerHeight
  });
  return {
    root,
    activeIndex,
    arrowDisplay,
    hasLabel,
    hover,
    isCardType,
    isTransitioning,
    items,
    isVertical,
    containerStyle,
    isItemsTwoLength,
    handleButtonEnter,
    handleTransitionEnd,
    handleButtonLeave,
    handleIndicatorClick,
    handleMouseEnter,
    handleMouseLeave,
    setActiveItem,
    prev,
    next,
    PlaceholderItem,
    isTwoLengthShow,
    throttledArrowClick,
    throttledIndicatorHover
  };
};
const COMPONENT_NAME = "ElCarousel";
const __default__$1 = defineComponent({
  name: COMPONENT_NAME
});
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  ...__default__$1,
  props: carouselProps,
  emits: carouselEmits,
  setup(__props, { expose, emit }) {
    const props = __props;
    const {
      root,
      activeIndex,
      arrowDisplay,
      hasLabel,
      hover,
      isCardType,
      items,
      isVertical,
      containerStyle,
      handleButtonEnter,
      handleButtonLeave,
      isTransitioning,
      handleIndicatorClick,
      handleMouseEnter,
      handleMouseLeave,
      handleTransitionEnd,
      setActiveItem,
      prev,
      next,
      PlaceholderItem,
      isTwoLengthShow,
      throttledArrowClick,
      throttledIndicatorHover
    } = useCarousel(props, emit);
    const ns = useNamespace("carousel");
    const { t } = useLocale();
    const carouselClasses = computed(() => {
      const classes = [ns.b(), ns.m(props.direction)];
      if (unref(isCardType)) {
        classes.push(ns.m("card"));
      }
      return classes;
    });
    const carouselContainer = computed(() => {
      const classes = [ns.e("container")];
      if (props.motionBlur && unref(isTransitioning) && items.value.length > 1) {
        classes.push(unref(isVertical) ? `${ns.namespace.value}-transitioning-vertical` : `${ns.namespace.value}-transitioning`);
      }
      return classes;
    });
    const indicatorsClasses = computed(() => {
      const classes = [ns.e("indicators"), ns.em("indicators", props.direction)];
      if (unref(hasLabel)) {
        classes.push(ns.em("indicators", "labels"));
      }
      if (props.indicatorPosition === "outside") {
        classes.push(ns.em("indicators", "outside"));
      }
      if (unref(isVertical)) {
        classes.push(ns.em("indicators", "right"));
      }
      return classes;
    });
    expose({
      activeIndex,
      setActiveItem,
      prev,
      next
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        ref_key: "root",
        ref: root,
        class: normalizeClass(unref(carouselClasses)),
        onMouseenter: withModifiers(unref(handleMouseEnter), ["stop"]),
        onMouseleave: withModifiers(unref(handleMouseLeave), ["stop"])
      }, [
        unref(arrowDisplay) ? (openBlock(), createBlock(Transition, {
          key: 0,
          name: "carousel-arrow-left",
          persisted: ""
        }, {
          default: withCtx(() => [
            withDirectives(createElementVNode("button", {
              type: "button",
              class: normalizeClass([unref(ns).e("arrow"), unref(ns).em("arrow", "left")]),
              "aria-label": unref(t)("el.carousel.leftArrow"),
              onMouseenter: ($event) => unref(handleButtonEnter)("left"),
              onMouseleave: unref(handleButtonLeave),
              onClick: withModifiers(($event) => unref(throttledArrowClick)(unref(activeIndex) - 1), ["stop"])
            }, [
              createVNode(unref(ElIcon), null, {
                default: withCtx(() => [
                  createVNode(unref(arrow_left_default))
                ]),
                _: 1
              })
            ], 42, ["aria-label", "onMouseenter", "onMouseleave", "onClick"]), [
              [
                vShow,
                (_ctx.arrow === "always" || unref(hover)) && (props.loop || unref(activeIndex) > 0)
              ]
            ])
          ]),
          _: 1
        })) : createCommentVNode("v-if", true),
        unref(arrowDisplay) ? (openBlock(), createBlock(Transition, {
          key: 1,
          name: "carousel-arrow-right",
          persisted: ""
        }, {
          default: withCtx(() => [
            withDirectives(createElementVNode("button", {
              type: "button",
              class: normalizeClass([unref(ns).e("arrow"), unref(ns).em("arrow", "right")]),
              "aria-label": unref(t)("el.carousel.rightArrow"),
              onMouseenter: ($event) => unref(handleButtonEnter)("right"),
              onMouseleave: unref(handleButtonLeave),
              onClick: withModifiers(($event) => unref(throttledArrowClick)(unref(activeIndex) + 1), ["stop"])
            }, [
              createVNode(unref(ElIcon), null, {
                default: withCtx(() => [
                  createVNode(unref(arrow_right_default))
                ]),
                _: 1
              })
            ], 42, ["aria-label", "onMouseenter", "onMouseleave", "onClick"]), [
              [
                vShow,
                (_ctx.arrow === "always" || unref(hover)) && (props.loop || unref(activeIndex) < unref(items).length - 1)
              ]
            ])
          ]),
          _: 1
        })) : createCommentVNode("v-if", true),
        createElementVNode("div", {
          class: normalizeClass(unref(carouselContainer)),
          style: normalizeStyle(unref(containerStyle)),
          onTransitionend: unref(handleTransitionEnd)
        }, [
          createVNode(unref(PlaceholderItem)),
          renderSlot(_ctx.$slots, "default")
        ], 46, ["onTransitionend"]),
        _ctx.indicatorPosition !== "none" ? (openBlock(), createElementBlock("ul", {
          key: 2,
          class: normalizeClass(unref(indicatorsClasses))
        }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(unref(items), (item, index) => {
            return withDirectives((openBlock(), createElementBlock("li", {
              key: index,
              class: normalizeClass([
                unref(ns).e("indicator"),
                unref(ns).em("indicator", _ctx.direction),
                unref(ns).is("active", index === unref(activeIndex))
              ]),
              onMouseenter: ($event) => unref(throttledIndicatorHover)(index),
              onClick: withModifiers(($event) => unref(handleIndicatorClick)(index), ["stop"])
            }, [
              createElementVNode("button", {
                class: normalizeClass(unref(ns).e("button")),
                "aria-label": unref(t)("el.carousel.indicator", { index: index + 1 })
              }, [
                unref(hasLabel) ? (openBlock(), createElementBlock("span", { key: 0 }, toDisplayString(item.props.label), 1)) : createCommentVNode("v-if", true)
              ], 10, ["aria-label"])
            ], 42, ["onMouseenter", "onClick"])), [
              [vShow, unref(isTwoLengthShow)(index)]
            ]);
          }), 128))
        ], 2)) : createCommentVNode("v-if", true),
        props.motionBlur ? (openBlock(), createElementBlock("svg", {
          key: 3,
          xmlns: "http://www.w3.org/2000/svg",
          version: "1.1",
          style: { "display": "none" }
        }, [
          createElementVNode("defs", null, [
            createElementVNode("filter", { id: "elCarouselHorizontal" }, [
              createElementVNode("feGaussianBlur", {
                in: "SourceGraphic",
                stdDeviation: "12,0"
              })
            ]),
            createElementVNode("filter", { id: "elCarouselVertical" }, [
              createElementVNode("feGaussianBlur", {
                in: "SourceGraphic",
                stdDeviation: "0,10"
              })
            ])
          ])
        ])) : createCommentVNode("v-if", true)
      ], 42, ["onMouseenter", "onMouseleave"]);
    };
  }
});
var Carousel = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__file", "carousel.vue"]]);
const carouselItemProps = buildProps({
  name: { type: String, default: "" },
  label: {
    type: [String, Number],
    default: ""
  }
});
const useCarouselItem = (props) => {
  const carouselContext = inject(carouselContextKey);
  const instance = getCurrentInstance();
  const carouselItemRef = ref();
  const hover = ref(false);
  const translate = ref(0);
  const scale = ref(1);
  const active = ref(false);
  const ready = ref(false);
  const inStage = ref(false);
  const animating = ref(false);
  const { isCardType, isVertical, cardScale } = carouselContext;
  function handleItemClick() {
    if (carouselContext && unref(isCardType)) {
      const index = carouselContext.items.value.findIndex(({ uid }) => uid === instance.uid);
      carouselContext.setActiveItem(index);
    }
  }
  return {
    carouselItemRef,
    active,
    animating,
    hover,
    inStage,
    isVertical,
    translate,
    isCardType,
    scale,
    ready,
    handleItemClick
  };
};
const __default__ = defineComponent({
  name: CAROUSEL_ITEM_NAME
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...__default__,
  props: carouselItemProps,
  setup(__props) {
    const ns = useNamespace("carousel");
    const {
      carouselItemRef,
      active,
      animating,
      hover,
      inStage,
      isVertical,
      translate,
      isCardType,
      scale,
      ready,
      handleItemClick
    } = useCarouselItem();
    const itemKls = computed(() => [
      ns.e("item"),
      ns.is("active", active.value),
      ns.is("in-stage", inStage.value),
      ns.is("hover", hover.value),
      ns.is("animating", animating.value),
      {
        [ns.em("item", "card")]: isCardType.value,
        [ns.em("item", "card-vertical")]: isCardType.value && isVertical.value
      }
    ]);
    const itemStyle = computed(() => {
      const translateType = `translate${unref(isVertical) ? "Y" : "X"}`;
      const _translate = `${translateType}(${unref(translate)}px)`;
      const _scale = `scale(${unref(scale)})`;
      const transform = [_translate, _scale].join(" ");
      return {
        transform
      };
    });
    return (_ctx, _cache) => {
      return withDirectives((openBlock(), createElementBlock("div", {
        ref_key: "carouselItemRef",
        ref: carouselItemRef,
        class: normalizeClass(unref(itemKls)),
        style: normalizeStyle(unref(itemStyle)),
        onClick: unref(handleItemClick)
      }, [
        unref(isCardType) ? withDirectives((openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(unref(ns).e("mask"))
        }, null, 2)), [
          [vShow, !unref(active)]
        ]) : createCommentVNode("v-if", true),
        renderSlot(_ctx.$slots, "default")
      ], 14, ["onClick"])), [
        [vShow, unref(ready)]
      ]);
    };
  }
});
var CarouselItem = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "carousel-item.vue"]]);
const ElCarousel = withInstall(Carousel, {
  CarouselItem
});
const ElCarouselItem = withNoopInstall(CarouselItem);
const _imports_5 = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20width='25.19'%20height='15.813'%20viewBox='0%200%2025.19%2015.813'%3e%3cmetadata%3e%3c?xpacket%20begin='%20'%20id='W5M0MpCehiHzreSzNTczkc9d'?%3e%3cx:xmpmeta%20xmlns:x='adobe:ns:meta/'%20x:xmptk='Adobe%20XMP%20Core%205.6-c142%2079.160924,%202017/07/13-01:06:39'%3e%3crdf:RDF%20xmlns:rdf='http://www.w3.org/1999/02/22-rdf-syntax-ns%23'%3e%3crdf:Description/%3e%3c/rdf:RDF%3e%3c/x:xmpmeta%3e%3c?xpacket%20end='w'?%3e%3c/metadata%3e%3cdefs%3e%3cstyle%3e.cls-1{fill:none;stroke-width:2px;fill-rule:evenodd;opacity:.66;stroke:url(%23linear-gradient)}%3c/style%3e%3clinearGradient%20id='linear-gradient'%20x1='1301.88'%20x2='1322.88'%20y1='240.113'%20y2='251.075'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20offset='NaN'%20stop-color='%23b8ffe6'/%3e%3cstop%20offset='Infinity'%20stop-color='%2300cb9f'/%3e%3c/linearGradient%3e%3c/defs%3e%3cpath%20id='Path_5'%20d='M1322.88,252.182L1312.51,239l-10.62,12.816Z'%20class='cls-1'%20data-name='Path%205'%20transform='translate(-1299.78%20-237.406)'/%3e%3c/svg%3e";
const _imports_6 = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20width='36'%20height='23'%20version='1.1'%20viewBox='0%200%2036%2023'%3e%3ctitle%3eRectangle%203%3c/title%3e%3cdesc%3eCreated%20with%20Sketch.%3c/desc%3e%3cdefs%3e%3clinearGradient%20id='linearGradient-1'%20x1='0%25'%20x2='100%25'%20y1='50%25'%20y2='50%25'%3e%3cstop%20offset='0%25'%20stop-color='%23FFCC9A'/%3e%3cstop%20offset='100%25'%20stop-color='%23FF7378'/%3e%3c/linearGradient%3e%3c/defs%3e%3cg%20id='Main-Files'%20fill='none'%20fill-rule='evenodd'%20stroke='none'%20stroke-width='1'%20opacity='.35'%3e%3cg%20id='01_index-Agency'%20fill='url(%23linearGradient-1)'%20transform='translate(-140.000000,%20-250.000000)'%3e%3cg%20id='Banner'%20transform='translate(127.000000,%2035.000000)'%3e%3cg%20id='Shape'%20transform='translate(0.000000,%20203.000000)'%3e%3cpath%20id='Rectangle-3'%20d='M12.5,22%20L49.5,22%20C50.3284271,22%2051,22.6715729%2051,23.5%20L51,23.5%20C51,24.3284271%2050.3284271,25%2049.5,25%20L12.5,25%20C11.6715729,25%2011,24.3284271%2011,23.5%20L11,23.5%20C11,22.6715729%2011.6715729,22%2012.5,22%20Z'%20transform='translate(31.000000,%2023.500000)%20rotate(-30.000000)%20translate(-31.000000,%20-23.500000)'/%3e%3c/g%3e%3c/g%3e%3c/g%3e%3c/g%3e%3c/svg%3e";
const _imports_7 = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20width='62'%20height='37'%20version='1.1'%20viewBox='0%200%2062%2037'%3e%3ctitle%3eRectangle%203%3c/title%3e%3cdesc%3eCreated%20with%20Sketch.%3c/desc%3e%3cdefs%3e%3clinearGradient%20id='linearGradient-1'%20x1='0%25'%20x2='100%25'%20y1='50%25'%20y2='50%25'%3e%3cstop%20offset='0%25'%20stop-color='%23FFE694'/%3e%3cstop%20offset='100%25'%20stop-color='%23FF8700'/%3e%3c/linearGradient%3e%3c/defs%3e%3cg%20id='Main-Files'%20fill='none'%20fill-rule='evenodd'%20stroke='none'%20stroke-width='1'%20opacity='.287'%3e%3cg%20id='01_index-Agency'%20fill='url(%23linearGradient-1)'%20transform='translate(-842.000000,%20-494.000000)'%3e%3cg%20id='Banner'%20transform='translate(127.000000,%2035.000000)'%3e%3cg%20id='Shape'%20transform='translate(0.000000,%20203.000000)'%3e%3crect%20id='Rectangle-3'%20width='70'%20height='3'%20x='711'%20y='273'%20rx='1.5'%20transform='translate(746.000000,%20274.500000)%20rotate(-30.000000)%20translate(-746.000000,%20-274.500000)'/%3e%3c/g%3e%3c/g%3e%3c/g%3e%3c/g%3e%3c/svg%3e";
const _imports_8 = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20width='28'%20height='17'%20version='1.1'%20viewBox='0%200%2028%2017'%3e%3ctitle%3eRectangle%203%3c/title%3e%3cdesc%3eCreated%20with%20Sketch.%3c/desc%3e%3cdefs%3e%3clinearGradient%20id='linearGradient-1'%20x1='0%25'%20x2='100%25'%20y1='50%25'%20y2='50%25'%3e%3cstop%20offset='0%25'%20stop-color='%23FFD7EE'/%3e%3cstop%20offset='100%25'%20stop-color='%23FF009E'/%3e%3c/linearGradient%3e%3c/defs%3e%3cg%20id='Main-Files'%20fill='none'%20fill-rule='evenodd'%20stroke='none'%20stroke-width='1'%20opacity='.591'%3e%3cg%20id='01_index-Agency'%20fill='url(%23linearGradient-1)'%20transform='translate(-1608.000000,%20-647.000000)'%3e%3cg%20id='Banner'%20transform='translate(127.000000,%2035.000000)'%3e%3cg%20id='Shape'%20transform='translate(0.000000,%20203.000000)'%3e%3crect%20id='Rectangle-3'%20width='30'%20height='3'%20x='1480'%20y='416'%20rx='1.5'%20transform='translate(1495.000000,%20417.500000)%20rotate(-30.000000)%20translate(-1495.000000,%20-417.500000)'/%3e%3c/g%3e%3c/g%3e%3c/g%3e%3c/g%3e%3c/svg%3e";
const _imports_9 = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20width='12'%20height='12'%20viewBox='0%200%2012%2012'%3e%3cdefs%3e%3cstyle%3e.cls-1{fill:none;stroke-width:2px;opacity:.5;stroke:url(%23linear-gradient)}%3c/style%3e%3clinearGradient%20id='linear-gradient'%20x1='6'%20x2='6'%20y1='1'%20y2='11'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20offset='NaN'%20stop-color='%23ffd746'/%3e%3cstop%20offset='Infinity'%20stop-color='%23f6ac9a'/%3e%3c/linearGradient%3e%3c/defs%3e%3ccircle%20id='Oval'%20cx='6'%20cy='6'%20r='5'%20class='cls-1'/%3e%3c/svg%3e";
const _imports_10 = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20width='36'%20height='23'%20version='1.1'%20viewBox='0%200%2036%2023'%3e%3ctitle%3eRectangle%203%3c/title%3e%3cdesc%3eCreated%20with%20Sketch.%3c/desc%3e%3cdefs%3e%3clinearGradient%20id='linearGradient-1'%20x1='0%25'%20x2='100%25'%20y1='50%25'%20y2='50%25'%3e%3cstop%20offset='0%25'%20stop-color='%23BDEBFF'/%3e%3cstop%20offset='100%25'%20stop-color='%230098FF'/%3e%3c/linearGradient%3e%3c/defs%3e%3cg%20id='Main-Files'%20fill='none'%20fill-rule='evenodd'%20stroke='none'%20stroke-width='1'%20opacity='.237'%3e%3cg%20id='01_index-Agency'%20fill='url(%23linearGradient-1)'%20transform='translate(-625.000000,%20-862.000000)'%3e%3cg%20id='Banner'%20transform='translate(127.000000,%2035.000000)'%3e%3cg%20id='Shape'%20transform='translate(0.000000,%20203.000000)'%3e%3crect%20id='Rectangle-3'%20width='40'%20height='3'%20x='496'%20y='634'%20rx='1.5'%20transform='translate(516.000000,%20635.500000)%20rotate(-30.000000)%20translate(-516.000000,%20-635.500000)'/%3e%3c/g%3e%3c/g%3e%3c/g%3e%3c/g%3e%3c/svg%3e";
const _imports_11 = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20width='12'%20height='12'%20viewBox='0%200%2012%2012'%3e%3cdefs%3e%3cstyle%3e.cls-1{fill:none;stroke-width:2px;opacity:.65;stroke:url(%23linear-gradient)}%3c/style%3e%3clinearGradient%20id='linear-gradient'%20x1='6'%20x2='6'%20y1='1'%20y2='11'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20offset='NaN'%20stop-color='%2337ff41'/%3e%3cstop%20offset='Infinity'%20stop-color='%2376efff'/%3e%3c/linearGradient%3e%3c/defs%3e%3ccircle%20id='Oval'%20cx='6'%20cy='6'%20r='5'%20class='cls-1'/%3e%3c/svg%3e";
const _imports_12 = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20width='21'%20height='20'%20version='1.1'%20viewBox='0%200%2021%2020'%3e%3ctitle%3ePath%205%3c/title%3e%3cdesc%3eCreated%20with%20Sketch.%3c/desc%3e%3cdefs%3e%3clinearGradient%20id='linearGradient-1'%20x1='50%25'%20x2='50%25'%20y1='100%25'%20y2='-49.891%25'%3e%3cstop%20offset='0%25'%20stop-color='%2300E92B'/%3e%3cstop%20offset='100%25'%20stop-color='%23CCFFA8'/%3e%3c/linearGradient%3e%3c/defs%3e%3cg%20id='Main-Files'%20fill='none'%20fill-rule='evenodd'%20stroke='none'%20stroke-width='1'%20opacity='.659'%3e%3cg%20id='01_index-Agency'%20stroke='url(%23linearGradient-1)'%20stroke-width='2'%20transform='translate(-133.000000,%20-562.000000)'%3e%3cg%20id='Banner'%20transform='translate(127.000000,%2035.000000)'%3e%3cg%20id='Shape'%20transform='translate(0.000000,%20203.000000)'%3e%3cpolygon%20id='Path-5'%20points='2%20323%2012.598%20336%2023%20323'%20transform='translate(12.500000,%20329.500000)%20rotate(-228.000000)%20translate(-12.500000,%20-329.500000)'/%3e%3c/g%3e%3c/g%3e%3c/g%3e%3c/g%3e%3c/svg%3e";
const _imports_13 = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20width='10'%20height='10'%20version='1.1'%20viewBox='0%200%2010%2010'%3e%3ctitle%3eOval%3c/title%3e%3cdesc%3eCreated%20with%20Sketch.%3c/desc%3e%3cdefs%3e%3clinearGradient%20id='linearGradient-1'%20x1='50%25'%20x2='50%25'%20y1='0%25'%20y2='100%25'%3e%3cstop%20offset='0%25'%20stop-color='%2338BEFF'/%3e%3cstop%20offset='100%25'%20stop-color='%23A5F0FF'/%3e%3c/linearGradient%3e%3c/defs%3e%3cg%20id='Main-Files'%20fill='none'%20fill-rule='evenodd'%20stroke='none'%20stroke-width='1'%3e%3cg%20id='01_index-Agency'%20stroke='url(%23linearGradient-1)'%20stroke-width='2'%20transform='translate(-739.000000,%20-241.000000)'%3e%3cg%20id='Banner'%20transform='translate(127.000000,%2035.000000)'%3e%3cg%20id='Shape'%20transform='translate(0.000000,%20203.000000)'%3e%3ccircle%20id='Oval'%20cx='617'%20cy='8'%20r='4'/%3e%3c/g%3e%3c/g%3e%3c/g%3e%3c/g%3e%3c/svg%3e";
const _imports_14 = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20width='170'%20height='207'%3e%3cdefs%3e%3clinearGradient%20id='PSgrad_0'%20x1='74.314%25'%20x2='0%25'%20y1='0%25'%20y2='66.913%25'%3e%3cstop%20offset='0%25'%20stop-color='%23FFEBDD'%20stop-opacity='1'/%3e%3cstop%20offset='100%25'%20stop-color='%23FFFBF4'%20stop-opacity='1'/%3e%3c/linearGradient%3e%3c/defs%3e%3cpath%20fill='url(%23PSgrad_0)'%20fill-rule='evenodd'%20d='M50.456,197.333%20L1.307,13.906%20C-1.556,3.223%204.472,-2.196%2014.792,1.782%20L159.570,57.603%20C169.890,61.581%20172.616,71.753%20165.668,80.359%20L68.196,201.090%20C61.248,209.695%2053.318,208.015%2050.456,197.333%20Z'/%3e%3c/svg%3e";
const _imports_15 = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20width='193'%20height='235'%3e%3cdefs%3e%3clinearGradient%20id='PSgrad_0'%20x1='69.857%25'%20x2='0%25'%20y1='0%25'%20y2='71.555%25'%3e%3cstop%20offset='0%25'%20stop-color='%2395F469'%20stop-opacity='1'/%3e%3cstop%20offset='100%25'%20stop-color='%2315D06E'%20stop-opacity='1'/%3e%3c/linearGradient%3e%3c/defs%3e%3cpath%20fill='url(%23PSgrad_0)'%20fill-rule='evenodd'%20d='M135.461,9.654%20L192.193,221.380%20C195.055,232.063%20189.027,237.482%20178.708,233.504%20L10.722,168.736%20C0.402,164.758%20-2.323,154.585%204.624,145.980%20L117.721,5.897%20C124.668,-2.708%20132.598,-1.029%20135.461,9.654%20Z'%20opacity='.106'/%3e%3c/svg%3e";

export { ElCarousel as E, _imports_5 as _, ElCarouselItem as a, _imports_6 as b, _imports_7 as c, _imports_8 as d, _imports_9 as e, _imports_10 as f, _imports_11 as g, _imports_12 as h, _imports_13 as i, _imports_14 as j, _imports_15 as k };
//# sourceMappingURL=shape-11-BIJngsJr.mjs.map
