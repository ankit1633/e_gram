import React, { useContext, useState } from 'react';
import { Box, Typography, TextField, Button, styled, Dialog } from '@mui/material';
import { authenticateBus } from '../../service/api.js';
import DataProvider, { DataContext } from '../../context/DataProvider.jsx';
import BusList from './BusList.jsx';
import MultipleSelect from './StreetName.jsx';

const StyledDialog = styled(Dialog)`
  .MuiDialog-paper {
    background-color: #f0f0f0;
    border-radius: 10px;
    width: 60%;
    height: 50%;
  }
`;

const ContentBox = styled(Box)`
  background-color: #FFFFFF;
  padding: 20px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
`;

const LoginButton = styled(Button)`
  text-transform: none;
  background: #FB641B;
  color: #fff;
  height: 48px;
  border-radius: 2px;
  margin-top: 20px;
`;

const Error = styled(Typography)`
  font-size: 10px;
  color: #ff6161;
  margin-top: 5px;
`;

const Bus = ({ openBus, setOpenBus }) => {
    const { user } = useContext(DataContext);
    const [bus, setBus] = useState({ time: '', name: [] }); // Note: name should be an array to hold multiple selections
    const [error, setError] = useState('');

    const onValueChange = (e) => {
        setBus({ ...bus, [e.target.name]: e.target.value });
    }

    const handleSelectChange = (selectedNames) => {
        setBus({ ...bus, name: selectedNames });
    };

    const handleClose = () => {
        setOpenBus(false);
        setError('');
        setBus({ time: '', name: [] }); 
    }

    const addBus = async () => {
        try {
            const response = await authenticateBus(bus);
            if (response.status === 200) {
                handleClose();
                console.log(response.data);
            } else {
                setError(response.data.message || 'Error adding bus timing');
            }
        } catch (error) {
            console.error("Error occurred while adding bus timing:", error);
            setError('Error adding bus timing');
        }
    };

    return (
        <StyledDialog open={openBus} onClose={handleClose}>
            {user === "expert" ? (
                <ContentBox>
                    <TextField variant='standard' onChange={onValueChange} name='time' label='Enter bus timing' />
                    <MultipleSelect onChange={handleSelectChange} />
                    {error && <Error>{error}</Error>}
                    <LoginButton onClick={addBus}>Add Bus Timing</LoginButton>
                </ContentBox>
            ) : (
                <ContentBox>
                    <Box>
                        <BusList />
                    </Box>
                </ContentBox>
            )}
        </StyledDialog>
    );
}

export default Bus;
