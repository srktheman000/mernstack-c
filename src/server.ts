import { Config } from './config'

import app from './app'
import logger from './config/logger'
import { AppDataSource } from './config/data-source'

const startServer = async () => {
    const PORT = Config.PORT
    try {
        await AppDataSource.initialize()
        logger.info('Database Connected Successfully')
        app.listen(PORT, () => logger.info('Listening On port', { port: PORT }))
    } catch (err: any) {
        logger.error(err.message)
        process.exit()
    }
}

startServer()
