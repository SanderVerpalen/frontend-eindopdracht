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


    async function uploadImage() {
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
                    "repeatedPassword" : 123467
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
            <button className="log-out-button" onClick={logOut}>Logout</button>
            <div>
                <h1>Profile picture</h1>
                {selectedImage && (
                    <div>
                        <img alt="not fount" width={"250px"} src={URL.createObjectURL(selectedImage)}/>
                        <br/>
                        <button onClick={() => setSelectedImage(null)}>Remove</button>
                        <button onClick={() => uploadImage()}>Upload</button>
                    </div>
                )}
                <br/>

                <br/>

                <input
                    type="file"
                    name="myImage"
                    onChange={(event) => {
                        setSelectedImage(event.target.files[0]);
                    }}
                />
                {/*{profilePicture && <img src={`data:image/png;base64,${profilePicture}`}/>}*/}

                <form onSubmit={changeEmail}><input
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                    <button type="submit">Change email</button>
                </form>
                {loading && <p>Loading...</p>}
                {error && <p>Er gaat iets mis.</p>}
                {currentUser && <article>
                    <h3>{currentUser.username}</h3>
                    <p>{currentUser.email}</p>
                </article>}

            </div>
        </>
    )
}

export default Profile;