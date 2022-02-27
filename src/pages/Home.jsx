import "./Home.module.css";
import svg from "../img/home_illustration.svg";
import styles from "./Home.module.css";
import LinkButton from "../components/layouts/LinkButton";

const Home = () => {
  return (
    <section className={styles.home__container}>
      <h1>Projects</h1>
      <p>Start creating your projects</p>
      <LinkButton to="/newproject" text="Create Project" />
      <img src={svg} alt="" />
    </section>
  );
};

export default Home;
