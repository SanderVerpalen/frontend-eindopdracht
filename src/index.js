import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css';
import LoginContextProvider from "./context/LoginContext";

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <LoginContextProvider>
                <App/>
            </LoginContextProvider>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);
