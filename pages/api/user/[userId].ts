import type { NextApiRequest, NextApiResponse } from "next";
import { getUserData } from "../../../lib/firebase/get_user_data";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case "GET":
      try {
        const userData = await getUserData(id as string);
        if (!userData) {
          res.status(404).json({ message: "User not found" });
        } else {
          res.status(200).json(userData);
        }
      } catch (error: unknown) {
        res
          .status(500)
          .json({ message: "Error fetching user data", error: error });
      }
      break;

    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
