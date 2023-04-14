import * as React from 'react';
import Back from '../NavigationBar/Back';
import { Avatar, Box, CircularProgress, Grid, IconButton, List, ListItem, ListItemIcon, ListItemText, Paper, Typography } from '@mui/material';
import { API_URL } from '../Assests/global';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import TagIcon from '@mui/icons-material/Tag';
import WcIcon from '@mui/icons-material/Wc';
import CakeIcon from '@mui/icons-material/Cake';
import InfoIcon from '@mui/icons-material/Info';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import EditIcon from '@mui/icons-material/Edit';


function Profile() {
    const navigate = useNavigate();
    const {id} = useParams();
    const [userProfile,setUserProfile] = useState({});
    useEffect(()=>{
        fetch(`${API_URL}/${id}`,{method:"GET"})
          .then(response => response.json())
              .then((user) => {
                setUserProfile(user);
                //console.log(user)
                })
        },[]);
    return(
        <Grid container>
            <Box sx={{height:'25vh', minWidth:'100vw', backgroundColor:'lavender'}}>
                <Box sx={{minWidth:'100vw', display:'flex', justifyContent:'space-between'}}>
                    <Box sx={{maxWidth:'fit-content'}}><Back /></Box>
                    <IconButton aria-label="edit user" color="primary" sx={{mr:'15px'}} onClick={() => {
                      navigate(`/Users/Profile-Edit/${id}`);
                      //console.log(userProfile.id);
                    }}>
                      <EditIcon sx={{fontSize:'2.4rem'}}/>
                    </IconButton>
                </Box>
                
                <Avatar src={userProfile.avatar} sx={{ m:'auto', mt:'-5vh', minHeight:'150px', minWidth:'150px', backgroundColor:'primary.main', fontSize:'xxx-large'}} >
                        {Object.getOwnPropertyNames(userProfile).length>0 ? userProfile.first_name.charAt(0)+" "+userProfile.last_name.charAt(0) : 'No Image'}
                </Avatar>
                <Typography gutterBottom variant="h5" component="div" sx={{mt:'10px'}}>
                    {userProfile.first_name+' '+userProfile.last_name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                          {userProfile.job}
                </Typography>
            </Box>
            <Grid container sx={{mt:'16vh', p:'0px 20px'}} spacing={2}>
                <Grid item xs={10} md={6} >
                    <Paper elevation={5} sx={{minHeight:'45vh'}}>
                        <List >
                            <ListItem>
                                <ListItemIcon>
                                  <TagIcon sx={{fontSize:'35px'}}/>
                                </ListItemIcon>
                                <ListItemText primary={`ID: ${userProfile.id}`} />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                  <WcIcon sx={{fontSize:'35px'}}/>
                                </ListItemIcon>
                                <ListItemText primary={`Gender: ${userProfile.gender}`} />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                  <CakeIcon sx={{fontSize:'35px'}}/>
                                </ListItemIcon>
                                <ListItemText primary={`DOB: ${userProfile.birthday}`} />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                  <InfoIcon sx={{fontSize:'35px'}}/>
                                </ListItemIcon>
                                <ListItemText primary={`Bio: ${userProfile.bio}`} />
                            </ListItem>
                        </List>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper elevation={5} sx={{minHeight:'45vh'}}>
                        <List>
                            <ListItem>
                            <ListItemIcon>
                                  <EmailIcon sx={{fontSize:'35px'}}/>
                                </ListItemIcon>
                                <ListItemText primary={`Email Address: ${userProfile.email}`} />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                  <PhoneIcon sx={{fontSize:'35px'}}/>
                                </ListItemIcon>
                                <ListItemText primary={`Contact Number: ${userProfile.phone}`} />
                            </ListItem>
                        </List>
                    </Paper>
                </Grid>
            </Grid> 
            
        </Grid>
         
    );
}

export default Profile;