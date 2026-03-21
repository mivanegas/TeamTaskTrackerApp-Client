import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

const API_PREFIX = import.meta.env.VITE_API_PREFIX;

function AddTask({ fetchTasks }) {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [status, setStatus] = useState("Planning");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const todaysDate = new Date().toISOString().split("T")[0];

  async function addTask() {
    try {
      await axios.post(`${API_PREFIX}/tasks`, {
        title,
        description,
        deadline,
        priority,
        status,
      });
      fetchTasks();
      reset();
      setShow(false);
    } catch (error) {
      console.log(error);
    }
  }

  function reset() {
    setTitle("");
    setDescription("");
    setDeadline("");
    setPriority("Medium");
    setStatus("Planning");
  }

  return (
    <>
      <Button onClick={handleShow} className="addTaskBtn">
        Add task
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            {/* Match values to tasks.model.js in server */}
            <Form.Label>Priority</Form.Label>
            <Form.Select
              aria-label="priority options"
              className="mb-2"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="Low">Low 🟢</option>
              <option value="Medium">Medium 🟡</option>
              <option value="High">High 🔴</option>
            </Form.Select>

            {/* Match values to tasks.model.js in server */}
            <Form.Label>Status</Form.Label>
            <Form.Select
              aria-label="status options"
              className="mb-2"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Planning">Planning 🐝</option>
              <option value="To do">To do 🦔</option>
              <option value="In progress">In progress 🐛</option>
              <option value="Done">Done 💐</option>
            </Form.Select>

            <Form.Group className="mb-3">
              <Form.Label>Deadline</Form.Label>
              <Form.Control
                type="date"
                autoFocus
                min={todaysDate}
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={addTask}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddTask;
