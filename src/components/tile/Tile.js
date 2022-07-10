import React from "react";
import './Tile.css'
import {useHistory} from "react-router-dom";

// Custom component containing a project name and image, and click-through functionality.

function Tile({ projectName, image, projectLink}) {

    const history = useHistory();

    // Click-through function to follow the project link.
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