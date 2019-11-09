const fs = require("fs");
const path = require("path");
const mergeOptsWithDefaults = require("./src/merge-with-default-options");

const createNodeHelpers = require(`gatsby-node-helpers`).default;

exports.sourceNodes = async ({ actions, reporter }, options) => {

  const pluginOpts = mergeOptsWithDefaults(options);

    const requiredFiles = [
      pluginOpts.appleTouch,
      pluginOpts.favicon32,
      pluginOpts.favicon16,
      "favicon.ico"
    ];

    requiredFiles.forEach(f => {
      const filePath = path.join(__dirname, f);
      reporter.warn(filePath);

      if (!fs.existsSync(path)) {
        reporter.error(`Could not find file '${f}' in static folder.`)
      }
    });

  const { createNode } = actions;
  const { createNodeFactory } = createNodeHelpers({
    typePrefix: `SEO`
  });

  const prepareNode = createNodeFactory("");


  const node = prepareNode(pluginOpts);
  createNode(node);
};
