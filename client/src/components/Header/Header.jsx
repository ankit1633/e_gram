import React from 'react'
import {AppBar, Toolbar, Box, Typography, styled} from '@mui/material';
import Search from './Search';
import CustomButtons from './CustomButtons';


const header = () => {

    const StyledHeader = styled(AppBar)`
    background: #008000;
    height: 55px;
`;
    const Image = styled('img')({
        width: 30,
        height: 30
    })


  return (
    <StyledHeader>
        <Toolbar>
            <Box style={{display:'flex'}}>
                <Typography>E-Gram-Panchayat</Typography>
                <Image src='https://th.bing.com/th/id/OIP.3kUGWh0okytjGtWCoxBMZgHaIB?rs=1&pid=ImgDetMain' alt='logo' />
            </Box>
                <Search />
            <Box>
                <CustomButtons />
            </Box>
        </Toolbar>
        
    </StyledHeader>
  )
}

export default header;