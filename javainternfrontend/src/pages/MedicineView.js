import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { Event, Description, AttachMoney, LocalPharmacy, DateRange } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const MedicineView = ({}) => {
    const [medicine, setMedicine] = React.useState({})
    const {id} = useParams();

    const loadData =  async() =>{
        const result = await axios.get(`http://localhost:8081/meds/getByID/${id}`)
        .catch(()=>{
            toast.error("No data found");
        });
        setMedicine(result.data);
    }

    React.useEffect(()=>{
        loadData();
    }, [id])
    


  return (
    <Card sx={{ maxWidth: 400, margin: 'auto', marginTop: 15 }}>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent={'center'} marginBottom={2}>
          <LocalPharmacy sx={{ marginRight: 2 }} />
          <Typography variant="h5" color={'GrayText'}>Medicine Details</Typography>
        </Box>
        <Box display="flex" alignItems="center" marginBottom={1}>
          <Description sx={{ marginRight: 1 }} />
          <Typography variant="body1">Medicine Name: {medicine.medName}</Typography>
        </Box>
        <Box display="flex" alignItems="center" marginBottom={1}>
          <Description sx={{ marginRight: 1 }} />
          <Typography variant="body1">Description: {medicine.description}</Typography>
        </Box>
        <Box display="flex" alignItems="center" marginBottom={1}>
          <AttachMoney sx={{ marginRight: 1 }} />
          <Typography variant="body1">Price: ${medicine.price}</Typography>
        </Box>
        <Box display="flex" alignItems="center" marginBottom={1}>
          <LocalPharmacy sx={{ marginRight: 1 }} />
          <Typography variant="body1">Quantity: {medicine.quantity}</Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <DateRange sx={{ marginRight: 1 }} />
          <Typography variant="body1">Expiry Date: {medicine.expiryDate}</Typography>
        </Box>
      </CardContent>
      <a href="/getAll" class="btn btn-primary btn-lg active" role="button" aria-pressed="true" style={{margin: 5}}>Go Back</a>
    </Card>
  );
};

export default MedicineView;
