import { AppBar, Button, Grid, Stack, Toolbar, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { AssistIdLogo } from '../assets/img'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AdminPanelSettings, CalendarMonth, FacebookRounded, HealthAndSafety, Instagram, Twitter } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { getToken } from './redux/selectors'
import { logout } from './redux/actions'

const NavBar = () => {
    const navigate = useNavigate()
    
    const dispatch = useDispatch();
    const token = useSelector(getToken);
    useEffect(()=>{
        cekToken();fetchCurrentDate(); 
    },[])

    

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem('username');
        localStorage.removeItem('token');
    
        navigate('/');
      };
    
    
    
    const [currentDate, setCurrentDate] = useState('')
    const location = useLocation();
    const currentUrl = location.pathname;
    // console.log(currentUrl);
    
    const cekToken = () =>{
        if(currentUrl=="/"){
            console.log(token,"data token navbar");
        }else{
            if (!token) {
                navigate('/');
             }
        }
    }
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
            <div style={{height:"auto", width:"100vw",  position:currentUrl=="/"?"absolute":"none",}}>
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
                    <Grid item gap={5} sx={{display: currentUrl=="/"?"none":"flex"}}>

                        <Button style={{width:"auto", height:"auto", borderRadius:50, backgroundColor:currentUrl=="/admin"?"#2a66ae":"none", padding:"0.2vw 1vw"}}>

                            <Link to={'/'} style={{display:"flex", alignItems:"center"}}>
                                <HealthAndSafety fontSize='medium' sx={{color:currentUrl=="/admin"?"#fff":"#000", width:"auto", marginRight:"0.5vw"}}/>
                                <Typography fontSize={"1vw"} textTransform={"capitalize"} color={currentUrl=="/admin"?"white":"black"} fontWeight={"bold"}>
                                    Beranda
                                </Typography>
                            </Link>
                        </Button>

                        <Button style={{width:"auto", height:"auto", borderRadius:50,  padding:"0.2vw 1vw",}} onClick={handleLogout}>

                            <div style={{display:"flex", alignItems:"center"}}>
                                <AdminPanelSettings fontSize='medium' sx={{color:"#000", width:"auto", marginRight:"0.5vw"}}/>
                                <Typography fontSize={"1vw"} textTransform={"capitalize"} color={"black"} fontWeight={"bold"}>
                                    Logout
                                </Typography>
                            </div>
                        </Button>
                    </Grid>
                    <Grid item ml={currentUrl=="/"?0:"auto"}>
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
                            <FacebookRounded fontSize='large' sx={{color:"#000", width:"auto"}}/>
                            <Twitter fontSize='large' sx={{color:"#000", width:"auto"}}/>
                            <Instagram fontSize='large' sx={{color:"#000", width:"auto"}}/>
                        </Stack>
                    </Grid>

                </Grid>
            </div>

            
        </>
    )
}

export default NavBar