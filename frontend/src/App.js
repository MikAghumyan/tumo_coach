import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "bulma/css/bulma.min.css";

import Register from "./pages/register";
import Login from "./pages/login";
import Students from "./pages/students";
import Workshops from "./pages/workshops";
import { useState } from "react";

function App() {
  const [verified, setVerified] = useState(
    localStorage.getItem("coach") ? true : false
  );

  const verify = (status) => {
    setVerified(status);
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              verified ? (
                <Navigate to="/students" />
              ) : (
                <Navigate to="/register" />
              )
            }
          />

          <Route
            path="/register"
            element={
              verified ? (
                <Navigate to="/students" />
              ) : (
                <Register verify={verify} />
              )
            }
          />

          <Route
            path="/login"
            element={
              verified ? <Navigate to="/students" /> : <Login verify={verify} />
            }
          />
          <Route
            path="/students"
            element={
              verified ? (
                <Students verify={verify} />
              ) : (
                <Navigate to="/register" />
              )
            }
          />
          <Route
            path="/workshops"
            element={
              verified ? (
                <Workshops verify={verify} />
              ) : (
                <Navigate to="/students" />
              )
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
