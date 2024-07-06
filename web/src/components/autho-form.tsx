import React, { useState, FC } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import './../styles/form.scss'

type Inputs = {
    name: string,
    password: string
}

export const AuthoForm: FC = () => {
    const { register, handleSubmit } = useForm<Inputs>();

    const navigate = useNavigate()

    const onSubmit: SubmitHandler<Inputs> = data => {
        navigate('/single-play');
        console.log(data);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} >  
            <label>
                Name
                <input 
                    type="text"
                    {...register("name", { required: true })}
                />
            </label>

            <label>
                Password
                <input 
                    type="password" 
                    {...register("password", { required: true })}
                />
            </label>

        
            <input type="reset" value="Reset" />
            <input type="submit" value="Submit" />
        </form>
    )
}
