import React, { useState, useEffect } from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper, styled } from '@mui/material';
import { authenticateGetLight } from '../../service/api.js';


const LightList = () => {
    const [lightTime, setLightTime] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLightTime = async () => {
            try {
                const response = await authenticateGetLight();
                if (response.status === 200) {
                    setLightTime(response.data.data);
                } else {
                    setError('Error loading light-timing');
                }
            } catch (error) {
                console.error("Error occurred while fetching light timing :", error);
                setError('Error loading light timing');
            }
        };

        fetchLightTime();
    }, []); // Empty dependency array ensures useEffect runs only once


    return (
        <TableContainer component={Paper} sx={{ boxShadow: 2 }}>
            <Table>
                <TableHead sx={{ backgroundColor: '#f0f0f0' }}>
                    <TableRow>
                        <TableCell>Street Name</TableCell>
                        <TableCell>Time</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {error ? (
                        <TableRow>
                            <TableCell colSpan={3}>
                                <Typography>{error}</Typography>
                            </TableCell>
                        </TableRow>
                    ) : (
                        lightTime.map(lightTime => (
                            <TableRow key={lightTime._id} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' } }}>
                                <TableCell>{lightTime.name}</TableCell>
                                <TableCell>{lightTime.time}</TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default LightList;
