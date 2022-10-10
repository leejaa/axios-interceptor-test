import { NextApiRequest, NextApiResponse } from "next";
import middleware from "../../utils/middleware";

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    middleware(req, res);
    return res.status(200).json({ name: 'TEST2' })
  }
