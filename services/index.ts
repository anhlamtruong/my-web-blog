import { request, gql } from "graphql-request";
import {
  CategoriesQueryResult,
  RelatedPostsQueryResult,
  SimilarPostsQueryResult,
  QueryResult,
  PostDetailsQueryResult,
} from "../interface";
const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT as string;

export const getPosts = async () => {
  const query = gql`
    query MyQuery {
      postsConnection {
        edges {
          node {
            id
            authors {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;
  const result = await request<QueryResult>(graphqlAPI, query);
  return result.postsConnection.edges;
};
export const getPostsDetails = async (slug: string) => {
  const query = gql`
    query GetPostsDetails($slug: String!) {
      post(where: { slug: $slug }) {
        id
        authors {
          bio
          name
          id
          photo {
            url
          }
        }
        createdAt
        slug
        title
        excerpt
        featuredImage {
          url
        }
        categories {
          name
          slug
        }
        content {
          raw
        }
      }
    }
  `;
  const result = await request<PostDetailsQueryResult>(graphqlAPI, query, {
    slug,
  });
  return result.post;
};

export const getRecentPosts = async () => {
  const query = gql`
    query GetPostDetails {
      posts(orderBy: createdAt_ASC, last: 3) {
        id
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;
  const result = await request<RelatedPostsQueryResult>(graphqlAPI, query);
  return result.posts;
};
export const getSimilarPosts = async (categories: string[], slug: string) => {
  const query = gql`
    query GetPostDetails($slug: String!, $categories: [String]) {
      posts(
        where: {
          slug_not: $slug
          AND: { categories_some: { slug_in: $categories } }
        }
        last: 3
      ) {
        id
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;
  const result = await request<SimilarPostsQueryResult>(graphqlAPI, query, {
    slug,
    categories,
  });
  return result.posts;
};
export const getCategories = async () => {
  const query = gql`
    query GetCategories {
      categories {
        name
        slug
      }
    }
  `;
  const result = await request<CategoriesQueryResult>(graphqlAPI, query);
  return result.categories;
};
