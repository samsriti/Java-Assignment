import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import NavBar from './NavBar';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate, useParams } from 'react-router-dom'

const initialState = {
    medName: '',
    description: '',
    quantity: '',
    price: '',
    expiryDate: '',
}
const InventoryForm = () => {
    const [formData, setFormData] = useState(initialState);

    const { medName, description, quantity, price, expiryDate } = formData;

    const { id } = useParams();
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    React.useEffect(() => {
        if (id) {
            axios.get(`http://localhost:8081/meds/getByID/${id}`)
                .then((response) => {
                    const { expiryDate, ...formData } = response.data;
                    const dateObject = new Date(expiryDate);
                    setFormData({
                        ...formData,
                        expiryDate: dateObject.toISOString().split('T')[0],
                    });
                    console.log(response.data);
                    console.log(formData);
                })
                .catch((error) => {

                    console.error(error);
                });
        }

    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!id) {
            axios.post("http://localhost:8081/meds/saveMed", {
                medName,
                description,
                quantity,
                price,
                expiryDate,
            }).then(() => {
                setFormData({
                    medName: "",
                    description: "",
                    quantity: "",
                    price: "",
                    expiryDate: "",
                })
                toast.success("Medicine added to the inventory!")
            })
        } else {
            axios.put(`http://localhost:8081/meds/update/${id}`, {
                id, 
                medName,
                description,
                quantity,
                price,
                expiryDate,
            }).then(() => {
                setFormData({
                    medName: "",
                    description: "",
                    quantity: "",
                    price: "",
                    expiryDate: "",
                })
                toast.success("Inventory Updated")
            }).catch((e) => {
                toast.error(e.response.data)
            })
        }
        setTimeout(() => {
            
            navigate("/getAll")
        }, 500)
        console.log('Submitted data:', formData);
    };

    return (
        <>
            <NavBar></NavBar>
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
                        marginBottom: 3
                    }}
                >
                    <Typography variant="h4" gutterBottom>
                        Inventory Form
                    </Typography>
                    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                        <TextField
                            fullWidth
                            label="Medicine Name"
                            name="medName"
                            value={formData.medName || ""}
                            onChange={handleInputChange}
                            margin="normal"
                            variant="outlined"
                            required
                        />
                        <TextField
                            fullWidth
                            label="Description"
                            name="description"
                            value={formData.description || ""}
                            onChange={handleInputChange}
                            margin="normal"
                            variant="outlined"
                            required
                        />
                        <TextField
                            fullWidth
                            label="Quantity"
                            type="number"
                            name="quantity"
                            value={formData.quantity || ""}
                            onChange={handleInputChange}
                            margin="normal"
                            variant="outlined"
                            required
                        />
                        <TextField
                            fullWidth
                            label="Price"
                            type="number"
                            name="price"
                            value={formData.price || ""}
                            onChange={handleInputChange}
                            margin="normal"
                            variant="outlined"
                            required
                        />
                        <TextField
                            fullWidth
                            label="Expiry Date"
                            type="date"
                            name="expiryDate"
                            value={formData.expiryDate || ""}
                            onChange={handleInputChange}
                            margin="normal"
                            variant="outlined"
                            required
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <Button variant="contained" color="primary" type="submit" size="large" sx={{ mt: 3 }} >
                            {id ? 'Update' : 'Save'}
                        </Button>
                    </form>
                </Box>
            </Container>
        </>
    );
};

export default InventoryForm;
