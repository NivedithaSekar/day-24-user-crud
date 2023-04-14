import * as React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Button, CardActions } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { API_URL } from '../Assests/global';
import { useNavigate } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';


function UsersProfile(props) {
    const xsLimit = useMediaQuery('(max-width:600px)');
    const navigate = useNavigate();
    const getUserList = props.getUserList;
    const user = props.profile;
    const userName = user.first_name+' '+user.last_name;
    const id = user.id;
    const [userFocused, setuserFocused] = React.useState(false);
    const onHovering = (e) => {
        //console.log('OnHovering called')
        setuserFocused(true);
    }
    const onBlurring = (e) => {
        //console.log('Onblurring called')
        setuserFocused(false);
    }
    return(
        <Grid item xs={12} sm={4} md={3} sx={{p:'auto'}} >
            <Card sx={{ maxWidth: (xsLimit? 'auto': 345), minHeight: 245, pt:'inherit'}} raised={userFocused} onMouseOver={onHovering} onMouseLeave={onBlurring}>
                  <Avatar src={user.avatar} sx={{ width: 56, height: 56, margin: 'auto', backgroundColor:'primary.main'}} >
                    {Object.getOwnPropertyNames(user).length>0 ? user.first_name.charAt(0)+" "+user.last_name.charAt(0) : 'No Image'}
                  </Avatar>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {userName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {user.job}
                    </Typography>
                  </CardContent>
                <CardActions>
                  <Button size="small" sx={{margin: 'auto'}} onClick={() => {
                      navigate(`/Users/Profile/${id}`);
                    }}>
                    View Profile
                  </Button>
                  <div>
                    <IconButton aria-label="delete user" color="error" onClick={() => {
                      fetch(`${API_URL}/${id}`,{method:"DELETE"})
                      .then(response => response.json()).then((del_user) => {
                        console.log(del_user);
                        getUserList();
                      });
                    }}>
                      <DeleteIcon />
                    </IconButton>
                    <IconButton aria-label="edit user" color="primary" onClick={() => {
                      navigate(`/Users/Edit/${id}`);
                    }}>
                      <EditIcon />
                    </IconButton>
                  </div>
                </CardActions>
            </Card>
        </Grid>
    )
}

export default UsersProfile;
