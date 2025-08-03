import { a as createUnhead } from './shared/unhead.CAk5S5m6.mjs';
import { T as TagsWithInnerContent, S as SelfClosingTags$1 } from './shared/unhead.yem5I2v_.mjs';
import 'hookable';
import './shared/unhead.Di5OD67x.mjs';
import './shared/unhead.DZbvapt-.mjs';

// @__NO_SIDE_EFFECTS__
function createHead(options = {}) {
  const unhead = createUnhead({
    ...options,
    // @ts-expect-error untyped
    document: false,
    propResolvers: [
      ...options.propResolvers || [],
      (k, v) => {
        if (k && k.startsWith("on") && typeof v === "function") {
          return `this.dataset.${k}fired = true`;
        }
        return v;
      }
    ],
    init: [
      options.disableDefaults ? void 0 : {
        htmlAttrs: {
          lang: "en"
        },
        meta: [
          {
            charset: "utf-8"
          },
          {
            name: "viewport",
            content: "width=device-width, initial-scale=1"
          }
        ]
      },
      ...options.init || []
    ]
  });
  unhead._ssrPayload = {};
  unhead.use({
    key: "server",
    hooks: {
      "tags:resolve": function(ctx) {
        const title = ctx.tagMap.get("title");
        const titleTemplate = ctx.tagMap.get("titleTemplate");
        let payload = {
          title: title?.mode === "server" ? unhead._title : void 0,
          titleTemplate: titleTemplate?.mode === "server" ? unhead._titleTemplate : void 0
        };
        if (Object.keys(unhead._ssrPayload || {}).length > 0) {
          payload = {
            ...unhead._ssrPayload,
            ...payload
          };
        }
        if (Object.values(payload).some(Boolean)) {
          ctx.tags.push({
            tag: "script",
            innerHTML: JSON.stringify(payload),
            props: { id: "unhead:payload", type: "application/json" }
          });
        }
      }
    }
  });
  return unhead;
}

const Attrs = /(\w+)(?:=["']([^"']*)["'])?/g;
const HtmlTag = /<html[^>]*>/;
const BodyTag = /<body[^>]*>/;
const HeadContent = /<head[^>]*>(.*?)<\/head>/s;
const SelfClosingTags = /<(meta|link|base)[^>]*>/g;
const ClosingTags = /<(title|script|style)[^>]*>[\s\S]*?<\/\1>/g;
const NewLines = /(\n\s*)+/g;
function extractAttributes(tag) {
  const inner = tag.match(/<([^>]*)>/)?.[1].split(" ").slice(1).join(" ");
  if (!inner)
    return {};
  const attrs = inner.match(Attrs);
  return attrs?.reduce((acc, attr) => {
    const sep = attr.indexOf("=");
    const key = sep > 0 ? attr.slice(0, sep) : attr;
    const val = sep > 0 ? attr.slice(sep + 1).slice(1, -1) : true;
    return { ...acc, [key]: val };
  }, {}) || {};
}
function extractUnheadInputFromHtml(html) {
  const input = {};
  input.htmlAttrs = extractAttributes(html.match(HtmlTag)?.[0] || "");
  html = html.replace(HtmlTag, "<html>");
  input.bodyAttrs = extractAttributes(html.match(BodyTag)?.[0] || "");
  html = html.replace(BodyTag, "<body>");
  const innerHead = html.match(HeadContent)?.[1] || "";
  innerHead.match(SelfClosingTags)?.forEach((s) => {
    html = html.replace(s, "");
    const tag = s.split(" ")[0].slice(1);
    input[tag] = input[tag] || [];
    input[tag].push(extractAttributes(s));
  });
  innerHead.match(ClosingTags)?.map((tag) => tag.trim()).filter(Boolean).forEach((tag) => {
    html = html.replace(tag, "");
    const type = tag.match(/<([a-z-]+)/)?.[1];
    const res = extractAttributes(tag);
    const innerContent = tag.match(/>([\s\S]*)</)?.[1];
    if (innerContent) {
      res[type !== "script" ? "textContent" : "innerHTML"] = innerContent;
    }
    if (type === "title") {
      input.title = res;
    } else {
      input[type] = input[type] || [];
      input[type].push(res);
    }
  });
  html = html.replace(NewLines, "\n");
  return { html, input };
}

function encodeAttribute(value) {
  return String(value).replace(/"/g, "&quot;");
}
function propsToString(props) {
  let attrs = "";
  for (const key in props) {
    if (!Object.hasOwn(props, key))
      continue;
    let value = props[key];
    if ((key === "class" || key === "style") && typeof value !== "string") {
      value = key === "class" ? Array.from(value).join(" ") : Array.from(value).map(([k, v]) => `${k}:${v}`).join(";");
    }
    if (value !== false && value !== null) {
      attrs += value === true ? ` ${key}` : ` ${key}="${encodeAttribute(value)}"`;
    }
  }
  return attrs;
}

function escapeHtml(str) {
  return str.replace(/[&<>"'/]/g, (char) => {
    switch (char) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      case "'":
        return "&#x27;";
      case "/":
        return "&#x2F;";
      default:
        return char;
    }
  });
}
function tagToString(tag) {
  const attrs = propsToString(tag.props);
  const openTag = `<${tag.tag}${attrs}>`;
  if (!TagsWithInnerContent.has(tag.tag))
    return SelfClosingTags$1.has(tag.tag) ? openTag : `${openTag}</${tag.tag}>`;
  let content = String(tag.textContent || tag.innerHTML || "");
  content = tag.tag === "title" ? escapeHtml(content) : content.replace(new RegExp(`</${tag.tag}`, "gi"), `<\\/${tag.tag}`);
  return SelfClosingTags$1.has(tag.tag) ? openTag : `${openTag}${content}</${tag.tag}>`;
}

function ssrRenderTags(tags, options) {
  const schema = { htmlAttrs: {}, bodyAttrs: {}, tags: { head: "", bodyClose: "", bodyOpen: "" } };
  const lineBreaks = !options?.omitLineBreaks ? "\n" : "";
  for (const tag of tags) {
    if (tag.tag === "htmlAttrs" || tag.tag === "bodyAttrs") {
      Object.assign(schema[tag.tag], tag.props);
      continue;
    }
    const s = tagToString(tag);
    const tagPosition = tag.tagPosition || "head";
    schema.tags[tagPosition] += schema.tags[tagPosition] ? `${lineBreaks}${s}` : s;
  }
  return {
    headTags: schema.tags.head,
    bodyTags: schema.tags.bodyClose,
    bodyTagsOpen: schema.tags.bodyOpen,
    htmlAttrs: propsToString(schema.htmlAttrs),
    bodyAttrs: propsToString(schema.bodyAttrs)
  };
}

async function renderSSRHead(head, options) {
  const beforeRenderCtx = { shouldRender: true };
  await head.hooks.callHook("ssr:beforeRender", beforeRenderCtx);
  if (!beforeRenderCtx.shouldRender) {
    return {
      headTags: "",
      bodyTags: "",
      bodyTagsOpen: "",
      htmlAttrs: "",
      bodyAttrs: ""
    };
  }
  const ctx = { tags: options?.resolvedTags || await head.resolveTags() };
  await head.hooks.callHook("ssr:render", ctx);
  const html = ssrRenderTags(ctx.tags, options);
  const renderCtx = { tags: ctx.tags, html };
  await head.hooks.callHook("ssr:rendered", renderCtx);
  return renderCtx.html;
}

async function transformHtmlTemplate(head, html, options) {
  const { html: parsedHtml, input } = extractUnheadInputFromHtml(html);
  head.push(input, { _index: 0 });
  const headHtml = await renderSSRHead(head, options);
  return parsedHtml.replace("<html>", `<html${headHtml.htmlAttrs}>`).replace("<body>", `<body>${headHtml.bodyTagsOpen ? `
${headHtml.bodyTagsOpen}` : ``}`).replace("<body>", `<body${headHtml.bodyAttrs}>`).replace("</head>", `${headHtml.headTags}</head>`).replace("</body>", `${headHtml.bodyTags}</body>`);
}

export { createHead, escapeHtml, extractUnheadInputFromHtml, propsToString, renderSSRHead, ssrRenderTags, tagToString, transformHtmlTemplate };
