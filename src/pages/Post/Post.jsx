import styles from "./Post.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchDocument } from "../../hooks/useFetchDocument";

import React from "react";

const Post = () => {
  const { id } = useParams();
  const { document: post, loading } = useFetchDocument("posts", id);
  const navigate = useNavigate();

  const getBack = () => {
    navigate("/");
  };

  return (
    <div>
      {/* {loading && <p>Loading..</p>} */}
      {post && (
        <div className={styles.postContainer}>
          <h1>{post.title}</h1>
          <img src={post.image} alt={post.title} />
          <p>{post.body}</p>
          <h3>This post is about:</h3>
          <div className={styles.tags}>
            {post.tagsArray &&
              post.tagsArray.map((tag) => (
                <p key={tag}>
                  <span>#</span>
                  {tag}
                </p>
              ))}
          </div>
          <button onClick={getBack} className="btn btn-outline">
            Return
          </button>
        </div>
      )}
    </div>
  );
};

export default Post;
