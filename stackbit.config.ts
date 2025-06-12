import { GitContentSource } from "@stackbit/cms-git";
import { defineStackbitConfig } from '@stackbit/types';

export default defineStackbitConfig({
    "stackbitVersion": "~0.6.0",
    "nodeVersion": "22",
    "devCommand": "npx @11ty/eleventy  --config .eleventy.js --serve --port=3000",
    "ssgName": "eleventy",
    "contentSources": [
      new GitContentSource({
      rootPath: __dirname,
      contentDirs: ["content"],
      models: [
        {
          name: "Exhibits",
          // Define the model as a page model
          type: "page",
          urlPath: "/exhibits/{slug}",
          filePath: "content/exhibits/{slug}.md",
          fields: [
            { name: "title", type: "string", required: true },
            { name: "description", type: "string", required: true }
          ]
        },
        {
          name: "Forms",
          // Define the model as a page model
          type: "page",
          urlPath: "/forms/{slug}",
          filePath: "content/forms/{slug}.pug",
          fields: [
            { name: "title", type: "string", required: true },
            { name: "description", type: "string", required: true }
          ]
        }
      ],
    })
    ],
    "postInstallCommand": "npm i --no-save @stackbit/types",
    // Eleventy-specific configuration
    'experimental': {
      ssg: {
        proxyWebsockets: true,
        logPatterns: {
          up: ["Server at"],
        }
      }
    },
     // Specific option to prevent Visual Editor from interfering with Eleventy's page reload mechanism
    customContentReload: true
});

