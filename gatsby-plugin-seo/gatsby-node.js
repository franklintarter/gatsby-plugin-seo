const mergeOptsWithDefaults = require("./src/merge-with-default-options");

const createNodeHelpers = require(`gatsby-node-helpers`).default;

exports.sourceNodes = async ({ actions }, options) => {
  const { createNode } = actions;
  const { createNodeFactory } = createNodeHelpers({
    typePrefix: `SEO`
  });

  const prepareNode = createNodeFactory("");

  const pluginOpts = mergeOptsWithDefaults(options);

  const node = prepareNode(pluginOpts);
  createNode(node);
};
