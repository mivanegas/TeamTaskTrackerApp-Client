import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useNavigate } from "react-router";
import AppAlert from "../components/AppAlert";

const API_PREFIX = import.meta.env.VITE_API_PREFIX;

function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [department, setDepartment] = useState("");
  const [showAlert, setShowAlert] = useState(null);

  const navigate = useNavigate();

  async function handleRegister() {
    const payload = {
      fullName,
      email,
      password,
      department,
    };
    try {
      await axios.post(`${API_PREFIX}/users/signup`, payload);
      setShowAlert({
        type: "SUCCESS",
        message:
          "Account was registered successfully. You will be redirected the login page.",
      });
      setTimeout(() => {
        navigate("/login");
      }, 3000);
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
      <h1 className="display-6" style={{ fontFamily: "girly-font" }}>
        Register
      </h1>
      <Form style={{ width: "max-content", margin: "auto" }}>
        <Form.Group className="m-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your full name"
            autoComplete="off"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="m-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="m-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="m-3">
          <Form.Label>Department</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your department"
            autoComplete="off"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          />
        </Form.Group>
        <Button
          variant="success"
          onClick={handleRegister}
          className="registerBtn m-3"
        >
          Register
        </Button>
      </Form>
      {showAlert && <AppAlert showAlert={showAlert} />}
    </>
  );
}

export default Register;
