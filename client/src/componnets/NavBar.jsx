import { AppBar, Grid, Stack, Toolbar, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { AssistIdLogo } from '../assets/img'
import { useLocation } from 'react-router-dom'
import { CalendarMonth, FacebookRounded, Instagram, Twitter } from '@mui/icons-material'

const NavBar = () => {
    useEffect(()=>{
        fetchCurrentDate(); 
    },[])

    const [currentDate, setCurrentDate] = useState('')
    const location = useLocation();
    const currentUrl = location.pathname;
    // console.log(currentUrl);

    const fetchCurrentDate = () => {
        const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
        const months = [
          'Januari',
          'Februari',
          'Maret',
          'April',
          'Mei',
          'Juni',
          'Juli',
          'Agustus',
          'September',
          'Oktober',
          'November',
          'Desember',
        ];
  
        const today = new Date();
        const dayName = days[today.getDay()];
        const day = today.getDate();
        const monthName = months[today.getMonth()];
        const year = today.getFullYear();
  
        const formattedDate = `${dayName}, ${day} ${monthName} ${year}`;
        setCurrentDate(formattedDate);
    };
    return (
        <>
            <div style={{height:"auto", width:"100vw", marginBottom:"5vh", position:"absolute"}}>
                <Grid container direction="row" gap={10} alignItems="center" px="2vw" py="1vw">
                    <Grid item>
                        <Stack
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            spacing={2}
                        >

                            <img src={AssistIdLogo} width={"auto"} height={"60vh"}/>
                            <Typography fontSize={"2vw"} color="#2a66ae" fontWeight={"bold"} >
                                Assist.id
                            </Typography>
                        </Stack>
                    </Grid>
                    <Grid item >
                        <Stack
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            spacing={4}
                        >

                            {/* <CalendarMonth fontSize='medium'/> */}
                            <Typography     fontSize={"1.2vw"} color="black" fontWeight={"bold"}>
                                {currentDate}
                            </Typography>
                            <FacebookRounded fontSize='large' sx={{color:"#000", width:"auto", height:"3vh"}}/>
                            <Twitter fontSize='large' sx={{color:"#000", width:"auto", height:"3vh"}}/>
                            <Instagram fontSize='large' sx={{color:"#000", width:"auto", height:"3vh"}}/>
                        </Stack>
                    </Grid>

                </Grid>
            </div>

            
        </>
    )
}

export default NavBar