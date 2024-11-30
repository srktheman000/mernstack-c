import createHttpError from 'http-errors'
import bcrypt from 'bcrypt'

import { Repository } from 'typeorm'
import { UserData } from '../types'
import { Roles } from '../constants'
import { User } from '../entity/User'
export class UserService {
    constructor(private userRepository: Repository<User>) {}

    async create({ firstName, lastName, email, password }: UserData) {
        const saltRounds = 10
        const hashedPassword = await bcrypt.hash(password, saltRounds)
        try {
            return await this.userRepository.save({
                firstName,
                lastName,
                email,
                password: hashedPassword,
                role: Roles.CUSTOMER,
            })
        } catch (err) {
            const error = createHttpError(
                500,
                'Failed To store data in database',
            )
            throw error
        }
    }
}
