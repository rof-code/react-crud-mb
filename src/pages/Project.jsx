import styles from "./Project.module.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "../components/layouts/Loading";
import Container from "../components/layouts/Container";
import ProjectForm from "../components/projects/ProjectForm";
import Message from "../components/layouts/Message";
import ServiceForm from "../components/service/ServiceForm";
import { parse, v4 as uuidv4 } from "uuid";

const Project = () => {
  const { id } = useParams();
  const [project, setProject] = useState([]);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showServiceForm, setShowServiceForm] = useState(false);
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
    setMessage("");
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
  function createService(project) {
    setMessage("");
    //Last service
    const lastService = project.services[project.services.length - 1];
    lastService.id = uuidv4();
    const lastServiceCost = lastService.cost;
    const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost);
    //maximum value validation

    if (newCost > parseFloat(project.budget)) {
      setMessage("Over budget, verify the service value");
      setType("error");
      project.services.pop();
      return false;
    }
    // add service cost to total cost
    project.cost = newCost;

    //update project
    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function toggleProjectForm() {
    setShowProjectForm(!showProjectForm);
  }
  function toggleServiceForm() {
    setShowServiceForm(!showServiceForm);
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
            <div className={styles.service__form_container}>
              <h2>Add and service:</h2>
              <button className={styles.btn} onClick={toggleServiceForm}>
                {!showServiceForm ? "Add Service" : "Close"}
              </button>
              <div className={styles.project__info}>
                {showServiceForm && (
                  <ServiceForm
                    handleSubmit={createService}
                    btnText="Add service"
                    projectData={project}
                  />
                )}
              </div>
            </div>
            <h2>Services</h2>
            <Container customClass="start">
              <p>Services items</p>
            </Container>
          </Container>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Project;
