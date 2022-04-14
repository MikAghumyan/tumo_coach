import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import AddStudent from "./students/addStudent";
import AddWorkshop from "./workshops/addWorkshop";

const Navbar = (props) => {
  const [isBtnAcitve, setIsBtnActive] = useState(false);
  const [searchbox, setSearchbox] = useState(props.searchbox);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchbox === "") navigate(`/${props.currentPage}?search=${searchbox}`);
  }, [searchbox, navigate, props.currentPage]);

  const setBtnStatus = () => {
    setIsBtnActive(!isBtnAcitve);
  };

  const logout = async (e) => {
    e.preventDefault();
    localStorage.removeItem("coach");
    props.verify(false);
    navigate("/");
  };

  const onChange = (e) => {
    setSearchbox(e.target.value);
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
            alt="TUMO"
          />
        </div>
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
                onKeyDown={(e) =>
                  e.key === "Enter" &&
                  navigate(`/${props.currentPage}?search=${searchbox}`)
                }
              />
            </div>
            <div className="control">
              <Link
                className="button is-primary is-light"
                to={`/${props.currentPage}?search=${searchbox}`}
              >
                Search
              </Link>
            </div>
          </div>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <button
                onClick={setBtnStatus}
                className="button is-primary is-inverted is-light"
              >
                Add a {props.currentPage.slice(0, -1)}
              </button>
              {props.currentPage === "students" && (
                <AddStudent
                  isActive={isBtnAcitve}
                  setActive={setBtnStatus}
                  refetch={() => {
                    props.refetch();
                  }}
                />
              )}
              {props.currentPage === "workshops" && (
                <AddWorkshop
                  isActive={isBtnAcitve}
                  setActive={setBtnStatus}
                  refetch={() => {
                    props.refetch();
                  }}
                />
              )}
              <button
                onClick={logout}
                className="button is-primary is-danger is-light"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
