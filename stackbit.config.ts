// import { defineStackbitConfig } from '@stackbit/types';

// export default defineStackbitConfig({
//     "stackbitVersion": "~0.6.0",
//     "nodeVersion": "18",
//     "ssgName": "eleventy",
//     "contentSources": [],
//     "postInstallCommand": "npm i --no-save @stackbit/types"
// })

export default {
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
        up: ["Server at"],
      }
    }
  },

  // Specific option to prevent Visual Editor from interfering with Eleventy's page reload mechanism
  customContentReload: true
};
