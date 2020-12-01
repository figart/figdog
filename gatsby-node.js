const fs = require("fs");
const mkdirp = require("mkdirp");
const path = require("path");

exports.createPages = async ({ actions, graphql, reporter }, options) => {
  console.log(options);
  const result = await graphql(`
    {
      page: allContentfulPage(filter: { node_locale: { eq: "en-US" } }) {
        nodes {
          id
          homePage
          slug
          fields {
            slug
          }
        }
      }
      blog: allContentfulBlog(filter: { node_locale: { eq: "en-US" } }) {
        nodes {
          id
          slug
          fields {
            slug
            blogDate
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panic("Error loading figdog-theme: ", result.errors);
  }
  result.data.blog.nodes.forEach(node => {
    const id = node.id;
    console.log(node.slug);
    console.log(node.id);
    if (node.slug) {
      var slug = "/blog/" + node.slug;
    } else {
      var slug = node.fields.slug;
    }

    actions.createPage({
      path: slug,
      component: require.resolve("./src/templates/blog.js"),
      context: { id }
    });
  });
  result.data.page.nodes.forEach(node => {
    const id = node.id;
    if (node.slug) {
      if (node.homePage == true) {
        var slug = "/";
      } else {
        var slug = node.slug;
      }
    } else {
      var slug = node.fields.slug;
    }
    actions.createPage({
      path: slug,
      component: require.resolve("./src/templates/page.js"),
      context: { id }
    });
  });
};

exports.onCreateNode = ({ node, actions }, options) => {
  if (node.internal.type == "ContentfulPage") {
    if (node.homePage == true) {
      var slug = "/";
    } else {
      const title = slugify(node.title);
      var slug = "/" + title;
    }
    actions.createNodeField({
      node,
      name: `slug`,
      value: slug
    });
  }
  if (node.internal.type == "ContentfulBlog") {
    const title = slugify(node.title);
    const slug = "/blog/" + title;
    actions.createNodeField({
      node,
      name: `slug`,
      value: slug
    });
    actions.createNodeField({
      node,
      name: `blogDate`,
      value: node.blogDate
    });
  }
};
/*
    Runs beofre Gatsby does anything.
    I'll let you finish, but before you do check for
    a content directory and if not create one.
*/

// exports.onPreBootstrap = ({ store }, options) => {
//   // const { program } = store.getState();
//   // const contentPath = options.contentPath || 'docs'
//   // const dir = path.join(program.directory, contentPath)
//   // if (!fs.existsSync(dir)){
//   //     mkdirp.sync(dir)
//   // }
//   const folder = "/src/components/";
//   const path = __dirname + folder;
//   fs.mkdir(path, err => {});
//   const file = fs.createWriteStream(path + "variables.js", { flags: "w" });
//   // This is here incase any errors occur
//   file.on("open", function() {
//     // file.write(
//     //   'export const primaryColor = "' + options.colors.primary + '"' + "\n"
//     // );
//     file.write(
//       'export const darkGray = "' + options.colors.darkGray + '"' + "\n"
//     );
//     file.write(
//       'export const mobileWidth = "' +
//         options.breakpoints.mobileWidth +
//         '"' +
//         "\n"
//     );
//     file.write(
//       'export const tabletWidth = "' +
//         options.breakpoints.tabletWidth +
//         '"' +
//         "\n"
//     );
//     file.write(
//       'export const desktopWidth = "' +
//         options.breakpoints.desktopWidth +
//         '"' +
//         "\n"
//     );
//     file.write('export const siteTitle = "' + options.siteTitle + '"' + "\n");
//     file.write('export const siteSlogan = "' + options.siteSlogan + '"' + "\n");
//     file.write(
//       'export const lightGray = "' + options.colors.lightGray + '"' + "\n"
//     );
//     file.write('export const cream = "' + options.colors.cream + '"' + "\n");
//     file.write('export const gold = "' + options.colors.gold + '"' + "\n");
//     file.write('export const orange = "' + options.colors.orange + '"' + "\n");
//     file.write('export const red = "' + options.colors.red + '"' + "\n");
//     file.write(
//       'export const darkBlue = "' + options.colors.darkBlue + '"' + "\n"
//     );
//     file.write('export const logodark = "' + options.logodark + '"' + "\n");
//     file.write('export const logo = "' + options.logo + '"');
//   });
// };

function slugify(string) {
  const a = "àáäâãåèéëêìíïîòóöôùúüûñçßÿœæŕśńṕẃǵǹḿǘẍźḧ·/_,:;";
  const b = "aaaaaaeeeeiiiioooouuuuncsyoarsnpwgnmuxzh------";
  const p = new RegExp(a.split("").join("|"), "g");
  return string
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with
    .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, "-and-") // Replace & with ‘and’
    .replace(/[^\w\-]+/g, "") // Remove all non-word characters
    .replace(/\-\-+/g, "-") // Replace multiple — with single -
    .replace(/^-+/, ""); // Trim — from start of text .replace(/-+$/, '') // Trim — from end of text
}
