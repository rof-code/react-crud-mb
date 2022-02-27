import styles from "./Project.module.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "../components/layouts/Loading";
import Container from "../components/layouts/Container";
import ProjectForm from "../components/projects/ProjectForm";
import Message from "../components/layouts/Message";

const Project = () => {
  const { id } = useParams();
  const [project, setProject] = useState([]);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  useEffect(() => {
    setTimeout(() => {
      fetch(`http://localhost:5000/projects/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setProject(data);
        })
        .catch((err) => console.log(err));
    }, 1500);
  }, [id]);
  function editPost(project) {
    //Budget validation
    if (project.budget < project.cost) {
      //Message
      setMessage("The budget can't be lower than the project cost");
      setType("error");
      return false;
    }
    fetch(`http://localhost:5000/projects/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    })
      .then((res) => res.json())
      .then((data) => {
        setProject(data);
        setShowProjectForm(!showProjectForm);
        setMessage("Project updated");
        setType("success");
        //Message
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function toggleProjectForm() {
    setShowProjectForm(!showProjectForm);
  }

  return (
    <>
      {project.name ? (
        <div className={styles.project__details}>
          <Container customClass="column">
            {message && <Message type={type} msg={message} />}
            <div className={styles.details__container}>
              <h1>Project: {project.name}</h1>
              <button className={styles.btn} onClick={toggleProjectForm}>
                {!showProjectForm ? "Edit Project" : "Close"}
              </button>
              {!showProjectForm ? (
                <div className={styles.project__info}>
                  <p>
                    <span>Project Category</span> {project.category.name}
                  </p>
                  <p>
                    <span>Total Budget</span> {project.budget}
                  </p>
                  <p>
                    <span>Total Cost Now</span> {project.cost}
                  </p>
                </div>
              ) : (
                <div className={styles.project__info}>
                  <ProjectForm
                    handleSubmit={editPost}
                    btnText="Save edit"
                    projectData={project}
                  />
                </div>
              )}
            </div>
          </Container>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Project;
