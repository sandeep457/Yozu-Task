import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useUserAuth } from "../Context/UserAuthContext";
import { auth } from "../firebase";
import '../Styles/Login.css';

const Signup = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const { signUp } = useUserAuth();

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signUp(auth, email, firstName, lastName, password);
      navigate("/");
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
              <h3 className="mb-3 p-4">Registration</h3>
              <Form.Group className="mb-3" controlId="formBasicFirstname">
                <Form.Control
                  type="text"
                  placeholder="First name"
                  className="input"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicLastname">
                <Form.Control
                  type="text"
                  placeholder="Last name"
                  className="input"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Form.Group>
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
                <Button variant="primary" type="Submit" className="btn" disabled={!email || !firstName || !lastName || !password}>
                  Sign up
                </Button>
              </div>
              <div className="p-4 mt-2 text-center signup">
                Already have an account? <Link to="/">Log In</Link>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;