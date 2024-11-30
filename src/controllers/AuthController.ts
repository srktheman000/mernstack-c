import { RegisterUserRequest } from '../types'
import { Response } from 'express'

import { UserService } from '../services/UserService'

export class AuthController {
    constructor(private userService: UserService) {}
    async register(req: RegisterUserRequest, res: Response) {
        const { firstName, lastName, email, password } = req.body
        await this.userService.create({ firstName, lastName, email, password })
        res.send(201).json()
    }
}
