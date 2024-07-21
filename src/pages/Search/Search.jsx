import styles from "./Search.module.css";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useQuery } from "../../hooks/useQuery";
import PostDetails from "../../components/PostDetails/PostDetails";
import { Link } from "react-router-dom";

const Search = () => {
  const query = useQuery();
  const search = query.get("q");

  const { documents: posts } = useFetchDocuments("posts", search);

  return (
    <div className={styles.searchContainer}>
      <h2>Search</h2>
      <div>
        {posts && posts.length === 0 && (
          <>
            <p>No posts were found..</p>
            <Link to="/" className="btn btn-dark">
              Back
            </Link>
          </>
        )}
        {posts &&
          posts.map((post) => <PostDetails key={post.id} post={post} />)}
      </div>
    </div>
  );
};

export default Search;
