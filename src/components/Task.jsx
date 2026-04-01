import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";

const API_PREFIX = import.meta.env.VITE_API_PREFIX;

function Task({ task, currentUser, setEditTask, fetchTasks, users }) {
  const isTaskCreator = task.creator._id == currentUser._id;
  const isTaskAssignee = task.assignee?._id == currentUser._id;

  const canEdit = isTaskCreator || isTaskAssignee;

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
      <Card className="mt-3">
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
            disabled={!canEdit}
            value={task.priority}
            onChange={(e) => updateTask(task._id, { priority: e.target.value })}
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
            disabled={!canEdit}
            value={task.status}
            onChange={(e) => updateTask(task._id, { status: e.target.value })}
          >
            <option value="Planning">Planning 🐝</option>
            <option value="To do">To do 🦔</option>
            <option value="In progress">In progress 🐛</option>
            <option value="Done">Done 💐</option>
          </Form.Select>

          <div className="d-flex mt-2">
            {canEdit && (
              <Button
                variant="dark"
                size="sm"
                className="w-100 mx-1 editBtn"
                onClick={() => setEditTask(task)}
              >
                Edit
              </Button>
            )}
            {isTaskCreator && (
              <Button
                variant="light"
                size="sm"
                className="w-100 mx-1 deleteBtn"
                onClick={() => deleteTask(task._id)}
              >
                Delete
              </Button>
            )}
          </div>
          <div className="mt-3">
            {/* Creator */}
            <Form.Select
              size="sm"
              className="mt-2"
              disabled={true}
              onChange={(e) =>
                updateTask(task._id, { priority: e.target.value })
              }
            >
              <option value="">👤 Creator: {task.creator.fullName}</option>
            </Form.Select>
            {/* Assignee */}
            <Form.Select
              size="sm"
              className="mt-2"
              disabled={!canEdit}
              value={task.assignee?._id}
              onChange={(e) =>
                updateTask(task._id, { assignee: e.target.value })
              }
            >
              <option value="">Unassigned</option>
              {/* Shows all users in database */}
              {users.map((u) => (
                <option value={u._id} key={u._id}>
                  👤 Assignee: {u.fullName} ({u.department})
                </option>
              ))}
            </Form.Select>
          </div>
        </Card.Body>
        <Card.Footer className="text-muted">
          Deadline: {new Date(task.deadline).toLocaleDateString()}
        </Card.Footer>
      </Card>
    </>
  );
}

export default Task;
