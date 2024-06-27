import React, { useContext, useState } from 'react';
import { Box, Typography, TextField, Button, styled, Dialog } from '@mui/material';
import { authenticateLight } from '../../service/api.js';
import DataProvider, { DataContext } from '../../context/DataProvider.jsx';
import LightList from './LightList.jsx';
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

const Light = ({ openLight, setOpenLight }) => {
    const { user } = useContext(DataContext);
    const [light, setLight] = useState({ time: '', name: [] }); // Note: name should be an array to hold multiple selections
    const [error, setError] = useState('');

    const onValueChange = (e) => {
        setLight({ ...light, [e.target.name]: e.target.value });
    }

    const handleSelectChange = (selectedNames) => {
        setLight({ ...light, name: selectedNames });
    };

    const handleClose = () => {
        setOpenLight(false);
        setError('');
        setLight({ time: '', name: [] }); 
    }

    const addLight = async () => {
        try {
            const response = await authenticateLight(light);
            if (response.status === 200) {
                handleClose();
                console.log(response.data);
            } else {
                setError(response.data.message || 'Error adding light timing');
            }
        } catch (error) {
            console.error("Error occurred while adding light timing:", error);
            setError('Error adding light timing');
        }
    };

    return (
        <StyledDialog open={openLight} onClose={handleClose}>
            {user === "expert" ? (
                <ContentBox>
                    <TextField variant='standard' onChange={onValueChange} name='time' label='Enter light timing' />
                    <MultipleSelect onChange={handleSelectChange} />
                    {error && <Error>{error}</Error>}
                    <LoginButton onClick={addLight}>Add Light Timing</LoginButton>
                </ContentBox>
            ) : (
                <ContentBox>
                    <Box>
                        <LightList />
                    </Box>
                </ContentBox>
            )}
        </StyledDialog>
    );
}

export default Light;
