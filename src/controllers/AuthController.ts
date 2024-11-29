import { Request, Response } from 'express'

export class AuthController {
    register(req: Request, res: Response) {
        res.send(201).json()
    }
}
