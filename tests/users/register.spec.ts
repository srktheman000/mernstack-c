import app from '../../src/app'
import request from 'supertest'

describe('POST /auth/register', () => {
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

            //Asset application/json utf-8
            expect(response.headers['content-type']).toEqual(
                expect.stringContaining('json'),
            )
        })
    })

    describe.skip('When required fields are missing', () => {
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

    describe.skip('When email is already registered', () => {
        it('should return 409 status code', async () => {
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
            expect(response.statusCode).toBe(409)
            expect(response.body).toMatchObject({
                error: 'Email is already registered',
            })
        })
    })
})
