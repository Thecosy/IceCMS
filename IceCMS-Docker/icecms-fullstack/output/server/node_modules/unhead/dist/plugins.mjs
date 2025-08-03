export { A as AliasSortingPlugin, D as DeprecationsPlugin, P as PromisesPlugin, T as TemplateParamsPlugin } from './shared/unhead.DeCxexjU.mjs';
import { d as defineHeadPlugin } from './shared/unhead.CApf5sj3.mjs';
export { F as FlatMetaPlugin, S as SafeInputPlugin } from './shared/unhead.CApf5sj3.mjs';
import './shared/unhead.DZbvapt-.mjs';
import './shared/unhead.C13swrCa.mjs';
import './shared/unhead.DQc16pHI.mjs';
import './shared/unhead.yem5I2v_.mjs';

function CanonicalPlugin(options) {
  return (head) => {
    let host = options.canonicalHost || (!head.ssr ? window.location.origin : "");
    if (!host.startsWith("http") && !host.startsWith("//")) {
      host = `https://${host}`;
    }
    host = new URL(host).origin;
    function resolvePath(path) {
      if (options?.customResolver) {
        return options.customResolver(path);
      }
      if (path.startsWith("http") || path.startsWith("//"))
        return path;
      try {
        return new URL(path, host).toString();
      } catch {
        return path;
      }
    }
    return {
      key: "canonical",
      hooks: {
        "tags:resolve": (ctx) => {
          for (const tag of ctx.tags) {
            if (tag.tag === "meta") {
              if (tag.props.property?.startsWith("og:image") || tag.props.name?.startsWith("twitter:image")) {
                tag.props.content = resolvePath(tag.props.content);
              } else if (tag.props?.property === "og:url") {
                tag.props.content = resolvePath(tag.props.content);
              }
            } else if (tag.tag === "link" && tag.props.rel === "canonical") {
              tag.props.href = resolvePath(tag.props.href);
            }
          }
        }
      }
    };
  };
}

function InferSeoMetaPlugin(options = {}) {
  return defineHeadPlugin((head) => {
    head.push({
      meta: [
        {
          name: "twitter:card",
          content: options.twitterCard || "summary_large_image",
          tagPriority: "low"
        },
        {
          "property": "og:title",
          "tagPriority": "low",
          "data-infer": ""
        },
        {
          "property": "og:description",
          "tagPriority": "low",
          "data-infer": ""
        }
      ]
    });
    return {
      key: "infer-seo-meta",
      hooks: {
        "tags:beforeResolve": ({ tagMap }) => {
          let title = head._titleTemplate || head._title;
          const ogTitle = tagMap.get("meta:og:title");
          if (typeof ogTitle?.props["data-infer"] !== "undefined") {
            if (typeof title === "function") {
              title = title(head._title);
            }
            ogTitle.props.content = options.ogTitle ? options.ogTitle(title) : title || "";
            ogTitle.processTemplateParams = true;
          }
          const description = tagMap.get("meta:description")?.props?.content;
          const ogDescription = tagMap.get("meta:og:description");
          if (typeof ogDescription?.props["data-infer"] !== "undefined") {
            ogDescription.props.content = options.ogDescription ? options.ogDescription(description) : description || "";
            ogDescription.processTemplateParams = true;
          }
        }
      }
    };
  });
}

export { CanonicalPlugin, InferSeoMetaPlugin, defineHeadPlugin };
