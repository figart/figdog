import React from 'react'
import { Link } from 'gatsby'
import * as variable from 'figdog-theme/src/components/variables'
import styled from 'styled-components'
import { Global, css } from "@emotion/core"
import { BLOCKS, MARKS, INLINES } from "@contentful/rich-text-types"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

const BlogTeaserContainer = styled.div`
    margin: 0px 0px 45px 0px;
    position: relative;

`

const Bold = ({ children }) => <span className="bold">{children}</span>
const Text = ({ children }) => <p className="align-center">{children}</p>

const options = {
    renderMark: {
      [MARKS.BOLD]: text => <Bold>{text}</Bold>,
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
    },
    renderNode: {
        [BLOCKS.EMBEDDED_ASSET]: (node) => {
            const { title, description, file } = node.data.target.fields;
            const mimeType = file['en-US'].contentType
            const mimeGroup = mimeType.split('/')[0]
      
            switch (mimeGroup) {
              case 'image':
                return <img
                  title={ title ? title['en-US'] : null}
                  alt={description ?  description['en-US'] : null}
                  src={file['en-US'].url}
                />
              case 'application':
                return <a
                  alt={description ?  description['en-US'] : null}
                  href={file['en-US'].url}
                  >{ title ? title['en-US'] : file['en-US'].details.fileName }
                </a>
              default:
                return <span style={{backgroundColor: 'red', color: 'white'}}> {mimeType} embedded asset </span>
            }
        }
      },
  }

const BlogTeaser = ({post}) => {

return(
    <BlogTeaserContainer className="blog-teaser">
            <Global
            styles={css`
                .blog-teaser{
                  h2{
                    margin:0px;
                  }
                  .blog-post-date{
                    font-size:20px;
                  }
                    color:${variable.primaryColor};
                    a.blog-teaser-link-title{
                        color:${variable.primaryColor};
                        font-weight:bold;
                        display:block;
                        font-size:28px;
                        text-decoration:none;
                        margin-bottom:10px;
                    }
                    .blog-teaser-date{
                        color:${variable.orange};
                        font-size:16px;
                    }
                    .blog-teaser-body{
                      p{
                        margin:20px 0px;
                      }
                    }
                }
                .dark{
                    color:${variable.lightGray};
                    .blog-teaser{
                        color:${variable.lightGray};
                        a.blog-teaser-link-title{
                            color:white;
                        }
                        a{
                            color:${variable.lightGray};
                        }
                        .blog-teaser-date{
                            color:${variable.lightGray};
                        }
                    }
                }
            `}
            />
        
        <h2>
          <Link className="blog-teaser-link-title" to={post.fields.slug}>
              {post.title}
          </Link>
        </h2>
        <div className="blog-post-date">by {post.author.name} | {post.blogDate} </div>           {post.teaser && <div className="blog-teaser-body">{documentToReactComponents(post.teaser.json, options) }</div>}
        
    
    </BlogTeaserContainer>
)
  }

export default BlogTeaser