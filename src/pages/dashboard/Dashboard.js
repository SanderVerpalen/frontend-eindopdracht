import './Dashboard.css'
import axios from "axios";
import {useEffect, useState} from "react";

function Dashboard() {

    const [userList, setUserList] = useState([]);
    const [loading, toggleLoading] = useState(false);
    const [error, setError] = useState('');

    const source = axios.CancelToken.source();

    useEffect(() => {
        const token = localStorage.getItem('token');

        async function getUsers() {
            setError('');
            toggleLoading(true);
            try {
                const response = await axios.get(
                    'https://polar-lake-14365.herokuapp.com/api/admin/all', {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`,
                        }
                    }
                )
                setUserList(response.data);
            } catch (e) {
                console.error(e);
                setError(e.response.data.error);
            }
            toggleLoading(false);
        }

        getUsers();

        return function cleanup() {
            source.cancel();
        }
    }, [])


    return (
        <div className="scroll-page">
            <section className="name-list">
                {userList &&
                    userList.map(
                        (user) =>
                            <div key={user.id}>
                                <article>
                                <h3>{user.username}</h3>
                                <p>{user.email}</p>
                                </article>
                            </div>
                    )}
                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}
            </section>
        </div>
    )
}

export default Dashboard;