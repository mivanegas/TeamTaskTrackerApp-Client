import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function Task({ task }) {
  return (
    <Card style={{ width: "16rem" }}>
      <Card.Header className="text-muted">
        Created: {new Date(task.createdAt).toLocaleDateString()}
      </Card.Header>
      <Card.Body>
        <Card.Title>{task.title}</Card.Title>

        <Card.Text>{task.description}</Card.Text>

        {/* Match values to tasks.model.js in server */}
        <Form.Select
          aria-label="priority options"
          size="sm"
          className="mt-2"
          value={task.priority}
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
          <Button variant="warning" size="sm" className="w-100 mx-1">
            Edit
          </Button>
          <Button variant="danger" size="sm" className="w-100 mx-1">
            Delete
          </Button>
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
  );
}

export default Task;
