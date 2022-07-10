import NavBar from './components/navBar/NavBar'
import './App.css';
import {Redirect, Route, Switch} from "react-router-dom";
import Home from './pages/home/Home'
import RequestOffer from "./pages/requestOffer/RequestOffer";
import Login from "./pages/login/Login";
import CreateAccount from "./pages/createAccount/CreateAccount";
import ProjectCreation from "./pages/projectCreation/ProjectCreation";
import Project from "./pages/project/Project";
import Dashboard from "./pages/dashboard/Dashboard";
import Review from "./pages/review/Review";
import PostReview from "./pages/postReview/PostReview";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword"
import Profile from "./pages/profile/Profile";
import {useState, useEffect, useContext} from "react";
import axios from "axios";
import {LoginContext} from "./context/LoginContext";
import EmailSend from "./pages/emailSend/EmailSend";


function App() {

    const [response, setResponse] = useState('')
    const [testing, toggleTesting] = useState(false)
    const [error, setError] = useState(false)

    const{ user, loggedIn } = useContext(LoginContext);

    const source = axios.CancelToken.source();

    useEffect(() => {
        async function test() {
            toggleTesting(true);
            setError(false)
            try {
                setResponse(await axios.get('https://polar-lake-14365.herokuapp.com/api/test/all'))
            } catch (e) {
                console.error(e);
                setError(true);
            }
            toggleTesting(false)
        }

        test();

        return function cleanup() {
            source.cancel();
        }
    }, []);

    return (
        <div className="outer-container">
            {response &&
                <div className="inner-container">
                    <header>
                        <NavBar/>
                    </header>
                    <main>
                        <div className="content-page">
                            <Switch>
                                <Route exact path="/">
                                    <Home/>
                                </Route>
                                <Route exact path="/request-offer">
                                    <RequestOffer/>
                                </Route>
                                <Route exact path="/login">
                                    <Login/>
                                </Route>
                                <Route exact path="/create-account">
                                    <CreateAccount/>
                                </Route>
                                <Route exact path="/project-creation">
                                    <ProjectCreation/>
                                </Route>
                                <Route exact path="/project/:id">
                                    <Project/>
                                </Route>
                                <Route exact path="/dashboard">
                                    {(user.roles.length === 2)  ? <Dashboard/> : <Redirect to="/"/>}
                                </Route>
                                <Route exact path="/project/:id/review">
                                    <Review/>
                                </Route>
                                <Route exact path="/project/:id/post-review">
                                    {loggedIn ? <PostReview/> : <Redirect to="/"/>}
                                </Route>
                                <Route exact path="/forgot-password">
                                    <ForgotPassword/>
                                </Route>
                                <Route exact path="/email-send">
                                    <EmailSend/>
                                </Route>
                                <Route exact path="/profile">
                                    <Profile/>
                                </Route>
                            </Switch>
                        </div>
                    </main>
                    <footer>This website is created by AJ Verpalen.</footer>
                </div>}
            {testing && <p>Testing API for website functionality. This can take a few seconds.</p>}
            {error && <p>Oops, something went wrong. Please try again at a later time.</p>}
        </div>
    );
}

export default App;
