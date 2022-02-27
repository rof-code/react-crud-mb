import loading from "../../img/loader.svg";
import styles from "./Loading.module.css";

const Loading = () => {
  return (
    <div className={styles.loader__container}>
      <img className={styles.loader} src={loading} alt="loading" />
    </div>
  );
};

export default Loading;
