import createHttpError from 'http-errors'
import bcrypt from 'bcrypt'

import { Repository } from 'typeorm'
import { UserData } from '../types'
import { Roles } from '../constants'
import { User } from '../entity/User'
export class UserService {
    constructor(private userRepository: Repository<User>) {}

    async create({ firstName, lastName, email, password }: UserData) {
        // check if user exist
        const user = await this.userRepository.findOne({ where: { email } })

        if (user) {
            const err = createHttpError(400, 'Email is already exist')
            throw err
        }
        // Hashpassword
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

    async findByEmail(email: string) {
        return this.userRepository.findOne({
            where: {
                email,
            },
        })
    }
}
