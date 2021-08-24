import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {AppBar, Toolbar, Button, Typography,IconButton} from '@material-ui/core';
import {NavLink} from 'react-router-dom'


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background : '#2f3640'
  },
  menuButton: {
    marginRight: theme.spacing(5),
  },
  title: {
    flexGrow: 1,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    background : '#000',
    color : '#fff'
  },
}));

const  Navbar =()=>{
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.root}>
        <Toolbar>
           <NavLink to="/" className="nav-link">
             <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <img src="/images/mern.png" alt="logo"  className="logo" />
             </IconButton>
           </NavLink>
           
              <Typography variant="h6" className={classes.title}>
                MERN Auth
              </Typography>
          
          

          <NavLink to="/login" className="nav-link">
            <Button color="inherit">Login</Button>
          </NavLink>
          

          <NavLink to="/signup" className="nav-link">
            <Button color="inherit">SignUp</Button>
          </NavLink>

          <NavLink to="#" className="nav-link">
                <Button
                  fullWidth
                  variant="contained"
                  color="secondary"
                  className={classes.submit}
                >Logout</Button>
          </NavLink>
          
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar
