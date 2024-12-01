import { body, checkSchema } from 'express-validator'

// Validate that the email field is not empty
export default checkSchema({
    email: {
        notEmpty: {
            errorMessage: 'Email is required',
        },
        isEmail: {
            errorMessage: 'Email is not valid',
        },
        trim: true,
    },
    firstName: {
        notEmpty: {
            errorMessage: 'First name is required',
        },
        trim: true,
    },
    lastName: {
        notEmpty: {
            errorMessage: 'Last name is required',
        },
        trim: true,
    },
    password: {
        notEmpty: {
            errorMessage: 'Password is required',
        },
        isLength: {
            options: { min: 8 },
            errorMessage: 'Password must be at least 8 characters long',
        },
    },
})
// export default [body('email').notEmpty().withMessage('Email is required')]
