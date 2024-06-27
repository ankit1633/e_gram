import React, { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Button, styled } from '@mui/material';
import Water from './Water'; // Import Water component
import Light from './Light';
import Bus from './Bus';
const LoginButton = styled(Button)`
    && {
        color: #ffffff;
        background: #007bff;
        text-transform: capitalize;
        font-weight: 600;
        border-radius: 4px;
        padding: 8px 20px;
        margin-bottom: 8px;
        box-shadow: none;
        transition: background-color 0.3s ease;

        &:hover {
            background-color: #0056b3;
        }
    }
`;

const DrawerComponent = ({ openDrawer, setOpenDrawer }) => {
    const [openWater, setOpenWater] = useState(false); // State to control Water dialog visibility
    const [openLight, setOpenLight] = useState(false);
    const [openBus, setOpenBus] = useState(false);
    const toggleDrawer = (open) => () => {
        setOpenDrawer(open);
    };

    return (
        <Drawer
            anchor="left"
            open={openDrawer}
            onClose={toggleDrawer(false)}
            sx={{
                width: '280px',
                '& .MuiDrawer-paper': {
                    background: '#ffffff',
                    boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)',
                },
            }}
        >
            <div
                role="presentation"
 
                onKeyDown={toggleDrawer(false)}
                sx={{
                    width: '100%',
                }}
            >
                <List sx={{ width: '100%' }}>
                    <ListItem
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'stretch', // Ensures buttons stretch to fill the container width
                            padding: '10px 20px',
                        }}
                    >
                        {/* Apply equal width to each button */}
                        <LoginButton onClick={toggleDrawer(false)} sx={{ width: '100%' }}>Close Drawer</LoginButton>
                        <LoginButton onClick={() => setOpenWater(true)} sx={{ width: '100%' }}>Water Timing</LoginButton>
                        <LoginButton sx={{ width: '100%' }}>Donation</LoginButton>
                        <LoginButton onClick={() => setOpenBus(true)}  sx={{ width: '100%' }}>Bus Timing</LoginButton>
                        <LoginButton onClick={() => setOpenLight(true)} sx={{ width: '100%' }}>Electricity Timing</LoginButton>
                    </ListItem>
                </List>
            </div>

            {/* Render Water component conditionally based on openWater state */}
            <Water openWater={openWater} setOpenWater={setOpenWater} />
            <Light openLight={openLight} setOpenLight={setOpenLight} />
            <Bus openBus={openBus} setOpenBus={setOpenBus} />
        </Drawer>
    );
};

export default DrawerComponent;
