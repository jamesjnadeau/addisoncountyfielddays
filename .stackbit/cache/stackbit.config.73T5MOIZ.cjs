var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// stackbit.config.ts
var stackbit_config_exports = {};
__export(stackbit_config_exports, {
  default: () => stackbit_config_default
});
module.exports = __toCommonJS(stackbit_config_exports);
var stackbit_config_default = {
  stackbitVersion: "~0.6.0",
  ssgName: "eleventy",
  nodeVersion: "22",
  // Eleventy to run inside Visual Editor container
  devCommand: "npx @11ty/eleventy  --config .eleventy.js --serve --port=3000",
  // Eleventy-specific configuration
  experimental: {
    ssg: {
      proxyWebsockets: true,
      logPatterns: {
        up: ["Server at"]
      }
    }
  },
  // Specific option to prevent Visual Editor from interfering with Eleventy's page reload mechanism
  customContentReload: true
};
//# sourceMappingURL=stackbit.config.73T5MOIZ.cjs.map
