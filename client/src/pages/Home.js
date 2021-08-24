import React, { useContext, useState, useEffect } from "react";
import { MainContext } from '../context/MainContext';
import { useHistory } from 'react-router-dom';
import AuthService from '../services/auth-service';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Home = () => {
  const classes = useStyles();
  const { jwt, setJwt } = useContext(MainContext);
  const [parsedData, setParsedData] = useState('')
  const history = useHistory();


  const logout = () => {
    AuthService.logout()
    setJwt('')
    return history.push('/login')
  }

  useEffect(() => {
    try {
        return setParsedData(JSON.parse(atob(jwt.split('.')[1])))
    } catch (error) {
        localStorage.removeItem('jwtoken')
        setJwt('')
      return history.push('/login')
    }
  }, [jwt, history,setJwt])


  return (
    <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        
        <div className={classes.paper}>
           <h1>Home Page</h1>
            <h1>Deepak Kumar Chouhan</h1>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rei</p>
        </div>
        <Button
          onClick={() => logout()}
          fullWidth
          variant="contained"
          color="secondary"
          className={classes.submit}
        >
          Logout
          </Button>
      </Container>
    </div >
  );
};

export default Home;