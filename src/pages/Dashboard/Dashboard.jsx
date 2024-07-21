import styles from "./Dashboard.module.css";
import { Link } from "react-router-dom";
//hooks
import { useAuthValue } from "../../context/AuthContext";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useDeleteDocument } from "../../hooks/useDeleteDocument";

function Dashboard() {
  const { user } = useAuthValue();
  const uid = user.uid;

  const { deleteDocument } = useDeleteDocument("posts");

  const {
    documents: posts,
    loading,
    error,
  } = useFetchDocuments("posts", null, uid);

  return (
    <div className={styles.dashboard}>
      <h1>Dashboard</h1>
      <h2>Manage your posts!</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {posts && posts.length === 0 ? (
        <div className={styles.noPosts}>
          <p>There is no posts to manage!</p>
          <Link to="/posts/create" className="btn">
            Create Post
          </Link>
        </div>
      ) : (
        <>
          <div className={styles.postHeader}>
            <span>Title</span>
            <span>Actions</span>
          </div>
          {posts &&
            posts.map((post) => (
              <div key={post.id} className={styles.postRow}>
                <p>{post.title}</p>
                <div>
                  <Link to={`/posts/${post.id}`} className="btn btn-outline">
                    See Post
                  </Link>
                  <Link
                    to={`/posts/edit/${post.id}`}
                    className="btn btn-outline"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteDocument(post.id)}
                    className="btn btn-outline btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
}

export default Dashboard;
