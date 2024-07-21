import styles from "./Home.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import PostDetails from "../../components/PostDetails/PostDetails";

const Home = () => {
  const [query, setQuery] = useState("");
  const { documents: posts, loading } = useFetchDocuments("posts");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (query) {
      return navigate(`/search?q=${query}`);
    }
  };

  return (
    <div className={styles.home}>
      <h1>See our latest posts!</h1>
      <form onSubmit={handleSubmit} className={styles.searchForm}>
        <input
          type="text"
          placeholder="Or seach for tags"
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-dark">Search</button>
      </form>
      <div>
        {loading && <p>Loading..</p>}
        {/* {console.log("Posts:", posts)} */}
        {posts &&
          posts.map((post) => <PostDetails post={post} key={post.id} />)}
        {posts && posts.length === 0 && (
          <div className={styles.noPosts}>
            <p>No posts were found.</p>
            <Link to="/posts/create" className="btn">
              Create post
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
