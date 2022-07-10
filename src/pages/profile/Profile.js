import './Profile.css'
import React, {useContext, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {LoginContext} from "../../context/LoginContext";
import axios from "axios";


function Profile() {

    // Context for logout function.
    const {logOutFunction} = useContext(LoginContext);

    // Token to send to the backend.
    const token = localStorage.getItem('token');

    const history = useHistory();

    // State for uploading to and make changes in the backend.
    const [selectedImage, setSelectedImage] = useState(null);
    // const [profilePicture, setProfilePicture] = useState(null);
    const [email, setEmail] = useState('');
    // const [info, setInfo] = useState('');

    // State for conditional rendering.
    const [error, setError] = useState('');
    const [loading, toggleLoading] = useState(false);
    const [currentUser, setCurrentUser] = useState({});

    // Cancel token for unmount-effect.
    const source = axios.CancelToken.source();

    // Mount-effect to get current user.
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
                console.log(response);
                // Set current user to display profile
                setCurrentUser(response.data);
            } catch (e) {
                console.error(e);
                setError(e.response);
            }
            toggleLoading(false);
        }

        getUser();

        // Unmount-effect.
        return function cleanup() {
            source.cancel();
        }
    }, [])

    // Logout function.
    function logOut() {
        logOutFunction();
        history.push("/");
    }

    // Function to convert image to base64.
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

    // Function to upload profile picture.
    async function uploadImage(e) {
        e.preventDefault();
        const convertedImage = await convertToBase64(selectedImage);
        setError('');
        toggleLoading(true);


        try {
            // Post the converted image to the backend. (This gives a network error?)
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

    // Function to change the users' email adres.
    async function changeEmail(e) {
        e.preventDefault();
        setError('');
        toggleLoading(true);

        try {
            // Put the new email adres in the backend. (This gives a network error?)
            const response = await axios.put('https://polar-lake-14365.herokuapp.com/api/user',
                {
                    "email": email
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