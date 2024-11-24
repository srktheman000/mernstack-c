import { Config } from './config'

import app from './app'
import logger from './config/logger'

const startServer = () => {
    const PORT = Config.PORT
    try {
        logger.info('Listening on port', { port: PORT }),
            logger.error('Listening On port', { port: PORT }),
            app.listen(PORT, () =>
                logger.info('Listening On port', { port: PORT }),
            )
    } catch (err) {
        console.error(err)
        process.exit()
    }
}

startServer()
