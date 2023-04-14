import './App.css';
import * as React from 'react';
import {customTheme} from './Theme/theme'
import NavigationBar from './NavigationBar/NavigationBar'
import Content from './Content/Content';
import { ThemeProvider } from '@mui/material/styles';
import  Dashboard  from './Content/Dashboard';
import User from './Content/User';
import Profile from './Content/Profile';
import {Routes, Route, useNavigate} from 'react-router-dom'



function App() {
  const navigate = useNavigate();
  const [idToBeUsed,setIdToBeUsed] = React.useState(undefined);
  const routes = [{route:'Dashboard', path:'/'},{route:'Users', path:'/Users'}, {route:'Create new User', path:'/Users/Create'}]
  const handleNavigation = (routeToValue, newId) => {
    let to = routes.filter((data) => data.route === routeToValue);
    //console.log(to,to[0].path);
    navigate(to[0].path);
    setIdToBeUsed(newId);
  }
  return (
    <div className="App">
      <ThemeProvider theme={customTheme}>
          <NavigationBar onAction={handleNavigation}/>
           <Routes>
           <Route path="/" element={<Dashboard />}></Route>
            <Route path="/Users" index element={<Content onAction={handleNavigation}/>}></Route>
            <Route path="/Users/Create" element={<User creationId={idToBeUsed}/>}></Route>
            <Route path="/Users/Edit/:id" element={<User />}></Route>
            <Route path="/Users/Profile/:id" element={<Profile />}></Route>
            <Route path="/Users/Profile-Edit/:id" element={<User />}></Route>
            {/* <Route path="/404" element={<PageNotFound/>}></Route>
            <Route path="*" element={<Navigate replace to="/404"/>}></Route>  */}
        </Routes> 
      </ThemeProvider>
    </div>
  );
}

export default App;
