import './Profile.css'
import React, {useContext, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {LoginContext} from "../../context/LoginContext";
import axios from "axios";


function Profile() {

    const {logOutFunction, logInFunction, user} = useContext(LoginContext);

    const token = localStorage.getItem('token');
    const history = useHistory();

    const [selectedImage, setSelectedImage] = useState(null);
    // const [profilePicture, setProfilePicture] = useState(null);
    const [email, setEmail] = useState('');
    // const [info, setInfo] = useState('');
    const [error, setError] = useState('');
    const [loading, toggleLoading] = useState(false);
    const [currentUser, setCurrentUser] = useState({});

    const source = axios.CancelToken.source();

    useEffect(() => {

        async function getUser() {
            setError('');
            toggleLoading(true);
            try {
                const response = await axios.get(
                    'https://polar-lake-14365.herokuapp.com/api/user', {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`,
                        }
                    }
                )
                setCurrentUser(response.data);
            } catch (e) {
                console.error(e);
                setError(e.response);
            }
            toggleLoading(false);
        }

        getUser();

        return function cleanup() {
            source.cancel();
        }
    }, [])

    function logOut() {
        logOutFunction();
        history.push("/");
    }

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };


    async function uploadImage(e) {
        e.preventDefault();
        const convertedImage = await convertToBase64(selectedImage);
        setError('');
        toggleLoading(true);


        try {
            const response = await axios.post('https://polar-lake-14365.herokuapp.com/api/user/image',
                {
                    "base64Image": convertedImage
                }, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    }
                });
        } catch (e) {
            console.error(e);
            setError(e.response);
        }
        toggleLoading(false);
    }

    async function changeEmail(e) {
        e.preventDefault();
        setError('');
        toggleLoading(true);

        try {
            const response = await axios.put('https://polar-lake-14365.herokuapp.com/api/user',
                {
                    "password": 123467,
                    "repeatedPassword": 123467
                }, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    }
                });
        } catch (e) {
            console.error(e);
            setError(e.response);
        }
        toggleLoading(false);
    }

    return (
        <>
            <div className="form-page">
                <form onSubmit={uploadImage}>
                    <h1>Profile picture</h1>
                    <div className="tile-container">
                        {selectedImage && <img alt="not fount" src={URL.createObjectURL(selectedImage)}/>}
                    </div>
                    {selectedImage &&
                        <div>
                            <button onClick={() => setSelectedImage(null)}>Remove</button>
                            <button type="submit">Upload</button>
                        </div>
                    }
                    <input
                        type="file"
                        name="myImage"
                        onChange={(e) => {
                            setSelectedImage(e.target.files[0]);
                        }}
                    />
                    {/*{profilePicture && <img src={`data:image/png;base64,${profilePicture}`}/>}*/}
                </form>

                <form onSubmit={changeEmail}><input
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                    <button className="change-email-button" type="submit">Change email</button>
                </form>

                {loading && <p>Loading...</p>}
                {error && <p>Er gaat iets mis.</p>}

                {currentUser &&
                    <article>
                        <h3>{currentUser.username}</h3>
                        <p>{currentUser.email}</p>
                        <button className="log-out-button" onClick={logOut}>Logout</button>
                    </article>}
            </div>

        </>
    )
}

export default Profile;