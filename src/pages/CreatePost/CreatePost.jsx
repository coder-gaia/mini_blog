import styles from "./CreatePost.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useInsertDocument } from "../../hooks/useInsertDocument";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");
  const navigate = useNavigate();

  const { insertDocument, response } = useInsertDocument("posts");

  const { user } = useAuthValue();

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

    insertDocument({
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    });

    navigate("/");
  };

  return (
    <div className={styles.createPost}>
      <h2>Create Post</h2>
      <p>Write about what's on your mind!</p>
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
        {!response.loading && <button className="btn">Post!</button>}
        {response.loading && (
          <button className="btn" disabled>
            Await.. .
          </button>
        )}
        {(response.error || formError) && (
          <p className="error">{response.error || formError}</p>
        )}
      </form>
    </div>
  );
};

export default CreatePost;
