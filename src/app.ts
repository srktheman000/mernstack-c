import 'reflect-metadata'

import express, { Response, Request, NextFunction } from 'express'
import logger from './config/logger'
import { HttpError } from 'http-errors'
import { authRouter } from './routes'

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Welcome to Auth service')
})

app.use('/auth', authRouter)

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
