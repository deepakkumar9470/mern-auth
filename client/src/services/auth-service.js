import axios from 'axios'


const API_URL = 'http://localhost:5000/api/auth'


const AuthService = {
    signup(credentials) {
         return axios.post(`${API_URL}/signup`,credentials)
    },

    login(credentials) {
        return axios.post(`${API_URL}/login`,credentials)
   },

   logout(){
     return localStorage.removeItem('jwtoken')
   },

   getCurrentUser(){
    return JSON.parse(localStorage.getItem('jwtoken'))
  }

}

export default AuthService;