import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";

import computerdisk from "../assets/computerdisk.png";

function About() {
  let navigate = useNavigate();

  return (
    <div className="text-center">
      <h1 className="display-5s m-2 " style={{ fontFamily: "girly-font" }}>
        Welcome to the Task Track
      </h1>
      <img src={computerdisk} className="m-2" width={100} />
      <p className="lead">
        You organized your Tamagotchi schedule, color-coded your Lisa Frank
        folders, and ran the most efficient friendship bracelet operation on the
        playground.
      </p>

      <p className="lead">
        Task Tracker is the team collaboration tool that finally gets you.
        Assign tasks, manage deadlines, and track your team's progress like
        you're running the most organized Barbie dream office ever built.
      </p>

      <p className="lead">
        Your team is about to find out what happens when a 90s girl grows up and
        builds the tools she always deserved. ✨
      </p>
      <hr />
      <div>
        <Button
          variant="primary"
          size="lg"
          className="registerBtn mx-2"
          onClick={() => navigate("/register")}
        >
          Register
        </Button>
        <Button
          variant="dark"
          size="lg"
          className="loginBtn mx-2"
          onClick={() => navigate("/login")}
        >
          Login
        </Button>
      </div>
    </div>
  );
}

export default About;
