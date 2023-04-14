import { FormControl,Radio, RadioGroup, FormLabel, FormControlLabel, Box, TextField, Button, IconButton } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from 'dayjs';

import './User.css'
import { API_URL } from '../Assests/global';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';


function User({creationId}){
    const location = useLocation()
    const INITIAL_USERSTATE = {
      id: '',
      first_name: '',
      last_name: '',
      email: '',
      gender:'',
      avatar: '',
      phone: '',
      bio: '',
      job: '',
      birthday: '01-01-1947',
  }
  var { id } = useParams();
    useEffect(()=>{
      if(id){
        fetch(`${API_URL}/${id}`,{method:"GET"})
          .then(response => response.json())
              .then((edit_user) => {
                //console.log(edit_user)
                    setUser(edit_user);
                })
      }else{
        setUser((user) => ({...user, id: creationId}))
      }
    },[]);

    const [user, setUser] = useState(INITIAL_USERSTATE);
    const navigate = useNavigate();
    
    const handleForm = (e) =>{
      e.preventDefault();
      if(location.pathname.includes('Users/Create')){
        fetch(`${API_URL}`,{method:"POST",body: JSON.stringify(user), headers:{'Content-Type':"application/json"} })
      .then(response =>{response.json()}).then((data)=>{navigate('/Users')})
      }else if(location.pathname.includes('Users/Edit') || location.pathname.includes('Users/Profile-Edit')){
        fetch(`${API_URL}/${id}`,{method:"PUT",body: JSON.stringify(user), headers:{'Content-Type':"application/json"} })
      .then(response =>{response.json()}).then((data)=>{navigate('/Users')})
      }
      
    }
    return (
        <Box sx={{ flexGrow: 1, p:'15px'}}>
          <IconButton
                size="medium"
                color="primary"
                aria-label="back"
                onClick={() => {navigate(-1)}}
                title="back"
                sx={{ml:'-91vw'}}
              >
                <ArrowBackIosNewIcon sx={{fontSize:'2.5rem'}}/>
              </IconButton> 
          <form className="user-form" onSubmit={handleForm}>
            <FormControl sx={{minWidth: '80%'}} >
                <TextField className="input-field" id="id" label="id" variant="standard" aria-describedby="id" disabled={true} value={creationId? creationId:user.id}/>
                <Box className="inner-box input-field" sx={{display: 'flex', flexDirection:'row', justifyContent:'space-between'}}>
                    <TextField id="first_name" label="First Name" variant="standard" aria-describedby="first name" sx={{minWidth:'40%'}} required={true}
                        value={user.first_name} onChange={(event) => {setUser((user) => ({...user, first_name: event.target.value}))}}
                    />
                    <TextField id="last_name" label="Last Name" variant="standard" aria-describedby="last name" sx={{minWidth:'40%'}} required={true}  
                        value={user.last_name} onChange={(event) => {setUser((user) => ({...user, last_name: event.target.value}))}}
                    />
                </Box>
                <FormLabel id="gender" sx={{display: 'inherit'}}>Gender</FormLabel>
                <RadioGroup
                  className="input-field"
                  aria-labelledby="gender"
                  defaultValue="Female"
                  name="gender"
                  row={true}
                >
                  <FormControlLabel value="Female" control={<Radio />} label="Female" />
                  <FormControlLabel value="Male" control={<Radio />} label="Male" />
                  <FormControlLabel value="Other" control={<Radio />} label="Other" />
                </RadioGroup>
                <TextField id="email" label="Email Address" variant="standard" aria-describedby="email" type='email'className="input-field" required={true}
                        value={user.email} onChange={(event) => {setUser((user) => ({...user, email: event.target.value}))}}
                />
                <TextField id="avatar" label="Profile Picture Link" variant="standard" aria-describedby="avatar" className="input-field"  
                        value={user.avatar} onChange={(event) => {setUser((user) => ({...user, avatar: event.target.value}))}}
                 />
                <TextField id="phone" label="Phone Number" variant="standard" aria-describedby="phone" type='tel'className="input-field" required={true} 
                        value={user.phone} onChange={(event) => {setUser((user) => ({...user, phone: event.target.value}))}}
                 />
                <TextField id="bio" label="Bio" variant="standard" aria-describedby="bio" multiline={true} rows={2} className="input-field" required={true} 
                        value={user.bio} onChange={(event) => {setUser((user) => ({...user, bio: event.target.value}))}}
                 />
                <TextField id="job" label="Job" variant="standard" aria-describedby="job" className="input-field" required={true} 
                        value={user.job} onChange={(event) => {setUser((user) => ({...user, job: event.target.value}))}}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                      <DatePicker
                        className="input-field"
                        label="DOB"
                        value={dayjs(user.birthday)}
                        onChange={(newValue) => {
                          setUser((user) => ({...user, birthday: newValue.format('MM-DD-YYYY')}))
                      }}
                      />
                    </DemoContainer>
                </LocalizationProvider>
                <Button type="submit" variant="contained" sx={{minWidth:'40%', m:'auto'}}>
                  {location.pathname.includes('Users/Create')? 'Add User': 'Edit User'}
                </Button>
            </FormControl>
            </form>
        </Box>
    );

}

export default User;