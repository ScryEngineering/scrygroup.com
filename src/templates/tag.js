import React from "react";
import { graphql } from 'gatsby'
import HelmetWrapper from "../components/HelmetWrapper/HelmetWrapper";

import Masthead from '../components/Masthead/Masthead'
import PostListing from "../components/PostListing/PostListing";

import Layout from '../components/Layout/Layout'

export default class TagTemplate extends React.Component {
  render(){
    console.log(this.props)
    const tag = this.props.pageContext.tag;
    const tag_summary = this.props.data.tag_summary;
    //TODO: Note that if more than one entry for a tags has the exact same name this will take only the first and not warn
    //TODO: Warn about duplicates somewhere
    const data = tag_summary.edges[0].node;
    return (
      <Layout location={this.props.location}>
        <HelmetWrapper title={tag + " posts"} />
        <Masthead heading={"Posts tagged with \"" + tag + "\""} />
        <div className="contentdiv">
          {data.html !== "" &&
          <div className="tagSummary" dangerouslySetInnerHTML={{ __html: data.html }}></div>
          }
          <PostListing postEdges={this.props.data.allMarkdownRemark.edges} allAuthorsInfo={this.props.data.authors.edges} />
        </div>
      </Layout>
    );
  }
}

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query TagPage($tag: String) {
    # authors
    authors: allMarkdownRemark (filter: { fields: { isPerson: { eq: true } } }) {
      edges {
        node {
          frontmatter {
            name
            image
            url
            bio
            location
            socialUrls
          }
          fields {
            internalURL
          }
        }
      }
    }
    tag_summary: allMarkdownRemark(
      filter: { 
        fields: {isTag: {eq: true}}
        frontmatter: {
          name: {eq: $tag}
        }
      }) {
      edges {
        node {
          html
          frontmatter {
            name
          }
        }
      }
    }
    allMarkdownRemark (
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        fields: {isPost: { eq: true } }
        frontmatter: {
          draft: { ne: true }
          tags: { in: [$tag] }
        }
      }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          excerpt
          timeToRead
          frontmatter {
            title
            tags
            date(formatString: "MMMM Do, YYYY")
            authors
            draft
          }
        }
      }
    }
  }
`;