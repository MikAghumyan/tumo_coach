import {
  BrowserRouter as Router,
  Route,
  Routes,
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
          <Route path="/" element={<div className=""></div>} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/students" element={<Students />} />
          <Route path="/workshops" element={<Workshops />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
