import { M as MetaTagsArrayable } from './unhead.yem5I2v_.mjs';

const NAMESPACES = {
  META: /* @__PURE__ */ new Set(["twitter"]),
  OG: /* @__PURE__ */ new Set(["og", "book", "article", "profile", "fb"]),
  MEDIA: /* @__PURE__ */ new Set(["ogImage", "ogVideo", "ogAudio", "twitterImage"]),
  HTTP_EQUIV: /* @__PURE__ */ new Set(["contentType", "defaultStyle", "xUaCompatible"])
};
const META_ALIASES = {
  articleExpirationTime: "article:expiration_time",
  articleModifiedTime: "article:modified_time",
  articlePublishedTime: "article:published_time",
  bookReleaseDate: "book:release_date",
  fbAppId: "fb:app_id",
  ogAudioSecureUrl: "og:audio:secure_url",
  ogAudioUrl: "og:audio",
  ogImageSecureUrl: "og:image:secure_url",
  ogImageUrl: "og:image",
  ogSiteName: "og:site_name",
  ogVideoSecureUrl: "og:video:secure_url",
  ogVideoUrl: "og:video",
  profileFirstName: "profile:first_name",
  profileLastName: "profile:last_name",
  profileUsername: "profile:username",
  msapplicationConfig: "msapplication-Config",
  msapplicationTileColor: "msapplication-TileColor",
  msapplicationTileImage: "msapplication-TileImage"
};
const MetaPackingSchema = {
  appleItunesApp: {
    unpack: {
      entrySeparator: ", ",
      // @ts-expect-error untyped
      resolve: ({ key, value }) => `${fixKeyCase(key)}=${value}`
    }
  },
  refresh: {
    metaKey: "http-equiv",
    unpack: {
      entrySeparator: ";",
      // @ts-expect-error untyped
      resolve: ({ key, value }) => key === "seconds" ? `${value}` : void 0
    }
  },
  robots: {
    unpack: {
      entrySeparator: ", ",
      // @ts-expect-error untyped
      resolve: ({ key, value }) => typeof value === "boolean" ? fixKeyCase(key) : `${fixKeyCase(key)}:${value}`
    }
  },
  contentSecurityPolicy: {
    metaKey: "http-equiv",
    unpack: {
      entrySeparator: "; ",
      // @ts-expect-error untyped
      resolve: ({ key, value }) => `${fixKeyCase(key)} ${value}`
    }
  },
  charset: {}
};
function fixKeyCase(key) {
  const updated = key.replace(/([A-Z])/g, "-$1").toLowerCase();
  const prefixIndex = updated.indexOf("-");
  return prefixIndex === -1 ? updated : NAMESPACES.META.has(updated.slice(0, prefixIndex)) || NAMESPACES.OG.has(updated.slice(0, prefixIndex)) ? key.replace(/([A-Z])/g, ":$1").toLowerCase() : updated;
}
function sanitizeObject(input) {
  return Object.fromEntries(Object.entries(input).filter(([k, v]) => String(v) !== "false" && k));
}
function transformObject(obj) {
  return Array.isArray(obj) ? obj.map(transformObject) : !obj || typeof obj !== "object" ? obj : Object.fromEntries(Object.entries(obj).map(([k, v]) => [fixKeyCase(k), transformObject(v)]));
}
function unpackToString(value, options = {}) {
  const { entrySeparator = "", keyValueSeparator = "", wrapValue, resolve } = options;
  return Object.entries(value).map(([key, val]) => {
    if (resolve) {
      const resolved = resolve({ key, value: val });
      if (resolved !== void 0)
        return resolved;
    }
    const processedVal = typeof val === "object" ? unpackToString(val, options) : typeof val === "number" ? val.toString() : typeof val === "string" && wrapValue ? `${wrapValue}${val.replace(new RegExp(wrapValue, "g"), `\\${wrapValue}`)}${wrapValue}` : val;
    return `${key}${keyValueSeparator}${processedVal}`;
  }).join(entrySeparator);
}
function handleObjectEntry(key, value) {
  const sanitizedValue = sanitizeObject(value);
  const fixedKey = fixKeyCase(key);
  const attr = resolveMetaKeyType(fixedKey);
  if (!MetaTagsArrayable.has(fixedKey)) {
    return [{ [attr]: fixedKey, ...sanitizedValue }];
  }
  const input = Object.fromEntries(
    Object.entries(sanitizedValue).map(([k, v]) => [`${key}${k === "url" ? "" : `${k[0].toUpperCase()}${k.slice(1)}`}`, v])
  );
  return unpackMeta(input || {}).sort((a, b) => (a[attr]?.length || 0) - (b[attr]?.length || 0));
}
function resolveMetaKeyType(key) {
  if (MetaPackingSchema[key]?.metaKey === "http-equiv" || NAMESPACES.HTTP_EQUIV.has(key)) {
    return "http-equiv";
  }
  const fixed = fixKeyCase(key);
  const colonIndex = fixed.indexOf(":");
  return colonIndex === -1 ? "name" : NAMESPACES.OG.has(fixed.slice(0, colonIndex)) ? "property" : "name";
}
function resolveMetaKeyValue(key) {
  return META_ALIASES[key] || fixKeyCase(key);
}
function resolvePackedMetaObjectValue(value, key) {
  if (key === "refresh")
    return `${value.seconds};url=${value.url}`;
  return unpackToString(transformObject(value), {
    keyValueSeparator: "=",
    entrySeparator: ", ",
    resolve: ({ value: value2, key: key2 }) => value2 === null ? "" : typeof value2 === "boolean" ? key2 : void 0,
    // @ts-expect-error untyped
    ...MetaPackingSchema[key]?.unpack
  });
}
function unpackMeta(input) {
  const extras = [];
  const primitives = {};
  for (const [key, value] of Object.entries(input)) {
    if (Array.isArray(value)) {
      if (key === "themeColor") {
        value.forEach((v) => {
          if (typeof v === "object" && v !== null) {
            extras.push({ name: "theme-color", ...v });
          }
        });
        continue;
      }
      for (const v of value) {
        if (typeof v === "object" && v !== null) {
          const urlProps = [];
          const otherProps = [];
          for (const [propKey, propValue] of Object.entries(v)) {
            const metaKey = `${key}${propKey === "url" ? "" : `:${propKey}`}`;
            const meta2 = unpackMeta({ [metaKey]: propValue });
            (propKey === "url" ? urlProps : otherProps).push(...meta2);
          }
          extras.push(...urlProps, ...otherProps);
        } else {
          extras.push(...typeof v === "string" ? unpackMeta({ [key]: v }) : handleObjectEntry(key, v));
        }
      }
      continue;
    }
    if (typeof value === "object" && value) {
      if (NAMESPACES.MEDIA.has(key)) {
        const prefix = key.startsWith("twitter") ? "twitter" : "og";
        const type = key.replace(/^(og|twitter)/, "").toLowerCase();
        const metaKey = prefix === "twitter" ? "name" : "property";
        if (value.url) {
          extras.push({
            [metaKey]: `${prefix}:${type}`,
            content: value.url
          });
        }
        if (value.secureUrl) {
          extras.push({
            [metaKey]: `${prefix}:${type}:secure_url`,
            content: value.secureUrl
          });
        }
        for (const [propKey, propValue] of Object.entries(value)) {
          if (propKey !== "url" && propKey !== "secureUrl") {
            extras.push({
              [metaKey]: `${prefix}:${type}:${propKey}`,
              // @ts-expect-error untyped
              content: propValue
            });
          }
        }
      } else if (MetaTagsArrayable.has(fixKeyCase(key))) {
        extras.push(...handleObjectEntry(key, value));
      } else {
        primitives[key] = sanitizeObject(value);
      }
    } else {
      primitives[key] = value;
    }
  }
  const meta = Object.entries(primitives).map(([key, value]) => {
    if (key === "charset")
      return { charset: value === null ? "_null" : value };
    const metaKey = resolveMetaKeyType(key);
    const keyValue = resolveMetaKeyValue(key);
    const processedValue = value === null ? "_null" : typeof value === "object" ? resolvePackedMetaObjectValue(value, key) : typeof value === "number" ? value.toString() : value;
    return metaKey === "http-equiv" ? { "http-equiv": keyValue, "content": processedValue } : { [metaKey]: keyValue, content: processedValue };
  });
  return [...extras, ...meta].map(
    (m) => !("content" in m) ? m : m.content === "_null" ? { ...m, content: null } : m
  );
}

export { resolveMetaKeyValue as a, resolvePackedMetaObjectValue as b, resolveMetaKeyType as r, unpackMeta as u };
