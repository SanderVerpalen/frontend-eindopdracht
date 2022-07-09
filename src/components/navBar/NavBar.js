import React, {useContext} from 'react';
import './NavBar.css'
import {NavLink, useHistory} from "react-router-dom";
import {LoginContext} from "../../context/LoginContext";

function NavBar() {


    const { loggedIn, user } = useContext(LoginContext);



    return (
        <nav>
            <div className="nav-container">
                {(user.roles.length === 2) ? <NavLink
                    exact to="/Dashboard"
                    className="nav-link"
                    activeClassName="active-link"
                >Dashboard</NavLink> : <img className="logo-pic" src={require('../../assets/logo.png')} alt="logo-pic"/>}
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
                        {!loggedIn ? <NavLink
                            to="/login"
                            className="nav-link"
                            activeClassName="active-link"
                        >Login</NavLink> : <NavLink
                            to="/profile"
                            className="nav-link"
                            activeClassName="active-link"
                        >Profile</NavLink>}
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default NavBar;