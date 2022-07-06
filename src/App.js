import NavBar from './components/navBar/NavBar'
import './App.css';
import {Route, Switch} from "react-router-dom";
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


function App() {
    return (
        <div className="outer-container">
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
                                <Dashboard/>
                            </Route>
                            <Route exact path="/project/:id/review">
                                <Review/>
                            </Route>
                            <Route exact path="/post-review">
                                <PostReview/>
                            </Route>
                            <Route exact path="/forgot-password">
                                <ForgotPassword/>
                            </Route>
                        </Switch>
                    </div>
                </main>
                <footer>This website is created by AJ Verpalen.</footer>
            </div>
        </div>
    );
}

export default App;
