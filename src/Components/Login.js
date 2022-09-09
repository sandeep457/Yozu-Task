import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../Context/UserAuthContext";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import '../Styles/Login.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { logIn } = useUserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logIn(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
    <div className="loginBackground">
        <div className="container login">
          <div className="login-content">
            <Form onSubmit={handleSubmit}>
              {error && <Alert variant="danger">{error}</Alert>}
              <h4 className="title p-4">Welcome To Yozu</h4>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  type="email"
                  placeholder="Email address"
                  className="input"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  className="input"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <div className="d-grid gap-2">
                <Button variant="primary" type="Submit" className="btn" disabled={!email || !password}>
                  Log In
                </Button>
              </div>
              <div className="p-4 mt-2 text-center signup">
                Don't have an account? <Link to="/signup"> Sign up</Link>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;