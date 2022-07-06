import './Login.css'
import {Link} from "react-router-dom";
import {LoginContext} from "../../context/LoginContext";
import {useContext} from "react";


function Login() {

    const { test1 } = useContext(LoginContext)
    console.log(test1);

    return (
        <div className="login-page">
            <form className="login">
                <label htmlFor="account-name">Account name</label>
                <input
                    name="accountName"
                    type="text"
                />
                <label htmlFor="password">Password</label>
                <input
                    name="password"
                    type="password"
                />
                <p className="forgot-password"><Link to="./forgot-password">Forgot password?</Link></p>
                <div className="link-and-button-container">
                    <Link to="./create-account">No account yet?</Link>
                    <button type="submit" className="login-button">Login</button>
                </div>
            </form>
        </div>
    )
}

export default Login;