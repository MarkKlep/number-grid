import React, { useState, FC, Fragment } from 'react';
import { Alert } from '@mui/material';
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import './../styles/form.scss';

type Inputs = {
    name: string,
    email: string,
    password: string,
    confirmPassword: string
}

const formFields: readonly (keyof Inputs)[] = ["name", "email", "password", "confirmPassword"];

const schema = yup.object({
    name: yup.string().required().min(3),
    email: yup.string().required().matches(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/),
    password: yup.string().required().matches(/^[A-Za-z](?=.*\d)(?=.*[!@#$%^&*;])[A-Za-z\d!@#$%^&*;]{8,16}$/),
    confirmPassword: yup.string().oneOf([yup.ref("password")])
});
type FormData = yup.InferType<typeof schema>;

export const RegForm: FC = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(schema)
    });

    const onSubmit: SubmitHandler<FormData> = (data) => {
        console.log(data);
    }

    const onError: SubmitErrorHandler<FormData> = (errors) => {
        console.log(errors);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit, onError)}>
            {
                formFields.map((field, index) => (
                    <Fragment key={index} >
                        <label>
                            {
                                field.charAt(0).toUpperCase() + field.slice(1)
                            }
                            <input 
                                type={field === "password" || field === "confirmPassword" ? "password" : "text"}
                                {...register(field as keyof Inputs)}
                                aria-invalid={errors[field] ? "true" : "false"}
                            />
                        </label>
                        <Alert severity="error" sx={{ display: errors[field] ? "block" : "none" }}>
                            {errors[field]?.message}
                        </Alert>
                    </Fragment>
                ))
            }

            <div>
                <input type="reset" value="Reset" />
                <input type="submit" value="Submit" />
            </div>
        </form>
    )
}
