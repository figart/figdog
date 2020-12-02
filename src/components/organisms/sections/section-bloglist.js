import React from "react"
import styled from "styled-components"
import { StaticQuery, graphql } from 'gatsby'
import BlogTeaser from "../../entities/blog/blog-teaser"

const BlogListStyle = styled.section`

  margin-top:30px;

`;



export const BlogList = () => (
  <StaticQuery
    query={graphql`
        query EntityQyery {
            blogs: allContentfulBlog(
              filter: {node_locale: {eq: "en-US"}}
              sort: {
                fields: blogDate
                order: DESC
              }
              ) 
              {
                nodes {
                    id
                fields{
                    slug
                }
                author{
                  name
                  id  
                }
                title
                blogDate(formatString: "ddd, MMM D, Y")
                teaser{
                  json
                }
            }
        }
    }
    `}

  render={data => (
      
    <>
    <BlogListStyle className="blog-list-container">
    {data.blogs.nodes.map((post, index) => (
      
      <BlogTeaser
      
      key={index}
      post={post}
      >
      </BlogTeaser>
    ))}
    </BlogListStyle>
</>
    )}
  />

)

export default BlogList