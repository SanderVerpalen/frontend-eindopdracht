import React, {createContext, useState} from "react";

export const LoginContext = createContext({});

function LoginContextProvider({ children }) {

    const [loggedInStatus, setLoggedInStatus] = useState(false)

    function login(){
        setLoggedInStatus(true);
    }

    function logout(){
        setLoggedInStatus(false);
    }

    const data= {
        loggedIn: loggedInStatus,
        logInFunction: login,
        logOutFunction: logout
    }

    return(
        <LoginContext.Provider value={data}>
            { children }
        </LoginContext.Provider>
    )
}

export default LoginContextProvider;