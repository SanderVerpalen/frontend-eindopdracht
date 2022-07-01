import React, {createContext, useState} from "react";

export const LoginContext = createContext({});

function LoginContextProvider({ children }) {

    const [loggedInStatus, setLoggedInStatus] = useState(false)

    function changeLoggedInStatus() {
        setLoggedInStatus(!loggedInStatus);
    }

    const data= {
        loggedIn: loggedInStatus,
        changeLoggedInStatusFunction: changeLoggedInStatus,
    }

    return(
        <LoginContext.Provider value={data}>
            { children }
        </LoginContext.Provider>
    )
}

export default LoginContextProvider