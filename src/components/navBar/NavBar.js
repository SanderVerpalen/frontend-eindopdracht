import React from 'react';
import './NavBar.css'
import {NavLink, useHistory} from "react-router-dom";

function NavBar({ authenticator, authenticatorFunction }) {

    const history = useHistory();

    function logOut() {
        console.log("U wordt uitgelogd");
        authenticatorFunction(!authenticator);
        history.push("/");
    }

    return (
        <nav>
            <div className="nav-container">
                <NavLink
                    exact to="/Dashboard"
                    className="nav-link"
                    activeClassName="active-link"
                >Dashboard</NavLink>
                <ul>
                    <li>
                        <NavLink
                            exact to="/"
                            className="nav-link"
                            activeClassName="active-link"
                        >Home</NavLink>
                    </li>
                    <li>
                        <NavLink
                            exact to="/request-offer"
                            className="nav-link"
                            activeClassName="active-link"
                        >Request offer</NavLink>
                    </li>
                    <li>
                        {!authenticator ? <NavLink
                            to="/login"
                            className="nav-link"
                            activeClassName="active-link"
                        >Login</NavLink> : <button onClick={logOut}>Logout</button>}
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default NavBar;