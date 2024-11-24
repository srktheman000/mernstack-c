import { Config } from './config'

import app from './app'

const startServer = () => {
    const PORT = Config.PORT
    try {
        app.listen(PORT, () => console.log(`Listening On PORT ${PORT}`))
    } catch (err) {
        console.error(err)
        process.exit()
    }
}

startServer()
