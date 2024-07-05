import React, { useState, FC } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form';
import './../styles/form.scss'

type Inputs = {
    name: string,
    password: string
}

export const AuthoForm: FC<void> = () => {
    const { register, handleSubmit } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = data => {
        console.log(data);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} >  
            <div>
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
            </div>

            <div>
                <input type="reset" value="Reset" />
                <input type="submit" value="Submit" />
            </div>
        </form>
    )
}
