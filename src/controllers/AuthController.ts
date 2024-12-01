import { RegisterUserRequest } from '../types'
import { NextFunction, Response } from 'express'
import { JwtPayload } from 'jsonwebtoken'
import { Logger } from 'winston'
import { validationResult } from 'express-validator'
import { AppDataSource } from '../config/data-source'
import { RefreshToken } from '../entity/RefreshToken'
import { TokenService, UserService } from '../services'

export class AuthController {
    constructor(
        private userService: UserService,
        private logger: Logger,
        private tokenService: TokenService,
    ) {}
    async register(
        req: RegisterUserRequest,
        res: Response,
        next: NextFunction,
    ) {
        const { firstName, lastName, email, password } = req.body

        const result = validationResult(req)

        if (!result.isEmpty()) {
            return res.status(400).json({ errors: result.array() })
        }

        this.logger.debug('New request to register a user', {
            firstName,
            lastName,
            email,
            password: '******',
        })
        try {
            const user = await this.userService.create({
                firstName,
                lastName,
                email,
                password,
            })

            this.logger.info('User has been registrered', { id: user.id })

            const payload: JwtPayload = {
                sub: String(user.id),
                role: user.role,
            }

            const accessToken = this.tokenService.generateAccessToken(payload)
            //persist referhs token

            const MS_IN_YEAR = 1000 * 60 * 60 * 24 * 365

            const refreshTokenRepository =
                AppDataSource.getRepository(RefreshToken)

            const newRefreshToken = await refreshTokenRepository.save({
                user: user,
                expiresAt: new Date(Date.now() + MS_IN_YEAR),
            })

            const refreshToken = this.tokenService.generateRefershToken({
                ...payload,
                id: String(newRefreshToken.id),
            })

            res.cookie('accessToken', accessToken, {
                domain: 'localhost',
                sameSite: 'strict',
                maxAge: 1000 * 60 * 60, //one hour
                httpOnly: true, //important
            })

            res.cookie('refreshToken', refreshToken, {
                domain: 'localhost',
                sameSite: 'strict',
                maxAge: 1000 * 60 * 60 * 24 * 365, //one hour
                httpOnly: true, //important
            })
            res.send(201).json({ id: user.id })
        } catch (err) {
            next(err)
            return
        }
    }
}
