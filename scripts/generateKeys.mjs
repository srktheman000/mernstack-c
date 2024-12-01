import crypto from 'crypto'
import fs from 'fs'
import path from 'path'

// Configurable parameters
const certsDir = process.env.CERTS_DIR || 'certs'

try {
    // Generate RSA key pair
    const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048,
        publicKeyEncoding: {
            type: 'pkcs1',
            format: 'pem',
        },
        privateKeyEncoding: {
            type: 'pkcs1',
            format: 'pem',
        },
    })

    console.log('Keys generated successfully.')

    // Ensure the directory exists before writing files
    if (!fs.existsSync(certsDir)) {
        fs.mkdirSync(certsDir)
    }

    // File paths
    const privateKeyPath = path.join(certsDir, 'private.pem')
    const publicKeyPath = path.join(certsDir, 'public.pem')

    // Write keys to files
    fs.writeFileSync(privateKeyPath, privateKey, { encoding: 'utf-8' })
    fs.writeFileSync(publicKeyPath, publicKey, { encoding: 'utf-8' })

    logger
} catch (error) {
    console.error('An error occurred:', error.message)
}
