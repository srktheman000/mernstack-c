import bcrypt from 'bcrypt'

export class CredentialService {
    async comparePassword(userPassword: string, PasswordHash: string) {
        return await bcrypt.compare(userPassword, PasswordHash)
    }
}
