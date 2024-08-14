import { Link } from "react-router-dom";
import styles from "./Frontpage.module.css";

const FrontPage = () => {
  return (
    <div className={styles.front_container}>
      <Link to="/login">
        <button className={styles.btn}>Login</button>
      </Link>
      <Link to="/register">
        <button className={styles.btn}>Register</button>
      </Link>
    </div>
  );
};

export default FrontPage;
