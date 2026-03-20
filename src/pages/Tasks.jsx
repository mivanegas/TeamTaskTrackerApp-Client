import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Task from "../components/Task";
import axios from "axios";

const API_PREFIX = import.meta.env.VITE_API_PREFIX;

function Tasks() {
  const [planningTasks, setPlanningTasks] = useState([]);
  const [todoTasks, setTodoTasks] = useState([]);
  const [inprogressTasks, setInprogressTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    try {
      const { data } = await axios.get(`${API_PREFIX}/tasks`);
      // Match to values in task.models in server
      setPlanningTasks(data.tasks.filter((t) => t.status == "Planning"));
      setTodoTasks(data.tasks.filter((t) => t.status == "To do"));
      setInprogressTasks(data.tasks.filter((t) => t.status == "In progress"));
      setDoneTasks(data.tasks.filter((t) => t.status == "Done"));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h1 className="display-5 mb-3">Tasks</h1>
      <hr />
      <Row className="">
        {/* Planning */}
        <Col md={3}>
          <p className="lead fw-bold border rounded py-1 px-3 bg-danger-subtle">
            PLANNING
          </p>
          {planningTasks.map((task) => (
            <Task key={task._id} task={task} />
          ))}
        </Col>

        {/* To do */}
        <Col md={3}>
          <p className="lead fw-bold border rounded py-1 px-3 bg-primary-subtle">
            TO DO
          </p>
          {todoTasks.map((task) => (
            <Task key={task._id} task={task} />
          ))}
        </Col>

        {/* In Progress */}
        <Col md={3}>
          <p className="lead fw-bold border rounded py-1 px-3 bg-warning-subtle">
            IN PROGRESS
          </p>
          {inprogressTasks.map((task) => (
            <Task key={task._id} task={task} />
          ))}
        </Col>

        {/* Done */}
        <Col md={3}>
          <p className="lead fw-bold border rounded py-1 px-3 bg-success-subtle">
            DONE
          </p>
          {doneTasks.map((task) => (
            <Task key={task._id} task={task} />
          ))}
        </Col>
      </Row>
    </div>
  );
}

export default Tasks;
