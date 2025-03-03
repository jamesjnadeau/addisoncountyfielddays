
import pugPlugin from "@11ty/eleventy-plugin-pug";
import * as sass from "sass";
import path from 'node:path';
import toc from 'markdown-it-table-of-contents';
import yaml from "js-yaml";
import { EleventyRenderPlugin } from "@11ty/eleventy";
import fm from "front-matter"
import pug from "pug";
import { readFileSync } from 'node:fs';


let config = yaml.load(readFileSync('./content/_data/config.yaml'))

// Pug Filters
let pug_remove_fm_filter = function(text, options) {
    var content = fm(text);
    return content.body;
}

let pug_process_pug_filter = function(text, options) {
    return pug.render(text)
}

let pug_replace_config_variables_filter = function(text, options) {
    let temp = text;
    for(var key in config) {
        let value = config[key]
        temp = temp.replaceAll(`{{config.${key}}}`, value)
    }
    return temp;
}


let default_title = 'Addison County Fair and Field Days'
let default_description = ''

export default async function(eleventyConfig) {

    // set input/ouput directories
    eleventyConfig.setInputDirectory("content");
    eleventyConfig.setOutputDirectory("built");

    // make [[toc]] in md files work as expected
    eleventyConfig.amendLibrary("md", (mdLib) => mdLib.use(toc));

    // use pug plugin, 
    // global.eleventyNavigationPlugin = eleventyNavigationPlugin.navigation; // see https://github.com/11ty/eleventy-plugin-template-languages/issues/1#issuecomment-2221156643
    
    eleventyConfig.addPlugin(pugPlugin, {
		// debug: true,
        filters: {
            'remove_frontmattter': pug_remove_fm_filter,
            'process_pug': pug_process_pug_filter,
            'replace_config_variables': pug_replace_config_variables_filter,
        }
        // filters: eleventyConfig.filters,
        // globals: ['eleventyNavigationPlugin']
        // {
        //     'eleventyNavigation': function (text) {
        //         return text
        //     },
        // }
	});

    // add render function to templates
    eleventyConfig.addPlugin(EleventyRenderPlugin);
    // see https://www.11ty.dev/docs/plugins/render/

    // set global layout
    eleventyConfig.addGlobalData("layout", "layouts/default.pug");

    // defaul title/descriptions
    eleventyConfig.addGlobalData("title", default_title);
    eleventyConfig.addGlobalData("description", default_description);

    // support yaml data files
    eleventyConfig.addDataExtension("yaml", (contents) => yaml.load(contents));
    // this is used to load the config file

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

