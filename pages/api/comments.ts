// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { GraphQLClient, gql } from "graphql-request";

type CommentData = {
  createComment: {
    id: string;
  };
};

type ResponseData = {
  success: boolean;
  data?: CommentData;
};

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT as string;
const graphCMSToken = process.env.GRAPHCMS_TOKEN;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }
  try {
    const { name, email, slug, comment } = req.body;
    const graphQLClient = new GraphQLClient(graphqlAPI, {
      headers: {
        authorization: `Bearer ${graphCMSToken}`,
      },
    });

    const query = gql`
      mutation CreateComment(
        $name: String!
        $email: String!
        $comment: String!
        $slug: String!
      ) {
        createComment(
          data: {
            name: $name
            email: $email
            comment: $comment
            post: { connect: { slug: $slug } }
          }
        ) {
          id
        }
      }
    `;
    const result = await graphQLClient.request<CommentData>(query, {
      name: name,
      comment: comment,
      email: email,
      slug: slug,
    });
    res.status(200).send({ success: true, data: result });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ success: false });
  }
}
