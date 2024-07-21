import styles from "./EditPost.module.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useFetchDocument } from "../../hooks/useFetchDocument";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";

const EditPost = () => {
  const { user } = useAuthValue();
  const { id } = useParams();
  const { document: post } = useFetchDocument("posts", id);
  const { updateDocument, response } = useUpdateDocument("posts");

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setBody(post.body);
      setImage(post.image);

      const textTags = post.tagsArray ? post.tagsArray.join(",") : "";

      setTags(textTags);
    }
  }, [post]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormError("");

    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

    if (!image || !title || !body || !tags) {
      setFormError("Please fill all the inputs!");
    }

    try {
      new URL(image);
    } catch (error) {
      return setFormError("The image must be an URL!");
    }

    if (formError) return;

    const data = {
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    };

    updateDocument(id, data);

    navigate("/dashboard");
  };

  return (
    <div className={styles.editPost}>
      <h2>Editing post: {post.title}</h2>
      <p>Ready for some changes?</p>
      {post && (
        <>
          <form onSubmit={handleSubmit}>
            <label>
              <span>Title:</span>
              <input
                type="text"
                name="title"
                id="title"
                required
                placeholder="Give it a good title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
            <label>
              <span>Image URL:</span>
              <input
                type="text"
                name="image"
                id="image"
                required
                placeholder="Insert a image to go along"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </label>
            <p className={styles.imagePreviewTitle}>Current image preview:</p>
            <img
              className={styles.imagePreview}
              src={post.image}
              alt={post.title}
            />
            <label>
              <span>Content:</span>
              <textarea
                name="body"
                id="body"
                placeholder="Your thoughts"
                value={body}
                required
                onChange={(e) => setBody(e.target.value)}
              ></textarea>
            </label>
            <label>
              <span>Tags:</span>
              <input
                type="text"
                name="tags"
                id="tags"
                placeholder="Insert some tags separated by comma"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </label>
            {!response.loading && <button className="btn">Edit</button>}
            {response.loading && (
              <button className="btn" disabled>
                Await.. .
              </button>
            )}
            {(response.error || formError) && (
              <p className="error">{response.error || formError}</p>
            )}
          </form>
        </>
      )}
    </div>
  );
};

export default EditPost;
