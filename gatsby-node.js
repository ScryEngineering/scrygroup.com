/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const fs = require("fs");
const siteConfig = require("./data/SiteConfig.js");

const _ = require("lodash");
const webpackLodashPlugin = require("lodash-webpack-plugin");

const { createFilePath } = require(`gatsby-source-filesystem`);
const path = require("path");

const createPostNode = (node, getNode, createNodeField, fileSourcePath, pageType)=> {
  if(!(pageType === "blog" || pageType === "tutorial")){
    throw new Error(`Only "blog" and "tutorial" are supported for pageType, got: ${pageType}`);
  }
  const slug = createFilePath({
    node,
    getNode,
    basePath: fileSourcePath,
  })
  createNodeField({
    node,
    name: `slug`,
    value: `/${pageType}${slug}`,
  })
}

/* Creation of nodes includes a step where we take the directory the nodes were found in
then make a flag to mark the type of node based on where it came from in the content directory.
This is needed because it's hard to actually extract where a MarkdownRemark page came
from after the fact when constructing the GraphQL queries. */
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    let isOfType = name => node.fileAbsolutePath.includes(`content/${name}/`)
    let pageType; // default to blog post
    if (isOfType("tutorial-pages")) {
      createPostNode(node, getNode, createNodeField, "content/tutorial-pages", "tutorial")
      pageType = "tutorial";
    } else if (isOfType("blog-posts")) {
      createPostNode(node, getNode, createNodeField, "content/blog-posts", "blog")
      pageType = "blog";
    } else if (isOfType("people")) {
      createNodeField({
        node,
        name: `internalURL`,
        value: `/about/${_.kebabCase(node.frontmatter.name)}/`,
      })
      pageType = "person";
    } else if (isOfType("services")) {
      createNodeField({
        node,
        name: `internalURL`,
        value: `/services/${_.kebabCase(node.frontmatter.name)}/`,
      })
      pageType = "service";
    } else if (isOfType("tags")) {
      pageType = "tag"
      const slug = node.frontmatter.name.toLowerCase().replace(/ /g, '-')
      if (!node.fileAbsolutePath.includes(`content/tags/${slug}.md`)) {
        console.error(`Filename for tag "${node.frontmatter.name}" does not match expected filename "content/tags/${slug}.md" (got ${node.fileAbsolutePath})`)
      }
      createNodeField({
        node,
        name: `internalURL`,
        value: `/tags/${slug}/`,
      })
    } else {
      throw new Error(`Unknown markdown document encountered: ${node}`)
    }
    createNodeField({
      node,
      name: `contentType`,
      value: pageType,
    })
    createNodeField({
      node,
      name: `isPost`,
      value: pageType === "tutorial" || pageType === "blog",
    })
    createNodeField({
      node,
      name: `isPerson`,
      value: pageType === "person",
    })
    createNodeField({
      node,
      name: `isService`,
      value: pageType === "service",
    })
    createNodeField({
      node,
      name: `isTag`,
      value: pageType === "tag",
    })
  }
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  const tagPage = path.resolve("src/templates/tag.js");
  const authorPage = path.resolve("src/templates/person.js");
  const postPage = path.resolve("src/templates/post.js");
  const servicePage = path.resolve("src/templates/service.js");

  // We have to run this first so we know all the tags and can check content only uses valid ones
  const create_tag_pages = new Promise((resolve, reject) => {
    graphql(`
      {
        allMarkdownRemark (filter: { fields: { isTag: { eq: true } } }) {
          edges {
            node {
              frontmatter {
                name
              }
              fields {
                internalURL
              }
            }
          }
        }
      }
    `).then(result => {
      if (result.errors) {
        /* eslint no-console: "off" */
        console.log(result.errors);
        reject(result.errors);
      }

      const tagNameSet = new Set();

      console.log("Creating tag pages")
      result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        createPage({
          path: node.fields.internalURL,
          component: tagPage,
          context: {
            tag: node.frontmatter.name
          }
        });
        tagNameSet.add(node.frontmatter.name)
      });
      resolve(tagNameSet)
    })
  })

  const create_people_pages = new Promise((resolve, reject) => {
    if (
      !fs.existsSync(
        path.resolve(`content/people/`)
      )
    ) {
      reject(
        "The 'people' folder is missing within the 'content' folder."
      );
    }
    graphql(`
      {
        allMarkdownRemark (filter: { fields: { isPerson: { eq: true } } }) {
          edges {
            node {
              frontmatter {
                name
              }
              fields {
                internalURL
              }
            }
          }
        }
      }
    `).then(result => {
      if (result.errors) {
        /* eslint no-console: "off" */
        console.log(result.errors);
        reject(result.errors);
      }

      console.log("Creating personal about pages")
      result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        createPage({
          path: node.fields.internalURL,
          component: authorPage,
          context: {
            author: node.frontmatter.name
          }
        });
      });
      resolve()
    })
  })

  const create_blog_and_tutorial_pages = (tag_names) => new Promise((resolve, reject) => {
    graphql(`
    {
      allMarkdownRemark (
        filter: {
          fields: {
            isPost: { eq: true }
          }
          frontmatter: {
            draft: { ne: true }
          }
        })
      {
        edges {
          node {
            frontmatter {
              tags
              draft
            }
            fields {
              slug
            }
          }
        }
      }
    }
    `).then(result => {
      if (result.errors) {
        /* eslint no-console: "off" */
        console.log(result.errors);
        reject(result.errors);
      }

      console.log("Creating markdown pages")
      result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        if (node.frontmatter.draft !== true) {
          const pagePath = node.fields.slug
          createPage({
            path: pagePath,
            component: postPage,
            context: {
              // Data passed to context is available in page queries as GraphQL variables.
              slug: pagePath,
            },
          })
          if (node.frontmatter.tags) {
            node.frontmatter.tags.forEach(tag => {
              if (!tag_names.has(tag)) {
                console.log(`Unknown tag "${tag}" in post ${node.fields.slug}`)
              }
            })
          }
        }
      });
    resolve()
    })
  })

  const create_service_pages = new Promise((resolve, reject) => {
    if (
      !fs.existsSync(
        path.resolve(`content/services/`)
      )
    ) {
      reject(
        "The 'services' folder is missing within the 'content' folder."
      );
    }
    graphql(`
    {
      allMarkdownRemark (
        filter: {
          fields: {
            isService: { eq: true }
          }
          frontmatter: {
            draft: { ne: true }
          }
        })
      {
        edges {
          node {
            frontmatter {
              name
            }
            fields {
              internalURL
            }
          }
        }
      }
    }
  `).then(result => {
      if (result.errors) {
        /* eslint no-console: "off" */
        console.log(result.errors);
        reject(result.errors);
      }

      console.log("Creating service pages")
      result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        createPage({
          path: node.fields.internalURL,
          component: servicePage,
          context: {
            service: node.frontmatter.name
          }
        });
      });
      resolve()
    })
  })
  return Promise.all([create_people_pages, create_service_pages, create_tag_pages.then(res => create_blog_and_tutorial_pages(res)), ]);
};

exports.onCreateWebpackConfig = ({ actions, stage }) => {
  if (stage === "build-javascript") {
    actions.setWebpackConfig({ plugins: [new webpackLodashPlugin()] })
  }
};