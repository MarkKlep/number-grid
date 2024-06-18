import React, { useState } from 'react'
import '../../styles/form.scss'

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
            <label>
                Name:
                <input type="text" name="name" onChange={handleFormObj} value={formObj.name} />
            </label>
            <label>
                Password:
                <input type="text" name="password" onChange={handleFormObj} value={formObj.password} />
            </label>

            <div>
                <input type="reset" value="Reset" />
                <input type="submit" value="Submit" />
            </div>
        </form>
    )
}
