import React,{useState,useEffect,useContext} from 'react';
import {Button, CssBaseline, TextField,Typography,Container} from '@material-ui/core'
import {MainContext} from '../context/MainContext'
import { makeStyles } from '@material-ui/core/styles';
import {NavLink} from 'react-router-dom';
import AuthService from '../services/auth-service'
import {useHistory} from 'react-router-dom'
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

const useStyles = makeStyles((theme) => ({
  paper: {
    background : "#ffffff",
    border : '1px solid #dfe6e9',
    borderRadius : '5px',
    marginTop: theme.spacing(8),
    display: 'flex',
    padding : '20px 15px',
    flexDirection: 'column',
    alignItems: 'center',
    
  },
  form: {
    width: '100%',
    height: '285px', // Fix IE 11 issue.
    marginTop: theme.spacing(4),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    color : "#fff",
    background : '#2d3436'
  },
  submit2: {
    margin: theme.spacing(3, 0, 2),
    color : "#fff",
    background : '#0984e3'
  },
}));

const  Login = () => {
  const classes = useStyles();
  const history = useHistory()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const {jwt, setJwt} = useContext(MainContext)
  const [showAlert , setShowAlert] = useState(false)
  const [alertMsg , setAlertMsg] = useState('')


  const onAlertMessage =async (msg) =>{
          setAlertMsg(msg)
          setShowAlert(true)
  };

  const handleChange = (e) =>{
             switch (e.target.name) {
               case 'username':
                 setUsername(e.target.value)
                 
                 break;
               case 'password':
                 setPassword(e.target.value)
               default:
                 break;
             }
     };

    const onSubmitHandler = async (e) =>{
      e.preventDefault()
       try {

          const user = 
             { 
              username, 
              password
             }  
         
            const res = await AuthService.login(user)
            const {token}  = res?.data
            localStorage.setItem('jwtoken', token)
            setJwt(token)
            history.push('/')
         } catch (error) {

           onAlertMessage(error?.res?.data?.error)
           console.log('Client error', error.res.data.error)
        }
    };
  

    useEffect(() => {
      if(jwt || jwt != ''){
        return history.push('/')
      }
    }, [])

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Log in
        </Typography>
        <form className={classes.form} noValidate onSubmit={(e)=>onSubmitHandler(e)}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            onChange={(e)=>handleChange(e)}
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            onChange={(e)=>handleChange(e)}
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />

          {
            showAlert ?  <Alert severity="warning">{alertMsg}</Alert> : null
          }
         
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
          >
            Login
          </Button>

          <NavLink className="nav-link" to="/signup"><Button
            variant="contained"
            className={classes.submit2}
          >
            Signup
          </Button></NavLink>
        </form>
        
      </div>
      
    </Container>
  );
}


export default Login