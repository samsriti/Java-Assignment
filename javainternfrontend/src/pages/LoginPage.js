import NavBar from './NavBar'
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container, Stack } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom'
import Registration from './Registration';
import axios from 'axios';
import { toast } from 'react-toastify';

const initialState = {
  email: '',
  password: '',
}
const LoginPage = () => {
  const [formData, setFormData] = useState({});

  const { email, password } = formData;

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
    axios.post("http://localhost:8081/user/login", {
      email,
      password
    }).then(() => {
      setFormData({
        email: "",
        password: ""
      })
    })
    setTimeout(() => {
      toast.success("Logged in successfully")
      navigate("/getAll");
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
            Login
          </Typography>
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>

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
            <Stack direction={"row"} spacing={2} alignContent={"center"} justifyContent={"center"}>
              <Button variant="contained" color="primary" type="submit" size="medium" sx={{ mt: 3 }}>
                Login Here
              </Button>
              <Link to={"/changePassword"}> 
              <Button variant="outlined" color="primary" size="medium" sx={{ mt: 3 }}>
                Forgot Password?
              </Button>
              </Link>
            </Stack>
            <Stack spacing={2}>
              <Link to={"/Registration"}>
                <Button variant="outlined" color="primary" type="submit" size="large" sx={{ mt: 3 }}>
                  Register
                </Button>
              </Link>
              <Typography variant='caption'> No account yet? Register  Here </Typography>

            </Stack>
          </form>
        </Box>
      </Container>
    </>
  );
};

export default LoginPage;

