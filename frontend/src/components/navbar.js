import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = (props) => {
  const [searchbox, setSearchbox] = useState("");
  const navigate = useNavigate();

  const logout = async (e) => {
    e.preventDefault();
    localStorage.removeItem("coach");
    props.verify(false);
    navigate("/");
  };

  const onChange = (e) => {
    setSearchbox(e.target.value);
    props.search(e.target.value);
  };

  return (
    <nav
      className="navbar is-primary block"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <div className="navbar-item">
          <img
            src="https://tumo.org/wp-content/uploads/2018/02/ENG003_Stroke-Black-H80px-1.png"
            height="28"
          />
        </div>

        <a
          role="button"
          className="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="" className="navbar-menu">
        <div className="navbar-start">
          <Link to={`/${props.redirectPage}`} className="navbar-item mr-4">
            {props.redirectPage.charAt(0).toUpperCase() +
              props.redirectPage.slice(1)}
          </Link>
          <div className="field has-addons columns is-vcentered is-primary">
            <div className="control is-primary">
              <input
                className="input is-light"
                type="text"
                placeholder={`Find ${props.currentPage}`}
                name="search"
                id="search"
                value={searchbox}
                onChange={onChange}
              />
            </div>
          </div>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <a
                onClick={logout}
                className="button is-primary is-inverted is-light"
              >
                Logout
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
