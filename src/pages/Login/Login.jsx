import { useState, useEffect } from "react";
import styles from "./Login.module.css";
import { useAuthentication } from "../../hooks/useAuthentication";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, loading, authError } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const user = {
      email,
      password,
    };

    const res = await login(user);

    setEmail("");
    setPassword("");
  };

  useEffect(() => {
    setError(authError);
  }, [authError]);

  return (
    <div className={styles.login}>
      <h1>Login</h1>
      <p>Log into your account and have fun!</p>
      <form onSubmit={handleSubmit}>
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
        {!loading && (
          <button type="submit" className="btn">
            Login
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

export default Login;
