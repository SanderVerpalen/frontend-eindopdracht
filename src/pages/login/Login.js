import './Login.css'
import {Link, useHistory} from "react-router-dom";
import {LoginContext} from "../../context/LoginContext";
import {useContext, useState, useEffect} from "react";
import axios from "axios";


function Login() {

    const {logInFunction, loggedIn} = useContext(LoginContext);
    const source = axios.CancelToken.source();

    const [accountName, setAccountName] = useState('');
    const [password, setPassword] = useState('');
    const [loggingIn, toggleLoggingIn] = useState(false);
    const [error, toggleError] = useState('');
    const [validEmail, toggleValidEmail] = useState(false);
    const [validPassword, toggleValidPassword] = useState(false);

    const history = useHistory();


    async function handleLogin(e) {

        e.preventDefault()
        toggleError('');
        toggleLoggingIn(true);

        try {
            const response = await axios.post('https://polar-lake-14365.herokuapp.com/api/auth/signin',
                {
                    "username": accountName,
                    "password": password
                });

            logInFunction(response);
            history.push('./')
        } catch (e) {
            console.error(e);
            toggleError(e.response.data.error);
        }
        toggleLoggingIn(false);
    }

    useEffect(() => {
            toggleValidEmail(accountName.includes('@'));
            toggleValidPassword(password.length > 5);
        }, [accountName, password]
    );

    useEffect(() => {
        return function cleanup() {
            source.cancel();
        }
    }, []);

    return (
        <>
            {(!loggingIn && !loggedIn) &&
                <div className="form-page">
                    <form className="login" onSubmit={handleLogin}>
                        <label htmlFor="account-name-field">Email:</label>
                        <input
                            name="accountName"
                            type="email"
                            value={accountName}
                            onChange={(e) => setAccountName(e.target.value)}
                            required
                        />
                        <label htmlFor="password-field">Password:</label>
                        <input
                            name="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <div className="forgot-password-container"><Link to="./forgot-password">Forgot password?</Link>
                        </div>
                        <div className="link-and-button-container">
                            <Link to="./create-account">No account yet?</Link>
                            <button disabled={!(validPassword && validEmail)} type="submit"
                                    className="login-button">Login
                            </button>
                        </div>
                        {error && <p>{error} </p>}
                    </form>
                </div>}
            {loggedIn && <div className="form-page"><p>You are logged in.</p></div>}
            {loggingIn && <div className="form-page"><p>Logging in...</p></div>}
        </>
    )
}

export default Login;