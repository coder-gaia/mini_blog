import { useAuthentication } from "../../hooks/useAuthentication";
import styles from "./Register.module.css";
import { useState, useEffect } from "react";

const Register = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");
  const { createUser, loading, authError } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const user = {
      displayName,
      email,
      password,
    };

    if (password != passwordConfirmation) {
      setError("The passwords don't match!");
      return;
    }

    const res = await createUser(user);

    console.log(res);

    setDisplayName("");
    setEmail("");
    setPassword("");
    setPasswordConfirmation("");
  };

  useEffect(() => {
    setError(authError);
  }, [authError]);

  return (
    <div className={styles.register}>
      <h1>Register</h1>
      <p>Create your user and share your adventures!</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Name: </span>
          <input
            type="text"
            name="displayName"
            id="name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            required
            placeholder="Insert your name"
          />
        </label>
        <label>
          <span>Email: </span>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Insert your email"
          />
        </label>
        <label>
          <span>Password: </span>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Insert your password"
          />
        </label>
        <label>
          <span>Password Confirmation: </span>
          <input
            type="password"
            name="passwordConfirmation"
            id="passwordConfirmation"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            required
            placeholder="Confirm your password"
          />
        </label>
        {!loading && (
          <button type="submit" className="btn">
            Register
          </button>
        )}
        {loading && (
          <button type="submit" className="btn" disabled>
            Await...
          </button>
        )}
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Register;
