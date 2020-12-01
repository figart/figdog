import React, { Component } from "react";
import { graphql } from "gatsby";
import PropTypes from "prop-types";
import Layout from "figdog-theme/src/components/layout";
import { BLOCKS, MARKS, INLINES } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Container from "figdog-theme/src/components/container";
import styled from "styled-components";
import * as variable from "figdog-theme/src/components/variables";
import { Global, css } from "@emotion/core";
import dog from "figdog-theme/src/images/dog.png";
import whiteDog from "figdog-theme/src/images/whitedog.png";
import { Disqus, CommentCount } from "gatsby-plugin-disqus";
import { Helmet } from "react-helmet";
import { PopupboxManager, PopupboxContainer } from "react-popupbox";
import "react-popupbox/dist/react-popupbox.css";

const Bold = ({ children }) => <span className="bold">{children}</span>;
const Text = ({ children }) => <p className="align-center">{children}</p>;

const options = {
  renderMark: {
    [MARKS.BOLD]: text => <Bold>{text}</Bold>
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>
  },
  renderNode: {
    [BLOCKS.EMBEDDED_ENTRY]: node => {
      const { id } = node.data.target.sys.contentType.sys;

      switch (id) {
        case "imageWithTagline":
          const { image, tagline } = node.data.target.fields;
          const { title, description, file } = image["en-US"].fields;
          var closePopupbox = e => {
            PopupboxManager.close({
              fadeInSpeed: 10
            });
          };
          var openPopupbox = (e, file) => {
            const content = (
              <div
                onClick={e => {
                  closePopupbox(e);
                }}
              >
                <img
                  title={title ? title["en-US"] : null}
                  alt={description ? description["en-US"] : null}
                  src={file["en-US"].url + "?w=1920&q=90"}
                />
                <div className="popclose-parent">
                  <div className="popclose"></div>
                </div>
              </div>
            );
            PopupboxManager.open({
              content,
              fadeInSpeed: 10,
              config: {}
            });
          };
          return (
            <div className="image-with-tagline">
              <div
                className="image-container"
                onClick={e => {
                  openPopupbox(e, file);
                }}
              >
                <i class="fas fa-search-plus"></i>
                <img
                  title={title ? title["en-US"] : null}
                  alt={description ? description["en-US"] : null}
                  src={file["en-US"].url + "?w=572&q=90"}
                />
              </div>
              <div className="image-tagline">{tagline["en-US"]}</div>
            </div>
          );
      }
    },
    [BLOCKS.EMBEDDED_ASSET]: node => {
      const { title, description, file } = node.data.target.fields;
      const mimeType = file["en-US"].contentType;
      const mimeGroup = mimeType.split("/")[0];

      switch (mimeGroup) {
        case "image":
          var closePopupbox = e => {
            PopupboxManager.close({
              fadeInSpeed: 10
            });
          };
          var openPopupbox = (e, file) => {
            const content = (
              <div
                onClick={e => {
                  closePopupbox(e);
                }}
              >
                <img
                  title={title ? title["en-US"] : null}
                  alt={description ? description["en-US"] : null}
                  src={file["en-US"].url + "?w=1920&q=90"}
                />
                <div className="popclose-parent">
                  <div className="popclose"></div>
                </div>
              </div>
            );
            PopupboxManager.open({
              content,
              fadeInSpeed: 10,
              config: {}
            });
          };
          return (
            <div
              className="image-container"
              onClick={e => {
                openPopupbox(e, file);
              }}
            >
              <i class="fas fa-search-plus"></i>
              <img
                title={title ? title["en-US"] : null}
                alt={description ? description["en-US"] : null}
                src={file["en-US"].url + "?w=572&q=90"}
              />
            </div>
          );
        case "imageWithTagline":
          return <div>tester</div>;
        case "application":
          return (
            <a
              alt={description ? description["en-US"] : null}
              href={file["en-US"].url}
            >
              {title ? title["en-US"] : file["en-US"].details.fileName}
            </a>
          );
        default:
          return (
            <span style={{ backgroundColor: "red", color: "white" }}>
              {" "}
              {mimeType} embedded asset{" "}
            </span>
          );
      }
    }
  }
};

export const query = graphql`
  query BlogPostByID($id: String!) {
    allContentfulBlog(filter: { id: { eq: $id } }) {
      nodes {
        id
        slug
        fields {
          slug
        }
        metaDescription {
          metaDescription
        }
        author {
          name
          id
          linkedInLink
        }
        body {
          json
        }
        childContentfulBlogTeaserRichTextNode {
          childContentfulRichText {
            html
          }
        }
        title
        subTitle
        blogDate(formatString: "ddd, MMM D, Y")
      }
    }
  }
`;

class BlogPostTemplate extends Component {
  // title,
  // body,
  // createdAt,
  // subTitle,
  // name,
  // linkedIn,
  // blogDate,
  // teaser,
  // slug,
  //   }) => {
  //     var url = "http://google.com";
  //     var title2 = "Replace this with a title.";
  //     var text = "Replace this with your share copy.";
  //     const encodedLinkedIn = 'https://www.linkedin.com/shareArticle?mini=true&title=' + title + '&url=' + encodeURIComponent('https://figdog.com' + slug)
  //     // window.open('http://www.linkedin.com/shareArticle?mini=true&url='+encodeURIComponent(url), '', 'left=0,top=0,width=650,height=420,personalbar=0,toolbar=0,scrollbars=0,resizable=0');
  //       const linkedInUrl = 'https://www.linkedin.com/shareArticle?mini=true&title=' + title + '&url=https://figdog.com' + slug + '&summary=' + teaser
  //       const twitterShareUrl = 'https://twitter.com/share?text=' + title + '&url=' + 'http://figdog.com' + slug

  linkedInClick = (e, slug, title) => {
    window.open(
      "http://www.linkedin.com/shareArticle?mini=true&title=" +
        title +
        "&url=" +
        encodeURIComponent("https://figdog2.netlify.com" + slug),
      "",
      "left=0,top=0,width=650,height=420,personalbar=0,toolbar=0,scrollbars=0,resizable=0"
    );
    e.preventDefault();
  };

  dogClick = e => {
    window.scrollTo(0, 0);
    e.preventDefault();
  };

  render() {
    const {
      title,
      body,
      createdAt,
      subTitle,
      name,
      linkedIn,
      blogDate,
      teaser,
      slug,
      post
    } = this.props;
    const twitterShareUrl =
      "https://twitter.com/share?text=" +
      title +
      "&url=" +
      "http://figdog.com" +
      slug;
    const linkedInUrl =
      "http://www.linkedin.com/shareArticle?mini=true&title=" +
      title +
      "&url=" +
      encodeURIComponent("https://figdog2.netlify.com" + slug);

    let disqusConfig = {
      url: `${"https://fig.dog" + slug}`,
      identifier: post.id,
      title: title
    };
    return (
      <Layout>
        <PopupboxContainer />
        <Helmet>
          <meta charSet="utf-8" />
          <title>{title} | figdog</title>
          {post.metaDescription && (
            <meta
              name="description"
              content={post.metaDescription.metaDescription}
            />
          )}
          <link rel="canonical" href={"https://fig.dog" + slug} />
        </Helmet>
        <Global
          styles={css`
            .popclose-parent {
              filter: drop-shadow(-1px 6px 3px rgba(50, 50, 0, 0.5));
              z-index: 99999999999999;
              position: absolute;
              top: 40px;
              right: 40px;
            }
            .popclose {
              height: 60px !important;
              width: 60px !important;
              clip-path: polygon(
                20% 0%,
                0% 20%,
                30% 50%,
                0% 80%,
                20% 100%,
                50% 70%,
                80% 100%,
                100% 80%,
                70% 50%,
                100% 20%,
                80% 0%,
                50% 30%
              );
              background-color: white;
              cursor: pointer;
            }
            .popupbox-content div:not(.nav):not(.indicators) {
              height: 100%;
            }
            .popupbox-content {
              padding: 0px;
            }
            .popupbox-wrapper {
              max-width: 100%;
              border-radius: 0px;
            }
            .image-container {
              position: relative;
              i {
                font-size: 34px;
                color: white;
                position: absolute;
                bottom: 20px;
                left: 20px;
                text-shadow: -3px 3px 4px ${variable.darkGray};
                cursor: pointer;
              }
            }
            .blog-body {
              margin-top: 45px;
              a {
                cursor: pointer;
              }
            }
            .white-dog {
              display: none;
            }
            .social-dog {
              text-align: right;
              .social {
                display: flex;
                justify-content: flex-end;
              }
              a {
                border: 0px;
                text-decoration: none;
              }
              i {
                border: thin solid ${variable.primaryColor};
                width: 32px;
                height: 32px;
                border-radius: 25px;
                margin-left: 11px;
                display: flex;
                align-items: center;
                justify-content: center;
              }
              .social {
                margin-bottom: 40px;
              }
              img {
                width: 31px;
                height: auto;
              }
            }
            .blog-full {
              @media (max-width: ${variable.tabletWidth}) {
                img {
                  max-width: calc(100% + 30px);
                  margin-left: -15px;
                }
              }
              h1 {
                color: ${variable.primaryColor};
                font-size: 52px;
                margin: 35px 0px 0px 0px;
                @media (max-width: ${variable.tabletWidth}) {
                  margin: 0px 0px 0px 0px;
                  font-size: 30px;
                }
              }
              .blog-post-date {
                color: ${variable.orange};
                font-size: 20px;
                margin-top: 10px;
                a {
                  color: ${variable.orange};
                  text-decoration: none;
                }
              }
              .image-tagline {
                color: ${variable.orange};
                font-size: 20px;
                font-style: italic;
                text-align: left;
                font-family: Georgia, Times, "Times New Roman";
                margin-top: 5px;
                line-height: 1.3;
              }
            }
            .dark {
              .white-dog {
                display: inline;
              }
              .dog {
                display: none;
              }
              .social-dog {
                i {
                  border-color: white;
                }
              }
              .blog-full {
                h1 {
                  color: white;
                }
                color: ${variable.lightGray};
                .blog-post-date {
                  color: ${variable.lightGray};
                  a {
                    color: ${variable.lightGray};
                  }
                }
              }
            }
            @media (max-width: ${variable.mobileWidth}) {
              .popclose-parent {
                display: none;
              }
            }
          `}
        />
        <Container>
          <div className="blog-full">
            <h1>{title}</h1>
            <div className="blog-post-date">
              by {name} | {blogDate}{" "}
            </div>

            <div className="blog-body">
              {documentToReactComponents(body, options, this)}
            </div>
            <Disqus className="disqus" config={disqusConfig} />
          </div>
          <div className="social-dog">
            <div class="social">
              <a
                target="_blank"
                href={linkedInUrl}
                onClick={e => {
                  this.linkedInClick(e, slug, title);
                }}
              >
                <i class="fab fa-linkedin-in"></i>
              </a>
              <a target="_blank" href={twitterShareUrl}>
                <i class="fab fa-twitter"></i>
              </a>
            </div>
            <div
              className="dogs"
              onClick={e => {
                this.dogClick(e, slug, title);
              }}
            >
              <img className="white-dog" src={whiteDog} />
              <img className="dog" src={dog} />
            </div>
          </div>
        </Container>
      </Layout>
    );
  }
}

const Blog = ({ data }) => {
  const { [0]: post } = data.allContentfulBlog.nodes;

  return (
    <BlogPostTemplate
      title={post.title}
      subTitle={post.subTitle}
      body={post.body.json}
      blogDate={post.blogDate}
      name={post.author.name}
      linkedIn={post.author.linkedInLink}
      slug={post.fields.slug}
      post={post}
      teaser={
        post.childContentfulBlogTeaserRichTextNode.childContentfulRichText.html
      }
    />
  );
};

Blog.propTypes = {
  data: PropTypes.shape({
    allContentfulBlog: PropTypes.object
  })
};

export default Blog;
