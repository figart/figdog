import React from "react";
import { graphql, Link } from "gatsby";
import PropTypes from "prop-types";
import Layout from "../components/layout";
import BlogSection from "../components/organisms/sections/section-bloglist";
import * as variable from "../components/variables";
import styled from "styled-components";
import Container from "../components/container";
import { BLOCKS, MARKS, INLINES } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Helmet } from "react-helmet";
import { Global, css } from "@emotion/core";
import Subscribe from "../components/organisms/subscribe";
import ActiveContact from "../components/organisms/active-contact";
import Script from "react-load-script";

const Body = styled.div``;

const Form = styled.div`
  input {
    width: 100%;
    padding: 10px 5px;
    margin-bottom: 20px;
  }
  textarea {
    width: 100%;
    padding: 10px 5px;
    min-height: 150px;
  }
  button {
    background-color: ${variable.primaryColor};
    padding: 10px 20px;
    -webkit-appearance: none;
    color: white;
    font-weight: bold;
    border: 0px;
  }
`;

const TitleSlogan = styled.div`
  text-align: center;
  border-bottom: 7px solid ${variable.darkGray};
  padding: 0px 0px 40px 0px;
  margin-bottom: 20px;
  h3 {
    font-weight: normal;
  }
`;

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
    [BLOCKS.EMBEDDED_ASSET]: node => {
      const { title, description, file } = node.data.target.fields;
      const mimeType = file["en-US"].contentType;
      const mimeGroup = mimeType.split("/")[0];

      switch (mimeGroup) {
        case "image":
          return (
            <img
              title={title ? title["en-US"] : null}
              alt={description ? description["en-US"] : null}
              src={file["en-US"].url + "?w=572&q=90"}
            />
          );
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
  query PagePostByID($id: String!) {
    allContentfulPage(filter: { id: { eq: $id } }) {
      nodes {
        fields {
          slug
        }
        slug
        metaDescription {
          metaDescription
        }
        title
        subTitle
        homePage
        body {
          json
        }
      }
    }
  }
`;
export const addActive = id => {
  if (typeof window !== "undefined") {
    //do work
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://digett.activehosted.com/f/embed.php?id=" + id;
    document.getElementsByTagName("head")[0].appendChild(script);
  }
};

class PagePostTemplate extends React.Component {
  state = {
    slug: ""
  };
  componentDidMount() {
    // addActive('7');
    // addActive('9');
  }

  render() {
    const { title, homePage, subTitle, slug, body, post } = this.props;
    return (
      <Layout>
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
            .g-recaptcha > div {
              @media (max-width: ${variable.tabletWidth}) {
                width: 100% !important;
                iframe {
                  width: 100% important;
                  max-width: 100%;
                }
              }
            }
            .social-header {
              margin-top: 40px;
            }
            .social {
              display: flex;
              justify-content: flex-start;
            }
            a {
              border: 0px;
              text-decoration: none;
            }
            .engage {
              i {
                border: 5px solid ${variable.darkGray};
                width: 65px;
                height: 65px;
                border-radius: 100%;
                margin-right: 13px;
                display: flex !important;
                align-items: center;
                justify-content: center;
                font-size: 34px;
                color: ${variable.darkGray};
              }
            }
            body ._form_7 {
              ._form-thank-you {
                color: ${variable.darkGray} !important;
              }
              margin-top: 20px !important;
              ._form-title {
                color: ${variable.darkGray} !important;
              }
              ._button-wrapper {
                width: calc(30% - 15px) !important;
                margin: 0px 0px 0px 15px !important;
                @media (max-width: ${variable.tabletWidth}) {
                  width: calc(100%) !important;
                  margin: 15px 0px 0px 0px !important;
                }
                button#_form_7_submit._submit {
                  width: 100% !important;
                  border: 2px solid ${variable.darkGray} !important;
                  background: ${variable.darkGray} !important;
                  color: white !important;
                  border-radius: 25px !important;
                  height: 50px !important;
                  font-size: 24px;
                  padding: 0px !important;
                  font-weight: 400 !important;
                }
              }
              ._form-label {
                display: none !important;
              }
              ._x35763815 {
                margin-bottom: 0px !important;
                width: 65%;
                @media (max-width: ${variable.tabletWidth}) {
                  width: calc(100%) !important;
                }
                input {
                  margin-bottom: 0px;
                  border: 2px solid ${variable.darkGray} !important;
                  border-radius: 25px;
                }
              }
              ._field-wrapper {
                display: flex;
                justify-content: center;
                align-items: center;
                &:before {
                  content: "\f0e0";
                  font-family: "Font Awesome 5 Free";
                  color: ${variable.darkGray};
                  position: absolute;
                  left: 15px;
                  font-size: 30px;
                }
                &:focus-within {
                  &:before {
                    // display:none;
                  }
                }
              }
              input[type="text"] {
                width: 100% !important;
                padding: 15px 15px 15px 55px !important;
                border-radius: 25px !important;
                height: 50px !important;
              }
            }
            .fa-rss {
              font-size: 40px;
              color: ${variable.darkGray};
              border: 5px solid ${variable.darkGray};
              border-radius: 100%;
              width: 65px;
              height: 65px;
              display: flex !important;
              justify-content: center;
              align-items: center;
            }
            ._form {
              padding: 0px !important;
              margin: 0px !important;
              color: ${variable.darkGray} !important;
              width: 100% !important;
              font-family: "Poppins", sans-serif !important;
              button._submit {
                background-color: ${variable.primaryColor} !important;
                font-family: "Poppins", sans-serif !important;
              }
            }
            ._form_9 {
              ._form-thank-you {
                color: ${variable.darkGray} !important;
              }
              margin-top: 50px;
              button#_form_9_submit {
                border: 2px solid ${variable.darkGray} !important;
                font-weight: 400 !important;
                border-radius: 25px !important;
                border: 2px solid ${variable.darkGray} !important;
                background: ${variable.darkGray} !important;
                color: white !important;
                border-radius: 25px !important;
                height: 50px !important;
                font-size: 24px;
                padding: 0px 15px 0px 15px !important;
                font-weight: 400 !important;
              }
              ._form-content {
                color: ${variable.darkGray} !important;
                input[type="text"] {
                  width: 100% !important;
                  padding: 15px 15px 15px 15px !important;
                  border-radius: 25px !important;
                  height: 50px !important;
                  color: ${variable.darkGray} !important;
                  border: 2px solid ${variable.darkGray} !important;
                  &::placeholder {
                    color: ${variable.darkGray} !important;
                  }
                }
                textarea {
                  width: 100% !important;
                  padding: 15px 15px 15px 15px !important;
                  border-radius: 25px !important;
                  color: ${variable.darkGray} !important;
                  border: 2px solid ${variable.darkGray} !important;
                  &::placeholder {
                    color: ${variable.darkGray} !important;
                  }
                }
              }
            }
            .dark {
              ._form_9 {
                ._form-thank-you {
                  color: white !important;
                }
                button#_form_9_submit {
                  color: white !important;
                  border: 2px solid white !important;
                }
              }
              .engage {
                i {
                  border: 5px solid white;
                  color: white;
                }
              }
              .fa-rss {
                color: white;
                border-color: white !important;
              }
              ._form_7 {
                ._form-thank-you {
                  color: white !important;
                }
                ._form-title {
                  color: white !important;
                }
                ._button-wrapper {
                  button#_form_7_submit._submit {
                    border: 2px solid white !important;
                    color: white !important;
                  }
                }
              }
              ._form_9 ._form-content {
                color: white !important;
              }
            }
            @media (max-width: ${variable.tabletWidth}) {
              .main {
                img {
                  max-width: calc(100% + 30px);
                  margin-left: -15px;
                }
              }
            }
          `}
        />
        <Container>
          <Body>{documentToReactComponents(body, options)}</Body>
          {homePage === true && <BlogSection></BlogSection>}
          {slug === "/engage" && (
            <div className="engage">
              {addActive("7")}
              {addActive("9")}

              {/* <Script
      url="https://digett.activehosted.com/f/embed.php?id=9"
    /> */}
              {/* <Script
      url="https://digett.activehosted.com/f/embed.php?id=7"
    />      */}

              <h3>Get the RSS Feed</h3>
              <a href="/rss.xml">
                <i class="fas fa-rss"></i>
              </a>
              <Form>
                <div class="_form_7"></div>
                <h3 className="social-header">Find me on Social Media</h3>
                <div class="social">
                  <a target="_blank" href="https://www.linkedin.com/in/figart">
                    <i class="fab fa-linkedin-in"></i>
                  </a>
                  <a target="_blank" href="https://twitter.com/figart?lang=en">
                    <i class="fab fa-twitter"></i>
                  </a>
                </div>
                <div class="_form_9"></div>
              </Form>
            </div>
          )}
        </Container>
      </Layout>
    );
  }
}

const Page = ({ data }) => {
  const { [0]: post } = data.allContentfulPage.nodes;
  if (post.body !== null) {
    var body = post.body.json;
  } else {
    var body = "";
  }

  return (
    <PagePostTemplate
      title={post.title}
      homePage={post.homePage}
      subTitle={post.subTitle}
      slug={post.fields.slug}
      body={body}
      post={post}
    />
  );
};

Page.propTypes = {
  data: PropTypes.shape({
    allContentfulPage: PropTypes.object
  })
};

export default Page;
