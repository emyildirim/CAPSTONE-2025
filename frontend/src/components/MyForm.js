// frontend/src/components/MyForm.js

import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './MyForm.css'; // Import the CSS file

const schema = yup.object({
    firstName: yup.string().required("First name is required"),
    email: yup.string().email("Must be a valid email").required("Email is required"),
}).required();

function MyForm() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = data => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="form-container">
            <TextField
                {...register("firstName")}
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
                label="First Name"
                variant="outlined"
                fullWidth
                className="form-field"
            />
            <TextField
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
                label="Email"
                variant="outlined"
                fullWidth
                className="form-field"
            />
            <div className="form-button">
                <Button type="submit" variant="contained" color="primary">
                    Submit
                </Button>
            </div>
        </form>
    );
}

export default MyForm;
