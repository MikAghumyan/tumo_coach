import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  NavLink,
  Link,
} from "react-router-dom";
import "bulma/css/bulma.min.css";

import Register from "./pages/register";
import Login from "./pages/login";
import Students from "./pages/students";
import Workshops from "./pages/workshops";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              localStorage.getItem("coach") ? (
                <Navigate to="/students" />
              ) : (
                <Navigate to="/register" />
              )
            }
          />

          <Route
            path="/register"
            element={
              localStorage.getItem("coach") ? (
                <Navigate to="/students" />
              ) : (
                <Register />
              )
            }
          />

          <Route
            path="/login"
            element={
              localStorage.getItem("coach") ? (
                <Navigate to="/students" />
              ) : (
                <Login />
              )
            }
          />
          <Route
            path="/students"
            element={
              localStorage.getItem("coach") ? (
                <Students />
              ) : (
                <Navigate to="/register" />
              )
            }
          />
          <Route
            path="/workshops"
            element={
              localStorage.getItem("coach") ? (
                <Workshops />
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
