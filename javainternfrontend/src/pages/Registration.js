import NavBar from './NavBar'
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container, Stack } from '@mui/material';
import { Link , useNavigate} from 'react-router-dom'
import { Login } from '@mui/icons-material';
import axios from 'axios';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
}

const Registration = () => {
    const [formData, setFormData] = useState({
    });

    const { firstName, lastName, email, password } = formData;
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here (e.g., send data to the server)
        axios.post("http://localhost:8081/user/register", {
            firstName,
            lastName,
            email,
            password

        }).then(() => {
            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                password: "",

            })
        })
        setTimeout(() => {
            toast.success("Inventory Updated!");
            navigate("/");
        }, 500)

        console.log('Submitted data:', formData);
    };

    return (
        <>
            
            <Container maxWidth="sm">
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        marginTop: 2,
                        padding: 10,
                        border: '1px solid #ccc',
                        borderRadius: 8,
                        boxShadow: 1,
                        marginBottom: 5
                    }}
                >
                    <Typography variant="h4" gutterBottom>
                        Registration Form
                    </Typography>
                    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                        <TextField
                            fullWidth
                            label="First Name"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            margin="normal"
                            variant="outlined"
                            required
                        />
                        <TextField
                            fullWidth
                            label="Last Name"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            margin="normal"
                            variant="outlined"
                            required
                        />
                        <TextField
                            fullWidth
                            label="Email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            margin="normal"
                            variant="outlined"
                            required
                        />
                        <TextField
                            fullWidth
                            label="Password"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            margin="normal"
                            variant="outlined"
                            required
                        />
                        <Button variant="contained" color="primary" type="submit" size="large" sx={{ mt: 3 }}>
                            Register
                        </Button>
                        <Stack spacing={2}>
                            <Link to={"/"} >
                                <Button variant="outlined" color="primary" type="submit" size="large" sx={{ mt: 3 }}>
                                    Login
                                </Button>
                            </Link>
                            <Typography variant='caption'> Already logged in? Sign In Here </Typography>

                        </Stack>
                    </form>
                </Box>
            </Container>
        </>
    );
};

export default Registration;

