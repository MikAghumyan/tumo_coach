import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

const Register = (props) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, surname, email, password, password2 } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password === password2) {
      try {
        const response = await axios.post("/api/coaches/", {
          name,
          surname,
          email,
          password,
        });
        if (response.data.token) {
          localStorage.setItem("coach", JSON.stringify(response.data));
          navigate("/students");
        } else {
          console.log(response.data);
          return response.data;
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <section className="hero is-primary is-fullheight">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-5-tablet is-4-desktop is-3-widescreen">
              <h1 className="title is-1">Register</h1>
              <form className="box" onSubmit={onSubmit}>
                <div className="field">
                  <label className="label">Name</label>
                  <div className="control">
                    <input
                      type="text"
                      placeholder="e.g. Haykanush"
                      className="input"
                      name="name"
                      id="name"
                      value={name}
                      onChange={onChange}
                      required
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Surname</label>
                  <div className="control">
                    <input
                      type="text"
                      placeholder="e.g. Sahakyan"
                      className="input"
                      name="surname"
                      id="surname"
                      value={surname}
                      onChange={onChange}
                      required
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Email</label>
                  <div className="control">
                    <input
                      type="email"
                      placeholder="e.g. nanisahakyan@gmail.com"
                      className="input"
                      name="email"
                      id="email"
                      value={email}
                      onChange={onChange}
                      required
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Password</label>
                  <div className="control ">
                    <input
                      type="password"
                      placeholder="*******"
                      className="input"
                      name="password"
                      id="password"
                      value={password}
                      onChange={onChange}
                      required
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Password</label>
                  <div className="control ">
                    <input
                      type="password"
                      placeholder="*******"
                      className="input"
                      name="password2"
                      id="password2"
                      value={password2}
                      onChange={onChange}
                      required
                    />
                  </div>
                </div>
                <div className="field">
                  <button className="button is-success">Register</button>{" "}
                  <Link to="/login">
                    <button className="button is-primary is-light">
                      Login
                    </button>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
