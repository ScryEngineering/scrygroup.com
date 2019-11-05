import React from "react";
import HelmetWrapper from "../components/HelmetWrapper/HelmetWrapper";

import PostTags from "../components/PostTags/PostTags";
import ContactSnippet from "../components/ContactSnippet/ContactSnippet";

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  console.log(data)
  console.log("I'm alive")
  const post = data.markdownRemark; // data.markdownRemark holds our post data
  const postHasTags = post.frontmatter.tags !== null && post.frontmatter.tags.length > 0
  const postHasCallToAction = post.frontmatter.hideCallToAction === null || post.frontmatter.hideCallToAction !== true
  const postHasCallToActionText = post.frontmatter.callToActionText !== null
  return (
    <div className="post-container">
      <HelmetWrapper title={post.frontmatter.title} />
      <div className="post">
        <h1>{post.frontmatter.title}</h1>
        <h2>by {post.frontmatter.author} on {post.frontmatter.date}</h2>
        <div
          className="post-content"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
        { postHasTags &&
          <PostTags tags={post.frontmatter.tags} />
        }
        {
          postHasCallToAction &&
            (
              postHasCallToActionText ?
              <ContactSnippet source={post.fields.slug} blurb={post.frontmatter.callToActionText} />
              :
              <ContactSnippet source={post.fields.slug} />
            )
        }
      </div>
    </div>
  );
}

export const query = graphql`
  query PostQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "DD MMMM, YYYY")
        title
        tags
        author
        draft
        callToActionText
        hideCallToAction
      }
      fields {
        slug
      }
    }
  }
`;
