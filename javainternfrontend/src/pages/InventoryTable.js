import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import { IconButton } from '@mui/material';
import { Visibility, Edit, Delete } from '@mui/icons-material';
import NavBar from './NavBar';
import axios from 'axios';
import { toast } from 'react-toastify';

const InventoryTable = () => {
    const [medicines, setMedicines] = React.useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

    const loadData = async () => {
        const result = await axios.get("http://localhost:8081/meds/getAllMeds");
        setMedicines(result.data);
    }

    React.useEffect(() => {
        loadData()
    }, [])

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this?")) {
            axios.delete(`http://localhost:8081/meds/delete/${id}`);
            toast.success("Medicine deleted successfully");
            setTimeout(() => {
                navigate("/getAll")
            }, 500)
        }
    }

    return (
        <>
            <NavBar></NavBar>
            <Link to={"/add"}>
                <Button variant="contained" color="primary" type="submit" size="large" sx={{ mt: 3, mb: 3 }}>
                    Add to Inventory
                </Button>
            </Link>
            <TableContainer component={Paper} sx={{ marginLeft: 5, marginRight: 7 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Expiry Date</TableCell>
                            <TableCell> Operations</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {medicines.map((item, index) => (
                            <TableRow >
                                <TableCell>{index = index + 1}</TableCell>
                                <TableCell>{item.medName}</TableCell>
                                <TableCell>{item.quantity}</TableCell>
                                <TableCell>{item.price}</TableCell>
                                <TableCell>{item.expiryDate.split('T')[0]}</TableCell>
                                <TableCell>
                                    <Link to={`/getByID/${item.id}`}>
                                        <IconButton color="primary">
                                            <Visibility />
                                        </IconButton>
                                    </Link>
                                    <Link to={`/update/${item.id}`}> 
                                    <IconButton color="info" >
                                        <Edit />
                                    </IconButton>
                                    </Link>
                                    <Link>
                                        <IconButton color="error" onClick={() => handleDelete(item.id)} >
                                            <Delete />
                                        </IconButton>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}

                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default InventoryTable;
