import React, { useEffect, useState } from 'react'
import NavBar from '../componnets/NavBar'
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import { Alert, Autocomplete, Box, Button, MenuItem, Modal, Paper, TextField, Typography } from '@mui/material';
import { Badge, Cancel, Delete, DeleteOutline, DriveFileRenameOutline, LocationOnOutlined, MapOutlined, SettingsApplications } from '@mui/icons-material';
import axios from 'axios';
import { ThreeCircles } from  'react-loader-spinner'
import { useSelector } from 'react-redux';
import { getToken } from '../componnets/redux/selectors';
import { useNavigate } from 'react-router-dom';

const HomeAdmin = () => {
    document.title = "Assist.id - Beranda Admin"
    const token = useSelector(getToken);
    const navigate = useNavigate()

    useEffect(()=>{
        cekToken();getPegawai();getProv();
    },[])

    const cekToken = () =>{
        if (!token) {
            navigate('/');
        }
    }

    

    const [pegawaiData, setPegawaiData] = useState(false)
    // console.log(pegawaiData[0].provinsi);
    const [pegawaiLoad, setPegawaiLoad] = useState(false)
    const [pegawaiNama, setPegawaiNama] = useState(null)
    const [pegawaiProv, setPegawaiProv] = useState([])
    const [pegawaiKab, setPegawaiKab] = useState([])
    const [pegawaiKec, setPegawaiKec] = useState([])
    const [pegawaiKel, setPegawaiKel] = useState([])
    const [pegawaiJln, setPegawaiJln] = useState(null)
    const [errPegawai, setErrPegawai] = useState(false)

    const [dataProvinsi, setDataProvinsi] = useState([])
    const [dataKabKota, setDataKabKota] = useState([])
    const [dataKecamatan, setDataKecamatan] = useState([])
    const [dataKelurahan, setDataKelurahan] = useState([])
    const [aksiBtn, setAksiBtn] = useState(null)
    const [aksiLoading, setAksiLoading] = useState(false)
    const [aksiStatus, setAksiStatus] = useState(null)
    console.log("nama = ",pegawaiNama);
    console.log("provinsi = ",pegawaiProv);
    console.log("kabupaten = ",pegawaiKab);
    console.log("kecamatan = ",pegawaiKec);
    console.log("kelurahan = ",pegawaiKel);
    console.log("jalan = ",pegawaiJln);

    const [namaProv, setNamaProv] = useState(null)
    const [namaKab, setNamaKab] = useState(null)
    const [namaKec, setNamaKec] = useState(null)
    const [namaKel, setNamaKel] = useState(null)

    const [dataIdPegawai, setDataIdPegawai] = useState(null)

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);

    const handleClose = () => {
        setPegawaiNama(null)
        setPegawaiProv([])
        setPegawaiKec([])
        setPegawaiKel([])
        setPegawaiJln(null)
        setOpen(false);

        // nama:pegawaiNama,
        //             provinsi:pegawaiProv,
        //             kabupaten:pegawaiKab,
        //             kecamatan:pegawaiKec,
        //             kelurahan:pegawaiKel,
        //             jalan:pegawaiJln
    }

    
    const getPegawai = async data=>{
        setPegawaiLoad(true)
        try{
            const response = await axios.get('https://61601920faa03600179fb8d2.mockapi.io/pegawai')
    
           
            if(response.status==200){
                setPegawaiData(response.data)
            }
        }catch(error){
            console.log(error, "<<< error katgori admin");
        }
        
    }

    const getProv = async data=>{
        setPegawaiLoad(true)
        try{
            const response = await axios.get('https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json')
    
           
            if(response.status==200){
                setDataProvinsi(response.data)
            }
        }catch(error){
            console.log(error, "<<< error provinsi");
        }
        
    }

    // provinsi -> kab id name
    const selectProvinsi = (event, value) => {
        setPegawaiProv(value.name);
        getKab(value.id)
    };

    // kab -> kec value children
    const getKab = async (dataID)=>{
        setPegawaiLoad(true)
        try{
            const response = await axios.get('https://www.emsifa.com/api-wilayah-indonesia/api/regencies/'+dataID+'.json')
    
        //    console.log(response);
            if(response.status==200){
                setDataKabKota(response.data)
            }
        }catch(error){
            console.log(error, "<<< error kabupaten");
        }
        
    }

    const selectKabupaten = (event, value) => {
        setPegawaiKab(value.props.children);
        getKec(value.props.value)
    };

    // kec -> kel value children
    const getKec = async (dataID)=>{
        setPegawaiLoad(true)
        try{
            const response = await axios.get('https://www.emsifa.com/api-wilayah-indonesia/api/districts/'+dataID+'.json')
    
           
            if(response.status==200){
                setDataKecamatan(response.data)
            }
        }catch(error){
            console.log(error, "<<< error kecamatan");
        }
        
    }

    const selectKecamatan= (event, value) => {
        setPegawaiKec(value.props.children);
        getKel(value.props.value)
    };

    const getKel = async (dataID)=>{
        setPegawaiLoad(true)
        try{
            const response = await axios.get('https://www.emsifa.com/api-wilayah-indonesia/api/villages/'+dataID+'.json')
    
           
            if(response.status==200){
                setDataKelurahan(response.data)
            }
        }catch(error){
            console.log(error, "<<< error katgori admin");
        }
        
    }

    const selectKelurahan= (event, value) => {
        setPegawaiKel(value.props.children);
    };

    const tambahPegawai = async data =>{
        setAksiLoading(true)
        if(pegawaiNama==null||pegawaiProv==[]||pegawaiKab==[]||pegawaiKec==[]||pegawaiKel==[]||pegawaiJln==null){
            setErrPegawai(true)
        }else{
            try{
                const data = {
                    nama:pegawaiNama,
                    provinsi:pegawaiProv,
                    kabupaten:pegawaiKab,
                    kecamatan:pegawaiKec,
                    kelurahan:pegawaiKel,
                    jalan:pegawaiJln
                }
                const response = await axios.post('https://61601920faa03600179fb8d2.mockapi.io/pegawai',data)
        
                
                if(response.status==201){
                    getPegawai();
                    setAksiLoading(false);
                    handleClose();
                    setAksiStatus("tambah");
                }
            }catch(error){
                console.log(error, "<<< error tambah data");
            }
        }
    }

    const updatePegawai = async (idPegawai) =>{
        setAksiLoading(true)
        if(pegawaiNama==null||pegawaiProv==[]||pegawaiKab==[]||pegawaiKec==[]||pegawaiKel==[]||pegawaiJln==null){
            setErrPegawai(true)
        }else{
            try{
                const data = {
                    id:dataIdPegawai,
                    nama:pegawaiNama,
                    provinsi:pegawaiProv==0?namaProv:pegawaiProv,
                    kabupaten:pegawaiKab==0?namaKab:pegawaiKab,
                    kecamatan:pegawaiKec==0?namaKec:pegawaiKec,
                    kelurahan:pegawaiKel==0?namaKel:pegawaiKel,        
                    jalan:pegawaiJln
                }
                const response = await axios.put('https://61601920faa03600179fb8d2.mockapi.io/pegawai/'+idPegawai, data)
        
                console.log(response,"<<respon hapus");
                if(response.status==200){
                    getPegawai();
                    setAksiLoading(false);
                    handleClose();
                    setAksiStatus("edit");
                }
            }catch(error){
                console.log(error, "<<< error hapus data");
            }
        }
    }

    const hapusPegawai = async (idPegawai) =>{
        setAksiLoading(true)
        if(pegawaiNama==null||pegawaiProv==[]||pegawaiKab==[]||pegawaiKec==[]||pegawaiKel==[]||pegawaiJln==null){
            setErrPegawai(true)
        }else{
            try{
                const data = {
                    id:dataIdPegawai,
                    nama:pegawaiNama,
                    provinsi:pegawaiProv,
                    kabupaten:pegawaiKab,
                    kecamatan:pegawaiKec,
                    kelurahan:pegawaiKel,
                    jalan:pegawaiJln
                }
                const response = await axios.delete('https://61601920faa03600179fb8d2.mockapi.io/pegawai/'+idPegawai, data)
        
                console.log(response,"<<respon hapus");
                if(response.status==200){
                    getPegawai();
                    setAksiLoading(false);
                    handleClose();
                    setAksiStatus("hapus");
                }
            }catch(error){
                console.log(error, "<<< error hapus data");
            }
        }
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };


    return (
        <div style={{height:"100vh", width:"100vw"}}>
            <NavBar/>
            <div style={{height:"auto", width:"100vw", display: 'flex', justifyContent:"center",padding:"3vh 0"}}>
                <div style={{width:"90%", height:"auto"}}>

                    <div style={{display:"flex", alignItems:"center", gap:5}}>
                        <HealthAndSafetyIcon fontSize='large' sx={{color:"#000", width:"auto"}}/>
                        <Typography fontSize={"2vw"} textTransform={"capitalize"} color="black" fontWeight={"bold"} mr={"0.5vw"}>
                            Beranda Kepegawaian
                        </Typography>
                        <Alert variant="filled" severity={aksiStatus=="tambah"||aksiStatus=="edit"?"success":"error"} sx={{display:aksiStatus==null?"none":"flex"}}>
                           {aksiStatus=="hapus"&&"Data Pegawai Berhasil Dihapus"}
                           {aksiStatus=="tambah"&&"Data Pegawai Berhasil Ditambahkan"}
                           {aksiStatus=="edit"&&"Data Pegawai Berhasil Diupdate"}
                        </Alert>
                        <Button variant="contained" color="success" sx={{marginLeft:"auto",animation: 'spin 2s linear infinite'}} onClick={()=>(handleOpen(),setAksiBtn("tambah"))}>
                            <Typography fontSize={"1vw"} textTransform={"capitalize"} color="white" fontWeight={"bold"}>
                                + Tambah Pegawai
                            </Typography>
                            
                        </Button>
                    </div>

                </div>
            </div>

            <div style={{minHeight:"100vh", width:"100vw", display: 'flex', justifyContent:"center", backgroundColor:"#f0f0f0"}}>
                <div style={{width:"90%", height:"auto"}}>
                    <div style={{width:"100%", height:"auto", marginTop:"3vh", paddingTop:"3vh"}}>
                        
                        {
                            pegawaiData&&
                                pegawaiData.map((item, index)=>(
                                    <>
                                        <Paper key={index} style={{width:"100%", height:"10vh", border: '1px solid white', borderRadius:20, marginBottom:"3vh", padding:"1vw", display:"flex", alignItems:"center", gap:5}}>
                                            
                                            <div style={{width:"40%"}}>
                                                <div style={{display:"flex", }}>
                                                    <DriveFileRenameOutline fontSize='medium' sx={{color:"gray", width:"auto", marginRight:"0.5vw"}}/>
                                                    <Typography fontSize={"1vw"} textTransform={"capitalize"} color="gray" fontWeight={"bold"} mb="0.5vh">
                                                        Nama Pegawai : 
                                                    </Typography>
                                                </div>
                                                <Typography fontSize={"1.3vw"} textTransform={"capitalize"} color="black" fontWeight={"bold"}>
                                                    {item.nama ? item.nama : "-"}
                                                </Typography>
                                            </div>

                                            <div style={{width:"20%"}}>
                                                <div style={{display:"flex", }}>
                                                    <MapOutlined fontSize='medium' sx={{color:"gray", width:"auto", marginRight:"0.5vw"}}/>
                                                    <Typography fontSize={"1vw"} textTransform={"capitalize"} color="gray" fontWeight={"bold"} mb="0.5vh">
                                                        Provinsi : 
                                                    </Typography>
                                                </div>
                                                <Typography fontSize={"1.3vw"} textTransform={"capitalize"} color="black" fontWeight={"bold"}>
                                                    {item.provinsi && typeof item.provinsi === 'object' ? "-" : item.provinsi}
                                                </Typography>
                                            </div>

                                            <div style={{width:"20%"}}>
                                                <div style={{display:"flex", }}>
                                                    <LocationOnOutlined fontSize='medium' sx={{color:"gray", width:"auto", marginRight:"0.5vw"}}/>
                                                    <Typography fontSize={"1vw"} textTransform={"capitalize"} color="gray" fontWeight={"bold"} mb="0.5vh">
                                                        Kabupaten / Kota : 
                                                    </Typography>
                                                </div>
                                                <Typography fontSize={"1.3vw"} textTransform={"capitalize"} color="black" fontWeight={"bold"}>
                                                    {item.kabupaten && typeof item.kabupaten === 'object' ? "-" : item.kabupaten}
                                                </Typography>
                                            </div>

                                            <div style={{width:"20%", display:"flex", gap:5, alignItems:"center", justifyContent:"center"}}>

                                                <Button variant="contained" startIcon={<Badge />} 
                                                    onClick={()=>(handleOpen(),setAksiBtn("detail"),setPegawaiNama(item.nama),setNamaProv(item.provinsi),setNamaKab(item.kabupaten),setNamaKec(item.kecamatan),setNamaKel(item.kelurahan),setPegawaiJln(item.jalan))}>
                                                    Detail
                                                </Button>
                                                <Button variant="contained" startIcon={<SettingsApplications />} color="success"
                                                    onClick={()=>(handleOpen(),setAksiBtn("edit"),setDataIdPegawai(item.id),setPegawaiNama(item.nama),setNamaProv(item.provinsi),setNamaKab(item.kabupaten),setNamaKec(item.kecamatan),setNamaKel(item.kelurahan),setPegawaiJln(item.jalan))}>
                                                    Update
                                                </Button>
                                                <Button variant="contained" startIcon={<Delete />} color='error' 
                                                    onClick={()=>(handleOpen(),setAksiBtn("hapus"),setDataIdPegawai(item.id),setPegawaiNama(item.nama),setNamaProv(item.provinsi),setNamaKab(item.kabupaten),setNamaKec(item.kecamatan),setNamaKel(item.kelurahan),setPegawaiJln(item.jalan))}>
                                                    Delete
                                                </Button>
                                            </div>

                                        </Paper>
                                    </>
                                ))
                        }

                    </div>
                </div>
            </div>

            {/* modal */}
            <Modal
                open={open}
                // onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div style={{display:"flex", alignItems:"center", justifyContent:"end"}}>
                        <Button variant="contained" startIcon={<Cancel />} color='error' onClick={handleClose}>
                            Close
                        </Button>
                    </div>

                    <div style={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>

                        <Typography id="modal-modal-title" fontSize={"1.3vw"} textTransform={"capitalize"} color="black" fontWeight={"bold"} marginBottom={"2vh"}>
                            Sistem Kepegawaian
                        </Typography>
                        <Typography id="modal-modal-title" fontSize={"1vw"} textTransform={"capitalize"} color="red" fontWeight={"bold"} marginBottom={"2vh"} style={{display: errPegawai?"block":"none"}}>
                            * Harap Lengkapi Seluruh Form
                        </Typography>
                    </div>

                    <TextField 
                        id="namaPegawai" 
                        label="Nama Pegawai" 
                        variant="outlined" 
                        fullWidth 
                        sx={{marginBottom:"3vh"}} 
                        defaultValue={pegawaiNama}
                        disabled={aksiBtn=="detail"||aksiBtn=="hapus"?true:false}
                        onChange={(event)=>setPegawaiNama(event.target.value)}
                    />

                    <TextField 
                        id="namaProv" 
                        label="Provinsi" 
                        variant="outlined" 
                        fullWidth 
                        sx={{marginBottom:"3vh", display:aksiBtn=="tambah"||aksiBtn=="edit"?"none":"block"}} 
                        defaultValue={namaProv}
                        disabled
                    />
                    
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={dataProvinsi}
                        getOptionLabel={(option)=>option.name}
                        sx={{marginBottom:"3vh"}}
                        fullWidth    
                        hidden={aksiBtn=="detail"||aksiBtn=="hapus"?true:false}            
                        onChange={selectProvinsi}
                        renderInput={(params) => <TextField {...params} label={aksiBtn=="edit"?"Provinsi : "+namaProv:"Provinsi"} />}
                    />

                    <TextField
                        id="outlined-select-currency"
                        select={aksiBtn=="detail"||aksiBtn=="hapus"?false:true}
                        defaultValue={aksiBtn=="detail"||aksiBtn=="hapus"?namaKab:null}
                        disabled={aksiBtn=="detail"||aksiBtn=="hapus"?true:false}
                        label={aksiBtn=="edit"?"Kabupaten / Kota : "+namaKab:"Kabupaten / Kota"}
                        sx={{marginBottom:"3vh"}}
                        fullWidth
                        onChange={selectKabupaten}
                    >
                        {dataKabKota.map((item) => (
                            <MenuItem key={item.id} value={item.id}>
                            {item.name}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        id="outlined-select-currency"
                        select={aksiBtn=="detail"||aksiBtn=="hapus"?false:true}
                        defaultValue={aksiBtn=="detail"||aksiBtn=="hapus"?namaKec:null}
                        disabled={aksiBtn=="detail"||aksiBtn=="hapus"?true:false}
                        label={aksiBtn=="edit"?"Kecamatan : "+namaKec:"Kecamatan"}
                        sx={{marginBottom:"3vh"}}
                        fullWidth
                        onChange={selectKecamatan}
                    >
                        {dataKecamatan.map((item) => (
                            <MenuItem key={item.id} value={item.id}>
                            {item.name}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        id="outlined-select-currency"
                        select={aksiBtn=="detail"||aksiBtn=="hapus"?false:true}
                        defaultValue={aksiBtn=="detail"||aksiBtn=="hapus"?namaKel:null}
                        disabled={aksiBtn=="detail"||aksiBtn=="hapus"?true:false}
                        label={aksiBtn=="edit"?"Kelurahan / Desa : "+namaKel:"Kelurahan / Desa"}
                        sx={{marginBottom:"3vh"}}
                        fullWidth
                        onChange={selectKelurahan}
                    >
                        {dataKelurahan.map((item) => (
                            <MenuItem key={item.id} value={item.id}>
                            {item.name}
                            </MenuItem>
                        ))}
                    </TextField>
                    
                    <TextField 
                        id="namaJalan" 
                        label="Alamat" 
                        variant="outlined" 
                        fullWidth 
                        sx={{marginBottom:"3vh"}} 
                        defaultValue={pegawaiJln}
                        disabled={aksiBtn=="detail"||aksiBtn=="hapus"?true:false}
                        onChange={(event)=>setPegawaiJln(event.target.value)}
                    />

                    <Button variant="contained" color="success" onClick={tambahPegawai} fullWidth style={{display:aksiBtn=="tambah"?"flex":"none", gap:10}}>
                        <ThreeCircles 
                            width='50'
                            height="60"
                            color="#fff"
                            visible={aksiLoading==true?true:false}
                        />
                        <Typography fontSize={"1.2vw"} textTransform={"capitalize"} color="white" fontWeight={"bold"} display={aksiLoading==true?"none":"block"}>
                            Tambah Pegawai
                        </Typography>
                        
                    </Button>

                    <Button variant="contained" color="error" onClick={()=>hapusPegawai(dataIdPegawai)} fullWidth style={{display:aksiBtn=="hapus"?"flex":"none", gap:10}}>
                        <ThreeCircles 
                            width='50'
                            height="60"
                            color="#fff"
                            visible={aksiLoading==true?true:false}
                        />
                        <Typography fontSize={"1.2vw"} textTransform={"capitalize"} color="white" fontWeight={"bold"} display={aksiLoading==true?"none":"block"}>
                            Hapus Data Pegawai
                        </Typography>
                        
                    </Button>

                    <Button variant="contained" color="success" onClick={()=>updatePegawai(dataIdPegawai)} fullWidth style={{display:aksiBtn=="edit"?"flex":"none", gap:10}}>
                        <ThreeCircles 
                            width='50'
                            height="60"
                            color="#fff"
                            visible={aksiLoading==true?true:false}
                        />
                        <Typography fontSize={"1.2vw"} textTransform={"capitalize"} color="white" fontWeight={"bold"} display={aksiLoading==true?"none":"block"}>
                            Update Data Pegawai
                        </Typography>
                        
                    </Button>
                </Box>
            </Modal>
        </div>
    )
}

export default HomeAdmin