import { checkSchema } from 'express-validator'

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
    password: {
        notEmpty: {
            errorMessage: 'Password is required',
        },
    },
})
