import type { NextApiRequest, NextApiResponse } from 'next'
import { serialize, CookieSerializeOptions } from 'cookie'

function middleware(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  console.log(req.cookies);
  if (req.cookies.accessToken !== 'true') {
    res.status(401).json({ message: '엑세스토큰이 유효하지 않습니다.' });
  }
}

export default middleware;