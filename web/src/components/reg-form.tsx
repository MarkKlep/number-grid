import React, { useState, FC } from 'react';
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import './../styles/form.scss';

type Inputs = {
    name: string,
    email: string,
    password: string,
    confirmPassword: string
}

const formFields: readonly (keyof Inputs)[] = ["name", "email", "password", "confirmPassword"];

const initialFormState: Inputs = {
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
}

export const RegForm: FC = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
        defaultValues: initialFormState
    });

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log(data);
    }

    const onError: SubmitErrorHandler<Inputs> = (errors) => {
        console.log(errors);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit, onError)}>
            {
                formFields.map((field, index) => (
                    <label key={index}>
                        {
                            field.charAt(0).toUpperCase() + field.slice(1)
                        }
                        <input 
                            type={field === "password" || field === "confirmPassword" ? "password" : "text"}
                            {...register(field as keyof Inputs, { 
                                required: true,
                                minLength: field === "password" || field === "confirmPassword" ? 6 : 3,
                                pattern: field === "email" ? /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/ : undefined,
                                // validate: field === "confirmPassword" ? (value) => value === "password" : undefined

                            })}
                            aria-invalid={errors[field] ? "true" : "false"}
                        />
                    </label>
                ))
            }

            <div>
                <input type="reset" value="Reset" />
                <input type="submit" value="Submit" />
            </div>
        </form>
    )
}
