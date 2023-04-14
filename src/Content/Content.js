import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import UsersProfile from './UsersProfile';
import CircularProgress from '@mui/material/CircularProgress';
import { API_URL } from '../Assests/global';
import { IconButton, Typography } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

function Content({onAction}) {
  
const [userData, setUserData] = useState(); 

const getUserList = ()=>{
  fetch(API_URL)
  .then((response) => response.json())
  .then((data) => {setUserData(data); })
}

  useEffect(()=>{
    getUserList();
  },[])
   
const createNewUser = () => {
  onAction('Create new User',+(userData[userData.length-1].id)+1);
}
return (
    <Box sx={{ flexGrow: 1, p:'10px'}}>
      <Grid container spacing={2} sx={{width: '100%', m:'auto', alignItems:'center', flexDirection:'row-reverse'}}>
      <IconButton color="primary" aria-label="Create new User" size='large' onClick={createNewUser}>
          <AddCircleIcon sx={{fontSize:'3.5rem'}}/>
        </IconButton>
        <Typography variant="button" >
           Create New User
        </Typography>
      </Grid>
      <Grid container spacing={2} sx={{width: '100%', m:'auto', justifyContent:'center'}}>
        {userData ? userData.map((data) => {
              return <UsersProfile profile={data} key={data.id} getUserList={getUserList} />
          }) : <CircularProgress color='primary'/>}
      </Grid>
    </Box>
  )
}

export default Content;
