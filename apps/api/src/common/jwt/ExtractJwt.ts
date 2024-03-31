import { Request } from 'express'

export const fromCookie = function () {
  return (req: Request) => {
    let jwt = null

    if (req && req.cookies) {
      jwt = req.cookies['access_token']
    }

    return jwt
  }
}

export const ExtractJwt = { fromCookie }
