export interface Post {
  node: {
    id: string;
    authors: {
      bio: string;
      name: string;
      id: string;
      photo: {
        url: string;
      };
    }[];
    createdAt: string;
    slug: string;
    title: string;
    excerpt: string;
    featuredImage: {
      url: string;
    };
    categories: {
      name: string;
      slug: string;
    }[];
  };
}

export interface RelatedPostsQueryResult {
  posts: RelatedPosts[];
}
export interface RelatedPosts {
  id: string;
  title: string;
  featuredImage: {
    url: string;
  };
  createdAt: string;
  slug: string;
}
export interface SimilarPostsQueryResult {
  posts: SimilarPosts[];
}
export interface SimilarPosts {
  id: string;
  title: string;
  featuredImage: {
    url: string;
  };
  createdAt: string;
  slug: string;
}
export interface CategoriesQueryResult {
  categories: Categories[];
}
export interface Categories {
  name: string;
  slug: string;
}

interface Author {
  bio: string;
  name: string;
  id: string;
  photo: {
    url: string;
  };
}

interface Category {
  name: string;
  slug: string;
}

interface PostEdge {
  node: {
    authors: Author[];
    createdAt: string;
    slug: string;
    title: string;
    excerpt: string;
    featuredImage: {
      url: string;
    };
    categories: Category[];
  };
}

interface PostsConnection {
  edges: PostEdge[];
}

export interface QueryResult {
  postsConnection: PostsConnection;
}

interface Author {
  bio: string;
  name: string;
  id: string;
  photo: {
    url: string;
  };
}

interface Category {
  name: string;
  slug: string;
}

export interface PostDetails {
  id: string;
  author: Author;
  createdAt: string;
  slug: string;
  title: string;
  excerpt: string;
  featuredImage: {
    url: string;
  };
  categories: Category[];
  content: {
    raw: Record<string, any>[];
  };
}

export interface PostDetailsQueryResult {
  post: PostDetails;
}
