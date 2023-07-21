import React, { useState } from 'react';
import { TextField, Button, Container, Box, Typography } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';

const ChangePassword = () => {
  const [formData, setFormData] = useState({
  });
  
  const {email,
  password,
  confirmPassword} = formData;

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
    axios.post("http://localhost:8081/user/changePassword",{
        email,
        password,
        confirmPassword
        
    }).then((response)=>{
        setFormData({
            email: '',
            password: '',
            confirmPassword: '',
        })
        if(response.data.isSuccess){
            toast.success("Password changed successfully")
        }
    }).catch((error)=>{
        toast.error(error.response.data.message)
    })
   

    console.log('Submitted data:', formData);
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 5,
          padding: 10,
          border: '1px solid #ccc',
          borderRadius: 8,
          boxShadow: 1,
          marginBottom:10
        }}
      >
        <Typography variant="h4" gutterBottom>
          Change Password 
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
          <TextField
            fullWidth
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            margin="normal"
            variant="outlined"
            required
          />
          <Button variant="contained" color="primary" type="submit" size="large" sx={{ mt: 2 }}>
            Change Password
          </Button>
        </form>
        <Button  href='/' variant="text" color="primary" size="small" sx={{ mt: 2 }}>
          Login
        </Button>
      </Box>
    </Container>
  );
};

export default ChangePassword;
