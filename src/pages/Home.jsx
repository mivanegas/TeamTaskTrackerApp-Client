import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import taskGif from "../assets/task.gif";

function Home() {
  let navigate = useNavigate();

  return (
    <div className="text-center">
      <img src={taskGif} alt="Task GIF" width={100} />
      <h1 className="display-4 m-2 ">Welcome to the Team Task Manager</h1>
      <p className="lead">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque sunt
        quas placeat sequi. Perferendis blanditiis saepe cum vel voluptates
        adipisci porro eum! Nostrum nisi mollitia nulla fugiat, et a doloribus.
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque sunt
        quas placeat sequi. Perferendis blanditiis saepe cum vel voluptates
        adipisci porro eum! Nostrum nisi mollitia nulla fugiat, et a doloribus.
      </p>
      <hr />
      <p className="lead">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda sint
        quam tempore! Dolorem impedit placeat laboriosam quasi, voluptatibus
        nemo quam enim voluptatem repellat officia, dolore aspernatur magni,
        assumenda quidem dolores.
      </p>
      <div>
        <Button
          variant="primary"
          size="lg"
          className="mx-1"
          onClick={() => navigate("/register")}
        >
          Register
        </Button>
        <Button
          variant="dark"
          size="lg"
          className="mx-1"
          onClick={() => navigate("/login")}
        >
          Login
        </Button>
      </div>
    </div>
  );
}

export default Home;
