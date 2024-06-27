import React, { useState, useEffect } from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper, styled } from '@mui/material';
import { authenticateGetBus } from '../../service/api.js';


const BusList = () => {
    const [busTime, setBusTime] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBusTime = async () => {
            try {
                const response = await authenticateGetBus();
                if (response.status === 200) {
                    setBusTime(response.data.data);
                } else {
                    setError('Error loading Bus-timing');
                }
            } catch (error) {
                console.error("Error occurred while fetching bus timing :", error);
                setError('Error loading bus timing');
            }
        };

        fetchBusTime();
    }, []); // Empty dependency array ensures useEffect runs only once


    return (
        <TableContainer component={Paper} sx={{ boxShadow: 2 }}>
            <Table>
                <TableHead sx={{ backgroundColor: '#f0f0f0' }}>
                    <TableRow>
                        <TableCell>Bus</TableCell>
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
                        busTime.map(busTime => (
                            <TableRow key={busTime._id} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' } }}>
                                <TableCell>{busTime.name}</TableCell>
                                <TableCell>{busTime.time}</TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default BusList;
