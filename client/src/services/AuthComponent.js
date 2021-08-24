import React,{useEffect,useContext} from 'react'
import {MainContext} from '../context/MainContext';
import {useHistory} from 'react-router-dom'

const AuthComponent = (props) => {
    const {jwt} = useContext(MainContext)
    const history = useHistory()

    useEffect(() => {
        if(!jwt || jwt === ''){
            history.push('/')
        }
        
    }, [jwt,history])

    return (
        <div>
            {props.children}
        </div>
    )
}

export default AuthComponent
