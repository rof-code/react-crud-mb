import styles from "./NewProject.module.css";
import ProjectForm from "../components/projects/ProjectForm";
import { useNavigate } from "react-router-dom";

const NewProject = () => {
  const navigate = useNavigate();
  const createPost = (project) => {
    //initialize costs and services
    project.cost = 0;
    project.services = [];

    fetch("http://localhost:5000/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    })
      .then((response) => {
        response.json();
      })
      .then((data) => {
        console.log(data);
        //Redirect
        navigate("/projects", { state: { message: "Project created! :)" } });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className={styles.newproject__container}>
      <h1>Create project</h1>
      <p>Make your project for add your services </p>
      <ProjectForm handleSubmit={createPost} btnText="Create Project" />
    </div>
  );
};

export default NewProject;
