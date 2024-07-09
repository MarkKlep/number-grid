import React, { FC, Fragment } from 'react';
import { Alert } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { regSchema } from '../utilities/validationSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import './../styles/form.scss';

type Inputs = {
    name: string,
    email: string,
    password: string,
    confirmPassword: string
}

const initialValues: Inputs = {
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
}

const formFields: readonly (keyof Inputs)[] = ["name", "email", "password", "confirmPassword"];

type FormData = yup.InferType<typeof regSchema>;

export const RegForm: FC = () => {

    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
        resolver: yupResolver(regSchema),
        mode: "onBlur",
        defaultValues: initialValues,
    });

    const onSubmit: SubmitHandler<FormData> = (data) => {
        console.log(data);
        reset(initialValues);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
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
                        { errors[field] && <Alert severity="error">{errors[field]?.message}</Alert> }
                    </Fragment>
                ))
            }

            <input type="submit" value="Submit" />
        </form>
    )
}
