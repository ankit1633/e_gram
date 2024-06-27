import React, { useState, useEffect } from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper, styled } from '@mui/material';
import { authenticateGetWater } from '../../service/api.js';


const WaterList = () => {
    const [waterTime, setWaterTime] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWaterTime = async () => {
            try {
                const response = await authenticateGetWater();
                if (response.status === 200) {
                    setWaterTime(response.data.data);
                } else {
                    setError('Error loading water-timing');
                }
            } catch (error) {
                console.error("Error occurred while fetching water timing :", error);
                setError('Error loading water timing');
            }
        };

        fetchWaterTime();
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
                        waterTime.map(waterTime => (
                            <TableRow key={waterTime._id} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' } }}>
                                <TableCell>{waterTime.name}</TableCell>
                                <TableCell>{waterTime.time}</TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default WaterList;
