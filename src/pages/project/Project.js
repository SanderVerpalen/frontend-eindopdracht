import React, {useContext} from "react";
import './Project.css'
import projects from './../../data/projects.json'
import {Link, useParams} from "react-router-dom";
import {LoginContext} from "../../context/LoginContext";

function Project() {

    // We use params for correct pathing...
    const {id} = useParams();
    // And to get project by 'id'.
    const project = projects[id - 1];

    // Context for conditional rendering.
    const {user} = useContext(LoginContext);


    return (
        <article>
            <div className="image-container">
                <img src={require(`../../data/project-pictures/${project.image}`)} alt="project"/>
            </div>
            <h3>{project.title}</h3>
            <p>{project.content}</p>
            {(project.review === "" && user.roles.length > 0) &&
                <Link to={`/project/${id}/post-review`}>
                    Click here to post review
                </Link>}
            {!(project.review === "") &&
                <>
                    <h3>Review</h3>
                    <p>{project.review}</p>
                    <p className="name-reviewer">{project.nameReviewer}</p>
                </>
            }

        </article>
    )
}

export default Project;