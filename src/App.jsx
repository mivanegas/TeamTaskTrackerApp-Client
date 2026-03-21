import { useState, useEffect } from "react";
import "./App.css";
import AppNavBar from "./components/AppNavBar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { Container, Spinner } from "react-bootstrap";
import axios from "axios";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Tasks from "./pages/Tasks";

const API_PREFIX = import.meta.env.VITE_API_PREFIX;

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  async function fetchCurrentUser() {
    try {
      const { data } = await axios.get(`${API_PREFIX}/users/current-user`);
      setCurrentUser(data.user);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  return (
    <BrowserRouter>
      <AppNavBar currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <Container
        className="page-wrapper my-3 p-5"
        style={{ width: "max-content" }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/login"
            element={<Login setCurrentUser={setCurrentUser} />}
          />
          <Route
            path="/tasks"
            element={
              currentUser ? (
                <Tasks currentUser={currentUser} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
