import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Navbar from './components/Navbar'
import {MainContextProvider} from './context/MainContext'
import AuthComponent from './services/AuthComponent';

function App() {
  return (
        <MainContextProvider>
          <Router>
            <Navbar/>
            <Switch>
             
              <Route exact path="/"> 
               <AuthComponent>
                  <Home/> 
                </AuthComponent>
              </Route>
              <Route exact path="/login"><Login/></Route>
              <Route exact path="/signup"><SignUp/></Route>

            </Switch>
          </Router>
        </MainContextProvider>
        
    
  );
}

export default App;
