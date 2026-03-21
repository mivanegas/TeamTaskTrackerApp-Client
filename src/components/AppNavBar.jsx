import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import diary from "../assets/diary.png";
import { NavLink, useNavigate } from "react-router";
import AppAlert from "./AppAlert";
import axios from "axios";
import { useState } from "react";

const API_PREFIX = import.meta.env.VITE_API_PREFIX;

function AppNavBar({ currentUser, setCurrentUser }) {
  const [showAlert, setShowAlert] = useState(null);
  const navigate = useNavigate();

  async function logout() {
    try {
      await axios.post(`${API_PREFIX}/users/logout`);
      setCurrentUser(null);
      setShowAlert({
        type: "SUCCESS",
        message: "You have logged out successfully",
      });
      navigate("/login");
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
      <Navbar
        collapseOnSelect
        expand="lg"
        className="bg-body-tertiary custom-nav"
        bg="dark"
        data-bs-theme="dark"
      >
        <Container>
          <Navbar.Brand as={NavLink} to="/">
            {" "}
            <img
              alt=""
              src={diary}
              width="40"
              height="40"
              className="d-inline-block align-top"
            />{" "}
            <span className="brand-font">Task Tracker</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/about">
                About
              </Nav.Link>
              {currentUser && (
                <Nav.Link as={NavLink} to="/tasks">
                  Tasks
                </Nav.Link>
              )}
            </Nav>
            <Nav>
              {currentUser ? (
                <>
                  <Nav.Link>Hi, {currentUser.fullName}</Nav.Link>
                  <Nav.Link onClick={logout}>Logout</Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link as={NavLink} to="/register">
                    Register
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/login">
                    Login
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {showAlert && <AppAlert showAlert={showAlert} />}
    </>
  );
}

export default AppNavBar;
