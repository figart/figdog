require("dotenv").config();
const fs = require("fs");
const mkdirp = require("mkdirp");
const path = require("path");
module.exports = {
  siteMetadata: {
    blogPath: `/blog`,
    title: `figdog`,
    description: `Reflections on technology, the information technology services industry, and digital marketing.`,
    siteTitle: "Figdog",
    siteSlogan: "PERSPECTIVES ON MARKETING AND MANAGED IT SERVICES",
    title: `figdog`,
    description: `Our fancy slogan to capture views`,
    siteUrl: `https://fig.dog`,
    logo: "/images/Logo-White.png",
    logodark: `/images/Logo-Dark.png`,
    topMenuLinks: [
      {
        name: "DARK MODE",
        link: "#",
        icon: "fas fa-toggle-on",
      },
    ],
    footerMenuLinks: [
      {
        name: "ABOUT",
        link: "/about",
      },
      {
        name: "ENGAGE",
        link: "/engage",
      },
    ],
    menuLinks: [
      {
        name: "Blog",
        link: "/",
      },
      {
        name: "Contact",
        link: "/contact",
      },
      {
        name: "About",
        link: "/about",
      },
    ],
    colors: {
      primary: "#1C3B61",
      darkGray: "#424242",
      darkDarkGray: "#303030",
      lightGray: "#C4C4C4",
      cream: "#061836",
      gold: "#EBBA7D",
      orange: "#DE6936",
      red: "#BF0F0F",
      darkBlue: "#061836",
    },
    breakpoints: {
      mobileWidth: `611px`,
      tabletWidth: `611px`,
      desktopWidth: `612px`,
    },
  },
  plugins: [
    `@contentful/gatsby-transformer-contentful-richtext`,
    {
      resolve: "gatsby-source-contentful",
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_DELIVERY_TOKEN,
      },
    },
    {
      resolve: `gatsby-plugin-disqus`,
      options: {
        shortname: `figdog`,
      },
    },
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-emotion`,
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `Poppins\:300,400,400i,600,700`, // you can also specify font weights and styles
        ],
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: "gatsby-plugin-google-tagmanager",
      options: {
        id: "GTM-5973DMQ",
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
                {
                  site {
                    siteMetadata {
                      title
                      description
                      siteUrl
                      site_url: siteUrl
                    }
                  }
                }
              `,
        feeds: [
          {
            serialize: ({ query: { site, allContentfulBlog } }) => {
              return allContentfulBlog.edges.map((edge) => {
                return Object.assign({}, edge.node, {
                  description:
                    edge.node.childContentfulBlogTeaserRichTextNode
                      .childContentfulRichText.html,
                  date: edge.node.blogDate,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  author: edge.node.author.name,
                  custom_elements: [
                    {
                      "content:encoded":
                        edge.node.childContentfulBlogBodyRichTextNode
                          .childContentfulRichText.html,
                    },
                  ],
                });
              });
            },
            query: `
                    {
                      allContentfulBlog(
                        sort: {order: DESC, fields: [blogDate]}
                      ) {
                           edges {
                              node {
                                blogDate
                                title
                                author{
                                  name
                                }
                                teaser {
                                  json
                                }
                                fields {
                                  slug
                                }
                                body {
                                  json
                                }
                                childContentfulBlogTeaserRichTextNode {
                                  childContentfulRichText {
                                    html
                                  }
                                }
                                childContentfulBlogBodyRichTextNode {
                                  childContentfulRichText {
                                    html
                                  }
                                }
                              }
                        }
                      }
                    }
                  `,
            output: "/rss.xml",
            title: "figdog",
            // optional configuration to insert feed reference in pages:
            // if `string` is used, it will be used to create RegExp and then test if pathname of
            // current page satisfied this regular expression;
            // if not provided or `undefined`, all pages will have feed reference inserted
            match: "^/blog/",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-favicon`,
      options: {
        logo: "./src/favicon.png",

        // WebApp Manifest Configuration
        appName: null, // Inferred with your package.json
        appDescription: null,
        developerName: null,
        developerURL: null,
        dir: "auto",
        lang: "en-US",
        background: "#fff",
        theme_color: "#fff",
        display: "standalone",
        orientation: "any",
        version: "1.0",

        icons: {
          android: true,
          appleIcon: true,
          appleStartup: true,
          coast: false,
          favicons: true,
          firefox: true,
          yandex: false,
          windows: false,
        },
      },
    },
  ],
};
