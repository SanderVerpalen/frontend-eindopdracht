import './Home.css'
import projects from '../../data/projects.json'
import profilePicture from '../../assets/logo-white.png'
import Tile from "../../components/tile/Tile";


function Home() {
    return (
        <div className="home-page">
            <article>
                <div className="image-container">
                    <img src={ profilePicture } alt="profile"/>
                </div>
                <h1>Introduction</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A eos est expedita, fuga hic ipsam magnam,
                    maiores modi necessitatibus odit quam qui suscipit. Ab accusamus architecto, corporis distinctio
                    earum eius eos ex facilis impedit modi molestiae possimus sint sunt tempore!</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A eos est expedita, fuga hic ipsam magnam,
                    maiores modi necessitatibus odit quam qui suscipit. Ab accusamus architecto, corporis distinctio
                    earum eius eos ex facilis impedit modi molestiae possimus sint sunt tempore!</p>
            </article>
            <section className="tiles-container">
                {projects !== [] ? projects.map(
                    (project) =>
                        <Tile
                            image={require(`../../data/project-pictures/${project.image}`)}
                            projectName={project.title}
                            projectLink={'/project/' + project.id}
                        />
                ): <p>No projects yet!</p>}
            </section>
        </div>
    )
}

export default Home;