import React, { useState, FC, Fragment } from 'react';
import { Alert } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { regSchema } from '../utilities/validationSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { API_URL } from '../constants';
import './../styles/form.scss';

type FormData = yup.InferType<typeof regSchema>;

const initialValues: FormData = {
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
}

const formFields: readonly (keyof FormData)[] = ["name", "email", "password", "confirmPassword"];

export const RegForm: FC = () => {

    const [fillingFormLine, setFillingFormLine] = useState<number>(0);
    const [registrationStatus, setRegistrationStatus] = useState<{message: string, isError: boolean} | null>(null);

    const { register, handleSubmit, getValues, formState: { errors, isSubmitting }, reset } = useForm<FormData>({
        resolver: yupResolver(regSchema),
        mode: "onBlur",
        defaultValues: initialValues,
    });

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            const response = await axios.post(`${API_URL}/reg-user`, data);
            
            if (response.status === 201 && response.data) {
                setRegistrationStatus({message: response.data, isError: false});
            }
            else {
                new Error("Registration failed");
            }

        } catch (error) {
            setRegistrationStatus({message: String(error), isError: true});
        }

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
                                {...register(field as keyof FormData)}
                                placeholder={field + "..."}
                                aria-invalid={errors[field] ? "true" : "false"}
                            />
                        </label>
                        { (errors[field] && getValues(field) ) && <Alert severity="error">{errors[field]?.message}</Alert> }
                    </Fragment>
                ))
            }

            <div className="progress-bar">
                <div className="progress" style={{ width: `${fillingFormLine}%` }}></div>
            </div>

            <button disabled={isSubmitting} type="submit" className={isSubmitting ? 'btn-disabled' : 'btn-submit'} >
                {isSubmitting ? "Loading" : "Submit"}
            </button>
            {
                registrationStatus && <Alert severity={registrationStatus.isError ? "error" : "success"}>
                    {registrationStatus.message}
                </Alert>
            }
        </form>
    )
}
