import React, { createContext, useEffect, useState } from 'react'

export const StoreContext = createContext(null)

const StoreContextProvider=(props)=>{
    const [token,setToken]=useState("");

    useEffect(()=>{
        if(localStorage.getItem("token")){
            setToken(localStorage.getItem("token"));
        }
    },[])
    const contextValue={
        token,
        setToken
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;
