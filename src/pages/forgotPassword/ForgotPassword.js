import React, {useState} from "react";
import './ForgotPassword.css'
import {useHistory} from "react-router-dom";

function ForgotPassword() {

    const [email, setEmail] = useState('');

    const history = useHistory();


    function handleSubmit() {

        console.log(email);
        history.push('/email-send');

    }

    return (
        <div className="form-page">

                <form onSubmit={handleSubmit}>
                    <label htmlFor="email-field">Email:</label>
                    <input
                        name="email"
                        id="email-filed"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <div className="button-container">
                        <button className="send-link-button" type="submit">Send link</button>
                    </div>
                </form>
        </div>


    )
}

export default ForgotPassword;