import { Height } from '@mui/icons-material'
import { Button, Container, Grid, Paper, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import NavBar from '../componnets/NavBar'
import { AssistIdLogo, Background1, Background2 } from '../assets/img'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getPassword, getToken, getUsername } from '../componnets/redux/selectors'
import { ThreeCircles } from 'react-loader-spinner'
import { v4 as uuidv4 } from 'uuid';
import { login, logout } from '../componnets/redux/actions'

export const HomeBase = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [localUsername, setLocalUsername] = useState('');
    const [localPassword, setLocalPassword] = useState('');
    const [localToken, setLocalToken] = useState('');
    const username = useSelector(getUsername);
    const password = useSelector(getPassword);
    const token = useSelector(getToken);
    console.log(token,"ini token");
    const [errorLogin, setErrorLogin] = useState(false)
    const [loadLogin, setLoadLogin] = useState(false)

    // console.log(localToken,"<local token");
    const tokenLogin = localStorage.getItem('token');
    console.log(tokenLogin,"ini token login");

    useEffect(() => {
        if (token) {
          navigate('/admin');
        }
    }, []);

    const [loginStatus, setLoginStatus] = useState(false)

    const handleLogin = () => {
        setLoadLogin(true)
        if(localUsername!="admin"||localPassword!="admin"){
            setErrorLogin(true)
            setLoadLogin(false)
        }else{
            const newToken = uuidv4();
            // setLocalToken(newToken);
            dispatch(login(localUsername, localPassword, newToken));
            localStorage.setItem('username', localUsername);
            localStorage.setItem('token', newToken);
            setLoadLogin(false)
            navigate("/admin");
        }
    
    };

    
    
    
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

                            <div style={{marginBottom:"4vh"}}>

                                <Typography textAlign={"center"} fontSize={"0.9vw"} fontWeight={700} color={"#000"} fontFamily={"sans-serif"} textTransform={"capitalize"} >Silakan Masukan Username dan Password Anda</Typography>
                                <Typography textAlign={"center"} fontSize={"0.9vw"} fontWeight={700} color={"red"} fontFamily={"sans-serif"} textTransform={"capitalize"} sx={{display:errorLogin==true?"block":"none"}}>Username atau Password Anda Salah</Typography>
                            </div>

                            <div>
                                <TextField id="username" label="Username : admin" variant="outlined" fullWidth sx={{marginBottom:"3vh"}} onChange={(e)=>setLocalUsername(e.target.value)}/>
                                <TextField id="password" label="Password : admin" variant="outlined" fullWidth type='password' sx={{marginBottom:"3vh"}} onChange={(e)=>setLocalPassword(e.target.value)}/>
                                <Button fullWidth variant="contained" padding="1vw" onClick={handleLogin}>
                                    <ThreeCircles 
                                        width='50'
                                        height="50"
                                        color="#fff"
                                        visible={loadLogin==true?true:false}
                                    />
                                    <Typography fontSize={"1vw"} fontWeight={800} textTransform={"capitalize"} sx={{display:loadLogin==true?"none":"flex"}}>Login</Typography>
                                </Button>
                            </div>

                            <Typography textAlign={"center"} fontSize={"0.9vw"} fontWeight={700} color={"#000"} fontFamily={"sans-serif"} textTransform={"capitalize"} marginTop={"4vh"} >
                                Solusi Kelola Fasilitas Kesehatan Indonesia 
                            </Typography>
                        </Paper>

                    </div>
                </div>
                
            </div>
        </>
    )
}
