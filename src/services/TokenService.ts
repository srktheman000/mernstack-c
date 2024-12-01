import { JwtPayload, sign } from 'jsonwebtoken'
import fs from 'fs'
import path from 'path'
import createHttpError from 'http-errors'
import { Config } from '../config'

export class TokenService {
    generateAccessToken(payload: JwtPayload) {
        let privateKey: Buffer

        try {
            privateKey = fs.readFileSync(
                path.join(__dirname, '../../certs/private.pem'),
            )
        } catch (err) {
            const error = createHttpError(
                500,
                'Error while reading a private key',
            )
            throw error
        }

        const accessToken = sign(payload, privateKey, {
            algorithm: 'RS256',
            expiresIn: '1h',
            issuer: 'auth-service',
        })

        return accessToken
    }

    generateRefershToken(payload: JwtPayload) {
        const refreshToken = sign(payload, Config.REFRESH_TOKEN_SECRET!, {
            algorithm: 'HS256',
            expiresIn: '1y',
            issuer: 'auth-service',
            jwtid: payload.id,
        })
        return refreshToken
    }
}
