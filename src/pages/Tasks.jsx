import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Task from "../components/Task";
import AddTask from "../components/AddTask";
import EditTask from "../components/EditTask";
import axios from "axios";

const API_PREFIX = import.meta.env.VITE_API_PREFIX;

function Tasks({ currentUser }) {
  const [planningTasks, setPlanningTasks] = useState([]);
  const [todoTasks, setTodoTasks] = useState([]);
  const [inprogressTasks, setInprogressTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);

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
      <div className="d-flex justify-content-between align-items-center">
        <h1 className="display-5 pb-3">Tasks</h1>
        <AddTask fetchTasks={fetchTasks} />
      </div>

      <Row>
        {/* Planning */}
        <Col md={3}>
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
            />
          ))}
        </Col>

        {/* To do */}
        <Col md={3}>
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
            />
          ))}
        </Col>

        {/* In Progress */}
        <Col md={3}>
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
            />
          ))}
        </Col>

        {/* Done */}
        <Col md={3}>
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
