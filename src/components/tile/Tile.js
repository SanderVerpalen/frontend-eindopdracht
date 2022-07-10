import React from "react";
import './Tile.css'
import {useHistory} from "react-router-dom";

function Tile({ projectName, image, projectLink}) {

    const history = useHistory();

    function goToProject() {
        history.push(projectLink)
    }

    return (
        <div onClick={goToProject}  className="tile-container">
            <img title={projectName} src={image} alt="project-pic"/>
        </div>

    )
}

export default Tile;