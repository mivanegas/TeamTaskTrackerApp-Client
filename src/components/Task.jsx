import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";

const API_PREFIX = import.meta.env.VITE_API_PREFIX;

function Task({ task, currentUser, setEditTask, fetchTasks }) {
  const isTaskCreator = task.creator._id == currentUser._id;

  let backgroundColor = "bg-primary-subtle";
  if (task.status == "In progress") {
    backgroundColor = "bg-warning-subtle";
  }
  if (task.status == "Planning") {
    backgroundColor = "bg-danger-subtle";
  } else if (task.status == "Done") {
    backgroundColor = "bg-success-subtle";
  }

  async function deleteTask(taskId) {
    try {
      await axios.delete(`${API_PREFIX}/tasks/${taskId}`);
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  }

  async function updateTask(taskId, data) {
    try {
      await axios.patch(`${API_PREFIX}/tasks/${taskId}`, data);
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Card className="mt-3" style={{ width: "16rem" }}>
        <Card.Header className="text-muted">
          Created: {new Date(task.createdAt).toLocaleDateString()}
        </Card.Header>
        <Card.Body className={`${backgroundColor}`}>
          <Card.Title>{task.title}</Card.Title>

          <Card.Text>{task.description}</Card.Text>

          {/* Match values to tasks.model.js in server */}
          <Form.Select
            aria-label="priority options"
            size="sm"
            className="mt-2"
            value={task.priority}
            disabled={!isTaskCreator}
          >
            <option value="Low">Low 🟢</option>
            <option value="Medium">Medium 🟡</option>
            <option value="High">High 🔴</option>
          </Form.Select>

          {/* Match values to tasks.model.js in server */}
          <Form.Select
            aria-label="priority options"
            size="sm"
            className="mt-2"
            value={task.status}
            disabled={!isTaskCreator}
            onChange={(e) => updateTask(task._id, e.target.value)}
          >
            <option value="Planning">Planning 🐝</option>
            <option value="To do">To do 🦔</option>
            <option value="In progress">In progress 🐛</option>
            <option value="Done">Done 💐</option>
          </Form.Select>

          <div className="d-flex mt-3">
            <Button variant="primary" size="sm" className="w-100 mx-1">
              Assign
            </Button>
            {isTaskCreator && (
              <>
                <Button
                  variant="warning"
                  size="sm"
                  className="w-100 mx-1"
                  onClick={() => setEditTask(task)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  className="w-100 mx-1"
                  onClick={() => deleteTask(task._id)}
                >
                  Delete
                </Button>
              </>
            )}
          </div>
          <div className="mt-3">
            <Card.Subtitle className="mb-1 text-muted">
              Creator: {task.creator.fullName}
            </Card.Subtitle>
            <Card.Subtitle className="mb-1 text-muted">
              Assignee: Madeline
            </Card.Subtitle>
          </div>
        </Card.Body>
        <Card.Footer className="text-muted">
          Deadline: {new Date(task.createdAt).toLocaleDateString()}
        </Card.Footer>
      </Card>
    </>
  );
}

export default Task;
