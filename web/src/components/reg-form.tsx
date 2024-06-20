import React, { useState } from 'react'
import './../styles/form.scss'

type FormObj = {
    name: string,
    email: string,
    password: string,
    confirmPassword: string
}

const initFormObj: FormObj = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
}

export const RegForm = () => {

    const [formObj, setFormObj] = useState(initFormObj);

    const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    }

    const handleResetForm = () => {
        setFormObj(initFormObj);
    }

    const handleFormObj = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormObj({
            ...formObj,
            [event.target.name]: event.target.value
        });
    }

    return (
        <form onSubmit={handleSubmitForm} onReset={handleResetForm}>
            {
                Object.keys(initFormObj).map((key, index) => {
                    return (
                        <label key={index}>
                            {key.charAt(0).toUpperCase() + key.slice(1)}:
                            <input type="text" name={key} onChange={handleFormObj} value={formObj[key as keyof FormObj]} />
                        </label>
                    )
                })
            }

            <div>
                <input type="reset" value="Reset" />
                <input type="submit" value="Submit" />
            </div>
        </form>
    )
}
