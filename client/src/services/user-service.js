import axios from 'axios'


import authHeader from './auth-Header'


const API_URL = 'http://localhost:5000/api/auth'

const UserService = {

    getUserDash() {
         return axios.get(`${API_URL}/user`,
         {header : authHeader()})
    },

}

export default UserService;