import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Task from "../components/Task";
import AddTask from "../components/AddTask";
import EditTask from "../components/EditTask";
import axios from "axios";
import computer from "../assets/computer.png";

const API_PREFIX = import.meta.env.VITE_API_PREFIX;

function Tasks({ currentUser }) {
  const [planningTasks, setPlanningTasks] = useState([]);
  const [todoTasks, setTodoTasks] = useState([]);
  const [inprogressTasks, setInprogressTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);
  const [users, setUsers] = useState(null);

  useEffect(() => {
    fetchTasks();
    fetchUsers();
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

  async function fetchUsers() {
    try {
      const { data } = await axios.get(`${API_PREFIX}/users`);
      setUsers(data.users);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <img src={computer} width={50} alt="retro computer" className="mb-3" />
        <h1 className="display-5 pb-3" style={{ fontFamily: "girly-font" }}>
          Tasks
        </h1>
        <AddTask fetchTasks={fetchTasks} />
      </div>

      <Row className="g-3">
        {/* Planning */}
        <Col xs={12} sm={6} md={3}>
          <p className="lead fw-bold border rounded py-1 px-3 bg-danger-subtle">
            PLANNING
          </p>
          {planningTasks.map((task) => (
            <Task
              key={task._id}
              task={task}
              currentUser={currentUser}
              setEditTask={setEditTask}
              fetchTasks={fetchTasks}
              users={users}
            />
          ))}
        </Col>

        {/* To do */}
        <Col xs={12} sm={6} md={3}>
          <p className="lead fw-bold border rounded py-1 px-3 bg-primary-subtle">
            TO DO
          </p>
          {todoTasks.map((task) => (
            <Task
              key={task._id}
              task={task}
              currentUser={currentUser}
              setEditTask={setEditTask}
              fetchTasks={fetchTasks}
              users={users}
            />
          ))}
        </Col>

        {/* In Progress */}
        <Col xs={12} sm={6} md={3}>
          <p className="lead fw-bold border rounded py-1 px-3 bg-warning-subtle">
            IN PROGRESS
          </p>
          {inprogressTasks.map((task) => (
            <Task
              key={task._id}
              task={task}
              currentUser={currentUser}
              setEditTask={setEditTask}
              fetchTasks={fetchTasks}
              users={users}
            />
          ))}
        </Col>

        {/* Done */}
        <Col xs={12} sm={6} md={3}>
          <p className="lead fw-bold border rounded py-1 px-3 bg-success-subtle">
            DONE
          </p>
          {doneTasks.map((task) => (
            <Task
              key={task._id}
              task={task}
              currentUser={currentUser}
              setEditTask={setEditTask}
              fetchTasks={fetchTasks}
              users={users}
            />
          ))}
        </Col>
      </Row>
      {editTask && (
        <EditTask
          task={editTask}
          setEditTask={setEditTask}
          fetchTasks={fetchTasks}
        />
      )}
    </div>
  );
}

export default Tasks;
