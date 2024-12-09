"use client"

import React from "react";

const userContext = React.createContext()

export const UserProvider = ({children})=>{
    let [user, setUser] = React.useState({
        email: "",
        profile_img: ""
    })

    return (
        <userContext.Provider value={{user, setUser}}>
            {children}
        </userContext.Provider>
    )
}

export default function useUserContext() {
    return React.useContext(userContext)
}