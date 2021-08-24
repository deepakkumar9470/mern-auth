import React,{useState} from 'react'

 const MainContext = React.createContext()


const MainContextProvider = (props) => {
    const localjwt  = localStorage.getItem('jwtoken')
    const [jwt, setJwt] = useState(localjwt)

    return (
        <MainContext.Provider value={{jwt, setJwt}}>

            {props.children}
            
        </MainContext.Provider>
    )
}

export  {MainContextProvider,MainContext}
