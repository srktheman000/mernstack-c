import { body, checkSchema } from 'express-validator'

// Validate that the email field is not empty
export default checkSchema({
    email: {
        notEmpty: true,
        errorMessage: 'Eamil is required',
    },
})

// export default [body('email').notEmpty().withMessage('Email is required')]
