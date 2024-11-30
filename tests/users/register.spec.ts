import app from '../../src/app'
import request from 'supertest'
import { User } from '../../src/entity/User'
import { DataSource } from 'typeorm'
import { AppDataSource } from '../../src/config/data-source'
import { truncateTables } from '../utils/index'

describe('POST /auth/register', () => {
    let connection: DataSource

    beforeAll(async () => {
        connection = await AppDataSource.initialize()
    })

    beforeEach(async () => {
        // Truncate all tables before each test
        await truncateTables(connection)
    })

    afterAll(async () => {
        // Ensure the connection is properly closed
        await connection.destroy()
    })

    describe('Given all required fields', () => {
        it('should return 201 status code', async () => {
            // Arrange
            const userData = {
                firstName: 'Sohan',
                lastName: 'Kinage',
                email: 'sohankinage99@gmail.com',
                password: 'secret',
            }

            // Act
            const response = await request(app)
                .post('/auth/register')
                .send(userData)

            // Assert
            expect(response.statusCode).toBe(201)
            expect(response.headers['content-type']).toEqual(
                expect.stringContaining('application/json'),
            )
        })

        it('should persist the user in the database', async () => {
            // Arrange
            const userData = {
                firstName: 'Sohan',
                lastName: 'Kinage',
                email: 'sohankinage99@gmail.com',
                password: 'secret',
            }

            // Act
            await request(app).post('/auth/register').send(userData)

            // Assert
            const userRepository = connection.getRepository(User)
            const users = await userRepository.find()
            expect(users).toHaveLength(1)
            expect(users[0]).toMatchObject({
                firstName: 'Sohan',
                lastName: 'Kinage',
                email: 'sohankinage99@gmail.com',
            })
        })
    })

    describe('When required fields are missing', () => {
        it('should return 400 status code', async () => {
            // Arrange
            const incompleteUserData = {
                firstName: 'Sohan',
                email: 'sohankinage99@gmail.com',
            }

            // Act
            const response = await request(app)
                .post('/auth/register')
                .send(incompleteUserData)

            // Assert
            expect(response.statusCode).toBe(400)
            expect(response.body).toMatchObject({
                error: 'All fields are required',
            })
        })
    })

    describe('When email is already registered', () => {
        it('should return 409 status code', async () => {
            // Arrange
            const userData = {
                firstName: 'Sohan',
                lastName: 'Kinage',
                email: 'sohankinage99@gmail.com',
                password: 'secret',
            }

            // First registration
            await request(app).post('/auth/register').send(userData)

            // Act: Attempt to register the same email again
            const response = await request(app)
                .post('/auth/register')
                .send(userData)

            // Assert
            expect(response.statusCode).toBe(409)
            expect(response.body).toMatchObject({
                error: 'Email is already registered',
            })
        })
    })
})
