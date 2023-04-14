import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import WidgetsIcon from '@mui/icons-material/Widgets';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Drawer } from '@mui/material';
import { useState } from 'react';
import logo from '../Assests/people-connect-website-favicon-white.png'



export default function NavigationBar({onAction}){

    const [drawerState, setDrawerState] = useState(false);

    const handleToggle = (e) => {
        let currentState = drawerState;
        setDrawerState(!currentState)
        if(e.target.innerHTML=='Dashboard' || e.target.innerHTML=='Users'){
            onAction(e.target.innerHTML);
        }
    }
    const navigatorList = ['Dashboard', 'Users']
    return(
        <Box>
            <AppBar position="static">
            <Toolbar >
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleToggle}
              >
                <WidgetsIcon />
              </IconButton> 
              <Typography variant='h4' sx={{display: 'flex', alignItems:'center'}}>
                    <Box
                        component="img"
                        sx={{ height: 54 }}
                        alt="Logo"
                        src={logo}
                    />
                    Connect
                </Typography>
            </Toolbar>
          </AppBar>
          <Drawer anchor='left' open={drawerState} onClose={handleToggle}>
            <Box sx={{width: 250, p: '10px'}}>
                <List>
                    {navigatorList.map((text) => (
                      <ListItem key={text} disablePadding>
                        <ListItemButton>
                          <ListItemText primary={text} onClick={handleToggle}/>
                        </ListItemButton>
                      </ListItem>
                    ))}
                </List>
            </Box>
          </Drawer>
        </Box>
    )
}