import './CreateAccount.css'
import {useEffect, useState} from "react";
import axios from "axios";
import {Link, useHistory} from "react-router-dom";

function CreateAccount() {

    // State for submission to backend.
    const [accountName, setAccountName] = useState('');
    const [password, setPassword] = useState('');

    // State for conditional rendering.
    const [signingUp, toggleSigningUp] = useState(false);
    const [signedUp, toggleSignedUp] = useState(false);
    const [error, toggleError] = useState('');
    const [response, setResponse] = useState({});

    // State for validating input.
    const [validEmail, toggleValidEmail] = useState(false);
    const [validPassword, toggleValidPassword] = useState(true);



    const history = useHistory();

    // Cancel token for unmount-effect.
    const source = axios.CancelToken.source();

    async function handleSubmit(e) {

        e.preventDefault()
        toggleError('');
        toggleSigningUp(true);

        try {
            //If input is equal to admin credentials...
            if (accountName === 'sander.verpalen@gmail.com') {
                const response = await axios.post('https://polar-lake-14365.herokuapp.com/api/auth/signup',
                    {
                        "username": accountName,
                        "email": accountName,
                        "password": password,
                        // Signup user as admin.
                        "role": ["user", "admin"]
                    });
                setResponse(response);
                toggleSignedUp(true);
                history.push('./login');
            } else {
                const response = await axios.post('https://polar-lake-14365.herokuapp.com/api/auth/signup',
                    {
                        "username": accountName,
                        "email": accountName,
                        "password": password,
                        "role": ["user"]
                    });
                setResponse(response);
                toggleSignedUp(true);
                history.push('./login');
            }
        } catch (e) {
            console.error(e);
            toggleError(e.response.data.message);
        }
        toggleSigningUp(false);
    }

    // useEffect for validating input.
    useEffect(() => {
            toggleValidEmail(accountName.includes('@'));
            toggleValidPassword(password.length > 5);
        }, [accountName, password]
    );

    // Unmount-effect.
    useEffect(() => {
        return function cleanup() {
            source.cancel();
        }
    }, []);


    return (
        <>
            {(!signingUp && !signedUp) &&
                <div className="form-page">
                    <form className="create-account" onSubmit={handleSubmit}>
                        <label htmlFor="account-name-field">Please provide your email adres.</label>
                        <input
                            name="accountName"
                            type="email"
                            value={accountName}
                            onChange={(e) => setAccountName(e.target.value)}
                            required
                        />
                        <label htmlFor="password-field">Please provide a secure password.</label>
                        <input
                            name="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <div className="button-container">
                            <button disabled={!(validPassword && validEmail)} type="submit"
                                    className="create-account-button">Create Account
                            </button>
                        </div>
                        <p>Already have an account? <br/>Sign in <Link to="/login">here</Link>.</p>
                        {error && <p>{error}</p>}
                    </form>
                </div>}
            {signingUp && <div className="form-page"><p>Signing up...</p></div>}
            {signedUp && <div className="form-page"><p>{response.data.message}</p></div>}

        </>
    )
}

export default CreateAccount;