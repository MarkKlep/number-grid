import React, { FC, Fragment } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { authoSchema } from '../utilities/validationSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Box, Button } from '@mui/material';
import './../styles/form.scss'

type Inputs = {
    name: string,
    password: string
}

const formFields: readonly (keyof Inputs)[] = ["name", "password"];

const initialValues: Inputs = {
    name: "",
    password: ""
}

export const AuthoForm: FC = () => {
    const { register, handleSubmit, formState: { errors, isSubmitSuccessful }, reset } = useForm<Inputs>({
        resolver: yupResolver(authoSchema),
        defaultValues: initialValues,
        mode: "onBlur",
    });

    const navigate = useNavigate()

    const onSubmit: SubmitHandler<Inputs> = data => {
        
        reset(initialValues);
    }

    const handleEnter = () => {
        navigate('/dashboard');
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} >  
            {
                formFields.map((field, index) => (
                    <Fragment key={index}>
                        <label>
                            {
                                field.charAt(0).toUpperCase() + field.slice(1)
                            }
                            <input type={field === 'password' ? 'password' : 'text'} {...register(field)} />
                        </label>
                        { errors[field] && <Alert severity="error">{errors[field]?.message}</Alert> }
                    </Fragment>
                ))
            }

            <Button 
                sx={{width: '100%', mt: '1rem'}}
                type="submit"
                variant='contained'
                color="primary"
            >
                Submit
            </Button>

            { isSubmitSuccessful && 
            (
                <Box
                    justifyContent={"center"}
                >
                    <Alert sx={{m: '1.5rem'}} severity="success">
                        Login successful
                    </Alert>

                    <Button
                        onClick={handleEnter}
                        variant='contained'
                        color='secondary'
                    >
                        Enter
                    </Button>
                </Box>
            )}
        </form>
    )
}
