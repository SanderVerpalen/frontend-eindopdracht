import React, {createContext, useState} from "react";

export const LoginContext = createContext({})

function LoginContextProvider({ children }) {
    const [loggedInStatus, setLoggedInStatus] = useState(false)

    function changeLoggedInStatus() {
        setLoggedInStatus(!loggedInStatus);
    }
    const data= {
        loggedIn: loggedInStatus,
        changeLoggedInStatusFunction: changeLoggedInStatus,
    }
    return (
        <LoginContextProvider value={data}>
            {children}
        </LoginContextProvider>
    );
}

export default LoginContextProvider;