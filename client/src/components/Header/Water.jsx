import React, { useContext, useState } from 'react';
import { Box, Typography, TextField, Button, styled, Dialog } from '@mui/material';
import { authenticateWater } from '../../service/api.js';
import DataProvider, { DataContext } from '../../context/DataProvider.jsx';
import WaterList from '../Header/WaterList.jsx';
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

const Water = ({ openWater, setOpenWater }) => {
    const { user } = useContext(DataContext);
    const [water, setWater] = useState({ time: '', name: [] }); // Note: name should be an array to hold multiple selections
    const [error, setError] = useState('');

    const onValueChange = (e) => {
        setWater({ ...water, [e.target.name]: e.target.value });
    }

    const handleSelectChange = (selectedNames) => {
        setWater({ ...water, name: selectedNames });
    };

    const handleClose = () => {
        setOpenWater(false);
        setError('');
        setWater({ time: '', name: [] }); 
    }

    const addWater = async () => {
        try {
            const response = await authenticateWater(water);
            if (response.status === 200) {
                handleClose();
                console.log(response.data);
            } else {
                setError(response.data.message || 'Error adding water timing');
            }
        } catch (error) {
            console.error("Error occurred while adding water timing:", error);
            setError('Error adding water timing');
        }
    };

    return (
        <StyledDialog open={openWater} onClose={handleClose}>
            {user === "expert" ? (
                <ContentBox>
                    <TextField variant='standard' onChange={onValueChange} name='time' label='Enter water timing' />
                    <MultipleSelect onChange={handleSelectChange} />
                    {error && <Error>{error}</Error>}
                    <LoginButton onClick={addWater}>Add Water Timing</LoginButton>
                </ContentBox>
            ) : (
                <ContentBox>
                    <Box>
                        <WaterList />
                    </Box>
                </ContentBox>
            )}
        </StyledDialog>
    );
}

export default Water;
