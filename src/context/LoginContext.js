import React, {createContext, useEffect, useState} from "react";
import IsTokenValid from "../helpers/isTokenValid";
import axios from "axios";

export const LoginContext = createContext({});

function LoginContextProvider({ children }) {

    // Context state initialization.

    const [auth, setAuth] = useState({
        isAuth: false,
        user: {
            email: '',
            id: '',
            roles: [],
            username: ''
        },
        // Status for conditional rendering.
        status: 'pending'
    })

    // Cancel token for unmount-effect.
    const source = axios.CancelToken.source();

    // Mount-effect for persistent login.

    useEffect(() => {
        // Get token...
        const token = localStorage.getItem('token');
        // If token is valid...
        if(token && IsTokenValid(token)) {
            async function getUserData(){
                try{
                    // Get user from backend...
                    const response = await axios.get('https://polar-lake-14365.herokuapp.com/api/user',
                        {
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": `Bearer ${token}`,
                            }
                        });
                    // Login user.
                    setAuth({
                        isAuth: true,
                        user: {
                            email: response.data.email,
                            id: response.data.id,
                            roles: response.data.roles,
                            username: response.data.username
                        },
                        status: 'done'
                    })
                }catch(e) {
                    console.log(e);
                    // If there is an error, still set status to done, else page wont load.
                    setAuth({
                        isAuth: false,
                        user: {
                            email: '',
                            id: '',
                            roles: [],
                            username: ''
                        },
                        status: 'done'
                    })
                }
            }
            getUserData();
        } else {
            // If no (valid)token, load page with no user logged in.
            setAuth(
                {
                    isAuth: false,
                    user: {
                        email: "",
                        id: "",
                        roles: [],
                        username: ""
                    },
                    status: 'done'
                }
            )
        }

        // Unmount-eefect.
        return function cleanup() {
            source.cancel();
        }
    },[])

    // Login function.

    function login(user){
        // Set token in local storage at login.
        localStorage.setItem('token', user.data.accessToken);
        // Login user.
        setAuth({
            isAuth: true,
            user: {
                email: user.data.email,
                id: user.data.id,
                roles: user.data.roles,
                username: user.data.username
            },
            status: 'done'
        });
    }

    // Log out function.

    function logout(){
        // Clear stored token.
        localStorage.clear();
        // Log out user.
        setAuth(
            {
                isAuth: false,
                user: {
                    email: "",
                    id: "",
                    roles: [],
                    username: ""
                },
                status: 'done'
            }
        );
    }

    // Context data to be published by the context provider.

    const data = {
        loggedIn: auth.isAuth,
        user: auth.user,
        logInFunction: login,
        logOutFunction: logout
    }

    return(
        <LoginContext.Provider value={data}>
            {auth.status === 'done' ? children : <p>Loading...</p>}
        </LoginContext.Provider>
    )
}

export default LoginContextProvider;