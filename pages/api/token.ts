import { NextApiRequest, NextApiResponse } from "next";
import { setCookie } from "./refresh";

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    setCookie(res, 'accessToken', 'false')
    return res.end(res.getHeader('Set-Cookie'))
}