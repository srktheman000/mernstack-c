import express, {
    Request,
    Response,
    NextFunction,
    RequestHandler,
} from 'express'
import { AuthController } from '../controllers/AuthController'
import { AppDataSource } from '../config/data-source'
import { User } from '../entity/User'
import logger from '../config/logger'
import { CredentialService, TokenService, UserService } from '../services'
import { RefreshToken } from '../entity/RefreshToken'
import { loginValidator, registerValidator } from '../validators'
import authenticate from '../middlewares/authenticate'
import { AuthRequest } from '../types'

const router = express.Router()

const userRepository = AppDataSource.getRepository(User)
const refreshTokenRepository = AppDataSource.getRepository(RefreshToken)

const userService = new UserService(userRepository)
const tokenService = new TokenService(refreshTokenRepository)
const credentialService = new CredentialService()

const authController = new AuthController(
    userService,
    logger,
    tokenService,
    credentialService,
)

router.post(
    '/register',
    registerValidator,
    (req: Request, res: Response, next: NextFunction) => {
        authController.register(req, res, next)
    },
)

router.post(
    '/login',
    loginValidator,
    (req: Request, res: Response, next: NextFunction) => {
        authController.login(req, res, next)
    },
)

router.get(
    '/self',
    authenticate as RequestHandler,
    (req: Request, res: Response) =>
        authController.self(req as AuthRequest, res),
)
export default router
