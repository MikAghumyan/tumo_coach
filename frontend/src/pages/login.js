import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    console.log(password);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/coaches/login", {
        email,
        password,
      });
      if (response.data.token) {
        console.log(response.data);
        navigate("/students");
      } else {
        console.log(response.data);
        return response.data;
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="hero is-primary is-fullheight">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-5-tablet is-4-desktop is-3-widescreen">
              <h1 className="title is-1">Login</h1>
              <form className="box" onSubmit={onSubmit}>
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
                  <button className="button is-success">Login</button>{" "}
                  <Link to="/register">
                    <button className="button is-primary is-light">
                      Register
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
