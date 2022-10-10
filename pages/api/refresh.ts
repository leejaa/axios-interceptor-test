// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { serialize, CookieSerializeOptions } from 'cookie'

export const setCookie = (
  res: NextApiResponse,
  name: string,
  value: unknown,
  options: CookieSerializeOptions = {}
) => {
  const stringValue =
    typeof value === 'object' ? 'j:' + JSON.stringify(value) : String(value)

  if (typeof options.maxAge === 'number') {
    options.expires = new Date(Date.now() + options.maxAge * 1000)
  }

  res.setHeader('Set-Cookie', serialize(name, stringValue, options))
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const refreshToken = req.body.refreshToken;
  if (refreshToken === 'true') {
    setCookie(res, 'accessToken', 'true')
    return res.end(res.getHeader('Set-Cookie'))
  } else {
    return res.status(500).json({ message: '리프레스토큰이 유효하지 않습니다.' })
  }
}
