import 'reflect-metadata'

import express, { Response, Request, NextFunction, Express } from 'express'
import logger from './config/logger'
import { HttpError } from 'http-errors'
import { authRouter, userRouter } from './routes'
import cookieParser from 'cookie-parser'

const app: Express = express()

app.use(cookieParser())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Welcome to Auth service')
})

app.use('/auth', authRouter)
app.use('/users', userRouter)

app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
    logger.error(err.message)
    const statusCode = err.statusCode || 500
    res.status(statusCode).json({
        errors: [
            {
                type: err.name,
                msg: err.message,
                path: '',
                location: '',
            },
        ],
    })
})

export default app
