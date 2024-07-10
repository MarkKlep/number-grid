import * as yup from 'yup';

export const regSchema = yup.object({
    name: yup.string().required().min(4),
    email: yup.string().required().email("Invalid email"),
    password: yup.string().required()
    .min(8, "Password must be at least 8 characters").max(20, "Password must be at most 20 characters")
    .test('has-letter', 'Password must contain at least one letter', value => /[a-z]/.test(value))
    .test('has-upper-case', 'Password must contain at least one upper case letter', value => /[A-Z]/.test(value))
    .test('has-number', 'Password must contain at least one number', value => /\d/.test(value))
    .test('has-special-char', 'Password must contain at least one special character', value => /[!@#$%^&*;]/.test(value))
    .test('has-no-space', 'Password must not contain spaces', value => !/\s/.test(value))
    .test('password must start with a letter', 'Password must start with a letter', value => /^[a-zA-Z]/.test(value)),
    confirmPassword: yup.string().oneOf([yup.ref("password")], "Passwords must match")
});

export const authoSchema = yup.object({
    name: yup.string().required(),
    password: yup.string().required()
});