import React from "react";
import { Link } from "react-router-dom";
import styles from "./LinkButton.module.css";

const LinkButton = ({ text, to }) => {
  return (
    <Link to={to} className={styles.btn}>
      {text}
    </Link>
  );
};

export default LinkButton;
