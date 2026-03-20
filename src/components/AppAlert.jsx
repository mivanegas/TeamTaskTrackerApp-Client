import { useState } from "react";
import Alert from "react-bootstrap/Alert";

function AppAlert({ showAlert }) {
  const [show, setShow] = useState(true);

  if (show) {
    return (
      <Alert
        variant={showAlert.type == "SUCCESS" ? "success" : "danger"}
        onClose={() => setShow(false)}
        dismissible
        style={{
          position: "absolute",
          top: "4em",
          right: "2em",
        }}
      >
        {showAlert.message}
      </Alert>
    );
  }
  return <></>;
}

export default AppAlert;
