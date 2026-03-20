import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useNavigate } from "react-router";
import AppAlert from "../components/AppAlert";

const API_PREFIX = import.meta.env.VITE_API_PREFIX;

function Login({ setCurrentUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(null);

  const navigate = useNavigate();

  async function handleLogin() {
    const payload = {
      email,
      password,
    };
    try {
      const { data } = await axios.post(`${API_PREFIX}/users/login`, payload);
      setCurrentUser(data.user);
      setShowAlert({
        type: "SUCCESS",
        message: `${data.message}. You will be redirected to the dashboard now..`,
      });
      setTimeout(() => {
        navigate("/tasks");
      }, 3000);

      navigate("/tasks");
    } catch (error) {
      setShowAlert({
        type: "FAILED",
        message: error.response.data.message,
      });
      console.log(error);
    }
  }

  return (
    <>
      <h1 className="display-6">Login</h1>
      <Form style={{ width: "max-content", margin: "auto" }}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="dark" onClick={handleLogin}>
          Login
        </Button>
      </Form>
      {showAlert && <AppAlert showAlert={showAlert} />}
    </>
  );
}

export default Login;
