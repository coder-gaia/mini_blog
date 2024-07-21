import styles from "./About.module.css";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className={styles.about}>
      <h2>
        About the Mini <span>Blog</span>
        <p>This project was made with React + Firebase!</p>
      </h2>
      <Link to="/posts/create" className="btn">
        Create post
      </Link>
    </div>
  );
};

export default About;
