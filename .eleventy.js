
import pugPlugin from "@11ty/eleventy-plugin-pug";
import * as sass from "sass";
import path from 'node:path';
import markdownIt from "markdown-it";
import toc from 'markdown-it-table-of-contents';


let default_title = 'Addison County Fair and Field Days'
let default_description = ''

export default async function(eleventyConfig) {

    // set input/ouput directories
    eleventyConfig.setInputDirectory("content");
    eleventyConfig.setOutputDirectory("built");

    eleventyConfig.amendLibrary("md", (mdLib) => mdLib.use(toc));

    // use pug plugin, 
    // global.eleventyNavigationPlugin = eleventyNavigationPlugin.navigation; // see https://github.com/11ty/eleventy-plugin-template-languages/issues/1#issuecomment-2221156643
    
    eleventyConfig.addPlugin(pugPlugin, {
		// debug: true,
        // filters: eleventyConfig.filters,
        // globals: ['eleventyNavigationPlugin']
        // {
        //     'eleventyNavigation': function (text) {
        //         return text
        //     },
        // }
	});

    // set global layout
    eleventyConfig.addGlobalData("layout", "layouts/default.pug");

    // defaul title/descriptions
    eleventyConfig.addGlobalData("title", default_title);
    eleventyConfig.addGlobalData("description", default_description);

    // settings used for dates in templates
    eleventyConfig.addGlobalData("year", "2025");
    eleventyConfig.addGlobalData("prev_year", "2024");
    eleventyConfig.addGlobalData("sunday", "27th");
    eleventyConfig.addGlobalData("monday", "28th");
    eleventyConfig.addGlobalData("tuesday", "29th");
    eleventyConfig.addGlobalData("wednesday", "30th");
    eleventyConfig.addGlobalData("thursday", "31st");
    eleventyConfig.addGlobalData("friday", "1st");
    eleventyConfig.addGlobalData("saturday", "2nd");

    // Directory Passthroughs
    // Copy `files/` to `/`
	eleventyConfig.addPassthroughCopy({ files: "/files" });
    eleventyConfig.addPassthroughCopy({ admin: "/admin" });

    // add sass config, see https://www.11ty.dev/docs/languages/custom/#example-add-sass-support-to-eleventy
    eleventyConfig.addTemplateFormats("scss");
    let node_modules_path = './node_modules'
	// Creates the extension for use
	eleventyConfig.addExtension("scss", {
		outputFileExtension: "css", // default: "html"

		// `compile` is called once per .scss file in the input directory
		compile: async function (inputContent) {

			// This is the render function, `data` is the full data cascade
			return async (data) => {
                let my_path = path.dirname(data.page.inputPath)
                let result = sass.compileString(inputContent, {
                    loadPaths: [my_path, node_modules_path],
                    quietDeps: true,
                });
				return result.css;
			};
		},
	});

    // console.log(eleventyConfig)
};

