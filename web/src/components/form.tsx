import React, { useState } from 'react'
import './../styles/form.scss'

type FormObj = {
    name: string,
    password: string
}

const initFormObj = {
    name: '',
    password: ''
}

export const Form = () => {

    const [formObj, setFormObj] = useState(initFormObj);

    const handleFormObj = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormObj({
            ...formObj,
            [event.target.name]: event.target.value
        });
    }

    const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        if(formObj.name === '' || formObj.password === '') {
            alert('Please fill all fields');
            return;
        }
    }

    const handleResetForm = () => {
        setFormObj(initFormObj);
    }

    return (
        <form onSubmit={handleSubmitForm} onReset={handleResetForm} >
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
