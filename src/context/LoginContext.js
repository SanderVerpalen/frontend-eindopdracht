import React, {createContext, useEffect, useState} from "react";
import IsTokenValid from "../helpers/isTokenValid";
import axios from "axios";

export const LoginContext = createContext({});

function LoginContextProvider({ children }) {

    const [auth, setAuth] = useState({
        isAuth: false,
        user: {
            email: '',
            id: '',
            roles: [],
            username: ''
        },
    })

    const source = axios.CancelToken.source();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token && IsTokenValid(token)) {
            async function getUserData(){
                try{
                    const response = await axios.get('https://polar-lake-14365.herokuapp.com/api/user',
                        {
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": `Bearer ${token}`,
                            }
                        });
                    setAuth({
                        isAuth: true,
                        user: {
                            email: response.data.email,
                            id: response.data.id,
                            roles: response.data.roles,
                            username: response.data.username
                        }
                    })
                }catch(e) {
                    console.log(e);
                }
            }
            getUserData();
        } else {
            setAuth(
                {
                    isAuth: false,
                    user: {
                        email: "",
                        id: "",
                        roles: [],
                        username: ""
                    }
                }
            )
        }
        return function cleanup() {
            source.cancel();
        }
    },[])

    function login(user){
        localStorage.setItem('token', user.data.accessToken);
        setAuth({
            isAuth: true,
            user: {
                email: user.data.email,
                id: user.data.id,
                roles: user.data.roles,
                username: user.data.username
            },
        });
    }

    function logout(){
        localStorage.clear();
        setAuth(
            {
                isAuth: false,
                user: {
                    email: "",
                    id: "",
                    roles: [],
                    username: ""
                }
            }
        );
    }

    const data = {
        loggedIn: auth.isAuth,
        user: auth.user,
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