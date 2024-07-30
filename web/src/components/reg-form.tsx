import { useState, useEffect, FC } from 'react';
import { Alert, InputAdornment, TextField } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { regSchema } from '../utilities/validationSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { API_URL } from '../constants';
import { styled } from '@mui/material/styles';
import './../styles/form.scss';

type FormData = yup.InferType<typeof regSchema>;

const initialValues: FormData = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
};

const formFields: readonly (keyof FormData)[] = [
    'name',
    'email',
    'password',
    'confirmPassword',
];

const CustomTextField = styled(TextField)(({ theme }) => ({
    width: 'calc(100% - 20px)',
    margin: '1.5rem 0',
}));

export const RegForm: FC = () => {
    const [fillingFormLine, setFillingFormLine] = useState<number>(0);
    const [registrationStatus, setRegistrationStatus] = useState<{
        message: string;
        isError: boolean;
    } | null>(null);

    const {
        register,
        handleSubmit,
        getValues,
        watch,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<FormData>({
        resolver: yupResolver(regSchema),
        mode: 'onChange',
        defaultValues: initialValues,
    });

    const watchFormFields = watch();

    useEffect(() => {
        const doneFields = Object.entries(watchFormFields).filter(
            ([field, value]) =>
                value.trim().length && !errors[field as keyof FormData]
        ).length;
        setFillingFormLine((doneFields / formFields.length) * 100);
    }, [watchFormFields]);

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            const response = await axios.post(`${API_URL}/reg-user`, data);

            if (response.status === 201 && response.data) {
                setRegistrationStatus({
                    message: response.data,
                    isError: false,
                });
            } else {
                new Error('Registration failed');
            }
        } catch (error) {
            setRegistrationStatus({ message: String(error), isError: true });
        }

        reset(initialValues);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {formFields.map((field) => (
                <CustomTextField
                    key={field}
                    type={
                        field === 'password' || field === 'confirmPassword'
                            ? 'password'
                            : 'text'
                    }
                    {...register(field as keyof FormData)}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                {field === 'email' ? <AccountCircle /> : null}
                            </InputAdornment>
                        ),
                    }}
                    label={field.charAt(0).toUpperCase() + field.slice(1)}
                    error={!!errors[field] && getValues(field)?.trim() !== ''}
                />
            ))}

            <div className="progress-bar">
                <div
                    className="progress"
                    style={{ width: `${fillingFormLine}%` }}
                ></div>
            </div>

            <button
                disabled={isSubmitting}
                type="submit"
                className={isSubmitting ? 'btn-disabled' : 'btn-submit'}
            >
                {isSubmitting ? 'Loading' : 'Submit'}
            </button>
            {registrationStatus && (
                <Alert
                    severity={registrationStatus.isError ? 'error' : 'success'}
                >
                    {registrationStatus.message}
                </Alert>
            )}
        </form>
    );
};
