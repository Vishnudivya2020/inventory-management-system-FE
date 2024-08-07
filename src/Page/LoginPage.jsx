import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import styles from "./LoginPage.module.css";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    // Add your login logic here
    // For now, it simply navigates to the home page
    if (password === confirmPassword) {
      navigate("/home");
    } else {
      alert("Passwords do not match!");
    }
  };

  return (
    < div  className={styles["container"]}>
      <div className={styles["row"]}>
        < div className={styles["Col"]}>
          <h2 className={styles["text-center"]}>Login</h2>
          <Form onSubmit={handleLogin}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label  className={styles["Labels"]}>Email address</Form.Label>
              <Form.Control  className={styles["Control"]}
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group><br></br>

            <Form.Group controlId="formBasicPassword">
              <Form.Label className={styles["Labels"]}>Password</Form.Label>
              <Form.Control className={styles["Control"]}
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group><br></br>

            <Form.Group controlId="formConfirmPassword">
              <Form.Label className={styles["Labels"]}>Confirm Password</Form.Label>
              <Form.Control  className={styles["Control"]}
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className={styles["mt-3"]}>
              Login
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
