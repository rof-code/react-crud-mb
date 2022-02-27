import styles from "./ProjectCard.module.css";
import { Link } from "react-router-dom";
import { BsPencil, BsFillTrashFill } from "react-icons/bs";
const ProjectCard = ({ id, name, budget, category, handleRemove }) => {
  const remove = (e) => {
    e.preventDefault();
    handleRemove(id);
  };
  return (
    <div className={styles.project__card}>
      <h4>{name}</h4>
      <p>
        <span>Budget:</span> ${budget}
      </p>
      <p className={styles.category__text}>
        <span className={`${styles[category.toLowerCase()]}`}></span>
        {category}
      </p>
      <div className={styles.project__card_actions}>
        <Link to={`/project/${id}`}>
          <BsPencil /> Edit
        </Link>
        <button onClick={remove}>
          <BsFillTrashFill /> Remove
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
