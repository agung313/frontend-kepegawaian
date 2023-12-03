import { Height } from '@mui/icons-material'
import { Button, Container, Grid, Paper, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import NavBar from '../componnets/NavBar'
import { AssistIdLogo, Background1, Background2 } from '../assets/img'
import { useNavigate } from 'react-router-dom'

export const HomeBase = () => {
    const navigate = useNavigate()
    const [loginStatus, setLoginStatus] = useState(false)
    console.log(loginStatus,"ini loginstatus");

    const loginAdmin = async data =>{
        navigate("/admin")
    }
    
    return (
        <>
            <div style={{height:"100vh", width:"100vw", backgroundImage:`url(${Background2})`, backgroundSize:"cover", backgroundRepeat: 'no-repeat',backgroundPosition: 'center', }}>
                
                <NavBar/>

                <div style={{ display: 'flex', alignItems: 'center', height:"100vh", paddingLeft:"10vw" }}>

                    <div style={{display: loginStatus ? "none" : "block"}}>
                        <div style={{display:"flex", alignItems:"center"}}>
                            <img src={AssistIdLogo} width={"auto"} height={"70vh"}/>
                            <Typography fontSize={"2.3vw"} color="#2a66ae" fontWeight={"bold"} >
                                Assist.id
                            </Typography>
                        </div>
                        
                        <Typography textAlign={"left"} fontSize={"0.9vw"} fontWeight={700} color={"#000"} fontFamily={"sans-serif"} textTransform={"capitalize"} marginBottom={"2vh"}>Solusi Kelola Fasilitas Kesehatan Indonesia</Typography>

                        <Typography textAlign={"left"} fontSize={"3vw"} fontWeight={800} color={"#000"} fontFamily={"sans-serif"} textTransform={"capitalize"}>Selamat datang <br/> di sistem kepegawaian</Typography>

                        <Button variant="contained" sx={{marginTop:"3vh", paddingX:"3vw", marginBottom:"5vh"}} onClick={()=>setLoginStatus(true)}>
                            <Typography fontSize={"1vw"} fontWeight={800} textTransform={"capitalize"}>Login System</Typography>
                        </Button>

                        <Typography textAlign={"left"} fontSize={"0.9vw"} fontWeight={700} color={"#000"} fontFamily={"sans-serif"} textTransform={"capitalize"}>Kelola Klinik Apotek Lebih Mudah Pakai Assist.id <br/>Semua fasilitas kesehatan kini bisa terdigitilasi dengan mudah dan cepat</Typography>
                    </div>

                    <div style={{display: loginStatus ? "flex" : "none", width:"30vw", justifyContent:"center"}}>

                        <Paper style={{width:"100%", padding:"2vw", borderRadius:"1vw"}} >

                            <div style={{display:"flex", alignItems:"center", justifyContent:"center", marginBottom:"1vh"}}>
                                <img src={AssistIdLogo} width={"auto"} height={"70vh"}/>
                                <Typography fontSize={"2.3vw"} color="#2a66ae" fontWeight={"bold"} >
                                    Assist.id
                                </Typography>
                            </div>

                            <Typography textAlign={"center"} fontSize={"0.9vw"} fontWeight={700} color={"#000"} fontFamily={"sans-serif"} textTransform={"capitalize"} marginBottom={"4vh"}>Silakan Masukan Username dan Password Anda</Typography>

                            <div>
                                <TextField id="username" label="Username" variant="outlined" fullWidth sx={{marginBottom:"3vh"}} />
                                <TextField id="password" label="Password" variant="outlined" fullWidth type='password' sx={{marginBottom:"3vh"}}/>
                                <Button fullWidth variant="contained" padding="1vw" onClick={loginAdmin}>
                                    <Typography fontSize={"1vw"} fontWeight={800} textTransform={"capitalize"}>Login</Typography>
                                </Button>
                            </div>

                            <Typography textAlign={"center"} fontSize={"0.9vw"} fontWeight={700} color={"#000"} fontFamily={"sans-serif"} textTransform={"capitalize"} marginTop={"4vh"} >
                                Belum Memiliki Akun ? 
                                <span>
                                    <Button><Typography fontSize={"1vw"} fontWeight={800} textTransform={"capitalize"}>Sign Up</Typography></Button>
                                </span>
                            </Typography>
                        </Paper>

                    </div>
                </div>
                
            </div>
        </>
    )
}
