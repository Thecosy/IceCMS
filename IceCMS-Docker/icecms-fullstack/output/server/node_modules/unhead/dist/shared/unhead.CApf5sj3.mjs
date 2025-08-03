import { u as unpackMeta } from './unhead.DQc16pHI.mjs';

function defineHeadPlugin(plugin) {
  return plugin;
}

const FlatMetaPlugin = /* @__PURE__ */ defineHeadPlugin({
  key: "flatMeta",
  hooks: {
    "entries:normalize": (ctx) => {
      const tagsToAdd = [];
      ctx.tags = ctx.tags.map((t) => {
        if (t.tag !== "_flatMeta") {
          return t;
        }
        tagsToAdd.push(unpackMeta(t.props).map((p) => ({
          ...t,
          tag: "meta",
          props: p
        })));
        return false;
      }).filter(Boolean).concat(...tagsToAdd);
    }
  }
});

const WhitelistAttributes = {
  htmlAttrs: /* @__PURE__ */ new Set(["class", "style", "lang", "dir"]),
  bodyAttrs: /* @__PURE__ */ new Set(["class", "style"]),
  meta: /* @__PURE__ */ new Set(["name", "property", "charset", "content", "media"]),
  noscript: /* @__PURE__ */ new Set(["textContent"]),
  style: /* @__PURE__ */ new Set(["media", "textContent", "nonce", "title", "blocking"]),
  script: /* @__PURE__ */ new Set(["type", "textContent", "nonce", "blocking"]),
  link: /* @__PURE__ */ new Set(["color", "crossorigin", "fetchpriority", "href", "hreflang", "imagesrcset", "imagesizes", "integrity", "media", "referrerpolicy", "rel", "sizes", "type"])
};
function acceptDataAttrs(value) {
  return Object.fromEntries(
    Object.entries(value || {}).filter(([key]) => key === "id" || key.startsWith("data-"))
  );
}
function makeTagSafe(tag) {
  let next = {};
  const { tag: type, props: prev } = tag;
  switch (type) {
    // always safe
    case "title":
    case "titleTemplate":
    case "templateParams":
      next = prev;
      break;
    case "htmlAttrs":
    case "bodyAttrs":
      WhitelistAttributes[type].forEach((attr) => {
        if (prev[attr]) {
          next[attr] = prev[attr];
        }
      });
      break;
    case "style":
      next = acceptDataAttrs(prev);
      WhitelistAttributes.style.forEach((key) => {
        if (prev[key]) {
          next[key] = prev[key];
        }
      });
      break;
    // meta is safe, except for http-equiv
    case "meta":
      WhitelistAttributes.meta.forEach((key) => {
        if (prev[key]) {
          next[key] = prev[key];
        }
      });
      break;
    // link tags we don't allow stylesheets, scripts, preloading, prerendering, prefetching, etc
    case "link":
      WhitelistAttributes.link.forEach((key) => {
        const val = prev[key];
        if (!val) {
          return;
        }
        if (key === "rel" && (val === "canonical" || val === "modulepreload" || val === "prerender" || val === "preload" || val === "prefetch")) {
          return;
        }
        if (key === "href") {
          if (val.includes("javascript:") || val.includes("data:")) {
            return;
          }
          next[key] = val;
        } else if (val) {
          next[key] = val;
        }
      });
      if (!next.href && !next.imagesrcset || !next.rel) {
        return false;
      }
      break;
    case "noscript":
      WhitelistAttributes.noscript.forEach((key) => {
        if (prev[key]) {
          next[key] = prev[key];
        }
      });
      break;
    // we only allow JSON in scripts
    case "script":
      if (!tag.textContent || !prev.type?.endsWith("json")) {
        return false;
      }
      WhitelistAttributes.script.forEach((s) => {
        if (prev[s] === "textContent") {
          try {
            const jsonVal = typeof prev[s] === "string" ? JSON.parse(prev[s]) : prev[s];
            next[s] = JSON.stringify(jsonVal, null, 0);
          } catch {
          }
        } else if (prev[s]) {
          next[s] = prev[s];
        }
      });
      break;
  }
  if (!Object.keys(next).length && !tag.tag.endsWith("Attrs")) {
    return false;
  }
  tag.props = { ...acceptDataAttrs(prev), ...next };
  return tag;
}
const SafeInputPlugin = (
  /* @PURE */
  defineHeadPlugin({
    key: "safe",
    hooks: {
      "entries:normalize": (ctx) => {
        if (ctx.entry.options?._safe) {
          ctx.tags = ctx.tags.reduce((acc, tag) => {
            const safeTag = makeTagSafe(tag);
            if (safeTag)
              acc.push(safeTag);
            return acc;
          }, []);
        }
      }
    }
  })
);

export { FlatMetaPlugin as F, SafeInputPlugin as S, defineHeadPlugin as d };
