import Message from "../components/layouts/Message";
import { useLocation } from "react-router-dom";
import styles from "./Projects.module.css";
import Container from "../components/layouts/Container";
import LinkButton from "../components/layouts/LinkButton";
import ProjectCard from "../components/projects/ProjectCard";
import Loading from "../components/layouts/Loading";
import { useState, useEffect } from "react";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [removeLoading, setRemoveLoading] = useState(false);
  const msgLocation = useLocation();
  const [projectMessage, setProjectMessage] = useState("");
  let message = "";
  if (msgLocation.state) {
    message = msgLocation.state.message;
  }

  useEffect(() => {
    setTimeout(() => {
      fetch("http://localhost:5000/projects", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setProjects(data);
          setRemoveLoading(true);
        })
        .catch((err) => console.log(err));
    }, 1500);
  }, []);

  function removeProject(id) {
    fetch(`http://localhost:5000/projects/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then(() => {
        setProjects(projects.filter((project) => project.id !== id));
        setProjectMessage("Project deleted :)");
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className={styles.project__container}>
      <div className={styles.title__container}>
        <h1>My projects</h1>
        <LinkButton to="/newproject" text="create project" />
      </div>

      {message && <Message type="success" msg={message} />}
      {projectMessage && <Message type="success" msg={projectMessage} />}
      <Container>
        {projects.length > 0 &&
          projects.map((project) => (
            <ProjectCard
              name={project.name}
              id={project.id}
              budget={project.budget}
              category={project.category.name}
              key={project.id}
              handleRemove={removeProject}
            />
          ))}
        {!removeLoading && <Loading />}
        {removeLoading && projects.length == 0 && <p>No projects found</p>}
      </Container>
    </div>
  );
};

export default Projects;
