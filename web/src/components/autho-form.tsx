import React, { useState, FC } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form';
import './../styles/form.scss'

type AuthoForm = {
    name: string,
    password: string
}

const initFormObj = {
    name: '',
    password: ''
}

export const AuthoForm: FC = () => {
    const { register, handleSubmit } = useForm<AuthoForm>();

    const [formObj, setFormObj] = useState(initFormObj);

    const onSubmit: SubmitHandler<AuthoForm> = data => {
        console.log(data);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} >
            
            <div>
                <label>
                    Name
                    <input type="text" />
                </label>

                <label>
                    Password
                    <input type="password" />
                </label>
            </div>

            <div>
                <input type="reset" value="Reset" />
                <input type="submit" value="Submit" />
            </div>
        </form>
    )
}
